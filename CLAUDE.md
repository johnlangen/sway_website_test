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

## Git & Deployment

- Primary working branch: `master`
- Production branch: `main` (Vercel watches this)
- To deploy: push `master` to `origin/main` via `git push origin master:main`
- Old worktree branches (e.g. `claude/amazing-shirley`) may exist — `master` is the source of truth

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

## Content Rules

- **Membership**: Do NOT say "cancel anytime" — this is not accurate
- **Aescape apparel**: Do NOT use the brand name "Aerwear" — say "compression apparel" (provided at check-in)
- **Anniversary event** (`/events/anniversary`): Sidelined (noindex, no links). Page kept for future reuse. API route at `app/api/events/anniversary/` still exists.
- **Holiday gift cards** (`/holiday-gift-cards`): Kept indexed for SEO. Has a seasonal notice banner — update dates each year (currently Dec 12–25). Bonus card promo is seasonal; gift cards are year-round.

## Locations

- **Denver Larimer** (`/locations/denver-larimer`): Fully built out — booking flows (service, aescape, remedy room), membership, offers, gift cards
- **Georgetown** (`/locations/georgetown`): Offers, gift cards, book, membership pages
- **Dallas** (`/locations/dallas`): Offers, gift cards, book, membership, founding membership

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

## Google Reviews Integration

- **API route**: `app/api/reviews/route.ts` — fetches live rating + totalReviews from Google Places API (24hr ISR cache)
- **Place ID**: `ChIJtRQkUu55bIcR91jycB7Jcns` (Sway Wellness Spa Larimer)
- **API key**: `GOOGLE_PLACES_API_KEY` env var (on Vercel + `.env.local`)
- **Reviews component**: `app/components/GoogleReviews.tsx`
  - 9 curated 5-star reviews, hardcoded in `CURATED_REVIEWS` array (3 pages of 3)
  - Arrow carousel with `AnimatePresence` animations + page dots
  - Live rating/count from API; fallback values (5.0 / 120) while loading
  - Exports `GoogleReviews` (full section) and `ReviewBadge` (inline badge)
- **Where used**: Homepage (snap section), Larimer location page, booking pages (ReviewBadge only)
- **To update reviews**: Edit the `CURATED_REVIEWS` array in GoogleReviews.tsx. Pick 9 recent 5-star reviews.
- **Google Maps URL**: `https://www.google.com/maps/search/?api=1&query=Sway+Wellness+Spa+Larimer&query_place_id=ChIJtRQkUu55bIcR91jycB7Jcns`

## SEO / Structured Data (JSON-LD)

### Schema per page
- **Homepage** (`app/page.tsx`): `HealthAndBeautyBusiness` + `FAQPage` (5 Q&As)
- **Layout** (`app/layout.tsx`): `Organization` (site-wide)
- **Larimer layout** (`app/locations/denver-larimer/layout.tsx`): `DaySpa` (with geo coords, hours, services, aggregateRating) + `FAQPage` (7 Q&As) + `BreadcrumbList`
- **FAQ/Larimer** (`app/faq/larimer/layout.tsx`): `FAQPage` (11 Q&As) + `BreadcrumbList`
- **Service pages** (massages, facials, remedy-tech): `BreadcrumbList` + `FAQPage` (5 Q&As each)
- **Aescape** (`app/aescape/page.tsx`): `BreadcrumbList` + `Service` + `FAQPage` (5 Q&As)
- **Sauna**: `BreadcrumbList` + `Service`
- **Cold plunge**: `BreadcrumbList`
- **Georgetown/Dallas layouts**: `BreadcrumbList`
- **FAQ layout** (`app/faq/layout.tsx`): `BreadcrumbList`

### Sitemap
- `app/sitemap.ts` — ~70 indexed pages. Excludes test pages, noindex pages, anniversary event.

### Key SEO notes
- Homepage H1 is `sr-only` (screen-reader-only) — intentional, valid for SEO
- Homepage has canonical tag via `alternates`
- `/faq/larimer` uses layout.tsx for metadata (NOT `next/head` — that doesn't work in App Router)
- Blog posts have "By Sway Wellness Team" author attribution

## Social / Connect Links

- Instagram: `https://www.instagram.com/swaywellnessclub/`
- TikTok: `https://www.tiktok.com/@swaywellnessclub`
- Facebook: `https://www.facebook.com/swaywellnessspa`
- Franchise: `/own` ("Own a Sway" in nav + footer)
