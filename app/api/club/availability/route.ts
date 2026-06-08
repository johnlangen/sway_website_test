import { NextResponse } from "next/server";
import { getClubBySiteId } from "@/lib/clubLocations";

/**
 * Availability for the Sway Wellness Club locations (RiNo / Central Park).
 *
 * Token-free: Mindbody's bookableitems endpoint accepts Api-Key + SiteId, so this
 * works before the per-site staff login is provisioned. Only the Remedy Lounge and
 * its two sauna resources are queryable, validated against the per-site config.
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

    const windows =
      data.Availabilities?.map((a: any) => ({
        start: a.StartDateTime,
        bookableEnd: a.BookableEndDateTime,
      })) || [];

    return NextResponse.json({ windows });
  } catch (err) {
    console.error("Club availability error:", err);
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    );
  }
}
