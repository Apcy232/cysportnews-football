type ApiFootballEnv = {
  apiFootballBaseUrl: string;
  apiFootballKey: string;
  apiFootballLeagueId?: number;
  apiFootballSeason: number;
};

type SupabaseEnv = {
  supabaseUrl: string;
  supabaseServiceRoleKey: string;
};

type ServerEnv = SupabaseEnv &
  ApiFootballEnv & {
    cronSecret?: string;
  };

function required(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function optionalNumber(name: string): number | undefined {
  const value = process.env[name];

  if (!value) {
    return undefined;
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed)) {
    throw new Error(`Environment variable ${name} must be an integer.`);
  }

  return parsed;
}

export function getApiFootballEnv(): ApiFootballEnv {
  return {
    apiFootballBaseUrl:
      process.env.API_FOOTBALL_BASE_URL ?? "https://v3.football.api-sports.io",
    apiFootballKey: required("API_FOOTBALL_KEY"),
    apiFootballLeagueId: optionalNumber("API_FOOTBALL_LEAGUE_ID"),
    apiFootballSeason: optionalNumber("API_FOOTBALL_SEASON") ?? 2026
  };
}

export function getSupabaseEnv(): SupabaseEnv {
  return {
    supabaseUrl: required("NEXT_PUBLIC_SUPABASE_URL"),
    supabaseServiceRoleKey: required("SUPABASE_SERVICE_ROLE_KEY")
  };
}

export function getServerEnv(): ServerEnv {
  return {
    ...getSupabaseEnv(),
    ...getApiFootballEnv(),
    cronSecret: process.env.CRON_SECRET
  };
}
