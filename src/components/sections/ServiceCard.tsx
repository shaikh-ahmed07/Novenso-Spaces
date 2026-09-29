"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import type { Service } from "@/data/services";
import { EASE, viewportOnce } from "@/lib/motion";

type Props = { service: Service; order: number };

/**
 * Service tile. Phones: image + always-visible summary. Desktop: summary
 * reveals on hover while the image slowly zooms.
 */
export default function ServiceCard({ service, order }: Props) {
  return (
    <m.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease: EASE, delay: (order % 3) * 0.08 }}
      className="group h-full"
    >
      <Link
        href={`/services#${service.slug}`}
        className="flex h-full flex-col border border-ivory/10 bg-ink/40 transition-colors duration-500 hover:border-brass/60"
      >
        <div className="relative aspect-[4/3] overflow-hidden md:aspect-[4/5]">
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 82vw"
            className="img-grade object-cover transition-transform duration-[1400ms] ease-[var(--ease-luxe)] group-hover:scale-[1.06]"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/30" />
          <span className="absolute left-5 top-4 font-display text-4xl italic text-brass-light md:text-5xl">
            {service.index}
          </span>
          <h3 className="absolute inset-x-5 bottom-4 font-display text-[1.65rem] leading-tight text-ivory md:bottom-6 md:text-[2rem]">
            {service.title}
          </h3>
        </div>
        <div className="flex flex-1 flex-col p-5 md:p-6">
          <p className="text-[0.92rem] leading-relaxed text-ivory/70">{service.short}</p>
          <span className="mt-auto flex items-center gap-3 pt-5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-6 bg-brass-light transition-all duration-500 group-hover:w-12" />
            Learn more
          </span>
        </div>
      </Link>
    </m.article>
  );
}
