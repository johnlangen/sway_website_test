import { NextResponse } from "next/server";
import { getMindbodyStaffToken } from "@/lib/mindbodyStaffToken";

export const runtime = "nodejs";

// Only the email preferences are actually editable via the Public API — the
// Send*Texts fields are documented as "cannot be updated by developers"
// (ignored if sent), so they are accepted for compatibility but never checked
// during verification.
const VERIFIABLE_FIELDS = [
  "SendAccountEmails",
  "SendScheduleEmails",
  "SendPromotionalEmails",
] as const;

export async function POST(req: Request) {
  const {
    clientId,
    sendAccountEmails,
    sendAccountTexts,
    sendScheduleEmails,
    sendScheduleTexts,
    sendPromotionalEmails,
    sendPromotionalTexts,
    siteId: siteIdRaw,
  } = await req.json();

  // Optional siteId override for the Sway Wellness Club locations. Defaults to Larimer.
  const siteId = (typeof siteIdRaw === "string" && siteIdRaw) || process.env.MINDBODY_SITE_ID!;

  if (!clientId) {
    return NextResponse.json(
      { error: "Missing clientId" },
      { status: 400 }
    );
  }

  // Build only the fields that were explicitly provided
  const updates: Record<string, boolean> = {};
  if (typeof sendAccountEmails === "boolean")
    updates.SendAccountEmails = sendAccountEmails;
  if (typeof sendAccountTexts === "boolean")
    updates.SendAccountTexts = sendAccountTexts;
  if (typeof sendScheduleEmails === "boolean")
    updates.SendScheduleEmails = sendScheduleEmails;
  if (typeof sendScheduleTexts === "boolean")
    updates.SendScheduleTexts = sendScheduleTexts;
  if (typeof sendPromotionalEmails === "boolean")
    updates.SendPromotionalEmails = sendPromotionalEmails;
  if (typeof sendPromotionalTexts === "boolean")
    updates.SendPromotionalTexts = sendPromotionalTexts;

  if (Object.keys(updates).length === 0) {
    return NextResponse.json(
      { error: "No notification preferences provided" },
      { status: 400 }
    );
  }

  try {
    const token = await getMindbodyStaffToken(siteId);

    const mbHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Api-Key": process.env.MINDBODY_API_KEY!,
      SiteId: siteId,
      Authorization: `Bearer ${token}`,
    };

    const attemptUpdate = async () => {
      const res = await fetch(
        "https://api.mindbodyonline.com/public/v6/client/updateclient",
        {
          method: "POST",
          headers: mbHeaders,
          body: JSON.stringify({
            Client: {
              Id: clientId,
              ...updates,
            },
            CrossRegionalUpdate: false,
            Test: false,
          }),
        }
      );
      const data = await res.json().catch(() => ({}));
      return { ok: res.ok, status: res.status, data };
    };

    // Read-after-write verification. Mindbody's updateclient intermittently
    // returns 500 "Something went wrong / Code: Unknown" on the Sway sites even
    // when the write landed (verified July 2026) — so a failure response alone
    // proves nothing. Returns true when every requested (verifiable) preference
    // matches what is actually stored on the client record.
    const prefsActuallyApplied = async (): Promise<boolean> => {
      try {
        const url = new URL(
          "https://api.mindbodyonline.com/public/v6/client/clients"
        );
        url.searchParams.set("request.clientIds", String(clientId));
        url.searchParams.set("request.limit", "1");
        const res = await fetch(url.toString(), { headers: mbHeaders });
        if (!res.ok) return false;
        const data = await res.json();
        const client = data?.Clients?.[0];
        if (!client) return false;
        return VERIFIABLE_FIELDS.every(
          (field) => !(field in updates) || client[field] === updates[field]
        );
      } catch {
        return false;
      }
    };

    let attempt = await attemptUpdate();

    if (!attempt.ok) {
      if (await prefsActuallyApplied()) {
        console.log("[update-client-notifications] MB errored but prefs verified applied:", {
          clientId,
          siteId,
          httpStatus: attempt.status,
        });
        return NextResponse.json({ success: true, clientId, recovered: true });
      }

      // Transient Mindbody flake: one retry, then re-verify.
      await new Promise((r) => setTimeout(r, 750));
      attempt = await attemptUpdate();

      if (!attempt.ok && !(await prefsActuallyApplied())) {
        // Preference writes are best-effort for every caller (fire-and-forget
        // after a successful booking), so a genuine failure is reported as a
        // 200 with applied:false — it must not page anyone as a 5xx, and the
        // front desk can always set preferences in the Mindbody UI.
        console.warn("[update-client-notifications] prefs not applied after retry:", {
          clientId,
          siteId,
          httpStatus: attempt.status,
          mbError: attempt.data?.Error ?? attempt.data?.Errors ?? null,
        });
        return NextResponse.json({
          success: false,
          applied: false,
          clientId,
          details: attempt.data?.Error ?? attempt.data?.Errors ?? null,
        });
      }
    }

    return NextResponse.json({ success: true, clientId });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
