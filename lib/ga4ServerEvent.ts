/**
 * Server-side GA4 event sender (Measurement Protocol).
 *
 * Why this exists: browser-fired GTM/GA4 tags are blocked by ad blockers and
 * privacy browsers, so client-side purchase events undercount real sales. In
 * August 2026 this made the question "how many memberships sold online?"
 * unanswerable — the true figure could only be bounded to a 13-45 range,
 * because the browser tag was the only record and Mindbody exposes no field
 * that distinguishes a website sale from a front-desk one.
 *
 * This fires from our server after the payment processor confirms, so it
 * cannot be blocked. It is additive: it never changes purchase behaviour and
 * never throws. A tracking failure must never fail a sale.
 */

const MP_ENDPOINT = "https://www.google-analytics.com/mp/collect";

// Same GA4 property the site's GTM container writes to ("Sway GA4 ID").
// Overridable by env, but defaulted so the only required secret is the API key.
const DEFAULT_MEASUREMENT_ID = "G-V4ZXNRGV84";

export type Ga4EventParams = Record<
  string,
  string | number | boolean | undefined | null
>;

export async function sendGa4ServerEvent(opts: {
  name: string;
  /** GA4 client id from the browser's _ga cookie, when it had one. */
  clientId?: string | null;
  /** GA4 session id, so the event joins the visit instead of starting one. */
  sessionId?: string | null;
  params?: Ga4EventParams;
}): Promise<void> {
  const measurementId =
    process.env.GA4_MEASUREMENT_ID || DEFAULT_MEASUREMENT_ID;
  const apiSecret = process.env.GA4_API_SECRET;

  if (!apiSecret) {
    console.warn("[ga4] skipped — GA4_API_SECRET not set", { event: opts.name });
    return;
  }

  // GA4 requires a client_id. When the browser never got one (GA blocked at
  // the source) we synthesise one so the sale is still counted — an
  // unattributed sale is far better than an invisible one. The source param
  // records which happened, which measures the blocked rate for free.
  const idSource = opts.clientId ? "cookie" : "synthesized";
  const clientId =
    opts.clientId ||
    `${Math.floor(Math.random() * 1e10)}.${Math.floor(Date.now() / 1000)}`;

  const params: Ga4EventParams = {
    ...opts.params,
    // NB: not "ga_client_id_source" — GA4 rejects the reserved "ga_" prefix
    // and silently drops the param (caught by /debug/mp/collect, Aug 2026).
    client_id_source: idSource,
    // Required for the event to count as engaged rather than being dropped.
    engagement_time_msec: 1,
  };
  if (opts.sessionId) params.session_id = opts.sessionId;
  for (const k of Object.keys(params)) {
    if (params[k] === undefined || params[k] === null) delete params[k];
  }

  const url =
    `${MP_ENDPOINT}?measurement_id=${encodeURIComponent(measurementId)}` +
    `&api_secret=${encodeURIComponent(apiSecret)}`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        events: [{ name: opts.name, params }],
      }),
      signal: controller.signal,
      cache: "no-store",
    });
    clearTimeout(timeout);

    // Measurement Protocol returns 204 and does NOT validate payloads. Use
    // the /debug/mp/collect endpoint by hand when an event looks wrong.
    if (!res.ok) {
      console.error("[ga4] non-OK response", {
        status: res.status,
        event: opts.name,
      });
    } else {
      console.log("[ga4] sent", { event: opts.name, idSource });
    }
  } catch (err: any) {
    // Swallow: tracking must never break a purchase.
    console.error("[ga4] send failed", {
      event: opts.name,
      message: err?.message,
    });
  }
}
