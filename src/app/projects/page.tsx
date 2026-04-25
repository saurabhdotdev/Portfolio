import Link from "next/link";
import { PROJECTS } from "@/lib/projects";
import { ProjectMatcher } from "@/components/ProjectMatcher";

export default function ProjectsPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-14">
      <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-3 max-w-2xl text-zinc-700 dark:text-zinc-200">
        Selected work across full-stack development, machine learning, and
        embedded/FPGA.
      </p>

      <ProjectMatcher />

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm hover:shadow-md dark:border-white/10 dark:bg-white/5"
          >
            <h2 className="text-lg font-semibold tracking-tight">{p.title}</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-200">
              {p.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-800 dark:bg-white/10 dark:text-zinc-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
