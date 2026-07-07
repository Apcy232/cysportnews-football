import { Building2, MapPin, Shield } from "lucide-react";
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
  title: "Cyprus First Division Clubs",
  description:
    "Explore Cyprus First Division clubs with team profiles, city details, form and league context.",
  path: "/clubs"
});

type ClubsPageProps = {
  searchParams?: Promise<{
    season?: string;
  }>;
};

export default async function ClubsPage({ searchParams }: ClubsPageProps) {
  const params = await searchParams;
  const requestedSeason = normalizeSeason(
    Number(params?.season ?? CYPRUS_FIRST_DIVISION_SEASON)
  );
  const data = await getFootballDataset({ season: requestedSeason });
  const { currentSeason, seasons, standings, teams } = data;
  const cities = new Set(teams.map((team) => team.city)).size;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 border-b border-[var(--line)] pb-8">
        <p className="text-sm font-bold uppercase text-[var(--brand)]">
          CYsportnews Football
        </p>
        <h1 className="text-4xl font-black text-white">Clubs</h1>
        <p className="max-w-2xl text-base leading-7 text-[var(--muted)]">
          Current-season Cyprus First Division club profiles for{" "}
          {currentSeason.label}, loaded from API-Football.
        </p>
      </div>

      <SeasonSelector
        basePath="/clubs"
        notice={data.seasonNotice}
        selectedSeason={data.requestedSeason}
        seasons={seasons}
      />

      <section className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="sports-card rounded-lg p-4">
          <p className="text-2xl font-black text-white">{teams.length}</p>
          <p className="mt-1 text-xs font-bold uppercase text-[var(--muted)]">
            Current clubs
          </p>
        </div>
        <div className="sports-card rounded-lg p-4">
          <p className="text-2xl font-black text-white">{cities}</p>
          <p className="mt-1 text-xs font-bold uppercase text-[var(--muted)]">
            Cities
          </p>
        </div>
        <div className="sports-card rounded-lg p-4">
          <p className="text-2xl font-black text-white">{currentSeason.label}</p>
          <p className="mt-1 text-xs font-bold uppercase text-[var(--muted)]">
            API season
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {teams.length > 0 ? teams.map((team) => {
          const tableRow = standings.find((row) => row.teamId === team.id);

          return (
            <article className="sports-card animate-lift rounded-lg p-5" key={team.id}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <ClubBadge
                    name={team.shortName}
                    color={team.primaryColor}
                    size="lg"
                  />
                  <div>
                    <h2 className="text-xl font-black text-white">{team.name}</h2>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      Founded {team.founded}
                    </p>
                  </div>
                </div>
                <Shield className="gold-text" size={22} aria-hidden="true" />
              </div>

              <dl className="mt-6 grid gap-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="inline-flex items-center gap-2 text-[var(--muted)]">
                    <MapPin size={15} aria-hidden="true" />
                    City
                  </dt>
                  <dd className="font-bold text-white">{team.city}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="inline-flex items-center gap-2 text-[var(--muted)]">
                    <Building2 size={15} aria-hidden="true" />
                    Venue
                  </dt>
                  <dd className="text-right font-bold text-white">{team.venue}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[var(--muted)]">Points</dt>
                  <dd className="font-black text-[var(--brand)]">
                    {tableRow?.points ?? "-"}
                  </dd>
                </div>
              </dl>

              <div className="mt-5 flex gap-2">
                {team.form.map((item, index) => (
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-md bg-[#080b11] text-xs font-black text-white"
                    key={`${team.id}-${item}-${index}`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          );
        }) : (
          <div className="sports-card rounded-lg p-8 text-center sm:col-span-2 lg:col-span-3">
            <p className="text-lg font-black text-white">No clubs available</p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              API-Football did not return club data for this season.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
