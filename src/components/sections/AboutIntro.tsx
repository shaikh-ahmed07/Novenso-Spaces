import AnimatedText from "@/components/motion/AnimatedText";
import FadeIn from "@/components/motion/FadeIn";
import ImageReveal from "@/components/motion/ImageReveal";
import ParallaxImage from "@/components/motion/ParallaxImage";
import ButtonLink from "@/components/ui/ButtonLink";
import { capabilities } from "@/data/content";

type Props = { showLink?: boolean };

const pillars = [
  { k: "Design", v: "Concept to detailed drawings" },
  { k: "Manage", v: "Budgets, schedules, vendors" },
  { k: "Execute", v: "Every trade, on site" },
  { k: "Craft", v: "Custom sofas & furniture" },
];

/** Editorial introduction: statement, offset imagery, pillars and capabilities. */
export default function AboutIntro({ showLink = true }: Props) {
  return (
    <section id="about" className="section-y overflow-hidden bg-ivory">
      <div className="container-x">
        <FadeIn className="mb-6 flex items-center gap-4 md:mb-10" y={10}>
          <span className="rule-brass" />
          <span className="eyebrow text-brass-deep">About Novenso Spaces</span>
        </FadeIn>

        <AnimatedText
          text={"We don't just design interiors.\nWe bring spaces to life."}
          emphasis={["life."]}
          className="display-lg max-w-5xl text-balance text-ink"
        />

        <div className="mt-10 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-8 lg:mt-20">
          {/* Imagery */}
          <div className="relative md:col-span-6 lg:col-span-6">
            <ImageReveal
              src="/images/site/about-living.jpg"
              alt="Dark living room with a low leather sofa, bronze artworks and glowing pendant lights"
              sizes="(min-width: 768px) 50vw, 100vw"
              className="aspect-[4/3] w-full md:aspect-[4/5] lg:aspect-[5/4]"
            />
            <div className="absolute -bottom-8 -right-2 w-[38%] border-[6px] border-ivory sm:w-[34%] md:-right-8 md:border-[10px] lg:-bottom-12">
              <ParallaxImage
                src="/images/site/about-detail.jpg"
                alt="Hand holding colour swatches over drawings"
                sizes="(min-width: 768px) 20vw, 38vw"
                className="aspect-[3/4] w-full"
                strength={8}
              />
            </div>
          </div>

          {/* Copy */}
          <div className="mt-6 flex flex-col md:col-span-6 md:mt-0 md:pl-10 lg:col-span-5 lg:col-start-8 lg:pl-0">
            <FadeIn as="p" className="lead text-pretty text-charcoal">
              Novenso Spaces Private Limited is an integrated interior solutions company. We take
              residential, commercial and hospitality projects from the first conversation to a
              finished space, ready to use.
            </FadeIn>
            <FadeIn as="p" delay={0.05} className="mt-4 text-pretty text-[0.95rem] leading-relaxed text-ash">
              Design, project management, site execution and custom manufacturing sit within one team,
              so what&apos;s agreed on paper is built faithfully on site.
            </FadeIn>

            {/* Four pillars: 2×2 on phones */}
            <FadeIn delay={0.1} className="mt-8 grid grid-cols-2 border-l border-t border-ink/10">
              {pillars.map((p) => (
                <div key={p.k} className="border-b border-r border-ink/10 p-4 md:p-5">
                  <p className="font-display text-xl text-ink md:text-2xl">{p.k}</p>
                  <p className="mt-1 text-[0.8rem] leading-snug text-ash">{p.v}</p>
                </div>
              ))}
            </FadeIn>

            <FadeIn delay={0.15} className="mt-8">
              <h3 className="eyebrow mb-4 text-ash">What we bring</h3>
              <ul className="flex flex-wrap gap-2">
                {capabilities.map((c) => (
                  <li
                    key={c}
                    className="border border-ink/12 bg-bone/60 px-3 py-1.5 text-[0.8rem] text-charcoal"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </FadeIn>

            {showLink && (
              <FadeIn delay={0.2} className="mt-8">
                <ButtonLink href="/about" variant="ghost">
                  More about us
                </ButtonLink>
              </FadeIn>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
