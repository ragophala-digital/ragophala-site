"use client";

import dynamic from "next/dynamic";
import { Headset, MessageCircle, MessageSquare, Phone, Share2, Target, Workflow, type LucideIcon } from "lucide-react";
import { useRef, useState, type ComponentType, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

const Loading = () => <div aria-busy="true" className="h-[420px] animate-pulse rounded-2xl bg-navy/5" />;
const load = (fn: () => Promise<ComponentType>) => dynamic(fn, { ssr: false, loading: Loading });

const ChatbotDemo = load(() => import("./chat-demos").then((m) => m.ChatbotDemo));
const VoiceDemo = load(() => import("./chat-demos").then((m) => m.VoiceDemo));
const WhatsAppDemo = load(() => import("./chat-demos").then((m) => m.WhatsAppDemo));
const SocialDemo = load(() => import("./ops-demos").then((m) => m.SocialDemo));
const LeadsDemo = load(() => import("./ops-demos").then((m) => m.LeadsDemo));
const SupportDemo = load(() => import("./ops-demos").then((m) => m.SupportDemo));
const WorkflowDemo = load(() => import("./workflow-demo").then((m) => m.WorkflowDemo));

export type DemoId = "chatbot" | "voice" | "whatsapp" | "social" | "leads" | "support" | "workflows";

interface Def { id: DemoId; label: string; icon: LucideIcon; blurb: string; Comp: ComponentType }

const ALL: Def[] = [
  { id: "chatbot", label: "AI Chatbot", icon: MessageSquare, blurb: "A website assistant answers a guest, captures a booking request and hands over to the team.", Comp: ChatbotDemo },
  { id: "voice", label: "AI Voice Agent", icon: Phone, blurb: "A phone assistant takes a call and leaves reception a clear summary and a call-back task.", Comp: VoiceDemo },
  { id: "whatsapp", label: "WhatsApp Automation", icon: MessageCircle, blurb: "An order arrives on WhatsApp and flows to the kitchen, stock and dispatch.", Comp: WhatsAppDemo },
  { id: "social", label: "Social Content", icon: Share2, blurb: "A short brief becomes on-brand drafts that a person approves before anything is scheduled.", Comp: SocialDemo },
  { id: "leads", label: "Lead Generation", icon: Target, blurb: "A quote request is scored, answered quickly and moved through the pipeline.", Comp: LeadsDemo },
  { id: "support", label: "Support Automation", icon: Headset, blurb: "Routine questions are resolved automatically; anything sensitive goes to a person.", Comp: SupportDemo },
  { id: "workflows", label: "Workflows", icon: Workflow, blurb: "Drag the steps of a workflow and run it to see the data at each stage.", Comp: WorkflowDemo },
];

/** Tabbed suite of scripted demonstrations. All businesses and data are fictional; nothing is sent, booked or saved. */
export function DemoSuite({ show, initial }: { show?: DemoId[]; initial?: DemoId }) {
  const defs = show ? show.flatMap((id) => ALL.filter((d) => d.id === id)) : ALL;
  const [active, setActive] = useState<DemoId>(initial && defs.some((d) => d.id === initial) ? initial : defs[0].id);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const cur = defs.find((d) => d.id === active) ?? defs[0];

  const onKey = (e: KeyboardEvent, i: number) => {
    const last = defs.length - 1;
    const to = e.key === "ArrowRight" ? (i === last ? 0 : i + 1) : e.key === "ArrowLeft" ? (i === 0 ? last : i - 1) : e.key === "Home" ? 0 : e.key === "End" ? last : -1;
    if (to < 0) return;
    e.preventDefault();
    setActive(defs[to].id);
    tabs.current[to]?.focus();
  };

  return (
    <div className="rounded-3xl border border-line bg-white/60 p-3 sm:p-6" id="suite">
      <div role="tablist" aria-label="Interactive demonstrations" className="flex gap-2 overflow-x-auto pb-3">
        {defs.map((d, i) => {
          const on = d.id === cur.id;
          return (
            <button key={d.id} ref={(el) => { tabs.current[i] = el; }} role="tab" id={`demo-tab-${d.id}`} aria-selected={on} aria-controls={`demo-panel-${d.id}`} tabIndex={on ? 0 : -1} onClick={() => setActive(d.id)} onKeyDown={(e) => onKey(e, i)} className={cn("flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2", on ? "border-navy bg-navy text-ivory" : "border-navy/15 bg-white text-navy hover:border-cobalt")}>
              <d.icon size={15} aria-hidden /> {d.label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" id={`demo-panel-${cur.id}`} aria-labelledby={`demo-tab-${cur.id}`} className="mt-2">
        <p className="mb-5 max-w-2xl text-[15px] leading-relaxed text-[#566075]">{cur.blurb}</p>
        <cur.Comp key={cur.id} />
      </div>
      <p className="mt-6 border-t border-navy/10 pt-4 font-mono text-[10px] uppercase tracking-[.14em] text-[#566075]">Demonstration · fictional businesses and sample data · nothing is sent, booked or saved</p>
    </div>
  );
}
