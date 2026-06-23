import { NextResponse } from "next/server";
import { getMindbodyStaffToken } from "@/lib/mindbodyStaffToken";
import { getClubBySiteId, type ClubLocation } from "@/lib/clubLocations";
import {
  fetchClubAppointments,
  parseWall,
  peakOverlap,
  type ApptInterval,
} from "@/lib/clubOccupancy";

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
  /** Preferred infrared cabin label (e.g. "Glow 2"). Soft preference — not a
   *  Mindbody-enforced resource; written to the appointment notes only. */
  cabin?: string;
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
  // guest can do two in any combination (e.g. Traditional then Infrared, or
  // back-to-back Infrared), so we dedup by start time (can't be in two saunas
  // at once) rather than by modality. Cap at 2 per the locked Lounge model: it
  // keeps one guest from holding 3 of the scarce heat rotations while still
  // allowing a 50-min double session.
  if (saunasRaw.length > 2) {
    return NextResponse.json(
      { error: "Too many sauna selections" },
      { status: 400 }
    );
  }

  const saunaBookings: {
    sauna: NonNullable<ReturnType<typeof resolveSauna>>;
    startDateTime: string;
    cabin?: string;
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
    // Sauna windows must sit fully inside the guest's member-facing Lounge time.
    const loungeStartMs = parseWall(startDateTime);
    const saunaStartMs = parseWall(sel.startDateTime);
    if (
      !Number.isFinite(saunaStartMs) ||
      saunaStartMs < loungeStartMs ||
      saunaStartMs + sauna.minutes * 60_000 >
        loungeStartMs + club.remedyLounge.serviceMinutes * 60_000
    ) {
      return NextResponse.json(
        { error: "Sauna time is outside the Lounge session" },
        { status: 400 }
      );
    }
    // Preferred cabin: accept only a label this sauna actually advertises, so a
    // junk value never lands in the appointment notes. Silently dropped if it
    // doesn't match (it's a soft preference, not worth failing the booking over).
    let cabin: string | undefined;
    if (typeof sel?.cabin === "string" && sauna.cabins?.includes(sel.cabin)) {
      cabin = sel.cabin;
    }
    seenStart.add(sel.startDateTime);
    saunaBookings.push({ sauna, startDateTime: sel.startDateTime, cabin });
  }

  try {
    const token = await getMindbodyStaffToken(siteId);

    // 0) Occupancy guard. Mindbody only enforces capacity per exact start time,
    //    so overlapping rolling-entry bookings can overfill the Lounge room (and
    //    a sauna window) without this check. Best-effort: if the read fails we
    //    log and proceed rather than block all bookings on a transient error.
    const bookDate = startDateTime.slice(0, 10);
    const loungeBlockMin =
      club.remedyLounge.serviceMinutes + club.remedyLounge.bufferMinutes;
    const saunaOccupancy = new Map<number, ApptInterval[]>();

    try {
      const saunaStaffIds = Array.from(
        new Set(saunaBookings.map((b) => b.sauna))
      );
      const [loungeAppts, ...saunaApptLists] = await Promise.all([
        fetchClubAppointments({
          siteId,
          token,
          staffId: club.remedyLounge.resourceStaffId,
          locationId: club.locationId,
          date: bookDate,
        }),
        ...saunaStaffIds.map((s) =>
          fetchClubAppointments({
            siteId,
            token,
            staffId: s.resourceStaffId,
            locationId: club.locationId,
            date: bookDate,
          })
        ),
      ]);
      saunaStaffIds.forEach((s, i) =>
        saunaOccupancy.set(s.sessionTypeId, saunaApptLists[i] ?? [])
      );

      const loungeStart = parseWall(startDateTime);
      const loungeBooked = peakOverlap(
        loungeAppts,
        loungeStart,
        loungeStart + loungeBlockMin * 60_000
      );
      if (loungeBooked >= club.remedyLounge.capacity) {
        return NextResponse.json(
          {
            error:
              "That Remedy Lounge time just filled up. Please pick another time.",
            loungeFull: true,
          },
          { status: 409 }
        );
      }
    } catch (e) {
      console.warn("[club book] occupancy guard read failed:", e);
    }

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
      console.error(
        `[club book] lounge booking failed (site ${siteId}, ${startDateTime}):`,
        JSON.stringify(lounge.data?.Error ?? lounge.data).slice(0, 500)
      );
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

    for (const { sauna, startDateTime: saunaStart, cabin } of saunaBookings) {
      // Concurrency guard for this 25-min sauna window. If it's already at seat
      // capacity, skip the write and report it as a failed add-on (the Lounge
      // still books) rather than letting Mindbody silently overfill the resource.
      const saunaAppts = saunaOccupancy.get(sauna.sessionTypeId);
      if (saunaAppts) {
        const sStart = parseWall(saunaStart);
        const sEnd = sStart + sauna.minutes * 60_000;
        const sBooked = peakOverlap(saunaAppts, sStart, sEnd);
        if (sBooked >= sauna.capacity) {
          saunaResults.push({
            key: sauna.key,
            label: sauna.label,
            success: false,
            error: "That sauna window is full",
          });
          continue;
        }
        // Mindbody rejects an appointment whose window CROSSES the start of an
        // existing one on the same resource ("must start on an active time"),
        // while same-start stacking and starting inside an existing one are
        // allowed (verified live 2026-06-10). The client snaps windows to a
        // shared rotation grid so this should not happen, but skip gracefully
        // (Lounge still books) instead of letting Mindbody 400.
        const crossesStart = saunaAppts.some((a) => {
          const aStart = parseWall(a.start);
          return aStart > sStart && aStart < sEnd;
        });
        if (crossesStart) {
          console.error(
            `[club book] sauna window ${saunaStart} (${sauna.label}) crosses an existing appointment start; skipping`
          );
          saunaResults.push({
            key: sauna.key,
            label: sauna.label,
            success: false,
            error: "That sauna window is no longer available",
          });
          continue;
        }
      }

      const r = await addAppointment({
        token,
        siteId,
        clientId,
        sessionTypeId: sauna.sessionTypeId,
        staffId: sauna.resourceStaffId,
        locationId: club.locationId,
        startDateTime: saunaStart,
        sendEmail: false,
        ...(cabin ? { notes: `Preferred cabin: ${cabin}` } : {}),
      });
      if (!r.ok) {
        console.error(
          `[club book] sauna booking failed (site ${siteId}, ${sauna.label} @ ${saunaStart}):`,
          JSON.stringify(r.data?.Error ?? r.data).slice(0, 500)
        );
      }
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
