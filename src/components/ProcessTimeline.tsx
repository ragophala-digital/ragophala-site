"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { PROCESS } from "@/lib/site";

export function ProcessTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  return (
    <ol ref={ref} className="relative">
      <span aria-hidden className="absolute bottom-0 left-[11px] top-2 w-px bg-[var(--line)] sm:left-[15px]" />
      <motion.span aria-hidden style={{ scaleY: reduce ? 1 : fill }} className="absolute bottom-0 left-[11px] top-2 w-px origin-top bg-cobalt sm:left-[15px]" />
      {PROCESS.map((s) => (
        <motion.li key={s.n} initial={reduce ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="relative grid gap-6 pb-16 pl-10 sm:pl-14 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          <span aria-hidden className="absolute left-0 top-1.5 grid h-6 w-6 place-items-center rounded-full border border-cobalt bg-ivory sm:left-1 sm:h-7 sm:w-7"><span className="h-2 w-2 rounded-full bg-cobalt" /></span>
          <div>
            <p className="font-mono text-xs text-accent">Stage {s.n}</p>
            <h2 className="display-md mt-3">{s.title}</h2>
            <p className="body-lg mt-4">{s.summary}</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-[1.3fr_1fr]">
            <div>
              <h3 className="label mb-3">What to expect</h3>
              <ul className="space-y-2.5 text-[15px] leading-relaxed">
                {s.expect.map((e) => (<li key={e} className="flex gap-3"><span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-cobalt" />{e}</li>))}
              </ul>
            </div>
            <div className="rounded-xl border border-line bg-card p-5">
              <h3 className="label mb-2">What we need from you</h3>
              <p className="text-sm leading-relaxed text-muted">{s.need}</p>
            </div>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
