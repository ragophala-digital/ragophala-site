import Link from "next/link";
import { Fragment, type ReactNode } from "react";

/** Minimal, safe formatter for assistant replies: paragraphs, "-" lists, **bold** and internal links. No raw HTML is ever rendered. */
const INLINE = /(\*\*[^*]+\*\*|\[[^\]]+\]\(\/[^)\s]*\)|(?<![\w/])\/(?:contact|smart-intake|quote|process|faq|about|services|web-development|web-applications|ai-agents|business-automation|website-maintenance|ai-support|privacy)(?![\w-]))/g;

function inline(text: string): ReactNode[] {
  return text.split(INLINE).map((part, i) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
    const md = part.match(/^\[([^\]]+)\]\((\/[^)\s]*)\)$/);
    if (md) return <Link key={i} href={md[2]} className="font-medium text-cobalt underline underline-offset-2">{md[1]}</Link>;
    if (/^\/[a-z-]+$/.test(part)) return <Link key={i} href={part} className="font-medium text-cobalt underline underline-offset-2">{part}</Link>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function Markdown({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  let list: string[] = [];
  let ordered = false;
  const flush = () => {
    if (!list.length) return;
    const Tag = ordered ? "ol" : "ul";
    blocks.push(
      <Tag key={blocks.length} className={ordered ? "my-2 list-decimal space-y-1 pl-5" : "my-2 list-disc space-y-1 pl-5"}>
        {list.map((li, i) => (<li key={i}>{inline(li)}</li>))}
      </Tag>,
    );
    list = [];
  };
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    const bullet = line.match(/^[-*•]\s+(.*)$/);
    const num = line.match(/^\d+[.)]\s+(.*)$/);
    if (bullet || num) {
      if (list.length && ordered !== Boolean(num)) flush();
      ordered = Boolean(num);
      list.push((bullet ?? num)![1]);
      continue;
    }
    flush();
    if (line) blocks.push(<p key={blocks.length} className="my-1.5 first:mt-0 last:mb-0">{inline(line)}</p>);
  }
  flush();
  return <>{blocks}</>;
}
