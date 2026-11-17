import Link from "next/link";
import { PageHero } from "@/components/ui";
import { retentionDays } from "@/lib/enquiry-store";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/utils";

export const metadata = pageMeta("Privacy Information", "How Ragophala Digital handles enquiries, the RAGOPHALA AI assistant and Smart Intake, and what personal information is stored.", "/privacy");

export const dynamic = "force-dynamic";

export default function Privacy() {
  const days = retentionDays();
  const sections: [string, React.ReactNode][] = [
    ["Who we are", <p key="a">{SITE.name} is a South African digital studio. This page explains how we handle personal information when you use the enquiry forms, Smart Intake and the RAGOPHALA AI assistant on this website. We aim to handle personal information in line with South Africa&apos;s Protection of Personal Information Act (POPIA).</p>],
    ["What we collect", <ul key="b" className="list-disc space-y-2 pl-5"><li><b>Enquiry forms and Smart Intake:</b> the details you enter (name, email address, business name, phone number, service, budget, project description and any project brief). We save these only if you tick the consent box before sending.</li><li><b>Chat with RAGOPHALA AI:</b> your messages are used to generate replies. We do not save full conversations on our servers. Your chat history is kept only in your browser session and disappears when you close it or start a new conversation.</li></ul>],
    ["How AI is used", <p key="c">To answer questions and analyse enquiries, text you write is sent to an AI provider (currently Groq). Before sending, we remove obvious personal identifiers such as email addresses and phone numbers from that text. Please avoid typing sensitive personal details into the chat. AI can make mistakes, and a written quotation confirms scope and price.</p>],
    ["How enquiries are handled", <p key="d">When you submit an enquiry, our server validates it, saves it in a private store that is not publicly accessible, classifies and summarises it (using AI where available), and emails our team. Only authorised people at {SITE.name} can see saved enquiries. We use your details only to respond to your enquiry.</p>],
    ["How long we keep it", <p key="e">Saved enquiries are kept for up to {days} days and then deleted automatically, unless we need to keep them longer to carry out a project or meet a legal obligation.</p>],
    ["Your choices", <p key="f">You can ask us to tell you what we hold about you, to correct it, or to delete it. Send a request through the <Link href="/contact" className="font-medium text-cobalt underline">project enquiry form</Link> and mention that it is a privacy request.</p>],
    ["Cookies and tracking", <p key="g">This website does not use advertising or tracking cookies, so there is no cookie banner. If enabled, we use Plausible, a cookieless analytics tool that counts visits and enquiries without identifying you or storing anything on your device. Your chat history is kept temporarily in your browser&apos;s session storage so that it survives page changes during one visit.</p>],
  ];
  return (
    <>
      <PageHero crumbs={[{ label: "Privacy" }]} label="Privacy information" title={<>How we handle your information.</>} text="Plain-language information about enquiries, Smart Intake and the RAGOPHALA AI assistant." />
      <section className="pb-24 pt-4">
        <div className="container-x max-w-3xl">
          {sections.map(([title, body], i) => (
            <div key={title} className="grid gap-3 border-t border-line py-8 sm:grid-cols-[40px_1fr]">
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <div><h2 className="display-md !text-2xl">{title}</h2><div className="mt-3 space-y-3 leading-relaxed text-muted">{body}</div></div>
            </div>
          ))}
          <p className="border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[.14em] text-muted">Last updated November 2026</p>
        </div>
      </section>
    </>
  );
}
