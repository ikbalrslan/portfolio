"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GitHubIcon } from "./icons";
import { site } from "@/data/site";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export function NavLinks() {
  const pathname = usePathname();
  return (
    <nav aria-label="Primary" className="flex items-center gap-5 text-sm sm:gap-7">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="nav-link"
          aria-current={pathname === l.href ? "page" : undefined}
        >
          {l.label}
        </Link>
      ))}
      <a
        href={site.github}
        target="_blank"
        rel="noopener noreferrer"
        className="nav-link"
        aria-label="GitHub profile"
      >
        <GitHubIcon />
      </a>
    </nav>
  );
}
