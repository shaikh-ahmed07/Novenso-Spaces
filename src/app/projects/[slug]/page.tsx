import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/sections/PageHero";
import ProjectGallery from "@/components/sections/ProjectGallery";
import CTASection from "@/components/sections/CTASection";
import FadeIn from "@/components/motion/FadeIn";
import AnimatedText from "@/components/motion/AnimatedText";
import { getAdjacentProjects, getProject, projects } from "@/data/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.name}, ${project.location}`;
  return {
    title,
    description: `${project.summary} A ${project.category.toLowerCase()} interior project by Novenso Spaces.`,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${title} | Novenso Spaces`,
      description: project.summary,
      url: `/projects/${project.slug}`,
      images: [{ url: project.cover.src, alt: project.cover.alt }],
    },
  };
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="eyebrow flex items-center gap-4 text-brass-deep">
      <span className="rule-brass" />
      {children}
    </h2>
  );
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(project.slug);

  const meta = [
    { label: "Location", value: project.location },
    { label: "Category", value: project.category },
    { label: "Year", value: project.year },
    ...(project.area ? [{ label: "Scale", value: project.area }] : []),
  ];

  const story = [
    { label: "Challenges", body: project.challenges },
    { label: "Solutions", body: project.solutions },
  ];

  return (
    <article>
      <PageHero
        size="lg"
        eyebrow={`Project — ${project.category}`}
        title={project.name}
        image={project.cover.src}
        imageAlt={project.cover.alt}
        meta={meta}
      />

      {/* Overview */}
      <section className="section-y bg-ivory">
        <div className="container-x grid gap-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <FadeIn>
              <Label>Project Overview</Label>
            </FadeIn>
            <FadeIn delay={0.1} className="mt-8">
              <nav aria-label="Breadcrumb" className="text-sm text-ash">
                <Link href="/projects" className="transition-colors hover:text-ink">
                  Projects
                </Link>
                <span className="mx-2 text-stone">/</span>
                <span className="text-charcoal">{project.name}</span>
              </nav>
            </FadeIn>
          </div>
          <div className="lg:col-span-8">
            <AnimatedText as="p" text={project.overview} className="display-md text-balance text-ink" />
          </div>
        </div>
      </section>

      {/* Concept */}
      <section className="bg-ivory pb-16 md:pb-28">
        <div className="container-x grid items-end gap-6 md:gap-12 lg:grid-cols-12 lg:gap-16">
          <FadeIn className="relative aspect-[4/3] overflow-hidden bg-bone lg:col-span-7">
            <Image
              src={project.gallery[0]?.src ?? project.cover.src}
              alt={project.gallery[0]?.alt ?? project.cover.alt}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
          </FadeIn>
          <div className="lg:col-span-5">
            <FadeIn>
              <Label>Design Concept</Label>
            </FadeIn>
            <FadeIn as="p" delay={0.1} className="lead mt-4 text-pretty text-charcoal md:mt-8">
              {project.concept}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Scope + Materials */}
      <section className="section-y bg-bone">
        <div className="container-x grid gap-12 md:grid-cols-2 lg:gap-24">
          <div>
            <FadeIn>
              <Label>Scope of Work</Label>
            </FadeIn>
            <ul className="mt-6 border-t border-ink/10 md:mt-10">
              {project.scope.map((item, i) => (
                <FadeIn
                  as="li"
                  key={item}
                  delay={i * 0.05}
                  className="flex items-baseline gap-5 border-b border-ink/10 py-4"
                >
                  <span className="font-display text-sm italic text-brass">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-xl text-ink md:text-2xl">{item}</span>
                </FadeIn>
              ))}
            </ul>
          </div>
          <div>
            <FadeIn>
              <Label>Materials &amp; Finishes</Label>
            </FadeIn>
            <ul className="mt-6 border-t border-ink/10 md:mt-10">
              {project.materials.map((item, i) => (
                <FadeIn
                  as="li"
                  key={item}
                  delay={i * 0.05}
                  className="flex items-center gap-4 border-b border-ink/10 py-4"
                >
                  <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-brass" />
                  <span className="text-[1.05rem] text-charcoal">{item}</span>
                </FadeIn>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Execution */}
      <section className="section-y bg-ink text-ivory">
        <div className="container-x grid gap-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <FadeIn>
              <h2 className="eyebrow flex items-center gap-4 text-brass-light">
                <span className="rule-brass" />
                Execution Details
              </h2>
            </FadeIn>
          </div>
          <div className="lg:col-span-8">
            <AnimatedText as="p" text={project.execution} className="display-md text-balance" />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-y bg-ivory" aria-label="Project gallery">
        <div className="container-x">
          <FadeIn className="mb-8 flex items-end justify-between md:mb-16">
            <Label>Project Gallery</Label>
            <span className="text-xs text-ash">Select an image to enlarge</span>
          </FadeIn>
          <ProjectGallery images={project.gallery} title={project.name} />
        </div>
      </section>

      {/* Challenges / Solutions / Outcome */}
      <section className="bg-ivory pb-16 md:pb-32">
        <div className="container-x">
          <div className="grid gap-10 border-t border-ink/10 pt-12 md:grid-cols-2 md:gap-16 md:pt-16">
            {story.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.1}>
                <Label>{s.label}</Label>
                <p className="mt-6 text-pretty text-lg leading-relaxed text-charcoal">{s.body}</p>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-12 bg-charcoal p-6 text-ivory md:mt-24 md:p-16 lg:p-20">
            <h2 className="eyebrow flex items-center gap-4 text-brass-light">
              <span className="rule-brass" />
              Final Outcome
            </h2>
            <p className="display-md mt-5 max-w-4xl text-balance md:mt-8">{project.outcome}</p>
          </FadeIn>
        </div>
      </section>

      {/* Prev / next */}
      <nav aria-label="More projects" className="grid border-t border-ink/10 bg-ivory md:grid-cols-2">
        {[
          { dir: "Previous project", p: previous },
          { dir: "Next project", p: next },
        ].map(({ dir, p }, i) => (
          <Link
            key={dir}
            href={`/projects/${p.slug}`}
            className={`group relative flex min-h-44 flex-col justify-end overflow-hidden p-8 text-ivory md:min-h-80 md:p-12 ${
              i === 1 ? "md:items-end md:text-right" : ""
            }`}
          >
            <Image
              src={p.cover.src}
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-luxe)] group-hover:scale-105"
            />
            <span aria-hidden className="absolute inset-0 bg-ink/60 transition-colors duration-700 group-hover:bg-ink/45" />
            <span className="eyebrow relative text-brass-light">{dir}</span>
            <span className="relative mt-3 font-display text-3xl md:text-4xl">{p.name}</span>
          </Link>
        ))}
      </nav>

      <CTASection
        title="Planning something similar?"
        emphasis={["similar?"]} text="Tell us about your space, and we'll show you how we would approach it." />
    </article>
  );
}
