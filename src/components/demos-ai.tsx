"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bot, Check, Pause, Play, RotateCcw, Send } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { AUTOMATION_FLOW, ENQUIRY_FLOW } from "./mockups-ai";
import { useInView } from "./three/capability";

interface Scenario {
  chip: string;
  answer: string;
  ask: string;
  result: string;
}

const SCENARIOS: Scenario[] = [
  { chip: "How much does a basic website cost?", answer: "Our Basic Website starts at R2,800, once-off. Prices are starting prices and a written quotation confirms the final amount.", ask: "Is this for a new business or an existing one?", result: "Qualified: new website · routed to the team with the Basic Website package." },
  { chip: "Do you offer weekend appointments?", answer: "Yes, Saturday appointments are available. I can pass your details to the team to confirm a time.", ask: "What is your name and preferred time?", result: "Appointment request captured · team notified." },
  { chip: "I need a quote for an inventory system.", answer: "We build inventory systems, and web applications start from R8,000. A short scoping conversation gives the exact price.", ask: "Roughly how many products do you manage?", result: "Qualified lead: web application · flagged for a discovery call." },
];

type Msg = { from: "user" | "bot" | "system"; text: string };

/** Scripted demonstration of how an AI assistant handles a business enquiry. Not a live AI. */
export function AiDemo({ className }: { className?: string }) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [step, setStep] = useState(-1);
  const [typing, setTyping] = useState(false);
  const [busy, setBusy] = useState(false);
  const timers = useRef<number[]>([]);
  const reduce = useReducedMotion();
  const scroller = useRef<HTMLDivElement>(null);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => clear, []);
  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [msgs, typing, reduce]);

  const later = (ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, reduce ? Math.min(ms, 50) : ms));
  };

  const run = (s: Scenario) => {
    if (busy) return;
    clear();
    setBusy(true);
    setMsgs([{ from: "user", text: s.chip }]);
    setStep(0);
    later(700, () => { setStep(1); setTyping(true); });
    later(1900, () => { setTyping(false); setMsgs((m) => [...m, { from: "bot", text: s.answer }]); });
    later(2700, () => { setStep(2); setMsgs((m) => [...m, { from: "bot", text: s.ask }]); });
    later(3900, () => { setStep(3); setMsgs((m) => [...m, { from: "system", text: s.result }]); });
    later(4900, () => { setStep(4); setBusy(false); });
  };

  const reset = () => {
    clear();
    setMsgs([]);
    setStep(-1);
    setTyping(false);
    setBusy(false);
  };

  return (
    <div className={cn("grid gap-5 lg:grid-cols-[1.15fr_1fr]", className)}>
      <div className="overflow-hidden rounded-2xl border border-navy/15 bg-white text-navy shadow-[0_40px_70px_-40px_rgba(16,24,39,.5)]">
        <div className="flex items-center gap-3 border-b border-navy/10 px-4 py-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-cobalt text-white"><Bot size={17} aria-hidden /></span>
          <div className="flex-1"><p className="font-display text-sm font-semibold">Business assistant</p><p className="font-mono text-[9px] uppercase tracking-wider text-muted">Demonstration · scripted example</p></div>
          {msgs.length > 0 && <button type="button" onClick={reset} className="grid h-8 w-8 place-items-center rounded-full border border-navy/15 text-muted transition hover:border-cobalt hover:text-navy" aria-label="Reset demonstration"><RotateCcw size={14} aria-hidden /></button>}
        </div>
        <div ref={scroller} className="h-[300px] space-y-3 overflow-y-auto p-4 text-[13px]" aria-live="polite">
          {msgs.length === 0 && <p className="pt-16 text-center text-sm text-muted">Choose an enquiry below to see how an assistant responds.</p>}
          <AnimatePresence initial={false}>
            {msgs.map((m, i) => (
              <motion.p key={i} initial={reduce ? false : { opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} className={cn("max-w-[84%] px-3.5 py-2.5 leading-relaxed", m.from === "user" && "ml-auto rounded-2xl rounded-br-sm bg-cobalt text-white", m.from === "bot" && "rounded-2xl rounded-bl-sm bg-ivory-200", m.from === "system" && "max-w-full rounded-lg border border-dashed border-cobalt/50 bg-softblue/60 font-mono text-[11px] text-cobalt-700")}>{m.text}</motion.p>
            ))}
            {typing && <motion.p key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="inline-flex gap-1 rounded-2xl rounded-bl-sm bg-ivory-200 px-4 py-3" aria-label="Assistant is typing">{[0, 1, 2].map((d) => <span key={d} className="h-1.5 w-1.5 animate-pulse rounded-full bg-navy/40" style={{ animationDelay: `${d * 150}ms` }} />)}</motion.p>}
          </AnimatePresence>
        </div>
        <div className="border-t border-navy/10 p-3">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted">Try an enquiry</p>
          <div className="flex flex-wrap gap-2">
            {SCENARIOS.map((s) => (
              <button key={s.chip} type="button" disabled={busy} onClick={() => run(s)} className="flex items-center gap-2 rounded-lg border border-navy/15 px-3 py-2 text-left text-xs transition hover:border-cobalt hover:bg-softblue/50 disabled:opacity-50"><Send size={12} className="shrink-0 text-cobalt" aria-hidden />{s.chip}</button>
            ))}
          </div>
        </div>
      </div>

      <ol className="space-y-2.5" aria-label="Workflow progress">
        {ENQUIRY_FLOW.map((s, i) => {
          const state = step > i || (step === 4 && i === 4) ? "done" : step === i ? "active" : "idle";
          return (
            <li key={s.title} className={cn("relative flex items-start gap-4 rounded-xl border p-4 transition-all duration-500", state === "active" ? "border-cobalt bg-white shadow-[0_20px_40px_-25px_rgba(49,91,250,.6)]" : state === "done" ? "border-line bg-card" : "border-line bg-transparent opacity-70")}>
              <span className={cn("relative grid h-10 w-10 shrink-0 place-items-center rounded-lg transition-colors duration-500", state === "idle" ? "bg-softblue/70 text-muted" : "bg-cobalt text-white")}>
                {state === "done" ? <Check size={18} aria-hidden /> : <s.icon size={18} aria-hidden />}
                {state === "active" && <span aria-hidden className="absolute inset-0 animate-ping2 rounded-lg bg-cobalt" />}
              </span>
              <div><h3 className="font-display text-base font-semibold">{s.title}</h3><p className="mt-0.5 text-sm text-muted">{s.text}</p></div>
              <span className="ml-auto font-mono text-[10px] text-muted">0{i + 1}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** Animated automation workflow: nodes run in turn and change status. */
export function AutomationFlow({ className, dark }: { className?: string; dark?: boolean }) {
  const steps = AUTOMATION_FLOW;
  const n = steps.length;
  const reduce = useReducedMotion();
  const { ref, visible } = useInView<HTMLDivElement>("0px");
  const [tick, setTick] = useState(reduce ? n : -1);
  const [running, setRunning] = useState(true);

  const advance = useCallback(() => setTick((t) => (t >= n + 1 ? -1 : t + 1)), [n]);
  useEffect(() => {
    if (reduce || !running || !visible) return;
    const id = setInterval(advance, tick >= n ? 1800 : 1100);
    return () => clearInterval(id);
  }, [reduce, running, visible, advance, tick, n]);

  return (
    <div ref={ref} className={className}>
      <ol className="flex flex-col lg:flex-row lg:items-stretch">
        {steps.map((s, i) => {
          const status = tick > i ? "done" : tick === i ? "running" : "waiting";
          return (
            <li key={s.title} className="flex flex-col items-stretch lg:flex-1 lg:flex-row">
              <div className={cn("relative flex-1 rounded-xl border p-5 transition-all duration-500", dark ? "border-line bg-card" : "border-navy/15 bg-white", status === "running" && "-translate-y-1 !border-cobalt shadow-[0_24px_40px_-26px_rgba(49,91,250,.7)]")}>
                <div className="flex items-center justify-between">
                  <span className={cn("grid h-10 w-10 place-items-center rounded-lg transition-colors duration-500", status === "waiting" ? (dark ? "bg-cobalt/20 text-cobalt-300" : "bg-softblue text-cobalt") : "bg-cobalt text-white")}>
                    {status === "done" ? <Check size={18} aria-hidden /> : <s.icon size={18} aria-hidden />}
                  </span>
                  <span className={cn("rounded-md px-2 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors", status === "done" ? "bg-emerald-100 text-emerald-800" : status === "running" ? "bg-cobalt text-white" : "bg-navy/5 text-muted")}>{status === "done" ? "Done" : status === "running" ? "Running" : "Waiting"}</span>
                </div>
                <h3 className="mt-5 font-display text-base font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.text}</p>
              </div>
              {i < n - 1 && (
                <span aria-hidden className="relative mx-auto h-8 w-0.5 overflow-hidden bg-[var(--line)] lg:my-auto lg:h-0.5 lg:w-10">
                  <motion.i className="absolute inset-0 origin-top bg-cobalt lg:origin-left" animate={{ scaleX: tick > i ? 1 : 0, scaleY: tick > i ? 1 : 0 }} transition={{ duration: reduce ? 0 : 0.5 }} />
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <div className="mt-5 flex items-center gap-3">
        <button type="button" onClick={() => setRunning((r) => !r)} className="btn btn-line !px-4 !py-2.5" aria-label={running ? "Pause animation" : "Play animation"}>
          {running ? <Pause size={14} aria-hidden /> : <Play size={14} aria-hidden />}{running ? "Pause" : "Play"}
        </button>
        <button type="button" onClick={() => setTick(-1)} className="btn btn-line !px-4 !py-2.5"><RotateCcw size={14} aria-hidden /> Replay</button>
        <p className="font-mono text-[10px] uppercase tracking-[.16em] text-muted">Example workflow</p>
      </div>
    </div>
  );
}
