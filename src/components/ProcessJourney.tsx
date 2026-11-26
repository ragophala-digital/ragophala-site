"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { PROCESS } from "@/lib/site";
import { cn } from "@/lib/utils";

function Frame({ children, url }: { children: ReactNode; url?: string }) {
  return (
    <div className="w-full max-w-[420px] overflow-hidden rounded-xl border border-white/15 bg-ivory shadow-[0_40px_70px_-35px_rgba(0,0,0,.8)]">
      <div className="flex items-center gap-1.5 border-b border-navy/10 bg-ivory-200 px-3 py-2"><i className="h-1.5 w-1.5 rounded-full bg-navy/20" /><i className="h-1.5 w-1.5 rounded-full bg-navy/20" /><i className="h-1.5 w-1.5 rounded-full bg-navy/20" /><span className="ml-2 flex-1 rounded bg-white px-2 py-0.5 font-mono text-[9px] text-muted">{url ?? "yourbusiness.co.za"}</span></div>
      {children}
    </div>
  );
}

function Pop({ delay = 0, className, children }: { delay?: number; className?: string; children?: ReactNode }) {
  return <motion.div initial={{ opacity: 0, y: 14, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>;
}

function StageVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="relative h-[260px] w-full max-w-[380px]">
        {[["Goals", "-rotate-3 top-0 left-0"], ["Audience", "rotate-2 top-14 left-10"], ["Must-have features", "-rotate-1 top-28 left-3"]].map(([t, pos], i) => (
          <Pop key={t} delay={i * 0.12} className={cn("absolute w-[78%] rounded-xl bg-white p-4 text-navy shadow-xl", pos)}>
            <p className="font-mono text-[10px] uppercase tracking-wider text-cobalt">{t}</p>
            <i className="mt-3 block h-1.5 w-4/5 rounded-full bg-navy/15" /><i className="mt-2 block h-1.5 w-3/5 rounded-full bg-navy/10" />
          </Pop>
        ))}
        <Pop delay={0.5} className="absolute bottom-0 right-0 grid h-14 w-14 place-items-center rounded-full bg-cobalt font-display text-2xl font-bold text-white">?</Pop>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="w-full max-w-[400px]">
        <svg viewBox="0 0 400 230" className="w-full" role="img" aria-label="Site map outline">
          {[40, 140, 240, 340].map((x) => (<path key={x} d={`M200 56 V86 H${x} V120`} fill="none" stroke="#8FA5FF" strokeOpacity=".6" strokeWidth="1.5" />))}
          <rect x="150" y="16" width="100" height="40" rx="8" fill="#315BFA" />
          <text x="200" y="41" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="var(--font-mono)">Home</text>
          {["About", "Services", "Quote", "Contact"].map((t, i) => (<g key={t}><rect x={i * 100 - 6 + 0} y="120" width="92" height="38" rx="8" fill="#F5F3EF" /><text x={i * 100 + 40} y="144" textAnchor="middle" fill="#101827" fontSize="12" fontFamily="var(--font-mono)">{t}</text></g>))}
          {[0, 1, 2, 3].map((i) => (<circle key={i} cx={52 + i * 100} cy="196" r="6" fill={i < 2 ? "#315BFA" : "#8FA5FF"} fillOpacity={i < 2 ? 1 : 0.4} />))}
          <path d="M52 196 H352" stroke="#8FA5FF" strokeOpacity=".4" />
        </svg>
      </div>
    );
  }
  if (index === 2) {
    return (
      <Frame>
        <div className="p-4">
          <div className="flex gap-3"><motion.i initial={{ backgroundColor: "#d9d7d1" }} animate={{ backgroundColor: "#101827" }} transition={{ delay: 0.3, duration: 0.8 }} className="block h-3 w-1/2 rounded-full" /><i className="ml-auto block h-3 w-10 rounded bg-cobalt" /></div>
          <div className="mt-5 grid grid-cols-[1.2fr_1fr] gap-3">
            <div><motion.i initial={{ backgroundColor: "#d9d7d1" }} animate={{ backgroundColor: "#101827" }} transition={{ delay: 0.5, duration: 0.8 }} className="block h-3 w-4/5 rounded-full" /><i className="mt-3 block h-1.5 w-full rounded-full bg-navy/10" /><i className="mt-2 block h-1.5 w-5/6 rounded-full bg-navy/10" /><motion.i initial={{ backgroundColor: "#d9d7d1" }} animate={{ backgroundColor: "#315BFA" }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-4 block h-6 w-20 rounded" /></div>
            <motion.div initial={{ backgroundColor: "#e5e3dd" }} animate={{ backgroundColor: "#DCE5FF" }} transition={{ delay: 0.6, duration: 0.8 }} className="aspect-square rounded-lg" />
          </div>
          <div className="mt-5 flex items-center gap-2">{["#101827", "#F5F3EF", "#315BFA", "#DCE5FF"].map((c, i) => (<Pop key={c} delay={0.9 + i * 0.08}><span className="block h-6 w-6 rounded-full border border-navy/15" style={{ background: c }} /></Pop>))}<span className="ml-auto font-display text-xl font-semibold text-navy">Aa</span></div>
        </div>
      </Frame>
    );
  }
  if (index === 3) {
    const lines = ["const site = build({", "  pages: approvedDesign,", "  forms: validated,", "  seo: true,", "});"];
    return (
      <Frame url="localhost:3000">
        <div className="bg-navy p-4 font-mono text-[11px] leading-relaxed text-slate">
          {lines.map((l, i) => (<motion.p key={l} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 * i }} className={i === 0 || i === 4 ? "text-cobalt-300" : ""}>{l}</motion.p>))}
          <div className="mt-4"><p className="mb-1.5 flex justify-between text-[10px] uppercase tracking-wider"><span>Building</span><span>72%</span></p><span className="block h-1.5 rounded-full bg-white/10"><motion.i initial={{ width: 0 }} animate={{ width: "72%" }} transition={{ duration: 1.4, ease: "easeOut" }} className="block h-1.5 rounded-full bg-cobalt" /></span></div>
        </div>
      </Frame>
    );
  }
  if (index === 4) {
    return (
      <div className="w-full max-w-[400px]">
        <div className="flex items-end justify-center gap-4">
          {[["h-28 w-40", "Desktop"], ["h-32 w-24", "Tablet"], ["h-28 w-14", "Phone"]].map(([sz, t], i) => (
            <Pop key={t} delay={i * 0.15} className="text-center">
              <div className={cn("relative rounded-lg border-[3px] border-ivory/80 bg-white/10", sz)}><motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 + i * 0.25, type: "spring", stiffness: 300 }} className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-emerald-500 text-white"><Check size={13} aria-hidden /></motion.span></div>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-slate">{t}</p>
            </Pop>
          ))}
        </div>
        <ul className="mt-6 space-y-2 text-sm text-fg">{["Forms and links", "Speed and performance", "Accessibility basics"].map((t, i) => (<motion.li key={t} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 + i * 0.15 }} className="flex items-center gap-2.5"><Check size={15} className="text-emerald-400" aria-hidden />{t}</motion.li>))}</ul>
      </div>
    );
  }
  if (index === 6) {
    return (
      <Frame>
        <div className="p-5 text-navy">
          <p className="font-mono text-[10px] uppercase tracking-wider text-cobalt">After launch</p>
          <ul className="mt-4 space-y-2.5">
            {[["Monitoring and checks", "Ongoing"], ["Updates and fixes", "As agreed"], ["Improvements", "Quoted"]].map(([t, v], i) => (
              <Pop key={t} delay={0.12 * i} className="flex items-center justify-between rounded-lg bg-softblue px-3 py-2.5 text-xs"><span className="font-medium">{t}</span><span className="font-mono text-[10px] uppercase tracking-wider text-muted">{v}</span></Pop>
            ))}
          </ul>
        </div>
      </Frame>
    );
  }
  return (
    <Frame>
      <div className="relative p-5">
        <span className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-emerald-800"><span className="relative h-1.5 w-1.5 rounded-full bg-emerald-600"><span className="absolute inset-0 animate-ping2 rounded-full bg-emerald-600" /></span>Live</span>
        <i className="block h-3 w-1/2 rounded-full bg-navy" /><i className="mt-3 block h-1.5 w-4/5 rounded-full bg-navy/10" /><i className="mt-2 block h-1.5 w-3/5 rounded-full bg-navy/10" /><i className="mt-4 block h-6 w-20 rounded bg-cobalt" />
        <ul className="mt-6 space-y-2 text-xs text-navy">{["Deployed", "Files and access handed over", "Support begins"].map((t, i) => (<motion.li key={t} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.2 }} className="flex items-center gap-2"><Check size={14} className="text-cobalt" aria-hidden />{t}</motion.li>))}</ul>
      </div>
    </Frame>
  );
}

/** Sticky visual that changes as the visitor scrolls through each project stage. Page scroll is never hijacked. */
export function ProcessJourney() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i)); }),
      { rootMargin: "-25% 0px -55% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-x-10 lg:grid-cols-[0.8fr_1.2fr] motion-reduce:!grid-cols-1">
      <div className="hidden lg:sticky lg:top-28 lg:block lg:self-start motion-reduce:!hidden">
        <div className="theme-dark relative flex h-[250px] items-center justify-center overflow-hidden rounded-2xl bg-navy p-4 lg:h-[540px] lg:p-8">
          <div aria-hidden className="absolute -right-10 top-0 h-56 w-56 rounded-full bg-cobalt/30 blur-[90px]" />
          <div className="absolute left-4 top-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.16em] text-muted lg:left-6 lg:top-6">
            <span className="text-accent">{PROCESS[active].n}</span> / {PROCESS.length < 10 ? `0${PROCESS.length}` : PROCESS.length} · {PROCESS[active].title}
          </div>
          <div className="relative flex w-full justify-center scale-[.72] sm:scale-90 lg:scale-100">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduce ? undefined : { opacity: 0, y: -16, scale: 0.98 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="flex w-full justify-center">
                <StageVisual index={active} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5" aria-hidden>
            {PROCESS.map((p, i) => (<span key={p.n} className={cn("h-1 rounded-full transition-all duration-500", i === active ? "w-6 bg-cobalt-300" : "w-1.5 bg-white/20")} />))}
          </div>
        </div>
      </div>

      <ol>
        {PROCESS.map((s, i) => (
          <li id={`stage-${s.n}`} key={s.n} data-i={i} ref={(el) => { refs.current[i] = el; }} className={cn("scroll-mt-28 border-l-2 border-b border-b-line py-6 pl-4 motion-safe:transition-colors sm:py-8 sm:pl-6", i === active ? "lg:border-l-cobalt" : "border-l-transparent")}>
            <p className="font-mono text-xs text-accent">Stage {s.n}</p>
            <h2 className="display-md mt-3">{s.title}</h2>
            <p className="body-lg mt-4">{s.summary}</p>
            <h3 className="label mb-3 mt-8">What to expect</h3>
            <ul className="space-y-2.5 text-[15px] leading-relaxed">
              {s.expect.map((e) => (<li key={e} className="flex gap-3"><span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-cobalt" />{e}</li>))}
            </ul>
            <dl className="mt-6 grid gap-3 sm:grid-cols-3">
              {([["You contribute", s.need], ["We deliver", s.delivers], ["Outcome", s.outcome]] as const).map(([k, v]) => (
                <div key={k} className="rounded-xl border border-line bg-card p-4"><dt className="label mb-2">{k}</dt><dd className="text-sm leading-relaxed text-muted">{v}</dd></div>
              ))}
            </dl>
          </li>
        ))}
      </ol>
    </div>
  );
}
