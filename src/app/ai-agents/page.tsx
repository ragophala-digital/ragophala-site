import { ServiceTemplate } from "@/components/ServiceTemplate";
import { DemoCentre } from "@/components/ai/DemoCentre";
import { DemoSuite } from "@/components/demos/DemoSuite";
import { LinkButton, Reveal, SectionHead } from "@/components/ui";
import { serviceByKey } from "@/lib/services";
import { pageMeta } from "@/lib/utils";

const service = serviceByKey("ai");
export const metadata = pageMeta(service.metaTitle, service.metaDescription, service.href);

export default function AiAgents() {
  return (
    <ServiceTemplate
      service={service}
      extra={
        <>
        <section id="suite-section" className="scroll-mt-24 pb-16 pt-4 sm:pb-20">
          <div className="container-x">
            <SectionHead label="Interactive demonstrations" title="See AI assistants at work." text="Step through scripted examples with fictional businesses. Each one shows what the AI does and where a person stays in control." />
            <DemoSuite show={["chatbot", "voice", "whatsapp", "leads", "support"]} />
          </div>
        </section>
        <section id="demo" className="scroll-mt-24 pb-20 sm:pb-28">
          <div className="container-x">
            <SectionHead label="Demonstration centre" title="Experience intelligent business solutions." text="Try a working AI assistant, watch an enquiry being qualified, and see the automation behind it. Demonstrations use clearly labelled sample data." />
            <Reveal><DemoCentre /></Reveal>
            <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-card p-6">
              <p className="max-w-xl text-[15px] text-muted">Want to see it work on your own idea? <span className="text-heading">Smart Intake</span> turns a plain-language description into a project brief for a personalised quotation.</p>
              <LinkButton href="/smart-intake" variant="dark" className="ml-auto">Try Smart Intake</LinkButton>
            </div>
          </div>
        </section>
        </>
      }
    />
  );
}
