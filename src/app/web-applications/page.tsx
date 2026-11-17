import { ServiceTemplate } from "@/components/ServiceTemplate";
import { AppShowcase } from "@/components/demos-app";
import { serviceByKey } from "@/lib/services";
import { pageMeta } from "@/lib/utils";

const service = serviceByKey("apps");
export const metadata = pageMeta(service.metaTitle, service.metaDescription, service.href);

export default function WebApplications() {
  return (
    <ServiceTemplate
      service={service}
      visual={<div id="showcase" className="theme-dark scroll-mt-28 rounded-2xl bg-navy p-4 sm:p-8"><AppShowcase /></div>}
      extra={
        <section className="section pt-0">
          <div className="container-x">
            <p className="max-w-2xl rounded-2xl border border-line bg-card p-6 text-[15px] leading-relaxed text-muted"><span className="font-medium text-heading">Security and data protection.</span> Role-based access, validated inputs, secure connections and careful handling of personal information are part of every application. We discuss POPIA requirements for your business during scoping.</p>
          </div>
        </section>
      }
    />
  );
}
