"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import type { ProjectImage } from "@/data/projects";
import { EASE, viewportOnce } from "@/lib/motion";

// Editorial layout pattern: wide, then two side by side, repeating.
const layout = [
  "md:col-span-12 aspect-[16/10] md:aspect-[16/8]",
  "md:col-span-7 aspect-[4/3]",
  "md:col-span-5 aspect-[4/3] md:aspect-auto",
  "md:col-span-5 aspect-[4/5]",
  "md:col-span-7 aspect-[4/3] md:aspect-auto",
];

/** Pick a layout slot; an image left alone on its row spans the full width. */
const slot = (i: number, total: number) => {
  const pos = i % layout.length;
  const alone = i === total - 1 && (pos === 1 || pos === 3);
  return alone ? layout[0] : layout[pos];
};

export default function ProjectGallery({ images, title }: { images: ProjectImage[]; title: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, step]);

  // With known sizes, lay images out in justified rows (up to 3 per row) at their
  // true proportions, so small or portrait photos are never cropped or blown up.
  const justified = images.every((img) => img.width && img.height);
  const rows = justified
    ? Array.from({ length: Math.ceil(images.length / 3) }, (_, r) => images.slice(r * 3, r * 3 + 3))
    : [];

  const tile = (img: ProjectImage, i: number) => {
    const ratio = justified ? img.width! / img.height! : 0;
    return (
          <m.button
            key={img.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Open image ${i + 1} of ${images.length}: ${img.alt}`}
            style={justified ? { aspectRatio: `${img.width} / ${img.height}`, flex: `${ratio} 1 0%` } : undefined}
            className={`group relative w-full cursor-zoom-in overflow-hidden bg-bone ${justified ? "" : slot(i, images.length)}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: EASE, delay: (i % 2) * 0.1 }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes={justified || slot(i, images.length) !== layout[0] ? "(min-width: 768px) 58vw, 100vw" : "100vw"}
              className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-luxe)] group-hover:scale-[1.04]"
            />
          </m.button>
    );
  };

  return (
    <>
      {justified ? (
        <div className="flex flex-col gap-4 md:gap-6">
          {rows.map((row, r) => (
            <div key={r} className="flex flex-col gap-4 md:flex-row md:gap-6">
              {row.map((img, j) => tile(img, r * 3 + j))}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">{images.map(tile)}</div>
      )}

      <AnimatePresence>
        {index !== null && (
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} gallery`}
            className="fixed inset-0 z-[60] flex flex-col bg-ink/97 text-ivory"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="container-x flex h-20 shrink-0 items-center justify-between">
              <span className="eyebrow text-ivory/60">
                {index + 1} / {images.length}
              </span>
              <button
                type="button"
                onClick={close}
                autoFocus
                className="min-h-11 px-2 text-[0.7rem] uppercase tracking-[0.24em] text-ivory/80 hover:text-ivory"
              >
                Close ✕
              </button>
            </div>

            <div className="relative flex-1" onClick={close}>
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={index}
                  className="absolute inset-4 md:inset-x-24 md:inset-y-4"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <Image
                    src={images[index].src}
                    alt={images[index].alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </m.div>
              </AnimatePresence>
            </div>

            <div className="container-x flex h-24 shrink-0 items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => step(-1)}
                className="min-h-12 min-w-12 text-[0.7rem] uppercase tracking-[0.24em] text-ivory/80 hover:text-brass-light"
              >
                ← Prev
              </button>
              <p className="line-clamp-2 text-center text-xs text-ivory/50 sm:text-sm">{images[index].alt}</p>
              <button
                type="button"
                onClick={() => step(1)}
                className="min-h-12 min-w-12 text-[0.7rem] uppercase tracking-[0.24em] text-ivory/80 hover:text-brass-light"
              >
                Next →
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
