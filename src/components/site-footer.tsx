import { site } from "@/data/site";

const socials = [
  { label: "GitHub", href: site.github },
  { label: "Email", href: `mailto:${site.email}` },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line px-4 sm:px-5 md:px-10">
      <div className="mx-auto flex max-w-[var(--frame)] flex-col gap-4 border-x border-line px-6 py-8 text-sm sm:flex-row sm:items-center sm:justify-between md:px-10">
        <p className="text-muted">
          © {site.name}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                className="text-muted transition-colors hover:text-ink"
                {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
