"use client";

import Link from "next/link";
import { ArrowUpRight, Bot, Check, ChevronDown, Globe2, LayoutDashboard, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import styles from "./home-visuals.module.css";

const STEPS = [
  { title: "Website enquiry", detail: "Can you help us manage online bookings?", icon: Globe2 },
  { title: "AI assistant qualifies the request", detail: "What do you use to take bookings today?", icon: Bot },
  { title: "CRM receives the details", detail: "Website enquiry · Booking workflow", icon: LayoutDashboard },
  { title: "Team notified · Human follow-up", detail: "A team member reviews the enquiry and takes over.", icon: Check },
] as const;

const STEP_MS = 2800;

/**
 * The hero's illustrative enquiry journey. It walks through the four steps on its own, loops, and
 * stops as soon as the visitor interacts, hovers, focuses or presses Pause. With reduced motion it
 * never moves by itself.
 */
export function EnquiryWorkspace() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const [reduced, setReduced] = useState(true);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const playing = !reduced && !paused && !engaged && onScreen;
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") setActive((a) => (a + 1) % STEPS.length);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [playing]);

  const pick = (i: number) => {
    setActive(i);
    setPaused(true);
  };

  return (
    <figure
      ref={root}
      onMouseEnter={() => setEngaged(true)}
      onMouseLeave={() => setEngaged(false)}
      onFocusCapture={() => setEngaged(true)}
      onBlurCapture={() => setEngaged(false)}
      className="min-w-0 overflow-hidden rounded-2xl border border-white/15 bg-[#172234] text-ivory shadow-2xl"
    >
      <figcaption className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 px-4 py-3 sm:px-5">
        <span className="font-display text-sm font-semibold">Enquiry workspace</span>
        <span className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-wider text-slate">Illustrative sample data</span>
          {!reduced && (
            <button type="button" onClick={() => setPaused((p) => !p)} aria-pressed={paused} aria-label={paused ? "Play the enquiry animation" : "Pause the enquiry animation"} className="grid min-h-8 min-w-8 place-items-center rounded-md border border-white/20 text-cobalt-300 transition hover:border-cobalt-300">
              {paused ? <Play size={13} aria-hidden /> : <Pause size={13} aria-hidden />}
            </button>
          )}
        </span>
      </figcaption>
      <ol className="p-3 sm:p-5">
        {STEPS.map(({ title, detail, icon: Icon }, i) => {
          const isActive = i === active;
          const done = i < active;
          return (
            <li key={title} className={styles.step} style={{ "--step": i } as CSSProperties}>
              <details open={isActive} className={cn(styles.panel, "group rounded-lg border bg-navy transition-colors duration-500", isActive ? "border-cobalt-300/70" : done ? "border-cobalt-300/30" : "border-white/15")}>
                <summary
                  onClick={(e) => {
                    e.preventDefault();
                    pick(i);
                  }}
                  className="flex min-h-11 cursor-pointer list-none items-center gap-3 px-3 py-2 text-sm font-semibold [&::-webkit-details-marker]:hidden"
                >
                  <span className={cn("grid size-8 shrink-0 place-items-center rounded-md transition-colors duration-500", isActive || done ? "bg-cobalt text-white" : "bg-cobalt/20 text-cobalt-300")}>
                    {done ? <Check size={16} aria-hidden /> : <Icon size={16} aria-hidden />}
                  </span>
                  <span className="flex-1">{title}</span>
                  <ChevronDown size={16} className={cn("shrink-0 text-cobalt-300 motion-safe:transition-transform", isActive && "rotate-180")} aria-hidden />
                </summary>
                <div className="border-t border-white/10 px-3 py-2.5 text-xs leading-relaxed text-slate sm:pl-14">{detail}</div>
              </details>
            </li>
          );
        })}
      </ol>
      <div className="border-t border-white/15 px-4 py-3 sm:px-5">
        <Link href="/business-automation#automation" className="inline-flex min-h-8 items-center gap-2 text-sm font-medium text-cobalt-300 hover:underline">Try the automation demo <ArrowUpRight size={15} aria-hidden /></Link>
      </div>
    </figure>
  );
}
