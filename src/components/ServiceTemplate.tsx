import type { ReactNode } from "react";
import { Check, Info } from "lucide-react";
import { LinkButton, PageHero, Reveal, SectionHead } from "@/components/ui";
import type { Service } from "@/lib/services";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const TONES = ["bg-card", "bg-softblue", "bg-card", "theme-dark bg-navy text-fg"];

export const PRICING_STATEMENT = "Pricing is tailored to your project requirements. Contact us for a personalised quotation.";

interface Props {
  service: Service;
  /** Illustration or live demonstration shown under the hero. */
  visual?: ReactNode;
  /** Extra section(s) shown after the offerings, such as an interactive demo. */
  extra?: ReactNode;
}

/** Shared layout for every service page so each one answers the same questions in the same order. */
export function ServiceTemplate({ service: s, visual, extra }: Props) {
  const contactHref = `/contact?service=${s.key}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.metaDescription,
    areaServed: { "@type": "Country", name: "South Africa" },
    provider: { "@type": "ProfessionalService", name: SITE.name },
    url: `${SITE.url}${s.href}`,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        crumbs={[{ label: "Services", href: "/services" }, { label: s.title }]}
        label={`Service ${s.index} · ${s.title}`}
        title={<>{s.headline}</>}
        text={s.intro.join(" ")}
        actions={<><LinkButton href={contactHref}>{s.cta}</LinkButton><LinkButton href={`${contactHref}&intent=consultation`} variant="line" arrow={false}>{s.ctaSecondary}</LinkButton></>}
      >
        {visual && <Reveal className="mt-14" delay={0.15}>{visual}</Reveal>}
      </PageHero>

      <section className="theme-soft section bg-softblue">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="label mb-5">Who it is for</h2>
            <ul className="border-t border-line">{s.forWho.map((t) => (<li key={t} className="flex gap-3 border-b border-line py-4 text-[15px]"><Check size={16} className="mt-1 shrink-0 text-cobalt" aria-hidden />{t}</li>))}</ul>
          </div>
          <div>
            <h2 className="label mb-5">Problems it solves</h2>
            <ul className="border-t border-line">{s.solves.map((t) => (<li key={t} className="flex gap-3 border-b border-line py-4 text-[15px]"><span aria-hidden className="mt-2.5 h-px w-5 shrink-0 bg-cobalt" />{t}</li>))}</ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHead index="01" label="What we deliver" title={s.offeringsTitle} />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {s.offerings.map((o, i) => {
              const dark = TONES[i % TONES.length].includes("navy");
              return (
                <Reveal key={o.name} delay={(i % 3) * 0.06}>
                  <article className={cn("card flex h-full flex-col rounded-2xl border border-line p-6 transition duration-300 hover:-translate-y-1", TONES[i % TONES.length])}>
                    <p className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">{o.name}</h3>
                    <p className={cn("mt-2 text-sm leading-relaxed", dark ? "text-slate" : "text-muted")}>{o.summary}</p>
                    <ul className="mt-5 space-y-1.5 text-sm">
                      {o.items.map((t) => (<li key={t} className="flex gap-2.5"><Check size={14} className="mt-1 shrink-0 text-cobalt" aria-hidden />{t}</li>))}
                    </ul>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {extra}

      <section className="theme-dark bg-navy text-fg">
        <div className="container-x section grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHead index="02" label="Included" title="What a typical engagement includes" text="Your written quotation confirms the exact scope and deliverables." className="mb-8 lg:mb-8" />
            <ul className="border-t border-line">{s.included.map((t) => (<li key={t} className="flex gap-3 border-b border-line py-4 text-[15px]"><Check size={16} className="mt-1 shrink-0 text-cobalt-300" aria-hidden />{t}</li>))}</ul>
          </div>
          <div>
            <h2 className="display-md mb-8">{s.processTitle}</h2>
            <ol className="border-t border-line">
              {s.process.map((t, i) => (<li key={t} className="flex gap-4 border-b border-line py-4 text-[15px]"><span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>{t}</li>))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead index="03" label="Why it matters" title="Why businesses need it" text={s.why} className="mb-0 lg:mb-0" />
          </div>
          <div>
            <h2 className="label mb-5">Relevant use cases</h2>
            <ul className="border-t border-line">{s.useCases.map((t, i) => (<li key={t} className="flex gap-4 border-b border-line py-4 text-[15px]"><span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>{t}</li>))}</ul>
          </div>
        </div>
        {s.notes.length > 0 && (
          <div className="container-x mt-14">
            <div className="flex gap-4 rounded-2xl border border-line bg-card p-6 sm:p-8">
              <Info size={20} className="mt-0.5 shrink-0 text-cobalt" aria-hidden />
              <div>
                <h2 className="font-display text-lg font-semibold tracking-tight">Good to know</h2>
                <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-muted">{s.notes.map((n) => (<li key={n}>{n}</li>))}</ul>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="theme-dark relative overflow-hidden bg-navy text-fg">
        <div aria-hidden className="grid-lines absolute inset-0 opacity-40" />
        <div className="container-x section relative text-center">
          <h2 className="display-md mx-auto max-w-[22ch]">{s.cta}</h2>
          <p className="mx-auto mt-5 max-w-xl text-muted">{PRICING_STATEMENT}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <LinkButton href={contactHref}>Request a Quote</LinkButton>
            <LinkButton href="/services" variant="line" arrow={false}>Explore Our Services</LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
