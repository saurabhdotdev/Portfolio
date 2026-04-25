import { NextResponse } from "next/server";

const USERNAME = "saurabhdotdev";
const CACHE_SECONDS = 60 * 30;

type GitHubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
};

type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  fork: boolean;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  pushed_at: string | null;
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function githubHeaders() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "saurabh-kulkarni-portfolio",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

export async function GET() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);

  try {
    const headers = githubHeaders();
    const [profileResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, {
        headers,
        signal: controller.signal,
        next: { revalidate: CACHE_SECONDS },
      }),
      fetch(
        `https://api.github.com/users/${USERNAME}/repos?type=owner&sort=updated&per_page=12`,
        {
          headers,
          signal: controller.signal,
          next: { revalidate: CACHE_SECONDS },
        },
      ),
    ]);

    if (!profileResponse.ok || !reposResponse.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: "GitHub data is temporarily unavailable.",
        },
        { status: 502 },
      );
    }

    const profile = (await profileResponse.json()) as GitHubUser;
    const repos = (await reposResponse.json()) as GitHubRepo[];
    const ownRepos = repos
      .filter((repo) => !repo.fork)
      .sort(
        (a, b) =>
          new Date(b.pushed_at ?? b.updated_at).getTime() -
          new Date(a.pushed_at ?? a.updated_at).getTime(),
      );

    return NextResponse.json(
      {
        ok: true,
        refreshedAt: new Date().toISOString(),
        profile: {
          login: profile.login,
          name: profile.name,
          avatarUrl: profile.avatar_url,
          url: profile.html_url,
          publicRepos: profile.public_repos,
          followers: profile.followers,
        },
        totals: {
          stars: ownRepos.reduce(
            (total, repo) => total + repo.stargazers_count,
            0,
          ),
          repositories: ownRepos.length,
        },
        repos: ownRepos.slice(0, 6).map((repo) => ({
          name: repo.name,
          description: repo.description,
          url: repo.html_url,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
          updatedAt: repo.pushed_at ?? repo.updated_at,
        })),
      },
      {
        headers: {
          "Cache-Control": `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=86400`,
        },
      },
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "GitHub data is temporarily unavailable.",
      },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
