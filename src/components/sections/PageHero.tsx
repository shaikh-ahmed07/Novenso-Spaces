"use client";

import Image from "next/image";
import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import AnimatedText from "@/components/motion/AnimatedText";
import { EASE } from "@/lib/motion";

type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
  image: string;
  imageAlt: string;
  emphasis?: string[];
  /** Optional row of facts beneath the title (e.g. project meta). */
  meta?: { label: string; value: string }[];
  size?: "md" | "lg";
};

/** Full-bleed image header used at the top of inner pages. */
export default function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  emphasis,
  meta,
  size = "md",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const height =
    size === "lg" ? "md:min-h-[92svh]" : "md:min-h-[82svh]";

  return (
    <section ref={ref} className={`relative flex ${height} items-end overflow-hidden bg-ink text-ivory`}>
      <m.div
        className="absolute inset-0 will-change-transform"
        style={{ y }}
        initial={{ scale: 1.12 }}
        animate={{ scale: 1.02 }}
        transition={{ duration: 2.2, ease: EASE }}
      >
        <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="img-grade object-cover" />
      </m.div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/40" />

      <div className="container-x relative pb-10 pt-28 md:pb-20 md:pt-36">
        <m.p
          className="eyebrow mb-6 flex items-center gap-4 text-brass-light"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        >
          <span className="rule-brass" />
          {eyebrow}
        </m.p>
        <AnimatedText
          as="h1"
          immediate
          delay={0.3}
          text={title}
          emphasis={emphasis}
          className="display-xl max-w-[18ch] text-balance"
        />
        {intro && (
          <m.p
            className="lead mt-5 max-w-2xl text-pretty text-ivory/80 md:mt-7"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.8 }}
          >
            {intro}
          </m.p>
        )}
        {meta && (
          <m.dl
            className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-ivory/15 pt-5 sm:flex sm:flex-wrap sm:gap-x-14"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.9 }}
          >
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="eyebrow text-ivory/45">{item.label}</dt>
                <dd className="mt-1.5 font-display text-lg md:text-xl">{item.value}</dd>
              </div>
            ))}
          </m.dl>
        )}
      </div>
    </section>
  );
}
