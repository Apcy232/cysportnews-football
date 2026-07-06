import { Trophy } from "lucide-react";
import { ClubBadge } from "@/components/club-badge";
import { demoStandings } from "@/lib/demo-data";

export default function TablePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 border-b border-[var(--line)] pb-8">
        <p className="text-sm font-bold uppercase text-[var(--brand)]">
          CYsportnews Football
        </p>
        <h1 className="text-4xl font-black text-white">League Table</h1>
        <p className="max-w-2xl text-base leading-7 text-[var(--muted)]">
          Demo standings for the Cyprus First Division MVP. The same layout will
          display live standings after the Supabase sync is connected.
        </p>
      </div>

      <section className="sports-card mt-8 overflow-hidden rounded-lg">
        <div className="flex items-center gap-3 border-b border-[var(--line)] p-5">
          <Trophy className="gold-text" size={22} aria-hidden="true" />
          <h2 className="text-xl font-black text-white">Current Standings</h2>
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
              {demoStandings.map((row, index) => (
                <tr className="border-t border-[var(--line)]" key={row.team.id}>
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
                      <span className="font-black text-white">{row.team.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right text-[var(--muted)]">{row.played}</td>
                  <td className="px-4 py-4 text-right text-[var(--muted)]">{row.won}</td>
                  <td className="px-4 py-4 text-right text-[var(--muted)]">{row.drawn}</td>
                  <td className="px-4 py-4 text-right text-[var(--muted)]">{row.lost}</td>
                  <td className="px-4 py-4 text-right text-[var(--muted)]">{row.goalsFor}</td>
                  <td className="px-4 py-4 text-right text-[var(--muted)]">{row.goalsAgainst}</td>
                  <td className="px-4 py-4 text-right text-[var(--muted)]">
                    {row.goalDifference > 0 ? "+" : ""}
                    {row.goalDifference}
                  </td>
                  <td className="px-4 py-4 text-right text-base font-black text-white">
                    {row.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
