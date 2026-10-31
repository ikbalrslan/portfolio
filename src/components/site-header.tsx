import Link from "next/link";
import { NavLinks } from "./nav-links";
import { site } from "@/data/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 px-4 backdrop-blur-md sm:px-5 md:px-10">
      <div className="mx-auto flex h-[var(--nav-h)] max-w-[var(--frame)] items-center justify-between gap-6 px-1 sm:px-6 md:px-10">
        <Link href="/" className="shrink-0 text-[0.9375rem] font-medium tracking-[-0.01em] text-ink">
          {site.name}
        </Link>
        <NavLinks />
      </div>
    </header>
  );
}
