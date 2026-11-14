import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Faq } from "@/components/Faq";
import { PackageCompare } from "@/components/PackageCompare";
import { LinkButton, PageHero, Reveal, SectionHead } from "@/components/ui";
import { FAQS } from "@/lib/site";
import {
  ADDONS,
  AI_AVAILABLE,
  AI_MONTHLY,
  AI_SOLUTIONS,
  COMING_SOON,
  MAINTENANCE,
  PACKAGES,
  SPECIALIST_SITES,
  TERMS,
  WEB_APPS,
  WEB_APP_SOLUTIONS,
  formatZAR,
  type PriceItem,
} from "@/lib/pricing";
import { cn, pageMeta } from "@/lib/utils";

export const metadata = pageMeta(
  "Pricing and Rate Card",
  "Ragophala Digital 2026 rate card in ZAR: website packages from R2,800, web applications from R8,000, AI assistants from R3,500, monthly maintenance and add-ons.",
  "/pricing",
);

const SECTIONS = [
  ["websites", "Websites"],
  ["specialist", "Specialist"],
  ["applications", "Applications"],
  ["ai", "AI agents"],
  ["monthly", "Monthly"],
  ["addons", "Add-ons"],
  ["terms", "Terms"],
];

const quoteHref = (service: string, item: string) => `/contact?service=${service}&item=${encodeURIComponent(item)}`;

function Tag({ children, tone = "once" }: { children: string; tone?: "once" | "monthly" }) {
  return <span className={cn("inline-block rounded-md px-2 py-1 font-mono text-[10px] uppercase tracking-[.14em]", tone === "once" ? "bg-softblue text-navy" : "bg-cobalt text-white")}>{children}</span>;
}

function PriceTable({ items, service }: { items: PriceItem[]; service: string }) {
  return (
    <ul className="border-t border-line">
      {items.map((it) => (
        <li key={it.name} className="border-b border-line">
          <Link href={quoteHref(service, it.name)} className="group grid items-center gap-x-6 gap-y-1 px-2 py-5 transition-all duration-300 hover:bg-card sm:grid-cols-[1.3fr_1fr_auto] sm:px-4">
            <span><span className="block font-display text-lg font-semibold tracking-tight">{it.name}</span>{it.note && <span className="text-sm text-muted">{it.note}</span>}</span>
            <span className="font-display text-xl font-semibold text-accent sm:text-right">{it.price}</span>
            <span className="hidden items-center gap-1 text-sm font-medium text-heading sm:flex">Get a quote <ArrowUpRight size={15} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden /></span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Pricing() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Pricing" }]}
        label="Rate card 2026 · South Africa · ZAR"
        title={<>Clear pricing, in South African rand.</>}
        text="Websites, web applications, AI agents, monthly care and add-ons. All prices are starting prices. A formal quotation confirms your final price and deliverables."
        actions={<LinkButton href="/contact">Request a quotation</LinkButton>}
      >
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
          <span className="flex items-center gap-2"><Tag>Once-off</Tag> development fee</span>
          <span className="flex items-center gap-2"><Tag tone="monthly">Monthly</Tag> recurring service</span>
        </div>
      </PageHero>

      <nav aria-label="Pricing sections" className="sticky top-[68px] z-30 border-y border-line bg-ivory/90 backdrop-blur-xl">
        <ul className="container-x flex gap-1 overflow-x-auto py-2.5 text-sm">
          {SECTIONS.map(([id, label]) => (
            <li key={id} className="shrink-0"><a href={`#${id}`} className="rounded-md px-3.5 py-1.5 text-muted transition hover:bg-softblue hover:text-heading">{label}</a></li>
          ))}
        </ul>
      </nav>

      {/* 1. WEBSITES */}
      <section id="websites" className="section">
        <div className="container-x">
          <SectionHead index="01" label="Website development" title="Six website packages, from Basic to Premium" text="Domain and hosting are quoted separately unless explicitly included. Additional pages, complex functionality and substantial changes outside the agreed scope are quoted separately." />
          <ul className="border-t border-line">
            {PACKAGES.map((p, i) => (
              <Reveal key={p.id}>
                <li className="grid gap-6 border-b border-line py-8 lg:grid-cols-[250px_1fr_auto] lg:gap-10">
                  <div>
                    <p className="font-mono text-xs text-accent">0{i + 1}</p>
                    <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">{p.name}</h3>
                    <p className="mt-4 font-display text-4xl font-semibold tracking-tight">{formatZAR(p.price)}</p>
                    <div className="mt-3"><Tag>Once-off</Tag></div>
                  </div>
                  <div>
                    <p className="text-sm text-muted">{p.blurb}</p>
                    <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                      {p.features.map((f) => (<li key={f} className="flex gap-2.5 text-[15px]"><Check size={16} className="mt-1 shrink-0 text-cobalt" aria-hidden />{f}</li>))}
                    </ul>
                  </div>
                  <div className="lg:self-start"><LinkButton href={`/contact?package=${p.id}`} variant="dark">Request this package</LinkButton></div>
                </li>
              </Reveal>
            ))}
          </ul>
          <div className="mt-16"><h3 className="display-md mb-6">Compare two packages</h3><PackageCompare /></div>
        </div>
      </section>

      {/* 2. SPECIALIST */}
      <section id="specialist" className="theme-soft section bg-softblue">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-40 lg:self-start">
            <SectionHead index="02" label="Specialist websites" title="Built for a specific kind of business" text="Company sites, personal brands, stores, appointment platforms, schools and membership portals." className="mb-6 lg:mb-6" />
            <Tag>Once-off · starting prices</Tag>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">E-commerce integrations, payment gateways, inventory management, shipping and advanced catalogue functionality may attract additional charges.</p>
          </div>
          <PriceTable items={SPECIALIST_SITES} service="web" />
        </div>
      </section>

      {/* 3. WEB APPLICATIONS */}
      <section id="applications" className="theme-dark bg-navy">
        <div className="container-x section grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-40 lg:self-start">
            <SectionHead index="03" label="Web applications" title="Custom software, priced by complexity" text="Final pricing depends on authentication, user roles, database design, integrations, workflows, security requirements and overall system complexity." className="mb-6 lg:mb-6" />
            <Tag>Once-off · starting prices</Tag>
            <ul className="mt-8 flex flex-wrap gap-2">
              {WEB_APP_SOLUTIONS.map((s) => (<li key={s} className="rounded-md border border-line px-2.5 py-1 text-xs text-muted">{s}</li>))}
            </ul>
          </div>
          <div>
            <PriceTable items={WEB_APPS} service="apps" />
            <p className="mt-6 text-sm leading-relaxed text-muted">Enterprise and custom applications require a detailed project assessment and formal quotation.</p>
          </div>
        </div>
      </section>

      {/* 4. AI */}
      <section id="ai" className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-40 lg:self-start">
            <SectionHead index="04" label="AI agents and integrations" title="Assistants and automation for your business" text="Pricing depends on integrations, AI model requirements, workflow complexity, data sources and deployment." className="mb-6 lg:mb-6" />
            <Tag>Once-off · starting prices</Tag>
            <ul className="mt-8 space-y-2 text-sm text-muted">
              {AI_AVAILABLE.map((a) => (<li key={a} className="flex gap-2"><Check size={15} className="mt-0.5 shrink-0 text-cobalt" aria-hidden />{a}</li>))}
            </ul>
          </div>
          <div>
            <PriceTable items={AI_SOLUTIONS} service="ai" />
            <p className="mt-6 rounded-xl border border-line bg-card p-5 text-sm leading-relaxed text-muted"><span className="font-medium text-heading">Not included:</span> API usage, AI model consumption, WhatsApp Business API charges, hosting and third-party subscriptions, unless explicitly included in the quotation.</p>
          </div>
        </div>
      </section>

      {/* 5/6. MONTHLY */}
      <section id="monthly" className="theme-soft section bg-softblue">
        <div className="container-x">
          <SectionHead index="05" label="Monthly services" title="Keep everything running, for a fixed monthly fee" text="Monthly care is optional and is not automatically included in once-off development. Support hours, update limits and response times are defined in the maintenance agreement." />
          <h3 className="mb-5 flex items-center gap-3 font-display text-xl font-semibold">Website maintenance <Tag tone="monthly">Monthly</Tag></h3>
          <div className="grid border-t border-line md:grid-cols-3 md:divide-x md:divide-[var(--line)]">
            {MAINTENANCE.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.06}>
                <div className="flex h-full flex-col border-b border-line py-8 md:border-b-0 md:px-8 md:first:pl-0 md:last:pr-0">
                  <h4 className="font-display text-lg font-semibold">{m.name}</h4>
                  <p className="mt-3 font-display text-4xl font-semibold tracking-tight">{m.price}<span className="ml-1 text-sm font-normal text-muted">/ month</span></p>
                  {m.extends && <p className="mt-5 text-sm font-medium text-accent">{m.extends}</p>}
                  <ul className="mb-6 mt-3 flex-1 space-y-2 text-[15px]">
                    {m.includes.map((f) => (<li key={f} className="flex gap-2.5"><Check size={16} className="mt-1 shrink-0 text-cobalt" aria-hidden />{f}</li>))}
                  </ul>
                  <div><LinkButton href={quoteHref("support", m.name)} variant="dark">Choose this plan</LinkButton></div>
                </div>
              </Reveal>
            ))}
          </div>
          <h3 className="mb-5 mt-16 flex items-center gap-3 font-display text-xl font-semibold">AI and business automation support <Tag tone="monthly">Monthly</Tag></h3>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            <PriceTable items={AI_MONTHLY} service="ai" />
            <p className="text-sm leading-relaxed text-muted">These services cover ongoing monitoring, maintenance and technical support for implemented AI solutions. API usage, WhatsApp charges, hosting, third-party software and other external operating costs are billed separately where applicable.</p>
          </div>
        </div>
      </section>

      {/* 7. ADD-ONS */}
      <section id="addons" className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-40 lg:self-start">
            <SectionHead index="06" label="Additional services" title="Optional add-ons" text="Add what you need to any project. All add-ons are quoted separately unless specifically included in your original quotation." className="mb-0 lg:mb-0" />
          </div>
          <PriceTable items={ADDONS} service="web" />
        </div>
      </section>

      {/* TERMS */}
      <section id="terms" className="theme-dark bg-navy">
        <div className="container-x section">
          <SectionHead index="07" label="Payment terms and conditions" title="What is included, what is excluded and how payment works" text="Your written quotation confirms the final scope, price and deliverables." />
          <div className="grid border-t border-line md:grid-cols-2 lg:grid-cols-3">
            {TERMS.map((t) => (
              <Reveal key={t.title}>
                <div className="h-full border-b border-line py-8 md:pr-8">
                  <h3 className="font-display text-lg font-semibold tracking-tight">{t.title}</h3>
                  <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted">
                    {t.points.map((p) => (<li key={p} className="flex gap-3"><span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-cobalt-300" />{p}</li>))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOM QUOTES + COMING SOON */}
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <p className="label mb-5">Complex projects</p>
            <h2 className="display-md">Large or unusual projects need a custom quotation.</h2>
            <ol className="mt-8 border-t border-line">
              {["Send us your enquiry using the project form.", "We have a discovery conversation to understand the requirements.", "You receive a written scope and quotation.", "Work begins once the quotation is accepted and the 50% deposit is paid."].map((t, i) => (
                <li key={t} className="flex gap-4 border-b border-line py-4 text-[15px]"><span className="font-mono text-xs text-accent">0{i + 1}</span>{t}</li>
              ))}
            </ol>
          </div>
          <div>
            <p className="label mb-5">Coming soon</p>
            <h2 className="display-md">Our own digital products.</h2>
            <p className="body-lg mt-4">Ragophala Digital is also building products of its own, priced independently when they are ready for commercial release.</p>
            <ul className="mt-8 border-t border-line">
              {COMING_SOON.map((c) => (
                <li key={c.name} className="border-b border-line py-5"><h3 className="font-display text-lg font-semibold">{c.name}</h3><p className="mt-1 text-sm leading-relaxed text-muted">{c.text}</p></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="theme-soft bg-softblue">
        <div className="container-x section grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead index="08" label="Pricing questions" title="Before you request a quotation" className="mb-0 lg:mb-0" />
          <Faq items={FAQS.filter((f) => ["Pricing", "Payments", "Domains and hosting", "Third-party costs"].includes(f.category))} />
        </div>
      </section>
    </>
  );
}
