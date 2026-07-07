export type DemoTeam = {
  id: string;
  name: string;
  shortName: string;
  city: string;
  venue: string;
  founded: number;
  form: string[];
  primaryColor: string;
};

export const demoTeams: DemoTeam[] = [
  {
    id: "omonia",
    name: "Omonia Nicosia",
    shortName: "Omonia",
    city: "Nicosia",
    venue: "GSP Stadium",
    founded: 1948,
    form: ["W", "W", "W", "D", "W"],
    primaryColor: "#1f9f55"
  },
  {
    id: "pafos",
    name: "Pafos FC",
    shortName: "Pafos",
    city: "Paphos",
    venue: "Stelios Kyriakides Stadium",
    founded: 2014,
    form: ["D", "W", "W", "W", "L"],
    primaryColor: "#2f7de1"
  },
  {
    id: "aris",
    name: "Aris Limassol",
    shortName: "Aris",
    city: "Limassol",
    venue: "Alphamega Stadium",
    founded: 1930,
    form: ["W", "D", "W", "L", "W"],
    primaryColor: "#31b966"
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
  },
  {
    id: "omonia-aradippou",
    name: "Omonia Aradippou",
    shortName: "Omonia Ar.",
    city: "Aradippou",
    venue: "Antonis Papadopoulos Stadium",
    founded: 1929,
    form: ["D", "L", "W", "D", "L"],
    primaryColor: "#2aa45f"
  },
  {
    id: "ethnikos-achna",
    name: "Ethnikos Achna",
    shortName: "Ethnikos",
    city: "Achna",
    venue: "Dasaki Stadium",
    founded: 1968,
    form: ["L", "D", "L", "W", "D"],
    primaryColor: "#1f6bd1"
  },
  {
    id: "enosis-neon",
    name: "Enosis Neon Paralimni",
    shortName: "ENP",
    city: "Paralimni",
    venue: "Paralimni Stadium",
    founded: 1936,
    form: ["L", "L", "D", "L", "W"],
    primaryColor: "#9c1f2e"
  },
  {
    id: "olympiakos-nicosia",
    name: "Olympiakos Nicosia",
    shortName: "Olympiakos",
    city: "Nicosia",
    venue: "Makario Stadium",
    founded: 1931,
    form: ["W", "D", "L", "W", "L"],
    primaryColor: "#111111"
  },
  {
    id: "akritas-chlorakas",
    name: "Akritas Chlorakas",
    shortName: "Akritas",
    city: "Chloraka",
    venue: "Stelios Kyriakides Stadium",
    founded: 1971,
    form: ["D", "L", "W", "L", "D"],
    primaryColor: "#2b8f62"
  },
  {
    id: "krasava-ypsonas",
    name: "Krasava Ypsonas",
    shortName: "Ypsonas",
    city: "Ypsonas",
    venue: "Ypsonas Municipal Stadium",
    founded: 2014,
    form: ["W", "W", "D", "L", "D"],
    primaryColor: "#af2732"
  }
];

type StandingInput = {
  teamId: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
};

function withTeams(rows: StandingInput[]) {
  return rows.map((row) => ({
    ...row,
    goalDifference: row.goalsFor - row.goalsAgainst,
    team: demoTeams.find((team) => team.id === row.teamId)!
  }));
}

export const demoSeasons = [
  {
    id: "2025-26",
    label: "2025/26",
    note: "Current manual MVP season. Omonia Nicosia are shown as champions in this manually maintained table; verify before publication.",
    championTeamId: "omonia",
    standings: withTeams([
      { teamId: "omonia", played: 36, won: 23, drawn: 8, lost: 5, goalsFor: 68, goalsAgainst: 30, points: 77 },
      { teamId: "pafos", played: 36, won: 22, drawn: 7, lost: 7, goalsFor: 64, goalsAgainst: 33, points: 73 },
      { teamId: "aris", played: 36, won: 21, drawn: 8, lost: 7, goalsFor: 62, goalsAgainst: 35, points: 71 },
      { teamId: "aek-larnaca", played: 36, won: 19, drawn: 10, lost: 7, goalsFor: 57, goalsAgainst: 34, points: 67 },
      { teamId: "apoel", played: 36, won: 18, drawn: 9, lost: 9, goalsFor: 55, goalsAgainst: 38, points: 63 },
      { teamId: "apollon", played: 36, won: 15, drawn: 10, lost: 11, goalsFor: 48, goalsAgainst: 41, points: 55 },
      { teamId: "anorthosis", played: 33, won: 12, drawn: 9, lost: 12, goalsFor: 40, goalsAgainst: 41, points: 45 },
      { teamId: "ael", played: 33, won: 11, drawn: 9, lost: 13, goalsFor: 37, goalsAgainst: 43, points: 42 },
      { teamId: "olympiakos-nicosia", played: 33, won: 10, drawn: 9, lost: 14, goalsFor: 35, goalsAgainst: 42, points: 39 },
      { teamId: "omonia-aradippou", played: 33, won: 9, drawn: 10, lost: 14, goalsFor: 32, goalsAgainst: 43, points: 37 },
      { teamId: "ethnikos-achna", played: 33, won: 9, drawn: 8, lost: 16, goalsFor: 31, goalsAgainst: 48, points: 35 },
      { teamId: "akritas-chlorakas", played: 33, won: 8, drawn: 9, lost: 16, goalsFor: 30, goalsAgainst: 47, points: 33 },
      { teamId: "krasava-ypsonas", played: 33, won: 8, drawn: 8, lost: 17, goalsFor: 30, goalsAgainst: 50, points: 32 },
      { teamId: "enosis-neon", played: 33, won: 6, drawn: 8, lost: 19, goalsFor: 26, goalsAgainst: 57, points: 26 }
    ])
  },
  {
    id: "2024-25",
    label: "2024/25",
    note: "Pafos FC won their first league title.",
    championTeamId: "pafos",
    standings: withTeams([
      { teamId: "pafos", played: 36, won: 23, drawn: 7, lost: 6, goalsFor: 65, goalsAgainst: 32, points: 76 },
      { teamId: "aris", played: 36, won: 20, drawn: 9, lost: 7, goalsFor: 59, goalsAgainst: 35, points: 69 },
      { teamId: "aek-larnaca", played: 36, won: 19, drawn: 8, lost: 9, goalsFor: 55, goalsAgainst: 37, points: 65 },
      { teamId: "omonia", played: 36, won: 18, drawn: 8, lost: 10, goalsFor: 57, goalsAgainst: 41, points: 62 },
      { teamId: "apoel", played: 36, won: 17, drawn: 8, lost: 11, goalsFor: 52, goalsAgainst: 39, points: 59 },
      { teamId: "apollon", played: 36, won: 14, drawn: 9, lost: 13, goalsFor: 47, goalsAgainst: 45, points: 51 },
      { teamId: "anorthosis", played: 33, won: 11, drawn: 8, lost: 14, goalsFor: 40, goalsAgainst: 44, points: 41 },
      { teamId: "ael", played: 33, won: 10, drawn: 8, lost: 15, goalsFor: 36, goalsAgainst: 48, points: 38 }
    ])
  },
  {
    id: "2023-24",
    label: "2023/24",
    note: "APOEL returned to the top and won their 29th title.",
    championTeamId: "apoel",
    standings: withTeams([
      { teamId: "apoel", played: 36, won: 22, drawn: 8, lost: 6, goalsFor: 63, goalsAgainst: 29, points: 74 },
      { teamId: "aek-larnaca", played: 36, won: 20, drawn: 10, lost: 6, goalsFor: 59, goalsAgainst: 33, points: 70 },
      { teamId: "omonia", played: 36, won: 19, drawn: 8, lost: 9, goalsFor: 58, goalsAgainst: 39, points: 65 },
      { teamId: "aris", played: 36, won: 18, drawn: 8, lost: 10, goalsFor: 56, goalsAgainst: 41, points: 62 },
      { teamId: "pafos", played: 36, won: 17, drawn: 8, lost: 11, goalsFor: 54, goalsAgainst: 42, points: 59 },
      { teamId: "anorthosis", played: 36, won: 15, drawn: 9, lost: 12, goalsFor: 48, goalsAgainst: 44, points: 54 }
    ])
  },
  {
    id: "2022-23",
    label: "2022/23",
    note: "Aris Limassol won their first championship.",
    championTeamId: "aris",
    standings: withTeams([
      { teamId: "aris", played: 36, won: 21, drawn: 10, lost: 5, goalsFor: 62, goalsAgainst: 29, points: 73 },
      { teamId: "apoel", played: 36, won: 20, drawn: 9, lost: 7, goalsFor: 59, goalsAgainst: 31, points: 69 },
      { teamId: "aek-larnaca", played: 36, won: 19, drawn: 8, lost: 9, goalsFor: 54, goalsAgainst: 35, points: 65 },
      { teamId: "omonia", played: 36, won: 16, drawn: 9, lost: 11, goalsFor: 48, goalsAgainst: 39, points: 57 },
      { teamId: "pafos", played: 36, won: 15, drawn: 9, lost: 12, goalsFor: 46, goalsAgainst: 41, points: 54 },
      { teamId: "apollon", played: 36, won: 13, drawn: 10, lost: 13, goalsFor: 44, goalsAgainst: 42, points: 49 }
    ])
  },
  {
    id: "2021-22",
    label: "2021/22",
    note: "Apollon Limassol finished as champions.",
    championTeamId: "apollon",
    standings: withTeams([
      { teamId: "apollon", played: 32, won: 17, drawn: 10, lost: 5, goalsFor: 49, goalsAgainst: 27, points: 61 },
      { teamId: "apoel", played: 32, won: 16, drawn: 9, lost: 7, goalsFor: 46, goalsAgainst: 29, points: 57 },
      { teamId: "aek-larnaca", played: 32, won: 15, drawn: 10, lost: 7, goalsFor: 44, goalsAgainst: 31, points: 55 },
      { teamId: "aris", played: 32, won: 14, drawn: 9, lost: 9, goalsFor: 41, goalsAgainst: 33, points: 51 },
      { teamId: "anorthosis", played: 32, won: 13, drawn: 10, lost: 9, goalsFor: 39, goalsAgainst: 33, points: 49 },
      { teamId: "pafos", played: 32, won: 12, drawn: 10, lost: 10, goalsFor: 38, goalsAgainst: 34, points: 46 }
    ])
  }
];

export const currentSeason = demoSeasons[0];
export const demoStandings = currentSeason.standings;
export const previousChampions = demoSeasons.map((season) => ({
  seasonId: season.id,
  seasonLabel: season.label,
  champion: demoTeams.find((team) => team.id === season.championTeamId)!
}));

export const demoFixtures = [
  {
    id: "fixture-omonia-pafos",
    round: "Championship Round",
    dateLabel: "Sat 10 Aug",
    time: "19:00",
    venue: "GSP Stadium",
    homeTeamId: "omonia",
    awayTeamId: "pafos",
    homeTeam: demoTeams.find((team) => team.id === "omonia")!,
    awayTeam: demoTeams.find((team) => team.id === "pafos")!
  },
  {
    id: "fixture-aris-apoel",
    round: "Championship Round",
    dateLabel: "Sun 11 Aug",
    time: "18:00",
    venue: "Alphamega Stadium",
    homeTeamId: "aris",
    awayTeamId: "apoel",
    homeTeam: demoTeams.find((team) => team.id === "aris")!,
    awayTeam: demoTeams.find((team) => team.id === "apoel")!
  },
  {
    id: "fixture-apollon-aek",
    round: "Championship Round",
    dateLabel: "Sun 11 Aug",
    time: "20:00",
    venue: "Alphamega Stadium",
    homeTeamId: "apollon",
    awayTeamId: "aek-larnaca",
    homeTeam: demoTeams.find((team) => team.id === "apollon")!,
    awayTeam: demoTeams.find((team) => team.id === "aek-larnaca")!
  },
  {
    id: "fixture-olympiakos-akritas",
    round: "Regular Season",
    dateLabel: "Mon 12 Aug",
    time: "19:00",
    venue: "Makario Stadium",
    homeTeamId: "olympiakos-nicosia",
    awayTeamId: "akritas-chlorakas",
    homeTeam: demoTeams.find((team) => team.id === "olympiakos-nicosia")!,
    awayTeam: demoTeams.find((team) => team.id === "akritas-chlorakas")!
  }
];

export const demoResults = [
  {
    id: "result-omonia-apoel",
    round: "Championship Round",
    dateLabel: "Sun 03 Aug",
    venue: "GSP Stadium",
    homeTeamId: "omonia",
    awayTeamId: "apoel",
    homeScore: 3,
    awayScore: 1,
    homeTeam: demoTeams.find((team) => team.id === "omonia")!,
    awayTeam: demoTeams.find((team) => team.id === "apoel")!
  },
  {
    id: "result-pafos-aris",
    round: "Championship Round",
    dateLabel: "Sat 02 Aug",
    venue: "Stelios Kyriakides Stadium",
    homeTeamId: "pafos",
    awayTeamId: "aris",
    homeScore: 1,
    awayScore: 1,
    homeTeam: demoTeams.find((team) => team.id === "pafos")!,
    awayTeam: demoTeams.find((team) => team.id === "aris")!
  },
  {
    id: "result-aek-apollon",
    round: "Championship Round",
    dateLabel: "Sat 02 Aug",
    venue: "AEK Arena",
    homeTeamId: "aek-larnaca",
    awayTeamId: "apollon",
    homeScore: 2,
    awayScore: 0,
    homeTeam: demoTeams.find((team) => team.id === "aek-larnaca")!,
    awayTeam: demoTeams.find((team) => team.id === "apollon")!
  },
  {
    id: "result-olympiakos-ypsonas",
    round: "Regular Season",
    dateLabel: "Fri 01 Aug",
    venue: "Makario Stadium",
    homeTeamId: "olympiakos-nicosia",
    awayTeamId: "krasava-ypsonas",
    homeScore: 2,
    awayScore: 1,
    homeTeam: demoTeams.find((team) => team.id === "olympiakos-nicosia")!,
    awayTeam: demoTeams.find((team) => team.id === "krasava-ypsonas")!
  }
];

export const demoPlayers = [
  {
    id: "omonia-goalkeeper",
    name: "Omonia squad profile",
    teamId: "omonia",
    position: "Goalkeeper",
    nationality: "Cyprus",
    dataStatus: "Manual data",
    team: demoTeams.find((team) => team.id === "omonia")!
  },
  {
    id: "omonia-defender",
    name: "Omonia squad profile",
    teamId: "omonia",
    position: "Defender",
    nationality: "Cyprus",
    dataStatus: "Manual data",
    team: demoTeams.find((team) => team.id === "omonia")!
  },
  {
    id: "omonia-midfielder",
    name: "Omonia squad profile",
    teamId: "omonia",
    position: "Midfielder",
    nationality: "Cyprus",
    dataStatus: "Manual data",
    team: demoTeams.find((team) => team.id === "omonia")!
  },
  {
    id: "pafos-forward",
    name: "Pafos squad profile",
    teamId: "pafos",
    position: "Forward",
    nationality: "Cyprus",
    dataStatus: "Manual data",
    team: demoTeams.find((team) => team.id === "pafos")!
  },
  {
    id: "pafos-midfielder",
    name: "Pafos squad profile",
    teamId: "pafos",
    position: "Midfielder",
    nationality: "Cyprus",
    dataStatus: "Manual data",
    team: demoTeams.find((team) => team.id === "pafos")!
  },
  {
    id: "aris-forward",
    name: "Aris squad profile",
    teamId: "aris",
    position: "Forward",
    nationality: "Cyprus",
    dataStatus: "Manual data",
    team: demoTeams.find((team) => team.id === "aris")!
  },
  {
    id: "aris-defender",
    name: "Aris squad profile",
    teamId: "aris",
    position: "Defender",
    nationality: "Cyprus",
    dataStatus: "Manual data",
    team: demoTeams.find((team) => team.id === "aris")!
  },
  {
    id: "apoel-forward",
    name: "APOEL squad profile",
    teamId: "apoel",
    position: "Forward",
    nationality: "Cyprus",
    dataStatus: "Manual data",
    team: demoTeams.find((team) => team.id === "apoel")!
  },
  {
    id: "aek-midfielder",
    name: "AEK squad profile",
    teamId: "aek-larnaca",
    position: "Midfielder",
    nationality: "Cyprus",
    dataStatus: "Manual data",
    team: demoTeams.find((team) => team.id === "aek-larnaca")!
  },
  {
    id: "apollon-defender",
    name: "Apollon squad profile",
    teamId: "apollon",
    position: "Defender",
    nationality: "Cyprus",
    dataStatus: "Manual data",
    team: demoTeams.find((team) => team.id === "apollon")!
  },
  {
    id: "anorthosis-goalkeeper",
    name: "Anorthosis squad profile",
    teamId: "anorthosis",
    position: "Goalkeeper",
    nationality: "Cyprus",
    dataStatus: "Manual data",
    team: demoTeams.find((team) => team.id === "anorthosis")!
  },
  {
    id: "ael-forward",
    name: "AEL squad profile",
    teamId: "ael",
    position: "Forward",
    nationality: "Cyprus",
    dataStatus: "Manual data",
    team: demoTeams.find((team) => team.id === "ael")!
  }
];

export const europeanClubCards = [
  {
    id: "europe-omonia",
    teamId: "omonia",
    competition: "UEFA Champions League",
    stage: "Qualifying",
    status: "Fixture to verify",
    headline: "Omonia Nicosia vs Winner of Kairat Almaty / Sutjeska",
    note: "European fixtures are manually maintained and should be verified before publication.",
    team: demoTeams.find((team) => team.id === "omonia")!
  },
  {
    id: "europe-pafos",
    teamId: "pafos",
    competition: "UEFA competition",
    stage: "European qualifying",
    status: "Manual entry",
    headline: "Pafos FC European campaign tracker",
    note: "Competition, round and opponent should be checked before publishing.",
    team: demoTeams.find((team) => team.id === "pafos")!
  },
  {
    id: "europe-aek",
    teamId: "aek-larnaca",
    competition: "UEFA competition",
    stage: "European qualifying",
    status: "Manual entry",
    headline: "AEK Larnaca European campaign tracker",
    note: "Competition, round and opponent should be checked before publishing.",
    team: demoTeams.find((team) => team.id === "aek-larnaca")!
  },
  {
    id: "europe-aris",
    teamId: "aris",
    competition: "UEFA competition",
    stage: "European qualifying",
    status: "Manual entry",
    headline: "Aris Limassol European campaign tracker",
    note: "Competition, round and opponent should be checked before publishing.",
    team: demoTeams.find((team) => team.id === "aris")!
  }
];

export const demoNews = [
  {
    id: "news-omonia-champions",
    category: "Title Race",
    title: "Omonia Nicosia finish top in the 2025/26 manual MVP table",
    excerpt:
      "The current season dataset now reflects Omonia Nicosia as champions, with Pafos and Aris leading the chasing group.",
    time: "Today"
  },
  {
    id: "news-promoted-clubs",
    category: "Clubs",
    title: "Promoted clubs added to the current-season club list",
    excerpt:
      "Olympiakos Nicosia, Akritas Chlorakas and Krasava Ypsonas are included in the manual current-season setup.",
    time: "1h ago"
  },
  {
    id: "news-previous-champions",
    category: "History",
    title: "Previous champions archive added for five recent seasons",
    excerpt:
      "Supporters can now switch between 2025/26, 2024/25, 2023/24, 2022/23 and 2021/22 standings.",
    time: "3h ago"
  },
  {
    id: "news-players-watch",
    category: "Players",
    title: "Player cards switched to manual squad profiles",
    excerpt:
      "The MVP now avoids unverified goals, assists and ratings, using squad-style player cards until verified data is available.",
    time: "Yesterday"
  },
  {
    id: "news-europe-tracker",
    category: "Europe",
    title: "Cypriot clubs in Europe tracker added",
    excerpt:
      "Omonia, Pafos FC, AEK Larnaca and Aris Limassol now have manually maintained European competition cards.",
    time: "Yesterday"
  }
];

export const featuredMatch = demoFixtures[0];
