import Link from "next/link";
import { Check } from "lucide-react";
import { PricingScene } from "@/components/three/lazy";
import { Faq } from "@/components/Faq";
import { CTASection, LinkButton, PageHero, Reveal, SectionHead } from "@/components/ui";
import { FAQS, PACKAGES, formatZAR } from "@/lib/site";
import { cn, pageMeta } from "@/lib/utils";

export const metadata = pageMeta("Pricing", "Transparent website package pricing from R2,000, plus quotation-based pricing for custom applications and AI solutions.", "/pricing");

export default function Pricing() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={<>Clear pricing in <span className="text-volt-400">South African rand</span></>}
        text="Choose a website package as your starting point. Custom applications and AI solutions are quoted individually once we understand your needs."
        scene={<PricingScene />}
        actions={<LinkButton href="/contact">Request a custom quotation</LinkButton>}
      />

      <section className="section pt-6">
        <div className="container-x">
          <SectionHead eyebrow="Website packages" title="Six packages, from landing page to premium website" text="Prices are starting values and may change with scope. Your written quotation is the final reference." />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PACKAGES.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.08}>
                <div className={cn("glass relative flex h-full flex-col p-7", p.popular && "border-volt shadow-[0_0_50px_-15px_rgba(47,123,255,.8)]")}>
                  {p.popular && <span className="absolute -top-3 left-7 rounded-full bg-volt px-3 py-1 text-xs font-semibold text-white">Most requested</span>}
                  <h3 className="font-display text-xl">{p.name}</h3>
                  <p className="mt-1 text-sm text-slate-400">{p.blurb}</p>
                  <p className="mt-5 font-display text-4xl text-white">{formatZAR(p.price)}<span className="ml-1 text-sm font-normal text-slate-500">from</span></p>
                  <p className="mt-1 text-xs text-slate-500">{p.timeline}</p>
                  <ul className="my-6 flex-1 space-y-2.5 text-sm text-slate-300">
                    {p.features.map((f) => (<li key={f} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-volt-400" aria-hidden /> {f}</li>))}
                  </ul>
                  <Link href={`/contact?package=${p.id}`} className={cn("btn w-full", p.popular ? "btn-primary" : "btn-ghost")}>Request this package</Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section light-section">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-navy-900/10 bg-white p-7">
              <h2 className="font-display text-2xl">What is included</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {["Design and development as described in your package", "Mobile responsive layouts tested on common devices", "Basic search engine setup and metadata", "The number of revision rounds listed in the package", "Deployment to your chosen hosting"].map((t) => (<li key={t} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-volt-600" aria-hidden /> {t}</li>))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-navy-900/10 bg-white p-7">
              <h2 className="font-display text-2xl">What costs extra</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {["Domain registration and hosting (paid to the provider)", "Copywriting, photography and video", "Paid plugins, licences or third-party subscriptions", "Additional pages, features and revision rounds beyond the package", "Ongoing support and maintenance plans"].map((t) => (<li key={t} className="flex gap-2"><span aria-hidden className="mt-0.5 text-volt-600">+</span> {t}</li>))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <Reveal>
            <div className="glass grid gap-8 p-8 sm:p-12 lg:grid-cols-2">
              <div>
                <p className="eyebrow">Custom pricing</p>
                <h2 className="h-section">Web applications and AI solutions are quoted per project</h2>
                <p className="lead mt-4">The cost depends on features, integrations, users and ongoing running costs, so we scope each project before pricing it. You receive a written quotation with deliverables, milestones and payment terms.</p>
                <div className="mt-6 flex flex-wrap gap-3"><LinkButton href="/contact?service=apps">Quote for an application</LinkButton><LinkButton href="/contact?service=ai" variant="ghost">Quote for AI</LinkButton></div>
              </div>
              <ol className="space-y-3 text-sm text-slate-300">
                {["Send us your enquiry using the form or WhatsApp.", "We arrange a short discovery conversation.", "We send a written scope and quotation.", "Work begins once the quotation is accepted and the deposit is paid."].map((t, i) => (<li key={t} className="flex gap-3 rounded-xl border border-white/10 px-4 py-3"><span className="font-display text-volt-400">{i + 1}</span>{t}</li>))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x max-w-3xl">
          <SectionHead eyebrow="Pricing questions" title="Before you request a quotation" />
          <Faq items={FAQS.filter((f) => ["Pricing", "Payments"].includes(f.category))} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
