import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/utils";

export function FloatingWhatsApp() {
  const href = whatsappUrl("Hi Ragophala Digital, I would like to discuss a project.");
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Chat with Ragophala Digital on WhatsApp" className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-105">
      <MessageCircle size={26} aria-hidden />
    </a>
  );
}
