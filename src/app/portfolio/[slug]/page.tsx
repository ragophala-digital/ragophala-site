import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { ProjectVisual } from "@/components/ProjectVisual";
import { CTASection, LinkButton } from "@/components/ui";
import { PROJECTS } from "@/lib/site";
import { pageMeta } from "@/lib/utils";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) return {};
  return pageMeta(`${p.title} (demo project)`, p.summary, `/portfolio/${p.slug}`);
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) notFound();
  const related = PROJECTS.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 2);
  const service = p.category === "Websites" ? "web" : p.category === "Web Applications" ? "apps" : "ai";

  return (
    <>
      <section className="pb-10 pt-32 sm:pt-40">
        <div className="container-x">
          <Link href="/portfolio" className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"><ArrowLeft size={16} aria-hidden /> All projects</Link>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow">{p.category} · Demonstration project</p>
              <h1 className="h-display">{p.title}</h1>
              <p className="lead mt-5">{p.description}</p>
              <p className="mt-4 rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-400">This is a concept created by Ragophala Digital to demonstrate capability. It is not a real client project.</p>
              <div className="mt-6 flex flex-wrap gap-3"><LinkButton href={`/contact?service=${service}`}>Request something similar</LinkButton></div>
            </div>
            <div className="glass overflow-hidden p-2"><ProjectVisual project={p} className="aspect-[16/10] w-full rounded-xl" /></div>
          </div>
        </div>
      </section>

      <section className="section pt-8">
        <div className="container-x grid gap-6 md:grid-cols-3">
          <div className="glass p-6"><h2 className="font-display text-lg">Technology</h2><ul className="mt-4 flex flex-wrap gap-2">{p.tech.map((t) => (<li key={t} className="rounded-full border border-volt/30 bg-volt/10 px-3 py-1 text-sm text-volt-300">{t}</li>))}</ul></div>
          <div className="glass p-6"><h2 className="font-display text-lg">Key features</h2><ul className="mt-4 space-y-2 text-sm text-slate-300">{p.features.map((t) => (<li key={t} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-volt-400" aria-hidden />{t}</li>))}</ul></div>
          <div className="glass p-6"><h2 className="font-display text-lg">Design goals</h2><ul className="mt-4 space-y-2 text-sm text-slate-300">{p.goals.map((t) => (<li key={t} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-volt-400" aria-hidden />{t}</li>))}</ul></div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="pb-6">
          <div className="container-x">
            <h2 className="mb-5 font-display text-2xl">More {p.category.toLowerCase()} demos</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {related.map((r) => (<Link key={r.slug} href={`/portfolio/${r.slug}`} className="glass block p-5 transition hover:border-volt-400"><h3 className="font-display text-lg">{r.title}</h3><p className="mt-1 text-sm text-slate-400">{r.summary}</p></Link>))}
            </div>
          </div>
        </section>
      )}
      <CTASection service={service} />
    </>
  );
}
