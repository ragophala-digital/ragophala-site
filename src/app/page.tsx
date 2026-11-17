import { Marquee } from "@/components/Marquee";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HeroScene } from "@/components/three/lazy";
import { CountUp, LinkButton, Reveal, SectionHead, StaggerHeadline } from "@/components/ui";
import { CursorGlow, Magnetic, Parallax } from "@/components/ui-motion";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { PACKAGES_PUBLIC } from "@/lib/catalogue-public";
import { PROCESS, SERVICES, WHY } from "@/lib/site";

const HERO_META = ["Websites", "Web applications", "AI agents", "Business automation"];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="theme-dark relative overflow-hidden bg-navy">
        <div aria-hidden className="grid-lines absolute inset-0 opacity-70" />
        <Parallax speed={0.35} className="pointer-events-none absolute -right-24 top-10 h-[32rem] w-[32rem]"><div className="h-full w-full rounded-full bg-cobalt/30 blur-[140px]" /></Parallax>
        <CursorGlow />
        <div className="container-x grid min-h-[100svh] items-center gap-6 pb-28 pt-32 lg:grid-cols-[1.05fr_1fr] lg:pb-32">
          <div className="relative z-10">
            <p className="label mb-8 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="text-accent">RD / 2026 / Digital</span>
              <span aria-hidden className="h-px w-8 bg-current opacity-40" />
              South Africa
            </p>
            <StaggerHeadline className="display-xl" parts={[{ text: "Digital solutions." }, { text: "Built for business.", accent: true }]} />
            <div className="animate-rise [animation-delay:.5s]">
              <p className="body-lg mt-8 lg:max-w-[38ch]">We design and develop digital experiences, intelligent applications and AI-powered solutions that help businesses work smarter, connect with customers and grow.</p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Magnetic><LinkButton href="/contact">Start a project</LinkButton></Magnetic>
                <LinkButton href="/services" variant="line" arrow={false}>Explore our services</LinkButton>
              </div>
            </div>
          </div>
          <div className="relative -mx-5 h-[400px] sm:mx-0 sm:h-[500px] lg:absolute lg:inset-y-0 lg:right-0 lg:mx-0 lg:h-auto lg:w-[62%]">
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

      <section aria-label="Technology" className="border-b border-line py-8">
        <Marquee label="Technology we build with" items={["Next.js", "React", "TypeScript", "Three.js", "Tailwind CSS", "Framer Motion", "Blender", "AI and automation"]} />
      </section>

      {/* INTRODUCTION */}
      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4"><p className="label flex items-center gap-3"><span className="text-accent">01</span><span aria-hidden className="h-px w-8 bg-current opacity-40" />The studio</p></Reveal>
          <div className="lg:col-span-8">
            <Reveal><h2 className="display-md max-w-[24ch]">A digital studio for what&apos;s next.</h2></Reveal>
            <Reveal delay={0.1}><p className="body-lg mt-6">Ragophala Digital is a South African digital studio for small businesses, entrepreneurs and growing organisations. We combine thoughtful design with solid engineering, so what we build looks credible and works properly.</p></Reveal>
            <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-line pt-8">
              {[[SERVICES.length, "Service divisions"], [PACKAGES_PUBLIC.length, "Website packages"], [PROCESS.length, "Project stages"]].map(([n, l]) => (
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
          <SectionHead index="02" label="What we do" title="Six services, one connected studio" />
          <ul className="border-t border-line">
            {SERVICES.map((s) => (
              <li key={s.key} className="border-b border-line">
                <Link href={s.href} className="group relative grid items-center gap-x-8 gap-y-2 overflow-hidden px-2 py-8 transition-all duration-300 hover:bg-softblue/60 sm:px-4 lg:grid-cols-[70px_1.1fr_1fr_40px] lg:py-10 lg:hover:px-8">
                  <span className="font-mono text-xs text-accent">{s.index}</span>
                  <h3 className="display-md transition-transform duration-300 group-hover:translate-x-1">{s.title}</h3>
                  <p className="max-w-[44ch] text-[15px] leading-relaxed text-muted">{s.short}</p>
                  <ArrowUpRight className="hidden text-muted transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cobalt lg:block" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CINEMATIC PROJECT SHOWCASE */}
      <ProjectShowcase />

      {/* HOW WE WORK */}
      <section className="theme-soft section bg-softblue">
        <div className="container-x">
          <SectionHead index="04" label="How we work" title="A clear journey from first conversation to launch" />
          <ol className="grid gap-y-8 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 lg:gap-x-6">
            {PROCESS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.06} className="relative">
                <span aria-hidden className="absolute -top-[37px] left-0 h-2.5 w-2.5 rounded-full bg-cobalt ring-4 ring-softblue" />
                <p className="font-mono text-xs text-accent">{s.n}</p>
                <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.summary}</p>
              </Reveal>
            ))}
          </ol>
          <div className="mt-12"><LinkButton href="/process" variant="dark">Follow the full journey</LinkButton></div>
        </div>
      </section>

      {/* WHY */}
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead index="05" label="Why Ragophala Digital" title="Built with purpose. Designed to deliver." className="mb-0 lg:mb-0" />
          </div>
          <ul className="border-t border-line">
            {WHY.map((w, i) => (
              <Reveal as="li" key={w.title} delay={(i % 2) * 0.05} className="grid gap-2 border-b border-line py-7 sm:grid-cols-[1fr_1.3fr] sm:gap-8">
                <h3 className="font-display text-lg font-semibold tracking-tight"><span className="mr-3 font-mono text-xs text-accent">0{i + 1}</span>{w.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted">{w.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
