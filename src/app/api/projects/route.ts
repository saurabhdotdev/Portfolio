import { NextRequest, NextResponse } from "next/server";
import { PROJECTS } from "@/lib/projects";

export const dynamic = "force-dynamic";

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function hasTextMatch(projectText: string, query: string) {
  return projectText.includes(query);
}

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = normalize(searchParams.get("q") ?? "");
  const tag = normalize(searchParams.get("tag") ?? "");

  const projects = PROJECTS.filter((project) => {
    const projectText = normalize(
      [
        project.title,
        project.description,
        project.tags.join(" "),
        project.highlights?.join(" ") ?? "",
      ].join(" "),
    );
    const tags = project.tags.map(normalize);
    const matchesQuery = query ? hasTextMatch(projectText, query) : true;
    const matchesTag = tag ? tags.includes(tag) : true;

    return matchesQuery && matchesTag;
  });

  const tags = [...new Set(PROJECTS.flatMap((project) => project.tags))].sort();

  return NextResponse.json(
    {
      ok: true,
      filters: {
        query,
        tag,
        availableTags: tags,
      },
      stats: {
        totalProjects: PROJECTS.length,
        matchedProjects: projects.length,
        totalTags: tags.length,
      },
      projects: projects.map((project) => ({
        slug: project.slug,
        title: project.title,
        description: project.description,
        tags: project.tags,
        highlights: project.highlights?.slice(0, 2) ?? [],
      })),
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
      },
    },
  );
}
