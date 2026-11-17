import { notFound } from "next/navigation";
import { Breadcrumb, LinkButton } from "@/components/ui";
import { ARTICLES, findArticle, formatDate } from "@/lib/insights";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/utils";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = findArticle(slug);
  return a ? pageMeta(a.title, a.summary, `/insights/${a.slug}`) : {};
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = findArticle(slug);
  if (!a) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.summary,
    datePublished: a.date,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
  };

  return (
    <article className="pb-24 pt-32 sm:pt-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-x max-w-3xl">
        <Breadcrumb items={[{ label: "Insights", href: "/insights" }, { label: a.category }]} />
        <p className="label">{a.category}</p>
        <h1 className="display-lg mt-4">{a.title}</h1>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[.14em] text-muted">{formatDate(a.date)} · {a.readMinutes} min read</p>
        <div className="mt-10 space-y-5 text-[17px] leading-relaxed text-muted">
          {a.body.map((b, i) => {
            if (b.type === "h2") return <h2 key={i} className="display-md !text-2xl pt-4 text-heading">{b.text}</h2>;
            if (b.type === "ul") return <ul key={i} className="list-disc space-y-2 pl-5">{b.items.map((t) => <li key={t}>{t}</li>)}</ul>;
            return <p key={i}>{b.text}</p>;
          })}
        </div>
        <div className="mt-14 border-t border-line pt-8">
          <p className="mb-4 text-muted">Have a project in mind?</p>
          <LinkButton href="/smart-intake">Try Smart Intake</LinkButton>
        </div>
      </div>
    </article>
  );
}
