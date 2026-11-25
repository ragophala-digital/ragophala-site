import { ArrowUpRight } from "lucide-react";
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
      <div className="container-x grid items-start gap-8 min-[900px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] xl:gap-16">
        <div>
          <Reveal>
            <p className="label mb-5 flex items-center gap-3"><span aria-hidden className="h-px w-8 bg-current opacity-40" />Upcoming</p>
            <h2 className="display-md">What&apos;s coming next.</h2>
            <p className="body-lg mt-5">See which products we’re exploring or building, and register for updates on the ones that fit your business.</p>
          </Reveal>
          <ul className="mt-9 divide-y divide-navy/15 border-y border-navy/15">
            {items.map((p) => (
              <li key={p.id} className="grid gap-2 py-4 min-[420px]:grid-cols-[minmax(0,1fr)_auto]">
                <div className="min-w-0">
                  <h3 className="font-display text-base font-semibold tracking-tight sm:text-lg"><Link href={productHref(p.slug)} className="inline-flex items-center gap-1.5 hover:text-[#2447D6]">{p.name}<ArrowUpRight size={14} aria-hidden /></Link></h3>
                  <p className="text-sm text-[#3d475c]">{p.description}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[.12em] text-[#566075]">{p.division}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 min-[420px]:flex-col min-[420px]:items-end">
                  <ProductStatus status={p.status} />
                  <Link href={productCta(p).href} className="link-underline text-sm font-medium text-heading">{productCta(p).label}</Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="min-[900px]:sticky min-[900px]:top-28">
          <h3 id="waitlist-heading" className="mb-4 font-display text-xl font-semibold tracking-tight">Register your interest</h3>
          <ProductWaitlistForm compact headingId="waitlist-heading" />
        </div>
      </div>
    </section>
  );
}
