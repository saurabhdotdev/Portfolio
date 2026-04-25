import Link from "next/link";
import { PROFILE, PROJECTS, QUICK_WINS, SKILLS, STATS } from "@/lib/projects";
import { HomeScrollFX } from "@/components/HomeScrollFX";
import { GitHubActivity } from "@/components/GitHubActivity";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-14">
      <HomeScrollFX />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-1/2 top-24 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-violet-500/20 via-blue-500/10 to-cyan-400/20 blur-3xl"
      />

      <section
        className="snap-start scroll-mt-24 grid min-h-[calc(100vh-140px)] gap-10 md:grid-cols-12 md:items-center"
        style={{ scrollSnapAlign: "start" }}
      >
        <div className="md:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">
            <span>{PROFILE.location}</span>
            <span className="text-zinc-400 dark:text-zinc-500">•</span>
            <span>{PROFILE.availability}</span>
          </div>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Hi, I’m{" "}
            <span className="text-gradient font-semibold">{PROFILE.name}</span>.
          </h1>
          <p className="mt-4 text-pretty text-lg text-zinc-700 dark:text-zinc-200">
            <span className="font-medium text-zinc-900 dark:text-white">
              {PROFILE.role}
            </span>
            . {PROFILE.headline}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-black/85 dark:bg-white dark:text-black dark:hover:bg-white/85"
            >
              View projects
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-black/10 px-5 py-2.5 text-sm font-medium text-black hover:bg-black/5 dark:border-white/15 dark:text-white dark:hover:bg-white/10"
            >
              Contact
            </Link>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5"
              >
                <div className="text-xl font-semibold tracking-tight">
                  {s.value}
                </div>
                <div className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-300">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="rounded-3xl border border-black/10 bg-gradient-to-br from-zinc-50 to-white p-6 shadow-sm dark:border-white/10 dark:from-white/5 dark:to-white/0">
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Why me
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-700 dark:text-zinc-200">
              {QUICK_WINS.map((w) => (
                <li key={w} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-900 dark:bg-white" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
            <h2 className="mt-6 text-xl font-semibold tracking-tight">
              Featured project: {PROJECTS[0]?.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-200">
              {PROJECTS[0]?.description}
            </p>
            <div className="mt-4 flex gap-2">
              <Link
                href="/projects"
                className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/85 dark:bg-white dark:text-black dark:hover:bg-white/85"
              >
                Projects
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>

      <GitHubActivity />

      <section
        className="snap-start scroll-mt-24 mt-16"
        style={{ scrollSnapAlign: "start" }}
      >
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
          <Link
            href="/projects"
            className="text-sm font-medium text-zinc-700 hover:underline dark:text-zinc-200"
          >
            See all
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {PROJECTS.slice(0, 3).map((p) => (
            <div
              key={p.slug}
              className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm hover:shadow-md dark:border-white/10 dark:bg-white/5"
            >
              <div className="text-sm font-semibold">{p.title}</div>
              <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-200">
                {p.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-800 dark:bg-white/10 dark:text-zinc-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="snap-start scroll-mt-24 mt-16"
        style={{ scrollSnapAlign: "start" }}
      >
        <h2 className="text-2xl font-semibold tracking-tight">Core skills</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-700 dark:text-zinc-200">
          I focus on shipping end-to-end systems: polished UI, reliable backend,
          and data/ML features when they’re actually useful.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {SKILLS.map((s) => (
            <span
              key={s}
              className="rounded-full bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-800 dark:bg-white/10 dark:text-zinc-200"
            >
              {s}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
