import { domainOf, type Project } from "@/data/projects";
import { ProjectCover } from "./project-cover";

export function ProjectCard({ project, priority }: { project: Project; priority?: boolean }) {
  return (
    <a href={project.url} target="_blank" rel="noopener noreferrer" className="group block min-w-0">
      <div className="relative aspect-[16/9] overflow-hidden rounded-[10px] border border-line bg-card transition-colors duration-200 group-hover:border-accent">
        <ProjectCover project={project} priority={priority} />
      </div>
      <h3 className="mt-3 truncate font-medium text-ink transition-colors duration-150 group-hover:text-accent">
        {project.title}
      </h3>
      <p className="mt-1 line-clamp-2 min-h-10 text-sm text-muted">{project.blurb}</p>
      <p className="mt-1.5 flex min-w-0 gap-3 font-mono text-xs text-faint">
        <span className="shrink-0">
          {project.year} · {project.category}
        </span>
        <span className="truncate">{domainOf(project.url)}</span>
      </p>
    </a>
  );
}
