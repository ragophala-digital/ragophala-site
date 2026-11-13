import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function MockCaption({ children = "Illustrative interface" }: { children?: ReactNode }) {
  return <p className="mt-3 font-mono text-[10px] uppercase tracking-[.16em] text-muted">{children}</p>;
}

export function BrowserFrame({ url = "yourbusiness.co.za", children, className }: { url?: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-navy/15 bg-white shadow-[0_40px_70px_-40px_rgba(16,24,39,.55)]", className)}>
      <div className="flex items-center gap-2 border-b border-navy/10 bg-ivory-200 px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-navy/20" />
        <span className="h-2 w-2 rounded-full bg-navy/20" />
        <span className="h-2 w-2 rounded-full bg-navy/20" />
        <span className="ml-3 flex-1 truncate rounded-md bg-white px-3 py-1 font-mono text-[10px] text-muted">{url}</span>
      </div>
      {children}
    </div>
  );
}

const bar = "block rounded-full bg-navy/10";

export function SiteMock({ variant = "studio" }: { variant?: "studio" | "shop" | "booking" }) {
  return (
    <div className="p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <span className="font-display text-xs font-bold tracking-tight text-navy">brand<span className="text-cobalt">.</span></span>
        <span className="flex gap-3"><i className={cn(bar, "h-1.5 w-8")} /><i className={cn(bar, "h-1.5 w-8")} /><i className={cn(bar, "h-1.5 w-8")} /><i className="block h-4 w-12 rounded bg-cobalt" /></span>
      </div>
      {variant === "studio" && (
        <div className="mt-6 grid grid-cols-[1.2fr_1fr] items-center gap-4">
          <div>
            <i className={cn(bar, "h-3 w-4/5 bg-navy")} />
            <i className={cn(bar, "mt-2 h-3 w-3/5 bg-navy")} />
            <i className={cn(bar, "mt-4 h-1.5 w-full")} />
            <i className={cn(bar, "mt-1.5 h-1.5 w-5/6")} />
            <i className="mt-4 block h-5 w-20 rounded bg-cobalt" />
          </div>
          <div className="relative aspect-square rounded-xl bg-softblue">
            <span className="absolute inset-[18%] rounded-full bg-gradient-to-br from-cobalt to-cobalt-700" />
            <span className="absolute bottom-3 left-3 h-6 w-6 rounded bg-navy" />
          </div>
        </div>
      )}
      {variant === "shop" && (
        <div className="mt-6">
          <i className={cn(bar, "h-3 w-1/3 bg-navy")} />
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[0, 1, 2].map((n) => (
              <div key={n}>
                <div className={cn("aspect-[4/5] rounded-lg", n === 1 ? "bg-cobalt/80" : n === 0 ? "bg-softblue" : "bg-ivory-200")} />
                <i className={cn(bar, "mt-2 h-1.5 w-4/5")} />
                <i className={cn(bar, "mt-1.5 h-1.5 w-1/3 bg-cobalt/60")} />
              </div>
            ))}
          </div>
        </div>
      )}
      {variant === "booking" && (
        <div className="mt-6 grid grid-cols-[1.3fr_1fr] gap-4">
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: 21 }).map((_, n) => (
              <span key={n} className={cn("aspect-square rounded", n === 9 ? "bg-cobalt" : n % 5 === 0 ? "bg-softblue" : "bg-ivory-200")} />
            ))}
          </div>
          <div className="space-y-2">
            {["09:00", "10:30", "13:00", "15:30"].map((t, n) => (
              <span key={t} className={cn("block rounded border px-2 py-1.5 font-mono text-[10px]", n === 1 ? "border-cobalt bg-cobalt text-white" : "border-navy/15 text-muted")}>{t}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("aspect-[9/18.5] w-[132px] overflow-hidden rounded-[22px] border-[5px] border-navy bg-white shadow-[0_30px_50px_-25px_rgba(16,24,39,.6)]", className)}>
      <div className="mx-auto mt-1.5 h-1 w-10 rounded-full bg-navy/20" />
      {children}
    </div>
  );
}

export function PhoneSite() {
  return (
    <div className="p-3">
      <span className="font-display text-[9px] font-bold text-navy">brand<span className="text-cobalt">.</span></span>
      <i className={cn(bar, "mt-4 h-2.5 w-4/5 bg-navy")} />
      <i className={cn(bar, "mt-1.5 h-2.5 w-3/5 bg-navy")} />
      <i className={cn(bar, "mt-3 h-1 w-full")} />
      <i className={cn(bar, "mt-1 h-1 w-5/6")} />
      <i className="mt-3 block h-4 w-14 rounded bg-cobalt" />
      <div className="mt-4 aspect-[4/3] rounded-lg bg-softblue" />
      <div className="mt-2 grid grid-cols-2 gap-1.5">
        <span className="aspect-square rounded bg-ivory-200" />
        <span className="aspect-square rounded bg-cobalt/70" />
      </div>
    </div>
  );
}
