import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import CTASection from "@/components/sections/CTASection";
import ProcessSection from "@/components/sections/ProcessSection";
import ImageReveal from "@/components/motion/ImageReveal";
import FadeIn from "@/components/motion/FadeIn";
import AnimatedText from "@/components/motion/AnimatedText";
import ButtonLink from "@/components/ui/ButtonLink";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Interior design, interior PMC, interior execution, contracting, elite interior services and custom sofa manufacturing by Novenso Spaces.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services", images: ["/images/site/services-hero.jpg"] },
};

const eliteSlugs = new Set(["elite-interior-services", "custom-sofa-manufacturing"]);

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Everything a space needs, under one roof."
        emphasis={["one", "roof."]}
        intro="Engage us for a single discipline or for the complete journey from brief to handover."
        image="/images/site/services-hero.jpg"
        imageAlt="Bright contemporary lobby with curved white seating and full-height glazing"
      />

      {/* Quick index: sticks to the top while reading (navbar tucks away on scroll) */}
      <nav aria-label="Services on this page" className="sticky top-0 z-30 border-b border-ink/10 bg-ivory/95 backdrop-blur-md">
        <ul className="container-x no-scrollbar flex gap-6 overflow-x-auto md:justify-between md:gap-8">
          {services.map((s) => (
            <li key={s.slug} className="shrink-0">
              <a
                href={`#${s.slug}`}
                className="flex min-h-14 items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-ash transition-colors hover:text-ink"
              >
                <span className="font-display text-sm italic normal-case tracking-normal text-brass-deep">{s.index}</span>
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        {services.map((s, i) => {
          const dark = i % 2 === 1; // alternate light and dark for rhythm
          const t = dark
            ? { bg: "bg-charcoal", head: "text-ivory", body: "text-ivory/85", muted: "text-ivory/65", chip: "border-ivory/15 bg-ivory/5 text-ivory/85", rule: "bg-ivory/10" }
            : { bg: "bg-ivory", head: "text-ink", body: "text-charcoal", muted: "text-ash", chip: "border-ink/10 bg-bone/60 text-charcoal", rule: "bg-ink/10" };
          return (
            <section key={s.slug} id={s.slug} className={`${t.bg} py-12 md:py-24 lg:py-32`}>
              <div className="container-x grid items-center gap-8 md:gap-12 lg:grid-cols-12 lg:gap-20">
                <div className={`lg:col-span-6 ${dark ? "lg:order-2" : ""}`}>
                  <ImageReveal
                    src={s.image}
                    alt={s.imageAlt}
                    from={dark ? "right" : "left"}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="aspect-[16/10] w-full md:aspect-[4/3] lg:aspect-[5/6]"
                  />
                </div>
                <div className={`lg:col-span-6 ${dark ? "lg:order-1" : ""}`}>
                  <FadeIn className="flex items-center gap-4" y={10}>
                    <span className="font-display text-4xl italic text-brass md:text-5xl">{s.index}</span>
                    <span className={`h-px flex-1 ${t.rule}`} />
                  </FadeIn>
                  <AnimatedText as="h2" text={s.title} className={`display-lg mt-3 md:mt-5 ${t.head}`} />
                  <FadeIn as="p" delay={0.05} className={`lead mt-4 text-pretty md:mt-6 ${t.body}`}>
                    {s.short}
                  </FadeIn>
                  <FadeIn as="p" delay={0.1} className={`mt-3 text-pretty text-[0.95rem] leading-relaxed md:mt-4 ${t.muted}`}>
                    {s.description}
                  </FadeIn>
                  <FadeIn delay={0.15}>
                    <ul className="mt-6 flex flex-wrap gap-2 md:mt-8">
                      {s.deliverables.map((d) => (
                        <li key={d} className={`border px-3 py-1.5 text-[0.8rem] ${t.chip}`}>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </FadeIn>
                  <FadeIn delay={0.2} className="mt-7 md:mt-10">
                    {eliteSlugs.has(s.slug) ? (
                      <ButtonLink href="/elite-services" variant="ghost" tone={dark ? "light" : "dark"}>
                        Explore Elite Services
                      </ButtonLink>
                    ) : (
                      <ButtonLink href="/contact" variant="ghost" tone={dark ? "light" : "dark"}>
                        Enquire about {s.title}
                      </ButtonLink>
                    )}
                  </FadeIn>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <ProcessSection />
      <CTASection />
    </>
  );
}
