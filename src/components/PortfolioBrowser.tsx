"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { PROJECTS, PROJECT_CATEGORIES } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ProjectVisual } from "./ProjectVisual";
import { TiltCard } from "./ui";

export function PortfolioBrowser() {
  const [cat, setCat] = useState<(typeof PROJECT_CATEGORIES)[number]>("All");
  const list = PROJECTS.filter((p) => cat === "All" || p.category === cat);
  return (
    <>
      <div role="tablist" aria-label="Filter projects" className="mb-10 flex flex-wrap gap-2">
        {PROJECT_CATEGORIES.map((c) => (
          <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={cn("rounded-full border px-5 py-2 text-sm transition", cat === c ? "border-volt bg-volt text-white" : "border-white/15 text-slate-300 hover:border-volt-400")}>
            {c}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {list.length} projects shown
      </p>
      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div key={p.slug} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.3 }}>
              <TiltCard className="glass h-full">
                <Link href={`/portfolio/${p.slug}`} className="block h-full">
                  <ProjectVisual project={p} className="aspect-[16/10] w-full rounded-t-2xl" />
                  <div className="p-5">
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="uppercase tracking-widest text-volt-400">{p.category}</span>
                      <span className="rounded-full border border-white/15 px-2 py-0.5 text-slate-400">Demo project</span>
                    </div>
                    <h3 className="font-display text-lg">{p.title}</h3>
                    <p className="mt-2 text-sm text-slate-400">{p.summary}</p>
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
