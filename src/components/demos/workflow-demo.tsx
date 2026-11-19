"use client";

import { motion } from "framer-motion";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { cn } from "@/lib/utils";
import { Panel, ScriptControls, useScript } from "./kit";

/** Draggable node graph. Select or drag a node, then run the workflow to see the sample data at each step. Nothing is executed. */

interface Node {
  id: string;
  label: string;
  hint: string;
  x: number;
  y: number;
  data: [string, string][];
}

const W = 760;
const H = 300;

const INITIAL: Node[] = [
  { id: "trigger", label: "New enquiry", hint: "Form, email or message arrives", x: 90, y: 90, data: [["source", "website form"], ["name", "Anele M."], ["message", "Need a booking system for my salon"]] },
  { id: "analyse", label: "Analyse", hint: "Read and summarise", x: 270, y: 210, data: [["service", "web application"], ["urgency", "normal"], ["summary", "Salon owner wants online bookings"]] },
  { id: "categorise", label: "Categorise", hint: "Apply your rules", x: 450, y: 90, data: [["category", "Booking system"], ["priority", "medium"], ["owner", "Sales"]] },
  { id: "task", label: "Create task", hint: "Add a follow-up", x: 620, y: 210, data: [["task", "Call Anele within 1 working day"], ["due", "Tomorrow, 10:00"], ["status", "Created (demo)"]] },
  { id: "notify", label: "Notify", hint: "Alert the right person", x: 690, y: 70, data: [["to", "Sales team"], ["channel", "Email"], ["message", "New medium-priority lead"]] },
];

const ORDER = ["trigger", "analyse", "categorise", "task", "notify"];

export function WorkflowDemo() {
  const [nodes, setNodes] = useState<Node[]>(INITIAL);
  const [picked, setPicked] = useState("trigger");
  const [drag, setDrag] = useState<string | null>(null);
  const svg = useRef<SVGSVGElement>(null);
  const s = useScript(ORDER.length, 1300);
  const runningId = s.step > 0 ? ORDER[Math.min(s.step, ORDER.length) - 1] : null;
  const focus = nodes.find((n) => n.id === (runningId ?? picked)) ?? nodes[0];
  const byId = (id: string) => nodes.find((n) => n.id === id) ?? nodes[0];

  const toSvg = (e: PointerEvent) => {
    const el = svg.current;
    if (!el) return { x: 0, y: 0 };
    const r = el.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * W, y: ((e.clientY - r.top) / r.height) * H };
  };
  const move = (id: string, x: number, y: number) => setNodes((ns) => ns.map((n) => (n.id === id ? { ...n, x: Math.min(W - 50, Math.max(50, x)), y: Math.min(H - 30, Math.max(30, y)) } : n)));
  const onKey = (e: KeyboardEvent, n: Node) => {
    const step = e.shiftKey ? 30 : 10;
    const d: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    if (d[e.key]) { e.preventDefault(); move(n.id, n.x + d[e.key][0], n.y + d[e.key][1]); }
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setPicked(n.id); }
  };
  const reset = () => { s.reset(); setNodes(INITIAL); setPicked("trigger"); };

  return (
    <div className="space-y-5">
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
        <Panel title="Workflow · drag the nodes, or select one and use the arrow keys">
          <svg ref={svg} viewBox={`0 0 ${W} ${H}`} className="w-full touch-none rounded-xl bg-ivory" role="group" aria-label="Workflow diagram with five connected steps" onPointerMove={(e) => { if (drag) { const p = toSvg(e); move(drag, p.x, p.y); } }} onPointerUp={() => setDrag(null)} onPointerLeave={() => setDrag(null)}>
            {ORDER.slice(0, -1).map((id, i) => {
              const a = byId(id), b = byId(ORDER[i + 1]);
              const lit = s.step > i + 1;
              return <line key={id} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={lit ? "#315BFA" : "#C9CED8"} strokeWidth={lit ? 3 : 2} strokeDasharray={lit ? undefined : "6 6"} />;
            })}
            {runningId && <motion.circle r={9} fill="#315BFA" initial={false} animate={{ cx: byId(runningId).x, cy: byId(runningId).y }} transition={{ duration: 0.5 }} />}
            {nodes.map((n) => {
              const on = n.id === focus.id;
              const done = runningId !== null && ORDER.indexOf(n.id) < ORDER.indexOf(runningId);
              return (
                <g key={n.id} transform={`translate(${n.x} ${n.y})`} tabIndex={0} role="button" aria-label={`${n.label}. ${n.hint}`} aria-pressed={on} onKeyDown={(e) => onKey(e, n)} onPointerDown={(e) => { try { (e.currentTarget as SVGGElement).setPointerCapture(e.pointerId); } catch { /* capture unavailable: dragging still works while the pointer stays over the diagram */ } setDrag(n.id); setPicked(n.id); }} className="cursor-grab outline-none focus-visible:[&>rect]:stroke-cobalt active:cursor-grabbing">
                  <rect x={-52} y={-26} width={104} height={52} rx={12} fill={on ? "#315BFA" : done ? "#DCE5FF" : "#ffffff"} stroke={on ? "#315BFA" : "#C9CED8"} strokeWidth={on ? 3 : 2} />
                  <text textAnchor="middle" y={5} fontSize={13} fontWeight={600} fill={on ? "#ffffff" : "#101827"}>{n.label}</text>
                </g>
              );
            })}
          </svg>
        </Panel>
        <Panel title={`Data at this step: ${focus.label}`}>
          <p className="mb-3 text-sm text-[#566075]">{focus.hint}</p>
          <dl className={cn("space-y-2 rounded-xl bg-navy p-4 font-mono text-[12px] leading-relaxed text-ivory")} aria-live="polite">
            {focus.data.map(([k, v]) => (<div key={k} className="flex flex-wrap gap-x-2"><dt className="text-[#8FA5FF]">{k}:</dt><dd>{v}</dd></div>))}
          </dl>
        </Panel>
      </div>
      <ScriptControls script={{ ...s, reset }} nextLabel={s.atEnd ? undefined : `Run: ${byId(ORDER[s.step]).label}`} />
    </div>
  );
}
