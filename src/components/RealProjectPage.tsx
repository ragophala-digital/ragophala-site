import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { DeviceShowcase } from "@/components/demos-web";
import { Breadcrumb, LinkButton, Reveal } from "@/components/ui";
import { isEmbeddable } from "@/lib/embeddable";
import type { RealProject } from "@/lib/real-projects";

/** Detail page for a live project: the real site in the device switcher, and only facts visible on it. */
export async function RealProjectPage({ project }: { project: RealProject }) {
  const live = await isEmbeddable(project.site.url);
  return (
    <>
      <section className="theme-dark relative overflow-hidden bg-navy pb-16 pt-32 sm:pt-40">
        <div className="container-x relative">
          <Breadcrumb items={[{ label: "Selected work", href: "/portfolio" }, { label: project.title }]} />
          <Reveal>
            <p className="label mb-5">{project.category} · Real project</p>
            <h1 className="display-lg max-w-[20ch]">{project.title}</h1>
            <p className="body-lg mt-6">{project.description}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Services involved">
              {project.services.map((s) => (<li key={s} className="rounded-md border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider">{s}</li>))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={project.site.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Visit the live site <ArrowUpRight size={16} aria-hidden /></a>
              <LinkButton href={`/contact?service=web&item=${encodeURIComponent(project.title)}`} variant="line">Request something similar</LinkButton>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <p className="label mb-6">Responsive preview</p>
          <DeviceShowcase site={project.site} live={live} className="mx-auto max-w-4xl" />
        </div>
      </section>

      <section className="theme-soft section bg-softblue">
        <div className="container-x grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <h2 className="display-md">What the site includes.</h2>
          <ul className="border-t border-navy/15">
            {project.features.map((f) => (<li key={f} className="flex gap-3 border-b border-navy/15 py-3.5 text-[15px]"><Check size={16} className="mt-1 shrink-0 text-cobalt" aria-hidden />{f}</li>))}
          </ul>
        </div>
      </section>

      <section className="pb-24 pt-10">
        <div className="container-x"><Link href="/portfolio" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#2447D6] hover:underline"><ArrowLeft size={16} aria-hidden /> Back to selected work</Link></div>
      </section>
    </>
  );
}
