import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/utils";

export function FloatingWhatsApp() {
  const href = whatsappUrl("Hi Ragophala Digital, I would like to discuss a project.");
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Chat with Ragophala Digital on WhatsApp" className="fixed bottom-[92px] right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-navy text-ivory shadow-xl transition hover:-translate-y-0.5 hover:bg-cobalt">
      <MessageCircle size={22} aria-hidden />
    </a>
  );
}
