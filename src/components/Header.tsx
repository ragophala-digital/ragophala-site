"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Wordmark({ dark }: { dark?: boolean }) {
  return (
    <Link href="/" aria-label="Ragophala Digital home" className="group flex flex-col leading-none">
      <span className={cn("font-display text-[1.35rem] font-bold tracking-[-0.04em] transition-colors", dark ? "text-ivory" : "text-navy")}>
        RAGOPHALA<span className="text-cobalt">.</span>
      </span>
      <span className={cn("mt-1 font-mono text-[9px] uppercase tracking-[.42em]", dark ? "text-slate" : "text-muted")}>Digital</span>
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

  const onDark = path === "/" && !solid && !open;

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", solid || open ? "border-b border-navy/10 bg-ivory/85 backdrop-blur-xl" : "bg-transparent")}>
      <motion.div aria-hidden style={{ scaleX: progress }} className="absolute inset-x-0 bottom-0 h-px origin-left bg-cobalt" />
      <nav className="container-x flex h-[68px] items-center justify-between" aria-label="Main">
        <Wordmark dark={onDark} />
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => {
            const active = n.href === "/" ? path === "/" : path.startsWith(n.href);
            return (
              <li key={n.href}>
                <Link href={n.href} aria-current={active ? "page" : undefined} className={cn("relative px-3.5 py-2 text-sm transition-colors", onDark ? "text-slate hover:text-ivory" : "text-muted hover:text-navy", active && (onDark ? "!text-ivory" : "!text-navy"))}>
                  {n.label}
                  {active && <span aria-hidden className="absolute inset-x-3.5 -bottom-0.5 h-px bg-cobalt" />}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-3">
          <Link href="/contact" className="btn btn-primary hidden !px-5 !py-2.5 lg:inline-flex">
            Start a project <ArrowUpRight size={15} aria-hidden />
          </Link>
          <button type="button" className={cn("rounded-lg border p-2 lg:hidden", onDark ? "border-white/25 text-ivory" : "border-navy/20 text-navy")} onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-x-0 bottom-0 top-[68px] overflow-y-auto bg-ivory px-5 pb-10 pt-8 lg:hidden">
            <ul>
              {[...NAV, { href: "/process", label: "Process" }, { href: "/faq", label: "FAQ" }].map((n, i) => (
                <motion.li key={n.href} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i }} className="border-b border-navy/10">
                  <Link href={n.href} className="flex items-center justify-between py-4 font-display text-3xl font-semibold tracking-tight text-navy">
                    {n.label} <ArrowUpRight size={20} className="text-cobalt" aria-hidden />
                  </Link>
                </motion.li>
              ))}
            </ul>
            <Link href="/contact" className="btn btn-primary mt-8 w-full">
              Start a project
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
