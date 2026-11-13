"use client";

import Link from "next/link";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Fragment, useEffect, useRef, type ReactNode } from "react";
import { cn, whatsappUrl } from "@/lib/utils";

export function Reveal({ children, delay = 0, className, y = 24 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
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

/** Headline with a staggered word reveal. Parts marked `accent` render in the accent colour. */
export function StaggerHeadline({ parts, className, as: Tag = "h1" }: { parts: { text: string; accent?: boolean }[]; className?: string; as?: "h1" | "h2" }) {
  const reduce = useReducedMotion();
  const words = parts.flatMap((p) => p.text.split(" ").map((w) => ({ w, accent: p.accent })));
  return (
    <Tag className={className} aria-label={parts.map((p) => p.text).join(" ")}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span aria-hidden className="inline-block overflow-hidden align-bottom pb-[0.12em]">
            <motion.span
              className={cn("inline-block", word.accent && "text-cobalt-300")}
              initial={reduce ? false : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              {word.w}
            </motion.span>
          </span>{" "}
        </Fragment>
      ))}
    </Tag>
  );
}

export function CountUp({ to, prefix = "", suffix = "", className }: { to: number; prefix?: string; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    if (reduce) {
      el.textContent = `${prefix}${to.toLocaleString("en-ZA")}${suffix}`;
      return;
    }
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = `${prefix}${Math.round(v).toLocaleString("en-ZA").replace(/\s/g, ",")}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, prefix, suffix, reduce]);
  return <span ref={ref} className={className}>{`${prefix}${to.toLocaleString("en-ZA").replace(/\s/g, ",")}${suffix}`}</span>;
}

export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("label", className)}>{children}</p>;
}

type Variant = "primary" | "dark" | "line" | "light";

export function LinkButton({ href, children, variant = "primary", className, arrow = true }: { href: string; children: ReactNode; variant?: Variant; className?: string; arrow?: boolean }) {
  return (
    <Link href={href} className={cn("btn group", `btn-${variant}`, className)}>
      {children}
      {arrow && <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />}
    </Link>
  );
}

export function WhatsAppButton({ message, className, label = "Chat on WhatsApp", variant = "line" }: { message: string; className?: string; label?: string; variant?: Variant }) {
  const href = whatsappUrl(message);
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn("btn", `btn-${variant}`, className)}>
      <MessageCircle size={16} aria-hidden /> {label}
    </a>
  );
}

export function SectionHead({ index, label, title, text, className }: { index?: string; label: string; title: string; text?: string; className?: string }) {
  return (
    <Reveal className={cn("mb-12 max-w-3xl lg:mb-16", className)}>
      <p className="label mb-5 flex items-center gap-3">
        {index && <span className="text-accent">{index}</span>}
        <span aria-hidden className="h-px w-8 bg-current opacity-40" />
        {label}
      </p>
      <h2 className="display-md">{title}</h2>
      {text && <p className="body-lg mt-5">{text}</p>}
    </Reveal>
  );
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[.14em] text-muted">
        <li><Link href="/" className="transition hover:text-heading">Home</Link></li>
        {items.map((it) => (
          <li key={it.label} className="flex items-center gap-2">
            <span aria-hidden>/</span>
            {it.href ? <Link href={it.href} className="transition hover:text-heading">{it.label}</Link> : <span aria-current="page" className="text-heading">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({ crumbs, label, title, text, actions, children, className }: { crumbs?: { label: string; href?: string }[]; label: string; title: ReactNode; text: string; actions?: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <section className={cn("relative overflow-hidden pb-14 pt-32 sm:pt-40 lg:pb-20", className)}>
      <div aria-hidden className="grid-lines absolute inset-0 opacity-60" />
      <div className="container-x relative">
        {crumbs && <Breadcrumb items={crumbs} />}
        <Reveal>
          <p className="label mb-6 flex items-center gap-3"><span aria-hidden className="h-px w-8 bg-current opacity-40" />{label}</p>
          <h1 className="display-lg max-w-[18ch]">{title}</h1>
          <p className="body-lg mt-6">{text}</p>
          {actions && <div className="mt-9 flex flex-wrap gap-3">{actions}</div>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}

export function CTASection({ title = "Ready to build something?", text = "Tell us what you need and we will send a clear, written quotation.", service, item }: { title?: string; text?: string; service?: string; item?: string }) {
  const href = service ? `/contact?service=${service}${item ? `&item=${encodeURIComponent(item)}` : ""}` : "/contact";
  return (
    <section className="theme-dark relative overflow-hidden bg-navy">
      <div aria-hidden className="grid-lines absolute inset-0 opacity-50" />
      <div aria-hidden className="absolute -right-32 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-cobalt/25 blur-[120px]" />
      <div className="container-x relative py-24 lg:py-32">
        <Reveal>
          <p className="label mb-6">Start a project</p>
          <h2 className="display-lg max-w-[16ch]">{title}</h2>
          <p className="body-lg mt-6">{text}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <LinkButton href={href}>Start a project</LinkButton>
            <WhatsAppButton message="Hi Ragophala Digital, I would like to discuss a project." variant="line" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
