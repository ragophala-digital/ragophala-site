import { SmartIntake } from "@/components/ai/SmartIntake";
import { PageHero } from "@/components/ui";
import { pageMeta } from "@/lib/utils";

export const metadata = pageMeta("Smart Intake", "Describe your business idea and receive a structured project brief with recommended services and indicative pricing from Ragophala Digital.", "/smart-intake");

export default function SmartIntakePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Smart Intake" }]}
        label="Ragophala Smart Intake"
        title={<>Describe your idea. Get a project brief.</>}
        text="Tell us about your business in your own words. We analyse it, recommend suitable services with indicative pricing from our catalogue, and prepare a brief you can edit before sending it to our team."
      />
      <section className="pb-24 pt-2">
        <div className="container-x max-w-4xl"><SmartIntake /></div>
      </section>
    </>
  );
}
