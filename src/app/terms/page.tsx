import Link from "next/link";
import { PageHero } from "@/components/ui";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/utils";

export const metadata = pageMeta("Website Terms", "Terms for using the Ragophala Digital website, its AI assistant and how quotations work.", "/terms");

export default function Terms() {
  const sections: [string, React.ReactNode][] = [
    ["Using this website", <p key="a">This website is provided by {SITE.name} to describe our services and let you contact us. Please use it lawfully and do not attempt to disrupt it, scrape it at scale, or misuse the forms and the AI assistant.</p>],
    ["Pricing and quotations", <p key="b">Pricing is tailored to each project. A project is confirmed only by a written quotation and agreement that sets out scope, price, timeline and payment terms. Our standard project terms are summarised on the <Link href="/quote" className="font-medium text-cobalt underline">quotation page</Link>.</p>],
    ["The RAGOPHALA AI assistant", <p key="c">The assistant uses AI and can make mistakes. It cannot make binding offers, confirm bookings or promise delivery dates. Treat its answers as general guidance and confirm important details with us.</p>],
    ["Concept projects", <p key="d">Projects shown in the portfolio section are concept case studies that illustrate the kind of work we do. They are not claims about specific client results.</p>],
    ["Intellectual property", <p key="e">The design, text and code of this website belong to {SITE.name} or its licensors. You may not copy them without permission.</p>],
    ["Liability", <p key="f">We take care to keep this website accurate and available, but it is provided as is. To the extent the law allows, we are not liable for loss arising from reliance on the website content alone. Nothing here limits any rights you have under South African consumer law.</p>],
    ["Privacy and changes", <p key="g">How we handle personal information is explained in our <Link href="/privacy" className="font-medium text-cobalt underline">privacy information</Link>. We may update these terms from time to time; the date below shows the latest version.</p>],
  ];
  return (
    <>
      <PageHero crumbs={[{ label: "Terms" }]} label="Website terms" title={<>The basics of using this site.</>} text="Plain-language terms for the website, the AI assistant and how quotations work." />
      <section className="pb-24 pt-4">
        <div className="container-x max-w-3xl">
          {sections.map(([title, body], i) => (
            <div key={title} className="grid gap-3 border-t border-line py-8 sm:grid-cols-[40px_1fr]">
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <div><h2 className="display-md !text-2xl">{title}</h2><div className="mt-3 space-y-3 leading-relaxed text-muted">{body}</div></div>
            </div>
          ))}
          <p className="border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[.14em] text-muted">Last updated November 2026. This page is general information, not legal advice.</p>
        </div>
      </section>
    </>
  );
}
