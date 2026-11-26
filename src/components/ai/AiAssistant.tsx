"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ChatPanel } from "./ChatPanel";
import { useAiStatus } from "./useAiStatus";

const GREETING = "Hello! I'm RAGOPHALA AI. I can help you explore our services, understand what we build and find the right digital solution for your business. What are you looking to create?";

const SUGGESTIONS = ["I need a business website.", "I want a custom application.", "I need an AI assistant.", "I want to automate my business.", "I need help choosing a solution."];

function Orb({ size = 40 }: { size?: number }) {
  return (
    <span aria-hidden className="relative grid shrink-0 place-items-center rounded-full" style={{ width: size, height: size, background: "radial-gradient(circle at 30% 25%, #ffffff 0%, #8FA5FF 28%, #315BFA 62%, #1b2f8f 100%)", boxShadow: "inset 0 -6px 12px rgba(16,24,39,.35), 0 8px 24px -8px rgba(49,91,250,.8)" }}>
      <span className="absolute inset-[18%] rounded-full bg-white/25 blur-[2px]" />
    </span>
  );
}

/** Floating RAGOPHALA AI launcher and chat window. Hidden when live AI is not configured. */
export function AiAssistant() {
  const enabled = useAiStatus();
  const [open, setOpen] = useState(false);
  const [hint, setHint] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!enabled) return;
    try {
      if (sessionStorage.getItem("rd-ai-hint")) return;
    } catch {
      return;
    }
    const t = window.setTimeout(() => setHint(true), 5000);
    const off = window.setTimeout(() => setHint(false), 12000);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(off);
    };
  }, [enabled]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const mobile = window.matchMedia("(max-width: 639px)").matches;
    if (mobile) document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggle = () => {
    setOpen((v) => !v);
    setHint(false);
    try {
      sessionStorage.setItem("rd-ai-hint", "1");
    } catch {
      /* ignore */
    }
  };

  if (!enabled) return null;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-label="RAGOPHALA AI assistant"
            initial={reduce ? false : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed inset-0 z-[65] flex flex-col overflow-hidden bg-ivory shadow-2xl sm:inset-auto sm:bottom-24 sm:right-5 sm:h-[min(640px,calc(100vh-8rem))] sm:w-[400px] sm:rounded-2xl sm:border sm:border-navy/15"
          >
            <header className="theme-dark relative flex items-center gap-3 overflow-hidden bg-navy px-4 py-3.5">
              <Orb />
              <div className="relative min-w-0 flex-1">
                <h2 className="font-display text-base font-semibold leading-tight">RAGOPHALA AI</h2>
                <p className="truncate text-xs text-muted">Your intelligent digital business assistant</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close assistant" className="relative grid h-9 w-9 place-items-center rounded-lg border border-white/20 text-ivory transition hover:border-cobalt-300"><X size={18} aria-hidden /></button>
            </header>
            <ChatPanel mode="assistant" greeting={GREETING} suggestions={SUGGESTIONS} storageKey="rd-ai-chat" className="flex-1" />
            <footer className="border-t border-navy/10 bg-ivory-200 px-4 py-2.5 text-[11px] leading-snug text-muted">
              <p>AI can make mistakes. Pricing is tailored; a written quotation confirms scope and price. Messages are not stored by us. <Link href="/privacy" className="underline">Privacy</Link></p>
              <Link href="/smart-intake" className="mt-1.5 inline-flex items-center gap-1 font-medium text-cobalt">Prefer a structured project brief? Try Smart Intake <ArrowUpRight size={12} aria-hidden /></Link>
            </footer>
          </motion.section>
        )}
      </AnimatePresence>

      <div className="fixed bottom-5 right-5 z-[60] flex items-center gap-3">
        <AnimatePresence>
          {hint && !open && (
            <motion.button type="button" onClick={toggle} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} className="hidden rounded-xl bg-navy px-4 py-2.5 text-sm text-ivory shadow-xl sm:block">
              Ask <span className="font-semibold">RAGOPHALA AI</span> anything
            </motion.button>
          )}
        </AnimatePresence>
        <button type="button" onClick={toggle} aria-expanded={open} aria-label={open ? "Close RAGOPHALA AI" : "Open RAGOPHALA AI assistant"} className="group relative">
          {!open && !reduce && <span aria-hidden className="absolute inset-0 animate-ping2 rounded-full bg-cobalt/50" />}
          <span className={`relative block ${open || reduce ? "" : "animate-drift"}`}>
            <Orb size={58} />
            <span className="absolute inset-0 grid place-items-center font-display text-lg font-bold text-white drop-shadow transition-transform group-hover:scale-110">{open ? <X size={22} aria-hidden /> : "AI"}</span>
          </span>
        </button>
      </div>
    </>
  );
}
