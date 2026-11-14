"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useState, type KeyboardEvent } from "react";
import { CASES, PROJECTS } from "@/lib/site";
import { cn } from "@/lib/utils";
import { MOCK_HEIGHT, MOCK_WIDTH, ProjectMock } from "./ProjectMock";
import { useInView } from "./three/capability";
import { ScaleToFit, Tilt } from "./ui-motion";

const INTERVAL = 6500;
const pad = (n: number) => String(n + 1).padStart(2, "0");

/** Cinematic project presentation: the active concept is centred, neighbours peek in, background tint follows. */
export function ProjectShowcase() {
  const n = PROJECTS.length;
  const half = Math.floor(n / 2);
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [hover, setHover] = useState(false);
  const reduce = useReducedMotion();
  const { ref, visible } = useInView<HTMLElement>("0px");
  const playing = auto && !hover && visible && !reduce;
  const active = PROJECTS[i];
  const c = CASES[active.slug];

  const go = useCallback((d: number) => setI((v) => (v + d + n) % n), [n]);
  const manual = (d: number) => {
    setAuto(false);
    go(d);
  };

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => go(1), INTERVAL);
    return () => clearInterval(t);
  }, [playing, go]);

  const onKey = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowRight") { e.preventDefault(); manual(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); manual(-1); }
  };

  return (
    <section ref={ref} className="theme-dark relative overflow-hidden bg-navy" aria-roledescription="carousel" aria-label="Selected concept projects" onKeyDown={onKey} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div aria-hidden className="grid-lines absolute inset-0 opacity-40" />
      <motion.div aria-hidden className="absolute left-1/2 top-[18%] h-[34rem] w-[min(60rem,120vw)] -translate-x-1/2 rounded-full blur-[130px]" animate={{ backgroundColor: c.tint, opacity: 0.32 }} transition={{ duration: 1.1 }} />
      <div className="container-x relative pt-24 lg:pt-32">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="label mb-5 flex items-center gap-3"><span className="text-accent">03</span><span aria-hidden className="h-px w-8 bg-current opacity-40" />Selected concepts</p>
            <h2 className="display-md">How we approach real business problems</h2>
            <p className="body-lg mt-5">Illustrative concept projects that show our design and engineering approach. They are demonstrations, not client engagements.</p>
          </div>
          <Link href="/portfolio" className="btn btn-line">All concepts <ArrowUpRight size={16} aria-hidden /></Link>
        </div>
      </div>

      {/* stage */}
      <motion.div onPanEnd={(_, info) => { if (info.offset.x < -60) manual(1); else if (info.offset.x > 60) manual(-1); }} className="relative grid touch-pan-y grid-cols-[minmax(0,1fr)] place-items-center overflow-hidden px-2 pb-6 pt-2 [perspective:1400px]" tabIndex={0} aria-live={playing ? "off" : "polite"}>
        {PROJECTS.map((p, idx) => {
          const off = ((idx - i + n + half) % n) - half;
          const abs = Math.abs(off);
          const isActive = off === 0;
          return (
            <motion.div
              key={p.slug}
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} of ${n}: ${p.title}`}
              aria-hidden={!isActive}
              animate={{ x: `${off * 106}%`, scale: isActive ? 1 : 0.82, opacity: isActive ? 1 : abs === 1 ? 0.38 : 0, rotateY: off * -8, filter: isActive ? "blur(0px)" : "blur(2px)" }}
              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 22, mass: 0.9 }}
              style={{ zIndex: 10 - abs, pointerEvents: abs <= 1 ? "auto" : "none" }}
              onClick={() => { if (!isActive && abs === 1) manual(off); }}
              className={cn("col-start-1 row-start-1 w-[88%] sm:w-[72%] lg:w-[58%]", !isActive && "cursor-pointer")}
            >
              <Tilt max={isActive ? 4 : 0}>
                <div className="rounded-2xl border border-line bg-white/[.06] p-2.5 shadow-[0_60px_90px_-50px_rgba(0,0,0,.9)] backdrop-blur-sm sm:p-4">
                  <ScaleToFit designWidth={MOCK_WIDTH} designHeight={MOCK_HEIGHT} className="rounded-xl bg-gradient-to-br from-softblue/90 to-ivory-200">
                    <ProjectMock kind={CASES[p.slug].mock} />
                  </ScaleToFit>
                </div>
              </Tilt>
            </motion.div>
          );
        })}
      </motion.div>

      {/* details + controls */}
      <div className="container-x relative pb-20 pt-8 lg:pb-28">
        <div className="grid items-start gap-10 border-t border-line pt-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="min-h-[220px]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div key={active.slug} initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                <p className="label mb-3">{active.category} · Concept project</p>
                <h3 className="display-md">{active.title}</h3>
                <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-muted">{active.summary} {c.solution}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Services involved">
                  {c.services.map((s) => (<li key={s} className="rounded-md border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-fg">{s}</li>))}
                </ul>
                <Link href={`/portfolio/${active.slug}`} className="btn btn-primary group mt-7">
                  Explore this concept <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs text-muted"><span className="text-heading">{pad(i)}</span> / {pad(n - 1)}</p>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setAuto((a) => !a)} aria-label={auto ? "Pause autoplay" : "Start autoplay"} className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg transition hover:border-cobalt-300">
                  {auto ? <Pause size={15} aria-hidden /> : <Play size={15} aria-hidden />}
                </button>
                <button type="button" onClick={() => manual(-1)} aria-label="Previous project" className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg transition hover:border-cobalt-300 hover:bg-white/5"><ArrowLeft size={16} aria-hidden /></button>
                <button type="button" onClick={() => manual(1)} aria-label="Next project" className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg transition hover:border-cobalt-300 hover:bg-white/5"><ArrowRight size={16} aria-hidden /></button>
              </div>
            </div>
            <div className="mt-5 h-px w-full bg-[var(--line)]">
              <motion.div key={`${i}-${playing}`} className="h-px origin-left bg-cobalt-300" initial={{ scaleX: playing ? 0 : 1 }} animate={{ scaleX: 1 }} transition={{ duration: playing ? INTERVAL / 1000 : 0, ease: "linear" }} />
            </div>
            <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Choose project">
              {PROJECTS.map((p, idx) => (
                <button key={p.slug} role="tab" aria-selected={idx === i} aria-label={`Show ${p.title}`} onClick={() => { setAuto(false); setI(idx); }} className={cn("h-2 rounded-full transition-all duration-300", idx === i ? "w-8 bg-cobalt-300" : "w-2 bg-[var(--line)] hover:bg-cobalt-300/60")} />
              ))}
            </div>
            <p className="mt-6 text-xs text-muted">Use the arrow keys or swipe to browse. Autoplay pauses when you interact.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
