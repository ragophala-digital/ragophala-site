import { Faq } from "@/components/Faq";
import { CTASection, PageHero, Reveal } from "@/components/ui";
import { FAQS } from "@/lib/site";
import { pageMeta } from "@/lib/utils";

export const metadata = pageMeta("FAQ", "Answers about website development, pricing, deposits, timelines, hosting, maintenance, AI integrations and custom applications.", "/faq");

export default function FaqPage() {
  const groups = Array.from(new Set(FAQS.map((f) => f.category)));
  const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero eyebrow="FAQ" title={<>Frequently asked <span className="text-volt-400">questions</span></>} text="Quick answers on websites, pricing, payments, timelines, hosting, maintenance, AI and custom applications." />
      <section className="section pt-4">
        <div className="container-x max-w-3xl space-y-12">
          {groups.map((g) => (
            <Reveal key={g}>
              <h2 className="mb-4 font-display text-xl text-volt-300">{g}</h2>
              <Faq items={FAQS.filter((f) => f.category === g)} />
            </Reveal>
          ))}
        </div>
      </section>
      <CTASection title="Still have a question?" text="Send us your question and we will get back to you." />
    </>
  );
}
