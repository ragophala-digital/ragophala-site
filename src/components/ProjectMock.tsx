import { CrmMock, DashboardMock, InventoryMock, PortalMock, StatusPill } from "./mockups-app";
import { ChatMock, WhatsAppMock } from "./mockups-ai";
import { BrowserFrame, PhoneFrame, PhoneSite, SiteMock } from "./mockups-web";
import type { MockKind } from "@/lib/site";

export const MOCK_WIDTH = 760;
export const MOCK_HEIGHT = 470;

/** Large illustrative composition for a concept project, designed at 760 x 470 for use with ScaleToFit. */
export function ProjectMock({ kind }: { kind: MockKind }) {
  const site = kind === "booking" || kind === "shop" || kind === "studio";
  return (
    <div className="relative h-[470px] w-[760px]">
      {site && (
        <>
          <BrowserFrame url={kind === "booking" ? "karoostays.co.za" : kind === "shop" ? "capefresh.co.za" : "launchpad.co.za"} className="absolute left-4 top-8 w-[610px]">
            <SiteMock variant={kind} />
            <div className="h-24 bg-ivory-200" />
          </BrowserFrame>
          <PhoneFrame className="absolute bottom-3 right-6 w-[170px]"><PhoneSite /></PhoneFrame>
        </>
      )}
      {kind === "fleet" && <DashboardMock wide className="absolute left-4 top-6 w-[730px]" />}
      {kind === "portal" && (
        <>
          <PortalMock className="absolute left-6 top-10 w-[600px] scale-[1.02]" />
          <div className="absolute bottom-10 right-8 w-[250px] rounded-xl bg-white p-4 text-navy shadow-xl"><p className="font-mono text-[10px] uppercase tracking-wider text-muted">Reminder sent</p><p className="mt-1 font-display text-base font-semibold">Appointment tomorrow</p><div className="mt-3"><StatusPill status="Paid" /></div></div>
        </>
      )}
      {kind === "stock" && (
        <>
          <InventoryMock className="absolute left-6 top-10 w-[560px]" />
          <CrmMock className="absolute bottom-6 right-4 w-[300px]" />
        </>
      )}
      {kind === "chat" && (
        <>
          <ChatMock className="absolute left-1/2 top-6 w-[430px] -translate-x-1/2" />
          <div className="absolute right-6 top-24 w-[170px] rounded-xl bg-white p-3 text-navy shadow-xl"><p className="font-mono text-[9px] uppercase tracking-wider text-cobalt">Lead captured</p><p className="mt-1 text-xs">Contact saved and team notified.</p></div>
        </>
      )}
      {kind === "whatsapp" && (
        <>
          <WhatsAppMock className="absolute left-24 top-2 w-[230px]" />
          <div className="absolute right-12 top-16 w-[290px] space-y-3">
            {["New enquiry received", "Tagged: website quote", "Owner notified", "Follow-up reminder set"].map((t, i) => (
              <div key={t} className="flex items-center gap-3 rounded-xl bg-white p-3.5 text-sm text-navy shadow-lg"><span className="grid h-6 w-6 place-items-center rounded-full bg-cobalt font-mono text-[10px] text-white">{i + 1}</span>{t}</div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
