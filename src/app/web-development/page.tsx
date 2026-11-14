import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LinkButton, PageHero, Reveal, SectionHead } from "@/components/ui";
import { BeforeAfter, DeviceShowcase } from "@/components/demos-web";
import { PACKAGES, formatZAR } from "@/lib/site";
import { cn, pageMeta } from "@/lib/utils";

export const metadata = pageMeta("Website Development", "Business websites, landing pages, corporate sites, e-commerce, booking websites and redesigns, built for speed, search visibility and enquiries.", "/web-development");

const TYPES = [
  { title: "Business websites", text: "Present your services, build trust and make it easy for customers to contact you.", span: "lg:col-span-5", tone: "bg-card" },
  { title: "Landing pages", text: "A single focused page for a campaign, launch or lead-generation offer.", span: "lg:col-span-7", tone: "bg-softblue" },
  { title: "Corporate websites", text: "Structured sites for established companies with several divisions.", span: "lg:col-span-4", tone: "theme-dark bg-navy" },
  { title: "E-commerce websites", text: "Online stores with catalogues, secure checkout and order notifications.", span: "lg:col-span-4", tone: "bg-card" },
  { title: "Booking websites", text: "Let customers request or book appointments, rooms and services online.", span: "lg:col-span-4", tone: "bg-softblue" },
  { title: "Portfolio websites", text: "Show creative work, projects and case studies in a polished gallery.", span: "lg:col-span-6", tone: "bg-card" },
  { title: "Website redesigns", text: "Modernise an ageing site with better design, structure, speed and search visibility.", span: "lg:col-span-6", tone: "theme-dark bg-navy" },
];

const DELIVERABLES = ["Custom visual design", "Responsive layouts for phone, tablet and desktop", "Contact and lead-capture forms", "WhatsApp and Google Maps integration where scoped", "On-page SEO foundations and metadata", "Analytics integration", "Performance-conscious build", "Handover of agreed files and access"];

export default function WebDevelopment() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Services", href: "/services" }, { label: "Website development" }]}
        label="Service 01 · Website development"
        title={<>Websites that look credible and bring in enquiries.</>}
        text="From a single landing page to a full corporate website, we design and build fast, mobile-first sites that are easy to find and easy to use."
        actions={<><LinkButton href="/contact?service=web">Request a website quotation</LinkButton><LinkButton href="/pricing#websites" variant="line" arrow={false}>View packages</LinkButton></>}
      >
        <Reveal className="mt-14" delay={0.15}><div id="devices" className="scroll-mt-28"><DeviceShowcase className="mx-auto max-w-4xl" /></div></Reveal>
      </PageHero>

      <section className="section pt-8">
        <div className="container-x">
          <SectionHead index="01" label="What we build" title="A website for every kind of business" />
          <div className="grid gap-4 lg:grid-cols-12">
            {TYPES.map((t, i) => (
              <Reveal key={t.title} delay={(i % 3) * 0.06} className={cn(t.span)}>
                <article className={cn("flex h-full min-h-[190px] flex-col justify-between rounded-2xl border border-line p-6 transition duration-300 hover:-translate-y-1", t.tone)}>
                  <p className="font-mono text-xs text-accent">0{i + 1}</p>
                  <div className="mt-10">
                    <h3 className="font-display text-xl font-semibold tracking-tight">{t.title}</h3>
                    <p className="mt-2 max-w-[40ch] text-sm leading-relaxed text-muted">{t.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHead index="02" label="Website redesigns" title="From outdated to outstanding" text="A redesign keeps what works, then improves structure, clarity, speed and search visibility. Drag the handle to compare." className="mb-6 lg:mb-6" />
            <LinkButton href="/contact?service=web&item=Website%20redesign" variant="line">Ask about a redesign</LinkButton>
          </div>
          <Reveal><BeforeAfter /></Reveal>
        </div>
      </section>

      <section className="theme-soft section bg-softblue">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHead index="03" label="Deliverables" title="What a typical website project includes" text="Exact inclusions depend on your package. Your written quotation confirms scope and deliverables." className="mb-0 lg:mb-0" />
          <ul className="grid border-t border-line sm:grid-cols-2">
            {DELIVERABLES.map((d, i) => (
              <li key={d} className="flex gap-3 border-b border-line py-5 pr-4 text-[15px] sm:odd:border-r sm:odd:pr-6 sm:even:pl-6">
                <span className="font-mono text-xs text-accent">0{i + 1}</span>{d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <SectionHead index="04" label="Pricing preview" title="Website packages, once-off" text="Starting prices in South African rand. Domain and hosting are quoted separately unless included." className="mb-0 lg:mb-0" />
            <LinkButton href="/pricing#websites" variant="line">Full pricing</LinkButton>
          </div>
          <ul className="border-t border-line">
            {PACKAGES.map((p) => (
              <li key={p.id} className="border-b border-line">
                <Link href={`/contact?package=${p.id}`} className="group grid items-center gap-2 px-2 py-6 transition-all duration-300 hover:bg-softblue/60 sm:grid-cols-[1.2fr_1fr_auto] sm:gap-8 sm:px-4">
                  <h3 className="font-display text-lg font-semibold tracking-tight">{p.name}</h3>
                  <p className="text-sm text-muted">{p.blurb}</p>
                  <span className="flex items-center gap-3 font-display text-xl font-semibold">{formatZAR(p.price)}<ArrowUpRight size={18} className="text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cobalt" aria-hidden /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
