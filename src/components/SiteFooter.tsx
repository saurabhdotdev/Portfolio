import Link from "next/link";
import { PROFILE } from "@/lib/projects";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 py-10 dark:border-white/10">
      <div className="mx-auto w-full max-w-5xl px-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            © {new Date().getFullYear()} {PROFILE.name}. Built with Next.js.
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            {PROFILE.socials.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="text-zinc-700 hover:underline dark:text-zinc-200"
                target="_blank"
                rel="noreferrer"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

