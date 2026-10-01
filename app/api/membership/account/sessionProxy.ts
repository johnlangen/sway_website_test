import { NextResponse } from "next/server";
import {
  NO_STORE,
  VerifyUnavailableError,
  addClientToSession,
  getSession,
  type MembershipSession,
} from "@/lib/membershipVerify";

/**
 * Membership-checkout wrappers around the shared Mindbody client routes
 * (/api/mindbody/add-client-with-card, update-client-card, update-client).
 *
 * Those routes also serve the booking flows and accept any clientId; the
 * booking flows are left exactly as they are. The membership checkout calls
 * these wrappers instead, which require the verified session cookie, pin the
 * site (and email, for account creation) to the session, and only touch
 * client ids the session owns. The underlying Mindbody logic is reused
 * unchanged by invoking the original handler.
 */

type Handler = (req: Request) => Promise<Response>;

export const VERIFY_REQUIRED = {
  error: "For your security, please confirm your email again to continue.",
  code: "verify_required",
};

export async function proxyWithSession(
  req: Request,
  handler: Handler,
  opts: {
    /** Build the body passed to the handler; return null to reject (403). */
    rewrite: (body: Record<string, unknown>, session: MembershipSession) => Record<string, unknown> | null;
    /** Add a newly created client id (from the handler response) to the session. */
    captureClientId?: boolean;
  }
): Promise<Response> {
  let found;
  try {
    found = await getSession(req);
  } catch (err) {
    if (!(err instanceof VerifyUnavailableError)) console.error("[membership/account] session read failed");
    return NextResponse.json(
      { error: "Something went wrong. Please try again, or call (303) 476-6150.", code: "unavailable" },
      { status: 503, headers: NO_STORE }
    );
  }
  if (!found) return NextResponse.json(VERIFY_REQUIRED, { status: 401, headers: NO_STORE });

  const raw = await req.json().catch(() => null);
  if (!raw || typeof raw !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400, headers: NO_STORE });
  }
  const body = opts.rewrite(raw as Record<string, unknown>, found.session);
  if (!body) {
    return NextResponse.json(VERIFY_REQUIRED, { status: 403, headers: NO_STORE });
  }

  const headers = new Headers(req.headers);
  headers.delete("content-length");
  headers.delete("cookie");
  const res = await handler(
    new Request(req.url, { method: "POST", headers, body: JSON.stringify(body) })
  );

  const data = await res.json().catch(() => ({}));
  if (opts.captureClientId && data?.clientId != null) {
    // Includes the "client created but card failed" case, so the retry on
    // the card route is allowed for that same new account.
    await addClientToSession(found.token, found.session, String(data.clientId)).catch(() => {
      console.error("[membership/account] could not record new client on session");
    });
  }
  return NextResponse.json(data, { status: res.status, headers: NO_STORE });
}

/** Common rewrite for routes that act on an existing client id. */
export function pinClient(body: Record<string, unknown>, session: MembershipSession) {
  const clientId = body.clientId == null ? "" : String(body.clientId);
  if (!clientId || !session.clientIds.includes(clientId)) return null;
  if (body.siteId != null && body.siteId !== "" && body.siteId !== session.siteId) return null;
  return { ...body, clientId, siteId: session.siteId };
}
