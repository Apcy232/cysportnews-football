# CYsportnews Football

Production-ready Cypriot football website powered by live API-Football data.

The site uses API-Football v3 for Cyprus First Division coverage. The API key is
read only on the server from `API_FOOTBALL_KEY` and is never exposed to browser
JavaScript.

## What Works Now

- Home page
- Fixtures page
- Results page
- League Table page
- Clubs page
- Players page with squads and top scorers
- Europe page for upcoming UEFA fixtures involving Cypriot clubs
- News-style homepage cards generated from live football data
- Mobile-friendly dark sports-media design
- Secure server-side API routes under `/api/football`
- 20-minute response caching to reduce API-Football usage
- Vercel-ready Next.js build

## Data Source

- Provider: API-Football v3
- Base URL: `https://v3.football.api-sports.io`
- League: Cyprus First Division
- League ID: `318`
- Default season: automatically calculated, or set with `API_FOOTBALL_SEASON`

The app fetches:

- Standings
- Fixtures
- Results
- Teams
- Team squads
- Players
- Top scorers
- Upcoming European fixtures for Cypriot clubs when API-Football lists them

## Environment Variables

Local `.env.local`:

```bash
API_FOOTBALL_KEY=<my key>
API_FOOTBALL_SEASON=2025
```

Vercel Environment Variable:

```bash
API_FOOTBALL_KEY=<my key>
```

`API_FOOTBALL_SEASON` is optional. Use it when you want to force a specific API
season, such as `2025`.

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

## Verification

Run:

```bash
pnpm run typecheck
pnpm run lint
pnpm run build
```

## Vercel Deployment

1. Connect the GitHub repository to Vercel.
2. Add `API_FOOTBALL_KEY` in Vercel Project Settings → Environment Variables.
3. Deploy with the default Next.js settings:

- Framework preset: Next.js
- Install command: `pnpm install`
- Build command: `pnpm build`
- Output directory: leave default
