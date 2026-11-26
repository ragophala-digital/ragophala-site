import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, CircleCheck, Clock, Link2, ShieldCheck } from "lucide-react";
import { Monogram, ProductCard } from "@/components/products/ProductCard";
import { ProductStatus } from "@/components/products/ProductStatus";
import { ProductWaitlistForm } from "@/components/products/ProductWaitlistForm";
import { Breadcrumb, LinkButton } from "@/components/ui";
import { STATUS_META } from "@/lib/products/categories";
import { PRODUCTS } from "@/lib/products/data";
import { getProduct, isSafeUrl, productCta, relatedProducts } from "@/lib/products/helpers";
import type { Product } from "@/lib/products/types";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  return p ? pageMeta(`${p.name}: ${p.division}`, p.description, `/products/${p.slug}`) : {};
}

const INTEGRATION_LABEL = { available: "Available", planned: "Planned", conceptual: "Conceptual" } as const;

const INTEGRATION_ICON = { available: CircleCheck, planned: Clock, conceptual: Link2 } as const;

function faqs(p: Product): { q: string; a: string }[] {
  const m = STATUS_META[p.status];
  return [
    { q: `Is ${p.name} available now?`, a: p.status === "live" ? `Yes. ${p.name} is live.` : `${p.name} is currently listed as "${m.label}". ${m.meaning} No release date has been announced.` },
    { q: `Do I need other Ragophala Digital products to use ${p.name}?`, a: "No. Every product is designed to work fully on its own. Integrations with other products are optional." },
    { q: "How much does it cost?", a: isSafeUrl(p.pricingUrl) ? `${p.name} has its own pricing page. Use the View pricing link above.` : "Pricing is not yet available. Each product sets its own pricing, and we will publish it here when it is ready." },
    { q: "How can I find out when it is ready?", a: "Register your interest using the form on this page. We will contact you about this product only." },
  ];
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const cta = productCta(p);
  const related = relatedProducts(p);
  const items = faqs(p);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: p.name,
    applicationCategory: "BusinessApplication",
    description: p.description,
    url: `${SITE.url}/products/${p.slug}`,
    publisher: { "@type": "Organization", name: SITE.name },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative overflow-hidden pb-14 pt-32 sm:pt-40">
        <div className="container-x relative">
          <Breadcrumb items={[{ label: "Products", href: "/products" }, { label: p.name }]} />
          <div className="animate-rise grid items-start gap-7 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] xl:gap-14">
            <div>
              <div className="flex flex-wrap items-center gap-4"><Monogram product={p} size="lg" /><ProductStatus status={p.status} /></div>
              <p className="label mt-6">{p.division}</p>
              <h1 className="display-lg mt-3 [overflow-wrap:anywhere]">{p.name}</h1>
              <p className="body-lg mt-5">{p.description}</p>
              {p.longDescription && <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-[#566075]">{p.longDescription}</p>}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {cta.external ? <a href={cta.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary">{cta.label} <ArrowUpRight size={16} aria-hidden /></a> : <LinkButton href={cta.href}>{cta.label}</LinkButton>}
                {isSafeUrl(p.pricingUrl) ? <a href={p.pricingUrl} target="_blank" rel="noopener noreferrer" className="link-underline text-sm font-medium">View pricing</a> : <span className="text-sm text-[#566075]">Pricing not yet available</span>}
              </div>
            </div>
            <aside className="rounded-2xl border border-line bg-white p-5 md:mt-4 xl:p-7">
              <ShieldCheck size={22} aria-hidden className="text-cobalt" />
              <h2 className="mt-3 font-display text-lg font-semibold tracking-tight">An independent product</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#566075]">{p.name} is designed to work fully on its own. Nobody needs to buy another Ragophala Digital product to use it. Connecting products is always optional.</p>
              <p className="mt-4 border-t border-line pt-4 text-sm leading-relaxed text-[#566075]">Status: {STATUS_META[p.status].label}. {STATUS_META[p.status].meaning}</p>
            </aside>
          </div>
        </div>
      </section>

      {p.features.length > 0 && (
        <section className="theme-soft section bg-softblue">
          <div className="container-x grid gap-7 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] xl:gap-14">
            <div><p className="label mb-4">What it covers</p><h2 className="display-md">Built around these workflows.</h2></div>
            <ul className="divide-y divide-navy/15 border-y border-navy/15">{p.features.map((f) => (<li key={f} className="flex gap-3 px-1 py-3.5 text-[15px]"><Check size={16} aria-hidden className="mt-1 shrink-0 text-cobalt" />{f}</li>))}</ul>
          </div>
        </section>
      )}

      {p.screenshots.length > 0 && (
        <section className="section">
          <div className="container-x">
            <h2 className="display-md mb-8">Product screenshots</h2>
            <ul className="grid gap-5 sm:grid-cols-2">
              {p.screenshots.map((s) => (
                <li key={s.src}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.src} alt={s.alt} loading="lazy" className="w-full rounded-xl border border-line" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {p.integrations.length > 0 && (
        <section className="section">
          <div className="container-x">
            <h2 className="display-md">Possible connections.</h2>
            <p className="body-lg mt-4">Optional ideas for how {p.name} could connect with other products. None of these is described as working unless it says Available.</p>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {p.integrations.map((i) => {
                const other = getProduct(i.with);
                const Icon = INTEGRATION_ICON[i.state];
                return other ? (
                  <li key={i.with} className="flex flex-wrap items-center justify-between gap-3 py-4">
                    <span><Link href={`/products/${other.slug}`} className="font-display text-lg font-semibold hover:text-cobalt">{other.name}</Link>{i.note && <span className="block text-sm text-[#566075]">{i.note}</span>}</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EDEAE4] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[.1em] text-[#4d576b]"><Icon size={13} aria-hidden />{INTEGRATION_LABEL[i.state]}</span>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        </section>
      )}

      <section className="theme-soft section bg-softblue">
        <div className="container-x grid items-start gap-8 min-[900px]:grid-cols-2 xl:gap-16">
          <div>
            <p className="label mb-4">Product updates</p>
            <h2 id="waitlist-heading" className="display-md [overflow-wrap:anywhere]">Register your interest in {p.name}.</h2>
            <p className="body-lg mt-4">Tell us you are interested and we will contact you about this product. Registering does not commit you to anything and is not a promise of a release date.</p>
            <dl className="mt-8 divide-y divide-navy/15 border-y border-navy/15">
              {items.map((f) => (<div key={f.q} className="py-4"><dt className="font-display text-base font-semibold">{f.q}</dt><dd className="mt-1 text-sm leading-relaxed text-[#3d475c]">{f.a}</dd></div>))}
            </dl>
          </div>
          <ProductWaitlistForm initialProduct={p.slug} headingId="waitlist-heading" />
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="container-x">
            <h2 className="display-md mb-8">Related products.</h2>
            <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{related.map((r) => (<li key={r.id}><ProductCard product={r} /></li>))}</ul>
            <div className="mt-8"><Link href="/products#directory" className="link-underline text-sm font-medium">Back to all products</Link></div>
          </div>
        </section>
      )}
    </>
  );
}
