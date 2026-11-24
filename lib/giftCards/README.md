# Native gift card checkout

Guests buy Mindbody gift cards on the site at `/locations/<slug>/gift-cards/checkout/` for Sway Larimer,
RiNo and Central Park. Ported 10/28/2026 from the Spavia site's gift checkout (`~/spavia-website`,
`src/lib/booking/gift-*.ts`), which has run live at 60+ spas since 10/15, including its fixes for
everything Mindbody did wrong in production.

## The flow

1. **Gift**: amount ($100 / $150 / $200 / $250 / $300 / custom $1 to $2,000; every button sells Mindbody card
   100030 "Gift Card (Custom Amount)") and a design (Sway's own artwork, below).
2. **Personalize**: recipient, email (or "send it to me"), from, title, message, send now or 9 a.m.
   Mountain on a date up to 29 days out.
3. **Email code**: every buyer proves their email (6 digits, hashed, single use, 10 min).
4. **Account**: their Mindbody client at that location (choose if several), or a new one (name, mobile).
5. **Payment**: saved card (last four) or a new card. A new card goes straight to Mindbody's sale
   (`saveInfo: false`): never stored, logged or kept in page state.
6. **Review → purchase**: the quote first runs Mindbody's no-charge `Test: true` sale, which must come to the
   exact amount; then the real `/sale/purchasegiftcard` (LocationId 1, never the Online Store 98).
7. **Done**: the gift (view, download PDF, print) at its private link `#gift=<token>`, the recipient's
   email (now, or scheduled through Resend) and the buyer's receipt.

## Safety rules (don't remove)

- One purchase per order (`purchase:<order>` set NX), across tabs and repeated taps.
- A clear Mindbody refusal (4xx) = nothing charged: the order is freed and the guest told why.
  Anything else (timeout, 5xx, incomplete answer) = maybe charged: the order stays locked as
  "unconfirmed" and is settled by **looking it up**, never by charging again.
- Every charge goes on the settle list (`uncertain`) before it's sent. `/api/gift-cards/reconcile/`
  (Vercel cron, every 5 min) and the guest's own status checks find the sale (exactly one gift card
  sale for that guest and amount within 3 minutes, holding the card's value), or release the order when
  the guest has no sale at all after 3 minutes, or alert after 2 hours.
- Emails: send lock + Resend idempotency key; a gift email that isn't out is retried by the cron;
  bounced / stuck ones alert.
- Fails closed: no Redis on Vercel = no purchases.

## Switches (Vercel env)

- `GIFT_CHECKOUT=off`: checkout pages send guests to the location's Mindbody gift card store; no new
  purchases (open gifts and status checks still work).
- `GIFT_CHECKOUT_BUTTONS=mindbody` (+ redeploy): the gift card pages' Buy buttons go back to Mindbody's
  store (they open this checkout by default since 10/28).
- `OPS_ALERT_EMAIL`: where alerts go (default contact@swaywellnessspa.com).
- `CRON_SECRET`: optional; without it the cron is recognized by Vercel's user agent.
- Uses the existing `RESEND_API_KEY` (sender contact@swaywellnessspa.com, reply-to the location's address).

## Holiday bonus (Nov 26 to Dec 25, 2026)

The same offer the Spavia spas run, at Larimer, RiNo and Central Park (John 11/24/2026): a single gift
card of $200 or more comes with one free 30-minute express facial or massage, usable Jan 1 to Apr 30,
2027, only at the location that sold the card. Offer, dates, locations and terms: `lib/holidayBonus.ts`.
It turns on and off BY DATE (Mountain time); no deploy on Nov 26 or Dec 26.

- Checkout: the offer (and "Make it $200") on the first screen, "Who gets the holiday bonus?" on the
  second (with the gift, or keep it), the bonus and its terms on the review screen before payment.
- `quoteGift` decides it (`giftBonusFor`, `lib/giftCards/bonus.ts`) and the quote carries it. The
  charge path is unchanged.
- After Mindbody confirms the sale, `fulfillGift` issues one code per gift card (`issueBonusCode`:
  repeat runs return the same code), adds a bonus block to the gift email and receipt, and sends the
  bonus email (`bonusmail:<order>`, same send-once + retry + alert rules as the other two).
- Codes are issued in the shared bonus-code database Atlas reads (below); a copy is kept in the gift
  Redis (`bonus:code:<CODE>`, `bonus:card:<siteId>:<barcode>`, `bonus:spa:<siteId>:<locationId>`,
  `bonus:codes`).
- Pages: `/holiday-gift-cards/` (offer, FAQ, terms, location picker) and a dated notice on the gift
  card pages (`HolidayBonusNotice`). `?bonuspreview=1` shows the offer before Nov 26 (look only).
- Tracking, flow `gift`: `bonus-notice` (saw it on a gift card page), `bonus-shown` (saw it in the
  checkout: offer / unlocked), `bonus-nudge` (tapped Make it $200), `bonus-continue` (with / without),
  `bonus-who` (recipient / self). The ledger row's `extra.bonus` marks a sale that carried one.
- Test: `npx tsx scripts/test-holiday-bonus.mts`.

**Where the desk redeems: Atlas → Holiday Bonus** (the screen the Spavia spas use; John 11/24/2026:
"build the desk redeem tool (make sure its set up in atlas)"). Nothing was built in Atlas: its redeem
screen works for any location it knows, and it already knew Larimer (5739770), RiNo (5754020) and
Central Park (5754021), each with front-desk logins. What was missing was the codes, so the site now
issues every code in the shared bonus-code database (a separate Upstash Redis, contract in the Spavia
site's `docs/holiday-bonus-codes.md`; Atlas side `api/routers/holiday_bonus.py`), with the contract's
own issue script, under the location's Mindbody site id and location 1.
- Vercel (production): `BONUS_KV_REST_API_URL`, `BONUS_KV_REST_API_TOKEN` (the same database Atlas
  and the Spavia site use). Without them the live site issues no code: the gift still goes out, the
  bonus is retried every 5 minutes by the reconcile job and alerts.
- At the desk: type the code (dash optional). Before Jan 1 it reads "on hold"; then one click marks
  it used with the staff name. Another location's code reads "not found at this spa".
- Checked 11/24: a self-expiring demo code issued by this code for each location was read back the
  way Atlas reads it, then removed.

**Still the desk's side, by Jan 1, 2027:** in each Mindbody, a $0 code for the 30-minute express
facial and massage, and those two treatments bookable. Desk-sold cards get the team's printed bonus
card, not a code.

## Artwork

`python3 scripts/gift-artwork/build.py` draws every design from Sway photos and Vance type into
`public/gift-cards/art/` (image 1200, thumbnail 480, print 1800) and `artwork-library.json`. File names
carry a content hash: never delete a file a design has used (issued gifts point at it); the script moves
replaced files to `archivedFiles`.

## Tracking

Flow `gift` in the first-party analytics (`lib/ops`): steps from the page, the sale written once
(`count.ts`) after Mindbody confirms. `/ops/` shows the Gift card checkout funnel and gift sales per spa.
GA4 gets `gift_card_purchase_complete` (no GTM tag yet).

Layout (11/24/2026, after the Spavia site's): each step's main button sits in a bottom bar
(`GiftStickyActions`, rendered inside the step's form), amounts are rectangles, the design grid shows
the first eight with "View all". Detail steps on flow `gift`: `amount` and `design` (what the guest
went on with from the first screen, once a checkout), `occasion`, `occasions-more`, `designs-all`.
Before the change (10/28 to 11/24): 56 saw the first screen, 39 went on (70%), 26 bought.
