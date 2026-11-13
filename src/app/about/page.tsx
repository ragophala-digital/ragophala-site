import { Compass, Eye, Handshake, Lightbulb, ShieldCheck, Zap } from "lucide-react";
import { AboutScene } from "@/components/three/lazy";
import { CTASection, LinkButton, PageHero, Reveal, SectionHead } from "@/components/ui";
import { TECH } from "@/lib/site";
import { pageMeta } from "@/lib/utils";

export const metadata = pageMeta("About Ragophala Digital", "Learn how Ragophala Digital approaches websites, web applications and AI automation for South African businesses.", "/about");

const VALUES = [
  { icon: Handshake, title: "Honest partnership", text: "Plain-language advice, transparent quotations and realistic timelines." },
  { icon: ShieldCheck, title: "Reliability", text: "We build carefully, test properly and communicate clearly so you know where your project stands." },
  { icon: Lightbulb, title: "Practical innovation", text: "We use modern technology where it solves a real business problem, not for its own sake." },
  { icon: Zap, title: "Performance", text: "Fast, accessible and secure by default, especially on mobile devices and local networks." },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={<>A digital agency focused on <span className="text-volt-400">practical results</span></>}
        text="Ragophala Digital helps South African businesses get online, work smarter and grow, with websites, custom web applications and AI-powered automation built to a professional standard."
        scene={<AboutScene />}
        actions={<LinkButton href="/contact">Talk to us</LinkButton>}
      />

      <section className="section">
        <div className="container-x grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="glass h-full p-8">
              <Compass className="text-volt-400" aria-hidden />
              <h2 className="mt-4 font-display text-2xl">Our mission</h2>
              <p className="mt-3 text-slate-400">To give South African businesses of every size access to high-quality digital tools, delivered with clear communication, fair pricing and measurable benefit to the business.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass h-full p-8">
              <Eye className="text-volt-400" aria-hidden />
              <h2 className="mt-4 font-display text-2xl">Our vision</h2>
              <p className="mt-3 text-slate-400">A South African business landscape where well-built websites, smart software and automation are standard tools for growth, not luxuries reserved for large companies.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section light-section">
        <div className="container-x">
          <SectionHead eyebrow="Our values" title="What guides the work we do" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-navy-900/10 bg-white p-6">
                  <v.icon className="text-volt-600" aria-hidden />
                  <h3 className="mt-4 font-display text-lg">{v.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Our approach</p>
            <h2 className="h-section">We start with the business problem, not the technology</h2>
            <p className="lead mt-4">Every project begins with questions: who are your customers, where do you lose time or leads, and what would success look like in six months? The answers shape the solution.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ol className="space-y-4">
              {["Understand your goals, customers and constraints.", "Recommend the simplest solution that meets the need.", "Build in stages and show progress early.", "Measure, refine and support after launch."].map((t, i) => (
                <li key={t} className="glass flex items-start gap-4 p-5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-volt font-display text-sm text-white">{i + 1}</span>
                  <span className="text-slate-300">{t}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          <Reveal>
            <div className="glass p-8 sm:p-12">
              <p className="eyebrow">Technology and innovation</p>
              <h2 className="h-section max-w-2xl">Modern tools, chosen for speed, security and longevity</h2>
              <p className="lead mt-4 max-w-2xl">We build with proven open technologies so your solution is fast today and maintainable tomorrow. Where it adds value, we add 3D visuals, AI assistants and automation.</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {TECH.map((t) => (<li key={t} className="rounded-full border border-volt/30 bg-volt/10 px-4 py-1.5 text-sm text-volt-300">{t}</li>))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
