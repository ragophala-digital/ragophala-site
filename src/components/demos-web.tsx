"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Monitor, Smartphone, Tablet } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { BrowserFrame, SiteMock } from "./mockups-web";

type Device = "desktop" | "tablet" | "mobile";

/** A real, live project shown at each screen width using screenshots taken at that width. */
export interface ShowcaseSite {
  name: string;
  url: string;
  shots: Record<Device, { src: string; width: number; height: number }>;
}

const DEVICES: Record<Device, { label: string; icon: typeof Monitor; w: string; h: string; r: number; border: number }> = {
  desktop: { label: "Desktop", icon: Monitor, w: "100%", h: "100%", r: 12, border: 1 },
  tablet: { label: "Tablet", icon: Tablet, w: "58%", h: "96%", r: 24, border: 8 },
  mobile: { label: "Mobile", icon: Smartphone, w: "27%", h: "98%", r: 26, border: 7 },
};

/** Logical screen widths a live site is rendered at before being scaled into the frame. */
const LIVE_WIDTH: Record<Device, number> = { desktop: 1440, tablet: 820, mobile: 390 };

/** The real site, running, at true device width and scaled to fit. It can be scrolled, tapped and clicked. */
function LiveFrame({ url, name, width }: { url: string; name: string; width: number }) {
  const box = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const scale = size.w / width;
  return (
    <div ref={box} className="h-full w-full overflow-hidden bg-white">
      {scale > 0 && (
        <iframe
          src={url}
          title={`${name} live website`}
          loading="lazy"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          style={{ width, height: size.h / scale, transform: `scale(${scale})`, transformOrigin: "0 0", border: 0 }}
        />
      )}
    </div>
  );
}

/** Real screenshots need more room than the sketch, especially on a phone. */
const SITE_FRAMES: Record<"wide" | "narrow", Record<Device, { w: string; h: string }>> = {
  wide: { desktop: { w: "100%", h: "100%" }, tablet: { w: "62%", h: "96%" }, mobile: { w: "30%", h: "98%" } },
  narrow: { desktop: { w: "100%", h: "100%" }, tablet: { w: "82%", h: "96%" }, mobile: { w: "56%", h: "98%" } },
};

const bar = "block rounded-full bg-navy/10";

function ResponsiveSite({ device }: { device: Device }) {
  const cols = device === "desktop" ? "grid-cols-3" : device === "tablet" ? "grid-cols-2" : "grid-cols-1";
  const stacked = device === "mobile";
  return (
    <div className="h-full overflow-hidden bg-white p-3 sm:p-4">
      <div className="flex items-center justify-between">
        <span className="font-display text-[10px] font-bold text-navy sm:text-xs">brand<span className="text-cobalt">.</span></span>
        {stacked ? (
          <span className="space-y-1" aria-hidden><i className="block h-0.5 w-4 bg-navy" /><i className="block h-0.5 w-4 bg-navy" /><i className="block h-0.5 w-4 bg-navy" /></span>
        ) : (
          <span className="flex items-center gap-2 sm:gap-3"><i className={cn(bar, "h-1.5 w-6 sm:w-8")} /><i className={cn(bar, "h-1.5 w-6 sm:w-8")} />{device === "desktop" && <i className={cn(bar, "h-1.5 w-8")} />}<i className="block h-3.5 w-10 rounded bg-cobalt sm:h-4 sm:w-12" /></span>
        )}
      </div>
      <div className={cn("mt-4 grid items-center gap-3 sm:mt-6", stacked ? "grid-cols-1" : "grid-cols-[1.2fr_1fr]")}>
        <div>
          <i className={cn(bar, "h-2.5 w-4/5 bg-navy sm:h-3")} />
          <i className={cn(bar, "mt-1.5 h-2.5 w-3/5 bg-navy sm:h-3")} />
          <i className={cn(bar, "mt-3 h-1 w-full")} />
          <i className={cn(bar, "mt-1 h-1 w-5/6")} />
          <i className="mt-3 block h-4 w-16 rounded bg-cobalt" />
        </div>
        <div className={cn("relative rounded-lg bg-softblue", stacked ? "aspect-[16/9]" : "aspect-square")}>
          <span className="absolute inset-[22%] rounded-full bg-gradient-to-br from-cobalt to-cobalt-700" />
        </div>
      </div>
      <div className={cn("mt-4 grid gap-2 sm:mt-5 sm:gap-3", cols)}>
        {[0, 1, 2].slice(0, device === "mobile" ? 1 : device === "tablet" ? 2 : 3).map((n) => (
          <div key={n} className="rounded-lg border border-navy/10 p-2.5">
            <span className={cn("block h-5 w-5 rounded", n === 1 ? "bg-cobalt" : "bg-softblue")} />
            <i className={cn(bar, "mt-2 h-1.5 w-3/4 bg-navy/60")} />
            <i className={cn(bar, "mt-1.5 h-1 w-full")} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Switch between desktop, tablet and mobile and watch one website adapt. Pass `site` to show a real project. */
export function DeviceShowcase({ className, site, live }: { className?: string; site?: ShowcaseSite; live?: boolean }) {
  const [device, setDevice] = useState<Device>("desktop");
  const [narrow, setNarrow] = useState(false);
  const d = DEVICES[device];

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const on = () => setNarrow(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const frame = site ? SITE_FRAMES[narrow ? "narrow" : "wide"][device] : { w: d.w, h: d.h };
  const shot = site?.shots[device];
  return (
    <div className={className}>
      <div role="tablist" aria-label="Preview device" className="mb-4 inline-flex rounded-xl border border-line bg-card p-1">
        {(Object.keys(DEVICES) as Device[]).map((k) => {
          const Icon = DEVICES[k].icon;
          return (
            <button key={k} role="tab" aria-selected={device === k} onClick={() => setDevice(k)} className={cn("relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-colors", device === k ? "text-white" : "text-muted hover:text-heading")}>
              {device === k && <motion.span layoutId="device-pill" className="absolute inset-0 rounded-lg bg-navy" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              <Icon size={16} className="relative" aria-hidden /><span className="relative">{DEVICES[k].label}</span>
            </button>
          );
        })}
      </div>
      <div className={cn("relative flex w-full items-center justify-center rounded-2xl bg-gradient-to-br from-softblue to-ivory-200 p-4 sm:p-7", site ? "h-[520px] sm:aspect-[16/10] sm:h-auto" : "aspect-[16/10]")}>
        <motion.div layout animate={{ width: frame.w, height: frame.h, borderRadius: d.r, borderWidth: d.border }} transition={{ type: "spring", stiffness: 140, damping: 22 }} className="overflow-hidden border-solid border-navy bg-white shadow-[0_40px_70px_-35px_rgba(16,24,39,.6)]" role="img" aria-label={site ? `${site.name} website on ${d.label.toLowerCase()}` : `Website preview on ${d.label.toLowerCase()}`}>
          {site && live ? (
            <LiveFrame key={device} url={site.url} name={site.name} width={LIVE_WIDTH[device]} />
          ) : site && shot ? (
            <div key={device} className="h-full overflow-y-auto overscroll-contain" tabIndex={0} aria-label={`Scrollable ${site.name} preview, ${d.label.toLowerCase()} layout`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={shot.src} width={shot.width} height={shot.height} alt="" loading="lazy" decoding="async" className="block h-auto w-full" />
            </div>
          ) : (
            <ResponsiveSite device={device} />
          )}
        </motion.div>
      </div>
      {site ? (
        <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[.16em] text-muted">
          <span>{live ? `Live site · ${site.name} · ${d.label} layout. Tap, click and scroll inside the frame.` : `Real project · ${site.name} · ${d.label} layout. Scroll inside the frame.`}</span>
          <a href={site.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#2447D6] underline underline-offset-2">Visit the live site <ArrowUpRight size={11} aria-hidden /></a>
        </p>
      ) : (
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[.16em] text-muted">Illustrative website · {d.label} layout</p>
      )}
    </div>
  );
}

function OldSite() {
  return (
    <div className="h-full overflow-hidden bg-[#e9e6dc] p-3 font-serif text-[#3a3a3a]">
      <div className="bg-[#1d4f91] p-2 text-[10px] font-bold text-white">MY BUSINESS WEBSITE - WELCOME!!!</div>
      <div className="mt-1.5 flex flex-wrap gap-x-2 text-[8px] text-[#1d4fd1] underline">{["Home", "About us", "Products", "Services", "Gallery", "News", "Links", "Guestbook", "Contact"].map((l) => <span key={l}>{l}</span>)}</div>
      <div className="mt-2 grid grid-cols-[1fr_2fr_1fr] gap-2">
        <div className="space-y-1 bg-[#d6d2c4] p-1.5">{Array.from({ length: 7 }).map((_, i) => <i key={i} className="block h-1 bg-[#9a9684]" />)}</div>
        <div className="space-y-1 bg-white p-2"><i className="block h-2 w-3/4 bg-[#c33]" />{Array.from({ length: 9 }).map((_, i) => <i key={i} className="block h-1 bg-[#bbb]" />)}</div>
        <div className="space-y-2"><i className="block h-10 bg-[#f2d230]" /><i className="block h-8 bg-[#d94b4b]" /><i className="block h-6 bg-[#6aa84f]" /></div>
      </div>
      <p className="mt-2 text-[8px]">You are visitor number 004821</p>
    </div>
  );
}

/** Drag, tap or use the arrow keys to compare an outdated site with a redesign. */
export function BeforeAfter({ className }: { className?: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className={className}>
      <div className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-2xl border border-line bg-white">
        <div className="absolute inset-0 bg-ivory-200 p-3 sm:p-6">
          <BrowserFrame url="newsite.co.za" className="h-full"><SiteMock variant="studio" /><div className="grid grid-cols-3 gap-2 p-5 pt-0">{[0, 1, 2].map((n) => <span key={n} className={cn("h-12 rounded", n === 1 ? "bg-cobalt/80" : "bg-softblue")} />)}</div></BrowserFrame>
        </div>
        <div className="absolute inset-0 bg-[#cfcbbd] p-3 sm:p-6" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <BrowserFrame url="oldsite.co.za" className="h-full"><OldSite /></BrowserFrame>
        </div>
        <span className="pointer-events-none absolute left-3 top-3 rounded-md bg-navy/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-ivory">Before</span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-md bg-cobalt px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white">After</span>
        <div aria-hidden className="pointer-events-none absolute inset-y-0 w-px bg-white shadow-[0_0_0_1px_rgba(16,24,39,.2)]" style={{ left: `${pos}%` }}>
          <span className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-navy/20 bg-white font-mono text-xs text-navy shadow-lg">↔</span>
        </div>
        <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} aria-label="Reveal the redesigned website" className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
      </div>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[.16em] text-muted">Illustrative redesign · drag to compare</p>
    </div>
  );
}
