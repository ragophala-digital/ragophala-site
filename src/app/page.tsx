import Link from "next/link";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Bot, Check, Code2, Globe2,
  LayoutDashboard, Workflow,
} from "lucide-react";
import { ProjectVisual } from "@/components/ProjectVisual";
import { Reveal } from "@/components/ui";
import { PROCESS, PROJECTS, SERVICES, WHY } from "@/lib/site";
import { serviceByKey } from "@/lib/services";

const capabilities = [
  { key: "web", label: "Website development", icon: Globe2, outcome: "Give customers a clear way to find you and enquire." },
  { key: "apps", label: "Web applications", icon: LayoutDashboard, outcome: "Give your team one place to manage the work." },
  { key: "ai", label: "AI agents & intelligent assistants", icon: Bot, outcome: "Answer routine questions and capture useful details." },
  { key: "automation", label: "Business automation", icon: Workflow, outcome: "Route requests and follow-ups to the right people." },
] as const;

const primary = "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#c9f56a] px-5 py-3 text-sm font-semibold text-[#162019] transition-colors hover:bg-[#b6e84e]";
const secondary = "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#c6d1ca] px-5 py-3 text-sm font-semibold text-[#18231f] transition-colors hover:border-[#007568] hover:bg-[#e6fdf8]";
const eyebrow = "font-mono text-xs font-medium uppercase tracking-[.16em] text-[#00635b]";

function WorkflowPreview() {
  return (
    <figure className="m-0 min-w-0 overflow-hidden rounded-3xl border border-[#cadad4] bg-white shadow-[0_26px_60px_-32px_rgba(20,62,52,.36)]">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#dce8e2] px-4 py-4 sm:px-6">
        <span className="font-display text-sm font-semibold tracking-tight">From enquiry to follow-up</span>
        <span className="font-mono text-[10px] uppercase tracking-[.12em] text-[#4d6059]">Illustrative workflow</span>
      </figcaption>
      <ol className="grid gap-3 bg-[#effbf8] bg-[radial-gradient(circle,#badad2_1px,transparent_1px)] bg-[length:16px_16px] p-4 sm:p-6">
        <li className="relative rounded-xl border border-[#c9dfd7] bg-white p-3.5 sm:p-4">
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#c0f8ff] text-[#005750]"><Globe2 size={16} aria-hidden /></span>
            <span className="font-display text-sm font-semibold">Website enquiry</span>
          </div>
          <p className="mt-2 rounded-lg bg-[#f2f6f4] px-3 py-2 text-sm text-[#364640]">Can you help us manage online bookings?</p>
        </li>
        <li aria-hidden className="flex items-center gap-2 pl-4 text-[#00635b]"><ArrowDown size={15} /><span className="font-mono text-[10px] uppercase tracking-wider">Qualify the request</span></li>
        <li className="rounded-xl border border-[#c9dfd7] bg-white p-3.5 sm:p-4">
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#d8f99f] text-[#273719]"><Bot size={17} aria-hidden /></span>
            <span className="font-display text-sm font-semibold">AI assistant</span>
          </div>
          <p className="mt-2 rounded-lg bg-[#e7fbf7] px-3 py-2 text-sm text-[#364640]">What are you using to take bookings today?</p>
        </li>
        <li aria-hidden className="flex items-center gap-2 pl-4 text-[#00635b]"><ArrowDown size={15} /><span className="font-mono text-[10px] uppercase tracking-wider">Route to the team</span></li>
        <li className="rounded-xl border border-[#253833] bg-[#182922] p-3.5 text-[#f0faf5] sm:p-4">
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#49e9f4] text-[#172c25]"><LayoutDashboard size={17} aria-hidden /></span>
            <span className="font-display text-sm font-semibold">Business workspace</span>
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-white/20 pt-2">
            <span className="text-sm">Booking enquiry</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d8f99f] px-2.5 py-1 text-xs font-semibold text-[#273719]"><Check size={12} aria-hidden /> Follow-up queued</span>
          </div>
        </li>
      </ol>
    </figure>
  );
}

export default function Home() {
  return (
    <div className="bg-[#f8fbf8] text-[#18231f] [--heading:#18231f] [--muted:#465b53]">
      <section className="border-b border-[#dbe6df]">
        <div className="container-x grid items-center gap-9 pb-12 pt-28 sm:pb-16 sm:pt-32 lg:grid-cols-[1.06fr_0.94fr] lg:gap-12 lg:pb-20 lg:pt-36 xl:gap-20">
          <div className="min-w-0">
            <p className={eyebrow}><span className="mr-2 inline-block size-2 rounded-full bg-[#007c70]" aria-hidden /> South African digital studio</p>
            <h1 className="mt-5 max-w-[13ch] font-display text-[clamp(2.45rem,5.5vw,5.15rem)] font-semibold leading-[1.02] tracking-[-.065em]">
              Websites, software<span className="text-[#00766a]"> &amp; smarter workflows.</span>
            </h1>
            <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-muted sm:text-lg">We build the digital tools that help businesses serve customers and get work done.</p>
            <ul className="mt-5 grid gap-1.5 min-[480px]:grid-cols-2">
              {capabilities.map(({ key, label, icon: Icon }) => {
                const service = serviceByKey(key);
                return <li key={key}><Link className="inline-flex min-h-9 items-center gap-2 text-sm font-semibold hover:underline" href={service.href}><Icon size={16} className="shrink-0 text-[#00635b]" aria-hidden />{label}</Link></li>;
              })}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className={primary}>Start a project <ArrowUpRight size={16} aria-hidden /></Link>
              <Link href="#home-services" className={secondary}>Explore services <ArrowDown size={16} aria-hidden /></Link>
            </div>
          </div>
          <WorkflowPreview />
        </div>
      </section>

      <section id="home-services" className="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-24">
        <div className="container-x">
          <p className={eyebrow}>What we do</p>
          <h2 className="display-md mt-3 max-w-[25ch]">Four ways to improve how your business works.</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:gap-5">
            {capabilities.map(({ key, icon: Icon, outcome }, index) => {
              const service = serviceByKey(key);
              return (
                <Reveal as="li" key={key} delay={(index % 2) * 0.06} y={10} className="min-w-0">
                  <Link href={service.href} className="group flex h-full flex-col rounded-2xl border border-[#d6e3dc] bg-[#f8fbf8] p-5 transition-colors hover:border-[#007c70] sm:p-7">
                    <span className={`grid size-11 place-items-center rounded-xl text-[#172c25] ${index % 2 ? "bg-[#e4f9b6]" : "bg-[#a9f6eb]"}`}><Icon size={21} aria-hidden /></span>
                    <h3 className="mt-5 font-display text-xl font-semibold tracking-tight sm:text-2xl">{service.title}</h3>
                    <p className="mt-2 text-sm font-semibold text-[#00635b]">{outcome}</p>
                    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{service.short}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold group-hover:underline">Explore {service.title.toLowerCase()} <ArrowUpRight size={15} className="shrink-0" aria-hidden /></span>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-x-5 gap-y-1 rounded-2xl border border-[#d6e3dc] px-5 py-3">
            <p className="py-2 text-sm font-semibold">Already have a website or automation in place?</p>
            <div className="flex flex-wrap gap-x-5">
              {SERVICES.filter(({ key }) => key === "maintenance" || key === "support").map(({ href, title }) => (
                <Link key={href} href={href} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-[#00635b] hover:underline">{title} <ArrowUpRight size={14} aria-hidden /></Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#dbe6df] bg-[#eef8f4] py-16 sm:py-20">
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
                  <Link href={`/portfolio/${slug}`} className="group block h-full overflow-hidden rounded-2xl border border-[#cadad4] bg-white transition-colors hover:border-[#007c70]">
                    <ProjectVisual project={project} className="aspect-[2/1] w-full object-cover [filter:hue-rotate(-32deg)]" />
                    <div className="p-5">
                      <p className={eyebrow}>{project.category}</p>
                      <h3 className="mt-2 flex items-start justify-between gap-2 font-display text-lg font-semibold tracking-tight group-hover:underline">{project.title} <ArrowUpRight size={17} className="mt-1 shrink-0 text-[#00635b]" aria-hidden /></h3>
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
          <ol className="divide-y divide-[#dbe6df] border-y border-[#dbe6df]">
            {PROCESS.map((stage) => (
              <li key={stage.n} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 py-3.5">
                <span className="font-mono text-xs font-medium leading-6 text-[#00635b]">{stage.n}</span>
                <div><h3 className="font-display text-sm font-semibold">{stage.title}</h3><p className="mt-1 text-sm leading-relaxed text-muted">{stage.summary}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-[#dbe6df] py-16 sm:py-20">
        <div className="container-x">
          <p className={eyebrow}>The studio</p>
          <h2 className="display-md mt-3">Built around your business.</h2>
          <p className="body-lg mt-4">Ragophala Digital brings design and engineering together for small businesses, entrepreneurs and growing organisations.</p>
          <ul className="mt-8 grid gap-x-7 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map(({ title, text }) => (
              <li key={title} className="border-t border-[#cadad4] pt-4">
                <h3 className="font-display text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </li>
            ))}
          </ul>
          <Link href="/about" className={`mt-7 ${secondary}`}>About Ragophala Digital <ArrowUpRight size={16} aria-hidden /></Link>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-[#bbe2d6] bg-[#e1fbf2] p-5 sm:p-7">
            <div className="flex items-start gap-3">
              <Code2 size={23} className="mt-0.5 shrink-0 text-[#00635b]" aria-hidden />
              <div><h3 className="font-display text-base font-semibold">Explore our software products</h3><p className="mt-1 text-sm text-muted">Browse the catalogue and see each product’s current status.</p></div>
            </div>
            <Link href="/products" className={primary}>Browse products <ArrowUpRight size={16} aria-hidden /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
