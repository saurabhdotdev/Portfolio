import { EXPERIENCE, PROFILE, RESUME_SKILLS } from "@/lib/projects";

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-14">
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>
      <p className="mt-4 max-w-2xl text-zinc-700 dark:text-zinc-200">
        I’m {PROFILE.name}, a developer who enjoys building products end-to-end:
        clean UI, robust APIs, and ML features that solve real problems.
      </p>
      <p className="mt-3 max-w-2xl text-zinc-700 dark:text-zinc-200">
        {PROFILE.education}
      </p>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">Experience</h2>
      <div className="mt-4 space-y-4">
        {EXPERIENCE.map((e) => (
          <div
            key={`${e.company}-${e.title}-${e.start}`}
            className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <div className="text-base font-semibold tracking-tight">
                {e.title}
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-300">
                {e.start} — {e.end}
              </div>
            </div>
            <div className="mt-1 text-sm text-zinc-700 dark:text-zinc-200">
              {e.company}
              {e.location ? ` • ${e.location}` : ""}
              {e.type ? ` • ${e.type}` : ""}
            </div>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-700 dark:text-zinc-200">
              {e.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">Skills</h2>
      <div className="mt-4 space-y-3 text-sm text-zinc-700 dark:text-zinc-200">
        {Object.entries(RESUME_SKILLS).map(([k, v]) => (
          <div key={k} className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="font-semibold tracking-tight text-zinc-900 dark:text-white">
              {k}
            </div>
            <div className="mt-2 leading-6">{v.join(", ")}</div>
          </div>
        ))}
      </div>
    </main>
  );
}

