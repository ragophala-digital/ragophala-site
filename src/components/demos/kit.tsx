"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Pause, Play, RotateCcw, SkipForward } from "lucide-react";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Shared pieces for the scripted demonstrations. Every demo uses fictional businesses and sample data; nothing is sent, booked or saved. */

export interface Script {
  /** How many scripted items are currently revealed (0 to total). */
  step: number;
  total: number;
  playing: boolean;
  atEnd: boolean;
  next: () => void;
  reset: () => void;
  toggle: () => void;
}

export function useScript(total: number, interval = 1500): Script {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const next = useCallback(() => setStep((s) => Math.min(s + 1, total)), [total]);
  const reset = useCallback(() => {
    setStep(0);
    setPlaying(false);
  }, []);
  useEffect(() => {
    if (!playing) return;
    if (step >= total) {
      setPlaying(false);
      return;
    }
    const id = setTimeout(next, reduce ? 700 : interval);
    return () => clearTimeout(id);
  }, [playing, step, total, interval, next, reduce]);
  const toggle = useCallback(() => {
    if (step >= total) {
      setStep(0);
      setPlaying(true);
    } else setPlaying((p) => !p);
  }, [step, total]);
  return { step, total, playing, atEnd: step >= total, next, reset, toggle };
}

export function ScriptControls({ script: s, nextLabel, className }: { script: Script; nextLabel?: string; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <button type="button" onClick={s.toggle} className="btn btn-primary !px-4 !py-2.5">
        {s.playing ? <Pause size={14} aria-hidden /> : <Play size={14} aria-hidden />}
        {s.playing ? "Pause" : s.atEnd ? "Replay demo" : s.step === 0 ? "Play demo" : "Resume"}
      </button>
      <button type="button" onClick={() => { s.next(); }} disabled={s.atEnd} className="btn btn-line !px-4 !py-2.5 disabled:opacity-50">
        <SkipForward size={14} aria-hidden />
        <span className="max-w-[26ch] truncate sm:max-w-[44ch]">{nextLabel ?? "Next step"}</span>
      </button>
      <button type="button" onClick={s.reset} className="btn btn-line !px-4 !py-2.5"><RotateCcw size={14} aria-hidden /> Reset</button>
      <p className="ml-auto font-mono text-[10px] uppercase tracking-[.16em] text-[#566075]" aria-live="polite">Step {Math.min(s.step, s.total)} of {s.total}</p>
    </div>
  );
}

export function Panel({ title, children, className, dark }: { title?: string; children: ReactNode; className?: string; dark?: boolean }) {
  return (
    <div className={cn("rounded-2xl border p-4 sm:p-5", dark ? "border-white/10 bg-navy text-ivory" : "border-navy/10 bg-white text-navy", className)}>
      {title && <p className={cn("mb-3 font-mono text-[10px] uppercase tracking-[.16em]", dark ? "text-slate" : "text-[#566075]")}>{title}</p>}
      {children}
    </div>
  );
}

export function LogPanel({ items, title = "What the AI does" }: { items: string[]; title?: string }) {
  return (
    <Panel title={title}>
      <ul className="min-h-[96px] space-y-2 text-sm" aria-live="polite">
        {items.length === 0 && <li className="text-[#566075]">Press play to see each action as it happens.</li>}
        <AnimatePresence initial={false}>
          {items.map((t) => (
            <motion.li key={t} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="flex gap-2.5">
              <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-cobalt text-white"><Check size={10} aria-hidden /></span>
              {t}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </Panel>
  );
}

export function PhoneShell({ title, subtitle, children, className }: { title: string; subtitle?: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-[340px] rounded-[2rem] border-[6px] border-navy bg-navy p-0 shadow-[0_40px_70px_-35px_rgba(16,24,39,.6)]", className)}>
      <div className="rounded-[1.5rem] bg-ivory">
        <div className="flex items-center gap-3 rounded-t-[1.5rem] bg-navy px-4 py-3 text-ivory">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-cobalt text-xs font-bold">AI</span>
          <span className="min-w-0"><span className="block truncate text-sm font-semibold">{title}</span>{subtitle && <span className="block truncate text-[11px] text-slate">{subtitle}</span>}</span>
        </div>
        <div className="min-h-[340px] p-3">{children}</div>
      </div>
    </div>
  );
}

export interface ChatStep {
  from: "user" | "ai";
  text: string;
  log?: string;
}

export function ChatView({ steps, upto, userLabel = "Customer" }: { steps: ChatStep[]; upto: number; userLabel?: string }) {
  const shown = steps.slice(0, upto);
  return (
    <ol className="space-y-2.5" aria-label="Conversation" aria-live="polite">
      {shown.length === 0 && <li className="pt-10 text-center text-xs text-[#566075]">The conversation starts when you press play.</li>}
      {shown.map((m, i) => (
        <motion.li key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={cn("flex", m.from === "user" ? "justify-end" : "justify-start")}>
          <span className={cn("max-w-[84%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug", m.from === "user" ? "rounded-br-md bg-cobalt text-white" : "rounded-bl-md border border-navy/10 bg-white text-navy")}>
            <span className="sr-only">{m.from === "user" ? `${userLabel}: ` : "Assistant: "}</span>
            {m.text}
          </span>
        </motion.li>
      ))}
    </ol>
  );
}

export function nextLabelFor(steps: ChatStep[], step: number): string | undefined {
  const n = steps[step];
  if (!n) return undefined;
  return n.from === "user" ? `Send: “${n.text}”` : "AI replies";
}

export function Pill({ children, tone = "soft" }: { children: ReactNode; tone?: "soft" | "green" | "amber" | "cobalt" | "slate" }) {
  const tones = { soft: "bg-softblue text-navy", green: "bg-emerald-100 text-emerald-800", amber: "bg-amber-100 text-amber-900", cobalt: "bg-cobalt text-white", slate: "bg-navy/5 text-[#566075]" };
  return <span className={cn("inline-block rounded-md px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider", tones[tone])}>{children}</span>;
}

export function DemoGrid({ children }: { children: ReactNode }) {
  return <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">{children}</div>;
}
