"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Copy, RotateCcw, SendHorizontal, Sparkles } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { Markdown } from "./Markdown";

interface Msg {
  id: string;
  role: "user" | "assistant";
  content: string;
  error?: boolean;
}

interface Props {
  mode: "assistant" | "demo";
  greeting: string;
  suggestions: string[];
  /** sessionStorage key so history survives navigation within the session. */
  storageKey: string;
  className?: string;
  placeholder?: string;
  hideReset?: boolean;
}

const uid = () => Math.random().toString(36).slice(2, 10);
const MAX_INPUT = 1500;

function load(key: string): Msg[] {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Msg[]).filter((m) => !m.error) : [];
  } catch {
    return [];
  }
}

/** Streaming chat used by the floating assistant and the demonstration centre. Conversations live only in this browser session. */
export function ChatPanel({ mode, greeting, suggestions, storageKey, className, placeholder = "Ask about our services or your project…", hideReset }: Props) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [typing, setTyping] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const abort = useRef<AbortController | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const area = useRef<HTMLTextAreaElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => setMessages(load(storageKey)), [storageKey]);
  useEffect(() => {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(messages.slice(-30)));
    } catch {
      /* storage unavailable */
    }
  }, [messages, storageKey]);
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [messages, typing, reduce]);
  useEffect(() => () => abort.current?.abort(), []);
  useEffect(() => {
    const el = area.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [input]);

  const send = useCallback(
    async (text: string) => {
      const content = text.trim().slice(0, MAX_INPUT);
      if (!content || busy) return;
      const user: Msg = { id: uid(), role: "user", content };
      const reply: Msg = { id: uid(), role: "assistant", content: "" };
      const history = [...messages.filter((m) => !m.error), user];
      setMessages([...messages, user, reply]);
      setInput("");
      setBusy(true);
      setTyping(true);
      const controller = new AbortController();
      abort.current = controller;
      const fail = (message: string) => setMessages((m) => m.map((x) => (x.id === reply.id ? { ...x, content: message, error: true } : x)));
      try {
        const res = await fetch("/api/ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mode, messages: history.slice(-12).map(({ role, content: c }) => ({ role, content: c })) }),
          signal: controller.signal,
        });
        if (!res.ok || !res.body) {
          const data = (await res.json().catch(() => ({}))) as { error?: string };
          fail(data.error ?? "The assistant is temporarily unavailable. Please try again shortly, or use the project form.");
          return;
        }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let received = false;
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const l of lines) {
            if (!l.trim()) continue;
            const ev = JSON.parse(l) as { t: string; v?: string };
            if (ev.t === "delta" && ev.v) {
              received = true;
              setTyping(false);
              setMessages((m) => m.map((x) => (x.id === reply.id ? { ...x, content: x.content + ev.v } : x)));
            } else if (ev.t === "error") {
              if (received) setMessages((m) => m.map((x) => (x.id === reply.id ? { ...x, content: `${x.content}\n\n${ev.v}` } : x)));
              else fail(ev.v ?? "The assistant is temporarily unavailable.");
            }
          }
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") fail("We could not reach the assistant. Please check your connection and try again.");
      } finally {
        setBusy(false);
        setTyping(false);
      }
    },
    [busy, messages, mode],
  );

  const reset = () => {
    abort.current?.abort();
    setMessages([]);
    setBusy(false);
    setTyping(false);
    setInput("");
  };

  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send(input);
    }
  };

  const copy = async (m: Msg) => {
    try {
      await navigator.clipboard.writeText(m.content.replace(/\*\*/g, ""));
      setCopied(m.id);
      window.setTimeout(() => setCopied((c) => (c === m.id ? null : c)), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className={cn("flex min-h-0 flex-col bg-ivory text-charcoal", className)}>
      <div ref={scroller} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4 text-[14px] leading-relaxed" aria-live="polite" aria-busy={busy}>
        <div className="max-w-[88%] rounded-2xl rounded-bl-sm bg-white px-3.5 py-3 shadow-sm"><Markdown text={greeting} /></div>
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div key={m.id} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className={cn("group flex flex-col", m.role === "user" ? "items-end" : "items-start")}>
              {m.content || m.role === "user" ? (
                <div className={cn("max-w-[88%] rounded-2xl px-3.5 py-2.5", m.role === "user" ? "rounded-br-sm bg-cobalt text-white" : m.error ? "rounded-bl-sm border border-red-200 bg-red-50 text-red-800" : "rounded-bl-sm bg-white shadow-sm")}>
                  {m.role === "user" ? <p className="whitespace-pre-wrap">{m.content}</p> : <Markdown text={m.content} />}
                  {m.role === "assistant" && busy && !m.error && m.id === messages[messages.length - 1]?.id && <span aria-hidden className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-cobalt align-middle" />}
                </div>
              ) : null}
              {m.role === "assistant" && m.content && !m.error && !busy && (
                <button type="button" onClick={() => void copy(m)} className="mt-1 flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted opacity-0 transition hover:text-heading focus-visible:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100" aria-label="Copy response">
                  {copied === m.id ? <Check size={12} aria-hidden /> : <Copy size={12} aria-hidden />}{copied === m.id ? "Copied" : "Copy"}
                </button>
              )}
            </motion.div>
          ))}
          {typing && (
            <motion.div key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="inline-flex gap-1 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm" role="status" aria-label="RAGOPHALA AI is typing">
              {[0, 1, 2].map((d) => (<span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-cobalt/60" style={{ animationDelay: `${d * 140}ms` }} />))}
            </motion.div>
          )}
        </AnimatePresence>
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {suggestions.map((s) => (
              <button key={s} type="button" onClick={() => void send(s)} className="flex items-center gap-1.5 rounded-lg border border-navy/15 bg-white px-3 py-2 text-left text-[13px] transition hover:-translate-y-0.5 hover:border-cobalt hover:bg-softblue/60"><Sparkles size={12} className="shrink-0 text-cobalt" aria-hidden />{s}</button>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); void send(input); }} className="border-t border-navy/10 bg-white p-3">
        <div className="flex items-end gap-2">
          <label htmlFor={`chat-${storageKey}`} className="sr-only">Message RAGOPHALA AI</label>
          <textarea id={`chat-${storageKey}`} ref={area} value={input} onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT))} onKeyDown={onKey} rows={1} placeholder={placeholder} className="max-h-[120px] min-h-[44px] flex-1 resize-none rounded-xl border border-navy/15 bg-ivory px-3.5 py-3 text-[14px] outline-none transition placeholder:text-slate-500 focus:border-cobalt focus:ring-4 focus:ring-cobalt/15" />
          <button type="submit" disabled={busy || !input.trim()} aria-label="Send message" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cobalt text-white transition hover:bg-cobalt-700 disabled:opacity-40"><SendHorizontal size={18} aria-hidden /></button>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted">Enter to send · Shift+Enter for a new line</p>
          {!hideReset && messages.length > 0 && (
            <button type="button" onClick={reset} className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-muted transition hover:text-heading"><RotateCcw size={11} aria-hidden />New conversation</button>
          )}
        </div>
      </form>
    </div>
  );
}
