import { SITE } from "./site";

export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

/** Returns a wa.me link, or null when no WhatsApp number has been configured. */
export function whatsappUrl(text: string): string | null {
  if (!SITE.whatsapp) return null;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function mailtoUrl(subject: string, body = ""): string | null {
  if (!SITE.email) return null;
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function pageMeta(title: string, description: string, path: string) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | Ragophala Digital`, description, url: path, type: "website" as const, siteName: "Ragophala Digital", locale: "en_ZA" },
    twitter: { card: "summary_large_image" as const, title: `${title} | Ragophala Digital`, description },
  };
}
