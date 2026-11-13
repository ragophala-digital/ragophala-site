"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn, whatsappUrl } from "@/lib/utils";

export function Reveal({ children, delay = 0, className, y = 28 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({ eyebrow, title, text, center }: { eyebrow: string; title: string; text?: string; center?: boolean }) {
  return (
    <Reveal className={cn("mb-12 max-w-2xl", center && "mx-auto text-center")}>
      <p className={cn("eyebrow", center && "justify-center")}>{eyebrow}</p>
      <h2 className="h-section">{title}</h2>
      {text && <p className="lead mt-4">{text}</p>}
    </Reveal>
  );
}

export function LinkButton({ href, children, variant = "primary", className }: { href: string; children: ReactNode; variant?: "primary" | "ghost" | "dark" | "outline-dark"; className?: string }) {
  return (
    <Link href={href} className={cn("btn group", `btn-${variant}`, className)}>
      {children}
      <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}

export function WhatsAppButton({ message, className, label = "Chat on WhatsApp" }: { message: string; className?: string; label?: string }) {
  const href = whatsappUrl(message);
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn("btn btn-ghost", className)}>
      <MessageCircle size={16} aria-hidden /> {label}
    </a>
  );
}

/** Card with a cursor spotlight and subtle 3D tilt. */
export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const move = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    if (!reduce) el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 6}deg) rotateY(${(x - 0.5) * 8}deg) translateY(-4px)`;
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={leave} className={cn("spotlight transition-transform duration-200 will-change-transform", className)}>
      {children}
    </div>
  );
}

export function CTASection({ title = "Ready to build something that works for your business?", text = "Tell us what you need and we will send a clear, written quotation.", service }: { title?: string; text?: string; service?: string }) {
  return (
    <section className="section">
      <div className="container-x">
        <Reveal>
          <div className="glass relative overflow-hidden p-8 text-center sm:p-14">
            <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-volt/30 blur-[100px]" />
            <h2 className="h-section relative mx-auto max-w-2xl">{title}</h2>
            <p className="lead relative mx-auto mt-4 max-w-xl">{text}</p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <LinkButton href={service ? `/contact?service=${service}` : "/contact"}>Request a quotation</LinkButton>
              <WhatsAppButton message="Hi Ragophala Digital, I would like to discuss a project." />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function PageHero({ eyebrow, title, text, children, scene, actions }: { eyebrow: string; title: ReactNode; text: string; children?: ReactNode; scene?: ReactNode; actions?: ReactNode }) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
      <div aria-hidden className="grid-bg absolute inset-0" />
      <div aria-hidden className="absolute -right-40 top-0 h-[34rem] w-[34rem] rounded-full bg-volt/20 blur-[140px]" />
      <div className="container-x relative grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="h-display">{title}</h1>
          <p className="lead mt-6 max-w-xl">{text}</p>
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
          {children}
        </div>
        {scene && <div className="relative h-[320px] sm:h-[420px] lg:h-[480px]">{scene}</div>}
      </div>
    </section>
  );
}
