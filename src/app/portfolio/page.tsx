import { PortfolioBrowser } from "@/components/PortfolioBrowser";
import { CTASection, PageHero } from "@/components/ui";
import { pageMeta } from "@/lib/utils";

export const metadata = pageMeta("Portfolio", "Demonstration projects showing how Ragophala Digital designs websites, web applications and AI automation.", "/portfolio");

export default function Portfolio() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title={<>Demonstration projects that show <span className="text-volt-400">how we build</span></>}
        text="Our portfolio is made up of clearly labelled demonstration projects created to show our approach, design standards and technology. They are not real client engagements."
      />
      <section className="section pt-4">
        <div className="container-x"><PortfolioBrowser /></div>
      </section>
      <CTASection title="Want your project here?" text="Tell us what you need and we will plan it together." />
    </>
  );
}
