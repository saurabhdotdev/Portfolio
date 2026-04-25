import Link from "next/link";
import { EDUCATION, EXPERIENCE, PROFILE, PROJECTS, RESUME_SKILLS } from "@/lib/projects";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-10 border-b border-black/10 pb-2 text-sm font-semibold tracking-wide text-zinc-900 dark:border-white/10 dark:text-white">
      {children}
    </div>
  );
}

export default function ResumePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-14">
      <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5">
        <div className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight">{PROFILE.name}</h1>
          <div className="mt-5">
            <Link
              href="/resume.pdf"
              className="inline-flex rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-black/85 dark:bg-white dark:text-black dark:hover:bg-white/85"
            >
              Download resume
            </Link>
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-zinc-600 dark:text-zinc-300">
            <span>{PROFILE.phone}</span>
            <span className="text-zinc-300 dark:text-zinc-600">/</span>
            <Link className="hover:underline" href={`mailto:${PROFILE.email}`}>
              {PROFILE.email}
            </Link>
            <span className="text-zinc-300 dark:text-zinc-600">/</span>
            <span>
              GitHub:{" "}
              <span className="font-medium text-zinc-800 dark:text-zinc-100">
                (add your handle)
              </span>
            </span>
          </div>
        </div>

        <SectionTitle>EXPERIENCE</SectionTitle>
        <div className="mt-4 space-y-5">
          {EXPERIENCE.map((e) => (
            <div key={`${e.company}-${e.title}-${e.start}`}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div className="font-semibold">{e.company}</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-300">
                  {e.start} — {e.end}
                </div>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div className="text-sm font-medium italic text-zinc-800 dark:text-zinc-100">
                  {e.title}
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-300">
                  {e.location}
                </div>
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-zinc-700 dark:text-zinc-200">
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <SectionTitle>PROJECTS</SectionTitle>
        <div className="mt-4 space-y-4">
          {PROJECTS.map((p) => (
            <div key={p.slug}>
              <div className="font-semibold">{p.title}</div>
              {p.highlights?.length ? (
                <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-6 text-zinc-700 dark:text-zinc-200">
                  {p.highlights.slice(0, 4).map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>

        <SectionTitle>EDUCATION</SectionTitle>
        <div className="mt-4 space-y-4">
          {EDUCATION.map((ed) => (
            <div key={`${ed.school}-${ed.period}`}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div className="font-semibold">{ed.school}</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-300">
                  {ed.period}
                </div>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div className="text-sm italic text-zinc-800 dark:text-zinc-100">
                  {ed.degree}
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-300">
                  {ed.location}
                </div>
              </div>
              {ed.details.length ? (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-zinc-700 dark:text-zinc-200">
                  {ed.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>

        <SectionTitle>SKILLS</SectionTitle>
        <div className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-200">
          {Object.entries(RESUME_SKILLS).map(([k, v]) => (
            <div key={k} className="leading-6">
              <span className="font-semibold text-zinc-900 dark:text-white">
                {k}:
              </span>{" "}
              <span>{v.join(", ")}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
