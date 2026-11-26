import Link from "next/link";
import { PROCESS } from "@/lib/site";
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
        text="Every project follows the same dependable path, so you always know what is happening, what we need from you and what comes next. Choose a stage to see what happens and what we need from you."
        actions={<LinkButton href="/contact">Start a project</LinkButton>}
      />
      <section className="pb-8 pt-6">
        <div className="container-x">
          <nav aria-label="Project stages" className="mb-8 rounded-2xl border border-line bg-white px-4 py-3 sm:px-6">
            <ol className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((stage) => (
                <li key={stage.n}><Link href={`#stage-${stage.n}`} className="flex min-h-11 items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-heading hover:bg-softblue">
                  <span className="font-mono text-xs text-[#2447D6]">{stage.n}</span>{stage.title}
                </Link></li>
              ))}
            </ol>
          </nav>
          <ProcessJourney />
          <p className="mb-16 mt-8 max-w-2xl rounded-2xl border border-line bg-card p-6 text-[15px] leading-relaxed text-muted">
            <span className="font-medium text-heading">Payment milestones.</span> We ask for a 50% deposit before development begins and the remaining 50% before final handover and deployment. Work outside the agreed scope is quoted separately.
          </p>
        </div>
      </section>
    </>
  );
}
