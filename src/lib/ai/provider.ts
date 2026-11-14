export type Role = "system" | "user" | "assistant";
export interface ChatMessage {
  role: Role;
  content: string;
}

export type AIErrorCode = "not_configured" | "rate_limited" | "timeout" | "unavailable";

export class AIError extends Error {
  constructor(public code: AIErrorCode, public retryAfter?: number) {
    super(code);
  }
}

export interface CompletionOptions {
  maxTokens: number;
  temperature?: number;
  json?: boolean;
  timeoutMs?: number;
}

/** Provider-neutral interface. Swap the implementation below to change vendor without touching callers. */
export interface AIProvider {
  stream(messages: ChatMessage[], opts: CompletionOptions): AsyncGenerator<string>;
  complete(messages: ChatMessage[], opts: CompletionOptions): Promise<string>;
}

const DEFAULT_URL = "https://api.groq.com/openai/v1/chat/completions";
/** Used when the configured model is no longer available. Best first. */
const PREFERRED_MODELS = ["openai/gpt-oss-120b", "openai/gpt-oss-20b", "qwen/qwen3.8-27b", "llama-3.3-70b-versatile", "llama-3.1-8b-instant"];

const apiUrl = () => process.env.GROQ_API_URL || DEFAULT_URL;
export const aiEnabled = () => Boolean(process.env.GROQ_API_KEY);

function config() {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new AIError("not_configured");
  return { key, model: process.env.GROQ_MODEL?.trim() || "openai/gpt-oss-120b" };
}

/** Model chosen after the configured one proved unavailable (cached for the life of the server process). */
let fallbackModel: string | null = null;

async function discoverModel(key: string, unavailable: string): Promise<string | null> {
  try {
    const res = await fetch(apiUrl().replace(/\/chat\/completions$/, "/models"), { headers: { Authorization: `Bearer ${key}` }, signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    const ids = ((await res.json()) as { data?: { id: string }[] }).data?.map((m) => m.id) ?? [];
    const pick = PREFERRED_MODELS.find((m) => m !== unavailable && ids.includes(m)) ?? null;
    console.warn(JSON.stringify({ event: "ai.model_unavailable", configured: unavailable, using: pick }));
    return pick;
  } catch {
    return null;
  }
}

/** Reasoning models spend tokens thinking before they answer, so keep effort low and leave headroom. */
const isReasoning = (model: string) => model.startsWith("openai/gpt-oss");

async function post(model: string, key: string, messages: ChatMessage[], opts: CompletionOptions, stream: boolean, signal: AbortSignal): Promise<Response> {
  return fetch(apiUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model,
      messages,
      stream,
      max_tokens: opts.maxTokens + (isReasoning(model) ? 700 : 0),
      temperature: opts.temperature ?? 0.4,
      ...(isReasoning(model) ? { reasoning_effort: "low" } : {}),
      ...(opts.json ? { response_format: { type: "json_object" } } : {}),
    }),
    signal,
  });
}

async function request(messages: ChatMessage[], opts: CompletionOptions, stream: boolean): Promise<Response> {
  const { key, model } = config();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), opts.timeoutMs ?? 25_000);
  try {
    let res = await post(fallbackModel ?? model, key, messages, opts, stream, controller.signal);
    if (res.status === 404 && !fallbackModel) {
      const alt = await discoverModel(key, model);
      if (alt) {
        fallbackModel = alt;
        res = await post(alt, key, messages, opts, stream, controller.signal);
      }
    }
    if (res.status === 429) throw new AIError("rate_limited", Number(res.headers.get("retry-after")) || 30);
    if (!res.ok) {
      console.error(JSON.stringify({ event: "ai.provider_error", status: res.status }));
      throw new AIError("unavailable");
    }
    return res;
  } catch (err) {
    if (err instanceof AIError) throw err;
    if (err instanceof Error && err.name === "AbortError") throw new AIError("timeout");
    throw new AIError("unavailable");
  } finally {
    clearTimeout(timer);
  }
}

export const groqProvider: AIProvider = {
  async complete(messages, opts) {
    const res = await request(messages, opts, false);
    const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const text = data.choices?.[0]?.message?.content;
    if (!text) throw new AIError("unavailable");
    return text;
  },

  async *stream(messages, opts) {
    const res = await request(messages, opts, true);
    if (!res.body) throw new AIError("unavailable");
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    try {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const payload = trimmed.slice(5).trim();
          if (payload === "[DONE]") return;
          try {
            // Only the answer ("content") is forwarded; any reasoning text stays on the server.
            const delta = (JSON.parse(payload) as { choices?: { delta?: { content?: string } }[] }).choices?.[0]?.delta?.content;
            if (delta) yield delta;
          } catch {
            /* ignore malformed keep-alive lines */
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  },
};

export const provider: AIProvider = groqProvider;
