import { NextResponse, after } from "next/server";
import { NO_STORE, getSession } from "@/lib/membershipVerify";
import { getLaunchSiteBySiteId } from "@/lib/launchSites";
import { noteFoundingCheckout, type FoundingStage } from "@/lib/foundingCheckouts";

export const runtime = "nodejs";

/**
 * POST /api/membership/founding/progress   { stage: "payment" | "review", firstName?, lastName?, phone?, test? }
 *
 * The founding checkout says which screen a guest has reached, so the owner's follow-up list on
 * the Launch Board (lib/foundingCheckouts.ts) knows where someone stopped. The email and the spa
 * come from the membership session cookie, never from the request, so nobody can add or move
 * somebody else's entry. Only the two screens the server can't see on its own: the email and
 * account stages are noted by the verify routes, "joined" by the purchase route.
 * Always answers 204: this is a note, it never affects the checkout.
 */
const STAGES: FoundingStage[] = ["payment", "review"];
const str = (v: unknown) => (typeof v === "string" ? v : undefined);

export async function POST(req: Request) {
  const done = new NextResponse(null, { status: 204, headers: NO_STORE });
  try {
    const body = await req.json().catch(() => null);
    const stage = body?.stage as FoundingStage;
    if (!body || !STAGES.includes(stage)) return done;
    const found = await getSession(req).catch(() => null);
    const site = found ? getLaunchSiteBySiteId(found.session.siteId) : null;
    if (!found || !site) return done;
    const email = found.session.email;
    after(() =>
      noteFoundingCheckout(site, body.test === true, email, stage, {
        firstName: str(body.firstName),
        lastName: str(body.lastName),
        phone: str(body.phone),
      })
    );
  } catch {
    /* a note only */
  }
  return done;
}
