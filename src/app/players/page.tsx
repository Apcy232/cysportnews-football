import { Flag, Shield, UserRound } from "lucide-react";
import { ClubBadge } from "@/components/club-badge";
import { getFootballDataset } from "@/lib/data/cyprus-football";

export const dynamic = "force-dynamic";

export default async function PlayersPage() {
  const { currentSeason, players } = await getFootballDataset();
  const clubs = new Set(players.map((player) => player.teamId)).size;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 border-b border-[var(--line)] pb-8">
        <p className="text-sm font-bold uppercase text-[var(--brand)]">
          CYsportnews Football
        </p>
        <h1 className="text-4xl font-black text-white">Players</h1>
        <p className="max-w-2xl text-base leading-7 text-[var(--muted)]">
          Manual {currentSeason.label} squad-style cards for the Cyprus First
          Division MVP. Player statistics are intentionally hidden until they
          can be verified.
        </p>
      </div>

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
          <p className="text-2xl font-black text-white">Manual</p>
          <p className="mt-1 text-xs font-bold uppercase text-[var(--muted)]">
            Data mode
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
              <div className="flex items-center justify-between gap-4 rounded-lg border border-[var(--line)] bg-[#080b11] px-3 py-3">
                <dt className="text-[var(--muted)]">Status</dt>
                <dd className="font-black text-[var(--brand)]">
                  {player.dataStatus}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </section>
    </div>
  );
}
