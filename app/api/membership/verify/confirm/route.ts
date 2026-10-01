import { NextResponse } from "next/server";
import {
  NO_STORE,
  VerifyUnavailableError,
  consumeCode,
  createSession,
  findClientsByEmail,
  isValidEmail,
  normalizeEmail,
  resolveSiteId,
  sessionCookie,
} from "@/lib/membershipVerify";

export const runtime = "nodejs";

/**
 * POST /api/membership/verify/confirm   { email, siteId?, code }
 *
 * Checks the emailed code. On success sets the verified-session cookie and
 * returns the account details the checkout needs (first match = the one with
 * a card on file, if any).
 */
const MESSAGES: Record<string, string> = {
  invalid: "That code doesn't match. Please check the email and try again.",
  expired: "That code has expired. Tap \"Send a new code\" to get another one.",
  too_many: "Too many incorrect tries. Tap \"Send a new code\" to get a fresh one.",
  ip_limited: "Too many attempts from this connection. Please try again later, or call (303) 476-6150.",
};

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = normalizeEmail(body?.email);
  const siteId = resolveSiteId(body?.siteId);
  const code = typeof body?.code === "string" ? body.code.replace(/\D/g, "") : "";

  if (!isValidEmail(email) || !siteId || code.length !== 6) {
    return NextResponse.json(
      { error: "Please enter the 6-digit code from your email.", code: "invalid" },
      { status: 400, headers: NO_STORE }
    );
  }

  try {
    const result = await consumeCode(req, siteId, email, code);
    if (result !== "ok") {
      return NextResponse.json(
        { error: MESSAGES[result], code: result },
        { status: result === "ip_limited" ? 429 : 400, headers: NO_STORE }
      );
    }

    const clients = await findClientsByEmail(siteId, email);
    const token = await createSession({
      email,
      siteId,
      mode: clients.length ? "verified" : "new",
      clientIds: clients.map((c) => c.id),
    });
    const primary = clients[0] ?? null;
    const res = NextResponse.json(
      {
        status: primary ? "verified" : "new",
        client: primary
          ? {
              id: primary.id,
              firstName: primary.firstName,
              lastName: primary.lastName,
              mobilePhone: primary.mobilePhone,
              hasCardOnFile: primary.hasCardOnFile,
              lastFour: primary.lastFour,
            }
          : null,
      },
      { headers: NO_STORE }
    );
    res.headers.set("Set-Cookie", sessionCookie(token));
    return res;
  } catch (err: any) {
    if (err instanceof VerifyUnavailableError) console.error("[membership/verify/confirm] storage unavailable");
    else console.error("[membership/verify/confirm] error:", err?.message);
    return NextResponse.json(
      { error: "Something went wrong. Please try again, or call (303) 476-6150.", code: "unavailable" },
      { status: 503, headers: NO_STORE }
    );
  }
}
