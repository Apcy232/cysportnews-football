# CYsportnews Football

Production-ready football news and data website focused on Cypriot football.

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
- `supabase/migrations` contains the database blueprint.
- `docs/supabase.md` explains the Supabase setup in plain language.
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

## Phase status

Phase 1 created the app foundation and CYsportnews Football branding.

Phase 2 adds the Supabase database schema as migrations. Live Supabase credentials and API imports come next.
