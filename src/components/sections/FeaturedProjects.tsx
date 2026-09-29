import SectionHeading from "@/components/ui/SectionHeading";
import ButtonLink from "@/components/ui/ButtonLink";
import FadeIn from "@/components/motion/FadeIn";
import SwipeRail from "@/components/ui/SwipeRail";
import ProjectCard from "./ProjectCard";
import { featuredProjects } from "@/data/projects";

/** Swipeable on phones; staggered two-column showcase on larger screens. */
export default function FeaturedProjects() {
  const items = featuredProjects.slice(0, 4);
  return (
    <section className="section-y bg-ivory">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
          <SectionHeading
            eyebrow="Selected Work"
            title="Spaces we have shaped."
            emphasis={["shaped."]}
            intro="Residential, corporate, hospitality and custom projects, each designed and delivered by the same team."
          />
          <FadeIn className="hidden shrink-0 md:block">
            <ButtonLink href="/projects" variant="outline">
              View all projects
            </ButtonLink>
          </FadeIn>
        </div>

        <div className="mt-10 md:mt-16">
          <SwipeRail
            label="Featured projects"
            itemClassName="w-[86%] xs:w-[76%] sm:w-[60%]"
            gridClassName="md:grid-cols-2 md:gap-x-10 md:gap-y-16 lg:gap-x-16 md:[&>*:nth-child(even)]:mt-32"
          >
            {items.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                aspect={i % 2 === 0 ? "aspect-[4/5]" : "aspect-[4/5] md:aspect-square"}
                sizes="(min-width: 768px) 50vw, 86vw"
              />
            ))}
          </SwipeRail>
        </div>

        <div className="mt-8 md:hidden">
          <ButtonLink href="/projects" variant="outline" className="w-full">
            View all projects
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
