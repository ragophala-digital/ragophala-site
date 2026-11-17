import { ServiceTemplate } from "@/components/ServiceTemplate";
import { AutomationFlow } from "@/components/demos-ai";
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
        <section id="automation" className="theme-soft section scroll-mt-16 bg-softblue">
          <div className="container-x">
            <SectionHead label="See it in action" title="Connect the tools you already use" text="Automation moves information between your forms, messages, documents and systems, so fewer tasks depend on someone remembering to do them. Watch an example workflow run." />
            <Reveal><AutomationFlow /></Reveal>
          </div>
        </section>
      }
    />
  );
}
