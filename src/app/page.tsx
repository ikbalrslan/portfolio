import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { ArrowIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";
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

const contacts = [
  { label: "Email", href: `mailto:${site.email}`, text: site.email, Icon: MailIcon, external: false },
  { label: "LinkedIn", href: site.linkedin, text: `in/${site.linkedinHandle}`, Icon: LinkedInIcon, external: true },
  { label: "GitHub", href: site.github, text: `github.com/${site.githubHandle}`, Icon: GitHubIcon, external: true },
];

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
        <ul className="mt-6 flex flex-col gap-3 text-sm">
          {contacts.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                className="group inline-flex min-w-0 max-w-full items-center gap-3 text-ink"
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-line text-muted transition-colors group-hover:border-accent group-hover:text-accent">
                  <c.Icon />
                </span>
                <span className="min-w-0">
                  <span className="eyebrow block">{c.label}</span>
                  <span className="block truncate underline-offset-4 group-hover:underline">{c.text}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
