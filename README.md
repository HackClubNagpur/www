# Hack Club Nagpur

Website for Hack Club Nagpur, a free student-run club where Nagpur
teenagers build games, hardware, and websites together.

The site has a home page plus events, projects, perks, manifesto, join,
and team pages. Events and projects are coming-soon placeholders until
the first meetup happens.

Run it with `bun install` and `bun run dev`, then open localhost:3000.
No API keys or env files needed for development. `bun run lint` checks
types, `bun run build` makes the production bundle.

Almost all content lives in `src/data/clubData.ts`. Join requests go to
our Gmail and ping Discord; the keys for that live in `.env` (copy from
`.env.example`).
