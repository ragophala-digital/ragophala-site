"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export function Faq({ items, light }: { items: { q: string; a: string }[]; light?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <div className="space-y-3">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q} className={cn("rounded-2xl border", light ? "border-navy-900/10 bg-white" : "glass")}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className={cn("flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium", light ? "text-navy-900" : "text-white")}
              >
                {it.q}
                <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-full bg-volt text-white transition-transform duration-300", isOpen && "rotate-45")}>
                  <Plus size={16} aria-hidden />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div id={`${id}-${i}`} role="region" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                  <p className={cn("px-5 pb-5 text-sm leading-relaxed", light ? "text-slate-600" : "text-slate-400")}>{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
