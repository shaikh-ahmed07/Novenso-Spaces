"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "framer-motion";
import { primaryCta, site } from "@/data/site";
import { EASE } from "@/lib/motion";

/**
 * Thumb-reach action bar for phones. Appears once the visitor scrolls past
 * the first screen; hidden on the contact page where the form is the action.
 */
export default function MobileActionBar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const doc = document.documentElement;
    const nearEnd = y + window.innerHeight > doc.scrollHeight - 320; // leave the footer uncovered
    setShow(y > window.innerHeight * 0.8 && !nearEnd);
  });

  if (pathname === "/contact") return null;

  return (
    <AnimatePresence>
      {show && (
        <m.div
          className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-ivory/10 bg-ink/95 px-4 pt-3 backdrop-blur-md md:hidden"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <div className="flex gap-3">
            <a
              href={`mailto:${site.email}`}
              aria-label={`Email ${site.email}`}
              className="flex h-12 w-12 shrink-0 items-center justify-center border border-ivory/25 text-ivory"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                <rect x="3" y="5" width="18" height="14" />
                <path d="M3 6l9 7 9-7" />
              </svg>
            </a>
            <Link
              href={primaryCta.href}
              className="flex h-12 flex-1 items-center justify-center gap-3 bg-brass text-[0.72rem] font-bold uppercase tracking-[0.2em] text-ink"
            >
              {primaryCta.label}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
