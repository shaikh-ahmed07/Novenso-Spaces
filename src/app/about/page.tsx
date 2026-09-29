import type { Metadata } from "next";
import AboutIntro from "@/components/sections/AboutIntro";
import FoundersSection from "@/components/sections/FoundersSection";
import ProcessSection from "@/components/sections/ProcessSection";
import WhySection from "@/components/sections/WhySection";
import CTASection from "@/components/sections/CTASection";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the founders of Novenso Spaces Private Limited, a founder-led integrated interior solutions company offering design, project management, execution, contracting and custom manufacturing under one roof.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", images: ["/images/site/about-hero.jpg"] },
};

const principles = [
  {
    title: "Design with intent",
    text: "Every line on a drawing has a reason. We design around how a space will be used, maintained and lived in, not only how it will photograph.",
  },
  {
    title: "Plan before we build",
    text: "Schedules, budgets and procurement are resolved before site work begins, which is what keeps projects on time and on cost.",
  },
  {
    title: "Own the outcome",
    text: "Because design and delivery sit with one team, there is no one else to point to. We take responsibility for the finished result.",
  },
];

export default function AboutPage() {
  return (
    <>
      <FoundersSection />
      <AboutIntro showLink={false} />

      <section className="section-y bg-charcoal text-ivory">
        <div className="container-x">
          <SectionHeading
            tone="light"
            eyebrow="How we think"
            title="Three principles behind every project."
            emphasis={["every"]}
          />
          <div className="mt-10 grid gap-px bg-ivory/10 md:mt-16 md:grid-cols-3">
            {principles.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.1} className="bg-charcoal py-7 md:p-10 lg:p-14">
                <span className="font-display text-4xl italic text-brass md:text-5xl">0{i + 1}</span>
                <h3 className="mt-3 font-display text-2xl md:mt-6 md:text-3xl">{p.title}</h3>
                <p className="mt-2 text-pretty leading-relaxed text-ivory/70 md:mt-4">{p.text}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection />
      <WhySection />
      <CTASection />
    </>
  );
}
