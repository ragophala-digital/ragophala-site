"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { DemoGrid, LogPanel, Panel, Pill, ScriptControls, useScript } from "./kit";

/* ---------- 4. Social content automation: Cape Brew Coffee (fictional) ---------- */

const DRAFTS = [
  { id: "ig", channel: "Instagram", day: "Tue", text: "Meet Karoo Dark Roast: deep, smooth and made for slow mornings. Fresh this week. ☕" },
  { id: "fb", channel: "Facebook", day: "Wed", text: "New in: Karoo Dark Roast. Roasted in small batches and ready to brew. Tell us how you take your first cup." },
  { id: "in", channel: "LinkedIn", day: "Thu", text: "We've added Karoo Dark Roast to our range, a small-batch roast developed with local cafés in mind." },
];
const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export function SocialDemo() {
  const s = useScript(3, 1500);
  const [approved, setApproved] = useState<Record<string, boolean>>({});
  const reset = () => { s.reset(); setApproved({}); };
  const log = ["Read the brief: new product, Karoo Dark Roast", "Wrote three on-brand drafts, one per channel", "Scheduled approved posts (nothing is published in this demo)"].slice(0, s.step);
  return (
    <div className="space-y-5">
      <DemoGrid>
        <div className="space-y-4">
          <Panel title="Your brief">
            <p className="rounded-xl bg-ivory p-3 text-sm">New product: <strong>Karoo Dark Roast</strong>. Friendly tone, mention small-batch roasting. Post three times this week.</p>
          </Panel>
          <LogPanel items={log} />
          <Panel title="This week">
            <ul className="grid grid-cols-5 gap-2 text-center text-xs">
              {WEEK.map((d) => {
                const hit = DRAFTS.find((x) => x.day === d && approved[x.id] && s.step >= 3);
                return (<li key={d} className={cn("min-h-[56px] rounded-lg border px-1 py-2", hit ? "border-cobalt bg-softblue" : "border-navy/10 bg-ivory")}>{d}{hit && <span className="mt-1 block text-[10px] font-semibold text-cobalt">{hit.channel}</span>}</li>);
              })}
            </ul>
          </Panel>
        </div>
        <div className="space-y-3">
          {s.step < 2 && <Panel><p className="text-sm text-[#566075]">Drafts appear here after the brief is read.</p></Panel>}
          {s.step >= 2 && DRAFTS.map((d, i) => (
            <motion.div key={d.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}>
              <Panel>
                <div className="mb-2 flex items-center justify-between"><Pill tone="soft">{d.channel} · {d.day}</Pill><Pill tone={approved[d.id] ? "green" : "amber"}>{approved[d.id] ? "Approved" : "Needs approval"}</Pill></div>
                <p className="text-sm leading-relaxed">{d.text}</p>
                <button type="button" aria-pressed={!!approved[d.id]} onClick={() => setApproved((a) => ({ ...a, [d.id]: !a[d.id] }))} className="btn btn-line mt-3 !px-3 !py-1.5 !text-xs">{approved[d.id] ? "Undo approval" : "Approve this post"}</button>
              </Panel>
            </motion.div>
          ))}
          {s.step >= 2 && <p className="text-xs text-[#566075]">A person approves each post before it is scheduled.</p>}
        </div>
      </DemoGrid>
      <ScriptControls script={{ ...s, reset }} nextLabel={s.step === 0 ? "Read the brief" : s.step === 1 ? "Write the drafts" : "Schedule approved posts"} />
    </div>
  );
}

/* ---------- 5. Lead generation: Veld Solar (fictional) ---------- */

const COLS = ["New", "Contacted", "Quote sent", "Won"];
const DORMANT = ["M. Pretorius · asked in March", "A. Dlamini · asked in May", "Greenview Farm · asked in June"];

export function LeadsDemo() {
  const s = useScript(5, 1500);
  const [reactivated, setReactivated] = useState(false);
  const reset = () => { s.reset(); setReactivated(false); };
  const col = s.step >= 5 ? 2 : s.step >= 4 ? 1 : s.step >= 1 ? 0 : -1;
  const score = s.step >= 2 ? 82 : 0;
  const log = ["Quote request received from the website form", "Scored the lead: high intent (roof size, budget range and timeline given)", "Sent an instant reply and booked a call slot (demo)", "Moved the lead to Contacted and alerted the sales team", "Prepared a quote draft for a person to review"].slice(0, s.step);
  return (
    <div className="space-y-5">
      <DemoGrid>
        <div className="space-y-4">
          <Panel title="Quote request form (sample)">
            <dl className="grid gap-2 text-sm">
              {([["Name", "Karel van Wyk"], ["Need", "Rooftop solar for a small factory"], ["Timeline", "Within 3 months"]] as const).map(([k, v]) => (<div key={k} className="flex justify-between gap-3 border-b border-navy/10 pb-2"><dt className="text-[#566075]">{k}</dt><dd className="font-medium">{s.step >= 1 ? v : "…"}</dd></div>))}
            </dl>
          </Panel>
          <div className="grid grid-cols-2 gap-4">
            <Panel title="Speed to lead"><p className="font-display text-3xl font-semibold">{s.step >= 3 ? "00:42" : "--:--"}</p><p className="mt-1 text-xs text-[#566075]">{s.step >= 3 ? "Time to first reply" : "Waiting for a lead"}</p></Panel>
            <Panel title="Lead score">
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 44 44" className="h-14 w-14 -rotate-90" aria-hidden><circle cx="22" cy="22" r="18" fill="none" stroke="#E5E7EB" strokeWidth="5" /><motion.circle cx="22" cy="22" r="18" fill="none" stroke="#315BFA" strokeWidth="5" strokeLinecap="round" strokeDasharray={113} animate={{ strokeDashoffset: 113 - (113 * score) / 100 }} transition={{ duration: 0.8 }} /></svg>
                <div><p className="font-display text-2xl font-semibold">{score || "--"}</p>{score > 0 && <Pill tone="green">Hot</Pill>}</div>
              </div>
            </Panel>
          </div>
          <LogPanel items={log} />
        </div>
        <div className="space-y-4">
          <Panel title="Pipeline">
            <ul className="grid grid-cols-4 gap-2 text-xs">
              {COLS.map((c, i) => (
                <li key={c} className="min-h-[120px] rounded-lg bg-ivory p-2"><p className="mb-2 font-semibold">{c}</p>{col === i && <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="rounded-md border border-cobalt bg-white p-2"><p className="font-semibold">Karel van Wyk</p><p className="text-[#566075]">Solar · Hot</p></motion.div>}</li>
              ))}
            </ul>
          </Panel>
          <Panel title="Reactivate old leads">
            <p className="text-sm text-[#566075]">Quiet leads from earlier this year can get a short, friendly follow-up.</p>
            <button type="button" onClick={() => setReactivated((r) => !r)} aria-pressed={reactivated} className="btn btn-line mt-3 !px-3 !py-1.5 !text-xs">{reactivated ? "Clear" : "Queue follow-ups"}</button>
            {reactivated && (<ul className="mt-3 space-y-2 text-sm">{DORMANT.map((d) => (<li key={d} className="flex items-center justify-between gap-2"><span>{d}</span><Pill tone="cobalt">Queued</Pill></li>))}</ul>)}
          </Panel>
        </div>
      </DemoGrid>
      <ScriptControls script={{ ...s, reset }} nextLabel={["Submit the form", "Score the lead", "Send the instant reply", "Move to Contacted", "Prepare the quote"][s.step]} />
    </div>
  );
}

/* ---------- 6. Support automation: Swift Fibre (fictional internet provider) ---------- */

interface Ticket { channel: string; text: string; by: "ai" | "team"; action: string }
const TICKETS: Ticket[] = [
  { channel: "WhatsApp", text: "How do I reset my router?", by: "ai", action: "Sent the reset guide" },
  { channel: "Email", text: "I was billed twice this month.", by: "team", action: "Escalated: needs a billing check" },
  { channel: "Web chat", text: "What are your support hours?", by: "ai", action: "Answered from the help centre" },
  { channel: "WhatsApp", text: "Internet is down in my street.", by: "team", action: "Escalated: possible outage, flagged urgent" },
  { channel: "Email", text: "Can I change my address?", by: "ai", action: "Started the address-change form" },
];

export function SupportDemo() {
  const s = useScript(TICKETS.length, 1300);
  const done = TICKETS.slice(0, s.step);
  const ai = done.filter((t) => t.by === "ai").length;
  const team = done.length - ai;
  return (
    <div className="space-y-5">
      <DemoGrid>
        <Panel title="Incoming queue (sample)">
          <ul className="space-y-2">
            {TICKETS.map((t, i) => {
              const d = i < s.step;
              return (
                <li key={i} className={cn("flex items-start justify-between gap-3 rounded-xl border p-3 text-sm transition", d ? "border-navy/10 bg-ivory" : "border-cobalt/30 bg-white")}>
                  <span><span className="block font-medium">{t.text}</span><span className="text-xs text-[#566075]">{t.channel}</span></span>
                  {d ? <Pill tone={t.by === "ai" ? "green" : "amber"}>{t.by === "ai" ? "Resolved by AI" : "Team"}</Pill> : <Pill tone="slate">Waiting</Pill>}
                </li>
              );
            })}
          </ul>
        </Panel>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Panel title="Resolved by AI"><p className="font-display text-4xl font-semibold text-emerald-700">{ai}</p></Panel>
            <Panel title="Sent to the team"><p className="font-display text-4xl font-semibold text-amber-700">{team}</p></Panel>
          </div>
          <LogPanel title="Action log" items={done.map((t) => `${t.channel}: ${t.action}`)} />
          <p className="text-xs text-[#566075]">Anything involving money, safety or an upset customer goes to a person.</p>
        </div>
      </DemoGrid>
      <ScriptControls script={s} nextLabel={s.atEnd ? undefined : `Handle: “${TICKETS[s.step].text}”`} />
    </div>
  );
}
