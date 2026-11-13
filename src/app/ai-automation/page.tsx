import { ArrowRight, Bot, Headphones, MessageCircle, Plug, UserPlus, Workflow, Sparkles, type LucideIcon } from "lucide-react";
import { AIScene } from "@/components/three/lazy";
import { CTASection, LinkButton, PageHero, Reveal, SectionHead, TiltCard } from "@/components/ui";
import { pageMeta } from "@/lib/utils";

export const metadata = pageMeta("AI Agents & Automation", "AI chatbots, custom assistants, WhatsApp automation, lead capture and workflow automation for South African businesses.", "/ai-automation");

const ITEMS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Bot, title: "AI chatbots", text: "Answer common questions around the clock using your own business information." },
  { icon: Sparkles, title: "Custom AI assistants", text: "Assistants for staff or customers, trained on your documents and processes." },
  { icon: Headphones, title: "Website support agents", text: "Help visitors find answers and hand over to your team when needed." },
  { icon: MessageCircle, title: "WhatsApp automation", text: "Automated replies, enquiry capture and notifications through WhatsApp Business." },
  { icon: UserPlus, title: "Lead capture automation", text: "Collect, tag and route new leads so none are missed or forgotten." },
  { icon: Workflow, title: "Business workflow automation", text: "Automate quotes, reminders, approvals and data entry between your tools." },
  { icon: Plug, title: "AI integrations", text: "Add AI features to your existing website, app or internal systems." },
];

export default function AIAutomation() {
  return (
    <>
      <PageHero
        eyebrow="AI agents and automation"
        title={<>Put repetitive work on <span className="text-volt-400">autopilot</span></>}
        text="AI assistants and automated workflows that answer questions, capture leads and connect your tools, so your team can focus on work that needs a person."
        scene={<AIScene />}
        actions={<LinkButton href="/contact?service=ai">Discuss automation</LinkButton>}
      />

      <section className="section">
        <div className="container-x">
          <SectionHead eyebrow="What we build" title="AI and automation solutions" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ITEMS.map((a, i) => (
              <Reveal key={a.title} delay={(i % 3) * 0.08}>
                <TiltCard className="glass h-full p-6">
                  <a.icon className="text-volt-400" aria-hidden />
                  <h3 className="mt-4 font-display text-lg">{a.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{a.text}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section light-section">
        <div className="container-x">
          <SectionHead eyebrow="Why automate" title="Save time, respond faster, stay consistent" text="Automation handles the repetitive steps and leaves the decisions and relationships to you." />
          <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr]">
            <Reveal>
              <div className="h-full rounded-2xl border border-navy-900/10 bg-white p-6">
                <h3 className="font-display text-lg">Before</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>Enquiries arrive by email, WhatsApp and phone and are tracked by hand.</li>
                  <li>The same questions are answered repeatedly.</li>
                  <li>Leads wait for a reply until someone is free.</li>
                </ul>
              </div>
            </Reveal>
            <div className="hidden items-center lg:flex"><ArrowRight className="text-volt-600" aria-hidden /></div>
            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl bg-navy-900 p-6 text-white">
                <h3 className="font-display text-lg text-white">After</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  <li>Enquiries are captured and sorted into one place automatically.</li>
                  <li>Common questions are answered instantly by an assistant.</li>
                  <li>Your team is notified of qualified leads straight away.</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Responsible AI</p>
            <h2 className="h-section">Useful, controlled and honest about limits</h2>
            <p className="lead mt-4">AI assistants can make mistakes, so we set clear boundaries: they answer from approved information, they say when they do not know and they hand over to a person for anything sensitive.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="space-y-3">
              {["Scoped to your approved content and business rules", "Human hand-over and escalation paths", "API keys and customer data kept server-side", "Ongoing usage costs from AI providers are quoted and explained up front"].map((t) => (<li key={t} className="glass px-5 py-4 text-sm text-slate-300">{t}</li>))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CTASection service="ai" title="Find out what could be automated in your business" text="Describe your current process and we will suggest where AI and automation can help." />
    </>
  );
}
