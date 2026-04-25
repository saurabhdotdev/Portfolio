"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type Interest = "frontend" | "backend" | "ml" | "data" | "embedded" | "research";

type Recommendation = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  score: number;
  reasons: string[];
};

type RecommendationResponse = {
  ok: boolean;
  recommendations?: Recommendation[];
  error?: string;
};

const interests: { id: Interest; label: string }[] = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "ml", label: "ML/AI" },
  { id: "data", label: "Data" },
  { id: "embedded", label: "Embedded" },
  { id: "research", label: "Research" },
];

export function ProjectMatcher() {
  const [selected, setSelected] = useState<Interest[]>(["backend", "ml"]);
  const [goal, setGoal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  function toggleInterest(interest: Interest) {
    setSelected((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/projects/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          interests: selected,
          goal,
        }),
      });
      const data = (await response.json()) as RecommendationResponse;

      if (!response.ok || !data.ok) {
        setError(data.error ?? "Could not load recommendations.");
        setRecommendations([]);
        return;
      }

      setRecommendations(data.recommendations ?? []);
    } catch {
      setError("Could not reach the project recommendation API.");
      setRecommendations([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="mt-8 rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5 md:p-6">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <form onSubmit={handleSubmit}>
          <div className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
            Project fit
          </div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Find the strongest project fit
          </h2>

          <div className="mt-5">
            <div className="text-sm font-medium">Focus areas</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {interests.map((interest) => {
                const isActive = selected.includes(interest.id);

                return (
                  <button
                    key={interest.id}
                    type="button"
                    onClick={() => toggleInterest(interest.id)}
                    className={
                      isActive
                        ? "rounded-full bg-black px-3 py-1.5 text-sm font-medium text-white dark:bg-white dark:text-black"
                        : "rounded-full border border-black/10 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-black/5 dark:border-white/15 dark:text-zinc-200 dark:hover:bg-white/10"
                    }
                  >
                    {interest.label}
                  </button>
                );
              })}
            </div>
          </div>

          <label className="mt-5 block text-sm font-medium">
            Goal
            <input
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
              placeholder="Example: APIs, ML, embedded systems"
              className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black dark:border-white/10 dark:bg-black dark:focus:border-white"
            />
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-5 inline-flex rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-white/85"
          >
            {isLoading ? "Matching..." : "Match projects"}
          </button>

          {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
        </form>

        <div className="rounded-xl bg-zinc-50 p-3 dark:bg-black/25">
          {recommendations.length === 0 ? (
            <div className="flex min-h-64 items-center justify-center rounded-xl border border-dashed border-black/10 px-5 text-center text-sm text-zinc-600 dark:border-white/10 dark:text-zinc-300">
              Match your focus areas with the strongest project examples.
            </div>
          ) : (
            <div className="grid gap-3">
              {recommendations.map((project, index) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="rounded-xl border border-black/10 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-sm dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                        Match {index + 1} - score {project.score}
                      </div>
                      <h3 className="mt-1 text-sm font-semibold">
                        {project.title}
                      </h3>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
                      Ranked
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-zinc-600 dark:text-zinc-300">
                    {project.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.reasons.slice(0, 2).map((reason) => (
                      <span
                        key={reason}
                        className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-700 dark:bg-white/10 dark:text-zinc-200"
                      >
                        {reason}
                      </span>
                    ))}
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
