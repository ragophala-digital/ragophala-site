import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HeroScene } from "@/components/three/lazy";
import { CTASection, CountUp, LinkButton, Reveal, SectionHead, StaggerHeadline } from "@/components/ui";
import { DashboardMock } from "@/components/mockups-app";
import { ChatMock } from "@/components/mockups-ai";
import { MockCaption } from "@/components/mockups-web";
import { ProjectVisual } from "@/components/ProjectVisual";
import { PACKAGES, PROCESS, PROJECTS, SERVICES, WHY } from "@/lib/site";

const HERO_META = ["Websites", "Web applications", "AI agents", "Business automation"];

export default function Home() {
  const featured = [PROJECTS[0], PROJECTS[3], PROJECTS[6]];
  return (
    <>
      {/* HERO */}
      <section className="theme-dark relative overflow-hidden bg-navy">
        <div aria-hidden className="grid-lines absolute inset-0 opacity-70" />
        <div aria-hidden className="absolute -right-24 top-10 h-[32rem] w-[32rem] rounded-full bg-cobalt/30 blur-[140px]" />
        <div className="container-x relative grid min-h-[100svh] items-center gap-6 pb-28 pt-32 lg:grid-cols-[1.05fr_1fr] lg:pb-32">
          <div>
            <p className="label mb-8 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="text-accent">RD / 2026 / Digital</span>
              <span aria-hidden className="h-px w-8 bg-current opacity-40" />
              South Africa
            </p>
            <StaggerHeadline className="display-xl" parts={[{ text: "Digital solutions." }, { text: "Built for business.", accent: true }]} />
            <Reveal delay={0.5}>
              <p className="body-lg mt-8">We design and develop digital experiences, intelligent applications and AI-powered solutions that help businesses work smarter and grow.</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <LinkButton href="/contact">Start a project</LinkButton>
                <LinkButton href="/services" variant="line" arrow={false}>Explore our services</LinkButton>
              </div>
            </Reveal>
          </div>
          <div className="relative -mx-5 h-[400px] sm:mx-0 sm:h-[500px] lg:h-[680px]">
            <HeroScene />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 border-t border-line">
          <ul className="container-x grid grid-cols-2 divide-line font-mono text-[11px] uppercase tracking-[.14em] text-muted sm:grid-cols-4 sm:divide-x">
            {HERO_META.map((m, i) => (
              <li key={m} className="px-0 py-4 sm:px-6 sm:first:pl-0"><span className="mr-2 text-accent">0{i + 1}</span>{m}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4"><p className="label flex items-center gap-3"><span className="text-accent">01</span><span aria-hidden className="h-px w-8 bg-current opacity-40" />The studio</p></Reveal>
          <div className="lg:col-span-8">
            <Reveal><h2 className="display-md max-w-[24ch]">We build real digital products and business solutions, not just attractive websites.</h2></Reveal>
            <Reveal delay={0.1}><p className="body-lg mt-6">Ragophala Digital is a South African digital studio for small businesses, entrepreneurs and growing organisations. We combine thoughtful design with solid engineering, so what we build looks credible and works properly.</p></Reveal>
            <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-line pt-8">
              {[[SERVICES.length, "Service divisions"], [PACKAGES.length, "Website packages"], [PROCESS.length, "Project stages"]].map(([n, l]) => (
                <div key={l as string}>
                  <dt className="label order-2">{l}</dt>
                  <dd className="mt-2 font-display text-4xl font-semibold tracking-tight text-heading sm:text-5xl"><CountUp to={n as number} /></dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* SERVICES INDEX */}
      <section className="pb-20 sm:pb-28">
        <div className="container-x">
          <SectionHead index="02" label="What we do" title="Four disciplines, one connected studio" />
          <ul className="border-t border-line">
            {SERVICES.map((s) => (
              <li key={s.key} className="border-b border-line">
                <Link href={s.href} className="group grid items-center gap-x-8 gap-y-2 px-2 py-8 transition-all duration-300 hover:bg-softblue/60 sm:px-4 lg:grid-cols-[70px_1.1fr_1fr_40px] lg:py-10 lg:hover:px-8">
                  <span className="font-mono text-xs text-accent">{s.index}</span>
                  <h3 className="display-md">{s.title}</h3>
                  <p className="max-w-[44ch] text-[15px] leading-relaxed text-muted">{s.short}</p>
                  <ArrowUpRight className="hidden text-muted transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cobalt lg:block" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FEATURED CAPABILITIES */}
      <section className="theme-dark relative overflow-hidden bg-navy">
        <div aria-hidden className="grid-lines absolute inset-0 opacity-40" />
        <div className="container-x section relative grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHead index="03" label="Featured capabilities" title="Interfaces that work like real software" text="From business dashboards to AI assistants, we design the product experience as carefully as the code behind it." className="mb-8 lg:mb-8" />
            <ul className="space-y-3 text-[15px] text-fg">
              {["Dashboards, portals and management systems", "AI assistants that answer, qualify and hand over", "Workflows that connect the tools you already use"].map((t) => (
                <li key={t} className="flex gap-3"><span aria-hidden className="mt-2.5 h-px w-6 shrink-0 bg-cobalt-300" />{t}</li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <LinkButton href="/web-applications">Web applications</LinkButton>
              <LinkButton href="/ai-automation" variant="line">AI agents</LinkButton>
            </div>
          </div>
          <Reveal>
            <div className="relative pb-10 sm:pb-14">
              <DashboardMock />
              <ChatMock className="mt-4 sm:absolute sm:-bottom-0 sm:-left-8 sm:mt-0 sm:w-[270px]" />
            </div>
            <MockCaption>Illustrative interfaces · sample data</MockCaption>
          </Reveal>
        </div>
      </section>

      {/* SELECTED CONCEPTS */}
      <section className="section">
        <div className="container-x">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <SectionHead index="04" label="Selected concepts" title="How we approach real business problems" text="Illustrative concept projects that show our design and engineering approach. They are not client engagements." className="mb-0 lg:mb-0" />
            <LinkButton href="/portfolio" variant="line">All concepts</LinkButton>
          </div>
          <div className="grid gap-6 lg:grid-cols-12">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08} className={i === 0 ? "lg:col-span-7 lg:row-span-2" : "lg:col-span-5"}>
                <Link href={`/portfolio/${p.slug}`} className="group block overflow-hidden rounded-2xl border border-line bg-card">
                  <ProjectVisual project={p} className={`w-full transition duration-700 group-hover:scale-[1.03] ${i === 0 ? "aspect-[4/3] lg:aspect-[5/4]" : "aspect-[16/9]"}`} />
                  <div className="flex items-end justify-between gap-4 p-5">
                    <div>
                      <p className="label mb-2">{p.category} · Concept</p>
                      <h3 className="font-display text-xl font-semibold tracking-tight">{p.title}</h3>
                    </div>
                    <ArrowUpRight className="shrink-0 text-muted transition group-hover:text-cobalt" aria-hidden />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="theme-soft section bg-softblue">
        <div className="container-x">
          <SectionHead index="05" label="How we work" title="A clear journey from first conversation to launch" />
          <ol className="grid gap-y-8 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-x-6">
            {PROCESS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <li className="relative">
                  <span aria-hidden className="absolute -top-[37px] left-0 h-2.5 w-2.5 rounded-full bg-cobalt ring-4 ring-softblue" />
                  <p className="font-mono text-xs text-accent">{s.n}</p>
                  <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.summary}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <div className="mt-12"><LinkButton href="/process" variant="dark">See our full process</LinkButton></div>
        </div>
      </section>

      {/* WHY */}
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead index="06" label="Why Ragophala Digital" title="Considered work, clearly communicated" className="mb-0 lg:mb-0" />
          </div>
          <ul className="border-t border-line">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={(i % 2) * 0.05}>
                <li className="grid gap-2 border-b border-line py-7 sm:grid-cols-[1fr_1.3fr] sm:gap-8">
                  <h3 className="font-display text-lg font-semibold tracking-tight"><span className="mr-3 font-mono text-xs text-accent">0{i + 1}</span>{w.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted">{w.text}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  );
}
