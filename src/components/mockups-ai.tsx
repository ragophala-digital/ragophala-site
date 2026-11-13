import { BellRing, Bot, CalendarCheck, ClipboardList, Database, ListChecks, MessageSquare, Send, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ChatMock({ className }: { className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-navy/15 bg-white text-navy shadow-[0_40px_70px_-40px_rgba(16,24,39,.55)]", className)}>
      <div className="flex items-center gap-3 border-b border-navy/10 px-4 py-3">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-cobalt text-white"><Bot size={16} aria-hidden /></span>
        <div><p className="font-display text-sm font-semibold">Business assistant</p><p className="font-mono text-[9px] uppercase tracking-wider text-muted">Answers from your approved content</p></div>
      </div>
      <div className="space-y-3 p-4 text-[12px]">
        <p className="max-w-[80%] rounded-2xl rounded-bl-sm bg-ivory-200 px-3.5 py-2.5">Hi, do you do weekend appointments?</p>
        <p className="ml-auto max-w-[82%] rounded-2xl rounded-br-sm bg-cobalt px-3.5 py-2.5 text-white">Yes, we offer Saturday appointments. Would you like me to check available times?</p>
        <p className="max-w-[80%] rounded-2xl rounded-bl-sm bg-ivory-200 px-3.5 py-2.5">Saturday morning please.</p>
        <p className="rounded-lg border border-dashed border-cobalt/50 bg-softblue/60 px-3 py-2 font-mono text-[10px] text-cobalt-700">Lead captured · passed to the team for confirmation</p>
      </div>
      <div className="flex items-center gap-2 border-t border-navy/10 p-3"><span className="flex-1 rounded-lg bg-ivory-200 px-3 py-2 text-[11px] text-muted">Type a message</span><span className="grid h-8 w-8 place-items-center rounded-lg bg-navy text-ivory"><Send size={14} aria-hidden /></span></div>
    </div>
  );
}

export function WhatsAppMock({ className }: { className?: string }) {
  return (
    <div className={cn("aspect-[9/17] w-[210px] overflow-hidden rounded-[28px] border-[6px] border-navy bg-[#EFEAE2] shadow-[0_40px_60px_-30px_rgba(16,24,39,.6)]", className)}>
      <div className="bg-[#1f5c4f] px-4 pb-3 pt-5 text-white"><p className="text-xs font-medium">Your business</p><p className="text-[9px] opacity-80">WhatsApp assistant</p></div>
      <div className="space-y-2 p-3 text-[10px] text-navy">
        <p className="max-w-[85%] rounded-lg rounded-tl-none bg-white p-2">Hello! I need a quote for a website.</p>
        <p className="ml-auto max-w-[85%] rounded-lg rounded-tr-none bg-[#D9F2C9] p-2">Happy to help. Is this for a new site or a redesign?</p>
        <p className="max-w-[85%] rounded-lg rounded-tl-none bg-white p-2">A new site for my salon.</p>
        <p className="ml-auto max-w-[85%] rounded-lg rounded-tr-none bg-[#D9F2C9] p-2">Thanks. What is your estimated budget range?</p>
      </div>
    </div>
  );
}

export interface FlowStep {
  icon: LucideIcon;
  title: string;
  text: string;
}

export const ENQUIRY_FLOW: FlowStep[] = [
  { icon: MessageSquare, title: "Customer enquiry", text: "A visitor asks a question on your website or WhatsApp." },
  { icon: Bot, title: "AI assistant", text: "It answers from your approved content." },
  { icon: ListChecks, title: "Qualification", text: "It asks a few questions to understand the need." },
  { icon: Database, title: "Business system", text: "Details are saved and routed to the right person." },
  { icon: CalendarCheck, title: "Follow-up", text: "Your team is notified and a reminder is created." },
];

export const AUTOMATION_FLOW: FlowStep[] = [
  { icon: MessageSquare, title: "New enquiry", text: "A form, email or WhatsApp message arrives." },
  { icon: ListChecks, title: "Tag and score", text: "It is categorised using your rules." },
  { icon: BellRing, title: "Notify", text: "The right person is alerted immediately." },
  { icon: ClipboardList, title: "Create task", text: "A task is added to your system." },
  { icon: CalendarCheck, title: "Remind", text: "Follow-up reminders go out on time." },
];

export function WorkflowDiagram({ steps = ENQUIRY_FLOW, dark }: { steps?: FlowStep[]; dark?: boolean }) {
  return (
    <ol className="flex flex-col lg:flex-row lg:items-stretch">
      {steps.map((s, i) => (
        <li key={s.title} className="flex flex-col items-stretch lg:flex-1 lg:flex-row">
          <div className={cn("flex-1 rounded-xl border p-5", dark ? "border-line bg-card" : "border-navy/15 bg-white")}>
            <div className="flex items-center justify-between">
              <span className={cn("grid h-10 w-10 place-items-center rounded-lg", dark ? "bg-cobalt/20 text-cobalt-300" : "bg-softblue text-cobalt")}><s.icon size={18} aria-hidden /></span>
              <span className="font-mono text-[10px] text-muted">0{i + 1}</span>
            </div>
            <h3 className="mt-5 font-display text-base font-semibold">{s.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.text}</p>
          </div>
          {i < steps.length - 1 && (
            <>
              <span aria-hidden className="flow-y mx-auto h-8 w-0.5 animate-flowY lg:hidden" />
              <span aria-hidden className="flow-x my-auto hidden h-0.5 w-8 animate-flow lg:block" />
            </>
          )}
        </li>
      ))}
    </ol>
  );
}
