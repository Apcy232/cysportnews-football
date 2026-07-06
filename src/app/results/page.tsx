import { CircleDot, MapPin } from "lucide-react";
import { ClubBadge } from "@/components/club-badge";
import { getFootballDataset } from "@/lib/data/cyprus-football";

export const dynamic = "force-dynamic";

export default async function ResultsPage() {
  const { results } = await getFootballDataset();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 border-b border-[var(--line)] pb-8">
        <p className="text-sm font-bold uppercase text-[var(--brand)]">
          CYsportnews Football
        </p>
        <h1 className="text-4xl font-black text-white">Results</h1>
        <p className="max-w-2xl text-base leading-7 text-[var(--muted)]">
          Recent demo results, styled like the live result centre that will be
          powered by API-Football.
        </p>
      </div>

      <section className="mt-8 grid gap-4">
        {results.map((result) => (
          <article className="sports-card rounded-lg p-5" key={result.id}>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-4">
              <p className="inline-flex items-center gap-2 text-sm font-bold text-[var(--brand)]">
                <CircleDot size={16} aria-hidden="true" />
                {result.round}
              </p>
              <p className="text-sm text-[var(--muted)]">{result.dateLabel}</p>
            </div>

            <div className="mt-5 grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
              <div className="flex items-center gap-3">
                <ClubBadge
                  name={result.homeTeam.shortName}
                  color={result.homeTeam.primaryColor}
                />
                <span className="text-lg font-black text-white">
                  {result.homeTeam.name}
                </span>
              </div>
              <div className="rounded-md bg-white px-5 py-2 text-center text-2xl font-black text-[#080a0f]">
                {result.homeScore}-{result.awayScore}
              </div>
              <div className="flex items-center gap-3 sm:justify-end">
                <span className="text-lg font-black text-white">
                  {result.awayTeam.name}
                </span>
                <ClubBadge
                  name={result.awayTeam.shortName}
                  color={result.awayTeam.primaryColor}
                />
              </div>
            </div>

            <p className="mt-5 inline-flex items-center gap-2 text-sm text-[var(--muted)]">
              <MapPin size={16} aria-hidden="true" />
              {result.venue}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
