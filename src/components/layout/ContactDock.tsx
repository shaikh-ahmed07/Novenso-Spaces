"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "framer-motion";
import { primaryCta } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { ChatIcon, CloseIcon, WhatsAppIcon } from "@/components/ui/icons";
import { EASE } from "@/lib/motion";

// The chat window is only needed once someone opens it.
const ChatPanel = dynamic(() => import("@/components/chat/ChatPanel"), { ssr: false });

const WA_GREETING = "Hello Novenso Spaces, I'd like to discuss a project.";
const TEASER_KEY = "novenso-chat-teaser-dismissed";

/**
 * Bottom-right contact dock: WhatsApp + chat.
 * On phones, once the visitor scrolls past the first screen, it becomes a
 * thumb-reach bar with "Start a Project" in the middle. It steps aside over
 * the footer, which has its own call to action.
 */
export default function ContactDock() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [bar, setBar] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatLoaded, setChatLoaded] = useState(false);
  const [teaser, setTeaser] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const footerTop = document.querySelector("footer")?.getBoundingClientRect().top ?? Infinity;
    setBar(y > window.innerHeight * 0.8 && footerTop > window.innerHeight && pathname !== "/contact");
  });

  // A single, dismissible nudge after the visitor has had time to look around.
  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(TEASER_KEY) === "1";
    } catch {}
    if (dismissed) return;
    const t = setTimeout(() => setTeaser(true), 12000);
    return () => clearTimeout(t);
  }, []);

  const dismissTeaser = () => {
    setTeaser(false);
    try {
      sessionStorage.setItem(TEASER_KEY, "1");
    } catch {}
  };

  const openChat = useCallback(() => {
    setChatLoaded(true);
    setChatOpen(true);
    setTeaser(false);
    try {
      sessionStorage.setItem(TEASER_KEY, "1");
    } catch {}
  }, []);
  const closeChat = useCallback(() => setChatOpen(false), []);

  // Lock page scroll behind the full-screen chat on phones.
  useEffect(() => {
    if (!chatOpen || !window.matchMedia("(max-width: 767px)").matches) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [chatOpen]);

  const showBar = bar && !chatOpen;

  return (
    <>
      {chatLoaded && <ChatPanel open={chatOpen} onClose={closeChat} />}

      {/* Floating buttons (desktop always; phones until the bar takes over) */}
      <div
        className={`fixed bottom-4 right-4 z-30 flex flex-col items-end gap-3 transition-[opacity,transform] duration-500 md:bottom-6 md:right-6 ${
          showBar ? "pointer-events-none translate-y-4 opacity-0 md:pointer-events-auto md:translate-y-0 md:opacity-100" : ""
        } ${chatOpen ? "max-md:hidden" : ""}`}
      >
        <AnimatePresence>
          {teaser && !chatOpen && (
            <m.div
              className="relative mr-1 max-w-[240px] border border-ink/10 bg-ivory p-4 pr-9 shadow-[0_20px_50px_-15px_rgba(15,14,13,0.35)]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <button type="button" onClick={openChat} className="text-left">
                <span className="block font-display text-lg leading-tight text-ink">Planning a space?</span>
                <span className="mt-1 block text-[0.85rem] leading-snug text-ash">
                  Tell us about it. We&apos;ll point you in the right direction.
                </span>
              </button>
              <button
                type="button"
                onClick={dismissTeaser}
                aria-label="Dismiss"
                className="absolute right-1.5 top-1.5 flex h-8 w-8 items-center justify-center text-taupe hover:text-ink"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </m.div>
          )}
        </AnimatePresence>

        <a
          href={whatsappLink(WA_GREETING)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className={`${chatOpen ? "hidden" : "flex"} h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] transition-transform hover:scale-105`}
        >
          <WhatsAppIcon className="h-6 w-6" />
        </a>

        <button
          type="button"
          onClick={chatOpen ? closeChat : openChat}
          aria-label={chatOpen ? "Close chat" : "Open chat"}
          aria-expanded={chatOpen}
          className="group flex h-14 w-14 items-center justify-center gap-3 rounded-full border border-brass/60 bg-ink text-ivory md:w-auto md:pl-4 md:pr-5 shadow-[0_14px_40px_-10px_rgba(0,0,0,0.55)] transition-colors hover:bg-charcoal"
        >
          {chatOpen ? <CloseIcon /> : <ChatIcon className="h-5 w-5 text-brass-light" />}
          <span className="hidden text-[0.72rem] font-semibold uppercase tracking-[0.18em] md:inline">
            {chatOpen ? "Close" : "Chat with us"}
          </span>
        </button>
      </div>

      {/* Phone bar */}
      <AnimatePresence>
        {showBar && (
          <m.div
            className="pb-safe fixed inset-x-0 bottom-0 z-30 border-t border-ivory/10 bg-ink/95 px-3 pt-3 backdrop-blur-md md:hidden"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div className="flex gap-2.5">
              <a
                href={whatsappLink(WA_GREETING)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp us"
                className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#25D366] text-white"
              >
                <WhatsAppIcon className="h-6 w-6" />
              </a>
              <Link
                href={primaryCta.href}
                className="flex h-12 flex-1 items-center justify-center gap-2 bg-brass text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ink"
              >
                {primaryCta.label} <span aria-hidden>→</span>
              </Link>
              <button
                type="button"
                onClick={openChat}
                aria-label="Open chat"
                className="flex h-12 w-12 shrink-0 items-center justify-center border border-brass/60 text-brass-light"
              >
                <ChatIcon className="h-5 w-5" />
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
