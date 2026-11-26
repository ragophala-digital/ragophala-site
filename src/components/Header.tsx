"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Activity, ArrowUpRight, Bot, ChevronDown, Globe, LayoutDashboard, Menu, ShieldCheck, Workflow, X, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NAV, SERVICES, type ServiceKey } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Magnetic } from "./ui-motion";

export function Wordmark({ dark, onClick }: { dark?: boolean; onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} aria-label="Ragophala Digital home" className="group flex flex-col leading-none">
      <span className={cn("font-display text-[1.35rem] font-bold tracking-[-0.04em] transition-colors", dark ? "text-ivory" : "text-navy")}>
        RAGOPHALA<span className="text-cobalt transition-transform group-hover:translate-y-[-2px]">.</span>
      </span>
      <span className={cn("mt-1 font-mono text-[9px] uppercase tracking-[.42em]", dark ? "text-slate" : "text-muted")}>Digital</span>
    </Link>
  );
}

const MENU_LINKS = [...NAV, { href: "/lab", label: "3D Lab" }, { href: "/faq", label: "FAQ" }];

const SERVICE_ICONS: Record<ServiceKey, LucideIcon> = { web: Globe, apps: LayoutDashboard, ai: Bot, automation: Workflow, maintenance: ShieldCheck, support: Activity };

/** Services mega-menu: opens on hover, focus or click; closes with Escape, outside click or navigation. */
function ServicesMenu({ active, path }: { active: boolean; path: string }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLLIElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => {
    clearTimeout(timer.current);
    setOpen(false);
  }, [path]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        root.current?.querySelector<HTMLElement>("button")?.focus();
      }
    };
    const onDown = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);
  const hover = (v: boolean) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(v), v ? 60 : 140);
  };
  return (
    <li ref={root} onMouseEnter={() => hover(true)} onMouseLeave={() => hover(false)} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false); }}>
      <span className="relative flex items-center">
        <Link href="/services" onClick={() => { clearTimeout(timer.current); setOpen(false); }} aria-current={active ? "page" : undefined} className={cn("py-2 pl-3.5 pr-1 text-sm transition-colors", "text-muted hover:text-navy", (active || open) && "!text-navy")}>Services</Link>
        <button type="button" aria-expanded={open} aria-controls="services-menu" aria-label="Show services menu" onClick={() => setOpen((o) => !o)} className={cn("py-2 pl-0.5 pr-3 transition-colors", "text-muted hover:text-navy", (active || open) && "!text-navy")}>
          <ChevronDown size={14} aria-hidden className={cn("transition-transform duration-300", open && "rotate-180")} />
        </button>
        {active && <span aria-hidden className="absolute inset-x-3.5 -bottom-0.5 h-px bg-cobalt" />}
      </span>
      <AnimatePresence>
        {open && (
          <motion.div id="services-menu" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }} className="theme-dark absolute inset-x-0 top-full border-b border-white/10 bg-navy shadow-[0_40px_80px_-30px_rgba(0,0,0,.6)]">
            <div className="container-x grid gap-10 py-9 lg:grid-cols-[1fr_270px]">
              <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2 xl:grid-cols-3">
                {SERVICES.map((s) => {
                  const Icon = SERVICE_ICONS[s.key];
                  return (
                    <li key={s.key}>
                      <Link href={s.href} className="group flex gap-4 rounded-xl p-3 transition hover:bg-white/5 focus-visible:bg-white/5">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/15 bg-cobalt/15 text-cobalt-300 transition group-hover:border-cobalt-300"><Icon size={18} aria-hidden /></span>
                        <span><span className="block font-display text-[15px] font-semibold tracking-tight text-ivory">{s.title}</span><span className="mt-1 block text-xs leading-relaxed text-slate">{s.short}</span></span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[.04] p-6">
                <div>
                  <p className="label">Start a project</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate">Tell us what you want to build and receive a personalised written quotation.</p>
                </div>
                <div className="mt-6 flex flex-col gap-2">
                  <Link href="/contact" className="btn btn-primary">Start a project <ArrowUpRight size={15} aria-hidden /></Link>
                  <Link href="/services" className="btn btn-line !border-white/20 !text-ivory">All services</Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/** Full-screen menu. Rendered outside the header so the header's blur cannot shrink it. */
function MobileMenu({ onClose, path }: { onClose: () => void; path: string }) {
  const reduceMotion = useReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const trigger = document.activeElement;
    closeRef.current?.focus();
    return () => {
      if (trigger instanceof HTMLElement) trigger.focus();
    };
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;
      const controls = menuRef.current?.querySelectorAll<HTMLElement>("a[href], button");
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      ref={menuRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
      className="theme-dark fixed inset-0 z-[70] flex flex-col overflow-hidden bg-navy lg:hidden"
    >

      <div className="relative z-10 flex h-[68px] shrink-0 items-center justify-between px-5">
        <Wordmark dark onClick={onClose} />
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close menu" className="rounded-lg border border-white/25 p-2 text-ivory transition hover:border-cobalt-300">
          <X size={22} />
        </button>
      </div>

      <nav aria-label="Mobile" className="relative z-10 flex min-h-0 flex-1 flex-col items-center overflow-y-auto overscroll-contain px-6 py-6 text-center">
        <ul className="w-full max-w-sm">
          {MENU_LINKS.map((n) => {
            const active = n.href === "/" ? path === "/" : path.startsWith(n.href);
            return (
              <li key={n.href}>
                <Link href={n.href} onClick={onClose} aria-current={active ? "page" : undefined} className={cn("group flex items-center justify-center gap-3 py-2 font-display text-[clamp(1.35rem,5.6vw,1.75rem)] font-semibold leading-none tracking-[-0.03em] transition-colors", active ? "text-cobalt-300" : "text-ivory hover:text-cobalt-300")}>
                  {n.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-4 w-full max-w-sm">
          <p className="label mb-3">Services</p>
          <ul className="grid grid-cols-2 gap-2 text-left">
            {SERVICES.map((sv) => (<li key={sv.key}><Link href={sv.href} onClick={onClose} className="block rounded-lg border border-white/15 px-3 py-2.5 text-xs leading-snug text-ivory transition hover:border-cobalt-300">{sv.title}</Link></li>))}
          </ul>
        </div>
        <div className="mt-4 w-full max-w-sm">
          <Link href="/contact" onClick={onClose} className="btn btn-primary w-full">
            Start a project <ArrowUpRight size={16} aria-hidden />
          </Link>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[.2em] text-muted">RD / 2026 / Digital</p>
        </div>
      </nav>
    </motion.div>
  );
}

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const home = path === "/";
  const isActive = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <>
      <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", home && "border-b border-[#dbe6df] bg-ivory/95", solid && (home ? "backdrop-blur-xl" : "border-b border-navy/10 bg-ivory/85 backdrop-blur-xl"))}>
        <motion.div aria-hidden style={{ scaleX: progress }} className="absolute inset-x-0 bottom-0 h-px origin-left bg-cobalt" />
        <nav className="container-x flex h-[68px] items-center justify-between" aria-label="Main">
          <Wordmark />
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => {
              const active = isActive(n.href);
              if (n.href === "/services") return <ServicesMenu key={n.href} active={active} path={path} />;
              return (
                <li key={n.href}>
                  <Link href={n.href} aria-current={active ? "page" : undefined} className={cn("relative block px-3.5 py-2 text-sm transition-colors", "text-muted hover:text-navy", active && "!text-navy")}>
                    {n.label}
                    {active && <motion.span layoutId="nav-indicator" aria-hidden className="absolute inset-x-3.5 -bottom-0.5 h-px bg-cobalt" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-3">
            <Magnetic className="hidden lg:inline-block" strength={0.2}>
              <Link href="/contact" className="btn btn-primary group !px-5 !py-2.5">
                Start a project <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </Magnetic>
            <button type="button" className="rounded-lg border border-navy/20 p-2 text-navy transition-colors lg:hidden" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Open menu">
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>
      <AnimatePresence>{open && <MobileMenu onClose={() => setOpen(false)} path={path} />}</AnimatePresence>
    </>
  );
}
