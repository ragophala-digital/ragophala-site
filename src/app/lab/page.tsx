import { LabConfigurator } from "@/components/LabConfigurator";
import { PageHero, Reveal, SectionHead, LinkButton } from "@/components/ui";
import { TOOLCHAIN } from "@/lib/lab";
import { pageMeta } from "@/lib/utils";

export const metadata = pageMeta("3D Lab", "An interactive 3D model of our website packages, and the open-source 3D tools we work with.", "/lab");

export default function Lab() {
  return (
    <>
      <PageHero crumbs={[{ label: "3D Lab" }]} label="3D Lab" title={<>See a website take shape.</>} text="Pick a package and watch the model change. It is built with the same Three.js stack that powers this site." />
      <section className="pb-20 pt-4"><div className="container-x"><LabConfigurator /></div></section>
      <section className="pb-24">
        <div className="container-x">
          <SectionHead label="Toolchain" title="The 3D tools we work with" text="Three.js runs this site today. The others are open-source tools we can bring in when a project calls for them." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TOOLCHAIN.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.05}>
                <a href={t.url} target="_blank" rel="noopener noreferrer" className="card flex h-full flex-col p-6 transition hover:-translate-y-1">
                  <p className="label">{t.role}</p>
                  <h3 className="display-md mt-3 !text-2xl">{t.name}</h3>
                  <p className="mt-3 flex-1 text-muted">{t.fit}</p>
                  <p className="mt-5 font-mono text-[11px] uppercase tracking-[.14em] text-accent">{t.status === "in-use" ? "In use on this site" : "On request"}</p>
                </a>
              </Reveal>
            ))}
          </div>
          <div className="mt-12"><LinkButton href="/contact">Discuss a 3D project</LinkButton></div>
        </div>
      </section>
    </>
  );
}
