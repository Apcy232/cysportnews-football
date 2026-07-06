import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  CircleDot,
  Clock,
  Flame,
  Shield,
  Trophy
} from "lucide-react";
import Link from "next/link";
import { ClubBadge } from "@/components/club-badge";
import { SectionHeader } from "@/components/section-header";
import { getFootballDataset } from "@/lib/data/cyprus-football";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getFootballDataset();
  const featuredFixture = data.fixtures[0];
  const featuredMatch = {
    competition: "Cyprus First Division",
    round: featuredFixture?.round ?? "Matchday",
    kickoff: featuredFixture
      ? `${featuredFixture.dateLabel}, ${featuredFixture.time}`
      : "Kickoff TBC",
    home: featuredFixture?.homeTeam.shortName ?? "Home",
    away: featuredFixture?.awayTeam.shortName ?? "Away",
    venue: featuredFixture?.venue ?? "Venue TBC"
  };

  return (
    <div>
      <section className="relative overflow-hidden border-b border-[var(--line)] bg-[#07090d]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(214,173,82,0.22),_transparent_38%),linear-gradient(135deg,_rgba(255,255,255,0.08),_transparent_42%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.25fr_0.75fr] lg:px-8 lg:py-16">
          <div className="flex min-h-[430px] flex-col justify-end">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-md border border-[var(--brand)] bg-[#0c1017]/80 px-3 py-2 text-xs font-bold uppercase text-[var(--brand)]">
              <Flame size={14} aria-hidden="true" />
              Premium Cypriot Football Coverage
            </div>
            <h1 className="max-w-4xl text-5xl font-black tracking-normal text-white sm:text-6xl lg:text-7xl">
              CYsportnews <span className="gold-text">Football</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Fixtures, results, standings, clubs, players and sharp football
              news for the Cyprus First Division, designed for speed and
              automated updates.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/fixtures"
                className="inline-flex items-center gap-2 rounded-md bg-[var(--brand)] px-5 py-3 text-sm font-black text-[#080a0f] hover:bg-[#f0c96f]"
              >
                Fixtures <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/news"
                className="inline-flex items-center gap-2 rounded-md border border-[var(--line)] bg-[#0d1118] px-5 py-3 text-sm font-bold text-white hover:border-[var(--brand)]"
              >
                Latest news
              </Link>
            </div>
          </div>

          <aside className="sports-card animate-lift rounded-lg p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase text-[var(--brand)]">
                  Featured Match
                </p>
                <h2 className="mt-2 text-2xl font-black text-white">
                  {featuredMatch.home} vs {featuredMatch.away}
                </h2>
              </div>
              <Trophy className="gold-text" size={30} aria-hidden="true" />
            </div>
            <div className="mt-6 rounded-md border border-[var(--line)] bg-[#080b11] p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <ClubBadge name={featuredMatch.home} />
                  <span className="font-black text-white">{featuredMatch.home}</span>
                </div>
                <span className="text-sm font-black text-[var(--muted)]">VS</span>
                <div className="flex items-center gap-3">
                  <span className="font-black text-white">{featuredMatch.away}</span>
                  <ClubBadge name={featuredMatch.away} />
                </div>
              </div>
              <dl className="mt-5 grid gap-3 text-sm text-[var(--muted)]">
                <div className="flex items-center justify-between">
                  <dt>{featuredMatch.competition}</dt>
                  <dd className="font-bold text-white">{featuredMatch.round}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>{featuredMatch.venue}</dt>
                  <dd className="font-bold text-white">{featuredMatch.kickoff}</dd>
                </div>
              </dl>
            </div>
            <Link
              href="/matches"
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand)]"
            >
              Match centre <ChevronRight size={16} aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <div className="grid gap-5">
          <section className="grid gap-5 md:grid-cols-2">
            <div className="sports-card rounded-lg p-5">
              <SectionHeader
                icon={<CircleDot size={18} aria-hidden="true" />}
                title="Latest Results"
                href="/results"
              />
              <div className="mt-5 grid gap-3">
                {data.results.slice(0, 3).map((match) => (
                  <div
                    className="grid grid-cols-[1fr_auto_1fr_auto] items-center gap-3 rounded-md border border-[var(--line)] bg-[#080b11] px-3 py-3 text-sm"
                    key={match.id}
                  >
                    <span className="font-bold text-white">{match.homeTeam.shortName}</span>
                    <span className="rounded-md bg-white px-3 py-1 font-black text-[#080a0f]">
                      {match.homeScore}-{match.awayScore}
                    </span>
                    <span className="text-right font-bold text-white">
                      {match.awayTeam.shortName}
                    </span>
                    <span className="text-xs font-bold text-[var(--success)]">
                      FT
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="sports-card rounded-lg p-5">
              <SectionHeader
                icon={<CalendarDays size={18} aria-hidden="true" />}
                title="Upcoming Fixtures"
                href="/fixtures"
              />
              <div className="mt-5 grid gap-3">
                {data.fixtures.slice(0, 3).map((match) => (
                  <div
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-md border border-[var(--line)] bg-[#080b11] px-3 py-3 text-sm"
                    key={match.id}
                  >
                    <div className="rounded-md border border-[var(--brand)] px-2 py-1 text-center">
                      <p className="text-xs font-bold text-[var(--brand)]">
                        {match.dateLabel.split(" ")[0]}
                      </p>
                      <p className="text-xs text-white">{match.time}</p>
                    </div>
                    <div className="font-bold text-white">
                      {match.homeTeam.shortName}{" "}
                      <span className="text-[var(--muted)]">vs</span>{" "}
                      {match.awayTeam.shortName}
                    </div>
                    <Clock size={16} className="text-[var(--muted)]" aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="sports-card rounded-lg p-5">
            <SectionHeader
              icon={<Shield size={18} aria-hidden="true" />}
              title="Featured Clubs"
              href="/clubs"
            />
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {data.teams.slice(0, 6).map((club) => (
                <Link
                  href="/clubs"
                  className="animate-lift rounded-lg border border-[var(--line)] bg-[#080b11] p-4 text-center"
                  key={club.id}
                >
                  <div className="flex justify-center">
                    <ClubBadge name={club.shortName} color={club.primaryColor} />
                  </div>
                  <p className="mt-3 text-sm font-black text-white">
                    {club.shortName}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="sports-card rounded-lg p-5">
            <SectionHeader
              icon={<Flame size={18} aria-hidden="true" />}
              title="Latest Football News"
              href="/news"
            />
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {data.news.slice(0, 3).map((story) => (
                <article
                  className="animate-lift rounded-lg border border-[var(--line)] bg-[#080b11] p-4"
                  key={story.title}
                >
                  <p className="text-xs font-bold uppercase text-[var(--brand)]">
                    {story.category}
                  </p>
                  <h3 className="mt-3 text-lg font-black leading-6 text-white">
                    {story.title}
                  </h3>
                  <p className="mt-4 text-sm text-[var(--muted)]">{story.time}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="sports-card h-fit rounded-lg p-5">
          <SectionHeader
            icon={<Trophy size={18} aria-hidden="true" />}
            title="League Table"
            href="/table"
          />
          <div className="mt-5 overflow-hidden rounded-md border border-[var(--line)]">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#080b11] text-xs uppercase text-[var(--muted)]">
                <tr>
                  <th className="px-3 py-3">#</th>
                  <th className="px-3 py-3">Club</th>
                  <th className="px-3 py-3 text-right">P</th>
                  <th className="px-3 py-3 text-right">GD</th>
                  <th className="px-3 py-3 text-right">Pts</th>
                </tr>
              </thead>
              <tbody>
                {data.standings.slice(0, 5).map((row, index) => (
                  <tr className="border-t border-[var(--line)]" key={row.team.id}>
                    <td className="px-3 py-3 text-[var(--brand)]">{index + 1}</td>
                    <td className="px-3 py-3 font-bold text-white">
                      {row.team.shortName}
                    </td>
                    <td className="px-3 py-3 text-right text-[var(--muted)]">
                      {row.played}
                    </td>
                    <td className="px-3 py-3 text-right text-[var(--muted)]">
                      {row.goalDifference > 0 ? "+" : ""}
                      {row.goalDifference}
                    </td>
                    <td className="px-3 py-3 text-right font-black text-white">
                      {row.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </aside>
      </div>
    </div>
  );
}
