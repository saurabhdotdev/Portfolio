import { NextResponse } from "next/server";
import { PROJECTS } from "@/lib/projects";

export const dynamic = "force-dynamic";

type RecommendationPayload = {
  interests?: unknown;
  goal?: unknown;
};

const INTERESTS = [
  "frontend",
  "backend",
  "ml",
  "data",
  "embedded",
  "research",
] as const;

type Interest = (typeof INTERESTS)[number];

const interestSignals: Record<Interest, string[]> = {
  frontend: ["react", "next", "ui", "web", "frontend", "tailwind"],
  backend: ["api", "backend", "node", "express", "sql", "database"],
  ml: [
    "machine learning",
    "ml",
    "ai",
    "recommender",
    "nlp",
    "clustering",
    "similarity",
  ],
  data: ["data", "analytics", "segmentation", "pandas", "numpy", "dbscan"],
  embedded: ["embedded", "fpga", "iot", "sensor", "uart", "gpio", "vivado"],
  research: ["paper", "scopus", "research", "watermarking", "simulation"],
};

function normalize(value: string) {
  return value.toLowerCase();
}

function getProjectText(project: (typeof PROJECTS)[number]) {
  return normalize(
    [
      project.title,
      project.description,
      project.tags.join(" "),
      project.highlights?.join(" ") ?? "",
    ].join(" "),
  );
}

function parseInterests(value: unknown): Interest[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((interest): interest is Interest =>
      INTERESTS.includes(String(interest) as Interest),
    )
    .slice(0, 6);
}

function scoreProject(
  project: (typeof PROJECTS)[number],
  interests: Interest[],
  goal: string,
) {
  const projectText = getProjectText(project);
  const reasons: string[] = [];
  let score = 0;

  interests.forEach((interest) => {
    const signals = interestSignals[interest];
    const matchedSignals = signals.filter((signal) =>
      projectText.includes(signal),
    );

    if (matchedSignals.length > 0) {
      score += 3 + matchedSignals.length;
      reasons.push(
        `Matches ${interest} through ${matchedSignals.slice(0, 3).join(", ")}`,
      );
    }
  });

  const goalWords = normalize(goal)
    .split(/[^a-z0-9+#.]+/)
    .filter((word) => word.length > 2)
    .slice(0, 12);
  const goalMatches = goalWords.filter((word) => projectText.includes(word));

  if (goalMatches.length > 0) {
    score += goalMatches.length * 2;
    reasons.push(`Goal overlap: ${goalMatches.slice(0, 4).join(", ")}`);
  }

  if (project.highlights?.length) {
    score += 1;
  }

  return {
    project,
    score,
    reasons,
  };
}

export async function POST(request: Request) {
  let payload: RecommendationPayload;

  try {
    payload = (await request.json()) as RecommendationPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const interests = parseInterests(payload.interests);
  const goal = typeof payload.goal === "string" ? payload.goal.trim() : "";

  if (interests.length === 0 && goal.length < 3) {
    return NextResponse.json(
      {
        ok: false,
        error: "Select at least one focus area or enter a project goal.",
      },
      { status: 400 },
    );
  }

  const recommendations = PROJECTS.map((project) =>
    scoreProject(project, interests, goal),
  )
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ project, score, reasons }) => ({
      slug: project.slug,
      title: project.title,
      description: project.description,
      tags: project.tags,
      score,
      reasons:
        reasons.length > 0 ? reasons : ["Strong general portfolio fit"],
    }));

  return NextResponse.json({
    ok: true,
    input: {
      interests,
      goal,
    },
    recommendations,
  });
}
