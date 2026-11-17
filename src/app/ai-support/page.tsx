import { ServiceTemplate } from "@/components/ServiceTemplate";
import { MonitorMock } from "@/components/mockups-ops";
import { MockCaption } from "@/components/mockups-web";
import { serviceByKey } from "@/lib/services";
import { pageMeta } from "@/lib/utils";

const service = serviceByKey("support");
export const metadata = pageMeta(service.metaTitle, service.metaDescription, service.href);

export default function AiSupport() {
  return <ServiceTemplate service={service} visual={<div className="mx-auto max-w-xl"><MonitorMock /><MockCaption>Illustrative monitoring view · sample data</MockCaption></div>} />;
}
