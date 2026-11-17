import { NextResponse, after } from "next/server";
import { getMindbodyStaffToken } from "@/lib/mindbodyStaffToken";
import { recordCompletion, recordServerError } from "@/lib/ops/record";

export const runtime = "nodejs";

/**
 * Join Mindbody's APPOINTMENT waitlist for a massage or facial at Sway Larimer (John 11/16).
 *
 * Same call as a booking (appointment/addappointment) with IsWaitlist: true. It never books
 * anything and never charges. Verified on Larimer 10/1 and 11/16 with the test client:
 * - Mindbody stores the entry for the WHOLE day (06:30-23:15) for that session type, so the
 *   desk screen shows the date with "Anytime". The time we send is ignored.
 * - StaffId is optional with IsWaitlist (docs: "required ... unless IsWaitlist is true"), so
 *   no staff = "Any instructor". A specific staff is sent only when the guest picked one.
 * - Test: true is IGNORED for waitlist requests; every call writes a real entry.
 * - Larimer has First to Claim on (Settings > Appointment Options): when an appointment of
 *   that type is cancelled, Mindbody texts everyone waiting and the first to reply "11" is
 *   booked automatically. The desk sees entries at Appointments > waitlist icon.
 *
 * Larimer only. The clubs run separate flows and have not been checked.
 */

/* Main services that can be waitlisted: the Larimer massage + facial IDs the booking flow
   offers (kept in step with ALLOWED_SERVICE_IDS in ../book/route.ts). Maternity is left out
   on purpose: the booking flow gates it behind a trimester check that a waitlist skips. */
const WAITLIST_SERVICE_IDS = new Set([
  // Essential / Premier / Ultimate facials
  75, 77, 78, 79, 80, 81, 82, 84, 85, 103, 104,
  // Larimer massages (the flow's MASSAGE_TREATMENTS, maternity excluded)
  2816, // Essential Signature
  98, 2821, 2822, 2823, 89, // Premier Signature / Deep Tissue / Salt Stone / Sports / Lymphatic
  2830, 2831, 2832, 2833, 90, // Ultimate Signature / Deep Tissue / Salt Stone / Sports / Lymphatic
]);

const FACIAL_IDS = new Set([75, 77, 78, 79, 80, 81, 82, 84, 85, 103, 104]);

const DAY = /^\d{4}-\d{2}-\d{2}$/;
const MAX_DAYS_AHEAD = 60;

function denverToday(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "America/Denver" });
}

export async function POST(req: Request) {
  try {
    const { clientId, sessionTypeId, date, staffId, notes, timePref } = await req.json();
    // Preferred time of day: stored for the desk (in notes) + demand data. Mindbody holds the whole day regardless.
    const pref = ["morning", "afternoon", "evening"].includes(timePref) ? (timePref as string) : "any";

    const cid = clientId ? String(clientId) : "";
    const stid = Number(sessionTypeId);
    if (!cid || !WAITLIST_SERVICE_IDS.has(stid)) {
      return NextResponse.json({ error: "This treatment can't be waitlisted online." }, { status: 400 });
    }
    if (typeof date !== "string" || !DAY.test(date)) {
      return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }
    const today = denverToday();
    const last = new Date(`${today}T12:00:00Z`);
    last.setUTCDate(last.getUTCDate() + MAX_DAYS_AHEAD);
    if (date < today || date > last.toISOString().slice(0, 10)) {
      return NextResponse.json({ error: "Please pick a date in the next two months." }, { status: 400 });
    }
    const sid = staffId === null || staffId === undefined || staffId === "" ? null : Number(staffId);
    if (sid !== null && (!Number.isFinite(sid) || sid <= 0)) {
      return NextResponse.json({ error: "Invalid staffId" }, { status: 400 });
    }

    const siteId = process.env.MINDBODY_SITE_ID!;
    const token = await getMindbodyStaffToken(siteId);

    const res = await fetch("https://api.mindbodyonline.com/public/v6/appointment/addappointment", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Api-Key": process.env.MINDBODY_API_KEY!,
        SiteId: siteId,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ClientId: cid,
        SessionTypeId: stid,
        LocationId: 1,
        // Mindbody keeps the whole day regardless; noon keeps it clear of any date-boundary math.
        StartDateTime: `${date}T12:00:00`,
        IsWaitlist: true,
        ApplyPayment: false,
        SendEmail: false,
        ...(sid !== null ? { StaffId: sid, StaffRequested: true } : {}),
        ...(typeof notes === "string" && notes.trim() ? { Notes: notes.trim().slice(0, 500) } : {}),
      }),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data?.Appointment?.WaitlistEntryId) {
      console.error("[SERVICE WAITLIST] Mindbody rejected", res.status, JSON.stringify(data).slice(0, 500));
      const why = String(data?.Error?.Message || data?.Message || `HTTP ${res.status}`);
      after(() => recordServerError("service", "denver-larimer", "waitlist", why));
      return NextResponse.json(
        { error: "We couldn't add you to the waitlist just now." },
        { status: 502 }
      );
    }

    // First-party ledger (lib/ops): counted as a lead, not a booking (nothing is booked or paid).
    // The ref is Mindbody's WaitlistEntryId; who joined is on the desk's waitlist screen.
    const daysOut = Math.round((Date.parse(`${date}T12:00:00Z`) - Date.parse(`${today}T12:00:00Z`)) / 86400000);
    after(() =>
      recordCompletion(req, {
        flow: "lead",
        location: "denver-larimer",
        item: `waitlist-${stid}`,
        label: "Appointment waitlist",
        ref: data.Appointment.WaitlistEntryId,
        // Kept for demand reporting (node scripts/ops.mjs --waitlist): which day, weekday and
        // treatment people wanted. Mindbody drops the entry once it is claimed or removed.
        extra: {
          wanted_date: date,
          weekday: new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" }),
          category: FACIAL_IDS.has(stid) ? "facial" : "massage",
          specialist: sid !== null,
          ...(sid !== null ? { staff_id: sid } : {}),
          days_out: daysOut,
          time_pref: pref,
        },
      })
    );
    console.log("[SERVICE WAITLIST] Joined", { stid, date, staff: sid ?? "any", entry: data.Appointment.WaitlistEntryId });
    return NextResponse.json({ ok: true, waitlistEntryId: data.Appointment.WaitlistEntryId });
  } catch (e: any) {
    console.error("[SERVICE WAITLIST] Error", e?.message);
    after(() => recordServerError("service", "denver-larimer", "waitlist", String(e?.message || "error")));
    return NextResponse.json({ error: "We couldn't add you to the waitlist just now." }, { status: 500 });
  }
}
