"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import type { Project } from "@/data/projects";
import { EASE, viewportOnce } from "@/lib/motion";

type Props = {
  project: Project;
  aspect?: string;
  sizes?: string;
  delay?: number;
  priority?: boolean;
};

export default function ProjectCard({
  project,
  aspect = "aspect-[4/5]",
  sizes = "(min-width: 768px) 50vw, 100vw",
  delay = 0,
  priority,
}: Props) {
  return (
    <m.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.8, ease: EASE, delay }}
      className="group"
    >
      <Link href={`/projects/${project.slug}`} className="block" aria-label={`${project.name} — view project`}>
        <div className={`relative overflow-hidden bg-bone ${aspect}`}>
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="img-grade object-cover transition-transform duration-[1600ms] ease-[var(--ease-luxe)] group-hover:scale-[1.05]"
          />
          {/* Hover veil with details (pointer devices) */}
          <div className="absolute inset-0 hidden flex-col justify-end bg-ink/0 p-8 transition-colors duration-700 group-hover:bg-ink/45 md:flex">
            <div className="translate-y-6 opacity-0 transition-all duration-700 ease-[var(--ease-luxe)] group-hover:translate-y-0 group-hover:opacity-100">
              <p className="max-w-sm text-pretty text-[0.95rem] leading-relaxed text-ivory/90">
                {project.summary}
              </p>
              <span className="mt-5 inline-flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.24em] text-brass-light">
                <span className="h-px w-8 bg-brass-light" />
                View project
              </span>
            </div>
          </div>
          <span className="absolute left-4 top-4 bg-ink/75 px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-brass-light backdrop-blur-sm md:left-5 md:top-5">
            {project.category}
          </span>
        </div>

        <div className="mt-4 flex items-start justify-between gap-6 md:mt-5">
          <div>
            <h3 className="font-display text-2xl leading-tight text-ink transition-colors duration-500 group-hover:text-brass-deep md:text-[1.75rem]">
              {project.name}
            </h3>
            <p className="mt-1.5 text-sm text-ash">
              {project.location} <span className="mx-2 text-stone">/</span> {project.category}
            </p>
          </div>
          <span className="mt-2 shrink-0 font-display text-sm italic text-taupe">{project.status ?? project.service}</span>
        </div>
        <p className="mt-2 line-clamp-2 text-pretty text-sm leading-relaxed text-ash md:hidden">{project.summary}</p>
      </Link>
    </m.article>
  );
}
