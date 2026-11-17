"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useState } from "react";
import { PACKAGES_PUBLIC as PACKAGES } from "@/lib/catalogue-public";

/** Pick any two website packages to see what each includes. */
export function PackageCompare() {
  const [a, setA] = useState<string>(PACKAGES[2].id);
  const [b, setB] = useState<string>(PACKAGES[3].id);
  const pa = PACKAGES.find((p) => p.id === a)!;
  const pb = PACKAGES.find((p) => p.id === b)!;
  const shared = pa.features.filter((f) => (pb.features as readonly string[]).includes(f));
  const onlyA = pa.features.filter((f) => !(pb.features as readonly string[]).includes(f));
  const onlyB = pb.features.filter((f) => !(pa.features as readonly string[]).includes(f));

  const select = (value: string, set: (v: string) => void, label: string) => (
    <label className="block">
      <span className="label mb-2 block">{label}</span>
      <select value={value} onChange={(e) => set(e.target.value)} className="field">
        {PACKAGES.map((p) => (<option key={p.id} value={p.id}>{p.name}</option>))}
      </select>
    </label>
  );

  const column = (p: typeof pa, only: readonly string[]) => (
    <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="rounded-2xl border border-line bg-card p-6">
      <h3 className="font-display text-lg font-semibold tracking-tight">{p.name}</h3>
      <p className="mt-2 text-sm text-muted">{p.blurb}</p>
      <p className="label mb-3 mt-6">Specific to this package</p>
      {only.length ? (
        <ul className="space-y-2 text-[15px]">{only.map((f) => (<li key={f} className="flex gap-2.5"><Check size={16} className="mt-1 shrink-0 text-cobalt" aria-hidden />{f}</li>))}</ul>
      ) : (<p className="text-sm text-muted">Everything in this package is also in the other.</p>)}
      <Link href={`/contact?package=${p.id}`} className="btn btn-dark group mt-6">Request this package <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden /></Link>
    </motion.div>
  );

  return (
    <div className="rounded-2xl border border-line bg-white/50 p-5 sm:p-8" aria-label="Compare two website packages">
      <div className="grid gap-4 sm:grid-cols-2">{select(a, setA, "Package one")}{select(b, setB, "Package two")}</div>
      <p className="mt-6 text-[15px] text-muted" aria-live="polite">
        {a === b ? "Choose two different packages to compare." : "Features both packages share are listed below. Pricing is shared privately in a personalised quotation."}
      </p>
      {a !== b && shared.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">{shared.map((f) => (<li key={f} className="rounded-md bg-softblue px-2.5 py-1 text-xs text-navy">{f}</li>))}</ul>
      )}
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="wait" initial={false}>{column(pa, a === b ? [] : onlyA)}</AnimatePresence>
        <AnimatePresence mode="wait" initial={false}>{column(pb, a === b ? [] : onlyB)}</AnimatePresence>
      </div>
    </div>
  );
}
