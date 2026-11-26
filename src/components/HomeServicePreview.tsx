import { ArrowRight, Check, Globe2, Inbox, Workflow } from "lucide-react";
import { ChatMock } from "./mockups-ai";
import { BrowserFrame } from "./mockups-web";

export function HomeFleetPreview() {
  return (
    <BrowserFrame url="Fleet operations">
      <div className="grid grid-cols-[auto_minmax(0,1fr)] text-navy">
        <div className="bg-navy px-3 py-4 text-cobalt-300"><Inbox size={17} /></div>
        <div className="min-w-0 p-3">
          <p className="font-display text-sm font-semibold">Dispatch board</p>
          <ul className="mt-2 divide-y divide-navy/10 text-xs">
            {[
              ["Airport transfer", "Assigned"],
              ["Warehouse pickup", "Awaiting driver"],
              ["Vehicle inspection", "Scheduled"],
            ].map(([job, status]) => (
              <li key={job} className="flex flex-wrap items-center justify-between gap-1 py-2">
                <span>{job}</span><span className="rounded bg-softblue px-1.5 py-1 text-[#2447D6]">{status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </BrowserFrame>
  );
}

export function HomeServicePreview({ service }: { service: "web" | "apps" | "ai" | "automation" }) {
  if (service === "ai") return <ChatMock />;

  if (service === "apps") {
    return (
      <BrowserFrame url="Operations workspace">
        <div className="grid grid-cols-[auto_minmax(0,1fr)] text-navy">
          <div className="bg-navy px-3 py-4 text-cobalt-300"><Inbox size={17} /></div>
          <div className="p-3 sm:p-4">
            <p className="font-display text-sm font-semibold">Enquiry inbox</p>
            <ul className="mt-2 divide-y divide-navy/10 text-xs">
              <li className="flex flex-wrap justify-between gap-1 py-2"><span>Booking request</span><span className="font-medium text-[#2447D6]">New</span></li>
              <li className="flex flex-wrap justify-between gap-1 py-2"><span>Website update</span><span className="text-[#566075]">Assigned</span></li>
              <li className="flex flex-wrap justify-between gap-1 py-2"><span>Support enquiry</span><span className="text-[#566075]">In review</span></li>
            </ul>
          </div>
        </div>
      </BrowserFrame>
    );
  }

  if (service === "automation") {
    return (
      <BrowserFrame url="Workflow builder">
        <div className="p-3 text-navy sm:p-4">
          <p className="flex items-center gap-2 font-display text-sm font-semibold"><Workflow size={15} className="text-cobalt" /> Route a new enquiry</p>
          <ol className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
            {["Form received", "Create task", "Notify team"].map((step, index) => (
              <li key={step} className="flex items-center gap-1.5">
                {index > 0 && <ArrowRight size={12} className="text-[#566075]" />}
                <span className="rounded-md bg-softblue px-2 py-1.5 font-medium">{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-3 flex items-center gap-1.5 border-t border-navy/10 pt-2 text-xs text-[#566075]"><Check size={14} className="text-cobalt" /> Ready for team review</p>
        </div>
      </BrowserFrame>
    );
  }

  return (
    <BrowserFrame>
      <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] gap-3 p-3 text-navy sm:p-4">
        <div className="min-w-0 self-center">
          <p className="flex items-center gap-1.5 font-mono text-[9px] uppercase text-[#566075]"><Globe2 size={12} /> Business website</p>
          <p className="mt-2 font-display text-base font-semibold leading-tight">Book a consultation</p>
          <p className="mt-1 text-xs text-[#566075]">Tell us how we can help.</p>
        </div>
        <div className="min-w-0 space-y-1.5 rounded-lg bg-softblue p-2 text-[9px]">
          <p className="rounded bg-white px-2 py-1 text-[#566075]">Name</p>
          <p className="rounded bg-white px-2 py-1 text-[#566075]">Work email</p>
          <p className="rounded bg-cobalt px-2 py-1 font-medium text-white">Send enquiry</p>
        </div>
      </div>
    </BrowserFrame>
  );
}
