"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useInView, useScroll, useTransform } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import SwipeRail from "@/components/ui/SwipeRail";
import { processSteps, type ProcessStep } from "@/data/content";
import { EASE } from "@/lib/motion";

/** Desktop step: activates as it crosses the middle of the viewport. */
function Step({
  step,
  index,
  active,
  onActive,
}: {
  step: ProcessStep;
  index: number;
  active: boolean;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li ref={ref} className="relative min-h-[46vh] py-10 pl-16">
      <span
        aria-hidden
        className={`absolute left-[7px] top-[3.3rem] h-[9px] w-[9px] rotate-45 border transition-colors duration-500 ${
          active ? "border-brass bg-brass" : "border-ink/30 bg-bone"
        }`}
      />
      <div className="flex items-baseline gap-5">
        <span className={`font-display text-lg italic transition-colors duration-500 ${active ? "text-brass-deep" : "text-ink/30"}`}>
          {step.index}
        </span>
        <h3 className={`font-display text-5xl transition-colors duration-500 xl:text-6xl ${active ? "text-ink" : "text-ink/30"}`}>
          {step.title}
        </h3>
      </div>
      <p className={`mt-5 max-w-md text-pretty leading-relaxed transition-colors duration-500 ${active ? "text-ash" : "text-ash/50"}`}>
        {step.description}
      </p>
    </li>
  );
}

/** Phone/tablet step card for the swipe rail. */
function StepCard({ step }: { step: ProcessStep }) {
  return (
    <article className="flex h-full flex-col bg-ivory">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={step.image} alt={step.imageAlt} fill sizes="80vw" className="img-grade object-cover" />
        <span className="absolute left-4 top-3 font-display text-5xl italic text-ivory drop-shadow">{step.index}</span>
      </div>
      <div className="flex-1 border border-t-0 border-ink/10 p-5">
        <h3 className="font-display text-3xl text-ink">{step.title}</h3>
        <p className="mt-2 text-[0.92rem] leading-relaxed text-ash">{step.description}</p>
      </div>
    </article>
  );
}

export default function ProcessSection() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 60%", "end 60%"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const current = processSteps[active];

  return (
    <section className="section-y relative bg-bone">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our Process"
          title="From concept to creation."
          emphasis={["creation."]}
          intro="One team, one process. A seamless journey from the first idea to a fully realised space."
        />

        {/* Phones & tablets: swipe through the steps */}
        <div className="mt-10 lg:hidden">
          <SwipeRail label="Process steps" itemClassName="w-[80%] xs:w-[68%] sm:w-[45%]" desktopGrid={false}>
            {processSteps.map((step) => (
              <StepCard key={step.index} step={step} />
            ))}
          </SwipeRail>
        </div>

        {/* Desktop: sticky image with scroll-driven timeline */}
        <div className="mt-20 hidden grid-cols-12 gap-16 lg:grid">
          <div className="col-span-6">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden bg-stone">
                <AnimatePresence initial={false}>
                  <m.div
                    key={current.image}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: EASE }}
                  >
                    <Image src={current.image} alt={current.imageAlt} fill sizes="45vw" className="img-grade object-cover" />
                  </m.div>
                </AnimatePresence>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-ink/80 to-transparent p-8">
                  <span className="font-display text-8xl italic leading-none text-ivory">{current.index}</span>
                  <span className="eyebrow text-brass-light">{current.title}</span>
                </div>
              </div>
            </div>
          </div>

          <ol ref={listRef} className="relative col-span-6">
            <span aria-hidden className="absolute bottom-0 left-[11px] top-0 w-px bg-ink/10" />
            <m.span
              aria-hidden
              style={{ scaleY: lineScale }}
              className="absolute bottom-0 left-[11px] top-0 w-px origin-top bg-brass"
            />
            {processSteps.map((step, i) => (
              <Step key={step.index} step={step} index={i} active={i === active} onActive={setActive} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
