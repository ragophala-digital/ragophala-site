import { Suspense } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Breadcrumb, LinkButton } from "@/components/ui";
import { SITE } from "@/lib/site";
import { mailtoUrl, pageMeta, whatsappUrl } from "@/lib/utils";

export const metadata = pageMeta("Start a Project", "Request a quotation or tell Ragophala Digital about your website, web application, AI agent or automation project.", "/contact");

const NEXT_STEPS = ["We review your enquiry.", "We may ask a few clarifying questions.", "You receive a personalised written quotation with scope, deliverables and price."];

export default function Contact() {
  const wa = whatsappUrl("Hi Ragophala Digital, I would like to request a quotation.");
  const mail = mailtoUrl("Project enquiry");
  return (
    <section className="relative overflow-hidden pb-24 pt-32 sm:pt-40">
      <div aria-hidden className="grid-lines absolute inset-0 opacity-50" />
      <div className="container-x relative">
        <Breadcrumb items={[{ label: "Start a project" }]} />
        <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="animate-rise">
            <div className="theme-dark rounded-2xl bg-navy p-8 text-fg sm:p-10 lg:sticky lg:top-28">
              <p className="label mb-6">Start a project</p>
              <h1 className="display-md">Tell us what you want to build.</h1>
              <p className="mt-5 text-[15px] leading-relaxed text-muted">Share a few details and we will reply with next steps and a written quotation, usually within one to two working days.</p>
              <h2 className="label mb-3 mt-10">What happens next</h2>
              <ol className="border-t border-line">
                {NEXT_STEPS.map((s, i) => (<li key={s} className="flex gap-4 border-b border-line py-3.5 text-sm"><span className="font-mono text-xs text-accent">0{i + 1}</span>{s}</li>))}
              </ol>
              {(wa || mail) && (
                <>
                  <h2 className="label mb-3 mt-10">Prefer to reach out directly?</h2>
                  <ul className="space-y-3 text-sm">
                    {wa && <li><a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-fg transition hover:text-cobalt-300"><MessageCircle size={16} aria-hidden /> Message us on WhatsApp</a></li>}
                    {mail && <li><a href={mail} className="inline-flex items-center gap-2.5 text-fg transition hover:text-cobalt-300"><Mail size={16} aria-hidden /> {SITE.email}</a></li>}
                  </ul>
                </>
              )}
              <p className="mt-10 text-xs text-muted">Serving businesses across {SITE.location}.</p>
              <div className="mt-6 flex flex-wrap gap-3"><LinkButton href="/smart-intake" variant="primary">Try Smart Intake</LinkButton><LinkButton href="/quote" variant="line">How quotations work</LinkButton></div>
            </div>
          </div>
          <div className="animate-rise [animation-delay:.1s]">
            <Suspense fallback={<div className="h-[520px] animate-pulse rounded-2xl border border-line bg-card" aria-busy="true" />}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
