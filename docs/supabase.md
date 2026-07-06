# Supabase Setup

Phase 2 stores the database structure as migrations. A migration is a saved SQL file that Supabase can run to create or update the database.

## What the first migration creates

- `competitions`: the Cyprus First Division competition record.
- `seasons`: season records such as `2026-27`.
- `venues`: stadium information.
- `teams`: club names, badges and provider IDs.
- `players`: player profiles and provider IDs.
- `team_players`: squads by season.
- `matches`: fixtures, live match states and results.
- `standings`: league table rows.
- `player_statistics`: goals, assists, cards, minutes and similar player stats.
- `team_statistics`: team-level season stats.
- `match_events`: goals, cards, substitutions and other match events.
- `match_lineups`: starting lineups and substitutes.
- `news_articles`: CYsportnews Football editorial content.
- `sync_runs`: logs for automated API imports.

## Security model

The public website can read published football data. Browser users cannot write to the database.

Future import jobs will write using the Supabase service role key from server-only code. That key must never be exposed in browser code.

## Provider strategy

API-Football is the primary data source. Sportmonks is the fallback only if API-Football cannot provide complete Cyprus First Division coverage.

Provider IDs are stored directly on important tables, for example `api_football_fixture_id` on `matches`. This lets sync jobs update existing records instead of creating duplicates.

## How to apply these migrations later

After creating a Supabase project and installing the Supabase CLI:

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

The project reference comes from your Supabase dashboard URL.
