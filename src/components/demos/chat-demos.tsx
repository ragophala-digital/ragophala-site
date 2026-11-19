"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChatView, DemoGrid, LogPanel, Panel, PhoneShell, Pill, ScriptControls, nextLabelFor, useScript, type ChatStep } from "./kit";

/* ---------- 1. AI chatbot: Karoo Stays (fictional guesthouse) ---------- */

const CHAT: ChatStep[] = [
  { from: "user", text: "Hi, do you have a room for two on the 14th to 16th?" },
  { from: "ai", text: "Hello! Yes, the Garden Suite and a Standard room are free for those nights. Would you like breakfast included?", log: "Checked the sample availability calendar" },
  { from: "user", text: "Garden Suite please, with breakfast." },
  { from: "ai", text: "Lovely. I have: Garden Suite, 14 to 16 Nov, 2 guests, breakfast. May I take your name and number so the team can confirm?", log: "Captured the booking request details" },
  { from: "user", text: "Thandi, 082 000 0000" },
  { from: "ai", text: "Thank you, Thandi. I've sent this to the team to confirm. I can't confirm the booking myself, but they will reply today.", log: "Sent the lead to the CRM and notified the team (demo)" },
];

const DAYS = ["Thu 13", "Fri 14", "Sat 15", "Sun 16", "Mon 17"];

export function ChatbotDemo() {
  const s = useScript(CHAT.length);
  const log = CHAT.slice(0, s.step).flatMap((c) => (c.log ? [c.log] : []));
  return (
    <div className="space-y-5">
      <DemoGrid>
        <PhoneShell title="Karoo Stays assistant" subtitle="Fictional guesthouse · demo"><ChatView steps={CHAT} upto={s.step} /></PhoneShell>
        <div className="space-y-4">
          <LogPanel items={log} />
          <Panel title="Availability (sample)">
            <ul className="grid grid-cols-5 gap-2 text-center text-xs">
              {DAYS.map((d, i) => {
                const held = s.step >= 4 && (i === 1 || i === 2);
                return (<li key={d} className={cn("rounded-lg border px-1 py-2 transition", held ? "border-cobalt bg-cobalt text-white" : "border-navy/10 bg-ivory")}>{d}<span className="mt-1 block text-[10px] opacity-80">{held ? "Held" : "Open"}</span></li>);
              })}
            </ul>
          </Panel>
          <Panel title="Team inbox (sample)">
            {s.step >= CHAT.length ? (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl bg-softblue p-3 text-sm"><p className="font-semibold">New booking request</p><p className="text-[#566075]">Thandi · Garden Suite · 14 to 16 Nov · breakfast</p><div className="mt-2"><Pill tone="amber">Needs confirmation</Pill></div></motion.div>
            ) : (<p className="text-sm text-[#566075]">No new requests yet.</p>)}
          </Panel>
        </div>
      </DemoGrid>
      <ScriptControls script={s} nextLabel={nextLabelFor(CHAT, s.step)} />
    </div>
  );
}

/* ---------- 2. AI voice agent: Bright Smile Dental (fictional) ---------- */

const CALL: ChatStep[] = [
  { from: "ai", text: "Good afternoon, Bright Smile Dental. How can I help?" },
  { from: "user", text: "I'd like to book a check-up, preferably Thursday afternoon." },
  { from: "ai", text: "I can note a Thursday afternoon request for a check-up. Are you a new or existing patient?", log: "Understood: check-up, Thursday afternoon" },
  { from: "user", text: "New patient. My name is Sipho." },
  { from: "ai", text: "Thank you, Sipho. I'll pass this to reception, who will confirm a time with you by phone today." },
];

export function VoiceDemo() {
  const s = useScript(CALL.length, 1700);
  const secs = s.step * 11;
  const mm = `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;
  const done = s.atEnd;
  return (
    <div className="space-y-5">
      <DemoGrid>
        <PhoneShell title="Incoming call" subtitle={`Bright Smile Dental · ${mm}`}>
          <div className="mb-3 flex items-center justify-center gap-1" aria-hidden>
            {Array.from({ length: 18 }).map((_, i) => (<motion.i key={i} className="block w-1 rounded-full bg-cobalt" animate={{ height: s.playing ? [6, 10 + ((i * 7) % 18), 6] : 6 }} transition={{ repeat: Infinity, duration: 0.9 + (i % 4) * 0.15 }} />))}
          </div>
          <ChatView steps={CALL} upto={s.step} userLabel="Caller" />
        </PhoneShell>
        <div className="space-y-4">
          <Panel title="Call summary (created after the call)">
            {done ? (
              <motion.dl initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-2 text-sm">
                {([["Caller", "Sipho (new patient)"], ["Reason", "Check-up"], ["Preferred time", "Thursday afternoon"], ["Outcome", "Appointment request, not yet confirmed"], ["Follow-up", "Reception to call back today"]] as const).map(([k, v]) => (<div key={k} className="flex justify-between gap-4 border-b border-navy/10 pb-2"><dt className="text-[#566075]">{k}</dt><dd className="text-right font-medium">{v}</dd></div>))}
              </motion.dl>
            ) : (<p className="text-sm text-[#566075]">The summary appears when the call ends.</p>)}
          </Panel>
          <LogPanel items={CALL.slice(0, s.step).flatMap((c) => (c.log ? [c.log] : [])).concat(done ? ["Saved the summary and created a call-back task (demo)"] : [])} />
        </div>
      </DemoGrid>
      <ScriptControls script={s} nextLabel={nextLabelFor(CALL, s.step)} />
    </div>
  );
}

/* ---------- 3. WhatsApp automation: Mama Nomsa's Kitchen (fictional) ---------- */

const ORDER: ChatStep[] = [
  { from: "user", text: "Hi! 2 chicken curry and 1 veg samosa box please." },
  { from: "ai", text: "Hi! That's 2 Chicken Curry and 1 Samosa Box. Delivery or collection?", log: "Read the order from the message" },
  { from: "user", text: "Delivery to Hatfield." },
  { from: "ai", text: "Done. Your order is confirmed and the kitchen has it. We'll message you when the driver leaves.", log: "Sent the order to the kitchen printer and updated stock" },
  { from: "ai", text: "Your order is on its way. Driver: Lerato.", log: "Dispatch: order marked out for delivery" },
];

const STOCK: [string, number][] = [["Chicken Curry", 14], ["Samosa Box", 9], ["Rice portions", 30]];

export function WhatsAppDemo() {
  const s = useScript(ORDER.length, 1700);
  const ordered = s.step >= 4;
  const stock = STOCK.map(([n, v], i) => [n, ordered ? v - (i === 0 ? 2 : i === 1 ? 1 : 2) : v] as const);
  const dispatch = s.step >= 5 ? "Out for delivery" : ordered ? "Preparing" : "Waiting";
  return (
    <div className="space-y-5">
      <DemoGrid>
        <PhoneShell title="Mama Nomsa's Kitchen" subtitle="WhatsApp · fictional business"><ChatView steps={ORDER} upto={s.step} /></PhoneShell>
        <div className="grid gap-4 sm:grid-cols-2">
          <Panel title="Kitchen printer" className="sm:col-span-2">
            {ordered ? (
              <motion.pre initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg bg-ivory p-3 font-mono text-[12px] leading-relaxed text-navy">{`ORDER #0147   DELIVERY\n2 x Chicken Curry\n1 x Samosa Box (veg)\nHatfield\n----------------------`}</motion.pre>
            ) : (<p className="text-sm text-[#566075]">Orders print here once confirmed.</p>)}
          </Panel>
          <Panel title="Stock (sample)">
            <ul className="space-y-2 text-sm">{stock.map(([n, v]) => (<li key={n} className="flex justify-between"><span>{n}</span><span className="font-mono">{v}</span></li>))}</ul>
          </Panel>
          <Panel title="Dispatch">
            <Pill tone={dispatch === "Out for delivery" ? "green" : dispatch === "Preparing" ? "amber" : "slate"}>{dispatch}</Pill>
            <p className="mt-3 text-xs text-[#566075]">Customers get a message automatically at each stage.</p>
          </Panel>
          <div className="sm:col-span-2"><LogPanel items={ORDER.slice(0, s.step).flatMap((c) => (c.log ? [c.log] : []))} /></div>
        </div>
      </DemoGrid>
      <ScriptControls script={s} nextLabel={nextLabelFor(ORDER, s.step)} />
    </div>
  );
}
