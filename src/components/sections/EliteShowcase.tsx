"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { eliteServices } from "@/data/content";
import { EASE } from "@/lib/motion";

/**
 * Interactive index of elite services: hovering (or tapping) a line swaps the
 * large image. Feels like browsing a private catalogue rather than a grid.
 */
export default function EliteShowcase() {
  const [active, setActive] = useState(0);
  const current = eliteServices[active];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="relative aspect-[4/5] overflow-hidden bg-charcoal sm:aspect-[16/11] lg:order-2 lg:col-span-6 lg:aspect-[4/5]">
        <AnimatePresence initial={false}>
          <m.div
            key={current.image}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <Image src={current.image} alt={current.imageAlt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="img-grade object-cover" />
          </m.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
        <AnimatePresence mode="wait">
          <m.p
            key={current.title}
            className="absolute inset-x-6 bottom-6 max-w-md text-pretty leading-relaxed text-ivory/85 md:inset-x-10 md:bottom-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {current.description}
          </m.p>
        </AnimatePresence>
      </div>

      <ul className="flex flex-col justify-center border-t border-ivory/10 lg:order-1 lg:col-span-6">
        {eliteServices.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.title} className="border-b border-ivory/10">
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={on}
                className="group flex w-full items-center gap-5 py-5 text-left md:py-6"
              >
                <span className={`font-display text-sm italic transition-colors duration-500 ${on ? "text-brass-light" : "text-ivory/30"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`font-display text-[1.65rem] font-light leading-tight transition-all duration-500 ease-[var(--ease-luxe)] sm:text-3xl md:text-4xl ${
                    on ? "translate-x-2 text-ivory" : "text-ivory/45 group-hover:text-ivory/75"
                  }`}
                >
                  {s.title}
                </span>
                <span
                  aria-hidden
                  className={`ml-auto h-px bg-brass-light transition-all duration-700 ease-[var(--ease-luxe)] ${on ? "w-10 md:w-16" : "w-0"}`}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
