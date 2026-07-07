const API_FOOTBALL_BASE_URL = "https://v3.football.api-sports.io";
const CYPRUS_FIRST_DIVISION_LEAGUE_ID = 318;
export const CYPRUS_FIRST_DIVISION_SEASON = 2025;
export const API_FOOTBALL_SEASONS = [2025, 2024, 2023, 2022, 2021];
const CACHE_SECONDS = 60 * 20;
const CALCULATED_2025_NOTICE =
  "Calculated from 2025/26 results — official table not yet available.";
const NOT_STARTED_2025_NOTICE = "2025/26 season has not started yet.";
const EUROPE_FIXTURES_UNAVAILABLE =
  "European fixtures will appear once published by API-Football.";
const CYPRIOT_EUROPE_CLUBS = [
  { id: "omonia", name: "Omonia Nicosia", matchers: ["omonia"] },
  { id: "pafos", name: "Pafos FC", matchers: ["pafos"] },
  { id: "aek-larnaca", name: "AEK Larnaca", matchers: ["aek larnaca"] },
  { id: "aris-limassol", name: "Aris Limassol", matchers: ["aris"] }
];

export type FootballTeam = {
  id: string;
  name: string;
  shortName: string;
  city: string;
  venue: string;
  founded: number;
  form: string[];
  primaryColor: string;
  logo?: string;
};

export type FootballFixture = {
  id: string;
  round: string;
  dateLabel: string;
  time: string;
  venue: string;
  homeTeamId: string;
  awayTeamId: string;
  homeTeam: FootballTeam;
  awayTeam: FootballTeam;
};

export type FootballResult = FootballFixture & {
  homeScore: number;
  awayScore: number;
};

export type FootballStanding = {
  teamId: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  goalDifference: number;
  team: FootballTeam;
};

export type FootballPlayer = {
  id: string;
  name: string;
  teamId: string;
  position: string;
  nationality: string;
  team: FootballTeam;
};

export type FootballTopScorer = {
  id: string;
  name: string;
  teamName: string;
  goals: number;
  assists: number;
};

export type FootballSeason = {
  id: string;
  label: string;
  note: string;
  championTeamId?: string;
  standings: FootballStanding[];
};

export type FootballChampion = {
  seasonId: string;
  seasonLabel: string;
  champion: FootballTeam;
};

export type EuropeanClubCard = {
  id: string;
  teamId: string;
  competition: string;
  stage: string;
  status: string;
  headline: string;
  note: string;
  hasFixture: boolean;
  team: FootballTeam;
};

export type FootballNewsItem = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  time: string;
};

export type FootballDataset = {
  source: "api-football";
  season: number;
  requestedSeason: number;
  seasonNotice?: string;
  teams: FootballTeam[];
  fixtures: FootballFixture[];
  results: FootballResult[];
  standings: FootballStanding[];
  news: FootballNewsItem[];
  players: FootballPlayer[];
  topScorers: FootballTopScorer[];
  seasons: FootballSeason[];
  currentSeason: FootballSeason;
  previousChampions: FootballChampion[];
  europeanClubCards: EuropeanClubCard[];
  hasApiKey: boolean;
};

type DatasetOptions = {
  season?: number;
  requestedSeason?: number;
  seasonNotice?: string;
};

type ApiResponse<T> = {
  response?: T;
  errors?: unknown;
};

type ApiTeam = {
  id?: number;
  name?: string;
  code?: string | null;
  country?: string;
  founded?: number | null;
  logo?: string;
};

type ApiVenue = {
  name?: string | null;
  city?: string | null;
};

type ApiTeamsResponse = {
  team?: ApiTeam;
  venue?: ApiVenue;
};

type ApiStandingRow = {
  rank?: number;
  team?: ApiTeam;
  points?: number;
  goalsDiff?: number;
  form?: string;
  all?: {
    played?: number;
    win?: number;
    draw?: number;
    lose?: number;
    goals?: {
      for?: number;
      against?: number;
    };
  };
};

type ApiStandingsResponse = {
  league?: {
    standings?: ApiStandingRow[][];
  };
};

type ApiFixtureResponse = {
  fixture?: {
    id?: number;
    date?: string;
    venue?: ApiVenue;
    status?: {
      short?: string;
      long?: string;
    };
  };
  league?: {
    name?: string;
    round?: string;
  };
  teams?: {
    home?: ApiTeam;
    away?: ApiTeam;
  };
  goals?: {
    home?: number | null;
    away?: number | null;
  };
};

type ApiSquadResponse = {
  team?: ApiTeam;
  players?: Array<{
    id?: number;
    name?: string;
    position?: string;
  }>;
};

type ApiTopScorerResponse = {
  player?: {
    id?: number;
    name?: string;
    nationality?: string;
  };
  statistics?: Array<{
    team?: ApiTeam;
    games?: {
      position?: string | null;
    };
    goals?: {
      total?: number | null;
      assists?: number | null;
    };
  }>;
};

type FixtureStatus = "upcoming" | "finished" | "all";

export async function getFootballDataset(
  options: DatasetOptions = {}
): Promise<FootballDataset> {
  const season = normalizeSeason(options.season ?? getDefaultSeason());
  const requestedSeason = normalizeSeason(options.requestedSeason ?? season);
  const apiKey = process.env.API_FOOTBALL_KEY;

  if (!apiKey) {
    return emptyDataset(season, false, requestedSeason, options.seasonNotice);
  }

  try {
    const [teamsResponse, standingsResponse, fixturesResponse, playersResponse, topScorersResponse] =
      await Promise.all([
        apiFootballFetch<ApiTeamsResponse[]>("/teams", { league: CYPRUS_FIRST_DIVISION_LEAGUE_ID, season }, apiKey),
        apiFootballFetch<ApiStandingsResponse[]>("/standings", { league: CYPRUS_FIRST_DIVISION_LEAGUE_ID, season }, apiKey),
        apiFootballFetch<ApiFixtureResponse[]>("/fixtures", { league: CYPRUS_FIRST_DIVISION_LEAGUE_ID, season }, apiKey),
        apiFootballFetch<ApiTopScorerResponse[]>("/players", { league: CYPRUS_FIRST_DIVISION_LEAGUE_ID, season, page: 1 }, apiKey),
        apiFootballFetch<ApiTopScorerResponse[]>("/players/topscorers", { league: CYPRUS_FIRST_DIVISION_LEAGUE_ID, season }, apiKey)
      ]);

    const teams = mergeTeams([
      ...mapApiTeams(teamsResponse),
      ...extractTeamsFromStandings(standingsResponse),
      ...extractTeamsFromFixtures(fixturesResponse)
    ]);
    const teamMap = new Map(teams.map((team) => [team.id, team]));
    const fixtures = mapFixtures(fixturesResponse, teamMap, "upcoming");
    const results = mapFixtures(fixturesResponse, teamMap, "finished") as FootballResult[];
    const officialStandings = mapStandings(standingsResponse, teamMap);
    const calculatedStandings =
      season === 2025 && officialStandings.length === 0
        ? calculateStandingsFromResults(results)
        : [];
    const standings =
      officialStandings.length > 0 ? officialStandings : calculatedStandings;
    const seasonNotice =
      options.seasonNotice ??
      (season === 2025 && officialStandings.length === 0
        ? calculatedStandings.length > 0
          ? CALCULATED_2025_NOTICE
          : NOT_STARTED_2025_NOTICE
        : undefined);
    const topScorers = mapTopScorers(topScorersResponse);
    const squadPlayers = await getSquadPlayers(teams, apiKey);
    const players = mergePlayers([...mapLeaguePlayers(playersResponse, teamMap), ...squadPlayers]);
    const europeanClubCards = await getEuropeanFixtures(teams, season, apiKey);
    const currentSeason = {
      id: String(season),
      label: formatSeasonLabel(season),
      note: seasonNotice ?? "Live standings from API-Football.",
      championTeamId: officialStandings.length > 0 ? standings[0]?.teamId : undefined,
      standings
    };

    return {
      source: "api-football",
      season,
      requestedSeason,
      seasonNotice,
      teams,
      fixtures,
      results,
      standings,
      news: buildLiveNews(standings, fixtures, results, europeanClubCards),
      players,
      topScorers,
      seasons: buildSeasonList(season, currentSeason),
      currentSeason,
      previousChampions: officialStandings[0]
        ? [
            {
              seasonId: String(season),
              seasonLabel: formatSeasonLabel(season),
              champion: officialStandings[0].team
            }
          ]
        : [],
      europeanClubCards,
      hasApiKey: true
    };
  } catch (error) {
    console.error("Could not load API-Football dataset", {
      league: CYPRUS_FIRST_DIVISION_LEAGUE_ID,
      season,
      error
    });

    return emptyDataset(season, true, requestedSeason, options.seasonNotice);
  }
}

export function getDefaultSeason() {
  const configuredSeason = Number(process.env.API_FOOTBALL_SEASON);

  if (API_FOOTBALL_SEASONS.includes(configuredSeason)) {
    return configuredSeason;
  }

  return CYPRUS_FIRST_DIVISION_SEASON;
}

export function buildSeasonOptions(selectedSeason = getDefaultSeason()) {
  void selectedSeason;

  return API_FOOTBALL_SEASONS;
}

export function normalizeSeason(season: number) {
  return API_FOOTBALL_SEASONS.includes(season)
    ? season
    : CYPRUS_FIRST_DIVISION_SEASON;
}

async function apiFootballFetch<T>(
  endpoint: string,
  params: Record<string, string | number>,
  apiKey: string
): Promise<T> {
  const url = new URL(`${API_FOOTBALL_BASE_URL}${endpoint}`);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }

  const response = await fetch(url, {
    headers: {
      "x-apisports-key": apiKey
    },
    next: {
      revalidate: CACHE_SECONDS
    }
  });

  if (!response.ok) {
    console.error("API-Football HTTP request failed", {
      endpoint,
      params,
      status: response.status
    });

    throw new Error(`API-Football request failed: ${response.status}`);
  }

  const payload = (await response.json()) as ApiResponse<T>;
  const errors = payload.errors;

  if (hasApiErrors(errors)) {
    console.error("API-Football returned errors", {
      endpoint,
      params,
      errors
    });

    throw new Error(`API-Football returned errors for ${endpoint}`);
  }

  return payload.response ?? ([] as T);
}

async function getSquadPlayers(teams: FootballTeam[], apiKey: string) {
  const squadResponses = await Promise.all(
    teams.map((team) =>
      apiFootballFetch<ApiSquadResponse[]>("/players/squads", { team: team.id }, apiKey).catch(
        (error) => {
          console.error("Could not load API-Football squad", {
            teamId: team.id,
            teamName: team.name,
            error
          });

          return [];
        }
      )
    )
  );

  return squadResponses.flatMap((response) =>
    response.flatMap((squad) => {
      const team = teamFromApi(squad.team);

      return (squad.players ?? []).slice(0, 6).map((player) => ({
        id: String(player.id ?? `${team.id}-${player.name ?? "player"}`),
        name: player.name ?? "Player",
        teamId: team.id,
        position: player.position ?? "Player",
        nationality: "Not listed",
        team
      }));
    })
  );
}

async function getEuropeanFixtures(
  teams: FootballTeam[],
  season: number,
  apiKey: string
): Promise<EuropeanClubCard[]> {
  const europeanTeams = CYPRIOT_EUROPE_CLUBS.map((club) => {
    const apiTeam = teams.find((team) =>
      club.matchers.some((name) => team.name.toLowerCase().includes(name))
    );

    return {
      club,
      team: apiTeam ?? fallbackEuropeanTeam(club.id, club.name)
    };
  });
  const fixtureResponses = await Promise.all(
    europeanTeams.map(({ team }) => {
      if (team.id.startsWith("fallback-")) {
        return Promise.resolve([]);
      }

      return apiFootballFetch<ApiFixtureResponse[]>("/fixtures", { team: team.id, season, next: 15 }, apiKey).catch(
        (error) => {
          console.error("Could not load API-Football European fixtures", {
            teamId: team.id,
            teamName: team.name,
            season,
            error
          });

          return [];
        }
      );
    })
  );

  return europeanTeams.map(({ club, team }, index) => {
    const fixture = fixtureResponses[index].find((item) =>
      isEuropeanFixture(item.league?.name)
    );

    if (!fixture) {
      return {
        id: `europe-${club.id}`,
        teamId: team.id,
        competition: "European competition",
        stage: "Fixture pending",
        status: "Awaiting publication",
        headline: `${team.name} European fixtures`,
        note: EUROPE_FIXTURES_UNAVAILABLE,
        hasFixture: false,
        team
      };
    }

    const homeTeam = teamFromApi(fixture.teams?.home);
    const awayTeam = teamFromApi(fixture.teams?.away);

    return {
      id: String(fixture.fixture?.id ?? `${team.id}-${fixture.league?.round ?? "europe"}`),
      teamId: team.id,
      competition: fixture.league?.name ?? "European competition",
      stage: fixture.league?.round ?? "Upcoming fixture",
      status: fixture.fixture?.status?.long ?? "Scheduled",
      headline: `${homeTeam.name} vs ${awayTeam.name}`,
      note: `${formatDate(fixture.fixture?.date)} at ${formatTime(fixture.fixture?.date)}`,
      hasFixture: true,
      team
    };
  });
}

function mapApiTeams(response: ApiTeamsResponse[]) {
  return response.map((item) => teamFromApi(item.team, item.venue));
}

function extractTeamsFromStandings(response: ApiStandingsResponse[]) {
  return (response[0]?.league?.standings?.[0] ?? []).map((row) =>
    teamFromApi(row.team)
  );
}

function extractTeamsFromFixtures(response: ApiFixtureResponse[]) {
  return response.flatMap((fixture) => [
    teamFromApi(fixture.teams?.home),
    teamFromApi(fixture.teams?.away)
  ]);
}

function mergeTeams(teams: FootballTeam[]) {
  const teamMap = new Map<string, FootballTeam>();

  for (const team of teams) {
    teamMap.set(team.id, { ...(teamMap.get(team.id) ?? team), ...team });
  }

  return Array.from(teamMap.values()).filter((team) => team.id !== "0");
}

function mapStandings(
  response: ApiStandingsResponse[],
  teamMap: Map<string, FootballTeam>
): FootballStanding[] {
  return (response[0]?.league?.standings?.[0] ?? []).map((row) => {
    const team = withKnownTeam(teamFromApi(row.team), teamMap);
    const goalsFor = row.all?.goals?.for ?? 0;
    const goalsAgainst = row.all?.goals?.against ?? 0;

    return {
      teamId: team.id,
      played: row.all?.played ?? 0,
      won: row.all?.win ?? 0,
      drawn: row.all?.draw ?? 0,
      lost: row.all?.lose ?? 0,
      goalsFor,
      goalsAgainst,
      points: row.points ?? 0,
      goalDifference: row.goalsDiff ?? goalsFor - goalsAgainst,
      team: {
        ...team,
        form: row.form ? row.form.split("").slice(-5) : team.form
      }
    };
  });
}

function calculateStandingsFromResults(results: FootballResult[]) {
  const table = new Map<string, FootballStanding>();

  for (const result of results) {
    const homeRow = getCalculatedStandingRow(table, result.homeTeam);
    const awayRow = getCalculatedStandingRow(table, result.awayTeam);
    const homeGoals = result.homeScore;
    const awayGoals = result.awayScore;

    homeRow.played += 1;
    awayRow.played += 1;
    homeRow.goalsFor += homeGoals;
    homeRow.goalsAgainst += awayGoals;
    awayRow.goalsFor += awayGoals;
    awayRow.goalsAgainst += homeGoals;
    homeRow.goalDifference = homeRow.goalsFor - homeRow.goalsAgainst;
    awayRow.goalDifference = awayRow.goalsFor - awayRow.goalsAgainst;

    if (homeGoals > awayGoals) {
      homeRow.won += 1;
      homeRow.points += 3;
      awayRow.lost += 1;
    } else if (awayGoals > homeGoals) {
      awayRow.won += 1;
      awayRow.points += 3;
      homeRow.lost += 1;
    } else {
      homeRow.drawn += 1;
      awayRow.drawn += 1;
      homeRow.points += 1;
      awayRow.points += 1;
    }
  }

  return Array.from(table.values()).sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }

    if (b.goalDifference !== a.goalDifference) {
      return b.goalDifference - a.goalDifference;
    }

    return b.goalsFor - a.goalsFor;
  });
}

function getCalculatedStandingRow(
  table: Map<string, FootballStanding>,
  team: FootballTeam
) {
  const existingRow = table.get(team.id);

  if (existingRow) {
    return existingRow;
  }

  const row = {
    teamId: team.id,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    points: 0,
    goalDifference: 0,
    team
  };

  table.set(team.id, row);

  return row;
}

function mapFixtures(
  response: ApiFixtureResponse[],
  teamMap: Map<string, FootballTeam>,
  status: FixtureStatus
): Array<FootballFixture | FootballResult> {
  return response
    .filter((fixture) =>
      status === "all"
        ? true
        : status === "finished"
          ? isFinishedFixture(fixture.fixture?.status?.short)
          : !isFinishedFixture(fixture.fixture?.status?.short)
    )
    .map((fixture) => {
      const homeTeam = withKnownTeam(teamFromApi(fixture.teams?.home), teamMap);
      const awayTeam = withKnownTeam(teamFromApi(fixture.teams?.away), teamMap);
      const baseFixture: FootballFixture = {
        id: String(fixture.fixture?.id ?? `${homeTeam.id}-${awayTeam.id}`),
        round: fixture.league?.round ?? "League fixture",
        dateLabel: formatDate(fixture.fixture?.date),
        time: formatTime(fixture.fixture?.date),
        venue: fixture.fixture?.venue?.name ?? "Venue TBC",
        homeTeamId: homeTeam.id,
        awayTeamId: awayTeam.id,
        homeTeam,
        awayTeam
      };

      if (status === "finished") {
        return {
          ...baseFixture,
          homeScore: fixture.goals?.home ?? 0,
          awayScore: fixture.goals?.away ?? 0
        };
      }

      return baseFixture;
    });
}

function mapTopScorers(response: ApiTopScorerResponse[]): FootballTopScorer[] {
  return response.slice(0, 12).map((item) => {
    const stats = item.statistics?.[0];

    return {
      id: String(item.player?.id ?? item.player?.name ?? "player"),
      name: item.player?.name ?? "Player",
      teamName: stats?.team?.name ?? "Club",
      goals: stats?.goals?.total ?? 0,
      assists: stats?.goals?.assists ?? 0
    };
  });
}

function mapLeaguePlayers(
  response: ApiTopScorerResponse[],
  teamMap: Map<string, FootballTeam>
): FootballPlayer[] {
  return response.slice(0, 40).map((item) => {
    const stats = item.statistics?.[0];
    const team = withKnownTeam(teamFromApi(stats?.team), teamMap);

    return {
      id: String(item.player?.id ?? item.player?.name ?? "player"),
      name: item.player?.name ?? "Player",
      teamId: team.id,
      position: stats?.games?.position ?? "Player",
      nationality: item.player?.nationality ?? "Not listed",
      team
    };
  });
}

function mergePlayers(players: FootballPlayer[]) {
  const playerMap = new Map<string, FootballPlayer>();

  for (const player of players) {
    const existingPlayer = playerMap.get(player.id);

    playerMap.set(player.id, existingPlayer ? mergePlayer(existingPlayer, player) : player);
  }

  return Array.from(playerMap.values()).filter((player) => player.teamId !== "0");
}

function mergePlayer(current: FootballPlayer, incoming: FootballPlayer) {
  return {
    ...incoming,
    position:
      current.position !== "Player" ? current.position : incoming.position,
    nationality:
      current.nationality !== "Not listed"
        ? current.nationality
        : incoming.nationality,
    team: current.team.id !== "0" ? current.team : incoming.team,
    teamId: current.teamId !== "0" ? current.teamId : incoming.teamId
  };
}

function teamFromApi(team?: ApiTeam, venue?: ApiVenue): FootballTeam {
  return {
    id: String(team?.id ?? 0),
    name: team?.name ?? "Club TBC",
    shortName: team?.code ?? shortenTeamName(team?.name),
    city: venue?.city ?? team?.country ?? "Cyprus",
    venue: venue?.name ?? "Venue TBC",
    founded: team?.founded ?? 0,
    form: [],
    primaryColor: "#d6ad52",
    logo: team?.logo
  };
}

function fallbackEuropeanTeam(id: string, name: string): FootballTeam {
  return {
    id: `fallback-${id}`,
    name,
    shortName: shortenTeamName(name),
    city: "Cyprus",
    venue: "Venue TBC",
    founded: 0,
    form: [],
    primaryColor: "#d6ad52"
  };
}

function withKnownTeam(team: FootballTeam, teamMap: Map<string, FootballTeam>) {
  return teamMap.get(team.id) ?? team;
}

function buildSeasonList(selectedSeason: number, currentSeason: FootballSeason) {
  return buildSeasonOptions(selectedSeason).map((season) =>
    season === selectedSeason
      ? currentSeason
      : {
          id: String(season),
          label: formatSeasonLabel(season),
          note: "Select this season to load live API-Football standings.",
          standings: []
        }
  );
}

function buildLiveNews(
  standings: FootballStanding[],
  fixtures: FootballFixture[],
  results: FootballResult[],
  europeanClubCards: EuropeanClubCard[]
): FootballNewsItem[] {
  return [
    standings[0]
      ? {
          id: "standings-leader",
          category: "League Table",
          title: `${standings[0].team.name} lead the Cyprus First Division`,
          excerpt: `${standings[0].team.name} have ${standings[0].points} points from ${standings[0].played} matches.`,
          time: "Live API-Football"
        }
      : null,
    fixtures[0]
      ? {
          id: "next-fixture",
          category: "Fixtures",
          title: `${fixtures[0].homeTeam.name} vs ${fixtures[0].awayTeam.name}`,
          excerpt: `Next listed fixture: ${fixtures[0].dateLabel} at ${fixtures[0].time}.`,
          time: "Live API-Football"
        }
      : null,
    results[0]
      ? {
          id: "latest-result",
          category: "Results",
          title: `${results[0].homeTeam.name} ${results[0].homeScore}-${results[0].awayScore} ${results[0].awayTeam.name}`,
          excerpt: `Latest listed result from ${results[0].round}.`,
          time: "Live API-Football"
        }
      : null,
    europeanClubCards[0]
      ? {
          id: "europe-fixture",
          category: "Europe",
          title: europeanClubCards[0].headline,
          excerpt: `${europeanClubCards[0].competition}: ${europeanClubCards[0].stage}.`,
          time: "Live API-Football"
        }
      : null
  ].filter((item): item is FootballNewsItem => Boolean(item));
}

function emptyDataset(
  season: number,
  hasApiKey: boolean,
  requestedSeason = season,
  seasonNotice?: string
): FootballDataset {
  const currentSeason = {
    id: String(season),
    label: formatSeasonLabel(season),
    note: hasApiKey
      ? "API-Football did not return data for this season."
      : "Add API_FOOTBALL_KEY to load live API-Football data.",
    standings: []
  };

  return {
    source: "api-football",
    season,
    requestedSeason,
    seasonNotice,
    teams: [],
    fixtures: [],
    results: [],
    standings: [],
    news: [],
    players: [],
    topScorers: [],
    seasons: buildSeasonList(season, currentSeason),
    currentSeason,
    previousChampions: [],
    europeanClubCards: [],
    hasApiKey
  };
}

function isFinishedFixture(status?: string) {
  return ["FT", "AET", "PEN"].includes(status ?? "");
}

function hasApiErrors(errors: unknown) {
  if (!errors) {
    return false;
  }

  if (Array.isArray(errors)) {
    return errors.length > 0;
  }

  if (typeof errors === "object") {
    return Object.keys(errors).length > 0;
  }

  return Boolean(errors);
}

function isEuropeanFixture(leagueName?: string) {
  const value = leagueName?.toLowerCase() ?? "";

  return (
    value.includes("champions league") ||
    value.includes("europa league") ||
    value.includes("conference league") ||
    value.includes("uefa")
  );
}

function formatSeasonLabel(season: number) {
  return `${season}/${String(season + 1).slice(-2)}`;
}

function formatDate(value?: string) {
  if (!value) {
    return "Date TBC";
  }

  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    timeZone: "Asia/Nicosia"
  }).format(new Date(value));
}

function formatTime(value?: string) {
  if (!value) {
    return "TBC";
  }

  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Nicosia"
  }).format(new Date(value));
}

function shortenTeamName(name?: string) {
  if (!name) {
    return "TBC";
  }

  return name
    .replace("Nicosia", "")
    .replace("Limassol", "")
    .replace("Larnaca", "")
    .trim()
    .slice(0, 12);
}
