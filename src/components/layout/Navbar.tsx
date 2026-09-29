"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "framer-motion";
import Logo from "./Logo";
import { mainNav, primaryCta, site } from "@/data/site";
import { EASE } from "@/lib/motion";

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    // Tuck the bar away while reading down; bring it back on any upward scroll.
    setHidden(y > 480 && y > prev + 4);
    if (y < prev - 4) setHidden(false);
  });

  // Close the menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Lock page scroll + allow Escape to close while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled && !open;
  const light = !solid; // light text on transparent bar (over dark hero / open menu)

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <m.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div
          className={`transition-[background-color,border-color,backdrop-filter] duration-500 ${
            solid
              ? "border-b border-ink/5 bg-ivory/90 backdrop-blur-md"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <nav
            aria-label="Main"
            className={`container-x flex items-center justify-between transition-[height] duration-500 ${
              solid ? "h-18 lg:h-20" : "h-20 lg:h-24"
            }`}
          >
            <Logo tone={light ? "light" : "dark"} />

            <ul className="hidden items-center gap-9 lg:flex">
              {mainNav.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`group relative py-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
                        light ? "text-ivory/85 hover:text-ivory" : "text-charcoal/80 hover:text-ink"
                      }`}
                    >
                      {item.label}
                      <span
                        className={`absolute -bottom-0.5 left-0 h-px bg-brass transition-all duration-500 ease-[var(--ease-luxe)] ${
                          active ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-4">
              <Link
                href={primaryCta.href}
                className={`hidden min-h-11 items-center border px-6 text-[0.68rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-500 sm:inline-flex ${
                  light
                    ? "border-brass/70 text-ivory hover:border-brass hover:bg-brass hover:text-ink"
                    : "border-ink bg-ink text-ivory hover:border-brass hover:bg-brass hover:text-ink"
                }`}
              >
                {primaryCta.label}
              </Link>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="relative -mr-2 flex h-12 w-12 items-center justify-center lg:hidden"
              >
                <span className="relative block h-3 w-7">
                  <m.span
                    className={`absolute left-0 top-0 h-px w-full ${light ? "bg-ivory" : "bg-ink"}`}
                    animate={open ? { top: "50%", rotate: 45 } : { top: "0%", rotate: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  />
                  <m.span
                    className={`absolute bottom-0 right-0 h-px ${light ? "bg-ivory" : "bg-ink"}`}
                    animate={
                      open
                        ? { bottom: "50%", rotate: -45, width: "100%" }
                        : { bottom: "0%", rotate: 0, width: "65%" }
                    }
                    transition={{ duration: 0.45, ease: EASE }}
                  />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </m.header>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink text-ivory lg:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="container-x flex flex-1 flex-col overflow-y-auto pb-10 pt-28">
              <ul className="flex flex-col">
                {mainNav.map((item, i) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.href} className="overflow-hidden border-b border-ivory/10">
                      <m.div
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "100%", transition: { duration: 0.3 } }}
                        transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className="flex items-baseline justify-between py-4"
                        >
                          <span
                            className={`font-display text-[2rem] leading-none xs:text-[2.3rem] ${
                              active ? "italic text-brass-light" : ""
                            }`}
                          >
                            {item.label}
                          </span>
                          <span className="text-[0.65rem] tracking-[0.2em] text-ivory/40">
                            0{i + 1}
                          </span>
                        </Link>
                      </m.div>
                    </li>
                  );
                })}
              </ul>

              <m.div
                className="mt-auto pt-10"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
              >
                <Link
                  href={primaryCta.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 w-full items-center justify-center bg-brass text-[0.72rem] font-medium uppercase tracking-[0.24em] text-ink"
                >
                  {primaryCta.label}
                </Link>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-6 block text-center text-sm tracking-wide text-ivory/60"
                >
                  {site.email}
                </a>
              </m.div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
