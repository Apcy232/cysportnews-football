export const demoTeams = [
  {
    id: "pafos",
    name: "Pafos FC",
    shortName: "Pafos",
    city: "Paphos",
    venue: "Stelios Kyriakides Stadium",
    founded: 2014,
    form: ["W", "W", "D", "W", "L"],
    primaryColor: "#2f7de1"
  },
  {
    id: "aris",
    name: "Aris Limassol",
    shortName: "Aris",
    city: "Limassol",
    venue: "Alphamega Stadium",
    founded: 1930,
    form: ["W", "D", "W", "W", "W"],
    primaryColor: "#31b966"
  },
  {
    id: "omonia",
    name: "Omonia Nicosia",
    shortName: "Omonia",
    city: "Nicosia",
    venue: "GSP Stadium",
    founded: 1948,
    form: ["D", "W", "W", "L", "W"],
    primaryColor: "#1f9f55"
  },
  {
    id: "apoel",
    name: "APOEL",
    shortName: "APOEL",
    city: "Nicosia",
    venue: "GSP Stadium",
    founded: 1926,
    form: ["W", "L", "D", "W", "D"],
    primaryColor: "#e7b83f"
  },
  {
    id: "aek-larnaca",
    name: "AEK Larnaca",
    shortName: "AEK",
    city: "Larnaca",
    venue: "AEK Arena",
    founded: 1994,
    form: ["D", "W", "L", "W", "W"],
    primaryColor: "#e2b100"
  },
  {
    id: "apollon",
    name: "Apollon Limassol",
    shortName: "Apollon",
    city: "Limassol",
    venue: "Alphamega Stadium",
    founded: 1954,
    form: ["L", "W", "D", "D", "W"],
    primaryColor: "#2b82d9"
  },
  {
    id: "anorthosis",
    name: "Anorthosis Famagusta",
    shortName: "Anorthosis",
    city: "Larnaca",
    venue: "Antonis Papadopoulos Stadium",
    founded: 1911,
    form: ["W", "L", "W", "D", "L"],
    primaryColor: "#1b5ec9"
  },
  {
    id: "ael",
    name: "AEL Limassol",
    shortName: "AEL",
    city: "Limassol",
    venue: "Alphamega Stadium",
    founded: 1930,
    form: ["L", "D", "W", "L", "D"],
    primaryColor: "#f4c33f"
  }
];

export const demoStandings = [
  { teamId: "pafos", played: 26, won: 19, drawn: 5, lost: 2, goalsFor: 52, goalsAgainst: 23, points: 62 },
  { teamId: "aris", played: 26, won: 17, drawn: 6, lost: 3, goalsFor: 48, goalsAgainst: 24, points: 57 },
  { teamId: "omonia", played: 26, won: 15, drawn: 6, lost: 5, goalsFor: 44, goalsAgainst: 26, points: 51 },
  { teamId: "apoel", played: 26, won: 14, drawn: 7, lost: 5, goalsFor: 39, goalsAgainst: 23, points: 49 },
  { teamId: "aek-larnaca", played: 26, won: 13, drawn: 8, lost: 5, goalsFor: 41, goalsAgainst: 28, points: 47 },
  { teamId: "apollon", played: 26, won: 11, drawn: 7, lost: 8, goalsFor: 37, goalsAgainst: 31, points: 40 },
  { teamId: "anorthosis", played: 26, won: 10, drawn: 6, lost: 10, goalsFor: 34, goalsAgainst: 33, points: 36 },
  { teamId: "ael", played: 26, won: 8, drawn: 7, lost: 11, goalsFor: 29, goalsAgainst: 36, points: 31 }
].map((row) => ({
  ...row,
  goalDifference: row.goalsFor - row.goalsAgainst,
  team: demoTeams.find((team) => team.id === row.teamId)!
}));

export const demoFixtures = [
  {
    id: "apoel-omonia",
    round: "Matchday 1",
    dateLabel: "Sat 10 Aug",
    time: "19:00",
    venue: "GSP Stadium",
    homeTeamId: "apoel",
    awayTeamId: "omonia"
  },
  {
    id: "pafos-aris",
    round: "Matchday 1",
    dateLabel: "Sun 11 Aug",
    time: "18:00",
    venue: "Stelios Kyriakides Stadium",
    homeTeamId: "pafos",
    awayTeamId: "aris"
  },
  {
    id: "apollon-aek",
    round: "Matchday 1",
    dateLabel: "Sun 11 Aug",
    time: "20:00",
    venue: "Alphamega Stadium",
    homeTeamId: "apollon",
    awayTeamId: "aek-larnaca"
  },
  {
    id: "anorthosis-ael",
    round: "Matchday 1",
    dateLabel: "Mon 12 Aug",
    time: "19:00",
    venue: "Antonis Papadopoulos Stadium",
    homeTeamId: "anorthosis",
    awayTeamId: "ael"
  }
].map((fixture) => ({
  ...fixture,
  homeTeam: demoTeams.find((team) => team.id === fixture.homeTeamId)!,
  awayTeam: demoTeams.find((team) => team.id === fixture.awayTeamId)!
}));

export const demoResults = [
  {
    id: "aris-apollon",
    round: "Championship Round",
    dateLabel: "Sun 19 May",
    venue: "Alphamega Stadium",
    homeTeamId: "aris",
    awayTeamId: "apollon",
    homeScore: 2,
    awayScore: 1
  },
  {
    id: "aek-pafos",
    round: "Championship Round",
    dateLabel: "Sat 18 May",
    venue: "AEK Arena",
    homeTeamId: "aek-larnaca",
    awayTeamId: "pafos",
    homeScore: 1,
    awayScore: 1
  },
  {
    id: "anorthosis-ael-result",
    round: "Regular Season",
    dateLabel: "Sun 12 May",
    venue: "Antonis Papadopoulos Stadium",
    homeTeamId: "anorthosis",
    awayTeamId: "ael",
    homeScore: 3,
    awayScore: 0
  },
  {
    id: "omonia-apoel-result",
    round: "Regular Season",
    dateLabel: "Sat 11 May",
    venue: "GSP Stadium",
    homeTeamId: "omonia",
    awayTeamId: "apoel",
    homeScore: 2,
    awayScore: 2
  }
].map((result) => ({
  ...result,
  homeTeam: demoTeams.find((team) => team.id === result.homeTeamId)!,
  awayTeam: demoTeams.find((team) => team.id === result.awayTeamId)!
}));

export const demoNews = [
  {
    id: "summer-window",
    category: "Transfer Watch",
    title: "Clubs prepare early moves before the summer window accelerates",
    excerpt: "Recruitment teams are moving earlier as Cypriot clubs target depth before European qualifiers.",
    time: "12 min read"
  },
  {
    id: "nicosia-derby",
    category: "Match Preview",
    title: "Five tactical questions before the next Nicosia derby",
    excerpt: "The midfield battle and full-back pressure could define the first major derby of the new campaign.",
    time: "8 min read"
  },
  {
    id: "title-race",
    category: "League Focus",
    title: "How the title race could be shaped by the opening month",
    excerpt: "A difficult early schedule gives several contenders a chance to set the tone quickly.",
    time: "6 min read"
  }
];

export const featuredMatch = {
  competition: "Cyprus First Division",
  round: demoFixtures[0].round,
  kickoff: `${demoFixtures[0].dateLabel}, ${demoFixtures[0].time}`,
  home: demoFixtures[0].homeTeam.shortName,
  away: demoFixtures[0].awayTeam.shortName,
  venue: demoFixtures[0].venue
};
