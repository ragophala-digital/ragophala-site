import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Breadcrumb, LinkButton, Reveal } from "@/components/ui";
import { ScaleToFit } from "@/components/ui-motion";
import { MOCK_HEIGHT, MOCK_WIDTH, ProjectMock } from "@/components/ProjectMock";
import { DeviceShowcase } from "@/components/demos-web";
import { CrmMock, InventoryMock, PortalMock, ReportMock } from "@/components/mockups-app";
import { ChatMock, WhatsAppMock } from "@/components/mockups-ai";
import { BrowserFrame, SiteMock } from "@/components/mockups-web";
import { CASES, PROJECTS, type MockKind } from "@/lib/site";
import { pageMeta } from "@/lib/utils";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) return {};
  return pageMeta(`${p.title} (concept case study)`, p.summary, `/portfolio/${p.slug}`);
}

function MoreScreens({ kind }: { kind: MockKind }) {
  if (kind === "booking" || kind === "shop" || kind === "studio")
    return (<><BrowserFrame url="rooms" className="md:col-span-2"><SiteMock variant="booking" /></BrowserFrame><BrowserFrame url="checkout"><SiteMock variant="shop" /></BrowserFrame></>);
  if (kind === "fleet" || kind === "portal" || kind === "stock")
    return (<><CrmMock /><InventoryMock /><ReportMock className="md:col-span-2" /><PortalMock className="md:col-span-2" /></>);
  return (<><ChatMock /><div className="flex justify-center"><WhatsAppMock /></div></>);
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="label mb-4">{title}</h2>
      <ul className="border-t border-line">{items.map((t) => (<li key={t} className="flex gap-3 border-b border-line py-3.5 text-[15px]"><Check size={16} className="mt-1 shrink-0 text-cobalt" aria-hidden />{t}</li>))}</ul>
    </div>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = PROJECTS.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const p = PROJECTS[idx];
  const c = CASES[p.slug];
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const service = p.category === "Websites" ? "web" : p.category === "Web Applications" ? "apps" : "ai";
  const isSite = c.mock === "booking" || c.mock === "shop" || c.mock === "studio";

  return (
    <>
      <section className="theme-dark relative overflow-hidden bg-navy pb-16 pt-32 sm:pt-40">
        <div aria-hidden className="grid-lines absolute inset-0 opacity-50" />
        <div aria-hidden className="absolute left-1/2 top-24 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full opacity-25 blur-[130px]" style={{ background: c.tint }} />
        <div className="container-x relative">
          <Breadcrumb items={[{ label: "Selected concepts", href: "/portfolio" }, { label: p.title }]} />
          <Reveal>
            <p className="label mb-5">{p.category} · Concept case study</p>
            <h1 className="display-lg max-w-[20ch]">{p.title}</h1>
            <p className="body-lg mt-6">{p.description}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Services involved">{c.services.map((s) => (<li key={s} className="rounded-md border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider">{s}</li>))}</ul>
          </Reveal>
          <Reveal delay={0.15} className="mt-12">
            <div className="rounded-2xl border border-line bg-white/[.06] p-3 sm:p-5">
              <ScaleToFit designWidth={MOCK_WIDTH} designHeight={MOCK_HEIGHT} className="rounded-xl bg-gradient-to-br from-softblue/90 to-ivory-200"><ProjectMock kind={c.mock} /></ScaleToFit>
            </div>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[.16em] text-muted">Concept created by Ragophala Digital · not a client project</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4"><p className="label flex items-center gap-3"><span className="text-accent">01</span><span aria-hidden className="h-px w-8 bg-current opacity-40" />Overview</p></Reveal>
          <Reveal delay={0.05} className="lg:col-span-8"><p className="display-md max-w-[28ch]">{p.summary}</p><p className="body-lg mt-6">{p.description}</p></Reveal>
          <Reveal className="lg:col-span-4"><p className="label flex items-center gap-3"><span className="text-accent">02</span><span aria-hidden className="h-px w-8 bg-current opacity-40" />Business problem</p></Reveal>
          <Reveal delay={0.05} className="lg:col-span-8"><p className="text-xl leading-relaxed text-heading sm:text-2xl">{c.problem}</p></Reveal>
          <Reveal className="lg:col-span-4"><p className="label flex items-center gap-3"><span className="text-accent">03</span><span aria-hidden className="h-px w-8 bg-current opacity-40" />Solution</p></Reveal>
          <Reveal delay={0.05} className="lg:col-span-8"><p className="text-xl leading-relaxed text-heading sm:text-2xl">{c.solution}</p></Reveal>
          <Reveal className="lg:col-span-4"><p className="label flex items-center gap-3"><span className="text-accent">04</span><span aria-hidden className="h-px w-8 bg-current opacity-40" />Design direction</p></Reveal>
          <Reveal delay={0.05} className="lg:col-span-8"><p className="text-xl leading-relaxed text-heading sm:text-2xl">{c.design}</p></Reveal>
        </div>
      </section>

      <section className="theme-soft section bg-softblue">
        <div className="container-x grid gap-10 md:grid-cols-3">
          <ListBlock title="Main features" items={p.features} />
          <ListBlock title="Design goals" items={p.goals} />
          <ListBlock title="Technology" items={p.tech} />
        </div>
      </section>

      {isSite && (
        <section className="section">
          <div className="container-x">
            <p className="label mb-6 flex items-center gap-3"><span className="text-accent">05</span><span aria-hidden className="h-px w-8 bg-current opacity-40" />Responsive previews</p>
            <DeviceShowcase className="mx-auto max-w-4xl" />
          </div>
        </section>
      )}

      <section className="section pt-0">
        <div className="container-x">
          <p className="label mb-6 flex items-center gap-3"><span className="text-accent">{isSite ? "06" : "05"}</span><span aria-hidden className="h-px w-8 bg-current opacity-40" />More screens</p>
          <div className="grid items-start gap-5 md:grid-cols-2"><MoreScreens kind={c.mock} /></div>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[.16em] text-muted">Illustrative interfaces · sample data</p>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="container-x grid gap-px sm:grid-cols-2">
          <Link href={`/portfolio/${prev.slug}`} className="group flex items-center gap-4 py-10 transition hover:bg-softblue/60 sm:px-4"><ArrowLeft className="text-muted transition group-hover:-translate-x-1 group-hover:text-cobalt" aria-hidden /><span><span className="label block">Previous concept</span><span className="font-display text-lg font-semibold">{prev.title}</span></span></Link>
          <Link href={`/portfolio/${next.slug}`} className="group flex items-center justify-end gap-4 py-10 text-right transition hover:bg-softblue/60 sm:px-4"><span><span className="label block">Next concept</span><span className="font-display text-lg font-semibold">{next.title}</span></span><ArrowRight className="text-muted transition group-hover:translate-x-1 group-hover:text-cobalt" aria-hidden /></Link>
        </div>
      </section>

      <section className="pb-24 pt-4">
        <div className="container-x"><LinkButton href={`/contact?service=${service}&item=${encodeURIComponent(p.title)}`}>Request something similar</LinkButton></div>
      </section>
    </>
  );
}
