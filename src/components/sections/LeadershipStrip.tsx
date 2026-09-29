import AnimatedText from "@/components/motion/AnimatedText";
import FadeIn from "@/components/motion/FadeIn";
import ButtonLink from "@/components/ui/ButtonLink";
import GoldLines from "@/components/ui/GoldLines";
import { founders, leadershipHighlights } from "@/data/content";

/** Home-page proof band: founder credentials at a glance, linking to the full profiles. */
export default function LeadershipStrip() {
  return (
    <section className="relative overflow-hidden bg-forest text-ivory">
      <GoldLines className="right-5 top-0 h-24 opacity-60 md:right-[6%] md:h-40" />
      <div className="section-y container-x relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-6">
            <FadeIn className="mb-4 flex items-center gap-4 md:mb-6" y={10}>
              <span className="rule-brass" />
              <span className="eyebrow text-brass-light">Led by experience</span>
            </FadeIn>
            <AnimatedText
              as="h2"
              text={"Two perspectives.\nOne vision."}
              emphasis={["vision."]}
              className="display-lg text-balance text-ivory"
            />
          </div>
          <FadeIn delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <p className="lead text-pretty text-ivory/75">
              Your project is led directly by its founders: an architecture and development
              background trained in the UK, alongside nearly 15 years of hands-on interior design and
              execution.
            </p>
          </FadeIn>
        </div>

        <ul className="mt-12 grid gap-px bg-ivory/10 sm:grid-cols-3 md:mt-16">
          {leadershipHighlights.map((h, i) => (
            <FadeIn key={h.label} as="li" delay={i * 0.08} className="bg-forest py-6 sm:p-8 lg:p-10">
              <p className="font-display text-5xl leading-none text-brass-light md:text-6xl">
                {h.value}
                {h.unit && <span className="ml-2 text-lg italic text-ivory/60 md:text-xl">{h.unit}</span>}
              </p>
              <p className="mt-3 max-w-[18rem] text-pretty text-[0.85rem] leading-relaxed text-ivory/70">
                {h.label}
              </p>
            </FadeIn>
          ))}
        </ul>

        <FadeIn
          delay={0.1}
          className="mt-10 flex flex-col gap-6 border-t border-ivory/15 pt-8 md:mt-14 md:flex-row md:items-center md:justify-between"
        >
          <ul className="flex flex-col gap-4 sm:flex-row sm:gap-12">
            {founders.map((f) => (
              <li key={f.family}>
                <p className="font-display text-xl text-ivory">
                  {f.given} {f.family}
                </p>
                <p className="eyebrow mt-1 text-brass-light">{f.role}</p>
              </li>
            ))}
          </ul>
          <ButtonLink href="/about#founders" variant="outline" tone="light">
            Meet the founders
          </ButtonLink>
        </FadeIn>
      </div>
    </section>
  );
}
