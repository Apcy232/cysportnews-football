import type { ApiFootballFixture } from "./types";

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function mapFixtureStatus(status: string) {
  if (["1H", "HT", "2H", "ET", "BT", "P", "SUSP", "INT", "LIVE"].includes(status)) {
    return "live";
  }

  if (["FT", "AET", "PEN"].includes(status)) {
    return "finished";
  }

  if (["PST"].includes(status)) {
    return "postponed";
  }

  if (["CANC"].includes(status)) {
    return "cancelled";
  }

  if (["ABD"].includes(status)) {
    return "abandoned";
  }

  return "scheduled";
}

export function getFixtureScore(fixture: ApiFootballFixture) {
  return {
    homeScore: fixture.goals.home,
    awayScore: fixture.goals.away,
    homeHalftimeScore: fixture.score.halftime.home,
    awayHalftimeScore: fixture.score.halftime.away
  };
}
