import { NextResponse } from "next/server";
import { getFootballDataset } from "@/lib/data/cyprus-football";

export const revalidate = 1200;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const season = Number(searchParams.get("season"));
  const dataset = await getFootballDataset(
    Number.isInteger(season) && season > 2000 ? { season } : undefined
  );

  return NextResponse.json(dataset, {
    headers: {
      "Cache-Control": "s-maxage=1200, stale-while-revalidate=600"
    }
  });
}
