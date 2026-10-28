# Native gift card checkout

Guests buy Mindbody gift cards on the site at `/locations/<slug>/gift-cards/checkout/` for Sway Larimer,
RiNo and Central Park. Ported 10/28/2026 from the Spavia site's gift checkout (`~/spavia-website`,
`src/lib/booking/gift-*.ts`), which has run live at 60+ spas since 10/15, including its fixes for
everything Mindbody did wrong in production.

## The flow

1. **Gift**: amount ($100 / $150 / $200 / $300 / custom $1 to $2,000; every button sells Mindbody card
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

## Artwork

`python3 scripts/gift-artwork/build.py` draws every design from Sway photos and Vance type into
`public/gift-cards/art/` (image 1200, thumbnail 480, print 1800) and `artwork-library.json`. File names
carry a content hash: never delete a file a design has used (issued gifts point at it); the script moves
replaced files to `archivedFiles`.

## Tracking

Flow `gift` in the first-party analytics (`lib/ops`): steps from the page, the sale written once
(`count.ts`) after Mindbody confirms. `/ops/` shows the Gift card checkout funnel and gift sales per spa.
GA4 gets `gift_card_purchase_complete` (no GTM tag yet).
