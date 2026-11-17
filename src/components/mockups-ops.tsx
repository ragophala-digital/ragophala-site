import { Activity, CheckCircle2, DatabaseBackup, Gauge, ShieldCheck, Workflow, Bot, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

const ok = "text-emerald-700";

/** Illustrative website-health dashboard. All values are sample data. */
export function HealthMock({ className }: { className?: string }) {
  const checks = [
    { icon: Activity, label: "Availability", state: "Online" },
    { icon: ShieldCheck, label: "Security checks", state: "Passed" },
    { icon: DatabaseBackup, label: "Backup", state: "Completed" },
    { icon: Gauge, label: "Performance", state: "Good" },
  ];
  const bars = [90, 100, 100, 96, 100, 100, 88, 100, 100, 100, 94, 100];
  return (
    <div className={cn("overflow-hidden rounded-xl border border-navy/15 bg-ivory p-4 text-navy shadow-[0_40px_70px_-40px_rgba(16,24,39,.55)] sm:p-5", className)}>
      <div className="flex items-center justify-between">
        <p className="font-display text-sm font-semibold">Website health</p>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-medium text-emerald-800"><span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />All systems normal</span>
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-2.5">
        {checks.map((c) => (
          <li key={c.label} className="rounded-lg bg-white p-3">
            <c.icon size={15} className="text-cobalt" aria-hidden />
            <p className="mt-2 text-[10px] text-muted">{c.label}</p>
            <p className={cn("flex items-center gap-1 text-sm font-semibold", ok)}><CheckCircle2 size={13} aria-hidden />{c.state}</p>
          </li>
        ))}
      </ul>
      <div className="mt-2.5 rounded-lg bg-white p-3">
        <p className="text-[10px] text-muted">Availability, last 12 checks</p>
        <div className="mt-3 flex h-14 items-end gap-1" aria-hidden>
          {bars.map((h, i) => (<span key={i} className={cn("flex-1 rounded-sm", h === 100 ? "bg-cobalt" : "bg-cobalt/40")} style={{ height: `${h}%` }} />))}
        </div>
      </div>
    </div>
  );
}

/** Illustrative assistant and workflow monitoring panel. All values are sample data. */
export function MonitorMock({ className }: { className?: string }) {
  const rows = [
    { icon: Bot, name: "Website assistant", state: "Running", note: "Knowledge up to date" },
    { icon: Workflow, name: "Enquiry workflow", state: "Running", note: "Last run succeeded" },
    { icon: Link2, name: "CRM integration", state: "Connected", note: "Credentials valid" },
    { icon: Bot, name: "WhatsApp assistant", state: "Needs review", note: "Template update pending" },
  ];
  return (
    <div className={cn("overflow-hidden rounded-xl border border-white/15 bg-navy-800 p-4 text-ivory shadow-[0_40px_70px_-40px_rgba(0,0,0,.8)] sm:p-5", className)}>
      <p className="font-display text-sm font-semibold">Assistants and workflows</p>
      <ul className="mt-4 space-y-2">
        {rows.map((r) => (
          <li key={r.name} className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-cobalt/20 text-cobalt-300"><r.icon size={15} aria-hidden /></span>
            <span className="min-w-0 flex-1"><span className="block truncate text-[13px] font-medium">{r.name}</span><span className="block truncate text-[11px] text-slate">{r.note}</span></span>
            <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", r.state === "Needs review" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800")}>{r.state}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
