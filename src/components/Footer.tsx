import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { Logo } from "./Header";
import { SERVICES, SITE } from "@/lib/site";
import { mailtoUrl, whatsappUrl } from "@/lib/utils";

const COMPANY = [
  ["/about", "About"],
  ["/pricing", "Pricing"],
  ["/portfolio", "Portfolio"],
  ["/faq", "FAQ"],
  ["/contact", "Contact"],
];

export function Footer() {
  const wa = whatsappUrl("Hi Ragophala Digital, I would like to find out more about your services.");
  const mail = mailtoUrl("Enquiry from the Ragophala Digital website");
  return (
    <footer className="border-t border-white/10 bg-navy-950">
      <div className="container-x grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-slate-400">
            {SITE.tagline} We build websites, web applications, AI agents and automation for South African businesses.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm">
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-slate-300 hover:text-white">
                <MessageCircle size={16} aria-hidden /> WhatsApp
              </a>
            )}
            {mail && (
              <a href={mail} className="inline-flex items-center gap-2 text-slate-300 hover:text-white">
                <Mail size={16} aria-hidden /> {SITE.email}
              </a>
            )}
            <Link href="/contact" className="text-volt-400 hover:text-white">
              Contact form
            </Link>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold">Services</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            {SERVICES.map((s) => (
              <li key={s.key}>
                <Link href={s.href} className="hover:text-white">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold">Company</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            {COMPANY.map(([h, l]) => (
              <li key={h}>
                <Link href={h} className="hover:text-white">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Ragophala Digital. All rights reserved. Prices are shown in South African rand (ZAR).
      </div>
    </footer>
  );
}
