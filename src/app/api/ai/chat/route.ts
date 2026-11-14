import { z } from "zod";
import { AIError, aiEnabled, provider, type ChatMessage } from "@/lib/ai/provider";
import { assistantSystem, demoAssistantSystem } from "@/lib/ai/prompts";
import { redact } from "@/lib/ai/redact";
import { clientIp, isForeignOrigin, jsonError, logEvent } from "@/lib/http";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 60;

const bodySchema = z.object({
  mode: z.enum(["assistant", "demo"]).default("assistant"),
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().trim().min(1).max(1500) }))
    .min(1)
    .max(14),
});

const MAX_BODY = 24_000;
const MAX_STREAM_MS = 60_000;
const encoder = new TextEncoder();
const line = (obj: Record<string, unknown>) => encoder.encode(JSON.stringify(obj) + "\n");

const friendly = (code: string, retryAfter?: number) =>
  code === "rate_limited"
    ? `The assistant is busy right now. Please try again in ${retryAfter && retryAfter < 120 ? `${retryAfter} seconds` : "a few minutes"}, or use the project form.`
    : code === "timeout"
      ? "The assistant took too long to respond. Please try again, or use the project form."
      : "The assistant is temporarily unavailable. Please try again shortly, or use the project form to reach us.";

export async function POST(req: Request) {
  if (isForeignOrigin(req)) return jsonError("Request not allowed.", 403);
  if (!aiEnabled()) return jsonError("Live AI is not enabled on this site.", 503, { code: "not_configured" });

  const ip = clientIp(req);
  const perMinute = rateLimit(`chat:min:${ip}`, 12, 60_000);
  const perDay = rateLimit(`chat:day:${ip}`, 150, 24 * 3_600_000);
  if (!perMinute.ok || !perDay.ok) {
    const wait = Math.max(perMinute.retryAfter, perDay.retryAfter);
    return jsonError(friendly("rate_limited", wait), 429, { code: "rate_limited", retryAfter: wait });
  }

  const text = await req.text();
  if (text.length > MAX_BODY) return jsonError("That conversation is too long. Please start a new one.", 413);
  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch {
    return jsonError("Invalid request.", 400);
  }
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success || parsed.data.messages[parsed.data.messages.length - 1].role !== "user") return jsonError("Please send a message to continue.", 400);

  const { mode, messages } = parsed.data;
  const conversation: ChatMessage[] = [
    { role: "system", content: mode === "demo" ? demoAssistantSystem() : assistantSystem(messages[messages.length - 1].content) },
    ...messages.map((m) => ({ role: m.role, content: redact(m.content) })),
  ];

  const iterator = provider.stream(conversation, { maxTokens: mode === "demo" ? 350 : 650, temperature: 0.4, timeoutMs: 20_000 })[Symbol.asyncIterator]();
  let first: IteratorResult<string>;
  try {
    first = await iterator.next();
  } catch (err) {
    const code = err instanceof AIError ? err.code : "unavailable";
    const retryAfter = err instanceof AIError ? err.retryAfter : undefined;
    logEvent("ai.chat", { mode, messages: messages.length, ok: false, code });
    return jsonError(friendly(code, retryAfter), code === "rate_limited" ? 429 : 503, { code, retryAfter });
  }

  const started = Date.now();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        let next = first;
        while (!next.done) {
          controller.enqueue(line({ t: "delta", v: next.value }));
          if (Date.now() - started > MAX_STREAM_MS) throw new AIError("timeout");
          next = await iterator.next();
        }
        controller.enqueue(line({ t: "done" }));
        logEvent("ai.chat", { mode, messages: messages.length, ok: true });
      } catch (err) {
        const code = err instanceof AIError ? err.code : "unavailable";
        controller.enqueue(line({ t: "error", v: friendly(code) }));
        logEvent("ai.chat", { mode, messages: messages.length, ok: false, code });
      } finally {
        controller.close();
      }
    },
    cancel() {
      void iterator.return?.(undefined);
    },
  });

  return new Response(stream, { headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
}
