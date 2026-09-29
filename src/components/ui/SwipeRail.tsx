"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  /** Width of each slide on phones, e.g. "w-[82%]". */
  itemClassName?: string;
  /** Layout from `md` up, e.g. "md:grid-cols-3". The rail becomes a grid there. */
  gridClassName?: string;
  tone?: "light" | "dark";
  label: string;
  /** Set false to keep the swipe rail at every width (parent hides it on desktop). */
  desktopGrid?: boolean;
};

/**
 * On phones: a native, snap-scrolling horizontal rail with a progress bar and
 * counter, so long lists become a quick swipe instead of a long scroll.
 * From `md` up: a regular grid.
 */
export default function SwipeRail({
  children,
  itemClassName = "w-[82%] xs:w-[70%] sm:w-[46%]",
  gridClassName = "md:grid-cols-3",
  tone = "light",
  label,
  desktopGrid = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const onScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const p = max > 0 ? el.scrollLeft / max : 0;
    setProgress(p);
    setIndex(Math.round(p * (items.length - 1)));
  }, [items.length]);

  useEffect(() => {
    onScroll();
  }, [onScroll]);

  const go = (dir: 1 | -1) => {
    const el = ref.current;
    const first = el?.children[0] as HTMLElement | undefined;
    if (!el || !first) return;
    el.scrollBy({ left: dir * (first.offsetWidth + 14), behavior: "smooth" });
  };

  const muted = tone === "dark" ? "text-ivory/55" : "text-ash";
  const track = tone === "dark" ? "bg-ivory/15" : "bg-ink/10";
  const btn =
    tone === "dark"
      ? "border-ivory/25 text-ivory active:bg-ivory/10"
      : "border-ink/20 text-ink active:bg-ink/5";

  return (
    <div>
      <div
        ref={ref}
        onScroll={onScroll}
        role="region"
        aria-label={label}
        className={
          desktopGrid
            ? `rail md:m-0 md:grid md:gap-6 md:overflow-visible md:p-0 lg:gap-8 ${gridClassName}`
            : "rail"
        }
      >
        {items.map((child, i) => (
          <div key={i} className={desktopGrid ? `${itemClassName} md:w-auto` : itemClassName}>
            {child}
          </div>
        ))}
      </div>

      {/* Mobile controls */}
      <div className={`mt-6 flex items-center gap-4 ${desktopGrid ? "md:hidden" : ""}`} aria-hidden>
        <span className={`font-display text-sm tabular-nums ${muted}`}>
          {String(index + 1).padStart(2, "0")}
          <span className="mx-1 opacity-50">/</span>
          {String(items.length).padStart(2, "0")}
        </span>
        <span className={`relative h-px flex-1 overflow-hidden ${track}`}>
          <span
            className="absolute inset-y-0 left-0 bg-brass transition-[width] duration-200"
            style={{ width: `${Math.max(1 / items.length, progress) * 100}%` }}
          />
        </span>
        <span className="flex gap-2">
          <button type="button" tabIndex={-1} onClick={() => go(-1)} className={`flex h-10 w-10 items-center justify-center border ${btn}`}>
            ←
          </button>
          <button type="button" tabIndex={-1} onClick={() => go(1)} className={`flex h-10 w-10 items-center justify-center border ${btn}`}>
            →
          </button>
        </span>
      </div>
    </div>
  );
}
