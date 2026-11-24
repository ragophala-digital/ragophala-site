import Link from "next/link";
import { Reveal } from "@/components/ui";
import { PRODUCTS } from "@/lib/products/data";
import { productCta, productHref } from "@/lib/products/helpers";
import { ProductStatus } from "./ProductStatus";
import { ProductWaitlistForm } from "./ProductWaitlistForm";

/** Products we are exploring or building. Statuses come from the catalogue; no dates are shown because none are known. */
const SPOTLIGHT = ["whatsappflow", "propertyflow", "fleetflow", "buildflow", "solarflow", "schoolflow", "restaurantflow"] as const;

export function UpcomingProducts() {
  const items = SPOTLIGHT.flatMap((s) => PRODUCTS.find((p) => p.slug === s) ?? []);
  return (
    <section id="upcoming" className="theme-soft section scroll-mt-24 bg-softblue">
      <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal>
            <p className="label mb-5 flex items-center gap-3"><span aria-hidden className="h-px w-8 bg-current opacity-40" />Upcoming</p>
            <h2 className="display-md">What&apos;s coming next.</h2>
            <p className="body-lg mt-5">We are continuously exploring new opportunities to build software that solves practical business challenges. These are opportunities, not promises: each shows its real status and no release dates.</p>
          </Reveal>
          <ul className="mt-9 divide-y divide-navy/15 border-y border-navy/15">
            {items.map((p) => (
              <li key={p.id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-4">
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg font-semibold tracking-tight"><Link href={productHref(p.slug)} className="hover:text-cobalt">{p.name}</Link></p>
                  <p className="text-sm text-[#3d475c]">{p.description}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[.12em] text-[#566075]">{p.division}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <ProductStatus status={p.status} />
                  <Link href={productCta(p).href} className="link-underline text-sm font-medium text-heading">{productCta(p).label}</Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:pt-24">
          <h3 className="mb-4 font-display text-xl font-semibold tracking-tight">Register your interest</h3>
          <ProductWaitlistForm compact />
        </div>
      </div>
    </section>
  );
}
