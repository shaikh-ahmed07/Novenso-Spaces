import { site } from "@/data/site";

/** Link that opens a WhatsApp chat with Novenso, optionally with a pre-filled message. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
