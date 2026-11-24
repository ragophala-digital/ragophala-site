import { STATUS_META } from "@/lib/products/categories";
import type { ProductStatus as Status } from "@/lib/products/types";
import { cn } from "@/lib/utils";
import { STATUS_ICONS } from "./icons";

const TONES = {
  green: "bg-emerald-100 text-emerald-900",
  cobalt: "bg-cobalt/10 text-[#2447D6]",
  amber: "bg-amber-100 text-amber-900",
  slate: "bg-[#E4E9F2] text-[#2f3a4f]",
  muted: "bg-[#EDEAE4] text-[#4d576b]",
} as const;

export function ProductStatus({ status, className }: { status: Status; className?: string }) {
  const m = STATUS_META[status];
  const Icon = STATUS_ICONS[status];
  return (
    <span title={m.meaning} className={cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[.1em]", TONES[m.tone], className)}>
      <Icon size={12} aria-hidden />
      <span>{m.label}</span>
      <span className="sr-only">. {m.meaning}</span>
    </span>
  );
}
