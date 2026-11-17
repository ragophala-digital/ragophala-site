"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { LabScene } from "@/components/three/lazy";
import { LinkButton } from "@/components/ui";
import { traitsFor } from "@/lib/lab";
import { PACKAGES_PUBLIC as PACKAGES } from "@/lib/catalogue-public";
import { cn } from "@/lib/utils";

export function LabConfigurator() {
  const [id, setId] = useState("standard-business");
  const pkg = PACKAGES.find((p) => p.id === id) ?? PACKAGES[0];
  const traits = traitsFor(pkg.id);
  const extras = [traits.cms && "CMS", traits.motion && "Motion", traits.seo && "SEO", traits.support && "Support"].filter(Boolean) as string[];

  return (
    <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr]">
      <div className="theme-dark relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-navy">
        <div aria-hidden className="grid-lines absolute inset-0 opacity-60" />
        <div aria-hidden className="absolute -right-10 top-0 h-64 w-64 rounded-full bg-cobalt/25 blur-[90px]" />
        <div className="relative h-full w-full"><LabScene traits={traits} /></div>
        <p className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[.14em] text-slate">Move your pointer to turn the model</p>
      </div>
      <div>
        <RadioGroup.Root value={id} onValueChange={setId} aria-label="Choose a website package" className="grid gap-2">
          {PACKAGES.map((p) => (
            <RadioGroup.Item key={p.id} value={p.id} className={cn("flex items-center justify-between rounded-xl border px-4 py-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2", p.id === id ? "border-cobalt bg-cobalt/10" : "border-line hover:border-cobalt/50")}>
              <span className="font-medium">{p.name}</span>
              <span className="font-mono text-xs text-muted">{traitsFor(p.id).pages} {traitsFor(p.id).pages === 1 ? "page" : "pages"}</span>
            </RadioGroup.Item>
          ))}
        </RadioGroup.Root>
        <div className="mt-6 rounded-xl border border-line p-5" aria-live="polite">
          <p className="font-display text-xl font-semibold">{pkg.name}</p>
          <p className="mt-1 text-muted">{pkg.blurb}</p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[.14em] text-muted">{traits.pages} {traits.pages === 1 ? "page" : "pages"}{extras.length ? ` · ${extras.join(" · ")}` : ""}</p>
          <ul className="mt-4 space-y-1.5 text-sm text-muted">
            {pkg.features.slice(0, 4).map((f) => <li key={f} className="flex gap-2"><Check size={14} className="mt-0.5 shrink-0 text-cobalt" aria-hidden />{f}</li>)}
          </ul>
          <p className="mt-4 text-xs text-muted">Pricing is tailored to your project. A written quotation confirms scope and price.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <LinkButton href="/contact">Request this package</LinkButton>
            <LinkButton href="/quote" variant="line">How quotations work</LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}
