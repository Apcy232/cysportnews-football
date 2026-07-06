# Cyprus First Division Website

Production-ready website for Cyprus First Division football data.

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
- `src/lib/football-data` is where API-Football and Sportmonks integration code will live.
- `src/lib/supabase` is where Supabase client helpers live.
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

## Phase 1 scope

Phase 1 creates the project foundation only. It does not connect Supabase or import live football data yet. Those are Phase 2 and Phase 3 tasks.
