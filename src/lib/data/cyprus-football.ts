import {
  demoFixtures,
  demoNews,
  demoResults,
  demoStandings,
  demoTeams
} from "@/lib/demo-data";
import {
  createServerSupabaseReadClient,
  hasPublicSupabaseEnv
} from "@/lib/supabase/server";

type TeamShape = (typeof demoTeams)[number];
type FixtureShape = (typeof demoFixtures)[number];
type ResultShape = (typeof demoResults)[number];
type StandingShape = (typeof demoStandings)[number];
type NewsShape = (typeof demoNews)[number];

type Relation<T> = T | T[] | null;

type TeamRow = {
  id: string;
  name: string;
  short_name: string | null;
  slug: string;
  city: string | null;
  founded: number | null;
  logo_url: string | null;
  venue: Relation<{
    name: string | null;
  }>;
};

type MatchRow = {
  id: string;
  round: string | null;
  kickoff_at: string;
  home_score: number | null;
  away_score: number | null;
  status: string;
  venue: Relation<{
    name: string | null;
  }>;
  home_team: Relation<TeamRow>;
  away_team: Relation<TeamRow>;
};

type StandingRow = {
  id: string;
  position: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goals_for: number;
  goals_against: number;
  goal_difference: number;
  points: number;
  form: string | null;
  team: Relation<TeamRow>;
};

type NewsRow = {
  id: string;
  title: string;
  excerpt: string | null;
  published_at: string | null;
};

export type FootballDataSource = "supabase" | "demo";

export type FootballDataset = {
  source: FootballDataSource;
  teams: TeamShape[];
  fixtures: FixtureShape[];
  results: ResultShape[];
  standings: StandingShape[];
  news: NewsShape[];
};

export async function getFootballDataset(): Promise<FootballDataset> {
  if (!hasPublicSupabaseEnv()) {
    return getDemoDataset();
  }

  const supabase = createServerSupabaseReadClient();

  const [teams, fixtures, results, standings, news] = await Promise.all([
    getLiveTeams(supabase),
    getLiveFixtures(supabase),
    getLiveResults(supabase),
    getLiveStandings(supabase),
    getLiveNews(supabase)
  ]);

  return {
    source: "supabase",
    teams,
    fixtures,
    results,
    standings,
    news
  };
}

export function getDemoDataset(): FootballDataset {
  return {
    source: "demo",
    teams: demoTeams,
    fixtures: demoFixtures,
    results: demoResults,
    standings: demoStandings,
    news: demoNews
  };
}

async function getLiveTeams(
  supabase: ReturnType<typeof createServerSupabaseReadClient>
): Promise<TeamShape[]> {
  const { data, error } = await supabase
    .from("teams")
    .select("id,name,short_name,slug,city,founded,logo_url,venue:venues(name)")
    .order("name");

  if (error) {
    throw new Error(`Could not load teams: ${error.message}`);
  }

  return (data as unknown as TeamRow[]).map(mapTeam);
}

async function getLiveFixtures(
  supabase: ReturnType<typeof createServerSupabaseReadClient>
): Promise<FixtureShape[]> {
  const { data, error } = await supabase
    .from("matches")
    .select(matchSelect)
    .in("status", ["scheduled", "live", "postponed"])
    .order("kickoff_at", { ascending: true })
    .limit(12);

  if (error) {
    throw new Error(`Could not load fixtures: ${error.message}`);
  }

  return (data as unknown as MatchRow[]).map(mapFixture);
}

async function getLiveResults(
  supabase: ReturnType<typeof createServerSupabaseReadClient>
): Promise<ResultShape[]> {
  const { data, error } = await supabase
    .from("matches")
    .select(matchSelect)
    .eq("status", "finished")
    .order("kickoff_at", { ascending: false })
    .limit(12);

  if (error) {
    throw new Error(`Could not load results: ${error.message}`);
  }

  return (data as unknown as MatchRow[]).map(mapResult);
}

async function getLiveStandings(
  supabase: ReturnType<typeof createServerSupabaseReadClient>
): Promise<StandingShape[]> {
  const { data, error } = await supabase
    .from("standings")
    .select(
      "id,position,played,won,drawn,lost,goals_for,goals_against,goal_difference,points,form,team:teams(id,name,short_name,slug,city,founded,logo_url,venue:venues(name))"
    )
    .order("position", { ascending: true });

  if (error) {
    throw new Error(`Could not load standings: ${error.message}`);
  }

  return (data as unknown as StandingRow[]).map((row) => {
    const team = firstRelation(row.team);

    return {
      teamId: team.id,
      played: row.played,
      won: row.won,
      drawn: row.drawn,
      lost: row.lost,
      goalsFor: row.goals_for,
      goalsAgainst: row.goals_against,
      points: row.points,
      goalDifference: row.goal_difference,
      team: mapTeam(team)
    };
  });
}

async function getLiveNews(
  supabase: ReturnType<typeof createServerSupabaseReadClient>
): Promise<NewsShape[]> {
  const { data, error } = await supabase
    .from("news_articles")
    .select("id,title,excerpt,published_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(6);

  if (error) {
    throw new Error(`Could not load news: ${error.message}`);
  }

  return (data as NewsRow[]).map((row) => ({
    id: row.id,
    category: "News",
    title: row.title,
    excerpt: row.excerpt ?? "Latest CYsportnews Football update.",
    time: row.published_at ? formatDate(row.published_at) : "Latest"
  }));
}

const matchSelect =
  "id,round,kickoff_at,home_score,away_score,status,venue:venues(name),home_team:teams!matches_home_team_id_fkey(id,name,short_name,slug,city,founded,logo_url,venue:venues(name)),away_team:teams!matches_away_team_id_fkey(id,name,short_name,slug,city,founded,logo_url,venue:venues(name))";

function mapTeam(row: TeamRow): TeamShape {
  return {
    id: row.id,
    name: row.name,
    shortName: row.short_name ?? row.name,
    city: row.city ?? "Cyprus",
    venue: optionalRelation(row.venue)?.name ?? "Venue TBC",
    founded: row.founded ?? 0,
    form: [],
    primaryColor: "#d6ad52"
  };
}

function mapFixture(row: MatchRow): FixtureShape {
  return {
    id: row.id,
    round: row.round ?? "League match",
    dateLabel: formatDate(row.kickoff_at),
    time: formatTime(row.kickoff_at),
    venue: optionalRelation(row.venue)?.name ?? "Venue TBC",
    homeTeamId: firstRelation(row.home_team).id,
    awayTeamId: firstRelation(row.away_team).id,
    homeTeam: mapTeam(firstRelation(row.home_team)),
    awayTeam: mapTeam(firstRelation(row.away_team))
  };
}

function mapResult(row: MatchRow): ResultShape {
  return {
    id: row.id,
    round: row.round ?? "League match",
    dateLabel: formatDate(row.kickoff_at),
    venue: firstRelation(row.venue)?.name ?? "Venue TBC",
    homeTeamId: firstRelation(row.home_team).id,
    awayTeamId: firstRelation(row.away_team).id,
    homeScore: row.home_score ?? 0,
    awayScore: row.away_score ?? 0,
    homeTeam: mapTeam(firstRelation(row.home_team)),
    awayTeam: mapTeam(firstRelation(row.away_team))
  };
}

function firstRelation<T>(relation: Relation<T>): T {
  if (Array.isArray(relation)) {
    const [first] = relation;

    if (!first) {
      throw new Error("Expected joined Supabase relation to contain a row.");
    }

    return first;
  }

  if (!relation) {
    throw new Error("Expected joined Supabase relation to exist.");
  }

  return relation;
}

function optionalRelation<T>(relation: Relation<T>): T | null {
  if (Array.isArray(relation)) {
    return relation[0] ?? null;
  }

  return relation;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short"
  }).format(new Date(value));
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Nicosia"
  }).format(new Date(value));
}
