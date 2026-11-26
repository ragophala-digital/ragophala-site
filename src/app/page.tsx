import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, Bot, Check, Code2, Globe2,
  LayoutDashboard, Workflow,
} from "lucide-react";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { EnquiryWorkspace } from "@/components/EnquiryWorkspace";
import { HomeFleetPreview, HomeServicePreview } from "@/components/HomeServicePreview";
import { MOCK_HEIGHT, MOCK_WIDTH, ProjectMock } from "@/components/ProjectMock";
import { ScrollCompanion } from "@/components/ScrollCompanion";
import { Reveal } from "@/components/ui";
import { ScaleToFit } from "@/components/ui-motion";
import { WorkflowDepth } from "@/components/WorkflowDepth";
import styles from "@/components/home-visuals.module.css";
import { REAL_PROJECTS } from "@/lib/real-projects";
import { CASES, PROCESS, PROJECTS, SERVICES } from "@/lib/site";
import { serviceByKey } from "@/lib/services";

const capabilities = [
  { key: "web", icon: Globe2, outcome: "Give customers a clear way to find you and enquire." },
  { key: "apps", icon: LayoutDashboard, outcome: "Give your team one place to manage the work." },
  { key: "ai", icon: Bot, outcome: "Answer routine questions and capture useful details." },
  { key: "automation", icon: Workflow, outcome: "Route requests and follow-ups to the right people." },
] as const;

const primary = "btn btn-primary";
const secondary = "btn btn-line";
const eyebrow = "font-mono text-xs font-medium uppercase tracking-[.16em] text-[#2447D6]";

export default function Home() {
  return (
    <div className="bg-ivory text-heading">
      <ScrollCompanion />
      <section data-scene-stage className="theme-dark relative overflow-hidden border-b border-line bg-navy text-fg">
        <HeroBackdrop />
        <div className="container-x relative grid items-center gap-8 pb-12 pt-28 sm:pb-16 sm:pt-32 lg:grid-cols-[1.06fr_0.94fr] lg:gap-12 lg:pb-16 lg:pt-32 xl:gap-20">
          <div className="relative min-w-0">
            <p className="label">South African digital studio</p>
            <h1 className="mt-5 max-w-[16ch] font-display text-[clamp(2.35rem,5.25vw,4.85rem)] font-semibold leading-[1.02] tracking-[-.065em]">
              Turn enquiries <span className="block text-cobalt-300">into customers.</span>
            </h1>
            <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-muted sm:text-lg">Websites, web applications, AI assistants and automation that capture, answer and follow up every enquiry, built for South African businesses.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className={primary}>Start a project <ArrowUpRight size={16} aria-hidden /></Link>
              <Link href="/services" className="btn btn-line">Explore services</Link>
            </div>
            <span data-scene-slot="0" aria-hidden className="pointer-events-none mt-6 block h-40 lg:hidden" />
          </div>
          <div className="relative min-w-0">
            <span data-scene-slot="0" aria-hidden className="pointer-events-none absolute -bottom-[98px] -right-[29px] hidden size-44 lg:block min-[1360px]:-bottom-[124px] min-[1360px]:-right-[114px] min-[1360px]:size-52" />
            <WorkflowDepth><EnquiryWorkspace /></WorkflowDepth>
          </div>
        </div>
      </section>

      <div className="border-b border-line bg-softblue">
        <ul aria-label="Working with Ragophala Digital" className="container-x flex flex-wrap gap-x-8 gap-y-2 py-4 text-sm font-medium">
          {["Based in South Africa", "Clear written quotations", "Ongoing support"].map((point) => (
            <li key={point} className="inline-flex items-center gap-2"><Check size={15} className="shrink-0 text-[#2447D6]" aria-hidden />{point}</li>
          ))}
        </ul>
      </div>

      <section id="home-services" data-scene-stage className="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-24">
        <div className="container-x">
          <p className={eyebrow}>What we do</p>
          <h2 className="display-md mt-3 max-w-[25ch]">Four ways to improve how your business works.</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:gap-5">
            {capabilities.map(({ key, icon: Icon, outcome }, slot) => {
              const service = serviceByKey(key);
              return (
                <li key={key} className="min-w-0">
                  <Link href={service.href} className="group flex h-full flex-col rounded-2xl border border-line bg-ivory p-5 transition-colors hover:border-[#315BFA] sm:p-7">
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid size-11 place-items-center rounded-xl bg-softblue text-[#2447D6]"><Icon size={21} aria-hidden /></span>
                      <span data-scene-slot={slot} aria-hidden className="pointer-events-none size-24 shrink-0 sm:size-32" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold tracking-tight sm:text-2xl">{service.title}</h3>
                    <p className="mt-2 text-sm font-semibold text-[#2447D6]">{outcome}</p>
                    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{service.short}</p>
                    <div className="mt-5 rounded-xl border border-line bg-softblue/60 p-3 sm:p-4">
                      <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-[#566075]">Illustrative interface</p>
                      <div aria-hidden className={styles.screen}><HomeServicePreview service={key} /></div>
                    </div>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold group-hover:underline">Explore {service.title.toLowerCase()} <ArrowUpRight size={15} className="shrink-0" aria-hidden /></span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-x-5 gap-y-1 rounded-2xl border border-line px-5 py-3">
            <p className="py-2 text-sm font-semibold">Already have a website or automation in place?</p>
            <div className="flex flex-wrap gap-x-5">
              {SERVICES.filter(({ key }) => key === "maintenance" || key === "support").map(({ href, title }) => (
                <Link key={href} href={href} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-[#2447D6] hover:underline">{title} <ArrowUpRight size={14} aria-hidden /></Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section data-scene-stage className="border-y border-line bg-softblue py-16 sm:py-20">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className={eyebrow}>Selected work</p>
              <h2 className="display-md mt-3">See what these tools can look like.</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">Stay Radiant is a real project. The other cards are illustrative concepts: fictional projects created by Ragophala Digital.</p>
            </div>
            <span data-scene-slot="0" aria-hidden className="pointer-events-none block h-40 w-full lg:hidden" />
            <span data-scene-slot="0" aria-hidden className="pointer-events-none hidden h-44 min-w-72 flex-1 lg:block" />
            <Link href="/portfolio" className={secondary}>View all work <ArrowUpRight size={16} aria-hidden /></Link>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {REAL_PROJECTS.map((project) => (
              <li key={project.slug} className="min-w-0">
                <Link href={`/portfolio/${project.slug}`} className="group block h-full overflow-hidden rounded-2xl border border-cobalt/40 bg-white transition-colors hover:border-[#315BFA]">
                  <div className="overflow-hidden border-b border-line bg-ivory p-2 sm:p-3">
                    <div className="aspect-[760/470] overflow-hidden rounded-lg bg-softblue">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={project.site.shots.desktop.src} width={project.site.shots.desktop.width} height={project.site.shots.desktop.height} alt={`${project.title} website, home page`} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
                    </div>
                  </div>
                  <div className="p-5">
                    <p className={eyebrow}>Real project · {project.category}</p>
                    <h3 className="mt-2 flex items-start justify-between gap-2 font-display text-lg font-semibold tracking-tight group-hover:underline">{project.title} <ArrowUpRight size={17} className="mt-1 shrink-0 text-[#2447D6]" aria-hidden /></h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary}</p>
                  </div>
                </Link>
              </li>
            ))}
            {["karoo-stays-booking", "fleet-dashboard", "whatsapp-lead-automation"].map((slug) => {
              const project = PROJECTS.find((project) => project.slug === slug)!;
              return (
                <li key={slug} className="min-w-0">
                  <Link href={`/portfolio/${slug}`} className="group block h-full overflow-hidden rounded-2xl border border-line bg-white transition-colors hover:border-[#315BFA]">
                    <div aria-hidden className="overflow-hidden border-b border-line bg-ivory p-2 sm:p-3">
                      <div className={`${styles.screen} aspect-[760/470] overflow-hidden rounded-lg bg-softblue`}>
                        {slug === "fleet-dashboard" ? <div className="p-2 sm:p-3"><HomeFleetPreview /></div> : (
                          <ScaleToFit designWidth={MOCK_WIDTH} designHeight={MOCK_HEIGHT}>
                            <ProjectMock kind={CASES[slug].mock} />
                          </ScaleToFit>
                        )}
                      </div>
                    </div>
                    <div className="p-5">
                      <p className={eyebrow}>Illustrative concept · {project.category}</p>
                      <h3 className="mt-2 flex items-start justify-between gap-2 font-display text-lg font-semibold tracking-tight group-hover:underline">{project.title} <ArrowUpRight size={17} className="mt-1 shrink-0 text-[#2447D6]" aria-hidden /></h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary}</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section data-scene-stage className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container-x grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div>
            <p className={eyebrow}>How we work</p>
            <h2 className="display-md mt-3 max-w-[18ch]">A clear path from idea to launch.</h2>
            <Link href="/process" className={`mt-6 ${secondary}`}>Follow the full journey <ArrowRight size={16} aria-hidden /></Link>
            <span data-scene-slot="0" aria-hidden className="pointer-events-none mt-6 block h-40 lg:mt-10 lg:h-64" />
          </div>
          <ol className={`${styles.timeline} divide-y divide-line border-y border-line`}>
            {PROCESS.map((stage) => (
              <li key={stage.n} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 py-3.5">
                <span className="relative z-10 grid size-8 place-items-center rounded-full border border-cobalt/20 bg-white font-mono text-xs font-medium text-[#2447D6]">{stage.n}</span>
                <div><h3 className="font-display text-sm font-semibold">{stage.title}</h3><p className="mt-1 text-sm leading-relaxed text-muted">{stage.summary}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section data-scene-stage className="border-y border-line py-16 sm:py-20">
        <div className="container-x relative">
          <span data-scene-slot="0" aria-hidden className="pointer-events-none absolute right-0 top-0 hidden h-60 w-72 lg:block" />
          <p className={eyebrow}>The studio</p>
          <h2 className="display-md mt-3">Built around your business.</h2>
          <p className="body-lg mt-4">Ragophala Digital brings design and engineering together for small businesses, entrepreneurs and growing organisations.</p>
          <span data-scene-slot="0" aria-hidden className="pointer-events-none mt-6 block h-40 lg:hidden" />
          <Link href="/about" className={`mt-7 ${secondary}`}>About Ragophala Digital <ArrowUpRight size={16} aria-hidden /></Link>
          <Reveal y={8} className="mt-10 flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-line bg-softblue p-5 shadow-sm sm:p-7">
            <div className="flex items-start gap-3">
              <Code2 size={23} className="mt-0.5 shrink-0 text-[#2447D6]" aria-hidden />
              <div><h3 className="font-display text-base font-semibold">Explore our software products</h3><p className="mt-1 text-sm text-muted">Browse the catalogue and see each product’s current status.</p></div>
            </div>
            <Link href="/products" className={primary}>Browse products <ArrowUpRight size={16} aria-hidden /></Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
