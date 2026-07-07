import { PageShell } from "@/components/page-shell";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Match Centre",
  description:
    "Follow Cyprus First Division match centre coverage for lineups, events, scores and club context.",
  path: "/matches"
});

export default function MatchesPage() {
  return (
    <PageShell
      title="Matches"
      description="Detailed match pages will include lineups, events, scores and related club information."
    />
  );
}
