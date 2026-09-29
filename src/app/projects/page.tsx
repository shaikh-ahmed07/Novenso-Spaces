import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ProjectGrid from "@/components/sections/ProjectGrid";
import CTASection from "@/components/sections/CTASection";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Residential, commercial, corporate, hospitality and custom interior projects designed and delivered by Novenso Spaces.",
  alternates: { canonical: "/projects" },
  openGraph: { url: "/projects", images: ["/images/site/projects-hero.jpg"] },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Work that speaks for itself."
        emphasis={["itself."]}
        intro="A selection of residential, commercial, corporate, hospitality and custom interior projects."
        image="/images/site/projects-hero.jpg"
        imageAlt="Classic luxury living room with curved sofa, chandelier and panelled walls"
      />
      <section className="section-y bg-ivory">
        <div className="container-x">
          <SectionHeading
            eyebrow="Selected Projects"
            title="Browse by category."
            className="mb-12 md:mb-16"
          />
          <ProjectGrid />
        </div>
      </section>
      <CTASection title="Have a space in mind? Let's talk about it." emphasis={["talk"]} />
    </>
  );
}
