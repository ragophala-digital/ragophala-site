import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LinkButton, Reveal, SectionHead, Breadcrumb } from "@/components/ui";
import { AppShowcase } from "@/components/demos-app";
import { WEB_APPS, WEB_APP_SOLUTIONS } from "@/lib/pricing";
import { pageMeta } from "@/lib/utils";

export const metadata = pageMeta("Web Applications", "Custom CRMs, inventory systems, client portals, booking platforms and dashboards built around how your business works.", "/web-applications");

const APPROACH = [
  ["Discovery and scoping", "We map your processes, users and priorities, then write a clear scope."],
  ["Data and permissions", "We design the database, user roles and security around your needs."],
  ["Staged delivery", "You review working versions regularly, so feedback shapes the result."],
  ["Launch and support", "We deploy, hand over and offer optional monthly support."],
];

export default function WebApplications() {
  return (
    <>
      <section className="theme-dark relative overflow-hidden bg-navy pb-20 pt-32 sm:pt-40">
        <div aria-hidden className="grid-lines absolute inset-0 opacity-60" />
        <div aria-hidden className="absolute -left-20 top-40 h-[28rem] w-[28rem] rounded-full bg-cobalt/25 blur-[130px]" />
        <div className="container-x relative">
          <Breadcrumb items={[{ label: "Services", href: "/services" }, { label: "Web applications" }]} />
          <Reveal>
            <p className="label mb-6 flex items-center gap-3"><span aria-hidden className="h-px w-8 bg-current opacity-40" />Service 02 · Web applications</p>
            <h1 className="display-lg max-w-[20ch]">Custom software that replaces spreadsheets and manual admin.</h1>
            <p className="body-lg mt-6">Business management systems, CRMs, inventory platforms and client portals, designed like real products and built around your workflow.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <LinkButton href="/contact?service=apps">Discuss your application</LinkButton>
              <LinkButton href="/pricing#applications" variant="line" arrow={false}>Application pricing</LinkButton>
            </div>
          </Reveal>
          <Reveal className="mt-14" delay={0.15}><div id="showcase" className="scroll-mt-28"><AppShowcase /></div></Reveal>
        </div>
      </section>

      <section className="theme-soft section bg-softblue">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead index="01" label="Potential solutions" title="What we can build for you" className="mb-0 lg:mb-0" />
          <ul className="grid border-t border-line sm:grid-cols-2">
            {WEB_APP_SOLUTIONS.map((s, i) => (
              <li key={s} className="border-b border-line py-4 pr-4 text-[15px] sm:odd:border-r sm:even:pl-6">
                <span className="mr-3 font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>{s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHead index="02" label="How we build" title="Scoped, staged and secure" text="Pricing depends on authentication, user roles, database design, integrations, workflows, security requirements and overall complexity." />
          <ol className="grid gap-8 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {APPROACH.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.07}><li><p className="font-mono text-xs text-accent">0{i + 1}</p><h3 className="mt-3 font-display text-lg font-semibold tracking-tight">{t}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{d}</p></li></Reveal>
            ))}
          </ol>
          <p className="mt-12 max-w-2xl rounded-2xl border border-line bg-card p-6 text-[15px] leading-relaxed text-muted"><span className="font-medium text-heading">Security and data protection.</span> Role-based access, validated inputs, secure connections and careful handling of personal information are part of every application. We discuss POPIA requirements for your business during scoping.</p>
        </div>
      </section>

      <section className="theme-dark bg-navy">
        <div className="container-x section">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <SectionHead index="03" label="Pricing" title="Application development, once-off" text="Starting prices. Enterprise and custom applications require a detailed assessment and formal quotation." className="mb-0 lg:mb-0" />
            <LinkButton href="/pricing#applications" variant="line">Full pricing</LinkButton>
          </div>
          <ul className="border-t border-line">
            {WEB_APPS.map((a) => (
              <li key={a.name} className="border-b border-line">
                <Link href={`/contact?service=apps&item=${encodeURIComponent(a.name)}`} className="group flex flex-wrap items-center justify-between gap-3 px-2 py-6 transition hover:bg-white/5 sm:px-4">
                  <span><span className="block font-display text-lg font-semibold">{a.name}</span>{a.note && <span className="text-sm text-muted">{a.note}</span>}</span>
                  <span className="flex items-center gap-3 font-display text-xl">{a.price}<ArrowUpRight size={18} className="text-muted transition group-hover:text-cobalt-300" aria-hidden /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
