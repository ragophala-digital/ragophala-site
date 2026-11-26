import { PortfolioBrowser } from "@/components/PortfolioBrowser";
import { Breadcrumb } from "@/components/ui";
import { pageMeta } from "@/lib/utils";

export const metadata = pageMeta("Selected Work", "Real projects and illustrative concepts showing how Ragophala Digital designs websites, web applications and AI automation.", "/portfolio");

export default function Portfolio() {
  return (
    <>
      <section className="pb-6 pt-24 sm:pt-28">
        <div className="container-x">
          <Breadcrumb items={[{ label: "Selected work" }]} />
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
            <div>
              <p className="label mb-3">Selected work</p>
              <h1 className="display-md max-w-[24ch]">How we approach real business problems.</h1>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-muted">Each card shows what the project is and the service behind it. Real projects are marked as such. The rest are illustrative concepts that show our approach, not client work.</p>
          </div>
        </div>
      </section>
      <section className="pb-20 pt-2">
        <div className="container-x"><PortfolioBrowser /></div>
      </section>
    </>
  );
}
