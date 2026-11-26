import { LinkButton, Reveal, SectionHead } from "@/components/ui";
import { ServiceTemplate } from "@/components/ServiceTemplate";
import { BeforeAfter, DeviceShowcase, type ShowcaseSite } from "@/components/demos-web";
import { serviceByKey } from "@/lib/services";
import { pageMeta } from "@/lib/utils";

const service = serviceByKey("web");

/** A real project, shown with screenshots taken at each screen width (see public/projects/stayradiant). */
const STAY_RADIANT: ShowcaseSite = {
  name: "Stay Radiant",
  url: "https://www.stayradiant.co.za/",
  shots: {
    desktop: { src: "/projects/stayradiant/desktop.webp", width: 1440, height: 3400 },
    tablet: { src: "/projects/stayradiant/tablet.webp", width: 1230, height: 4500 },
    mobile: { src: "/projects/stayradiant/mobile.webp", width: 780, height: 7200 },
  },
};
export const metadata = pageMeta(service.metaTitle, service.metaDescription, service.href);

export default function WebDevelopment() {
  return (
    <ServiceTemplate
      service={service}
      visual={<div id="devices" className="scroll-mt-28"><DeviceShowcase site={STAY_RADIANT} className="mx-auto max-w-4xl" /></div>}
      extra={
        <section className="theme-soft section bg-softblue">
          <div className="container-x grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <SectionHead label="Website redesign" title="From outdated to outstanding" text="A redesign keeps what works, then improves structure, clarity, speed and search visibility. Drag the handle to compare." className="mb-6 lg:mb-6" />
              <LinkButton href="/contact?service=web&item=Website%20redesign" variant="line">Ask about a redesign</LinkButton>
            </div>
            <Reveal><BeforeAfter /></Reveal>
          </div>
        </section>
      }
    />
  );
}
