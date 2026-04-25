import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS, type Project } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm leading-6 text-zinc-700 dark:text-zinc-200">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-900 dark:bg-white" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function MetaCard({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-zinc-50 p-4 dark:bg-white/5">
      <div className="text-xs font-medium uppercase text-zinc-500 dark:text-zinc-400">
        {label}
      </div>
      <div className="mt-2 text-sm font-medium leading-6">{value}</div>
    </div>
  );
}

function getStack(project: Project) {
  return project.stack?.length ? project.stack : project.tags;
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Saurabh Kulkarni`,
      description: project.description,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const stack = getStack(project);

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-14">
      <Link
        href="/projects"
        className="text-sm font-medium text-zinc-700 hover:underline dark:text-zinc-200"
      >
        Back to projects
      </Link>

      <section className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-800 dark:bg-white/10 dark:text-zinc-200"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight">
            {project.title}
          </h1>
          <p className="mt-4 max-w-3xl text-pretty text-lg leading-8 text-zinc-700 dark:text-zinc-200">
            {project.description}
          </p>

          {project.problem ? (
            <div className="mt-8 rounded-2xl border border-black/10 bg-zinc-50 p-5 dark:border-white/10 dark:bg-white/5">
              <div className="text-sm font-semibold">Problem</div>
              <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-200">
                {project.problem}
              </p>
            </div>
          ) : null}
        </div>

        <aside className="grid gap-3 rounded-2xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
          <MetaCard label="Role" value={project.role ?? "End-to-end builder"} />
          <MetaCard label="Timeline" value={project.timeline ?? "Project work"} />
          <MetaCard
            label="Stack"
            value={
              <div className="flex flex-wrap gap-2">
                {stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white px-2.5 py-1 text-xs text-zinc-700 ring-1 ring-black/10 dark:bg-black dark:text-zinc-200 dark:ring-white/10"
                  >
                    {item}
                  </span>
                ))}
              </div>
            }
          />
        </aside>
      </section>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {project.architecture?.length ? (
          <Section title="Architecture">
            <BulletList items={project.architecture} />
          </Section>
        ) : null}

        {project.approach?.length ? (
          <Section title="Implementation">
            <BulletList items={project.approach} />
          </Section>
        ) : null}

        {project.outcomes?.length ? (
          <Section title="Results">
            <BulletList items={project.outcomes} />
          </Section>
        ) : null}

        {project.highlights?.length ? (
          <Section title="Technical Highlights">
            <BulletList items={project.highlights} />
          </Section>
        ) : null}
      </div>

      {project.embed ? (
        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight">Demo</h2>
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
        <section className="mt-10 rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h2 className="text-xl font-semibold tracking-tight">Links</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {project.links.map((link) => (
              <Link
                key={`${link.label}-${link.href}`}
                href={link.href}
                className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
