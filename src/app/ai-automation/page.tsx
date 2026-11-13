import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CTASection, LinkButton, PageHero, Reveal, SectionHead } from "@/components/ui";
import { AUTOMATION_FLOW, ChatMock, WhatsAppMock, WorkflowDiagram } from "@/components/mockups-ai";
import { MockCaption } from "@/components/mockups-web";
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

const HOW = [
  ["Your content", "We set up the assistant using your approved information, tone and rules."],
  ["The conversation", "Customers ask questions and the assistant answers within those boundaries."],
  ["The hand-over", "When it cannot help, or the customer wants a person, the conversation passes to your team."],
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
      >
        <Reveal className="mt-16" delay={0.15}>
          <WorkflowDiagram />
          <MockCaption>How an enquiry moves through an AI-assisted workflow</MockCaption>
        </Reveal>
      </PageHero>

      <section className="section">
        <div className="container-x grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHead index="01" label="How an AI agent works" title="See what actually happens in a conversation" text="No mystery. The assistant works from content you approve, follows rules you set and hands over when a person is needed." className="mb-10 lg:mb-10" />
            <ol className="border-t border-line">
              {HOW.map(([t, d], i) => (
                <li key={t} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[40px_1fr]"><span className="font-mono text-xs text-accent">0{i + 1}</span><div><h3 className="font-display text-lg font-semibold tracking-tight">{t}</h3><p className="mt-1 text-sm leading-relaxed text-muted">{d}</p></div></li>
              ))}
            </ol>
          </div>
          <Reveal>
            <div className="relative sm:pr-24">
              <ChatMock />
              <WhatsAppMock className="mt-6 sm:absolute sm:-right-1 sm:top-12 sm:mt-0 sm:w-[170px]" />
            </div>
            <MockCaption>Illustrative conversations</MockCaption>
          </Reveal>
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

      <section id="automation" className="theme-soft section bg-softblue">
        <div className="container-x">
          <SectionHead index="03" label="Business automation" title="Connect the tools you already use" text="Automation moves information between your forms, messages, documents and systems, so fewer tasks depend on someone remembering to do them." />
          <Reveal><WorkflowDiagram steps={AUTOMATION_FLOW} /></Reveal>
          <MockCaption>Example: lead routing and follow-up workflow</MockCaption>
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

      <CTASection service="ai" title="Find out what could be automated" text="Describe a process that takes up your time. We will suggest where AI and automation can help." />
    </>
  );
}
