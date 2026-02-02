# Sway Website – Claude Code Instructions

This is a long-standing production codebase for Sway Wellness Spa.

Tech stack:
- Next.js (App Router)
- TypeScript
- Tailwind
- Mindbody API integrations (server-side only)
- Deployed on Vercel

## Core Rules (DO NOT VIOLATE)

- Do NOT change API behavior unless explicitly asked
- Do NOT rename routes, endpoints, or environment variables
- Do NOT introduce new state management libraries
- Do NOT refactor working logic “for cleanliness”
- Do NOT remove defensive checks
- Do NOT touch payment, booking, or card-handling logic without permission

If something looks odd but works — assume it is intentional.

## Project Structure Notes

- `app/api/**/route.ts` contains live production API routes
- Mindbody calls must remain server-side
- Environment variables are managed via Vercel
- Some routes have near-duplicates (intentional during migration/testing)

## Style & Preferences

- Prefer minimal diffs
- Prefer additive changes over rewrites
- Keep logic explicit rather than “clever”
- Type safety > abstraction
- Mobile UX is critical

## When You Are Unsure

- Ask before changing structure
- Suggest alternatives instead of acting
- Flag risks clearly (but briefly)

## Common Tasks

Typical requests include:
- Debugging Mindbody availability or booking flows
- Adding tracking (GA4 / GTM / Ads)
- Small UI/UX improvements
- Performance or reliability fixes
- SEO-safe content or layout changes

Always assume this site is live and revenue-impacting.
