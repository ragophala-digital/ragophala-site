import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, Bot, Check, ChevronDown, Code2, Globe2,
  LayoutDashboard, Workflow,
} from "lucide-react";
import { ProjectVisual } from "@/components/ProjectVisual";
import { Reveal } from "@/components/ui";
import { PROCESS, PROJECTS, SERVICES } from "@/lib/site";
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

function WorkflowPreview() {
  const steps = [
    { title: "Website enquiry", detail: "Can you help us manage online bookings?", icon: Globe2 },
    { title: "AI assistant qualifies the request", detail: "What do you use to take bookings today?", icon: Bot },
    { title: "CRM receives the details", detail: "Website enquiry · Booking workflow", icon: LayoutDashboard },
    { title: "Team notified · Human follow-up", detail: "A team member reviews the enquiry and takes over.", icon: Check },
  ];

  return (
    <figure className="min-w-0 overflow-hidden rounded-2xl border border-white/15 bg-[#172234] text-ivory shadow-2xl">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/15 px-4 py-3 sm:px-5">
        <span className="font-display text-sm font-semibold">Enquiry workspace</span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-slate">Illustrative sample data</span>
      </figcaption>
      <ol className="space-y-2.5 p-3 sm:p-5">
        {steps.map(({ title, detail, icon: Icon }, i) => (
          <li key={title}>
            <details name="enquiry-workflow" open={i === 0} className="group rounded-lg border border-white/15 bg-navy open:border-cobalt-300/70">
              <summary className="flex min-h-11 cursor-pointer list-none items-center gap-3 px-3 py-2 text-sm font-semibold [&::-webkit-details-marker]:hidden">
                <span className="grid size-8 shrink-0 place-items-center rounded-md bg-cobalt/20 text-cobalt-300"><Icon size={16} aria-hidden /></span>
                <span className="flex-1">{title}</span>
                <ChevronDown size={16} className="shrink-0 text-cobalt-300 group-open:rotate-180 motion-safe:transition-transform" aria-hidden />
              </summary>
              <div className="border-t border-white/10 px-3 py-2.5 text-xs leading-relaxed text-slate sm:pl-14">{detail}</div>
            </details>
          </li>
        ))}
      </ol>
      <div className="border-t border-white/15 px-4 py-3 sm:px-5">
        <Link href="/business-automation#automation" className="inline-flex min-h-8 items-center gap-2 text-sm font-medium text-cobalt-300 hover:underline">Try the automation demo <ArrowUpRight size={15} aria-hidden /></Link>
      </div>
    </figure>
  );
}

export default function Home() {
  return (
    <div className="bg-ivory text-heading">
      <section className="theme-dark relative border-b border-line bg-navy text-fg">
        <div className="container-x relative grid items-center gap-8 pb-12 pt-28 sm:pb-16 sm:pt-32 lg:grid-cols-[1.06fr_0.94fr] lg:gap-12 lg:pb-16 lg:pt-32 xl:gap-20">
          <div className="min-w-0">
            <p className="label">South African digital studio</p>
            <h1 className="mt-5 max-w-[16ch] font-display text-[clamp(2.35rem,5.25vw,4.85rem)] font-semibold leading-[1.02] tracking-[-.065em]">
              Digital solutions. <span className="block text-cobalt-300">Built for business.</span>
            </h1>
            <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-muted sm:text-lg">We build websites, web applications, AI assistants and business automation for South African businesses.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className={primary}>Start a project <ArrowUpRight size={16} aria-hidden /></Link>
              <Link href="/services" className="btn btn-line">Explore services</Link>
            </div>
          </div>
          <WorkflowPreview />
        </div>
      </section>

      <div className="border-b border-line bg-softblue">
        <ul aria-label="Working with Ragophala Digital" className="container-x flex flex-wrap gap-x-8 gap-y-2 py-4 text-sm font-medium">
          {["Based in South Africa", "Clear written quotations", "Ongoing support"].map((point) => (
            <li key={point} className="inline-flex items-center gap-2"><Check size={15} className="shrink-0 text-[#2447D6]" aria-hidden />{point}</li>
          ))}
        </ul>
      </div>

      <section id="home-services" className="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-24">
        <div className="container-x">
          <p className={eyebrow}>What we do</p>
          <h2 className="display-md mt-3 max-w-[25ch]">Four ways to improve how your business works.</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:gap-5">
            {capabilities.map(({ key, icon: Icon, outcome }, index) => {
              const service = serviceByKey(key);
              return (
                <Reveal as="li" key={key} delay={(index % 2) * 0.06} y={10} className="min-w-0">
                  <Link href={service.href} className="group flex h-full flex-col rounded-2xl border border-line bg-ivory p-5 transition-colors hover:border-[#315BFA] sm:p-7">
                    <span className="grid size-11 place-items-center rounded-xl bg-softblue text-[#2447D6]"><Icon size={21} aria-hidden /></span>
                    <h3 className="mt-5 font-display text-xl font-semibold tracking-tight sm:text-2xl">{service.title}</h3>
                    <p className="mt-2 text-sm font-semibold text-[#2447D6]">{outcome}</p>
                    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{service.short}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold group-hover:underline">Explore {service.title.toLowerCase()} <ArrowUpRight size={15} className="shrink-0" aria-hidden /></span>
                  </Link>
                </Reveal>
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

      <section className="border-y border-line bg-softblue py-16 sm:py-20">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className={eyebrow}>Selected concepts</p>
              <h2 className="display-md mt-3">See what these tools can look like.</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">These illustrative concepts are fictional projects created by Ragophala Digital.</p>
            </div>
            <Link href="/portfolio" className={secondary}>View all concepts <ArrowUpRight size={16} aria-hidden /></Link>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {["karoo-stays-booking", "fleet-dashboard", "whatsapp-lead-automation"].map((slug) => {
              const project = PROJECTS.find((project) => project.slug === slug)!;
              return (
                <li key={slug} className="min-w-0">
                  <Link href={`/portfolio/${slug}`} className="group block h-full overflow-hidden rounded-2xl border border-line bg-white transition-colors hover:border-[#315BFA]">
                    <ProjectVisual project={project} className="aspect-[2/1] w-full object-cover" />
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

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container-x grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div>
            <p className={eyebrow}>How we work</p>
            <h2 className="display-md mt-3 max-w-[18ch]">A clear path from idea to launch.</h2>
            <Link href="/process" className={`mt-6 ${secondary}`}>Follow the full journey <ArrowRight size={16} aria-hidden /></Link>
          </div>
          <ol className="divide-y divide-line border-y border-line">
            {PROCESS.map((stage) => (
              <li key={stage.n} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 py-3.5">
                <span className="font-mono text-xs font-medium leading-6 text-[#2447D6]">{stage.n}</span>
                <div><h3 className="font-display text-sm font-semibold">{stage.title}</h3><p className="mt-1 text-sm leading-relaxed text-muted">{stage.summary}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-line py-16 sm:py-20">
        <div className="container-x">
          <p className={eyebrow}>The studio</p>
          <h2 className="display-md mt-3">Built around your business.</h2>
          <p className="body-lg mt-4">Ragophala Digital brings design and engineering together for small businesses, entrepreneurs and growing organisations.</p>
          <Link href="/about" className={`mt-7 ${secondary}`}>About Ragophala Digital <ArrowUpRight size={16} aria-hidden /></Link>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-line bg-softblue p-5 sm:p-7">
            <div className="flex items-start gap-3">
              <Code2 size={23} className="mt-0.5 shrink-0 text-[#2447D6]" aria-hidden />
              <div><h3 className="font-display text-base font-semibold">Explore our software products</h3><p className="mt-1 text-sm text-muted">Browse the catalogue and see each product’s current status.</p></div>
            </div>
            <Link href="/products" className={primary}>Browse products <ArrowUpRight size={16} aria-hidden /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
