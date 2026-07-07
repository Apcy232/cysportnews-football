import { Flag, Shield, UserRound } from "lucide-react";
import { ClubBadge } from "@/components/club-badge";
import { SeasonSelector } from "@/components/season-selector";
import { getFootballDataset, normalizeSeason } from "@/lib/data/cyprus-football";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = createMetadata({
  title: "Players & Top Scorers",
  description:
    "Browse Cyprus First Division player squads and top scorers by season from API-Football data.",
  path: "/players"
});

type PlayersPageProps = {
  searchParams?: Promise<{
    season?: string;
  }>;
};

export default async function PlayersPage({ searchParams }: PlayersPageProps) {
  const params = await searchParams;
  const requestedSeason = normalizeSeason(Number(params?.season ?? 2024));
  const data = await getFootballDataset({ season: requestedSeason });
  const { currentSeason, players, seasons, topScorers } = data;
  const clubs = new Set(players.map((player) => player.teamId)).size;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 border-b border-[var(--line)] pb-8">
        <p className="text-sm font-bold uppercase text-[var(--brand)]">
          CYsportnews Football
        </p>
        <h1 className="text-4xl font-black text-white">
          Players &amp; Top Scorers
        </h1>
        <p className="max-w-2xl text-base leading-7 text-[var(--muted)]">
          Live {currentSeason.label} squad cards and top scorers from
          API-Football.
        </p>
      </div>

      <SeasonSelector
        basePath="/players"
        notice={data.seasonNotice}
        selectedSeason={data.requestedSeason}
        seasons={seasons}
      />

      <section className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="sports-card rounded-lg p-4">
          <p className="text-2xl font-black text-white">{players.length}</p>
          <p className="mt-1 text-xs font-bold uppercase text-[var(--muted)]">
            Squad cards
          </p>
        </div>
        <div className="sports-card rounded-lg p-4">
          <p className="text-2xl font-black text-white">{clubs}</p>
          <p className="mt-1 text-xs font-bold uppercase text-[var(--muted)]">
            Clubs covered
          </p>
        </div>
        <div className="sports-card rounded-lg p-4">
          <p className="text-2xl font-black text-white">{topScorers.length}</p>
          <p className="mt-1 text-xs font-bold uppercase text-[var(--muted)]">
            Top scorers
          </p>
        </div>
      </section>

      {topScorers.length > 0 ? (
        <section className="sports-card mt-8 rounded-lg p-5">
          <div className="flex items-center gap-3">
            <Shield className="gold-text" size={20} aria-hidden="true" />
            <h2 className="text-2xl font-black text-white">Top Scorers</h2>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {topScorers.slice(0, 8).map((player) => (
              <div
                className="grid grid-cols-[1fr_auto] gap-4 rounded-lg border border-[var(--line)] bg-[#080b11] p-4"
                key={player.id}
              >
                <div>
                  <p className="font-black text-white">{player.name}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {player.teamName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-[var(--brand)]">
                    {player.goals}
                  </p>
                  <p className="text-xs font-bold uppercase text-[var(--muted)]">
                    Goals
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="sports-card mt-8 rounded-lg p-8 text-center">
          <p className="text-lg font-black text-white">
            Live top scorers unavailable
          </p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            API-Football did not return top scorer data for this season.
          </p>
        </section>
      )}

      {players.length > 0 ? (
        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {players.map((player) => (
            <article className="sports-card animate-lift rounded-lg p-5" key={player.id}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <ClubBadge
                    name={player.team.shortName}
                    color={player.team.primaryColor}
                    size="lg"
                  />
                  <div>
                    <h2 className="text-xl font-black text-white">{player.name}</h2>
                    <p className="mt-1 text-sm font-bold text-[var(--brand)]">
                      {player.team.name}
                    </p>
                  </div>
                </div>
                <UserRound className="gold-text" size={22} aria-hidden="true" />
              </div>

              <dl className="mt-6 grid gap-3 text-sm">
                <div className="flex items-center justify-between gap-4 rounded-lg border border-[var(--line)] bg-[#080b11] px-3 py-3">
                  <dt className="inline-flex items-center gap-2 text-[var(--muted)]">
                    <Shield size={15} aria-hidden="true" />
                    Position
                  </dt>
                  <dd className="font-black text-white">{player.position}</dd>
                </div>
                <div className="flex items-center justify-between gap-4 rounded-lg border border-[var(--line)] bg-[#080b11] px-3 py-3">
                  <dt className="inline-flex items-center gap-2 text-[var(--muted)]">
                    <Flag size={15} aria-hidden="true" />
                    Nationality
                  </dt>
                  <dd className="font-black text-white">{player.nationality}</dd>
                </div>
              </dl>
            </article>
          ))}
        </section>
      ) : (
        <section className="sports-card mt-8 rounded-lg p-8 text-center">
          <p className="text-lg font-black text-white">
            Live player data unavailable
          </p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            API-Football did not return player or squad records for this league
            and season.
          </p>
        </section>
      )}
    </div>
  );
}
