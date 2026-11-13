"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV, SERVICES } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5 font-display text-lg font-semibold text-white", className)} aria-label="Ragophala Digital home">
      <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden>
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8ab9ff" />
            <stop offset="1" stopColor="#1f5fe0" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="11" fill="#0b1740" stroke="#2f7bff" strokeOpacity=".5" />
        <path d="M12 29V11h9.5c3.6 0 5.8 1.9 5.8 4.9 0 2.6-1.6 4.4-4.2 4.9L28.5 29h-4.2l-4.5-7.3H16V29z M16 14.4v4.1h5c1.6 0 2.5-.8 2.5-2s-.9-2.1-2.5-2.1z" fill="url(#lg)" fillRule="evenodd" />
      </svg>
      <span>
        Ragophala <span className="text-volt-400">Digital</span>
      </span>
    </Link>
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
    const on = () => setSolid(window.scrollY > 16);
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

  const link = (href: string) => cn("rounded-full px-3 py-2 text-sm transition-colors", path === href ? "text-white" : "text-slate-400 hover:text-white");

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", solid || open ? "border-b border-white/10 bg-ink/80 backdrop-blur-xl" : "bg-transparent")}>
      <motion.div aria-hidden style={{ scaleX: progress }} className="absolute inset-x-0 bottom-0 h-px origin-left bg-volt" />
      <nav className="container-x flex h-[72px] items-center justify-between" aria-label="Main">
        <Logo />
        <ul className="hidden items-center gap-1 lg:flex">
          <li className="group relative">
            <Link href="/services" className={cn(link("/services"), "inline-flex items-center gap-1")}>
              Services <ChevronDown size={14} aria-hidden className="transition-transform group-focus-within:rotate-180 group-hover:rotate-180" />
            </Link>
            <div className="invisible absolute left-0 top-full w-72 pt-2 opacity-0 transition duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <div className="glass border-white/10 bg-navy-900/95 p-2 shadow-2xl">
                {SERVICES.map((s) => (
                  <Link key={s.key} href={s.href} className="block rounded-xl px-3 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white">
                    <span className="block font-medium text-white">{s.title}</span>
                    <span className="block text-xs text-slate-500">{s.tag}</span>
                  </Link>
                ))}
              </div>
            </div>
          </li>
          {NAV.filter((n) => n.href !== "/services").map((n) => (
            <li key={n.href}>
              <Link href={n.href} className={link(n.href)}>
                {n.label}
              </Link>
            </li>
          ))}
          <li className="ml-3">
            <Link href="/contact" className="btn btn-primary !py-2.5">
              Get a quote
            </Link>
          </li>
        </ul>
        <button type="button" className="rounded-lg border border-white/15 p-2 text-white lg:hidden" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto bg-ink/95 px-5 pb-10 pt-4 backdrop-blur-xl lg:hidden">
            <ul className="space-y-1">
              {[{ href: "/", label: "Home" }, ...NAV, { href: "/contact", label: "Contact" }].map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="block rounded-xl px-3 py-3 font-display text-xl text-white hover:bg-white/5">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mb-2 mt-6 px-3 text-xs uppercase tracking-widest text-slate-500">Services</p>
            <ul>
              {SERVICES.map((s) => (
                <li key={s.key}>
                  <Link href={s.href} className="block rounded-xl px-3 py-2.5 text-slate-300 hover:bg-white/5">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/contact" className="btn btn-primary mt-6 w-full">
              Get a quote
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
