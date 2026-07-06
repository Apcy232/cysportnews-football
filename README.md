# CYsportnews Football

Production-ready football news and data website focused on Cypriot football.

The public website runs with real Supabase data when credentials are configured.
Without credentials, it falls back to **safe demo-data mode** so the site still
works locally.

## What this project uses

- **Next.js** for the website and server routes.
- **TypeScript** to catch mistakes before the site runs.
- **Tailwind CSS** for fast, consistent styling.
- **Supabase** for the database.
- **Vercel** for hosting and scheduled updates.
- **API-Football** as the primary football data source.
- **Sportmonks** as the fallback provider if API-Football coverage is incomplete.

No web scraping will be used unless explicitly approved.

## Folder guide

- `src/app` contains website pages and global layout.
- `src/components` contains reusable interface pieces.
- `src/lib` contains shared application logic.
- `src/lib/demo-data.ts` contains the temporary MVP data for teams, fixtures,
  results, standings and news.
- `src/lib/football-data` is where API-Football and Sportmonks integration code will live.
- `src/lib/supabase` is where Supabase client helpers live.
- `supabase/migrations` contains the database blueprint.
- `docs/supabase.md` explains the Supabase setup in plain language.
- `docs/phase-3-sync.md` explains the API-Football sync setup.
- `.env.example` lists the environment variables the app will need.

## Local development

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

No API keys are required for the homepage, fixtures, results, league table,
clubs or news pages.

## Demo data mode

The MVP pages read from `src/lib/demo-data.ts`.

This lets the website look and behave like a real football site tonight, before
live API access is connected. Later, each page can swap the demo data for
Supabase queries without changing the visual design.

The live-ready data layer powers:

- Home
- Fixtures
- Results
- League Table
- Clubs
- News

## Adding real credentials

Create a local environment file:

```bash
cp .env.example .env.local
```

Then add your real values:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
API_FOOTBALL_KEY=
API_FOOTBALL_BASE_URL=https://v3.football.api-sports.io
API_FOOTBALL_SEASON=2026
CRON_SECRET=
```

After credentials are present, check API-Football coverage:

```bash
pnpm sync:check
```

Then run the protected sync endpoint locally:

```bash
pnpm dev
```

```bash
curl "http://localhost:3000/api/cron/sync?target=all&secret=YOUR_CRON_SECRET"
```

Use Sportmonks only if API-Football does not provide complete Cyprus First
Division coverage.

## Automatic sync

`vercel.json` schedules `/api/cron/sync` every 30 minutes on Vercel.

The same route can be triggered manually with `CRON_SECRET`:

```bash
curl "http://localhost:3000/api/cron/sync?target=all&secret=YOUR_CRON_SECRET"
```

Every sync writes a row to `sync_runs` so failures and successful imports can be
reviewed later.

## Phase status

Phase 1 created the app foundation and CYsportnews Football branding.

Phase 2 adds the Supabase database schema as migrations. Live Supabase credentials and API imports come next.

Phase 3 adds the API-Football integration and reusable Supabase synchronization service.

The current MVP keeps demo fallback data for local development, but production
pages are wired to Supabase when the environment variables are present.
