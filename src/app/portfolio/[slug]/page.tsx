import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb, CTASection, LinkButton } from "@/components/ui";
import { ProjectVisual } from "@/components/ProjectVisual";
import { PROJECTS } from "@/lib/site";
import { pageMeta } from "@/lib/utils";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) return {};
  return pageMeta(`${p.title} (concept)`, p.summary, `/portfolio/${p.slug}`);
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="label mb-4">{title}</h2>
      <ul className="border-t border-line">
        {items.map((t) => (<li key={t} className="border-b border-line py-3.5 text-[15px]">{t}</li>))}
      </ul>
    </div>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) notFound();
  const related = PROJECTS.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 2);
  const service = p.category === "Websites" ? "web" : p.category === "Web Applications" ? "apps" : "ai";

  return (
    <>
      <section className="pb-12 pt-32 sm:pt-40">
        <div className="container-x">
          <Breadcrumb items={[{ label: "Selected concepts", href: "/portfolio" }, { label: p.title }]} />
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="label mb-5">{p.category} · Concept project</p>
              <h1 className="display-lg">{p.title}</h1>
              <p className="body-lg mt-6">{p.description}</p>
              <p className="mt-6 rounded-xl border border-line bg-card p-4 text-sm text-muted">This is a concept created by Ragophala Digital to demonstrate capability. It is not a real client project.</p>
              <div className="mt-8"><LinkButton href={`/contact?service=${service}&item=${encodeURIComponent(p.title)}`}>Request something similar</LinkButton></div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-line"><ProjectVisual project={p} className="aspect-[16/10] w-full" /></div>
          </div>
        </div>
      </section>

      <section className="section pt-8">
        <div className="container-x grid gap-10 md:grid-cols-3">
          <ListBlock title="Technology" items={p.tech} />
          <ListBlock title="Key features" items={p.features} />
          <ListBlock title="Design goals" items={p.goals} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="pb-20">
          <div className="container-x">
            <h2 className="label mb-5">More {p.category.toLowerCase()} concepts</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {related.map((r) => (
                <Link key={r.slug} href={`/portfolio/${r.slug}`} className="block rounded-2xl border border-line bg-card p-6 transition hover:border-cobalt">
                  <h3 className="font-display text-lg font-semibold tracking-tight">{r.title}</h3>
                  <p className="mt-1 text-sm text-muted">{r.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <CTASection service={service} />
    </>
  );
}
