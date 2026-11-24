import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { DIVISIONS } from "@/lib/products/categories";
import { ICONS } from "./icons";

/** Seven independent product tiles around an "optional links" centre. Pure CSS and SVG: no 3D, no JavaScript. */
function EcosystemIllustration() {
  const pts = DIVISIONS.map((d, i) => {
    const a = ((-90 + (i * 360) / DIVISIONS.length) * Math.PI) / 180;
    return { d, x: 50 + Math.cos(a) * 36, y: 50 + Math.sin(a) * 36 };
  });
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]" role="img" aria-label="Seven independent product families arranged around optional connections between them">
      <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {pts.map((p, i) => {
          const n = pts[(i + 1) % pts.length];
          return <line key={p.d.id} x1={p.x} y1={p.y} x2={n.x} y2={n.y} stroke="#315BFA" strokeOpacity={0.35} strokeWidth={0.35} strokeDasharray="1.6 1.6" vectorEffect="non-scaling-stroke" className="eco-dash" />;
        })}
        {pts.map((p) => (<line key={`c-${p.d.id}`} x1={50} y1={50} x2={p.x} y2={p.y} stroke="#315BFA" strokeOpacity={0.12} strokeWidth={0.3} vectorEffect="non-scaling-stroke" />))}
      </svg>
      <div className="absolute left-1/2 top-1/2 grid h-[84px] w-[84px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cobalt/30 bg-white text-center shadow-[0_20px_40px_-24px_rgba(49,91,250,.5)]">
        <span className="font-mono text-[9px] uppercase leading-tight tracking-[.12em] text-[#2447D6]">Optional<br />links</span>
      </div>
      {pts.map(({ d, x, y }, i) => {
        const Icon = ICONS[d.icon];
        return (
          <div key={d.id} className="absolute w-[26%] -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
            <div className="animate-rise rounded-xl border border-navy/10 bg-white p-2.5 shadow-[0_18px_30px_-22px_rgba(16,24,39,.45)]" style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
              <span className="grid h-7 w-7 place-items-center rounded-md bg-softblue text-cobalt"><Icon size={14} aria-hidden /></span>
              <p className="mt-2 truncate font-display text-[11px] font-semibold leading-tight text-navy sm:text-xs">{d.short}</p>
              <span className="mt-1.5 block h-1 w-3/4 rounded-full bg-navy/10" />
              <span className="mt-1 block h-1 w-1/2 rounded-full bg-navy/5" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ProductsHero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40 lg:pb-24">
      <div aria-hidden className="grid-lines absolute inset-0 opacity-50" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="animate-rise">
          <p className="label mb-6 flex items-center gap-3"><span aria-hidden className="h-px w-8 bg-current opacity-40" />Ragophala Digital / Software ecosystem</p>
          <h1 className="display-lg max-w-[14ch]">Software for the way businesses work.</h1>
          <p className="body-lg mt-6">Ragophala Digital develops purpose-built software that helps businesses simplify operations, connect workflows, automate repetitive tasks and grow with confidence.</p>
          <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-[#566075]">From everyday business management to industry-specific solutions and intelligent automation, discover a growing ecosystem of independent software products designed to solve real-world problems.</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link href="#directory" className="btn btn-primary">Explore products <ArrowDown size={16} aria-hidden /></Link>
            <Link href="#vision" className="link-underline text-sm font-medium text-heading">Discover our vision</Link>
          </div>
        </div>
        <EcosystemIllustration />
      </div>
    </section>
  );
}
