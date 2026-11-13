"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { PROJECTS, PROJECT_CATEGORIES } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ProjectVisual } from "./ProjectVisual";

export function PortfolioBrowser() {
  const [cat, setCat] = useState<(typeof PROJECT_CATEGORIES)[number]>("All");
  const list = PROJECTS.filter((p) => cat === "All" || p.category === cat);
  return (
    <>
      <div role="tablist" aria-label="Filter concepts" className="mb-10 flex flex-wrap gap-2">
        {PROJECT_CATEGORIES.map((c) => (
          <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={cn("rounded-[10px] border px-4 py-2 text-sm transition", cat === c ? "border-navy bg-navy text-ivory" : "border-line text-muted hover:border-cobalt hover:text-heading")}>{c}</button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{list.length} concepts shown</p>
      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div key={p.slug} layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.3 }}>
              <Link href={`/portfolio/${p.slug}`} className="group block h-full overflow-hidden rounded-2xl border border-line bg-card transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_50px_-30px_rgba(16,24,39,.35)]">
                <ProjectVisual project={p} className="aspect-[16/10] w-full" />
                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between"><span className="label">{p.category}</span><span className="rounded-md bg-softblue px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-navy">Concept</span></div>
                  <div className="flex items-start justify-between gap-3"><h3 className="font-display text-lg font-semibold tracking-tight">{p.title}</h3><ArrowUpRight size={18} className="mt-1 shrink-0 text-muted transition group-hover:text-cobalt" aria-hidden /></div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.summary}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
