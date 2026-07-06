const baseUrl =
  process.env.API_FOOTBALL_BASE_URL ?? "https://v3.football.api-sports.io";
const apiKey = process.env.API_FOOTBALL_KEY;
const season = Number(process.env.API_FOOTBALL_SEASON ?? "2026");

if (!apiKey) {
  console.error("Missing API_FOOTBALL_KEY.");
  process.exit(1);
}

async function request(path, params) {
  const url = new URL(path, baseUrl);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }

  const response = await fetch(url, {
    headers: {
      "x-apisports-key": apiKey
    }
  });

  if (!response.ok) {
    throw new Error(`${path} failed with ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (Array.isArray(data.errors) ? data.errors.length > 0 : Object.keys(data.errors ?? {}).length > 0) {
    throw new Error(`${path} returned errors: ${JSON.stringify(data.errors)}`);
  }

  return data;
}

const leagues = await request("/leagues", {
  country: "Cyprus",
  name: "First Division"
});

const league = leagues.response.find(
  (item) =>
    item.country?.name === "Cyprus" &&
    item.league?.name?.toLowerCase().includes("first division")
) ?? leagues.response[0];

if (!league) {
  console.error("API-Football did not return Cyprus First Division.");
  process.exit(1);
}

const leagueId = Number(process.env.API_FOOTBALL_LEAGUE_ID ?? league.league.id);
const [teams, fixtures, standings] = await Promise.all([
  request("/teams", { league: leagueId, season }),
  request("/fixtures", { league: leagueId, season }),
  request("/standings", { league: leagueId, season })
]);

console.log(
  JSON.stringify(
    {
      ok:
        teams.response.length > 0 &&
        fixtures.response.length > 0 &&
        standings.response.length > 0,
      league: {
        id: leagueId,
        name: league.league.name,
        country: league.country.name
      },
      season,
      counts: {
        teams: teams.response.length,
        fixtures: fixtures.response.length,
        standings: standings.response.length
      }
    },
    null,
    2
  )
);
