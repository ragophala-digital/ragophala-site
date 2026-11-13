import { PortfolioBrowser } from "@/components/PortfolioBrowser";
import { CTASection, PageHero } from "@/components/ui";
import { pageMeta } from "@/lib/utils";

export const metadata = pageMeta("Selected Concepts", "Illustrative concept projects showing how Ragophala Digital designs websites, web applications and AI automation.", "/portfolio");

export default function Portfolio() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Selected concepts" }]}
        label="Selected concepts"
        title={<>How we approach real business problems.</>}
        text="These are illustrative concept projects created to show our design and engineering approach. They are not real client engagements."
      />
      <section className="pb-24 pt-4">
        <div className="container-x"><PortfolioBrowser /></div>
      </section>
      <CTASection title="Want something like this?" text="Tell us what you need and we will plan it together." />
    </>
  );
}
