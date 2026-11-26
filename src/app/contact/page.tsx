import { Mail, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Breadcrumb, LinkButton } from "@/components/ui";
import { PACKAGES_PUBLIC } from "@/lib/catalogue-public";
import { SERVICE_OPTIONS, SITE } from "@/lib/site";
import { mailtoUrl, pageMeta, whatsappUrl } from "@/lib/utils";

export const metadata = pageMeta("Start a Project", "Request a quotation or tell Ragophala Digital about your website, web application, AI agent or automation project.", "/contact");

const NEXT_STEPS = ["We review your enquiry.", "We may ask a few clarifying questions.", "You receive a personalised written quotation with scope, deliverables and price."];
type ContactParams = Record<string, string | string[] | undefined>;

export default async function Contact({ searchParams }: { searchParams: Promise<ContactParams> }) {
  const params = await searchParams;
  const get = (key: string) => Array.isArray(params[key]) ? params[key][0] : params[key];
  const pkg = PACKAGES_PUBLIC.find((p) => p.id === get("package"));
  const service = SERVICE_OPTIONS.find((s) => s.value === get("service"))?.value ?? (pkg ? "web" : "");
  const item = get("item")?.slice(0, 80).replace(/\s+/g, " ");
  let message = "";
  if (pkg) message = `I am interested in the ${pkg.name} package.\n`;
  else if (item) message = `I would like a quotation for: ${item}.\n`;
  else if (get("intent") === "consultation") message = "I would like to book a consultation.\n";

  const wa = whatsappUrl("Hi Ragophala Digital, I would like to request a quotation.");
  const mail = mailtoUrl("Project enquiry");
  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36">
      <div className="container-x relative">
        <Breadcrumb items={[{ label: "Start a project" }]} />
        <h1 className="display-lg">Tell us what you want to build.</h1>
        <p className="body-lg mt-4">Share a few details and we will reply with next steps and a written quotation, usually within one to two working days.</p>
        <div className="mt-7 grid items-start gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-9">
          <ContactForm service={service} message={message} />
          <aside className="theme-dark rounded-2xl bg-navy p-5 text-fg sm:p-7">
            <h2 className="font-display text-xl font-semibold">What happens next</h2>
            <ol className="mt-4 divide-y divide-line border-y border-line">
              {NEXT_STEPS.map((step, index) => <li key={step} className="flex gap-3 py-3 text-sm leading-relaxed"><span className="font-mono text-xs text-accent">0{index + 1}</span>{step}</li>)}
            </ol>
            <div className="mt-6">
              <h2 className="font-display text-lg font-semibold">Want help describing your project?</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">Smart Intake can guide you through a few questions and help you put together a brief.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <LinkButton href="/smart-intake" variant="line">Try Smart Intake</LinkButton>
                <LinkButton href="/quote" variant="line">How quotations work</LinkButton>
              </div>
            </div>
            {(wa || mail) && <ul className="mt-6 space-y-2.5 border-t border-line pt-5 text-sm">
              {wa && <li><a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 transition hover:text-cobalt-300"><MessageCircle size={16} aria-hidden /> Message us on WhatsApp</a></li>}
              {mail && <li><a href={mail} className="inline-flex items-center gap-2.5 break-all transition hover:text-cobalt-300"><Mail size={16} className="shrink-0" aria-hidden /> {SITE.email}</a></li>}
            </ul>}
            <p className="mt-5 text-xs text-muted">Serving businesses across {SITE.location}.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
