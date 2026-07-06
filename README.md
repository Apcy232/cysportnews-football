# CYsportnews Football

Production-ready MVP website for Cypriot football news and league coverage.

The launch version uses **local manual data**. It does not require API-Football,
Sportmonks, paid APIs, cron jobs, or Supabase credentials to run.

## What Works Now

- Home page
- Fixtures page
- Results page
- League Table page
- Clubs page
- News page
- Mobile-friendly dark sports-media design
- Local manual data for teams, fixtures, results, standings and news
- Optional Supabase read support for a future database-backed version
- Vercel-ready Next.js build

## What This Project Uses

- **Next.js** for the website.
- **TypeScript** to catch mistakes early.
- **Tailwind CSS** for styling.
- **Supabase** as an optional future database.
- **Vercel** for deployment.

No web scraping and no paid football API are used in the MVP.

## Folder Guide

- `src/app` contains website pages and global layout.
- `src/components` contains reusable interface pieces.
- `src/lib/demo-data.ts` contains the manual MVP data.
- `src/lib/data/cyprus-football.ts` loads Supabase data only if Supabase env vars exist; otherwise it uses manual data.
- `src/lib/supabase` contains optional Supabase client helpers.
- `supabase/migrations` contains the optional database blueprint for later.
- `.env.example` lists optional environment variables.

## Local Development

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

## Manual Data

Edit this file to update the MVP manually:

```text
src/lib/demo-data.ts
```

That file controls:

- Teams
- Fixtures
- Results
- League table
- News

## Optional Supabase Later

The site works without Supabase.

If you later want to connect Supabase, create `.env.local`:

```bash
cp .env.example .env.local
```

Then fill:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Without those values, the website automatically uses local manual data.

## Vercel Deployment

This MVP can be deployed without environment variables.

Use:

```bash
pnpm build
```

Then deploy the repository to Vercel. The default Vercel settings for Next.js
are enough:

- Framework preset: Next.js
- Install command: `pnpm install`
- Build command: `pnpm build`
- Output directory: leave default

## MVP Status

Ready to publish:

- Manual-data website works locally and in production builds.
- Main pages are complete for the MVP.
- No paid API key is required.
- Supabase is optional.

Still manual:

- Updating fixtures, results, standings and news means editing `src/lib/demo-data.ts`.
- Automatic data sync is intentionally disabled for launch.
