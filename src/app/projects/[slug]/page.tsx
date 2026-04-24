import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/lib/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-14">
      <Link
        href="/projects"
        className="text-sm font-medium text-zinc-700 hover:underline dark:text-zinc-200"
      >
        ← Back to projects
      </Link>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight">
        {project.title}
      </h1>
      <p className="mt-3 max-w-3xl text-zinc-700 dark:text-zinc-200">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span
            key={t}
            className="rounded-full bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-800 dark:bg-white/10 dark:text-zinc-200"
          >
            {t}
          </span>
        ))}
      </div>

      {project.highlights?.length ? (
        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight">Highlights</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-700 dark:text-zinc-200">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {project.embed ? (
        <section className="mt-10">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-xl font-semibold tracking-tight">Embedded demo</h2>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              Update the URL in <span className="font-mono">src/lib/projects.ts</span>
            </div>
          </div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-black/10 bg-black/5 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="aspect-video">
              <iframe
                title={project.embed.title}
                src={project.embed.src}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      ) : null}

      {project.links?.length ? (
        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight">Links</h2>
          <ul className="mt-4 space-y-2">
            {project.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm font-medium text-zinc-700 hover:underline dark:text-zinc-200"
                  target="_blank"
                  rel="noreferrer"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}

