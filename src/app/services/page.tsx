import Link from "next/link";
import { Check } from "lucide-react";
import { ServicesScene } from "@/components/three/lazy";
import { ServiceVisual } from "@/components/ServiceVisual";
import { CTASection, LinkButton, PageHero, Reveal } from "@/components/ui";
import { SERVICES } from "@/lib/site";
import { cn, pageMeta } from "@/lib/utils";

export const metadata = pageMeta("Services", "Website development, web applications, AI agents and automation, and digital support for South African businesses.", "/services");

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title={<>Four divisions. <span className="text-volt-400">One connected</span> digital partner.</>}
        text="Start with a website, add custom software, automate repetitive work and keep everything running with ongoing support."
        scene={<ServicesScene />}
      />
      <section className="section pt-4">
        <div className="container-x space-y-24">
          {SERVICES.map((s, i) => (
            <Reveal key={s.key}>
              <article className={cn("grid items-center gap-10 lg:grid-cols-2", i % 2 === 1 && "lg:[&>div:first-child]:order-2")}>
                <div className="glass p-3"><ServiceVisual kind={s.key} className="w-full rounded-xl" /></div>
                <div>
                  <p className="eyebrow">0{i + 1} · {s.tag}</p>
                  <h2 className="h-section">{s.title}</h2>
                  <p className="lead mt-4">{s.short}</p>
                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {s.benefits.map((b) => (<li key={b} className="flex items-center gap-2 text-sm text-slate-300"><Check size={16} className="text-volt-400" aria-hidden /> {b}</li>))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {s.key !== "support" && <LinkButton href={s.href} variant="ghost">Learn more</LinkButton>}
                    <LinkButton href={`/contact?service=${s.key}`}>Enquire about this service</LinkButton>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="pb-4 text-center text-sm text-slate-400">
        Looking at costs? See our <Link href="/pricing" className="text-volt-400 underline">pricing page</Link>.
      </section>
      <CTASection />
    </>
  );
}
