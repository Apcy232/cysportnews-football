import { getApiFootballEnv } from "@/lib/env";
import type {
  ApiFootballEnvelope,
  ApiFootballFixture,
  ApiFootballLeague,
  ApiFootballStanding,
  ApiFootballTeam
} from "./types";

export class ApiFootballError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiFootballError";
  }
}

export class ApiFootballClient {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor() {
    const env = getApiFootballEnv();
    this.baseUrl = env.apiFootballBaseUrl;
    this.apiKey = env.apiFootballKey;
  }

  async findCyprusFirstDivision() {
    return this.request<ApiFootballLeague>("/leagues", {
      country: "Cyprus",
      name: "First Division"
    });
  }

  async getTeams(leagueId: number, season: number) {
    return this.request<ApiFootballTeam>("/teams", {
      league: String(leagueId),
      season: String(season)
    });
  }

  async getFixtures(leagueId: number, season: number) {
    return this.request<ApiFootballFixture>("/fixtures", {
      league: String(leagueId),
      season: String(season)
    });
  }

  async getStandings(leagueId: number, season: number) {
    return this.request<ApiFootballStanding>("/standings", {
      league: String(leagueId),
      season: String(season)
    });
  }

  private async request<T>(
    path: string,
    params: Record<string, string>
  ): Promise<ApiFootballEnvelope<T>> {
    const url = new URL(path, this.baseUrl);

    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }

    const response = await fetch(url, {
      headers: {
        "x-apisports-key": this.apiKey
      },
      cache: "no-store"
    });

    if (!response.ok) {
      throw new ApiFootballError(
        `API-Football request failed with ${response.status} ${response.statusText}.`
      );
    }

    const data = (await response.json()) as ApiFootballEnvelope<T>;
    const errors = data.errors;
    const hasErrors = Array.isArray(errors)
      ? errors.length > 0
      : Object.keys(errors).length > 0;

    if (hasErrors) {
      throw new ApiFootballError(
        `API-Football returned an error: ${JSON.stringify(errors)}`
      );
    }

    return data;
  }
}
