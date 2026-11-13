import { Boxes, CalendarClock, Code2, Gauge, LayoutDashboard, Network, Users, type LucideIcon } from "lucide-react";
import { AppScene } from "@/components/three/lazy";
import { CTASection, LinkButton, PageHero, Reveal, SectionHead, TiltCard } from "@/components/ui";
import { pageMeta } from "@/lib/utils";

export const metadata = pageMeta("Web Applications", "Custom business applications, management systems, customer portals, dashboards and inventory systems built for South African businesses.", "/web-applications");

const APPS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Code2, title: "Custom business applications", text: "Software shaped around the way your business actually runs." },
  { icon: Network, title: "Management systems", text: "Centralise jobs, clients, staff and records in one secure system." },
  { icon: Users, title: "Customer portals", text: "Give customers secure access to their orders, documents and requests." },
  { icon: LayoutDashboard, title: "Dashboards", text: "See key numbers and trends at a glance, with exportable reports." },
  { icon: Boxes, title: "Inventory systems", text: "Track stock, suppliers and reorder levels with automatic alerts." },
  { icon: CalendarClock, title: "Booking and management platforms", text: "Online scheduling, reminders and resource management." },
  { icon: Gauge, title: "Custom software solutions", text: "Integrations and tools for needs that off-the-shelf products do not meet." },
];

export default function WebApplications() {
  return (
    <>
      <PageHero
        eyebrow="Web applications"
        title={<>Custom software that replaces <span className="text-volt-400">spreadsheets and admin</span></>}
        text="Portals, dashboards and management systems built around your workflow, secure by design and ready to grow as your business does."
        scene={<AppScene />}
        actions={<LinkButton href="/contact?service=apps">Discuss your application</LinkButton>}
      />

      <section className="section">
        <div className="container-x">
          <SectionHead eyebrow="What we build" title="Applications for the way you work" />
          <div className="grid gap-5 sm:grid-cols-2">
            {APPS.map((a, i) => (
              <Reveal key={a.title} delay={(i % 2) * 0.08}>
                <TiltCard className="glass flex h-full gap-4 p-6">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-volt/40 bg-volt/15 text-volt-300"><a.icon size={22} aria-hidden /></span>
                  <div><h3 className="font-display text-lg">{a.title}</h3><p className="mt-1 text-sm text-slate-400">{a.text}</p></div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section light-section">
        <div className="container-x">
          <SectionHead eyebrow="How we build" title="Scoped, staged and secure" text="Custom software is quoted per project. We reduce risk by delivering in stages you can review and test." />
          <div className="grid gap-5 md:grid-cols-4">
            {[["Discovery", "Workshops to map your processes, users and priorities."], ["Scope and quote", "A written specification, milestones and fixed or phased pricing."], ["Staged delivery", "Working versions shared regularly so feedback shapes the result."], ["Launch and support", "Deployment, training and ongoing maintenance options."]].map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-navy-900/10 bg-white p-5"><span className="font-display text-sm text-volt-600">Step {i + 1}</span><h3 className="mt-2 font-display text-lg">{t}</h3><p className="mt-2 text-sm text-slate-600">{d}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <Reveal>
            <div className="glass grid gap-8 p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <h2 className="h-section">Security and data protection</h2>
                <p className="lead mt-4">User access controls, validated inputs, encrypted connections and careful handling of personal information are part of every application. We will discuss POPIA requirements for your business during scoping.</p>
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                {["Role-based access for staff and customers", "Secure server-side validation", "Backups and deployment planning", "Documentation and handover"].map((t) => (<li key={t} className="rounded-xl border border-white/10 px-4 py-3">{t}</li>))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection service="apps" title="Tell us about the system you need" text="Describe the problem and we will recommend an approach and provide a written quotation." />
    </>
  );
}
