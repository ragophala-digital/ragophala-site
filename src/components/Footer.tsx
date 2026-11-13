import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { SERVICES, SITE } from "@/lib/site";
import { mailtoUrl, whatsappUrl } from "@/lib/utils";

const STUDIO = [
  ["/about", "About"],
  ["/process", "Our process"],
  ["/pricing", "Pricing"],
  ["/portfolio", "Selected concepts"],
  ["/faq", "FAQ"],
  ["/contact", "Start a project"],
];

export function Footer() {
  const wa = whatsappUrl("Hi Ragophala Digital, I would like to find out more about your services.");
  const mail = mailtoUrl("Enquiry from the Ragophala Digital website");
  return (
    <footer className="theme-dark bg-navy text-fg">
      <div className="container-x pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-[clamp(2.4rem,6vw,4.4rem)] font-bold leading-none tracking-[-0.05em] text-ivory">
              RAGOPHALA<span className="text-cobalt-300">.</span>
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[.42em] text-slate">Digital</p>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-muted">{SITE.tagline} Websites, web applications, AI agents and business automation for South African businesses.</p>
          </div>
          <div>
            <h3 className="label mb-5">Services</h3>
            <ul className="space-y-3 text-[15px]">
              {SERVICES.map((s) => (
                <li key={s.key}><Link href={s.href} className="text-fg transition hover:text-cobalt-300">{s.title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="label mb-5">Studio</h3>
            <ul className="space-y-3 text-[15px]">
              {STUDIO.map(([h, l]) => (
                <li key={h}><Link href={h} className="text-fg transition hover:text-cobalt-300">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="label mb-5">Contact</h3>
            <ul className="space-y-3 text-[15px]">
              <li><Link href="/contact" className="text-fg transition hover:text-cobalt-300">Project enquiry form</Link></li>
              {wa && <li><a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-fg transition hover:text-cobalt-300"><MessageCircle size={15} aria-hidden /> WhatsApp</a></li>}
              {mail && <li><a href={mail} className="inline-flex items-center gap-2 text-fg transition hover:text-cobalt-300"><Mail size={15} aria-hidden /> {SITE.email}</a></li>}
              <li className="text-muted">{SITE.location}</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-line py-6 font-mono text-[11px] uppercase tracking-[.14em] text-muted">
          <span>RD / 2026 / Digital</span>
          <span>© {new Date().getFullYear()} Ragophala Digital</span>
          <span>All prices in ZAR</span>
        </div>
      </div>
    </footer>
  );
}
