import { LinkButton, Reveal, SectionHead } from "@/components/ui";
import { Breadcrumb } from "@/components/ui";
import { pageMeta } from "@/lib/utils";

export const metadata = pageMeta("About", "Ragophala Digital is a South African digital studio building websites, web applications, AI agents and business automation.", "/about");

const BELIEFS = [
  ["Start with the business problem.", "Technology is only useful when it solves something real. We begin with your customers, your goals and your constraints."],
  ["Simple beats clever.", "The best solution is usually the simplest one that does the job well and can be maintained."],
  ["Design and engineering belong together.", "How something looks and how it works are the same decision. We treat them that way."],
  ["Clear communication builds trust.", "Plain language, written quotations and honest timelines make projects easier for everyone."],
  ["Launch is the beginning.", "A website or system keeps working for you after launch, so we plan for support and growth."],
];

const COMMITMENTS = ["Clear, written quotations before work begins", "Honest advice, including when a simpler option is better", "Plain language instead of technical jargon", "Revisions and scope agreed up front", "Ownership of the agreed deliverables after full payment"];

function BrandGraphic() {
  return (
    <svg viewBox="0 0 400 400" className="w-full max-w-md" role="img" aria-label="Abstract geometric brand graphic">
      <defs>
        <linearGradient id="ag" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8FA5FF" /><stop offset="1" stopColor="#315BFA" /></linearGradient>
      </defs>
      {[170, 130, 90].map((r, i) => (<circle key={r} cx="200" cy="200" r={r} fill="none" stroke="#101827" strokeOpacity={0.18 - i * 0.03} />))}
      <g stroke="#101827" strokeOpacity=".14">
        {Array.from({ length: 9 }).map((_, i) => (<line key={i} x1={40 + i * 40} y1="30" x2={40 + i * 40} y2="370" />))}
        {Array.from({ length: 9 }).map((_, i) => (<line key={`h${i}`} x1="30" y1={40 + i * 40} x2="370" y2={40 + i * 40} />))}
      </g>
      <rect x="120" y="120" width="160" height="160" rx="14" fill="#101827" transform="rotate(12 200 200)" />
      <rect x="150" y="150" width="100" height="100" rx="10" fill="#DCE5FF" transform="rotate(12 200 200)" />
      <circle cx="200" cy="200" r="34" fill="url(#ag)" />
      <circle cx="318" cy="96" r="12" fill="#315BFA" />
      <circle cx="76" cy="312" r="7" fill="#101827" />
    </svg>
  );
}

export default function About() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40 lg:pb-24">
        <div aria-hidden className="grid-lines absolute inset-0 opacity-60" />
        <div className="container-x relative">
          <Breadcrumb items={[{ label: "About" }]} />
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="animate-rise">
              <p className="label mb-6 flex items-center gap-3"><span aria-hidden className="h-px w-8 bg-current opacity-40" />About Ragophala Digital</p>
              <h1 className="display-lg">Technology with purpose. Design with intention.</h1>
              <p className="body-lg mt-6">We help South African businesses get online properly, work more efficiently and grow with technology that is built to last.</p>
            </div>
            <Reveal delay={0.15} className="justify-self-center"><BrandGraphic /></Reveal>
          </div>
        </div>
      </section>

      <section className="section pt-4">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4"><p className="label flex items-center gap-3"><span className="text-accent">01</span><span aria-hidden className="h-px w-8 bg-current opacity-40" />Who we are</p></Reveal>
          <Reveal delay={0.08} className="lg:col-span-8">
            <p className="display-md max-w-[26ch]">Ragophala Digital designs and builds websites, web applications and AI-powered solutions for businesses.</p>
            <div className="mt-8 grid gap-6 text-[15px] leading-relaxed text-muted sm:grid-cols-2">
              <p>We work with small businesses, entrepreneurs, startups and growing organisations who need digital tools that look credible and work reliably.</p>
              <p>Our focus is practical: understand the business, recommend the simplest approach that works, build it carefully and support it after launch.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="theme-dark bg-navy">
        <div className="container-x section">
          <SectionHead index="02" label="What we believe" title="Five principles behind our work" />
          <ol className="border-t border-line">
            {BELIEFS.map(([t, d], i) => (
              <Reveal as="li" key={t} className="grid gap-3 border-b border-line py-8 lg:grid-cols-[70px_1.2fr_1fr] lg:gap-8">
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <h3 className="display-md">{t}</h3>
                <p className="text-[15px] leading-relaxed text-muted">{d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="label mb-5 flex items-center gap-3"><span className="text-accent">03</span><span aria-hidden className="h-px w-8 bg-current opacity-40" />Our approach to technology</p>
            <h2 className="display-md">Modern tools, chosen for speed, security and longevity.</h2>
            <p className="body-lg mt-5">We build with proven, widely supported technology so your solution is fast today and maintainable tomorrow. Where it genuinely helps, we add rich interaction, 3D visuals, AI assistants and automation.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="label mb-5 flex items-center gap-3"><span className="text-accent">04</span><span aria-hidden className="h-px w-8 bg-current opacity-40" />Our approach to business problems</p>
            <h2 className="display-md">Questions before solutions.</h2>
            <p className="body-lg mt-5">Who are your customers? Where do you lose time or leads? What would success look like in six months? The answers shape the solution, the scope and the price.</p>
          </Reveal>
        </div>
      </section>

      <section className="theme-soft bg-softblue">
        <div className="container-x section grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHead index="05" label="Our commitment to clients" title="What you can expect from us" className="mb-0 lg:mb-0" />
          <ul className="border-t border-line">
            {COMMITMENTS.map((c, i) => (
              <li key={c} className="flex gap-4 border-b border-line py-5 text-[15px]"><span className="font-mono text-xs text-accent">0{i + 1}</span>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <Reveal>
            <p className="label mb-5">What makes our work different</p>
            <p className="display-md max-w-[30ch]">We build real products and business solutions, not just attractive pages.</p>
            <div className="mt-9 flex flex-wrap gap-3"><LinkButton href="/process">See how we work</LinkButton><LinkButton href="/services" variant="line" arrow={false}>Our services</LinkButton></div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
