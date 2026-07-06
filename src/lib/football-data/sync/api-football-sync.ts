import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getApiFootballEnv } from "@/lib/env";
import { ApiFootballClient } from "@/lib/football-data/api-football/client";
import { getFixtureScore, mapFixtureStatus, slugify } from "@/lib/football-data/api-football/normalize";
import type {
  ApiFootballFixture,
  ApiFootballLeague,
  ApiFootballStanding,
  ApiFootballTeam
} from "@/lib/football-data/api-football/types";

type SyncCounters = {
  inserted: number;
  updated: number;
};

type SyncSummary = {
  provider: "api-football";
  leagueId: number;
  season: number;
  teams?: SyncCounters;
  fixtures?: SyncCounters;
  standings?: SyncCounters;
};

type DbRecord = Record<string, unknown>;

export class ApiFootballSyncService {
  private readonly client = new ApiFootballClient();
  private readonly env = getApiFootballEnv();
  private supabaseClient?: ReturnType<typeof createSupabaseAdminClient>;

  async checkCoverage() {
    const leagues = await this.client.findCyprusFirstDivision();
    const currentLeague = this.pickLeague(leagues.response);

    if (!currentLeague) {
      return {
        ok: false,
        message: "API-Football did not return a Cyprus First Division league.",
        candidates: leagues.response
      };
    }

    const leagueId = currentLeague.league.id;
    const season = this.env.apiFootballSeason;
    const [teams, fixtures, standings] = await Promise.all([
      this.client.getTeams(leagueId, season),
      this.client.getFixtures(leagueId, season),
      this.client.getStandings(leagueId, season)
    ]);

    return {
      ok:
        teams.response.length > 0 &&
        fixtures.response.length > 0 &&
        standings.response.length > 0,
      leagueId,
      season,
      counts: {
        teams: teams.response.length,
        fixtures: fixtures.response.length,
        standings: standings.response.length
      },
      message:
        teams.response.length > 0 &&
        fixtures.response.length > 0 &&
        standings.response.length > 0
          ? "API-Football has Cyprus First Division teams, fixtures and standings for the configured season."
          : "API-Football returned incomplete Cyprus First Division coverage for the configured season."
    };
  }

  async syncAll(): Promise<SyncSummary> {
    return this.withSyncRun("full", async () => {
      const leagueId = await this.resolveLeagueId();
      const season = this.env.apiFootballSeason;
      const competitionId = await this.ensureCompetition(leagueId);
      const seasonId = await this.ensureSeason(competitionId, season);
      const teams = await this.syncTeams(leagueId, season);
      const fixtures = await this.syncFixtures({
        leagueId,
        season,
        competitionId,
        seasonId
      });
      const standings = await this.syncStandings({ leagueId, season, seasonId });

      return {
        provider: "api-football",
        leagueId,
        season,
        teams,
        fixtures,
        standings
      };
    });
  }

  async syncTeamsOnly() {
    return this.withSyncRun("teams", async () => {
      const leagueId = await this.resolveLeagueId();
      const season = this.env.apiFootballSeason;
      await this.ensureSeason(await this.ensureCompetition(leagueId), season);
      const teams = await this.syncTeams(leagueId, season);

      return {
        provider: "api-football" as const,
        leagueId,
        season,
        teams
      };
    });
  }

  async syncFixturesOnly() {
    return this.withSyncRun("fixtures", async () => {
      const leagueId = await this.resolveLeagueId();
      const season = this.env.apiFootballSeason;
      const competitionId = await this.ensureCompetition(leagueId);
      const seasonId = await this.ensureSeason(competitionId, season);
      await this.syncTeams(leagueId, season);
      const fixtures = await this.syncFixtures({
        leagueId,
        season,
        competitionId,
        seasonId
      });

      return {
        provider: "api-football" as const,
        leagueId,
        season,
        fixtures
      };
    });
  }

  async syncStandingsOnly() {
    return this.withSyncRun("standings", async () => {
      const leagueId = await this.resolveLeagueId();
      const season = this.env.apiFootballSeason;
      const competitionId = await this.ensureCompetition(leagueId);
      const seasonId = await this.ensureSeason(competitionId, season);
      await this.syncTeams(leagueId, season);
      const standings = await this.syncStandings({ leagueId, season, seasonId });

      return {
        provider: "api-football" as const,
        leagueId,
        season,
        standings
      };
    });
  }

  private async withSyncRun<T extends SyncSummary | Omit<SyncSummary, "fixtures" | "standings">>(
    syncType: string,
    action: () => Promise<T>
  ) {
    const { data, error } = await this.supabase()
      .from("sync_runs")
      .insert({
        provider: "api-football",
        sync_type: syncType,
        status: "running"
      })
      .select("id")
      .single();

    if (error) {
      throw new Error(`Could not create sync log: ${error.message}`);
    }

    try {
      const result = await action();
      const totals = this.countTotals(result);

      await this.supabase()
        .from("sync_runs")
        .update({
          status: "success",
          finished_at: new Date().toISOString(),
          records_inserted: totals.inserted,
          records_updated: totals.updated,
          metadata: result
        })
        .eq("id", data.id);

      return result;
    } catch (error) {
      await this.supabase()
        .from("sync_runs")
        .update({
          status: "failed",
          finished_at: new Date().toISOString(),
          error_message:
            error instanceof Error ? error.message : "Unknown sync failure"
        })
        .eq("id", data.id);

      throw error;
    }
  }

  private countTotals(summary: Partial<SyncSummary>) {
    const counters = [summary.teams, summary.fixtures, summary.standings].filter(
      Boolean
    ) as SyncCounters[];

    return counters.reduce(
      (total, counter) => ({
        inserted: total.inserted + counter.inserted,
        updated: total.updated + counter.updated
      }),
      { inserted: 0, updated: 0 }
    );
  }

  private async resolveLeagueId() {
    if (this.env.apiFootballLeagueId) {
      return this.env.apiFootballLeagueId;
    }

    const leagues = await this.client.findCyprusFirstDivision();
    const league = this.pickLeague(leagues.response);

    if (!league) {
      throw new Error("Could not find Cyprus First Division in API-Football.");
    }

    return league.league.id;
  }

  private pickLeague(leagues: ApiFootballLeague[]) {
    return (
      leagues.find(
        (item) =>
          item.country.name === "Cyprus" &&
          item.league.name.toLowerCase().includes("first division")
      ) ?? leagues[0]
    );
  }

  private async ensureCompetition(apiFootballLeagueId: number) {
    const { data, error } = await this.supabase()
      .from("competitions")
      .upsert(
        {
          name: "Cyprus First Division",
          slug: "cyprus-first-division",
          country: "Cyprus",
          api_football_league_id: apiFootballLeagueId
        },
        { onConflict: "slug" }
      )
      .select("id")
      .single();

    if (error) {
      throw new Error(`Could not upsert competition: ${error.message}`);
    }

    return data.id as string;
  }

  private async ensureSeason(competitionId: string, year: number) {
    const { data, error } = await this.supabase()
      .from("seasons")
      .upsert(
        {
          competition_id: competitionId,
          name: `${year}-${String(year + 1).slice(-2)}`,
          year,
          is_current: true
        },
        { onConflict: "competition_id,year" }
      )
      .select("id")
      .single();

    if (error) {
      throw new Error(`Could not upsert season: ${error.message}`);
    }

    return data.id as string;
  }

  private async syncTeams(leagueId: number, season: number): Promise<SyncCounters> {
    const response = await this.client.getTeams(leagueId, season);
    let inserted = 0;
    let updated = 0;

    for (const item of response.response) {
      const existing = await this.findOne("teams", "api_football_team_id", item.team.id);
      const venueId = await this.upsertVenue(item);

      await this.upsertTeam(item, venueId);

      if (existing) {
        updated += 1;
      } else {
        inserted += 1;
      }
    }

    return { inserted, updated };
  }

  private async upsertVenue(item: ApiFootballTeam) {
    if (!item.venue.id && !item.venue.name) {
      return null;
    }

    const { data, error } = await this.supabase()
      .from("venues")
      .upsert(
        {
          name: item.venue.name ?? "Unknown venue",
          city: item.venue.city,
          capacity: item.venue.capacity,
          api_football_venue_id: item.venue.id
        },
        { onConflict: "api_football_venue_id" }
      )
      .select("id")
      .single();

    if (error) {
      throw new Error(`Could not upsert venue: ${error.message}`);
    }

    return data.id as string;
  }

  private async upsertTeam(item: ApiFootballTeam, venueId: string | null) {
    const { error } = await this.supabase().from("teams").upsert(
      {
        name: item.team.name,
        short_name: item.team.code,
        slug: slugify(item.team.name),
        city: item.venue.city,
        founded: item.team.founded,
        logo_url: item.team.logo,
        venue_id: venueId,
        api_football_team_id: item.team.id
      },
      { onConflict: "api_football_team_id" }
    );

    if (error) {
      throw new Error(`Could not upsert team ${item.team.name}: ${error.message}`);
    }
  }

  private async syncFixtures(input: {
    leagueId: number;
    season: number;
    competitionId: string;
    seasonId: string;
  }): Promise<SyncCounters> {
    const response = await this.client.getFixtures(input.leagueId, input.season);
    let inserted = 0;
    let updated = 0;

    for (const item of response.response) {
      const existing = await this.findOne(
        "matches",
        "api_football_fixture_id",
        item.fixture.id
      );

      await this.upsertFixture(item, input.competitionId, input.seasonId);

      if (existing) {
        updated += 1;
      } else {
        inserted += 1;
      }
    }

    return { inserted, updated };
  }

  private async upsertFixture(
    item: ApiFootballFixture,
    competitionId: string,
    seasonId: string
  ) {
    const homeTeamId = await this.getTeamId(item.teams.home.id);
    const awayTeamId = await this.getTeamId(item.teams.away.id);
    const venueId = await this.getVenueId(item.fixture.venue.id);
    const score = getFixtureScore(item);

    const { error } = await this.supabase().from("matches").upsert(
      {
        season_id: seasonId,
        competition_id: competitionId,
        home_team_id: homeTeamId,
        away_team_id: awayTeamId,
        venue_id: venueId,
        round: item.league.round,
        kickoff_at: item.fixture.date,
        status: mapFixtureStatus(item.fixture.status.short),
        elapsed_minutes: item.fixture.status.elapsed,
        home_score: score.homeScore,
        away_score: score.awayScore,
        home_halftime_score: score.homeHalftimeScore,
        away_halftime_score: score.awayHalftimeScore,
        api_football_fixture_id: item.fixture.id
      },
      { onConflict: "api_football_fixture_id" }
    );

    if (error) {
      throw new Error(`Could not upsert fixture ${item.fixture.id}: ${error.message}`);
    }
  }

  private async syncStandings(input: {
    leagueId: number;
    season: number;
    seasonId: string;
  }): Promise<SyncCounters> {
    const response = await this.client.getStandings(input.leagueId, input.season);
    const rows = this.flattenStandings(response.response);
    let inserted = 0;
    let updated = 0;

    for (const row of rows) {
      const teamId = await this.getTeamId(row.team.id);
      const existing = await this.supabase()
        .from("standings")
        .select("id")
        .eq("season_id", input.seasonId)
        .eq("team_id", teamId)
        .eq("stage", row.group ?? "regular")
        .maybeSingle();

      const { error } = await this.supabase().from("standings").upsert(
        {
          season_id: input.seasonId,
          team_id: teamId,
          stage: row.group ?? "regular",
          position: row.rank,
          played: row.all.played,
          won: row.all.win,
          drawn: row.all.draw,
          lost: row.all.lose,
          goals_for: row.all.goals.for,
          goals_against: row.all.goals.against,
          goal_difference: row.goalsDiff,
          points: row.points,
          form: row.form,
          updated_from_provider_at: row.update
        },
        { onConflict: "season_id,team_id,stage" }
      );

      if (error) {
        throw new Error(`Could not upsert standings row: ${error.message}`);
      }

      if (existing.data) {
        updated += 1;
      } else {
        inserted += 1;
      }
    }

    return { inserted, updated };
  }

  private flattenStandings(response: ApiFootballStanding[]) {
    return response.flatMap((item) => item.league.standings.flat());
  }

  private async getTeamId(apiFootballTeamId: number) {
    const { data, error } = await this.supabase()
      .from("teams")
      .select("id")
      .eq("api_football_team_id", apiFootballTeamId)
      .single();

    if (error) {
      throw new Error(
        `Could not find team with API-Football ID ${apiFootballTeamId}: ${error.message}`
      );
    }

    return data.id as string;
  }

  private async getVenueId(apiFootballVenueId: number | null) {
    if (!apiFootballVenueId) {
      return null;
    }

    const { data } = await this.supabase()
      .from("venues")
      .select("id")
      .eq("api_football_venue_id", apiFootballVenueId)
      .maybeSingle();

    return (data?.id as string | undefined) ?? null;
  }

  private async findOne(table: string, column: string, value: string | number) {
    const { data, error } = await this.supabase()
      .from(table)
      .select("id")
      .eq(column, value)
      .maybeSingle();

    if (error) {
      throw new Error(`Could not query ${table}: ${error.message}`);
    }

    return data as DbRecord | null;
  }

  private supabase() {
    this.supabaseClient ??= createSupabaseAdminClient();

    return this.supabaseClient;
  }
}
