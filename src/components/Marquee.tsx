import type { ReactNode } from "react";

/** Endless horizontal ticker. Content is repeated once for a seamless loop; the copy is hidden from assistive tech. */
export function Marquee({ items, label }: { items: ReactNode[]; label: string }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-12 pr-12">
      {items.map((it, i) => <li key={i} className="whitespace-nowrap font-display text-xl font-semibold tracking-tight text-muted sm:text-2xl">{it}</li>)}
    </ul>
  );
  return (
    <div role="group" aria-label={label} className="marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <div className="marquee-track flex w-max">{row(false)}{row(true)}</div>
    </div>
  );
}
