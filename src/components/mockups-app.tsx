import { BarChart3, Boxes, ClipboardList, LayoutDashboard, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Overview" },
  { icon: Users, label: "Customers" },
  { icon: Boxes, label: "Inventory" },
  { icon: ClipboardList, label: "Orders" },
  { icon: BarChart3, label: "Reports" },
];

const KPIS = [
  ["Open jobs", "24", "+3 today"],
  ["Customers", "312", "+12 this week"],
  ["Low stock", "7", "Reorder"],
  ["Invoices due", "11", "2 overdue"],
];

const BARS = [38, 52, 44, 66, 58, 74, 62, 80, 70, 88, 76, 94];

const ROWS: [string, string, string, "Paid" | "Pending" | "Overdue"][] = [
  ["INV-1042", "Thabo Mokoena", "R 4,800", "Paid"],
  ["INV-1043", "Lerato Dlamini", "R 12,350", "Pending"],
  ["INV-1044", "Naidoo Trading", "R 2,975", "Overdue"],
  ["INV-1045", "Karoo Supplies", "R 8,120", "Paid"],
];

const PILL: Record<string, string> = {
  Paid: "bg-emerald-100 text-emerald-800",
  Pending: "bg-amber-100 text-amber-800",
  Overdue: "bg-rose-100 text-rose-800",
};

export function StatusPill({ status }: { status: string }) {
  return <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", PILL[status] ?? "bg-softblue text-navy")}>{status}</span>;
}

export function DashboardMock({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-[132px_1fr] overflow-hidden rounded-xl border border-white/15 bg-ivory text-navy shadow-[0_50px_90px_-40px_rgba(0,0,0,.8)]", className)}>
      <aside className="hidden bg-navy-800 p-4 sm:block" aria-hidden>
        <p className="font-display text-xs font-bold text-ivory">ops<span className="text-cobalt-300">.</span></p>
        <ul className="mt-6 space-y-1">
          {NAV_ITEMS.map((n, i) => (
            <li key={n.label} className={cn("flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px]", i === 0 ? "bg-cobalt text-white" : "text-slate")}>
              <n.icon size={13} /> {n.label}
            </li>
          ))}
        </ul>
      </aside>
      <div className="col-span-2 p-4 sm:col-span-1 sm:p-5">
        <div className="flex items-center justify-between">
          <p className="font-display text-sm font-semibold">Overview</p>
          <span className="flex items-center gap-2"><i className="block h-6 w-28 rounded-md bg-white" /><i className="block h-6 w-6 rounded-full bg-cobalt" /></span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          {KPIS.map(([l, v, d]) => (
            <div key={l} className="rounded-lg bg-white p-3">
              <p className="text-[10px] text-muted">{l}</p>
              <p className="mt-1 font-display text-xl font-semibold">{v}</p>
              <p className="font-mono text-[9px] text-cobalt">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-2.5 grid gap-2.5 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-lg bg-white p-3">
            <p className="text-[10px] text-muted">Monthly activity</p>
            <div className="mt-3 flex h-24 items-end gap-1.5">
              {BARS.map((h, i) => (<span key={i} className={cn("flex-1 rounded-t", i === 11 ? "bg-cobalt" : "bg-softblue")} style={{ height: `${h}%` }} />))}
            </div>
          </div>
          <div className="rounded-lg bg-white p-3">
            <p className="text-[10px] text-muted">Pipeline</p>
            <svg viewBox="0 0 120 70" className="mt-2 h-24 w-full" aria-hidden>
              <path d="M0 55 L20 45 L40 50 L60 30 L80 35 L100 15 L120 20" fill="none" stroke="#315BFA" strokeWidth="2" />
              <path d="M0 55 L20 45 L40 50 L60 30 L80 35 L100 15 L120 20 V70 H0Z" fill="#DCE5FF" opacity=".6" />
            </svg>
          </div>
        </div>
        <div className="mt-2.5 overflow-x-auto rounded-lg bg-white">
          <table className="w-full min-w-[320px] text-left text-[10px]">
            <thead className="text-muted"><tr><th className="p-2.5 font-medium">Ref</th><th className="p-2.5 font-medium">Customer</th><th className="p-2.5 font-medium">Amount</th><th className="p-2.5 font-medium">Status</th></tr></thead>
            <tbody>
              {ROWS.map(([r, c, a, s]) => (
                <tr key={r} className="border-t border-navy/10"><td className="p-2.5 font-mono">{r}</td><td className="p-2.5">{c}</td><td className="p-2.5">{a}</td><td className="p-2.5"><StatusPill status={s} /></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const STOCK: [string, string, number, string][] = [
  ["SKU-2001", "Steel bracket 40mm", 82, "In stock"],
  ["SKU-2014", "Safety gloves (pair)", 18, "Low"],
  ["SKU-2030", "Cable ties 300mm", 64, "In stock"],
  ["SKU-2047", "Work lamp LED", 6, "Low"],
];

export function InventoryMock({ className }: { className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-navy/15 bg-white text-navy shadow-[0_30px_60px_-40px_rgba(16,24,39,.5)]", className)}>
      <div className="flex items-center justify-between border-b border-navy/10 px-4 py-3"><p className="font-display text-sm font-semibold">Inventory</p><span className="rounded-md bg-cobalt px-2.5 py-1 text-[10px] text-white">Add item</span></div>
      <ul>
        {STOCK.map(([sku, name, qty, st]) => (
          <li key={sku} className="grid grid-cols-[70px_1fr_60px] items-center gap-3 border-b border-navy/10 px-4 py-3 text-[11px] last:border-0">
            <span className="font-mono text-muted">{sku}</span>
            <span><span className="block">{name}</span><span className="mt-1.5 block h-1 rounded-full bg-softblue"><i className={cn("block h-1 rounded-full", st === "Low" ? "bg-amber-500" : "bg-cobalt")} style={{ width: `${qty}%` }} /></span></span>
            <span className={cn("text-right font-medium", st === "Low" ? "text-amber-700" : "text-navy")}>{qty}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CrmMock({ className }: { className?: string }) {
  const cols = [["Lead", 3], ["Qualified", 2], ["Proposal", 2], ["Won", 1]] as const;
  return (
    <div className={cn("rounded-xl border border-navy/15 bg-ivory-200 p-3 text-navy shadow-[0_30px_60px_-40px_rgba(16,24,39,.5)]", className)}>
      <p className="mb-3 px-1 font-display text-sm font-semibold">Pipeline</p>
      <div className="grid grid-cols-4 gap-2">
        {cols.map(([name, n]) => (
          <div key={name}>
            <p className="mb-2 px-1 font-mono text-[9px] uppercase tracking-wider text-muted">{name}</p>
            <div className="space-y-2">
              {Array.from({ length: n }).map((_, i) => (
                <div key={i} className="rounded-md bg-white p-2"><i className="block h-1.5 w-4/5 rounded-full bg-navy/70" /><i className="mt-1.5 block h-1 w-3/5 rounded-full bg-navy/15" /><i className={cn("mt-2 block h-3 w-8 rounded", name === "Won" ? "bg-emerald-200" : "bg-softblue")} /></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PortalMock({ className }: { className?: string }) {
  const steps = ["Request received", "In progress", "Ready for review"];
  return (
    <div className={cn("grid grid-cols-[1fr_1.2fr] overflow-hidden rounded-xl border border-navy/15 bg-white text-navy shadow-[0_30px_60px_-40px_rgba(16,24,39,.5)]", className)}>
      <ul className="border-r border-navy/10 p-3 text-[11px]">
        {[["Quote request", "Pending"], ["Site visit", "Paid"], ["Order #1042", "Pending"]].map(([t, s], i) => (
          <li key={t} className={cn("mb-1.5 flex items-center justify-between rounded-md p-2", i === 0 && "bg-softblue")}><span>{t}</span><StatusPill status={s} /></li>
        ))}
      </ul>
      <div className="p-4 text-[11px]">
        <p className="font-display text-sm font-semibold">Quote request</p>
        <ol className="mt-3 space-y-3">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-2"><span className={cn("grid h-4 w-4 place-items-center rounded-full text-[8px]", i < 2 ? "bg-cobalt text-white" : "border border-navy/25 text-muted")}>{i + 1}</span>{s}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
