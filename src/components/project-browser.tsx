"use client";

import { useMemo, useState } from "react";
import { categories, projects, type Category } from "@/data/projects";
import { ProjectCard } from "./project-card";

type Filter = "All" | Category;

const usedCategories = categories.filter((c) => projects.some((p) => p.category === c));

export function ProjectBrowser() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (filter !== "All" && p.category !== filter) return false;
      if (!q) return true;
      return [p.title, p.blurb, p.category, ...p.tech].join(" ").toLowerCase().includes(q);
    });
  }, [query, filter]);

  return (
    <div>
      <label htmlFor="project-search" className="sr-only">
        Search projects
      </label>
      <input
        id="project-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search projects"
        autoComplete="off"
        className="h-11 w-full rounded-lg border border-line bg-field px-4 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-accent"
      />
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {(["All", ...usedCategories] as Filter[]).map((c) => (
          <button
            key={c}
            type="button"
            className="chip"
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="eyebrow mt-8" aria-live="polite">
        {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>

      {visible.length === 0 ? (
        <p className="mt-6 rounded-[10px] border border-dashed border-line px-6 py-12 text-center text-sm text-muted">
          No projects match that search.
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">
          {visible.map((p, i) => (
            <ProjectCard key={p.slug} project={p} priority={i < 2} />
          ))}
        </div>
      )}
    </div>
  );
}
