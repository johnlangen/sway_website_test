# First-party analytics + dashboard (/ops/)

Built 10/22/2026, ported from the Spavia site's ops monitor (John: "you should be able to answer
any question I ask about any funnel or click on the website").

Sway's own server counts everything in Redis (`sway:ops:v1:*`), so ad blockers, GA4's unregistered
params and missing GTM tags don't hide anything. GA4/GTM stay exactly as they were; this runs
alongside.

## Open it

- **Dashboard:** open the login link once per browser (`node scripts/ops.mjs --link` prints it;
  it contains the key, keep it private). It sets an httpOnly cookie and goes to **/ops/**.
  Without the cookie /ops/ is a 404. `?days=1|7|28|90`, `?loc=denver-rino`, `?page=/aescape/`
  (clicks on one page), `?to=YYYY-MM-DD`. The Today view refreshes every 2 minutes.
- **Terminal:** `node scripts/ops.mjs [--days 28] [--loc …] [--funnel aescape] [--clicks /path/] [--json]`.
- **JSON:** `GET /api/ops/report/?key=…&days=…&loc=…&page=…` (same data as the dashboard).

The key is `OPS_KEY` in Vercel if set, otherwise `sha256("sway-ops|" + MINDBODY_API_KEY)`, first
32 hex characters (no setup needed; scripts/ops.mjs derives it from `.env.local`).

## What's recorded

| What | Where it comes from | Key |
|---|---|---|
| Page views + unique visitors (per page, per location, per day) | `OpsTracker` in the root layout | `views:<day>`, `pv:<day>:<page>` (HLL), `uv:<day>:<loc>` (HLL) |
| Landing source / medium / campaign + landing page | first page of each tab: utm_*, ad click ids, referrer | `landings:<day>` |
| Every click on a link or button: page, type (book, call, directions, gift_card_purchase, membership, offers, social, outbound, nav, anchor, button, toggle), where it goes, label | document click listener | `clicks:<day>` |
| Every booking/membership flow step, with the option picked (treatment / session type / plan) | `useFlowTrack(flow, step, variant, error, value)` in each flow | `steps:<day>`, `sv:<day>:<flow>:<loc>:<step>:<variant>` (HLL) |
| Error messages shown to guests | same hook | `shown:<day>` |
| Booking value at the done step (client) | same hook | `donevalue:<day>` |
| **Completed** bookings / memberships / leads (authoritative) | the API routes, after Mindbody confirms: `/api/service/book`, `/api/mindbody/book-appointment`, `/api/club/book`, `/api/membership/purchase`, `/api/founding-member` | `completed:<day>`, `ledger:<day>` (rows with item, ref, value, first/last-touch attribution) |

Flows: `service` (massage/facial, Larimer `/book` + club `ClubServiceFlow`), `aescape`, `remedy_room`,
`remedy_lounge`, `membership`, `maven`, `lead`. Variants: service `massage-2821`, aescape session
type (`2951` = Brady), membership plan key, maven session type.

Locations come from the URL exactly like GTM's `location` variable (`/locations/<slug>/`, else
Larimer). Days are America/Denver. Counts kept 400 days, unique-visitor sketches 120 days, the
ledger 3 years.

## Attribution cookies

On a tab's landing page the browser sets `sw_src_last` (every non-direct landing) and
`sw_src_first` (once), 90 days, first-party: `v1|source|medium|campaign|clickIds|day`. Search →
organic, social sites → social, ChatGPT/Perplexity/Claude/Gemini/Copilot → ai, sked.link →
instagram/social, gclid → google/cpc, fbclid → facebook/paid_social. The booking routes copy them
onto each ledger row, so "which source produced bookings" is answerable without GA4.

## Privacy rules (don't break these)

- No names, emails, phones, card details, Mindbody client ids, or what guests typed are stored.
- Visitor ids are random browser ids (localStorage `sw_vid`), stored only hashed inside HLLs.
- On booking-flow pages and inside dialogs, button labels are recorded only when they're plain
  times/dates or carry an explicit `data-track="…"` (buttons there can show a guest's name: the
  member bar, the which-account picker). Add `data-track` to any button you want labeled there;
  `data-ops-ignore` skips an element, `data-ops-private` hides labels in a container.
- Free text (labels, error messages) is scrubbed of long digit runs and emails.
- Only the production domain counts (previews/local never do); bots are dropped.

## Cost + safety

About 3 Redis commands per page view, 1 per click, 2 per step (EXPIRE is set once per key per warm
server instance): roughly 5-6k commands/day at Oct 2026 traffic. Everything is written after the
response (`after()`) and swallows its own errors, so it can't slow or fail a booking.

- **Kill switch:** `OPS_TRACKING=off` in Vercel stops every write.
- **Separate database (recommended):** set `OPS_KV_REST_API_URL` + `OPS_KV_REST_API_TOKEN` to a
  dedicated Upstash database so analytics volume can never compete with the site's own Redis use
  (membership purchase locks fail closed if Redis errors). Without them it uses the site's KV.

## Files

`lib/ops/record.ts` (writes), `lib/ops/report.ts` (reads, key), `lib/ops/client.ts` (browser:
beacons, attribution cookies, `useFlowTrack`), `lib/ops/labels.ts` (display names + step order),
`app/api/ops/v/` (beacon endpoint; deliberately not named "track"), `app/api/ops/login/`,
`app/api/ops/report/`, `app/ops/page.tsx` (dashboard), `app/components/OpsTracker.tsx`,
`scripts/ops.mjs`.
