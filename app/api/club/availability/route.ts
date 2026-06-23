import { NextResponse } from "next/server";
import { getClubBySiteId } from "@/lib/clubLocations";
import { getMindbodyStaffToken } from "@/lib/mindbodyStaffToken";
import {
  fetchClubAppointments,
  generateWaveStarts,
  parseWall,
  peakOverlap,
  type ApptInterval,
} from "@/lib/clubOccupancy";

/**
 * Availability for the Sway Wellness Club locations (RiNo / Central Park).
 *
 * The Lounge runs in fixed 85-min session waves anchored at open (10:00, 11:25,
 * 12:50, ...), each capped at concurrent occupancy (15 RiNo / 18 CP). Mindbody
 * does not enforce that cap, so for a Lounge request we compute true concurrency
 * ourselves and return gated waves (with booked counts) plus the raw sauna
 * appointments so the client can gate the 25-min sauna rotation windows too.
 *
 * The window lookup (bookableitems) stays token-free; the occupancy lookup needs
 * the per-site staff token. If that token isn't available we degrade to ungated
 * windows so the picker still renders (the book route is the real safety net).
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const siteId = searchParams.get("siteId");
  const sessionTypeId = searchParams.get("sessionTypeId");
  const date = searchParams.get("date"); // YYYY-MM-DD

  if (!siteId || !sessionTypeId || !date) {
    return NextResponse.json(
      { error: "Missing siteId, sessionTypeId, or date" },
      { status: 400 }
    );
  }

  const club = getClubBySiteId(siteId);
  if (!club) {
    return NextResponse.json({ error: "Unknown club site" }, { status: 400 });
  }

  // Map the requested session type to its resource staff id, validating it's a
  // known Lounge/sauna for this location.
  const stId = Number(sessionTypeId);
  let staffId: number | null = null;
  if (stId === club.remedyLounge.sessionTypeId) {
    staffId = club.remedyLounge.resourceStaffId;
  } else {
    const sauna = club.saunas.find((s) => s.sessionTypeId === stId);
    if (sauna) staffId = sauna.resourceStaffId;
  }

  if (staffId == null) {
    return NextResponse.json(
      { error: "Invalid sessionTypeId for this club" },
      { status: 400 }
    );
  }

  const apiKey = process.env.MINDBODY_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const url = new URL(
    "https://api.mindbodyonline.com/public/v6/appointment/bookableitems"
  );
  url.searchParams.append("request.sessionTypeIds[0]", String(stId));
  url.searchParams.append("request.locationIds[0]", String(club.locationId));
  url.searchParams.append("request.startDate", `${date}T00:00:00`);
  url.searchParams.append("request.endDate", `${date}T23:59:59`);
  url.searchParams.append("request.includeResourceAvailability", "true");
  url.searchParams.append("request.limit", "200");
  url.searchParams.append("request.staffIds[0]", String(staffId));

  try {
    const res = await fetch(url.toString(), {
      headers: { Accept: "application/json", "Api-Key": apiKey, SiteId: siteId },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.Error?.Message || "Mindbody error" },
        { status: res.status }
      );
    }

    const windows: { start: string; bookableEnd: string }[] =
      data.Availabilities?.map((a: any) => ({
        start: a.StartDateTime,
        bookableEnd: a.BookableEndDateTime,
      })) || [];

    // Sauna requests keep the original token-free window contract.
    const isLounge = stId === club.remedyLounge.sessionTypeId;
    if (!isLounge) {
      return NextResponse.json({ windows });
    }

    // Lounge request: lay fixed session waves (one per full backend block of
    // serviceMinutes + bufferMinutes = 85) and gate each wave by true
    // concurrent occupancy of the Lounge room. Also return the saunas' booked
    // intervals + capacities so the client can gate the 25-min windows.
    const blockMin =
      club.remedyLounge.serviceMinutes + club.remedyLounge.bufferMinutes;
    const slotStarts = generateWaveStarts(windows, blockMin);

    const saunas: Record<
      string,
      { capacity: number; appointments: ApptInterval[] }
    > = {};

    let loungeAppts: ApptInterval[] = [];
    let occupancyKnown = false;

    // Per-sauna occupancy comes from its cabin providers when it has them
    // (infrared: concatenate the cabins so peakOverlap reports how many cabins
    // are in use, vs capacity = cabin count), else the pooled resource
    // (traditional). This is why the old pooled infrared provider is no longer
    // read here — it can be deactivated in Mindbody.
    const saunaStaffSets = club.saunas.map((s) => {
      const cabinIds = (s.cabins ?? [])
        .map((c) => c.resourceStaffId)
        .filter((id): id is number => id != null);
      return cabinIds.length ? cabinIds : [s.resourceStaffId];
    });

    try {
      const token = await getMindbodyStaffToken(siteId);

      const allStaffIds = Array.from(
        new Set<number>([
          club.remedyLounge.resourceStaffId,
          ...saunaStaffSets.flat(),
        ])
      );
      const lists = await Promise.all(
        allStaffIds.map((id) =>
          fetchClubAppointments({
            siteId,
            token,
            staffId: id,
            locationId: club.locationId,
            date,
          })
        )
      );
      const byStaff = new Map<number, ApptInterval[]>();
      allStaffIds.forEach((id, i) => byStaff.set(id, lists[i] ?? []));

      loungeAppts = byStaff.get(club.remedyLounge.resourceStaffId) ?? [];
      club.saunas.forEach((s, i) => {
        saunas[String(s.sessionTypeId)] = {
          capacity: s.capacity,
          appointments: saunaStaffSets[i].flatMap((id) => byStaff.get(id) ?? []),
        };
      });
      occupancyKnown = true;
    } catch (e) {
      // Degrade: render slots ungated rather than blocking the picker. The book
      // route re-checks occupancy server-side before writing.
      console.warn("[club availability] occupancy lookup failed:", e);
      club.saunas.forEach((s) => {
        saunas[String(s.sessionTypeId)] = { capacity: s.capacity, appointments: [] };
      });
    }

    const capacity = club.remedyLounge.capacity;
    const slots = slotStarts.map((start) => {
      const s = parseWall(start);
      const booked = occupancyKnown
        ? peakOverlap(loungeAppts, s, s + blockMin * 60_000)
        : 0;
      return { start, booked, capacity, available: booked < capacity };
    });

    return NextResponse.json({ windows, slots, saunas, occupancyKnown });
  } catch (err) {
    console.error("Club availability error:", err);
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    );
  }
}
