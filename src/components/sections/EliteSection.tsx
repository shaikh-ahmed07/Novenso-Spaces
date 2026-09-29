import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import ButtonLink from "@/components/ui/ButtonLink";
import FadeIn from "@/components/motion/FadeIn";
import SwipeRail from "@/components/ui/SwipeRail";
import GoldLines from "@/components/ui/GoldLines";
import EliteShowcase from "./EliteShowcase";
import { eliteServices } from "@/data/content";

/** Homepage teaser for the Elite Services offering. */
export default function EliteSection() {
  return (
    <section className="section-y relative overflow-hidden bg-ink text-ivory">
      <GoldLines className="bottom-0 left-5 h-32 md:left-auto md:right-[6%] md:top-0 md:h-full md:opacity-40" />

      <div className="container-x relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
          <SectionHeading
            tone="light"
            eyebrow="Elite Services"
            title="Made for one space. Made for you."
            emphasis={["you."]}
            intro="Bespoke sofas, furniture, upholstery and interior components, crafted to measure."
          />
          <FadeIn className="hidden shrink-0 md:block">
            <ButtonLink href="/elite-services" variant="outline" tone="light">
              Explore Elite Services
            </ButtonLink>
          </FadeIn>
        </div>

        {/* Phones & tablets */}
        <div className="mt-10 lg:hidden">
          <SwipeRail tone="dark" label="Elite services" itemClassName="w-[78%] xs:w-[66%] sm:w-[44%]" desktopGrid={false}>
            {eliteServices.map((s, i) => (
              <article key={s.title} className="h-full">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image src={s.image} alt={s.imageAlt} fill sizes="78vw" className="img-grade object-cover" />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                  <div className="absolute inset-x-4 bottom-4">
                    <span className="font-display text-sm italic text-brass-light">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-1 font-display text-2xl leading-tight">{s.title}</h3>
                    <p className="mt-2 text-[0.85rem] leading-relaxed text-ivory/70">{s.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </SwipeRail>
          <div className="mt-8">
            <ButtonLink href="/elite-services" variant="outline" tone="light" className="w-full md:w-auto">
              Explore Elite Services
            </ButtonLink>
          </div>
        </div>

        {/* Desktop */}
        <FadeIn className="mt-20 hidden lg:block">
          <EliteShowcase />
        </FadeIn>
      </div>
    </section>
  );
}
