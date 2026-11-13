import { BadgeCheck, Building2, CalendarCheck, FileText, Palette, Rocket, Search, ShoppingCart, Smartphone, Zap, type LucideIcon } from "lucide-react";
import { WebScene } from "@/components/three/lazy";
import { CTASection, LinkButton, PageHero, Reveal, SectionHead, TiltCard } from "@/components/ui";
import { PACKAGES, formatZAR } from "@/lib/site";
import { pageMeta } from "@/lib/utils";

export const metadata = pageMeta("Website Development", "Business websites, landing pages, e-commerce and booking websites built for speed, search visibility and conversions.", "/web-development");

const TYPES: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Building2, title: "Business websites", text: "Present your services, build trust and make it easy for customers to contact you." },
  { icon: BadgeCheck, title: "Corporate websites", text: "Structured, professional sites for established companies with multiple divisions." },
  { icon: Rocket, title: "Landing pages", text: "Single focused pages for campaigns, launches and lead generation." },
  { icon: ShoppingCart, title: "E-commerce websites", text: "Online shops with product catalogues, secure checkout and order notifications." },
  { icon: Palette, title: "Portfolio websites", text: "Showcase creative work, projects or case studies in a polished, fast gallery." },
  { icon: CalendarCheck, title: "Booking websites", text: "Let customers request or book appointments, rooms or services online." },
  { icon: FileText, title: "Website redesigns", text: "Modernise an ageing site with better design, structure, speed and SEO." },
];

export default function WebDevelopment() {
  return (
    <>
      <PageHero
        eyebrow="Website development"
        title={<>Websites that look <span className="text-volt-400">professional</span> and bring in enquiries</>}
        text="From a single landing page to a full corporate website, we design and build fast, mobile-first sites that are easy to find on Google and easy to use."
        scene={<WebScene />}
        actions={<><LinkButton href="/contact?service=web">Request a website quotation</LinkButton><LinkButton href="/pricing" variant="ghost">View packages</LinkButton></>}
      />

      <section className="section">
        <div className="container-x">
          <SectionHead eyebrow="What we build" title="A website for every type of business" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TYPES.map((t, i) => (
              <Reveal key={t.title} delay={(i % 3) * 0.08}>
                <TiltCard className="glass h-full p-6">
                  <t.icon className="text-volt-400" aria-hidden />
                  <h3 className="mt-4 font-display text-lg">{t.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{t.text}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section light-section">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Our website process</p>
            <h2 className="h-section">From brief to launch in clear stages</h2>
            <ol className="mt-8 space-y-5">
              {[["Brief and quotation", "We discuss your goals and send a written scope, timeline and price."], ["Structure and design", "We map the pages and design the look before any development starts."], ["Development and content", "We build the site, add your content and test across devices."], ["Review and launch", "You review, we refine within the agreed revision rounds, then publish."]].map(([t, d], i) => (
                <li key={t} className="flex gap-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy-900 font-display text-sm text-white">{i + 1}</span><div><h3 className="font-display text-lg">{t}</h3><p className="text-sm text-slate-600">{d}</p></div></li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-2">
              {[[Smartphone, "Mobile-first", "Designed for phones first, then scaled up."], [Search, "SEO foundations", "Clean structure, metadata and sitemaps."], [Zap, "Fast loading", "Optimised images and lightweight code."], [BadgeCheck, "Accessible", "Keyboard-friendly with readable contrast."]].map(([Icon, t, d]) => {
                const I = Icon as LucideIcon;
                return (<div key={t as string} className="rounded-2xl border border-navy-900/10 bg-white p-5"><I className="text-volt-600" aria-hidden /><h3 className="mt-3 font-display">{t as string}</h3><p className="mt-1 text-sm text-slate-600">{d as string}</p></div>);
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHead eyebrow="Packages" title={`Website packages from ${formatZAR(PACKAGES[0].price)}`} text="Starting prices in rand. Your written quotation confirms scope, timeline and anything that costs extra." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PACKAGES.map((p) => (
              <div key={p.id} className="glass flex items-center justify-between gap-3 p-5">
                <div><h3 className="font-display">{p.name}</h3><p className="text-sm text-slate-400">{p.timeline}</p></div>
                <span className="font-display text-xl text-volt-300">{formatZAR(p.price)}</span>
              </div>
            ))}
          </div>
          <div className="mt-8"><LinkButton href="/pricing">Compare all packages</LinkButton></div>
        </div>
      </section>

      <CTASection service="web" title="Request your website quotation" text="Tell us about your business and the pages you need, and we will respond with a clear, written quotation." />
    </>
  );
}
