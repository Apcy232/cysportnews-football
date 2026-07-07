import { Trophy } from "lucide-react";
import Link from "next/link";
import { ClubBadge } from "@/components/club-badge";
import { getFootballDataset } from "@/lib/data/cyprus-football";

export const dynamic = "force-dynamic";

type TablePageProps = {
  searchParams?: Promise<{
    season?: string;
  }>;
};

export default async function TablePage({ searchParams }: TablePageProps) {
  const params = await searchParams;
  const { seasons, previousChampions } = await getFootballDataset();
  const selectedSeason =
    seasons.find((season) => season.id === params?.season) ?? seasons[0];
  const standings = selectedSeason.standings;
  const leader = standings[0];
  const champion = previousChampions.find(
    (item) => item.seasonId === selectedSeason.id
  )?.champion;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 border-b border-[var(--line)] pb-8">
        <p className="text-sm font-bold uppercase text-[var(--brand)]">
          CYsportnews Football
        </p>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-black text-white">League Table</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--muted)]">
              Manual Cyprus First Division standings by season. Data is
              manually maintained for now and reviewed before each MVP update.
            </p>
          </div>
          <div className="rounded-lg border border-[var(--line)] bg-[#080b11] px-4 py-3">
            <p className="text-xs font-bold uppercase text-[var(--muted)]">
              Champion
            </p>
            <p className="mt-1 text-lg font-black text-white">
              {champion?.name ?? leader?.team.name}
            </p>
          </div>
        </div>
      </div>

      <section className="mt-6">
        <div className="flex flex-wrap gap-2">
          {seasons.map((season) => {
            const isActive = season.id === selectedSeason.id;

            return (
              <Link
                className={`rounded-full border px-4 py-2 text-sm font-black transition ${
                  isActive
                    ? "border-[var(--brand)] bg-[var(--brand)] text-[#080b11]"
                    : "border-[var(--line)] bg-[#10141d] text-white hover:border-[var(--brand)] hover:text-[var(--brand)]"
                }`}
                href={`/table?season=${season.id}`}
                key={season.id}
              >
                {season.label}
              </Link>
            );
          })}
        </div>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
          {selectedSeason.note}
        </p>
      </section>

      <section className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="sports-card rounded-lg p-4">
          <p className="text-2xl font-black text-white">{selectedSeason.label}</p>
          <p className="mt-1 text-xs font-bold uppercase text-[var(--muted)]">
            Selected season
          </p>
        </div>
        <div className="sports-card rounded-lg p-4">
          <p className="text-2xl font-black text-white">{standings.length}</p>
          <p className="mt-1 text-xs font-bold uppercase text-[var(--muted)]">
            Clubs listed
          </p>
        </div>
        <div className="sports-card rounded-lg p-4">
          <p className="text-2xl font-black text-white">
            {leader?.points ?? "-"}
          </p>
          <p className="mt-1 text-xs font-bold uppercase text-[var(--muted)]">
            Champion points
          </p>
        </div>
      </section>

      <section className="sports-card mt-8 overflow-hidden rounded-lg">
        <div className="flex items-center justify-between gap-3 border-b border-[var(--line)] p-5">
          <div className="flex items-center gap-3">
            <Trophy className="gold-text" size={22} aria-hidden="true" />
            <h2 className="text-xl font-black text-white">
              {selectedSeason.label} Standings
            </h2>
          </div>
          <span className="rounded-full border border-[var(--brand)] px-3 py-1 text-xs font-black uppercase text-[var(--brand)]">
            Manual data
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-[#080b11] text-xs uppercase text-[var(--muted)]">
              <tr>
                <th className="px-4 py-4">#</th>
                <th className="px-4 py-4">Club</th>
                <th className="px-4 py-4 text-right">P</th>
                <th className="px-4 py-4 text-right">W</th>
                <th className="px-4 py-4 text-right">D</th>
                <th className="px-4 py-4 text-right">L</th>
                <th className="px-4 py-4 text-right">GF</th>
                <th className="px-4 py-4 text-right">GA</th>
                <th className="px-4 py-4 text-right">GD</th>
                <th className="px-4 py-4 text-right">Pts</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((row, index) => {
                const isChampion = row.teamId === selectedSeason.championTeamId;

                return (
                  <tr
                    className="border-t border-[var(--line)]"
                    key={row.team.id}
                  >
                    <td className="px-4 py-4 font-black text-[var(--brand)]">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <ClubBadge
                          name={row.team.shortName}
                          color={row.team.primaryColor}
                          size="sm"
                        />
                        <span className="font-black text-white">
                          {row.team.name}
                        </span>
                        {isChampion ? (
                          <span className="rounded-full bg-[var(--brand)] px-2 py-1 text-[10px] font-black uppercase text-[#080b11]">
                            Champions
                          </span>
                        ) : null}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right text-[var(--muted)]">
                      {row.played}
                    </td>
                    <td className="px-4 py-4 text-right text-[var(--muted)]">
                      {row.won}
                    </td>
                    <td className="px-4 py-4 text-right text-[var(--muted)]">
                      {row.drawn}
                    </td>
                    <td className="px-4 py-4 text-right text-[var(--muted)]">
                      {row.lost}
                    </td>
                    <td className="px-4 py-4 text-right text-[var(--muted)]">
                      {row.goalsFor}
                    </td>
                    <td className="px-4 py-4 text-right text-[var(--muted)]">
                      {row.goalsAgainst}
                    </td>
                    <td className="px-4 py-4 text-right text-[var(--muted)]">
                      {row.goalDifference > 0 ? "+" : ""}
                      {row.goalDifference}
                    </td>
                    <td className="px-4 py-4 text-right text-base font-black text-white">
                      {row.points}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8">
        <div className="flex items-center gap-3">
          <Trophy className="gold-text" size={20} aria-hidden="true" />
          <h2 className="text-2xl font-black text-white">Previous Champions</h2>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {previousChampions.map((item) => (
            <article className="sports-card rounded-lg p-4" key={item.seasonId}>
              <p className="text-xs font-bold uppercase text-[var(--muted)]">
                {item.seasonLabel}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <ClubBadge
                  name={item.champion.shortName}
                  color={item.champion.primaryColor}
                  size="sm"
                />
                <div>
                  <p className="font-black text-white">{item.champion.name}</p>
                  <p className="text-xs font-bold uppercase text-[var(--brand)]">
                    Champions
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
