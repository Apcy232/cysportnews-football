import { ArrowRight, CalendarDays, Newspaper, Trophy } from "lucide-react";
import Link from "next/link";

const featureLinks = [
  {
    href: "/fixtures",
    label: "Fixtures",
    description: "Upcoming league matches and kickoff times.",
    icon: CalendarDays
  },
  {
    href: "/table",
    label: "League Table",
    description: "Current standings, form and goal difference.",
    icon: Trophy
  },
  {
    href: "/news",
    label: "News",
    description: "Club stories, match previews and league updates.",
    icon: Newspaper
  }
];

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-[var(--brand-dark)]">
            Cyprus League by Stoiximan
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-normal sm:text-5xl">
            Fixtures, results and stats for Cyprus top-flight football.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            A fast, mobile-friendly home for Cyprus First Division data, built
            to update automatically from API-Football first, with Sportmonks as
            a fallback if coverage is incomplete.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/fixtures"
              className="inline-flex items-center gap-2 rounded-md bg-[var(--brand)] px-4 py-3 text-sm font-semibold text-white hover:bg-[var(--brand-dark)]"
            >
              View fixtures <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/table"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--line)] bg-white px-4 py-3 text-sm font-semibold hover:bg-[#edf3ef]"
            >
              View table
            </Link>
          </div>
        </div>
        <div className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Phase 1 status</h2>
          <dl className="mt-5 grid gap-4">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
              <dt className="text-sm text-[var(--muted)]">Framework</dt>
              <dd className="text-sm font-semibold">Next.js + TypeScript</dd>
            </div>
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
              <dt className="text-sm text-[var(--muted)]">Styling</dt>
              <dd className="text-sm font-semibold">Tailwind CSS</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm text-[var(--muted)]">Data source</dt>
              <dd className="text-sm font-semibold">API-Football primary</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        {featureLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              href={item.href}
              key={item.href}
              className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm hover:border-[var(--brand)]"
            >
              <Icon className="text-[var(--brand)]" size={24} aria-hidden="true" />
              <h2 className="mt-4 text-lg font-semibold">{item.label}</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                {item.description}
              </p>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
