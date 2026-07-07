import { Newspaper } from "lucide-react";
import { getFootballDataset } from "@/lib/data/cyprus-football";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = createMetadata({
  title: "Cypriot Football News",
  description:
    "Read Cyprus football news, fixture updates, result stories and league headlines from CYsportnews Football.",
  path: "/news"
});

export default async function NewsPage() {
  const { news } = await getFootballDataset();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 border-b border-[var(--line)] pb-8">
        <p className="text-sm font-bold uppercase text-[var(--brand)]">
          CYsportnews Football
        </p>
        <h1 className="text-4xl font-black text-white">Football News</h1>
        <p className="max-w-2xl text-base leading-7 text-[var(--muted)]">
          Live football update cards generated from API-Football standings,
          fixtures, results and European fixtures.
        </p>
      </div>

      <section className="mt-8 grid gap-5 md:grid-cols-3">
        {news.map((story) => (
          <article className="sports-card animate-lift rounded-lg p-5" key={story.id}>
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase text-[var(--brand)]">
                {story.category}
              </p>
              <Newspaper className="text-[var(--muted)]" size={18} aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-2xl font-black leading-8 text-white">
              {story.title}
            </h2>
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
              {story.excerpt}
            </p>
            <p className="mt-6 text-sm font-bold text-[var(--brand)]">
              {story.time}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
