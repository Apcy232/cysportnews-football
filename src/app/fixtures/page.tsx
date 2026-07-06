import { CalendarDays, Clock, MapPin } from "lucide-react";
import { ClubBadge } from "@/components/club-badge";
import { demoFixtures } from "@/lib/demo-data";

export default function FixturesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 border-b border-[var(--line)] pb-8">
        <p className="text-sm font-bold uppercase text-[var(--brand)]">
          CYsportnews Football
        </p>
        <h1 className="text-4xl font-black text-white">Fixtures</h1>
        <p className="max-w-2xl text-base leading-7 text-[var(--muted)]">
          Demo Cyprus First Division fixtures. These will switch to live
          API-Football data once credentials are added.
        </p>
      </div>

      <section className="mt-8 grid gap-4">
        {demoFixtures.map((fixture) => (
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
        ))}
      </section>
    </div>
  );
}
