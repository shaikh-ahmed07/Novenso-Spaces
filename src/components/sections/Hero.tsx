"use client";

import Image from "next/image";
import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import AnimatedText from "@/components/motion/AnimatedText";
import ButtonLink from "@/components/ui/ButtonLink";
import GoldLines from "@/components/ui/GoldLines";
import { EASE } from "@/lib/motion";

const disciplines = ["Interior Design", "PMC", "Execution", "Contracting", "Bespoke Furniture"];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      aria-label="Introduction"
      className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-ink text-ivory"
    >
      <m.div
        className="absolute inset-0 will-change-transform"
        style={{ y: imageY, scale: imageScale }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        <Image
          src="/images/hero/home-hero.jpg"
          alt="Contemporary living room with dark timber panelling, a stone fireplace and floor-to-ceiling windows"
          fill
          priority
          sizes="100vw"
          className="img-grade object-cover object-[60%_center]"
        />
      </m.div>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/35"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/60 via-ink/10 to-transparent" />
      <GoldLines className="right-5 top-24 h-28 opacity-80 md:right-[6%] md:top-28 md:h-52" />

      <m.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-x relative pb-24 pt-32 sm:pb-32 lg:pb-36"
      >
        <m.p
          className="eyebrow mb-7 flex items-center gap-4 text-brass-light"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
        >
          <span className="rule-brass" />
          Novenso Spaces
        </m.p>

        <AnimatedText
          as="h1"
          immediate
          delay={0.45}
          text={"Spaces Designed With Purpose.\nExecuted With Precision."}
          emphasis={["Precision"]}
          className="display-xl max-w-[20ch] text-balance lg:max-w-none lg:text-[clamp(4rem,6vw,6.5rem)]"
        />

        <m.div
          className="mt-6 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-end lg:justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.1 }}
        >
          <p className="lead max-w-xl text-pretty text-ivory/80">
            Novenso Spaces brings together interior design, project management, execution and
            bespoke interior solutions to create spaces that are built to perform and designed to
            inspire.
          </p>
          <div className="flex flex-col gap-3 xs:flex-row">
            <ButtonLink href="/projects" tone="light">
              Explore Our Work
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline" tone="light">
              Talk to Us
            </ButtonLink>
          </div>
        </m.div>
      </m.div>

      {/* Discipline strip + scroll cue */}
      <m.div
        className="absolute inset-x-0 bottom-0 border-t border-ivory/15"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <div className="container-x flex h-16 items-center justify-between gap-6">
          <ul className="no-scrollbar flex items-center gap-6 overflow-x-auto whitespace-nowrap text-[0.65rem] uppercase tracking-[0.24em] text-ivory/55 sm:gap-8">
            {disciplines.map((d, i) => (
              <li key={d} className="flex items-center gap-6 sm:gap-8">
                {i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-brass" />}
                {d}
              </li>
            ))}
          </ul>
          <a
            href="#about"
            className="hidden shrink-0 items-center gap-3 text-[0.65rem] uppercase tracking-[0.24em] text-ivory/70 transition-colors hover:text-ivory md:flex"
          >
            Scroll
            <span className="relative block h-8 w-px overflow-hidden bg-ivory/20">
              <m.span
                className="absolute inset-x-0 top-0 h-1/2 bg-brass-light"
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </a>
        </div>
      </m.div>
    </section>
  );
}
