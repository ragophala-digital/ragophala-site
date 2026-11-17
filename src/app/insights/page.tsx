import Link from "next/link";
import { PageHero, Reveal } from "@/components/ui";
import { ARTICLES, formatDate } from "@/lib/insights";
import { pageMeta } from "@/lib/utils";

export const metadata = pageMeta("Insights", "Practical articles on websites, web applications, AI and automation for South African businesses.", "/insights");

export default function Insights() {
  const sorted = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHero crumbs={[{ label: "Insights" }]} label="Insights" title={<>Practical notes for business owners.</>} text="Short, plain-language articles on websites, AI and automation." />
      <section className="pb-24 pt-4">
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.06}>
              <Link href={`/insights/${a.slug}`} className="card group flex h-full flex-col p-6 transition hover:-translate-y-1">
                <p className="label">{a.category}</p>
                <h2 className="display-md mt-4 !text-2xl">{a.title}</h2>
                <p className="mt-3 flex-1 text-muted">{a.summary}</p>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[.14em] text-muted">{formatDate(a.date)} · {a.readMinutes} min read</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
