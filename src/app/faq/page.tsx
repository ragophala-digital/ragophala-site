import { Faq } from "@/components/Faq";
import { CTASection, PageHero, Reveal } from "@/components/ui";
import { FAQS } from "@/lib/site";
import { pageMeta } from "@/lib/utils";

export const metadata = pageMeta("FAQ", "Answers about pricing, timelines, deposits, domains, hosting, revisions, maintenance, ownership, web applications and AI agents.", "/faq");

export default function FaqPage() {
  const groups = Array.from(new Set(FAQS.map((f) => f.category)));
  const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero crumbs={[{ label: "FAQ" }]} label="Frequently asked questions" title={<>Straight answers to common questions.</>} text="Pricing, timelines, deposits, domains, hosting, revisions, maintenance and ownership, explained clearly." />
      <section className="pb-24 pt-4">
        <div className="container-x grid gap-12 lg:grid-cols-[0.6fr_1.4fr]">
          <nav aria-label="FAQ categories" className="lg:sticky lg:top-32 lg:self-start">
            <p className="label mb-4">Topics</p>
            <ul className="flex flex-wrap gap-2 lg:block lg:space-y-1">
              {groups.map((g) => (
                <li key={g}><a href={`#${g.toLowerCase().replace(/\s+/g, "-")}`} className="block rounded-md border border-line px-3 py-1.5 text-sm text-muted transition hover:border-cobalt hover:text-heading lg:border-0 lg:px-0 lg:py-1.5 lg:hover:translate-x-1">{g}</a></li>
              ))}
            </ul>
          </nav>
          <div className="space-y-14">
            {groups.map((g) => (
              <Reveal key={g}>
                <section id={g.toLowerCase().replace(/\s+/g, "-")}>
                  <h2 className="label mb-4 text-accent">{g}</h2>
                  <Faq items={FAQS.filter((f) => f.category === g)} />
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTASection title="Still have a question?" text="Send us your question through the project form and we will get back to you." />
    </>
  );
}
