import type { Metadata } from "next";
import { ProjectBrowser } from "@/components/project-browser";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Products, backend services and machine learning projects built by İkbal Arslan.",
  alternates: { canonical: "/projects" },
  openGraph: { url: "/projects", title: "Projects | İkbal Arslan" },
};

export default function ProjectsPage() {
  return (
    <>
      <header className="px-6 py-16 md:px-10 md:py-20">
        <h1 className="t-display">Things I have built</h1>
        <p className="mt-5 max-w-[62ch] leading-7 text-muted">
          Everything in one place, from current products to university projects. The home page
          shows a short selection.
        </p>
      </header>
      <section className="border-t border-line lg:grid lg:grid-cols-12">
        <div className="px-6 pt-10 md:px-10 lg:col-span-3 lg:border-r lg:border-line lg:py-10">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
            <h2 className="t-sub">All projects</h2>
            <p className="eyebrow mt-3">{projects.length} total</p>
          </div>
        </div>
        <div className="min-w-0 px-6 pb-12 pt-8 md:px-10 lg:col-span-9 lg:py-10">
          <ProjectBrowser />
        </div>
      </section>
    </>
  );
}
