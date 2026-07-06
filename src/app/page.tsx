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

const featuredMatch = {
  competition: "Cyprus First Division",
  round: "Matchday 1",
  kickoff: "Sat 19:00",
  home: "APOEL",
  away: "Omonia",
  venue: "GSP Stadium"
};

const latestResults = [
  { home: "Aris", away: "Apollon", score: "2-1", status: "FT" },
  { home: "AEK Larnaca", away: "Pafos", score: "1-1", status: "FT" },
  { home: "Anorthosis", away: "AEL", score: "3-0", status: "FT" }
];

const upcomingFixtures = [
  { home: "APOEL", away: "Omonia", date: "Sat", time: "19:00" },
  { home: "Pafos", away: "Aris", date: "Sun", time: "18:00" },
  { home: "Apollon", away: "AEK Larnaca", date: "Sun", time: "20:00" }
];

const tablePreview = [
  { team: "Pafos", played: 26, gd: 29, points: 62 },
  { team: "Aris", played: 26, gd: 24, points: 57 },
  { team: "Omonia", played: 26, gd: 18, points: 51 },
  { team: "APOEL", played: 26, gd: 16, points: 49 },
  { team: "AEK Larnaca", played: 26, gd: 13, points: 47 }
];

const clubs = ["APOEL", "Omonia", "Pafos", "Aris", "Apollon", "AEK"];

const news = [
  {
    category: "Transfer Watch",
    title: "Clubs prepare early moves before the summer window accelerates",
    time: "12 min read"
  },
  {
    category: "Match Preview",
    title: "Five tactical questions before the next Nicosia derby",
    time: "8 min read"
  },
  {
    category: "League Focus",
    title: "How the title race could be shaped by the opening month",
    time: "6 min read"
  }
];

function ClubLogo({ name }: { name: string }) {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-[var(--brand)] bg-[#0b0e14] text-sm font-black text-[var(--brand)]">
      {name.slice(0, 3).toUpperCase()}
    </div>
  );
}

export default function Home() {
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
                  <ClubLogo name={featuredMatch.home} />
                  <span className="font-black text-white">{featuredMatch.home}</span>
                </div>
                <span className="text-sm font-black text-[var(--muted)]">VS</span>
                <div className="flex items-center gap-3">
                  <span className="font-black text-white">{featuredMatch.away}</span>
                  <ClubLogo name={featuredMatch.away} />
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
                {latestResults.map((match) => (
                  <div
                    className="grid grid-cols-[1fr_auto_1fr_auto] items-center gap-3 rounded-md border border-[var(--line)] bg-[#080b11] px-3 py-3 text-sm"
                    key={`${match.home}-${match.away}`}
                  >
                    <span className="font-bold text-white">{match.home}</span>
                    <span className="rounded-md bg-white px-3 py-1 font-black text-[#080a0f]">
                      {match.score}
                    </span>
                    <span className="text-right font-bold text-white">{match.away}</span>
                    <span className="text-xs font-bold text-[var(--success)]">
                      {match.status}
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
                {upcomingFixtures.map((match) => (
                  <div
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-md border border-[var(--line)] bg-[#080b11] px-3 py-3 text-sm"
                    key={`${match.home}-${match.away}`}
                  >
                    <div className="rounded-md border border-[var(--brand)] px-2 py-1 text-center">
                      <p className="text-xs font-bold text-[var(--brand)]">
                        {match.date}
                      </p>
                      <p className="text-xs text-white">{match.time}</p>
                    </div>
                    <div className="font-bold text-white">
                      {match.home} <span className="text-[var(--muted)]">vs</span>{" "}
                      {match.away}
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
              {clubs.map((club) => (
                <Link
                  href="/clubs"
                  className="animate-lift rounded-lg border border-[var(--line)] bg-[#080b11] p-4 text-center"
                  key={club}
                >
                  <div className="mx-auto">
                    <ClubLogo name={club} />
                  </div>
                  <p className="mt-3 text-sm font-black text-white">{club}</p>
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
              {news.map((story) => (
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
                {tablePreview.map((row, index) => (
                  <tr className="border-t border-[var(--line)]" key={row.team}>
                    <td className="px-3 py-3 text-[var(--brand)]">{index + 1}</td>
                    <td className="px-3 py-3 font-bold text-white">{row.team}</td>
                    <td className="px-3 py-3 text-right text-[var(--muted)]">
                      {row.played}
                    </td>
                    <td className="px-3 py-3 text-right text-[var(--muted)]">
                      +{row.gd}
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

function SectionHeader({
  icon,
  title,
  href
}: {
  icon: React.ReactNode;
  title: string;
  href: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="inline-flex items-center gap-2 text-lg font-black text-white">
        <span className="gold-text">{icon}</span>
        {title}
      </h2>
      <Link
        href={href}
        className="inline-flex items-center gap-1 text-sm font-bold text-[var(--brand)]"
      >
        View all <ChevronRight size={15} aria-hidden="true" />
      </Link>
    </div>
  );
}
