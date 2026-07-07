import {
  currentSeason,
  demoFixtures,
  demoNews,
  demoPlayers,
  demoResults,
  demoSeasons,
  demoStandings,
  demoTeams,
  previousChampions
} from "@/lib/demo-data";

type TeamShape = (typeof demoTeams)[number];
type FixtureShape = (typeof demoFixtures)[number];
type ResultShape = (typeof demoResults)[number];
type StandingShape = (typeof demoStandings)[number];
type NewsShape = (typeof demoNews)[number];
type PlayerShape = (typeof demoPlayers)[number];
type SeasonShape = (typeof demoSeasons)[number];
type ChampionShape = (typeof previousChampions)[number];

export type FootballDataset = {
  source: "manual";
  teams: TeamShape[];
  fixtures: FixtureShape[];
  results: ResultShape[];
  standings: StandingShape[];
  news: NewsShape[];
  players: PlayerShape[];
  seasons: SeasonShape[];
  currentSeason: SeasonShape;
  previousChampions: ChampionShape[];
};

export async function getFootballDataset(): Promise<FootballDataset> {
  return getDemoDataset();
}

export function getDemoDataset(): FootballDataset {
  return {
    source: "manual",
    teams: demoTeams,
    fixtures: demoFixtures,
    results: demoResults,
    standings: demoStandings,
    news: demoNews,
    players: demoPlayers,
    seasons: demoSeasons,
    currentSeason,
    previousChampions
  };
}
