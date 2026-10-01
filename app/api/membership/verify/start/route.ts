import { NextResponse } from "next/server";
import {
  NO_STORE,
  RESEND_COOLDOWN_SECONDS,
  VerifyUnavailableError,
  createSession,
  findClientsByEmail,
  isValidEmail,
  issueCode,
  normalizeEmail,
  resolveSiteId,
  sendCodeEmail,
  sessionCookie,
  startAllowedForIp,
} from "@/lib/membershipVerify";

export const runtime = "nodejs";

/**
 * POST /api/membership/verify/start   { email, siteId? }
 *
 * Membership-checkout email step (see lib/membershipVerify.ts).
 *  - No account with that exact email at the site → { status: "new" } and a
 *    "new" session cookie (no client ids; the account gets created through
 *    /api/membership/account/create).
 *  - Account exists → emails a 6-digit code → { status: "code_sent" }.
 *    Nothing about the account (name, phone, card) is returned until the
 *    code is confirmed.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = normalizeEmail(body?.email);
  const siteId = resolveSiteId(body?.siteId);

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400, headers: NO_STORE });
  }
  if (!siteId) {
    return NextResponse.json({ error: "Unknown location." }, { status: 400, headers: NO_STORE });
  }

  try {
    if (!(await startAllowedForIp(req))) {
      return NextResponse.json(
        { error: "Too many attempts from this connection. Please try again later, or call (303) 476-6150.", code: "rate_limited" },
        { status: 429, headers: NO_STORE }
      );
    }

    const clients = await findClientsByEmail(siteId, email);

    if (clients.length === 0) {
      const token = await createSession({ email, siteId, mode: "new", clientIds: [] });
      const res = NextResponse.json({ status: "new" }, { headers: NO_STORE });
      res.headers.set("Set-Cookie", sessionCookie(token));
      return res;
    }

    const issued = await issueCode(siteId, email);
    if ("limited" in issued) {
      return NextResponse.json(
        issued.limited === "cooldown"
          ? { error: `Please wait ${RESEND_COOLDOWN_SECONDS} seconds before requesting another code.`, code: "cooldown", retryAfter: RESEND_COOLDOWN_SECONDS }
          : { error: "Too many codes requested for this email. Please try again in an hour, or call (303) 476-6150.", code: "rate_limited" },
        { status: 429, headers: NO_STORE }
      );
    }

    const sent = await sendCodeEmail(email, issued.code, siteId);
    if (!sent) {
      return NextResponse.json(
        { error: "We couldn't send your code just now. Please try again in a minute, or call (303) 476-6150 and we'll sign you up.", code: "email_failed" },
        { status: 503, headers: NO_STORE }
      );
    }

    return NextResponse.json({ status: "code_sent", resendAfter: RESEND_COOLDOWN_SECONDS }, { headers: NO_STORE });
  } catch (err: any) {
    if (err instanceof VerifyUnavailableError) console.error("[membership/verify/start] storage unavailable");
    else console.error("[membership/verify/start] error:", err?.message);
    return NextResponse.json(
      { error: "Something went wrong. Please try again, or call (303) 476-6150.", code: "unavailable" },
      { status: 503, headers: NO_STORE }
    );
  }
}
