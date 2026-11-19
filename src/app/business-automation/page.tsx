import { ServiceTemplate } from "@/components/ServiceTemplate";
import { AutomationFlow } from "@/components/demos-ai";
import { DemoSuite } from "@/components/demos/DemoSuite";
import { Reveal, SectionHead } from "@/components/ui";
import { serviceByKey } from "@/lib/services";
import { pageMeta } from "@/lib/utils";

const service = serviceByKey("automation");
export const metadata = pageMeta(service.metaTitle, service.metaDescription, service.href);

export default function BusinessAutomation() {
  return (
    <ServiceTemplate
      service={service}
      extra={
        <>
        <section id="suite-section" className="scroll-mt-24 pb-16 pt-4 sm:pb-20">
          <div className="container-x">
            <SectionHead label="Interactive demonstrations" title="See automation at work." text="Drag a workflow, step through a lead, a support queue or an order. All examples use fictional businesses and sample data." />
            <DemoSuite show={["workflows", "social", "leads", "support", "whatsapp"]} />
          </div>
        </section>
        <section id="automation" className="theme-soft section scroll-mt-16 bg-softblue">
          <div className="container-x">
            <SectionHead label="See it in action" title="Connect the tools you already use" text="Automation moves information between your forms, messages, documents and systems, so fewer tasks depend on someone remembering to do them. Watch an example workflow run." />
            <Reveal><AutomationFlow /></Reveal>
          </div>
        </section>
        </>
      }
    />
  );
}
