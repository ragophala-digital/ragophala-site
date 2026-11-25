import { Suspense } from "react";
import { ProductDirectory } from "@/components/products/ProductDirectory";
import { EcosystemDiagram } from "@/components/products/EcosystemDiagram";
import { EcosystemIntro, ProductDivisions, ProductsCTA, WhyRagophala } from "@/components/products/EcosystemSections";
import { FeaturedProducts } from "@/components/products/FeaturedProducts";
import { ProductsHero } from "@/components/products/ProductsHero";
import { UpcomingProducts } from "@/components/products/UpcomingProducts";
import { Reveal } from "@/components/ui";
import { PRODUCTS } from "@/lib/products/data";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/utils";

export const metadata = pageMeta(
  "Software Products & Digital Solutions",
  "Explore Ragophala Digital's growing software ecosystem, including business management platforms, AI automation, industry-specific applications and digital business solutions.",
  "/products",
);

export default function ProductsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Our Software Ecosystem",
    url: `${SITE.url}/products`,
    isPartOf: { "@type": "WebSite", name: SITE.name },
    mainEntity: { "@type": "ItemList", numberOfItems: PRODUCTS.length, itemListElement: PRODUCTS.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: `${SITE.url}/products/${p.slug}` })) },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductsHero />
      <EcosystemIntro />
      <section id="directory" className="section scroll-mt-20">
        <div className="container-x">
          <Reveal className="mb-10 max-w-3xl">
            <p className="label mb-5 flex items-center gap-3"><span aria-hidden className="h-px w-8 bg-current opacity-40" />Product directory</p>
            <h2 className="display-md">Explore our software.</h2>
            <p className="body-lg mt-5">Discover software solutions designed for the different ways businesses operate. Every product shows its real status, so you always know what is available today.</p>
          </Reveal>
          <Suspense fallback={<div role="status">
            <span className="sr-only">Loading product directory</span>
            <div aria-hidden className="motion-safe:animate-pulse">
              <div className="h-12 rounded-xl border border-line bg-white" />
              <div className="mt-6 flex gap-2"><div className="h-8 w-24 rounded-full bg-softblue" /><div className="h-8 w-32 rounded-full bg-softblue" /></div>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 min-[1100px]:grid-cols-3">
                {[0, 1, 2].map((i) => <div key={i} className="h-48 rounded-2xl border border-line bg-white" />)}
              </div>
            </div>
          </div>}>
            <ProductDirectory products={PRODUCTS} />
          </Suspense>
        </div>
      </section>
      <ProductDivisions />
      <FeaturedProducts />
      <EcosystemDiagram />
      <UpcomingProducts />
      <WhyRagophala />
      <ProductsCTA />
    </>
  );
}
