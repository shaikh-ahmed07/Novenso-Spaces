"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import {
  enquiryMessage,
  greeting,
  respond,
  submittedTurn,
  whatsappMessage,
  type InputMode,
  type Lead,
  type Link as ChatLink,
  type Step,
  type Turn,
} from "./script";
import { CloseIcon, SendIcon, WhatsAppIcon } from "@/components/ui/icons";
import { whatsappLink } from "@/lib/whatsapp";
import { EASE } from "@/lib/motion";

type Message = { id: number; from: "them" | "me"; text?: string; links?: ChatLink[] };

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
/** Natural pause before each message: longer lines take a little longer to "write". */
const typingTime = (text: string) => Math.min(1500, Math.max(550, 280 + text.length * 16));

export default function ChatPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [replies, setReplies] = useState<string[]>([]);
  const [input, setInput] = useState<InputMode>(null);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const step = useRef<Step>("menu");
  const lead = useRef<Lead>({});
  const idRef = useRef(0);
  const busy = useRef(false);
  const started = useRef(false);
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const push = (msg: Omit<Message, "id">) => setMessages((list) => [...list, { ...msg, id: ++idRef.current }]);

  const play = useCallback(async (turn: Turn) => {
    busy.current = true;
    setReplies([]);
    setInput(null);
    for (const line of turn.say) {
      setTyping(true);
      await wait(typingTime(line));
      setTyping(false);
      push({ from: "them", text: line });
      await wait(160);
    }
    if (turn.links?.length) push({ from: "them", links: turn.links });
    step.current = turn.next;
    if (turn.lead) lead.current = turn.lead;
    setReplies(turn.replies ?? []);
    setInput(turn.input ?? null);
    busy.current = false;
  }, []);

  // Start the conversation the first time the panel opens.
  useEffect(() => {
    if (open && !started.current) {
      started.current = true;
      play(greeting());
    }
  }, [open, play]);

  // Keep the latest message in view.
  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, replies]);

  // Focus the text field when it appears (desktop only, to avoid popping the phone keyboard).
  useEffect(() => {
    if (input && open && window.matchMedia("(min-width: 768px)").matches) inputRef.current?.focus();
  }, [input, open]);

  // Escape closes the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const send = async (raw: string) => {
    const text = raw.trim();
    if (!text || busy.current) return;
    push({ from: "me", text });
    setDraft("");

    const turn = respond(step.current, text, lead.current);
    if (turn.lead) lead.current = turn.lead;

    // Open WhatsApp synchronously so the browser treats it as a user action.
    if (turn.action === "whatsapp") window.open(whatsappLink(whatsappMessage(lead.current)), "_blank", "noopener");

    if (turn.action === "submit") {
      busy.current = true;
      setReplies([]);
      setInput(null);
      setTyping(true);
      let ok = false;
      try {
        const l = lead.current;
        const res = await fetch("/api/enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source: "chat",
            name: l.name,
            phone: l.phone,
            email: l.email ?? "",
            projectType: l.projectType,
            budget: l.budget,
            message: enquiryMessage(l),
          }),
        });
        ok = res.ok;
      } catch {
        ok = false;
      }
      await wait(700);
      setTyping(false);
      busy.current = false;
      return play(submittedTurn(lead.current, ok));
    }

    play(turn);
  };

  return (
    <AnimatePresence>
      {open && (
        <m.div
          role="dialog"
          aria-modal="false"
          aria-label="Chat with Novenso Spaces"
          className="fixed inset-0 z-[60] flex flex-col bg-ivory md:inset-auto md:bottom-24 md:right-6 md:h-[min(640px,calc(100vh-8rem))] md:w-[400px] md:border md:border-ink/10 md:shadow-[0_30px_80px_-20px_rgba(15,14,13,0.45)]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 bg-ink px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] text-ivory md:py-4">
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center border border-brass/50 bg-charcoal">
              <Image src="/brand/novenso-monogram.png" alt="" width={457} height={569} className="h-6 w-auto" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg leading-tight">Novenso Studio</p>
              <p className="truncate text-[0.72rem] text-ivory/55">Interior design · PMC · Execution</p>
            </div>
            <a
              href={whatsappLink("Hello Novenso Spaces, I'd like to discuss a project.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Continue on WhatsApp"
              className="flex h-10 w-10 items-center justify-center border border-ivory/15 text-[#25D366] transition-colors hover:border-[#25D366]/60"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close chat"
              className="flex h-10 w-10 items-center justify-center border border-ivory/15 text-ivory/80 transition-colors hover:text-ivory"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Conversation */}
          <div ref={scroller} className="flex-1 overflow-y-auto overscroll-contain px-4 py-5" aria-live="polite">
            <p className="mb-5 text-center text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-taupe">
              Today
            </p>
            <ul className="flex flex-col gap-2">
              {messages.map((msg, i) => {
                const prev = messages[i - 1];
                const grouped = prev && prev.from === msg.from;
                return (
                  <m.li
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"} ${grouped ? "" : "mt-2"}`}
                  >
                    {msg.text && (
                      <p
                        className={`max-w-[85%] whitespace-pre-line px-4 py-2.5 text-[0.95rem] leading-relaxed ${
                          msg.from === "me"
                            ? "bg-ink text-ivory"
                            : "border border-ink/8 bg-white text-charcoal shadow-[0_1px_2px_rgba(15,14,13,0.04)]"
                        }`}
                      >
                        {msg.text}
                      </p>
                    )}
                    {msg.links && (
                      <div className="flex w-[85%] flex-col border border-ink/10 bg-white">
                        {msg.links.map((l) => {
                          const cls =
                            "flex min-h-11 items-center justify-between gap-3 border-b border-ink/8 px-4 py-2 text-[0.9rem] text-ink transition-colors last:border-b-0 hover:bg-bone/60";
                          return l.external ? (
                            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={cls}>
                              {l.label}
                              <span aria-hidden className="text-brass-deep">↗</span>
                            </a>
                          ) : (
                            <Link key={l.href} href={l.href} className={cls} onClick={() => window.matchMedia("(max-width: 767px)").matches && onClose()}>
                              {l.label}
                              <span aria-hidden className="text-brass-deep">→</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </m.li>
                );
              })}

              {typing && (
                <li className="mt-2 flex justify-start" aria-label="Typing">
                  <span className="flex items-center gap-1.5 border border-ink/8 bg-white px-4 py-3.5">
                    {[0, 1, 2].map((d) => (
                      <m.span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full bg-taupe"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }}
                      />
                    ))}
                  </span>
                </li>
              )}
            </ul>

            {/* Quick replies */}
            {replies.length > 0 && (
              <m.div
                className="mt-4 flex flex-wrap justify-end gap-2"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                {replies.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => send(r)}
                    className="min-h-10 border border-brass/60 bg-ivory px-3.5 text-[0.85rem] text-ink transition-colors hover:bg-brass hover:text-ink active:bg-brass"
                  >
                    {r}
                  </button>
                ))}
              </m.div>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
            }}
            className="pb-safe flex items-center gap-2 border-t border-ink/10 bg-ivory px-3 pt-3"
          >
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              disabled={!input}
              type={input?.type === "tel" ? "tel" : input?.type === "email" ? "email" : "text"}
              inputMode={input?.type === "tel" ? "tel" : input?.type === "email" ? "email" : "text"}
              autoComplete={input?.type === "tel" ? "tel" : input?.type === "email" ? "email" : "off"}
              placeholder={input?.placeholder ?? (typing ? "…" : "Choose an option above")}
              aria-label="Your message"
              className="h-12 min-w-0 flex-1 border border-ink/15 bg-white px-4 text-base text-ink placeholder:text-taupe focus:border-ink focus:outline-none disabled:bg-bone/50"
            />
            <button
              type="submit"
              disabled={!input || !draft.trim()}
              aria-label="Send"
              className="flex h-12 w-12 shrink-0 items-center justify-center bg-ink text-ivory transition-colors hover:bg-brass hover:text-ink disabled:opacity-40"
            >
              <SendIcon />
            </button>
          </form>
        </m.div>
      )}
    </AnimatePresence>
  );
}
