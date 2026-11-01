import Image from "next/image";
import type { Project } from "@/data/projects";

// Deterministic hue from the slug so each placeholder looks distinct but stable.
function hueFor(slug: string): number {
  let h = 0;
  for (const ch of slug) h = (h * 31 + ch.charCodeAt(0)) % 360;
  return h;
}

// Connector words are skipped so "Detection of Fake News" becomes "DF", not "DO".
const minorWords = new Set(["of", "the", "and", "for", "a", "an", "in", "on", "to"]);

function monogram(title: string): string {
  const words = title
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter((w) => w && !minorWords.has(w.toLowerCase()));
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return title.slice(0, 2).toUpperCase();
}

export function ProjectCover({ project, priority }: { project: Project; priority?: boolean }) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={`${project.title} preview`}
        fill
        sizes="(min-width: 768px) 30rem, 100vw"
        priority={priority}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
      />
    );
  }
  const h = hueFor(project.slug);
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.025]"
      style={{
        backgroundImage: `radial-gradient(120% 90% at 15% 10%, hsl(${h} 70% 62% / 0.55), transparent 60%),
          radial-gradient(90% 80% at 90% 100%, hsl(${(h + 50) % 360} 65% 50% / 0.45), transparent 65%),
          linear-gradient(135deg, hsl(${h} 25% 18%), hsl(${(h + 30) % 360} 30% 10%))`,
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <span className="relative font-mono text-5xl font-medium tracking-tight text-white/90 sm:text-6xl">
        {monogram(project.title)}
      </span>
    </div>
  );
}
