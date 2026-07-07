import { CircleDot, MapPin } from "lucide-react";
import { ClubBadge } from "@/components/club-badge";
import { SeasonSelector } from "@/components/season-selector";
import {
  CYPRUS_FIRST_DIVISION_SEASON,
  getFootballDataset,
  normalizeSeason
} from "@/lib/data/cyprus-football";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = createMetadata({
  title: "Cyprus First Division Results",
  description:
    "Check Cyprus First Division results by season with match scores, venues and latest completed fixtures.",
  path: "/results"
});

type ResultsPageProps = {
  searchParams?: Promise<{
    season?: string;
  }>;
};

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const params = await searchParams;
  const requestedSeason = normalizeSeason(
    Number(params?.season ?? CYPRUS_FIRST_DIVISION_SEASON)
  );
  const data = await getFootballDataset({ season: requestedSeason });
  const { currentSeason, results, seasons } = data;
  const goals = results.reduce(
    (total, result) => total + result.homeScore + result.awayScore,
    0
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 border-b border-[var(--line)] pb-8">
        <p className="text-sm font-bold uppercase text-[var(--brand)]">
          CYsportnews Football
        </p>
        <h1 className="text-4xl font-black text-white">Results</h1>
        <p className="max-w-2xl text-base leading-7 text-[var(--muted)]">
          Cyprus First Division results for {currentSeason.label}, loaded
          server-side from API-Football.
        </p>
      </div>

      <SeasonSelector
        basePath="/results"
        notice={data.seasonNotice}
        selectedSeason={data.requestedSeason}
        seasons={seasons}
      />

      <section className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="sports-card rounded-lg p-4">
          <p className="text-2xl font-black text-white">{results.length}</p>
          <p className="mt-1 text-xs font-bold uppercase text-[var(--muted)]">
            Recent results
          </p>
        </div>
        <div className="sports-card rounded-lg p-4">
          <p className="text-2xl font-black text-white">{goals}</p>
          <p className="mt-1 text-xs font-bold uppercase text-[var(--muted)]">
            Goals shown
          </p>
        </div>
        <div className="sports-card rounded-lg p-4">
          <p className="text-2xl font-black text-white">FT</p>
          <p className="mt-1 text-xs font-bold uppercase text-[var(--muted)]">
            Final scores
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-4">
        {results.length > 0 ? results.map((result) => (
          <article className="sports-card rounded-lg p-5" key={result.id}>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-4">
              <p className="inline-flex items-center gap-2 text-sm font-bold text-[var(--brand)]">
                <CircleDot size={16} aria-hidden="true" />
                {result.round}
              </p>
              <p className="text-sm text-[var(--muted)]">{result.dateLabel}</p>
            </div>

            <div className="mt-5 grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
              <div className="flex items-center gap-3">
                <ClubBadge
                  name={result.homeTeam.shortName}
                  color={result.homeTeam.primaryColor}
                />
                <span className="text-lg font-black text-white">
                  {result.homeTeam.name}
                </span>
              </div>
              <div className="rounded-md bg-white px-5 py-2 text-center text-2xl font-black text-[#080a0f]">
                {result.homeScore}-{result.awayScore}
              </div>
              <div className="flex items-center gap-3 sm:justify-end">
                <span className="text-lg font-black text-white">
                  {result.awayTeam.name}
                </span>
                <ClubBadge
                  name={result.awayTeam.shortName}
                  color={result.awayTeam.primaryColor}
                />
              </div>
            </div>

            <p className="mt-5 inline-flex items-center gap-2 text-sm text-[var(--muted)]">
              <MapPin size={16} aria-hidden="true" />
              {result.venue}
            </p>
          </article>
        )) : (
          <div className="sports-card rounded-lg p-8 text-center">
            <p className="text-lg font-black text-white">No results available</p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              API-Football did not return finished matches for this season.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
