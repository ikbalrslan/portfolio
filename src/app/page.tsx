import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { ArrowIcon } from "@/components/icons";
import { featuredProjects, projects } from "@/data/projects";
import { site } from "@/data/site";

function Section({
  id,
  title,
  note,
  children,
}: {
  id?: string;
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-[var(--nav-h)] border-t border-line lg:grid lg:grid-cols-12">
      <div className="px-6 pt-10 md:px-10 lg:col-span-3 lg:border-r lg:border-line lg:py-10">
        <h2 className="t-sub">{title}</h2>
        {note ? <p className="eyebrow mt-3">{note}</p> : null}
      </div>
      <div className="min-w-0 px-6 pb-10 pt-8 md:px-10 lg:col-span-9 lg:py-10">{children}</div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <header className="px-6 py-16 md:px-10 md:py-24">
        <p className="eyebrow">Software engineer</p>
        <h1 className="t-display mt-4">{site.name}</h1>
        <p className="mt-5 max-w-[62ch] leading-7 text-muted">
          I build web products and the backend systems behind them, mostly with TypeScript and
          Java. Lately that means Optify, an AI-assisted SEO platform, and tools for monitoring
          production lines. Earlier work spans Spring Boot services and machine learning projects.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/projects" className="btn btn-solid">
            View projects
          </Link>
          <a href="#contact" className="btn btn-outline">
            Get in touch
          </a>
        </div>
      </header>

      <Section title="Selected work" note={`${featuredProjects.length} of ${projects.length}`}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">
          {featuredProjects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} priority={i < 2} />
          ))}
        </div>
        <Link
          href="/projects"
          className="mt-10 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
        >
          All projects <ArrowIcon />
        </Link>
      </Section>

      <Section id="contact" title="Contact">
        <p className="max-w-[56ch] leading-7 text-muted">
          Open to interesting work and collaboration. The quickest way to reach me is email, and
          most of my code lives on GitHub.
        </p>
        <dl className="mt-6 grid max-w-md grid-cols-[5rem_1fr] gap-y-3 text-sm">
          <dt className="eyebrow self-center">Email</dt>
          <dd className="min-w-0 truncate">
            <a href={`mailto:${site.email}`} className="text-ink underline-offset-4 hover:underline">
              {site.email}
            </a>
          </dd>
          <dt className="eyebrow self-center">GitHub</dt>
          <dd className="min-w-0 truncate">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline-offset-4 hover:underline"
            >
              github.com/{site.githubHandle}
            </a>
          </dd>
        </dl>
      </Section>
    </>
  );
}
