"use client";

import Link from "next/link";
import { ArrowUp, ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { SERVICES, SITE } from "@/lib/site";
import { mailtoUrl, whatsappUrl } from "@/lib/utils";
import { CursorGlow, Magnetic } from "./ui-motion";

const STUDIO = [
  ["/about", "About"],
  ["/process", "Our process"],
  ["/quote", "Request a quote"],
  ["/portfolio", "Selected concepts"],
  ["/faq", "FAQ"],
  ["/smart-intake", "Smart Intake"],
  ["/insights", "Insights"],
  ["/lab", "3D Lab"],
  ["/privacy", "Privacy"],
  ["/terms", "Terms"],
  ["/contact", "Contact"],
];

const SOCIALS = [
  ["LinkedIn", process.env.NEXT_PUBLIC_LINKEDIN_URL],
  ["Instagram", process.env.NEXT_PUBLIC_INSTAGRAM_URL],
  ["Facebook", process.env.NEXT_PUBLIC_FACEBOOK_URL],
].filter((s): s is [string, string] => Boolean(s[1]));

export function Footer() {
  const wa = whatsappUrl("Hi Ragophala Digital, I would like to find out more about your services.");
  const mail = mailtoUrl("Enquiry from the Ragophala Digital website");
  return (
    <footer className="theme-dark relative overflow-hidden bg-navy text-fg">
      <div aria-hidden className="grid-lines absolute inset-0 opacity-40" />
      <div aria-hidden className="absolute -left-24 top-10 h-[26rem] w-[26rem] animate-drift rounded-full bg-cobalt/25 blur-[130px]" />
      <div aria-hidden className="absolute -right-24 bottom-24 h-[22rem] w-[22rem] animate-drift rounded-full bg-cobalt-300/15 blur-[120px] [animation-delay:-4s]" />
      <CursorGlow />
      <div className="container-x relative pt-24 lg:pt-32">
        <div className="grid items-end gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="label mb-6">Start a project</p>
            <h2 className="display-lg max-w-[14ch]">Let&apos;s build something meaningful.</h2>
          </div>
          <div>
            <p className="body-lg">Have an idea, a business challenge or a digital project in mind? Let&apos;s discuss how we can bring it to life.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic strength={0.25}>
                <Link href="/contact" className="btn btn-primary group">
                  Start a project <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </Magnetic>
              {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-line"><MessageCircle size={16} aria-hidden /> WhatsApp</a>}
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-10 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="label mb-5">Services</h3>
            <ul className="space-y-3 text-[15px]">
              {SERVICES.map((s) => (<li key={s.key}><Link href={s.href} className="link-underline text-fg">{s.title}</Link></li>))}
            </ul>
          </div>
          <div>
            <h3 className="label mb-5">Studio</h3>
            <ul className="space-y-3 text-[15px]">
              {STUDIO.map(([h, l]) => (<li key={h}><Link href={h} className="link-underline text-fg">{l}</Link></li>))}
            </ul>
          </div>
          <div>
            <h3 className="label mb-5">Contact</h3>
            <ul className="space-y-3 text-[15px]">
              <li><Link href="/contact" className="link-underline text-fg">Project enquiry form</Link></li>
              {wa && <li><a href={wa} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-2 text-fg"><MessageCircle size={15} aria-hidden /> WhatsApp</a></li>}
              {mail && <li><a href={mail} className="link-underline inline-flex items-center gap-2 text-fg"><Mail size={15} aria-hidden /> {SITE.email}</a></li>}
              <li className="text-muted">{SITE.location}</li>
            </ul>
          </div>
          {SOCIALS.length > 0 && (
            <div>
              <h3 className="label mb-5">Follow</h3>
              <ul className="space-y-3 text-[15px]">
                {SOCIALS.map(([name, href]) => (<li key={name}><a href={href} target="_blank" rel="noopener noreferrer" className="link-underline text-fg">{name}</a></li>))}
              </ul>
            </div>
          )}
        </div>

        <p aria-hidden className="pointer-events-none mt-16 select-none whitespace-nowrap bg-gradient-to-b from-ivory/90 to-ivory/0 bg-clip-text text-center font-display text-[clamp(3.4rem,15.5vw,14rem)] font-bold leading-[0.85] tracking-[-0.06em] text-transparent">
          RAGOPHALA
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line py-6 font-mono text-[11px] uppercase tracking-[.14em] text-muted">
          <span>RD / 2026 / Digital</span>
          <span>© {new Date().getFullYear()} Ragophala Digital</span>
          <a href="#main" className="link-underline inline-flex items-center gap-1.5 text-fg">Back to top <ArrowUp size={12} aria-hidden /></a>
        </div>
      </div>
    </footer>
  );
}
