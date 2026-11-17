import { ServiceTemplate } from "@/components/ServiceTemplate";
import { HealthMock } from "@/components/mockups-ops";
import { MockCaption } from "@/components/mockups-web";
import { serviceByKey } from "@/lib/services";
import { pageMeta } from "@/lib/utils";

const service = serviceByKey("maintenance");
export const metadata = pageMeta(service.metaTitle, service.metaDescription, service.href);

export default function WebsiteMaintenance() {
  return <ServiceTemplate service={service} visual={<div className="mx-auto max-w-xl"><HealthMock /><MockCaption>Illustrative website health view · sample data</MockCaption></div>} />;
}
