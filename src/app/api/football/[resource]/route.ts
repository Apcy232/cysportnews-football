import { NextResponse } from "next/server";
import { getFootballDataset } from "@/lib/data/cyprus-football";

export const revalidate = 1200;

type RouteContext = {
  params: Promise<{
    resource: string;
  }>;
};

export async function GET(request: Request, context: RouteContext) {
  const { resource } = await context.params;
  const { searchParams } = new URL(request.url);
  const season = Number(searchParams.get("season"));
  const dataset = await getFootballDataset(
    Number.isInteger(season) && season > 2000 ? { season } : undefined
  );
  const payload = selectResource(resource, dataset);

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "s-maxage=1200, stale-while-revalidate=600"
    }
  });
}

function selectResource(
  resource: string,
  dataset: Awaited<ReturnType<typeof getFootballDataset>>
) {
  switch (resource) {
    case "standings":
      return dataset.standings;
    case "fixtures":
      return dataset.fixtures;
    case "results":
      return dataset.results;
    case "clubs":
    case "teams":
      return dataset.teams;
    case "players":
    case "squads":
      return dataset.players;
    case "top-scorers":
      return dataset.topScorers;
    case "europe":
      return dataset.europeanClubCards;
    default:
      return dataset;
  }
}
