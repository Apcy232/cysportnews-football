import { AlertCircle, Globe2, Trophy } from "lucide-react";
import { ClubBadge } from "@/components/club-badge";
import { getFootballDataset } from "@/lib/data/cyprus-football";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = createMetadata({
  title: "Cypriot Clubs in Europe",
  description:
    "Track European fixtures and competition updates for Cypriot clubs including Omonia, Pafos, AEK Larnaca and Aris Limassol.",
  path: "/europe"
});

export default async function EuropePage() {
  const { europeanClubCards } = await getFootballDataset();
  const publishedFixtures = europeanClubCards.filter((card) => card.hasFixture);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 border-b border-[var(--line)] pb-8">
        <p className="text-sm font-bold uppercase text-[var(--brand)]">
          CYsportnews Football
        </p>
        <h1 className="text-4xl font-black text-white">
          Cypriot Clubs in Europe
        </h1>
        <p className="max-w-2xl text-base leading-7 text-[var(--muted)]">
          Upcoming European competition fixtures for Cypriot clubs, loaded
          server-side from API-Football when available.
        </p>
      </div>

      <section className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="sports-card rounded-lg p-4">
          <p className="text-2xl font-black text-white">
            {europeanClubCards.length}
          </p>
          <p className="mt-1 text-xs font-bold uppercase text-[var(--muted)]">
            Clubs tracked
          </p>
        </div>
        <div className="sports-card rounded-lg p-4">
          <p className="text-2xl font-black text-white">
            {publishedFixtures.length}
          </p>
          <p className="mt-1 text-xs font-bold uppercase text-[var(--muted)]">
            Fixtures listed
          </p>
        </div>
        <div className="sports-card rounded-lg p-4">
          <p className="text-2xl font-black text-white">Verify</p>
          <p className="mt-1 text-xs font-bold uppercase text-[var(--muted)]">
            Before publishing
          </p>
        </div>
      </section>

      <section className="mt-8 rounded-lg border border-[var(--brand)] bg-[#11100b] p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="gold-text mt-0.5" size={20} aria-hidden="true" />
          <p className="text-sm font-bold leading-6 text-white">
            {publishedFixtures.length > 0
              ? "European fixtures are loaded from API-Football when available."
              : "European fixtures will appear once published by API-Football."}
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-2">
        {europeanClubCards.map((card) => (
          <article className="sports-card animate-lift rounded-lg p-5" key={card.id}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <ClubBadge
                  name={card.team.shortName}
                  color={card.team.primaryColor}
                  size="lg"
                />
                <div>
                  <p className="text-xs font-bold uppercase text-[var(--brand)]">
                    {card.competition}
                  </p>
                  <h2 className="mt-1 text-2xl font-black text-white">
                    {card.team.name}
                  </h2>
                </div>
              </div>
              <Globe2 className="gold-text" size={24} aria-hidden="true" />
            </div>

            <div className="mt-6 rounded-lg border border-[var(--line)] bg-[#080b11] p-4">
              <p className="text-xs font-bold uppercase text-[var(--muted)]">
                {card.stage}
              </p>
              <h3 className="mt-2 text-lg font-black leading-7 text-white">
                {card.headline}
              </h3>
              <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-3 py-1 text-xs font-black uppercase text-[var(--brand)]">
                <Trophy size={13} aria-hidden="true" />
                {card.status}
              </p>
            </div>

            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
              {card.note}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
