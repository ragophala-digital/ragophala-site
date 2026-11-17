import { Faq } from "@/components/Faq";
import { PackageCompare } from "@/components/PackageCompare";
import { LinkButton, PageHero, Reveal, SectionHead } from "@/components/ui";
import { TERMS } from "@/lib/catalogue-public";
import { FAQS } from "@/lib/site";
import { pageMeta } from "@/lib/utils";

export const metadata = pageMeta(
  "Request a Quote",
  "Pricing is tailored to your project. Tell Ragophala Digital what you need and receive a personalised written quotation for your website, web application, AI assistant or automation.",
  "/quote",
);

const STEPS = [
  ["Tell us what you need", "Share your goals and the service you are interested in. You do not need to know our pricing first."],
  ["We review and ask questions", "We may ask a few clarifying questions about content, features and integrations."],
  ["You receive a written quotation", "A personalised quotation sets out scope, deliverables, timeline, price and payment terms."],
  ["You approve, we begin", "Work starts once the quotation is agreed and the deposit is received."],
];

const FACTORS = ["The type of solution and how many pages, screens or features it needs", "Functionality such as bookings, payments, user accounts or integrations", "Design requirements and the amount of content to prepare", "The number of revision rounds and the level of ongoing support", "Third-party services, hosting and licences the project depends on"];

export default function Quote() {
  const faqs = FAQS.filter((f) => ["Quotations", "Payments", "Domains and hosting", "Third-party costs"].includes(f.category)).map(({ q, a }) => ({ q, a }));
  return (
    <>
      <PageHero
        crumbs={[{ label: "Request a quote" }]}
        label="Quotations"
        title={<>A quotation built around your project.</>}
        text="Pricing is tailored to your project requirements. Contact us for a personalised quotation."
        actions={<><LinkButton href="/contact">Request a Quote</LinkButton><LinkButton href="/smart-intake" variant="line" arrow={false}>Try Smart Intake</LinkButton></>}
      />

      <section className="section pt-8">
        <div className="container-x">
          <SectionHead index="01" label="How it works" title="From first message to written quotation" />
          <ol className="grid gap-8 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.07}><li><p className="font-mono text-xs text-accent">0{i + 1}</p><h3 className="mt-3 font-display text-lg font-semibold tracking-tight">{t}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{d}</p></li></Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="theme-soft section bg-softblue">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHead index="02" label="What shapes a quotation" title="Every project is different" text="Our approved service catalogue and personalised quotations are shared privately with prospective clients." className="mb-0 lg:mb-0" />
          <ul className="border-t border-line">
            {FACTORS.map((f, i) => (<li key={f} className="flex gap-4 border-b border-line py-5 text-[15px]"><span className="font-mono text-xs text-accent">0{i + 1}</span>{f}</li>))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHead index="03" label="Website packages" title="Compare what each package includes" text="Choose two packages to see their inclusions side by side." />
          <PackageCompare />
        </div>
      </section>

      <section className="theme-dark bg-navy">
        <div className="container-x section">
          <SectionHead index="04" label="Terms we work to" title="Clear terms before work begins" text="Exact terms are confirmed in your written quotation." />
          <div className="grid gap-x-12 border-t border-line md:grid-cols-2">
            {TERMS.map((t) => (
              <div key={t.title} className="border-b border-line py-7">
                <h3 className="font-display text-lg font-semibold tracking-tight">{t.title}</h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">{t.points.map((p) => (<li key={p}>{p}</li>))}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead index="05" label="Questions" title="About quotations and payment" className="mb-0 lg:mb-0" />
          <Faq items={faqs} />
        </div>
        <div className="container-x mt-14"><LinkButton href="/contact">Request a Quote</LinkButton></div>
      </section>
    </>
  );
}
