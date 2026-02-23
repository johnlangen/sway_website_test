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

## Tracking & Analytics (GTM / GA4 / Google Ads)

### Global Setup (layout.tsx, production only)
- GTM: `GTM-KW4TK2DL`
- Google Ads: `AW-17421817568`
- Attentive (email/SMS marketing)
- Bowtie AI chat widget

### Booking Funnel Tracking
All three booking flows push the same shared funnel events to `dataLayer`, with `booking_flow` to distinguish service type:

| Step | Event | Flows |
|------|-------|-------|
| 1 | `booking_start` | All |
| 2 | `booking_time_selected` | All |
| 3 | `booking_email_entered` | All |
| 4 | `booking_card_entered` | All |
| 5 | `booking_confirmed` | All |
| 6 | Completion (see below) | All |

### Completion Events (per flow)
- Aescape: `aescape_booking_complete` + Google Ads conversion
- Service (Massage/Facial): `service_booking_complete` + Google Ads conversion
- Remedy Room: `remedy_room_booking_complete` + Google Ads conversion

### `booking_flow` Values
- `"aescape"` — book-aescape/page.tsx
- `"massage"` — book-service/page.tsx (category=massage)
- `"facial"` — book-service/page.tsx (category=facial)
- `"remedy_room"` — book-remedy-room/page.tsx

### Flow-Specific Events (no GTM tags, kept for future use)
- Aescape: `booking_session_selected`
- Service: `booking_service_selected`, `booking_boosts_done`

### Google Ads Conversions
Each booking fires TWO conversions: one main (primary, count=One) + one per-service (secondary, count=Every).

| Conversion | send_to Label | Role | Count |
|-----------|---------------|------|-------|
| All Purchases (main) | `T3o8CK-LoukbEOCtr_NA` | Primary (for bidding) | One |
| Aescape Purchase | `ZY8ECK7B0P0bEOCtr_NA` | Secondary (reporting) | Every |
| Massage/Facial Purchase | `ArEMCLWJ0P0bEOCtr_NA` | Secondary (reporting) | Every |
| Remedy Room Purchase | `NB15CLC60P0bEOCtr_NA` | Secondary (reporting) | Every |

All use Google Ads account `AW-17421817568`. Switch campaigns to "Maximize Conversions" after ~30 conversions in 30 days.

### GTM Tags (Version 17+)
All funnel step tags include `booking_flow` as an event parameter via Data Layer Variable `DLV - booking_flow`.

### TODO: GA4 Funnel Explorations
Create funnel explorations in GA4 (Explore → Funnel Exploration) for each booking flow:
- Aescape funnel (filter: booking_flow = aescape)
- Massage funnel (filter: booking_flow = massage)
- Facial funnel (filter: booking_flow = facial)
- Remedy Room funnel (filter: booking_flow = remedy_room)
Steps: booking_start → booking_time_selected → booking_email_entered → booking_card_entered → booking_confirmed → [completion event]
