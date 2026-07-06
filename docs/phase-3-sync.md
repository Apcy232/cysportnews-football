# Phase 3: Supabase and API-Football Sync

Phase 3 connects the app to live football data. The code is ready, but the live run needs real secrets from your own Supabase and API-Football accounts.

## Required accounts

You need:

- A Supabase project.
- An API-Football/API-SPORTS API key.

Do not paste these keys into chat. Put them in `.env.local` on your machine and later in Vercel environment variables.

## Local environment file

Create `.env.local` from `.env.example` and fill these values:

```bash
cp .env.example .env.local
```

Required for coverage checks:

```bash
API_FOOTBALL_KEY=your_api_football_key
API_FOOTBALL_BASE_URL=https://v3.football.api-sports.io
API_FOOTBALL_SEASON=2026
```

Required for imports:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
CRON_SECRET=make_a_long_random_secret
```

Optional after the coverage check discovers the league:

```bash
API_FOOTBALL_LEAGUE_ID=league_id_from_api_football
```

## Apply the database migrations

After installing and logging in to the Supabase CLI:

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

This creates all Phase 2 tables in the real Supabase database.

## Confirm API-Football coverage

Run:

```bash
pnpm sync:check
```

This checks API-Football for:

- Cyprus First Division league record.
- Teams for the configured season.
- Fixtures/results for the configured season.
- Standings for the configured season.

If teams, fixtures and standings are all returned, API-Football is good enough to remain the primary provider.

If any of those are missing, we should test Sportmonks next before building more import logic.

## Trigger a manual import locally

Start the app:

```bash
pnpm dev
```

Then call the protected sync endpoint:

```bash
curl "http://localhost:3000/api/cron/sync?target=all&secret=$CRON_SECRET"
```

Allowed targets:

- `all`
- `teams`
- `fixtures`
- `standings`

The sync writes a row to `sync_runs` before it starts, then updates that row with success or failure details.

## What gets imported now

The current sync imports:

- Teams.
- Venues attached to teams.
- Fixtures.
- Results, as finished fixtures.
- League table rows.

Players, player statistics, match events and lineups are already supported by the database design, but their API import code should be added after we confirm the provider coverage level and API plan limits.

## Why the sync route is protected

The sync endpoint writes to the database and uses paid API quota. It requires `CRON_SECRET` so random visitors cannot trigger imports.
