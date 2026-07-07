import { Star, Target, UserRound } from "lucide-react";
import { ClubBadge } from "@/components/club-badge";
import { getFootballDataset } from "@/lib/data/cyprus-football";

export const dynamic = "force-dynamic";

export default async function PlayersPage() {
  const { currentSeason, players } = await getFootballDataset();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 border-b border-[var(--line)] pb-8">
        <p className="text-sm font-bold uppercase text-[var(--brand)]">
          CYsportnews Football
        </p>
        <h1 className="text-4xl font-black text-white">Players</h1>
        <p className="max-w-2xl text-base leading-7 text-[var(--muted)]">
          Manual {currentSeason.label} player cards for the Cyprus First
          Division MVP. Ratings and statistics are maintained locally for launch.
        </p>
      </div>

      <section className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="sports-card rounded-lg p-4">
          <p className="text-2xl font-black text-white">{players.length}</p>
          <p className="mt-1 text-xs font-bold uppercase text-[var(--muted)]">
            Demo players
          </p>
        </div>
        <div className="sports-card rounded-lg p-4">
          <p className="text-2xl font-black text-white">
            {Math.max(...players.map((player) => player.goals))}
          </p>
          <p className="mt-1 text-xs font-bold uppercase text-[var(--muted)]">
            Top goals
          </p>
        </div>
        <div className="sports-card rounded-lg p-4">
          <p className="text-2xl font-black text-white">
            {Math.max(...players.map((player) => player.rating)).toFixed(1)}
          </p>
          <p className="mt-1 text-xs font-bold uppercase text-[var(--muted)]">
            Top rating
          </p>
        </div>
      </section>

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

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#080b11] px-3 py-1 text-xs font-bold text-white">
                {player.position}
              </span>
              <span className="rounded-full bg-[#080b11] px-3 py-1 text-xs font-bold text-white">
                Age {player.age}
              </span>
            </div>

            <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg border border-[var(--line)] bg-[#080b11] p-3">
                <dt className="inline-flex items-center gap-1 text-xs font-bold uppercase text-[var(--muted)]">
                  <Target size={13} aria-hidden="true" />
                  Goals
                </dt>
                <dd className="mt-1 text-2xl font-black text-white">
                  {player.goals}
                </dd>
              </div>
              <div className="rounded-lg border border-[var(--line)] bg-[#080b11] p-3">
                <dt className="text-xs font-bold uppercase text-[var(--muted)]">
                  Assists
                </dt>
                <dd className="mt-1 text-2xl font-black text-white">
                  {player.assists}
                </dd>
              </div>
              <div className="rounded-lg border border-[var(--line)] bg-[#080b11] p-3">
                <dt className="inline-flex items-center gap-1 text-xs font-bold uppercase text-[var(--muted)]">
                  <Star size={13} aria-hidden="true" />
                  Rating
                </dt>
                <dd className="mt-1 text-2xl font-black text-white">
                  {player.rating.toFixed(1)}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </section>
    </div>
  );
}
