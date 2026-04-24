import Link from "next/link";
import { PROFILE } from "@/lib/projects";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/publications", label: "Publications" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-black/40">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-3">
        <Link
          href="/"
          className="font-semibold tracking-tight text-black dark:text-white"
        >
          Portfolio
        </Link>
        <nav className="hidden gap-1 sm:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-white/10"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          href={`mailto:${PROFILE.email}?subject=Portfolio%20Inquiry`}
          className="rounded-full bg-black px-3.5 py-2 text-sm font-medium text-white hover:bg-black/85 dark:bg-white dark:text-black dark:hover:bg-white/85"
        >
          Hire me
        </Link>
      </div>
    </header>
  );
}

