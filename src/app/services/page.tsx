import Link from "next/link";
import { LinkButton, PageHero, Reveal } from "@/components/ui";
import { ServiceVisual3D } from "@/components/ServiceVisual3D";
import { BrowserFrame, MockCaption, PhoneFrame, PhoneSite, SiteMock } from "@/components/mockups-web";
import { CrmMock, InventoryMock } from "@/components/mockups-app";
import { ChatMock, WhatsAppMock } from "@/components/mockups-ai";
import { AutomationFlow } from "@/components/demos-ai";
import { SERVICES, type Service } from "@/lib/site";
import { pageMeta } from "@/lib/utils";

export const metadata = pageMeta("Services", "Website development, web applications, AI agents and business automation for South African businesses.", "/services");

const DEMO_LINKS: Record<string, string> = {
  web: "/web-development#devices",
  apps: "/web-applications#showcase",
  ai: "/ai-automation#demo",
  automation: "/ai-automation#automation",
};

function ServiceText({ s, dark }: { s: Service; dark?: boolean }) {
  return (
    <div>
      <p className="label mb-5 flex items-center gap-3"><span className="text-accent">{s.index}</span><span aria-hidden className="h-px w-8 bg-current opacity-40" />Service</p>
      <h2 className="display-lg">{s.title}</h2>
      <p className="body-lg mt-5">{s.short}</p>
      <ul className="mt-6 space-y-2 text-[15px]">
        {s.benefits.map((b) => (<li key={b} className="flex gap-3"><span aria-hidden className="mt-2.5 h-px w-5 shrink-0 bg-cobalt" />{b}</li>))}
      </ul>
      <div className="mt-8 grid gap-8 border-t border-line pt-6 sm:grid-cols-2">
        <div>
          <h3 className="label mb-3">What is included</h3>
          <ul className="space-y-1.5 text-sm text-muted">{s.included.map((i) => (<li key={i}>{i}</li>))}</ul>
        </div>
        <div>
          <h3 className="label mb-3">Examples</h3>
          <ul className="space-y-1.5 text-sm text-muted">{s.examples.map((i) => (<li key={i}>{i}</li>))}</ul>
        </div>
      </div>
      <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
        <LinkButton href={s.href} variant={dark ? "primary" : "dark"}>Explore {s.title.toLowerCase()}</LinkButton>
        <Link href={DEMO_LINKS[s.key]} className="link-underline text-sm font-medium text-heading">Try the interactive demo</Link>
        <Link href={`/contact?service=${s.key}`} className="link-underline text-sm font-medium text-muted">Get a quote</Link>
      </div>
    </div>
  );
}

export default function Services() {
  const [web, apps, ai, automation] = SERVICES;
  return (
    <>
      <PageHero
        crumbs={[{ label: "Services" }]}
        label="Services"
        title={<>Four disciplines. One connected studio.</>}
        text="Start with a website, add custom software, introduce AI assistants and automate the repetitive work. Each service stands alone and works better together."
        actions={<><LinkButton href="/contact">Start a project</LinkButton><LinkButton href="/pricing" variant="line" arrow={false}>See pricing</LinkButton></>}
      />

      <section className="section pt-8">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal><ServiceText s={web} /></Reveal>
          <Reveal delay={0.1}>
            <ServiceVisual3D
              kind="web"
              fallback={
                <div>
                  <div className="relative pb-10 pr-6"><BrowserFrame><SiteMock variant="studio" /></BrowserFrame><PhoneFrame className="absolute bottom-0 right-0 w-[112px] sm:w-[128px]"><PhoneSite /></PhoneFrame></div>
                  <MockCaption>Illustrative website preview</MockCaption>
                </div>
              }
            />
          </Reveal>
        </div>
      </section>

      <section className="theme-dark relative overflow-hidden bg-navy">
        <div aria-hidden className="grid-lines absolute inset-0 opacity-40" />
        <div className="container-x section relative grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <ServiceVisual3D
              kind="apps"
              fallback={
                <div>
                  <div className="grid gap-4 sm:grid-cols-[1.1fr_1fr] lg:grid-cols-1 xl:grid-cols-[1.1fr_1fr]"><InventoryMock /><CrmMock /></div>
                  <MockCaption>Illustrative application screens · sample data</MockCaption>
                </div>
              }
            />
          </Reveal>
          <Reveal delay={0.1} className="order-1 lg:order-2"><ServiceText s={apps} dark /></Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal><ServiceText s={ai} /></Reveal>
          <Reveal delay={0.1}>
            <ServiceVisual3D
              kind="ai"
              fallback={
                <div>
                  <div className="relative pb-6 sm:pr-20"><ChatMock /><WhatsAppMock className="mt-6 sm:absolute sm:-bottom-8 sm:-right-2 sm:mt-0 sm:w-[170px]" /></div>
                  <MockCaption>Illustrative assistant conversations</MockCaption>
                </div>
              }
            />
          </Reveal>
        </div>
      </section>

      <section className="theme-soft section bg-softblue">
        <div className="container-x">
          <div className="mb-14 grid items-center gap-12 lg:grid-cols-2">
            <Reveal><ServiceText s={automation} /></Reveal>
            <Reveal delay={0.1}>
              <ServiceVisual3D kind="automation" fallback={<div className="hidden" />} />
            </Reveal>
          </div>
          <Reveal><AutomationFlow /></Reveal>
        </div>
      </section>
    </>
  );
}
