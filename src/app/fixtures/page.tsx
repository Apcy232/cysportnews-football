import { CalendarDays, Clock, MapPin } from "lucide-react";
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
  title: "Cyprus First Division Fixtures",
  description:
    "View Cyprus First Division fixtures by season, including upcoming matches, venues and kick-off details.",
  path: "/fixtures"
});

type FixturesPageProps = {
  searchParams?: Promise<{
    season?: string;
  }>;
};

export default async function FixturesPage({ searchParams }: FixturesPageProps) {
  const params = await searchParams;
  const requestedSeason = normalizeSeason(
    Number(params?.season ?? CYPRUS_FIRST_DIVISION_SEASON)
  );
  const data = await getFootballDataset({ season: requestedSeason });
  const { currentSeason, fixtures, seasons } = data;
  const venues = new Set(fixtures.map((fixture) => fixture.venue)).size;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 border-b border-[var(--line)] pb-8">
        <p className="text-sm font-bold uppercase text-[var(--brand)]">
          CYsportnews Football
        </p>
        <h1 className="text-4xl font-black text-white">Fixtures</h1>
        <p className="max-w-2xl text-base leading-7 text-[var(--muted)]">
          Cyprus First Division fixtures for {currentSeason.label}, loaded
          server-side from API-Football.
        </p>
      </div>

      <SeasonSelector
        basePath="/fixtures"
        notice={data.seasonNotice}
        selectedSeason={data.requestedSeason}
        seasons={seasons}
      />

      <section className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="sports-card rounded-lg p-4">
          <p className="text-2xl font-black text-white">{fixtures.length}</p>
          <p className="mt-1 text-xs font-bold uppercase text-[var(--muted)]">
            Upcoming matches
          </p>
        </div>
        <div className="sports-card rounded-lg p-4">
          <p className="text-2xl font-black text-white">{venues}</p>
          <p className="mt-1 text-xs font-bold uppercase text-[var(--muted)]">
            Venues
          </p>
        </div>
        <div className="sports-card rounded-lg p-4">
          <p className="text-2xl font-black text-white">Live</p>
          <p className="mt-1 text-xs font-bold uppercase text-[var(--muted)]">
            Data mode
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-4">
        {fixtures.length > 0 ? fixtures.map((fixture) => (
          <article
            className="sports-card animate-lift rounded-lg p-5"
            key={fixture.id}
          >
            <div className="grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
              <div className="flex items-center gap-4">
                <ClubBadge
                  name={fixture.homeTeam.shortName}
                  color={fixture.homeTeam.primaryColor}
                />
                <div>
                  <p className="text-sm text-[var(--muted)]">Home</p>
                  <h2 className="text-xl font-black text-white">
                    {fixture.homeTeam.name}
                  </h2>
                </div>
              </div>

              <div className="rounded-lg border border-[var(--line)] bg-[#080b11] px-6 py-4 text-center">
                <p className="text-xs font-bold uppercase text-[var(--brand)]">
                  {fixture.round}
                </p>
                <p className="mt-2 text-2xl font-black text-white">VS</p>
                <p className="mt-2 inline-flex items-center gap-2 text-sm text-[var(--muted)]">
                  <Clock size={15} aria-hidden="true" />
                  {fixture.dateLabel}, {fixture.time}
                </p>
              </div>

              <div className="flex items-center gap-4 lg:justify-end">
                <div className="text-left lg:text-right">
                  <p className="text-sm text-[var(--muted)]">Away</p>
                  <h2 className="text-xl font-black text-white">
                    {fixture.awayTeam.name}
                  </h2>
                </div>
                <ClubBadge
                  name={fixture.awayTeam.shortName}
                  color={fixture.awayTeam.primaryColor}
                />
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3 text-sm text-[var(--muted)]">
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={16} aria-hidden="true" />
                {fixture.dateLabel}
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin size={16} aria-hidden="true" />
                {fixture.venue}
              </span>
            </div>
          </article>
        )) : (
          <div className="sports-card rounded-lg p-8 text-center">
            <p className="text-lg font-black text-white">
              No fixtures available
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              API-Football did not return upcoming fixtures for this season.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
