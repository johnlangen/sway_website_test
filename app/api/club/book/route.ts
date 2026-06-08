import { NextResponse } from "next/server";
import { getMindbodyStaffToken } from "@/lib/mindbodyStaffToken";
import { getClubBySiteId, type ClubLocation } from "@/lib/clubLocations";

export const runtime = "nodejs";

/**
 * POST /api/club/book
 *
 * Books a Remedy Lounge session (the 75-min window) for a Sway Wellness Club
 * location (RiNo / Central Park), plus 0–2 optional sauna sub-sessions that run
 * DURING that 75. The saunas (Traditional / Infrared) are the only
 * capacity-constrained modalities, so each is its own Mindbody appointment
 * booked against that sauna's resource "staff" id.
 *
 * Unlike Larimer's /api/mindbody/book-appointment, every Mindbody write here is
 * scoped to the club's own SiteId + per-site staff token. Until John provisions
 * those site-specific logins, the Mindbody addappointment call will 401 — that's
 * expected and surfaced to the caller, not a code bug.
 *
 * Body:
 *   {
 *     siteId: string,                 // club Mindbody SiteId
 *     clientId: string,
 *     startDateTime: string,          // ISO start of the 75-min Lounge window
 *     saunas?: { sessionTypeId: number; startDateTime: string }[],  // 0–2
 *     notes?: string,
 *   }
 */

interface SaunaSelection {
  sessionTypeId: number;
  startDateTime: string;
}

async function addAppointment(opts: {
  token: string;
  siteId: string;
  clientId: string;
  sessionTypeId: number;
  staffId: number;
  locationId: number;
  startDateTime: string;
  sendEmail: boolean;
  notes?: string;
}): Promise<{ ok: boolean; status: number; data: any }> {
  const res = await fetch(
    "https://api.mindbodyonline.com/public/v6/appointment/addappointment",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Api-Key": process.env.MINDBODY_API_KEY!,
        SiteId: opts.siteId,
        Authorization: `Bearer ${opts.token}`,
      },
      body: JSON.stringify({
        ClientId: opts.clientId,
        SessionTypeId: opts.sessionTypeId,
        StaffId: opts.staffId,
        LocationId: opts.locationId,
        StartDateTime: opts.startDateTime,
        ApplyPayment: false,
        SendEmail: opts.sendEmail,
        ...(opts.notes && opts.notes.trim() ? { Notes: opts.notes.trim() } : {}),
      }),
    }
  );

  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

function resolveSauna(club: ClubLocation, sessionTypeId: number) {
  return club.saunas.find((s) => s.sessionTypeId === sessionTypeId) ?? null;
}

export async function POST(req: Request) {
  const body = await req.json();
  const {
    siteId,
    clientId,
    startDateTime,
    notes,
  } = body as {
    siteId?: string;
    clientId?: string;
    startDateTime?: string;
    notes?: string;
  };

  const saunasRaw: SaunaSelection[] = Array.isArray(body?.saunas)
    ? body.saunas
    : [];

  if (!siteId || !clientId || !startDateTime) {
    return NextResponse.json(
      { error: "Missing siteId, clientId, or startDateTime" },
      { status: 400 }
    );
  }

  const club = getClubBySiteId(siteId);
  if (!club) {
    return NextResponse.json({ error: "Unknown club site" }, { status: 400 });
  }

  // Validate sauna selections against this club's config before any writes.
  // The saunas run as 25-min sub-sessions DURING the 75-min Lounge window. A
  // guest can do multiple (e.g. Traditional in the first 25, Infrared in the
  // last 25), so we dedup by start time (can't be in two saunas at once) rather
  // than by modality. Cap at 3 (three 25-min sub-slots in a 75).
  if (saunasRaw.length > 3) {
    return NextResponse.json(
      { error: "Too many sauna selections" },
      { status: 400 }
    );
  }

  const saunaBookings: {
    sauna: NonNullable<ReturnType<typeof resolveSauna>>;
    startDateTime: string;
  }[] = [];
  const seenStart = new Set<string>();
  for (const sel of saunasRaw) {
    const stId = Number(sel?.sessionTypeId);
    const sauna = resolveSauna(club, stId);
    if (!sauna) {
      return NextResponse.json(
        { error: `Invalid sauna sessionTypeId: ${sel?.sessionTypeId}` },
        { status: 400 }
      );
    }
    if (!sel?.startDateTime || typeof sel.startDateTime !== "string") {
      return NextResponse.json(
        { error: "Missing startDateTime for a sauna selection" },
        { status: 400 }
      );
    }
    if (seenStart.has(sel.startDateTime)) {
      return NextResponse.json(
        { error: "Two saunas selected for the same time window" },
        { status: 400 }
      );
    }
    seenStart.add(sel.startDateTime);
    saunaBookings.push({ sauna, startDateTime: sel.startDateTime });
  }

  try {
    const token = await getMindbodyStaffToken(siteId);

    // 1) Book the Lounge (the 75-min window). If this fails, abort — there's
    //    nothing to roll back yet.
    const lounge = await addAppointment({
      token,
      siteId,
      clientId,
      sessionTypeId: club.remedyLounge.sessionTypeId,
      staffId: club.remedyLounge.resourceStaffId,
      locationId: club.locationId,
      startDateTime,
      sendEmail: true,
      notes,
    });

    if (!lounge.ok) {
      return NextResponse.json(
        { error: "Lounge booking failed", details: lounge.data },
        { status: lounge.status }
      );
    }

    const loungeAppointment = lounge.data?.Appointment ?? lounge.data;

    // 2) Book each sauna sub-session inside the window. These overlap the Lounge
    //    intentionally. Collect per-sauna failures rather than aborting the whole
    //    booking — the guest still has their Lounge slot. SendEmail:false here so
    //    the guest gets one confirmation (the Lounge), not three.
    const saunaResults: {
      key: string;
      label: string;
      success: boolean;
      appointment?: any;
      error?: string;
    }[] = [];

    for (const { sauna, startDateTime: saunaStart } of saunaBookings) {
      const r = await addAppointment({
        token,
        siteId,
        clientId,
        sessionTypeId: sauna.sessionTypeId,
        staffId: sauna.resourceStaffId,
        locationId: club.locationId,
        startDateTime: saunaStart,
        sendEmail: false,
      });
      saunaResults.push({
        key: sauna.key,
        label: sauna.label,
        success: r.ok,
        ...(r.ok
          ? { appointment: r.data?.Appointment ?? r.data }
          : { error: r.data?.Error?.Message || `Mindbody error ${r.status}` }),
      });
    }

    const failedSaunas = saunaResults.filter((s) => !s.success);

    return NextResponse.json({
      success: true,
      loungeAppointment,
      saunas: saunaResults,
      // Surface partial failures so the frontend can tell the guest a sauna add-on
      // didn't take, while keeping the Lounge confirmed.
      ...(failedSaunas.length > 0
        ? { partial: true, failedSaunas: failedSaunas.map((s) => s.label) }
        : {}),
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}
