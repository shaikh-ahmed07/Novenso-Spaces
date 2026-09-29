import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import CTASection from "@/components/sections/CTASection";
import SectionHeading from "@/components/ui/SectionHeading";
import ImageReveal from "@/components/motion/ImageReveal";
import FadeIn from "@/components/motion/FadeIn";
import AnimatedText from "@/components/motion/AnimatedText";
import SwipeRail from "@/components/ui/SwipeRail";
import { eliteServices } from "@/data/content";

export const metadata: Metadata = {
  title: "Elite Services",
  description:
    "Custom sofa manufacturing, bespoke furniture, custom upholstery, decorative elements, premium material sourcing and bespoke interior components by Novenso Spaces.",
  alternates: { canonical: "/elite-services" },
  openGraph: { url: "/elite-services", images: ["/images/site/elite-hero.jpg"] },
};

const sofaSteps = [
  { title: "Measure", text: "We measure the room and understand how you sit, lounge and live." },
  { title: "Design", text: "Proportions, arm and back profiles, seat depth and legs are drawn for your space." },
  { title: "Select", text: "Choose fabric or leather, foam density and finishes from sampled options." },
  { title: "Craft", text: "Frames, springing and upholstery are built by hand with checks at each stage." },
  { title: "Install", text: "Delivered, placed and inspected in your space by our own team." },
];

export default function EliteServicesPage() {
  return (
    <>
      <PageHero
        size="lg"
        eyebrow="Elite Services"
        title="Bespoke, by design."
        emphasis={["design."]}
        intro="Custom sofas, furniture, upholstery and interior components, made for a single space and a single client."
        image="/images/site/elite-hero.jpg"
        imageAlt="Mustard velvet sofa against a deep blue panelled wall"
      />

      {/* Statement */}
      <section className="section-y bg-ivory">
        <div className="container-x grid gap-6 lg:grid-cols-12 lg:gap-12">
          <FadeIn className="lg:col-span-3">
            <p className="eyebrow flex items-center gap-4 text-brass-deep">
              <span className="rule-brass" />
              The Atelier
            </p>
          </FadeIn>
          <div className="lg:col-span-9">
            <AnimatedText
              as="h2"
              text="Some things can't be bought from a catalogue. The sofa that fits the wall exactly. The cabinet that holds precisely what it should. That's what we make."
              emphasis={["exactly.", "precisely"]}
              className="display-md text-balance text-ink md:text-[clamp(2rem,3.4vw,3.25rem)]"
            />
          </div>
        </div>
      </section>

      {/* Services — alternating editorial rows */}
      <section className="section-y bg-charcoal text-ivory">
        <div className="container-x">
          <SectionHeading
            tone="light"
            eyebrow="What we offer"
            title="Six ways to make a space your own."
            emphasis={["your", "own."]}
          />
          <div className="mt-10 flex flex-col gap-12 md:mt-20 md:gap-28">
            {eliteServices.map((s, i) => {
              const flip = i % 2 === 1;
              return (
                <article key={s.title} className="grid items-center gap-5 md:grid-cols-12 md:gap-12">
                  <div className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}>
                    <ImageReveal
                      src={s.image}
                      alt={s.imageAlt}
                      from={flip ? "right" : "left"}
                      sizes="(min-width: 768px) 58vw, 100vw"
                      className="aspect-[16/10] w-full md:aspect-[4/3]"
                    />
                  </div>
                  <div className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}>
                    <FadeIn>
                      <span className="font-display text-4xl italic text-brass md:text-6xl">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-2 font-display text-3xl leading-tight md:mt-4 md:text-5xl">{s.title}</h3>
                      <p className="mt-3 max-w-md md:mt-5 text-pretty leading-relaxed text-ivory/65">{s.description}</p>
                    </FadeIn>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sofa process */}
      <section id="custom-sofas" className="section-y bg-bone">
        <div className="container-x">
          <SectionHeading
            eyebrow="Custom Sofa Manufacturing"
            title="How a Novenso sofa is made."
            emphasis={["Novenso"]}
            intro="Every sofa is designed around the room it will live in and the people who will use it."
          />
          <div className="mt-10 md:mt-16">
            <SwipeRail label="How a sofa is made" itemClassName="w-[70%] xs:w-[56%] sm:w-[40%]" gridClassName="md:grid-cols-5 md:gap-px md:bg-ink/10">
              {sofaSteps.map((s, i) => (
                <div key={s.title} className="h-full border border-ink/10 bg-ivory p-5 md:border-0 md:p-7">
                  <span className="font-display text-lg italic text-brass-deep">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-2xl text-ink md:text-3xl">{s.title}</h3>
                  <p className="mt-2 text-pretty text-[0.9rem] leading-relaxed text-ash">{s.text}</p>
                </div>
              ))}
            </SwipeRail>
          </div>
        </div>
      </section>

      <CTASection
        title="Commission something made only for you."
        text="Share your space, your references and your requirements. We'll take it from there."
        cta="Start a Bespoke Enquiry"
        image="/images/elite/furniture.jpg"
        emphasis={["only"]}
      />
    </>
  );
}
