import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LinkButton, PageHero, Reveal, SectionHead } from "@/components/ui";
import { AutomationFlow } from "@/components/demos-ai";
import { DemoCentre } from "@/components/ai/DemoCentre";
import { AI_MONTHLY, AI_SOLUTIONS } from "@/lib/pricing";
import { pageMeta } from "@/lib/utils";

export const metadata = pageMeta("AI Agents and Business Automation", "Website AI assistants, FAQ chatbots, WhatsApp assistants, lead qualification, appointment assistants and workflow automation.", "/ai-automation");

const USE_CASES = [
  ["Website AI assistants", "Answer visitor questions from your approved content and collect enquiry details."],
  ["FAQ chatbots", "Handle the questions your team answers every day."],
  ["WhatsApp AI assistants", "Respond to customer enquiries on the channel they already use."],
  ["Lead qualification agents", "Ask the right questions and pass qualified leads to your team."],
  ["Appointment assistants", "Help customers find a time and reduce back-and-forth messages."],
  ["Business workflow automation", "Connect forms, messages, documents and reminders across your tools."],
  ["Custom AI assistants", "Purpose-built assistants for your own processes and data."],
];

export default function AIAutomation() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Services", href: "/services" }, { label: "AI agents and automation" }]}
        label="Services 03 and 04 · AI agents and automation"
        title={<>Practical AI that answers, qualifies and follows up.</>}
        text="We build AI assistants and automated workflows that save time, respond faster and keep repetitive work moving, with a person always in the loop where it matters."
        actions={<><LinkButton href="/contact?service=ai">Discuss an AI agent</LinkButton><LinkButton href="#automation" variant="line" arrow={false}>Business automation</LinkButton></>}
      />

      <section id="demo" className="scroll-mt-24 pb-20 sm:pb-28">
        <div className="container-x">
          <SectionHead index="01" label="Demonstration centre" title="Experience intelligent business solutions." text="Try a working AI assistant, watch an enquiry being qualified, and see the automation behind it. Demonstrations use clearly labelled sample data." />
          <Reveal><DemoCentre /></Reveal>
          <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-card p-6">
            <p className="max-w-xl text-[15px] text-muted">Want to see it work on your own idea? <span className="text-heading">Smart Intake</span> turns a plain-language description into a project brief with recommended services and indicative pricing.</p>
            <LinkButton href="/smart-intake" variant="dark" className="ml-auto">Try Smart Intake</LinkButton>
          </div>
        </div>
      </section>

      <section className="theme-dark bg-navy">
        <div className="container-x section">
          <SectionHead index="02" label="Solutions" title="AI agents we build" />
          <ul className="grid border-t border-line md:grid-cols-2">
            {USE_CASES.map(([t, d], i) => (
              <li key={t} className="border-b border-line py-6 md:odd:border-r md:odd:pr-8 md:even:pl-8">
                <p className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-display text-lg font-semibold tracking-tight">{t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="automation" className="theme-soft section scroll-mt-16 bg-softblue">
        <div className="container-x">
          <SectionHead index="03" label="Business automation" title="Connect the tools you already use" text="Automation moves information between your forms, messages, documents and systems, so fewer tasks depend on someone remembering to do them. Watch an example workflow run." />
          <Reveal><AutomationFlow /></Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <SectionHead index="04" label="Honest about limits" title="Useful, controlled and clear about what AI can and cannot do" className="mb-0 lg:mb-0" />
          <ul className="border-t border-line">
            {["Assistants work from approved information and say when they do not know.", "Sensitive conversations are handed over to a person.", "AI is a support for your team, not a replacement for judgement.", "API usage, AI model consumption and WhatsApp charges are billed separately unless included in your quotation."].map((t) => (
              <li key={t} className="border-b border-line py-5 text-[15px] leading-relaxed text-muted">{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="theme-soft bg-softblue">
        <div className="container-x section">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <SectionHead index="05" label="Pricing" title="AI and automation, from" text="Once-off implementation fees, plus optional monthly support." className="mb-0 lg:mb-0" />
            <LinkButton href="/pricing#ai" variant="dark">Full pricing</LinkButton>
          </div>
          <div className="grid gap-10 lg:grid-cols-2">
            {[["Once-off implementation", AI_SOLUTIONS], ["Monthly support", AI_MONTHLY]].map(([title, items]) => (
              <div key={title as string}>
                <h3 className="label mb-4">{title as string}</h3>
                <ul className="border-t border-line">
                  {(items as typeof AI_SOLUTIONS).map((a) => (
                    <li key={a.name} className="border-b border-line">
                      <Link href={`/contact?service=ai&item=${encodeURIComponent(a.name)}`} className="group flex items-center justify-between gap-3 py-4 text-[15px]">
                        <span>{a.name}</span>
                        <span className="flex items-center gap-2 font-display font-semibold">{a.price}<ArrowUpRight size={15} className="text-muted transition group-hover:text-cobalt" aria-hidden /></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
