import Link from "next/link";
import { PUBLICATIONS } from "@/lib/projects";

export default function PublicationsPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-14">
      <h1 className="text-3xl font-semibold tracking-tight">Publications</h1>
      <p className="mt-3 max-w-2xl text-zinc-700 dark:text-zinc-200">
        Peer-reviewed publications and research outputs.
      </p>

      <div className="mt-8 space-y-4">
        {PUBLICATIONS.map((p) => (
          <article
            key={`${p.title}-${p.year}`}
            className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h2 className="text-lg font-semibold tracking-tight">{p.title}</h2>
              <div className="text-sm text-zinc-600 dark:text-zinc-300">
                {p.year}
              </div>
            </div>
            <div className="mt-1 text-sm text-zinc-700 dark:text-zinc-200">
              {p.venue}
            </div>
            {p.notes ? (
              <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-200">
                {p.notes}
              </p>
            ) : null}

            {p.links?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {p.links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </main>
  );
}

