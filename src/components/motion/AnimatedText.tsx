"use client";

import { m } from "framer-motion";
import { EASE, viewportOnce } from "@/lib/motion";

type Props = {
  /** Text to animate. Use "\n" to force line breaks. */
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  /** Animate on mount instead of when scrolled into view (e.g. hero headings). */
  immediate?: boolean;
  /** Words rendered in italic brass for emphasis. */
  emphasis?: string[];
};

/**
 * Word-by-word masked reveal. Each word rises from behind a clipping mask,
 * which reads as refined rather than showy.
 */
export default function AnimatedText({
  text,
  as = "h2",
  className,
  delay = 0,
  immediate = false,
  emphasis = [],
}: Props) {
  const Tag = m[as];
  const lines = text.split("\n");
  let wordIndex = 0;

  const trigger = immediate
    ? { initial: "hidden", animate: "show" }
    : { initial: "hidden", whileInView: "show", viewport: viewportOnce };

  return (
    <Tag className={className} aria-label={text.replace(/\n/g, " ")} {...trigger}>
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden>
          {line.split(" ").map((word) => {
            const i = wordIndex++;
            const clean = word.replace(/[.,]/g, "");
            const isEm = emphasis.includes(clean);
            return (
              <span
                key={`${word}-${i}`}
                className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom"
              >
                <m.span
                  className={`inline-block will-change-transform ${isEm ? "italic text-brass" : ""}`}
                  variants={{
                    hidden: { y: "110%" },
                    show: {
                      y: "0%",
                      transition: { duration: 0.8, ease: EASE, delay: delay + i * 0.035 },
                    },
                  }}
                >
                  {word}
                </m.span>
                {" "}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
