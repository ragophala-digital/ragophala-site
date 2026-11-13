import Link from "next/link";
import { ArrowUpRight, Code2, Cpu, LifeBuoy, LayoutDashboard } from "lucide-react";
import { HeroScene } from "@/components/three/lazy";
import { CTASection, LinkButton, Reveal, SectionHead, TiltCard, WhatsAppButton } from "@/components/ui";
import { ProjectVisual } from "@/components/ProjectVisual";
import { PROCESS, PROJECTS, SERVICES, TECH, WHY } from "@/lib/site";

const ICONS = { web: Code2, apps: LayoutDashboard, ai: Cpu, support: LifeBuoy };

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
        <div aria-hidden className="grid-bg absolute inset-0" />
        <div aria-hidden className="absolute -left-40 top-20 h-[30rem] w-[30rem] rounded-full bg-volt/20 blur-[140px]" />
        <div className="container-x relative grid items-center gap-8 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="eyebrow">South African digital agency</p>
            <h1 className="h-display">
              Digital solutions for businesses that want <span className="bg-gradient-to-r from-volt-300 to-volt bg-clip-text text-transparent">real results.</span>
            </h1>
            <p className="lead mt-6 max-w-xl">
              Ragophala Digital designs and builds websites, web applications and AI-powered automation that help South African businesses attract customers, save time and grow.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/contact">Request a quotation</LinkButton>
              <LinkButton href="/portfolio" variant="ghost">View demo projects</LinkButton>
              <WhatsAppButton message="Hi Ragophala Digital, I would like to discuss a project." label="WhatsApp us" />
            </div>
          </div>
          <div className="relative h-[340px] sm:h-[460px] lg:h-[540px]">
            <HeroScene />
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-white/10 bg-navy-950/60 py-4" aria-label="Technologies we work with">
        <div className="flex w-max animate-marquee gap-12 text-sm uppercase tracking-[.2em] text-slate-500">
          {[...TECH, ...TECH].map((t, i) => (<span key={i} aria-hidden={i >= TECH.length}>{t}</span>))}
        </div>
      </div>

      <section className="section">
        <div className="container-x">
          <SectionHead eyebrow="What we do" title="Four service divisions, one dependable team" text="From your first website to custom software and automation, we build the digital tools your business needs." />
          <div className="grid gap-5 md:grid-cols-2">
            {SERVICES.map((s, i) => {
              const Icon = ICONS[s.key];
              return (
                <Reveal key={s.key} delay={i * 0.08}>
                  <TiltCard className="glass h-full p-7">
                    <Link href={s.href} className="group block">
                      <div className="mb-5 flex items-center justify-between">
                        <span className="grid h-12 w-12 place-items-center rounded-xl border border-volt/40 bg-volt/15 text-volt-300"><Icon size={22} aria-hidden /></span>
                        <ArrowUpRight className="text-slate-500 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" aria-hidden />
                      </div>
                      <h3 className="font-display text-xl">{s.title}</h3>
                      <p className="mt-2 text-sm text-slate-400">{s.short}</p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {s.benefits.slice(0, 3).map((b) => (<li key={b} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">{b}</li>))}
                      </ul>
                    </Link>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section light-section">
        <div className="container-x">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <p className="eyebrow">Featured projects</p>
              <h2 className="h-section">Demonstration projects that show how we work</h2>
              <p className="lead mt-3">These are clearly labelled concept projects, built to show approach and capability.</p>
            </div>
            <LinkButton href="/portfolio" variant="outline-dark">See all projects</LinkButton>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[PROJECTS[0], PROJECTS[3], PROJECTS[6]].map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.1}>
                <Link href={`/portfolio/${p.slug}`} className="group block overflow-hidden rounded-2xl border border-navy-900/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <ProjectVisual project={p} className="aspect-[16/10] w-full transition duration-500 group-hover:scale-[1.03]" />
                  <div className="p-5">
                    <span className="text-xs uppercase tracking-widest text-volt-600">{p.category} · Demo</span>
                    <h3 className="mt-1 font-display text-lg">{p.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{p.summary}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHead eyebrow="Why Ragophala Digital" title="Built around how South African businesses actually work" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={(i % 3) * 0.08}>
                <div className="glass h-full p-6">
                  <span className="font-display text-sm text-volt-400">0{i + 1}</span>
                  <h3 className="mt-2 font-display text-lg">{w.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section light-section">
        <div className="container-x">
          <SectionHead eyebrow="How we work" title="A clear process from first call to launch" />
          <ol className="grid gap-4 md:grid-cols-5">
            {PROCESS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <li className="relative h-full rounded-2xl border border-navy-900/10 bg-white p-5">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-navy-900 font-display text-sm text-white">{i + 1}</span>
                  <h3 className="mt-4 font-display text-lg">{s.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{s.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CTASection />
    </>
  );
}
