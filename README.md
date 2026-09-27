# Hack Club Nagpur

Website for Hack Club Nagpur — a free, student-run club where Nagpur
teenagers (13–18) build games, hardware, and websites together.

## Pages

- **Home** — hero, build-night spotlight, FAQ
- **Events & Sprints** — meetups (coming soon for now)
- **Projects** — what teens are building (coming soon for now)
- **YSWS Perks** — how shipping projects earns rewards
- **Manifesto** — what the club is and why it exists
- **Join** — full-screen onboarding slides ending in Discord login
- **Team** — Vishal (chapter leader) + open co-organizer seat

## Run it

```bash
bun install
bun run dev
```

Opens at http://localhost:3000. No API keys or `.env` needed.

`bun run lint` to typecheck, `bun run build` for production.

## Content

Almost everything lives in `src/data/clubData.ts` — events, projects,
FAQs, perks, contact email. Edit that file to update the site.

Join requests land in `hackclubngp@gmail.com` and ping our Discord.
Discord login needs the redirect URLs set in the Discord Developer
Portal (see `src/auth/discord.ts`).
