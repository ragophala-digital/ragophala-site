import { Suspense } from "react";
import { Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import { ContactScene } from "@/components/three/lazy";
import { ContactForm } from "@/components/ContactForm";
import { LinkButton } from "@/components/ui";
import { SITE } from "@/lib/site";
import { mailtoUrl, pageMeta, whatsappUrl } from "@/lib/utils";

export const metadata = pageMeta("Contact and Quotations", "Request a quotation or send an enquiry to Ragophala Digital for websites, web applications and AI automation.", "/contact");

export default function Contact() {
  const wa = whatsappUrl("Hi Ragophala Digital, I would like to request a quotation.");
  const mail = mailtoUrl("Quotation request");
  return (
    <>
      <section className="relative overflow-hidden pb-6 pt-32 sm:pt-40">
        <div aria-hidden className="grid-bg absolute inset-0" />
        <div className="container-x relative grid items-center gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="eyebrow">Contact us</p>
            <h1 className="h-display">Let&apos;s talk about your project</h1>
            <p className="lead mt-5 max-w-xl">Send us the details below for a written quotation, or reach out directly. We usually reply within one to two working days.</p>
          </div>
          <div className="relative hidden h-[260px] lg:block"><ContactScene /></div>
        </div>
      </section>

      <section className="section pt-8">
        <div className="container-x grid items-start gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Suspense fallback={<div className="glass h-96 animate-pulse" aria-busy="true" />}>
            <ContactForm />
          </Suspense>
          <aside className="space-y-4" aria-label="Other ways to contact us">
            <div className="glass p-6">
              <h2 className="font-display text-lg">Prefer to chat?</h2>
              <ul className="mt-4 space-y-4 text-sm text-slate-300">
                {wa && (<li className="flex items-center gap-3"><MessageCircle className="text-volt-400" size={18} aria-hidden /><a href={wa} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">Message us on WhatsApp</a></li>)}
                {mail && (<li className="flex items-center gap-3"><Mail className="text-volt-400" size={18} aria-hidden /><a href={mail} className="underline-offset-4 hover:underline">{SITE.email}</a></li>)}
                <li className="flex items-center gap-3"><MapPin className="text-volt-400" size={18} aria-hidden />Serving businesses across {SITE.location}</li>
                <li className="flex items-center gap-3"><Clock className="text-volt-400" size={18} aria-hidden />Replies within 1–2 working days</li>
              </ul>
            </div>
            <div className="glass p-6">
              <h2 className="font-display text-lg">What happens next?</h2>
              <ol className="mt-4 space-y-3 text-sm text-slate-300">
                <li>1. We review your enquiry.</li>
                <li>2. We may ask a few clarifying questions.</li>
                <li>3. You receive a written quotation.</li>
              </ol>
              <div className="mt-5"><LinkButton href="/pricing" variant="ghost">View pricing</LinkButton></div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
