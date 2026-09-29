import AnimatedText from "@/components/motion/AnimatedText";
import FadeIn from "@/components/motion/FadeIn";
import GoldLines from "@/components/ui/GoldLines";
import StrengthIcon from "@/components/ui/StrengthIcon";
import { brandOfferings, founders } from "@/data/content";

const values = ["Experience", "Expertise", "Commitment", "A shared vision"];

/**
 * Opens the About page: a dark header introducing the leadership, the two founders
 * side by side, and the closing "Two perspectives. One vision." band.
 */
export default function FoundersSection() {
  return (
    <section id="founders" className="bg-bone">
      {/* Dark so the transparent navbar's light text stays legible */}
      <div className="relative overflow-hidden bg-forest text-ivory">
        <GoldLines className="right-5 top-24 h-24 opacity-70 md:right-[6%] md:top-28 md:h-44" />
        <div className="container-x relative grid gap-8 pb-14 pt-32 md:pb-20 md:pt-44 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <FadeIn className="mb-4 flex items-center gap-4 md:mb-6" y={10}>
              <span className="rule-brass" />
              <span className="eyebrow text-brass-light">About Novenso Spaces · Leadership</span>
            </FadeIn>
            <AnimatedText
              as="h1"
              immediate
              delay={0.2}
              text={"The people behind\nNovenso."}
              emphasis={["Novenso."]}
              className="display-xl text-balance"
            />
          </div>
          <FadeIn delay={0.3} className="flex flex-col justify-end lg:col-span-5 lg:col-start-8">
            <p className="lead text-pretty text-ivory/80">
              Novenso is led by two founders who bring complementary strengths: one grounded in
              architecture, strategy and development, the other in interior design, engineering and
              site delivery. Between them, nearly 25 years of experience sit behind every project.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.65rem] uppercase tracking-[0.24em] text-ivory/60">
              {values.map((v) => (
                <li key={v} className="flex items-center gap-2">
                  <span aria-hidden className="h-1 w-1 rounded-full bg-brass" />
                  {v}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>

      <div className="container-x pb-16 md:pb-24">
        <div className="grid md:grid-cols-2">
          {founders.map((f, i) => (
            <FadeIn
              key={f.family}
              as="article"
              delay={i * 0.1}
              className={`py-10 md:py-14 ${
                i === 0 ? "md:border-r md:border-ink/10 md:pr-10 lg:pr-16" : "border-t border-ink/10 md:border-t-0 md:pl-10 lg:pl-16"
              }`}
            >
              <div className="flex flex-col gap-5 xs:flex-row xs:items-start xs:justify-between xs:gap-6">
                <div>
                  <p className="eyebrow text-ash">{f.given}</p>
                  <h3 className="mt-2 font-display text-[1.9rem] leading-[1.05] text-ink md:text-[2.4rem]">
                    {f.family}
                  </h3>
                  <p className="eyebrow mt-3 text-brass-deep">{f.role}</p>
                </div>
                <div className="shrink-0 xs:text-right">
                  <p className="font-display text-4xl italic leading-none text-brass md:text-5xl">{f.years}</p>
                  <p className="mt-2 max-w-[9rem] text-[0.7rem] leading-snug text-ash">{f.yearsLabel}</p>
                </div>
              </div>

              <span aria-hidden className="mt-6 block h-px w-12 bg-brass" />
              <p className="mt-6 text-pretty leading-relaxed text-charcoal">{f.bio}</p>

              <h4 className="eyebrow mt-8 text-ash">Leads</h4>
              <ul className="mt-2">
                {f.strengths.map((s) => (
                  <li
                    key={s.label}
                    className="flex items-center gap-4 border-b border-ink/10 py-3 text-[0.72rem] uppercase tracking-[0.18em] text-charcoal last:border-b-0"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ivory text-brass-deep ring-1 ring-brass/20">
                      <StrengthIcon name={s.icon} className="h-5 w-5" />
                    </span>
                    {s.label}
                  </li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Closing band, echoing the brand stationery */}
      <div className="relative overflow-hidden bg-forest text-ivory">
        <GoldLines className="bottom-0 right-5 h-24 opacity-60 md:right-[6%] md:h-36" />
        <div className="container-x relative py-14 text-center md:py-20">
          <FadeIn>
            <p className="font-display text-[1.6rem] uppercase tracking-[0.18em] text-brass-light md:text-[2.4rem]">
              Two perspectives. One vision.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-balance text-[0.8rem] uppercase leading-relaxed tracking-[0.2em] text-ivory/70">
              Strategy, design and execution brought together under one direction.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-ivory/15 pt-8 text-[0.65rem] uppercase tracking-[0.24em] text-ivory/60">
              {brandOfferings.map((o, i) => (
                <li key={o} className="flex items-center gap-6">
                  {i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-brass" />}
                  {o}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
