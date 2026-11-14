"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CrmMock, DashboardMock, InventoryMock, PortalMock, ReportMock } from "./mockups-app";

const TABS = [
  { id: "dashboard", label: "Business dashboard", note: "A daily overview of jobs, customers, stock and invoices." },
  { id: "crm", label: "CRM", note: "Track every enquiry from first contact to won work." },
  { id: "inventory", label: "Inventory", note: "Live stock levels with low-stock alerts." },
  { id: "portal", label: "Client management", note: "A secure portal where clients follow their requests." },
  { id: "reporting", label: "Reporting", note: "Clear reports you can export and share." },
] as const;

function View({ id }: { id: (typeof TABS)[number]["id"] }) {
  if (id === "dashboard") return <DashboardMock wide />;
  if (id === "crm") return <CrmMock className="mx-auto max-w-3xl" />;
  if (id === "inventory") return <InventoryMock className="mx-auto max-w-2xl" />;
  if (id === "portal") return <PortalMock className="mx-auto max-w-2xl" />;
  return <ReportMock className="mx-auto max-w-3xl" />;
}

/** Tabbed tour of the kinds of interface we build. */
export function AppShowcase({ className }: { className?: string }) {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("dashboard");
  const reduce = useReducedMotion();
  const current = TABS.find((t) => t.id === tab)!;
  return (
    <div className={className}>
      <div role="tablist" aria-label="Application examples" className="mb-5 flex gap-1 overflow-x-auto rounded-xl border border-line bg-card p-1">
        {TABS.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)} className={cn("relative shrink-0 rounded-lg px-4 py-2.5 text-sm transition-colors", tab === t.id ? "text-navy" : "text-muted hover:text-heading")}>
            {tab === t.id && <motion.span layoutId="app-tab" className="absolute inset-0 rounded-lg bg-ivory" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
            <span className="relative">{t.label}</span>
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-2xl border border-line bg-navy-800/60 p-3 sm:p-6">
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={reduce ? false : { opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={reduce ? undefined : { opacity: 0, x: -28 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} role="tabpanel">
            <View id={tab} />
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="mt-3 text-sm text-muted">{current.note}</p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[.16em] text-muted">Illustrative interfaces · sample data</p>
    </div>
  );
}
