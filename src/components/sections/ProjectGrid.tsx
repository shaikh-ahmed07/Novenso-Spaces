"use client";

import { useState } from "react";
import { m } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projectCategories, projects, type ProjectCategory } from "@/data/projects";
import { EASE } from "@/lib/motion";

type Filter = "All" | ProjectCategory;

// Alternating proportions give the grid an editorial, masonry rhythm.
const aspects = ["aspect-[4/5]", "aspect-[4/3]", "aspect-[1/1]", "aspect-[4/5]", "aspect-[4/3]"];

export default function ProjectGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const filters: Filter[] = ["All", ...projectCategories];
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by category"
        className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {filters.map((f) => {
          const count = f === "All" ? projects.length : projects.filter((p) => p.category === f).length;
          const selected = f === filter;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(f)}
              className={`min-h-11 shrink-0 border px-5 text-[0.68rem] uppercase tracking-[0.2em] transition-colors duration-400 ${
                selected
                  ? "border-ink bg-ink text-ivory"
                  : "border-ink/15 text-charcoal hover:border-ink/50"
              }`}
            >
              {f}
              <sup className="ml-1.5 text-[0.55rem] opacity-60">{count}</sup>
            </button>
          );
        })}
      </div>

      <m.div
        key={filter}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mt-8 columns-1 gap-6 md:mt-14 md:columns-2 lg:gap-10"
      >
        {visible.length === 0 && (
          <p className="text-ash">New projects in this category are coming soon.</p>
        )}
        {visible.map((project, i) => (
          <div key={project.slug} className="mb-10 break-inside-avoid md:mb-20">
            <ProjectCard
              project={project}
              aspect={aspects[i % aspects.length]}
              priority={i < 2}
            />
          </div>
        ))}
      </m.div>
    </div>
  );
}
