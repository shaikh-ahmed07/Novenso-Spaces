import SectionHeading from "@/components/ui/SectionHeading";
import ParallaxImage from "@/components/motion/ParallaxImage";
import FadeIn from "@/components/motion/FadeIn";
import SwipeRail from "@/components/ui/SwipeRail";
import { differentiators } from "@/data/content";

export default function WhySection() {
  const [lead, ...rest] = differentiators;
  return (
    <section className="section-y bg-ivory">
      <div className="container-x">
        <SectionHeading
          eyebrow="Why Novenso Spaces"
          title="What working with us actually means."
          emphasis={["actually"]}
        />

        <div className="mt-10 grid gap-8 md:mt-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="relative">
                <ParallaxImage
                  src="/images/site/why.jpg"
                  alt="Craftsman's hands measuring a timber joint with a steel rule"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="aspect-[16/10] w-full lg:aspect-[4/5]"
                />
                <FadeIn className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-5 pt-16 text-ivory md:p-8 md:pt-24">
                  <span className="font-display text-sm italic text-brass-light">01</span>
                  <h3 className="mt-1 font-display text-2xl leading-tight md:text-4xl">{lead.title}</h3>
                  <p className="mt-2 max-w-md text-pretty text-[0.9rem] leading-relaxed text-ivory/75">{lead.description}</p>
                </FadeIn>
              </div>
            </div>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <SwipeRail
              label="Why choose Novenso Spaces"
              itemClassName="w-[72%] xs:w-[60%] sm:w-[42%]"
              gridClassName="md:grid-cols-2 md:gap-x-10 md:gap-y-0"
            >
              {rest.map((d, i) => (
                <FadeIn
                  key={d.title}
                  delay={(i % 2) * 0.06}
                  className="h-full border border-ink/10 bg-bone/50 p-5 md:border-0 md:border-t md:bg-transparent md:px-0 md:py-9"
                >
                  <span className="font-display text-sm italic text-brass-deep">
                    {String(i + 2).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-xl leading-snug text-ink md:text-[1.6rem]">{d.title}</h3>
                  <p className="mt-2 text-pretty text-[0.9rem] leading-relaxed text-ash">{d.description}</p>
                </FadeIn>
              ))}
            </SwipeRail>
          </div>
        </div>
      </div>
    </section>
  );
}
