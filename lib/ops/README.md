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

## Membership checkout page (every membership, 11/23/2026)

One checkout page sells every membership (`app/components/MembershipCheckout.tsx`, what each
location sells: `lib/membershipOffers.ts`): Larimer's six plans, the clubs' Remedy Lounge and
founding memberships, and Union Market's founding membership. It replaced the pop-up
(`MembershipJoinFlow`, still in the repo: set a location to `"popup"` in `CHECKOUT_MODE` to go back).
Same server routes as before; `scripts/test-membership-offers.mts` pins each plan to its contract.

What it records (nothing for `?memtest=1`):

| Question | Where | Read it |
| --- | --- | --- |
| How far do people get, screen by screen? | flow `membership`: opened, plan, email, code, member, details, payment, review, done, joined (variant = plan) | `node scripts/ops.mjs --funnel membership [--loc denver-rino]` |
| Which button sends people in? New or returning? Saved card or new? Which card field trips them? Declines? How long on each screen? Which screen do they leave from? | flow `checkout`: `from-*`, `guest-new` / `guest-returning`, `code-sent` / `-resent` / `-wrong` / `-ok`, `card-on-file` / `card-invalid` (variant = field) / `card-rejected` / `card-saved` / `card-change`, `already-member`, `plan-switch`, `terms-open`, `agree-checked`, `submit`, `declined`, `off-sale`, `uncertain`, `session-expired`, `time-<screen>` and `left-<screen>` (variant = time bucket) | `node scripts/ops.mjs --funnel checkout` |
| What did guests see go wrong? | every message shown, with its screen | "messages guests saw" in the report |
| WHO stopped, and where? | `lib/foundingCheckouts.ts` (email, name, phone, furthest screen; the email screen tells the guest). Contact details, so NOT in the ops store | `node scripts/ops.mjs --stopped [--loc …]` |
| Did the sale really happen? | the purchase route's ledger row after Mindbody confirms | `completed` in the funnel, ledger on /ops/ |

The pop-up's step names `already` and `confirm` are the page's `member` and `review`; its `details`
was name and card on one screen, now `details` then `payment`. Compare funnels across 11/23/2026
with that in mind. GA4: the same `membership_*` dataLayer events as before (they have GTM tags),
now with `membership_checkout: "page"`; the `checkout` detail events are first-party only.

## Launch-site founding checkout (Union Market, 11/23/2026)

A Sway spa that isn't open yet but has its own Mindbody site sells founding memberships on the
website (`lib/launchSites.ts`). Page: `/locations/union-market/founding-membership/`, checkout:
`…/founding-membership/join/?tier=essential|premier|ultimate` (`app/components/FoundingJoinFlow.tsx`).

**Switches.** `founding.salesOpen` in `lib/launchSites.ts` puts the Join buttons on the founding
page. They also need the live check (`/api/membership/founding/?location=…`): the website's staff
login must work on that Mindbody site and every contract must still match the page. The join page
works with `?memtest=1` (Mindbody's no-charge test sale) while `salesOpen` is false: run one before
flipping it. Union Market: on sale since 11/23/2026 (test passed that morning).
`?memtest=1&preview=welcome` opens on the welcome screen (the celebration) without a test run.

**Staff login.** None of Sway Denver's logins work on a franchise-owned site. The owner adds a staff
user for the website; its username and password go in Vercel as `MINDBODY_STAFF_USER_<siteId>` /
`MINDBODY_STAFF_PASS_<siteId>` (Union Market: `…_5757939`). John's shared Manager login
(`MINDBODY_STAFF_USER2`) is tried next, so adding that login to the site also works.

**Money safety** (`lib/launchFounding.ts`, purchase route): before every sale the contract is
re-read and must still be the founding plan at the page's price, then Mindbody's no-charge test
sale must come to that same total. Anything else: no charge, the guest is asked to email, and an
`/ops/` alert (`founding-contract:<slug>` / `founding-total:<slug>`) is raised. Founding contracts
are "charged on a specific date": the first month is charged at signup, the membership starts on
that date, the next charge is a month later.

**Tracking.** Flow `membership`, location `union-market`, variant = tier. Steps: `from-founding`
(checkout opened), `plan`, `email`, `code`, `member` (already a member), `details`, `payment`,
`review`, `done`, and `founding-joined` on a real sale. Read it:
`node scripts/ops.mjs --loc union-market --funnel membership`. Completed sales are ledger rows with
`extra.founding = true`, the tier, the start date and a hash of the buyer's email.

**Who stopped where** (`lib/foundingCheckouts.ts`): one record per spa and email, with the furthest
screen reached and the name and phone once known. This is the one place contact details are kept,
so it is NOT in the ops store: it lives in the site's Redis (`sway:founding-checkouts:v1`) and is
readable only with the ops key. The email screen tells the guest the spa may reach out. Never
written for `?memtest=1` or off the production site.

**Feeds for Atlas's Launch Board** (ops key; same shapes as the Spavia site's):
`/api/ops/funnel/?from=&to=` (unique guests per step per day), `/api/ops/founding-checkouts/`
(the follow-up list) and `/api/ops/sales/?from=&to=` (founding sales). Launch sites only.

Checks: `npx tsx scripts/test-launch-founding.mts` and
`npx tsx --experimental-test-module-mocks scripts/test-membership-purchase-route.mts` (Node 22+).
