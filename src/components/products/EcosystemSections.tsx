import Link from "next/link";
import { ArrowUpRight, Compass, Link2, Network, Sprout, Target, Layers, Wrench, Clock } from "lucide-react";
import { Reveal, SectionHead, LinkButton } from "@/components/ui";
import { DIVISIONS } from "@/lib/products/categories";
import { countByDivision } from "@/lib/products/helpers";
import { ICONS } from "./icons";

export function EcosystemIntro() {
  const cols = [
    { icon: Layers, title: "Independent by design", text: "Each product has its own identity, website, account experience and subscription model." },
    { icon: Link2, title: "Connected when needed", text: "Customers can connect compatible products to reduce duplicated work and improve operational visibility." },
    { icon: Sprout, title: "Built to grow", text: "The ecosystem is designed to expand into more industries, workflows and business requirements." },
  ];
  return (
    <section id="vision" className="theme-soft section scroll-mt-24 bg-softblue">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="label mb-5 flex items-center gap-3"><span aria-hidden className="h-px w-8 bg-current opacity-40" />Purpose-built software</p>
          <h2 className="display-md">One ecosystem. Multiple possibilities.</h2>
          <p className="body-lg mt-5">Every business operates differently. That&apos;s why Ragophala Digital develops specialised software products that can work independently while offering opportunities to connect through shared integrations.</p>
        </Reveal>
        <ul className="mt-14 grid gap-10 border-t border-line pt-10 md:grid-cols-3 md:gap-12">
          {cols.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 0.08}>
              <c.icon size={22} aria-hidden className="text-cobalt" />
              <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">{c.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#566075]">{c.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ProductDivisions() {
  const counts = countByDivision();
  const [lead, ...rest] = DIVISIONS;
  const LeadIcon = ICONS[lead.icon];
  return (
    <section className="section">
      <div className="container-x">
        <SectionHead label="Software divisions" title="Solutions across the business landscape." text="Choose a division to filter the catalogue below." />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-12">
          <Reveal className="sm:col-span-2 xl:col-span-5 xl:row-span-2">
            <Link href={`/products?category=${lead.id}#directory`} className="theme-dark group flex h-full min-h-[240px] flex-col justify-between gap-8 rounded-2xl bg-navy p-5 sm:p-7 text-fg transition motion-safe:hover:-translate-y-0.5">
              <div className="flex items-start justify-between"><span className="grid h-12 w-12 place-items-center rounded-xl bg-cobalt/20 text-cobalt-300"><LeadIcon size={22} aria-hidden /></span><span className="font-mono text-xs text-cobalt-300">{counts[lead.id]} products</span></div>
              <div>
                <h3 className="display-md !text-3xl">{lead.label}</h3>
                <p className="mt-3 max-w-[40ch] text-[15px] leading-relaxed text-slate">{lead.intro}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium">Explore division <ArrowUpRight size={15} aria-hidden className="transition group-motion-safe:hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
              </div>
            </Link>
          </Reveal>
          {rest.map((d, i) => {
            const Icon = ICONS[d.icon];
            return (
              <Reveal key={d.id} delay={i * 0.05} className={i < 2 ? "xl:col-span-7" : "xl:col-span-3"}>
                <Link href={`/products?category=${d.id}#directory`} className="group flex h-full flex-col gap-3 rounded-2xl border border-line bg-white p-5 xl:flex-row xl:gap-4 transition motion-safe:hover:-translate-y-0.5 hover:border-cobalt/40">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-softblue text-cobalt"><Icon size={20} aria-hidden /></span>
                  <div className="flex w-full min-w-0 flex-1 flex-col">
                    <div className="flex items-baseline justify-between gap-3"><h3 className="font-display text-lg font-semibold tracking-tight">{d.label}</h3><span className="shrink-0 font-mono text-[11px] text-[#566075]" aria-label={`${counts[d.id]} products`}>{counts[d.id]}</span></div>
                    <span className="mt-1 flex-1 text-sm leading-relaxed text-[#566075]">{d.intro}</span>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-heading">Explore division <ArrowUpRight size={14} aria-hidden /></span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function WhyRagophala() {
  const items = [
    { icon: Target, title: "Practical problem-solving", text: "We focus on real operational challenges rather than building software for the sake of technology." },
    { icon: Wrench, title: "Purpose-built products", text: "Each application is designed around specific business workflows and requirements." },
    { icon: Network, title: "Flexible adoption", text: "Businesses can start with one product and expand as their needs grow." },
    { icon: Clock, title: "Long-term development", text: "We aim to continuously improve our software through feedback, research and real-world usage." },
  ];
  return (
    <section className="section">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start"><SectionHead label="Why Ragophala Digital" title="Technology built around real business needs." className="mb-0 lg:mb-0" /></div>
        <ul className="grid gap-x-10 gap-y-9 border-t border-line pt-8 sm:grid-cols-2">
          {items.map((it, i) => (
            <Reveal as="li" key={it.title} delay={i * 0.06}>
              <it.icon size={20} aria-hidden className="text-cobalt" />
              <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">{it.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#566075]">{it.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ProductsCTA() {
  return (
    <section className="theme-dark relative overflow-hidden bg-navy text-fg">
      <div aria-hidden className="grid-lines absolute inset-0 opacity-40" />
      <div className="container-x section relative text-center">
        <Compass size={26} aria-hidden className="mx-auto text-cobalt-300" />
        <h2 className="display-md mx-auto mt-5 max-w-[20ch]">Find the right software for your business.</h2>
        <p className="mx-auto mt-5 max-w-xl text-slate">Explore our growing collection of digital solutions or speak with our team about your requirements.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <LinkButton href="/products#directory">Explore all products</LinkButton>
          <LinkButton href="/contact" variant="line" arrow={false}>Contact Ragophala Digital</LinkButton>
        </div>
      </div>
    </section>
  );
}
