"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type GitHubRepo = {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  language: string | null;
  updatedAt: string;
};

type GitHubSummary = {
  ok: boolean;
  profile?: {
    login: string;
    name: string | null;
    avatarUrl: string;
    url: string;
    publicRepos: number;
    followers: number;
  };
  totals?: {
    stars: number;
    repositories: number;
  };
  repos?: GitHubRepo[];
  error?: string;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function GitHubActivity() {
  const [summary, setSummary] = useState<GitHubSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadGitHub() {
      try {
        const response = await fetch("/api/github", {
          signal: controller.signal,
        });
        const data = (await response.json()) as GitHubSummary;
        setSummary(data);
      } catch {
        if (!controller.signal.aborted) {
          setSummary({
            ok: false,
            error: "Live GitHub data is unavailable right now.",
          });
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadGitHub();

    return () => controller.abort();
  }, []);

  const repos = summary?.repos ?? [];

  return (
    <section
      className="snap-start scroll-mt-24 mt-16"
      style={{ scrollSnapAlign: "start" }}
    >
      <div className="grid gap-4 rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5 md:grid-cols-[0.85fr_1.15fr] md:p-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Live profile
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight">
            GitHub activity
          </h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-zinc-700 dark:text-zinc-200">
            Recent repositories, stars, and profile data from the right GitHub
            account.
          </p>

          <div className="mt-5 grid grid-cols-3 gap-2">
            {[
              {
                label: "Repos",
                value: summary?.profile?.publicRepos ?? "-",
              },
              {
                label: "Stars",
                value: summary?.totals?.stars ?? "-",
              },
              {
                label: "Followers",
                value: summary?.profile?.followers ?? "-",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl bg-zinc-50 p-3 dark:bg-white/5"
              >
                <div className="text-lg font-semibold tracking-tight">
                  {item.value}
                </div>
                <div className="mt-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <Link
            href="https://github.com/saurabhdotdev"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/85 dark:bg-white dark:text-black dark:hover:bg-white/85"
          >
            Open GitHub
          </Link>
        </div>

        <div className="min-h-64 rounded-xl bg-zinc-50 p-3 dark:bg-black/25">
          {isLoading ? (
            <div className="grid gap-3">
              {[0, 1, 2].map((item) => (
                <div
                  key={item}
                  className="h-24 animate-pulse rounded-xl bg-zinc-200/70 dark:bg-white/10"
                />
              ))}
            </div>
          ) : !summary?.ok ? (
            <div className="flex min-h-56 items-center justify-center rounded-xl border border-dashed border-black/10 px-5 text-center text-sm text-zinc-600 dark:border-white/10 dark:text-zinc-300">
              {summary?.error ?? "GitHub data is unavailable right now."}
            </div>
          ) : (
            <div className="grid gap-3">
              {repos.slice(0, 4).map((repo) => (
                <Link
                  key={repo.url}
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-black/10 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-sm dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold">{repo.name}</div>
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-600 dark:text-zinc-300">
                        {repo.description ?? "Repository details on GitHub."}
                      </p>
                    </div>
                    <div className="shrink-0 rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700 dark:bg-white/10 dark:text-zinc-200">
                      {repo.stars} star{repo.stars === 1 ? "" : "s"}
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                    {repo.language ? <span>{repo.language}</span> : null}
                    <span>Updated {formatDate(repo.updatedAt)}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
