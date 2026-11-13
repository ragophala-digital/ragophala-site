import { CTASection, LinkButton, PageHero } from "@/components/ui";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { pageMeta } from "@/lib/utils";

export const metadata = pageMeta("Our Process", "How Ragophala Digital works: discovery, planning, design, development, testing, and launch and support.", "/process");

export default function ProcessPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Our process" }]}
        label="Our process · six stages"
        title={<>A clear journey from first conversation to launch.</>}
        text="Every project follows the same dependable path, so you always know what is happening, what we need from you and what comes next."
        actions={<LinkButton href="/contact">Start a project</LinkButton>}
      />
      <section className="pb-8 pt-6">
        <div className="container-x">
          <ProcessTimeline />
          <p className="mb-16 max-w-2xl rounded-2xl border border-line bg-card p-6 text-[15px] leading-relaxed text-muted">
            <span className="font-medium text-heading">Payment milestones.</span> We ask for a 50% deposit before development begins and the remaining 50% before final handover and deployment. Work outside the agreed scope is quoted separately.
          </p>
        </div>
      </section>
      <CTASection title="Ready to begin the journey?" text="Tell us about your project and we will take it from discovery to launch." />
    </>
  );
}
