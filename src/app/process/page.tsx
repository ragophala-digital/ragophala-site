import { LinkButton, PageHero } from "@/components/ui";
import { ProcessJourney } from "@/components/ProcessJourney";
import { pageMeta } from "@/lib/utils";

export const metadata = pageMeta("Our Process", "How Ragophala Digital works: discovery, planning, design, development, testing, deployment and support.", "/process");

export default function ProcessPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Our process" }]}
        label="Our process · seven stages"
        title={<>From idea to implementation.</>}
        text="Every project follows the same dependable path, so you always know what is happening, what we need from you and what comes next. Scroll to follow the journey."
        actions={<LinkButton href="/contact">Start a project</LinkButton>}
      />
      <section className="pb-8 pt-6">
        <div className="container-x">
          <ProcessJourney />
          <p className="mb-16 max-w-2xl rounded-2xl border border-line bg-card p-6 text-[15px] leading-relaxed text-muted">
            <span className="font-medium text-heading">Payment milestones.</span> We ask for a 50% deposit before development begins and the remaining 50% before final handover and deployment. Work outside the agreed scope is quoted separately.
          </p>
        </div>
      </section>
    </>
  );
}
