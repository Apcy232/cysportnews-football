create extension if not exists pgcrypto;

do $$
begin
  create type match_status as enum (
    'scheduled',
    'live',
    'postponed',
    'cancelled',
    'finished',
    'abandoned'
  );
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type sync_status as enum ('running', 'success', 'failed');
exception
  when duplicate_object then null;
end $$;

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create table competitions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  country text not null default 'Cyprus',
  api_football_league_id integer,
  sportmonks_league_id bigint,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table seasons (
  id uuid primary key default gen_random_uuid(),
  competition_id uuid not null references competitions(id) on delete cascade,
  name text not null,
  year integer not null,
  starts_on date,
  ends_on date,
  is_current boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (competition_id, year)
);

create table venues (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text,
  capacity integer,
  api_football_venue_id integer unique,
  sportmonks_venue_id bigint,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table teams (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  short_name text,
  slug text not null unique,
  city text,
  founded integer,
  logo_url text,
  venue_id uuid references venues(id) on delete set null,
  api_football_team_id integer unique,
  sportmonks_team_id bigint unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table players (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  slug text not null unique,
  first_name text,
  last_name text,
  date_of_birth date,
  nationality text,
  position text,
  photo_url text,
  height_cm integer,
  weight_kg integer,
  api_football_player_id integer unique,
  sportmonks_player_id bigint unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table team_players (
  id uuid primary key default gen_random_uuid(),
  season_id uuid not null references seasons(id) on delete cascade,
  team_id uuid not null references teams(id) on delete cascade,
  player_id uuid not null references players(id) on delete cascade,
  shirt_number integer,
  joined_on date,
  left_on date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (season_id, team_id, player_id)
);

create table matches (
  id uuid primary key default gen_random_uuid(),
  season_id uuid not null references seasons(id) on delete cascade,
  competition_id uuid not null references competitions(id) on delete cascade,
  home_team_id uuid not null references teams(id) on delete restrict,
  away_team_id uuid not null references teams(id) on delete restrict,
  venue_id uuid references venues(id) on delete set null,
  round text,
  stage text,
  kickoff_at timestamptz not null,
  status match_status not null default 'scheduled',
  elapsed_minutes integer,
  home_score integer,
  away_score integer,
  home_halftime_score integer,
  away_halftime_score integer,
  api_football_fixture_id integer unique,
  sportmonks_fixture_id bigint unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (home_team_id <> away_team_id)
);

create table standings (
  id uuid primary key default gen_random_uuid(),
  season_id uuid not null references seasons(id) on delete cascade,
  team_id uuid not null references teams(id) on delete cascade,
  stage text not null default 'regular',
  position integer not null,
  played integer not null default 0,
  won integer not null default 0,
  drawn integer not null default 0,
  lost integer not null default 0,
  goals_for integer not null default 0,
  goals_against integer not null default 0,
  goal_difference integer not null default 0,
  points integer not null default 0,
  form text,
  updated_from_provider_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (season_id, team_id, stage)
);

create table player_statistics (
  id uuid primary key default gen_random_uuid(),
  season_id uuid not null references seasons(id) on delete cascade,
  team_id uuid references teams(id) on delete set null,
  player_id uuid not null references players(id) on delete cascade,
  appearances integer not null default 0,
  starts integer not null default 0,
  minutes integer not null default 0,
  goals integer not null default 0,
  assists integer not null default 0,
  yellow_cards integer not null default 0,
  red_cards integer not null default 0,
  saves integer,
  clean_sheets integer,
  raw_provider_data jsonb not null default '{}'::jsonb,
  updated_from_provider_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (season_id, player_id, team_id)
);

create table team_statistics (
  id uuid primary key default gen_random_uuid(),
  season_id uuid not null references seasons(id) on delete cascade,
  team_id uuid not null references teams(id) on delete cascade,
  matches_played integer not null default 0,
  goals_for integer not null default 0,
  goals_against integer not null default 0,
  clean_sheets integer,
  raw_provider_data jsonb not null default '{}'::jsonb,
  updated_from_provider_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (season_id, team_id)
);

create table match_events (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references matches(id) on delete cascade,
  team_id uuid references teams(id) on delete set null,
  player_id uuid references players(id) on delete set null,
  related_player_id uuid references players(id) on delete set null,
  minute integer,
  extra_minute integer,
  event_type text not null,
  detail text,
  provider_event_id text,
  raw_provider_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table match_lineups (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references matches(id) on delete cascade,
  team_id uuid not null references teams(id) on delete cascade,
  player_id uuid not null references players(id) on delete cascade,
  is_starting boolean not null default false,
  position text,
  shirt_number integer,
  formation text,
  created_at timestamptz not null default now(),
  unique (match_id, team_id, player_id)
);

create table news_articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  body text,
  hero_image_url text,
  source_name text,
  source_url text,
  published_at timestamptz,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table sync_runs (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  sync_type text not null,
  status sync_status not null default 'running',
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  records_inserted integer not null default 0,
  records_updated integer not null default 0,
  error_message text,
  metadata jsonb not null default '{}'::jsonb
);

create index seasons_current_idx on seasons (is_current) where is_current = true;
create index matches_kickoff_idx on matches (kickoff_at);
create index matches_status_idx on matches (status);
create index matches_home_team_idx on matches (home_team_id);
create index matches_away_team_idx on matches (away_team_id);
create index standings_season_position_idx on standings (season_id, stage, position);
create index player_statistics_season_goals_idx on player_statistics (season_id, goals desc);
create index match_events_match_minute_idx on match_events (match_id, minute);
create index news_articles_published_idx on news_articles (published_at desc) where is_published = true;
create index sync_runs_started_idx on sync_runs (started_at desc);

create trigger competitions_set_updated_at
before update on competitions
for each row execute function set_updated_at();

create trigger seasons_set_updated_at
before update on seasons
for each row execute function set_updated_at();

create trigger venues_set_updated_at
before update on venues
for each row execute function set_updated_at();

create trigger teams_set_updated_at
before update on teams
for each row execute function set_updated_at();

create trigger players_set_updated_at
before update on players
for each row execute function set_updated_at();

create trigger team_players_set_updated_at
before update on team_players
for each row execute function set_updated_at();

create trigger matches_set_updated_at
before update on matches
for each row execute function set_updated_at();

create trigger standings_set_updated_at
before update on standings
for each row execute function set_updated_at();

create trigger player_statistics_set_updated_at
before update on player_statistics
for each row execute function set_updated_at();

create trigger team_statistics_set_updated_at
before update on team_statistics
for each row execute function set_updated_at();

create trigger news_articles_set_updated_at
before update on news_articles
for each row execute function set_updated_at();

alter table competitions enable row level security;
alter table seasons enable row level security;
alter table venues enable row level security;
alter table teams enable row level security;
alter table players enable row level security;
alter table team_players enable row level security;
alter table matches enable row level security;
alter table standings enable row level security;
alter table player_statistics enable row level security;
alter table team_statistics enable row level security;
alter table match_events enable row level security;
alter table match_lineups enable row level security;
alter table news_articles enable row level security;
alter table sync_runs enable row level security;

create policy "Public read competitions" on competitions for select using (true);
create policy "Public read seasons" on seasons for select using (true);
create policy "Public read venues" on venues for select using (true);
create policy "Public read teams" on teams for select using (true);
create policy "Public read players" on players for select using (true);
create policy "Public read team players" on team_players for select using (true);
create policy "Public read matches" on matches for select using (true);
create policy "Public read standings" on standings for select using (true);
create policy "Public read player statistics" on player_statistics for select using (true);
create policy "Public read team statistics" on team_statistics for select using (true);
create policy "Public read match events" on match_events for select using (true);
create policy "Public read match lineups" on match_lineups for select using (true);
create policy "Public read published news" on news_articles
for select using (is_published = true);
