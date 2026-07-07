import Link from "next/link";

type SeasonSelectorProps = {
  basePath: string;
  selectedSeason: number;
  seasons: Array<{
    id: string;
    label: string;
  }>;
  notice?: string;
};

export function SeasonSelector({
  basePath,
  selectedSeason,
  seasons,
  notice
}: SeasonSelectorProps) {
  return (
    <section className="mt-6">
      <div className="flex flex-wrap gap-2">
        {seasons.map((season) => {
          const isActive = Number(season.id) === selectedSeason;

          return (
            <Link
              className={`rounded-full border px-4 py-2 text-sm font-black transition ${
                isActive
                  ? "border-[var(--brand)] bg-[var(--brand)] text-[#080b11]"
                  : "border-[var(--line)] bg-[#10141d] text-white hover:border-[var(--brand)] hover:text-[var(--brand)]"
              }`}
              href={`${basePath}?season=${season.id}`}
              key={season.id}
            >
              {season.label}
            </Link>
          );
        })}
      </div>
      {notice ? (
        <p className="mt-3 rounded-lg border border-[var(--brand)] bg-[#11100b] px-4 py-3 text-sm font-bold leading-6 text-white">
          {notice}
        </p>
      ) : null}
    </section>
  );
}
