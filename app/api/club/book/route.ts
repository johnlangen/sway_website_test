import { NextResponse } from "next/server";
import { getMindbodyStaffToken } from "@/lib/mindbodyStaffToken";
import { getClubBySiteId, type ClubLocation } from "@/lib/clubLocations";
import {
  fetchClubAppointments,
  parseWall,
  formatWall,
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
  /** Optional explicit end (used to book a merged, longer-than-default session). */
  endDateTime?: string;
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
        ...(opts.endDateTime ? { EndDateTime: opts.endDateTime } : {}),
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

  // Merge two ADJACENT same-modality sauna windows into one longer appointment.
  // Mindbody rejects an appointment that starts exactly when another ends on the
  // same resource ("must start on an active time"), so two back-to-back 25-min
  // saunas on one resource collide and the second fails. One combined
  // appointment (e.g. a single 50-min infrared) avoids the boundary and is
  // accepted (verified live 2026-06-23). Different modalities run on different
  // resources, so they never collide and stay separate.
  type SaunaOp = {
    sauna: NonNullable<ReturnType<typeof resolveSauna>>;
    startDateTime: string;
    windowMinutes: number;
    endDateTime?: string;
    cabin?: string;
    count: number; // original windows this op covers (for failure reporting)
  };
  const saunaOps: SaunaOp[] = [];
  for (const b of [...saunaBookings].sort(
    (a, z) => parseWall(a.startDateTime) - parseWall(z.startDateTime)
  )) {
    const prev = saunaOps[saunaOps.length - 1];
    const prevEnd = prev
      ? parseWall(prev.startDateTime) + prev.windowMinutes * 60_000
      : null;
    if (
      prev &&
      prev.sauna.sessionTypeId === b.sauna.sessionTypeId &&
      prevEnd === parseWall(b.startDateTime)
    ) {
      prev.windowMinutes += b.sauna.minutes;
      prev.endDateTime = formatWall(
        parseWall(prev.startDateTime) + prev.windowMinutes * 60_000
      );
      prev.cabin = prev.cabin ?? b.cabin;
      prev.count += 1;
    } else {
      saunaOps.push({
        sauna: b.sauna,
        startDateTime: b.startDateTime,
        windowMinutes: b.sauna.minutes,
        cabin: b.cabin,
        count: 1,
      });
    }
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
      count: number;
      appointment?: any;
      error?: string;
    }[] = [];

    // Latest instant a sauna may end: the Lounge service plus its cleaning
    // buffer. Used to bound the auto-shift below so a nudged sauna never runs
    // past the guest's block.
    const loungeBlockEnd = parseWall(startDateTime) + loungeBlockMin * 60_000;

    for (const op of saunaOps) {
      const { sauna, startDateTime: saunaStart, endDateTime, windowMinutes, cabin, count } = op;
      // Concurrency guard for this sauna window (the full merged span, if merged).
      // If it's already at seat capacity, skip the write and report it as a failed
      // add-on (the Lounge still books) rather than overfilling the resource.
      const saunaAppts = saunaOccupancy.get(sauna.sessionTypeId);
      if (saunaAppts) {
        const sStart = parseWall(saunaStart);
        const sEnd = sStart + windowMinutes * 60_000;
        const sBooked = peakOverlap(saunaAppts, sStart, sEnd);
        if (sBooked >= sauna.capacity) {
          saunaResults.push({
            key: sauna.key,
            label: sauna.label,
            success: false,
            count,
            error: "That sauna window is full",
          });
          continue;
        }
        // Mindbody rejects an appointment whose window CROSSES the start of an
        // existing one on the same resource ("must start on an active time"),
        // while same-start stacking and starting inside an existing one are
        // allowed (verified live 2026-06-10). Skip gracefully (Lounge still
        // books) instead of letting Mindbody 400.
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
            count,
            error: "That sauna window is no longer available",
          });
          continue;
        }
      }

      // Book the sauna, auto-shifting the start forward in 5-min steps if
      // Mindbody rejects it as "not an active time". The infrared service has a
      // scheduling-grid quirk where some starts (notably :55) aren't bookable,
      // and our fixed sub-window grid can land on them. Nudging a few minutes
      // keeps the sauna inside the Lounge block and books cleanly (verified live
      // 2026-06-23: a :55 start rejects, the next 5-min slot accepts).
      let attemptStart = saunaStart;
      let attemptEnd = endDateTime;
      let r = await addAppointment({
        token,
        siteId,
        clientId,
        sessionTypeId: sauna.sessionTypeId,
        staffId: sauna.resourceStaffId,
        locationId: club.locationId,
        startDateTime: attemptStart,
        ...(attemptEnd ? { endDateTime: attemptEnd } : {}),
        sendEmail: false,
        ...(cabin ? { notes: `Preferred cabin: ${cabin}` } : {}),
      });
      let shifts = 0;
      while (
        !r.ok &&
        r.data?.Error?.Code === "InvalidBookingTime" &&
        shifts < 3
      ) {
        shifts++;
        const nextStart = parseWall(attemptStart) + 5 * 60_000;
        const nextEnd = nextStart + windowMinutes * 60_000;
        if (nextEnd > loungeBlockEnd) break; // don't run past the block
        attemptStart = formatWall(nextStart);
        attemptEnd = endDateTime ? formatWall(nextEnd) : undefined;
        r = await addAppointment({
          token,
          siteId,
          clientId,
          sessionTypeId: sauna.sessionTypeId,
          staffId: sauna.resourceStaffId,
          locationId: club.locationId,
          startDateTime: attemptStart,
          ...(attemptEnd ? { endDateTime: attemptEnd } : {}),
          sendEmail: false,
          ...(cabin ? { notes: `Preferred cabin: ${cabin}` } : {}),
        });
      }
      if (!r.ok) {
        console.error(
          `[club book] sauna booking failed (site ${siteId}, ${sauna.label} @ ${attemptStart}):`,
          JSON.stringify(r.data?.Error ?? r.data).slice(0, 500)
        );
      }
      saunaResults.push({
        key: sauna.key,
        label: sauna.label,
        success: r.ok,
        count,
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
      // didn't take, while keeping the Lounge confirmed. Expand a merged op back
      // to one label per original window so the success screen marks both.
      ...(failedSaunas.length > 0
        ? {
            partial: true,
            failedSaunas: failedSaunas.flatMap((s) =>
              Array(s.count).fill(s.label)
            ),
          }
        : {}),
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}
