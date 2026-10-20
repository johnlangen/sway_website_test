import { NextResponse } from "next/server";
import { rangeEnd, isPartial } from "@/lib/dateRange";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const sessionTypeId = searchParams.get("sessionTypeId");
  const date = searchParams.get("date"); // YYYY-MM-DD

  if (!sessionTypeId || !date) {
    return NextResponse.json(
      { error: "Missing sessionTypeId or date" },
      { status: 400 }
    );
  }

  const ALLOWED_SESSION_TYPE_IDS = [96, 97];
  if (!ALLOWED_SESSION_TYPE_IDS.includes(Number(sessionTypeId))) {
    return NextResponse.json(
      { error: "Invalid sessionTypeId for remedy room" },
      { status: 400 }
    );
  }

  const apiKey = process.env.MINDBODY_API_KEY;
  const siteId = process.env.MINDBODY_SITE_ID;

  if (!apiKey || !siteId) {
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500 }
    );
  }

  const url = new URL(
    "https://api.mindbodyonline.com/public/v6/appointment/bookableitems"
  );

  url.searchParams.append("request.sessionTypeIds[0]", sessionTypeId);
  // Optional ?days=N (week-strip availability dots): one call for the range.
  const { end, days } = rangeEnd(date, searchParams.get("days"));
  url.searchParams.append("request.startDate", `${date}T00:00:00`);
  url.searchParams.append("request.endDate", `${end}T23:59:59`);
  url.searchParams.append("request.includeResourceAvailability", "true");
  url.searchParams.append("request.limit", "200");
  url.searchParams.append("request.staffIds[0]", "100000014");

  try {
    const res = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
        "Api-Key": apiKey,
        SiteId: siteId,
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.Error || "Mindbody error" },
        { status: res.status }
      );
    }

    const windows =
      data.Availabilities?.map((a: any) => ({
        start: a.StartDateTime,
        bookableEnd: a.BookableEndDateTime,
      })) || [];

    return NextResponse.json(
      days > 1 && isPartial(data, windows.length) ? { windows, partial: true } : { windows }
    );
  } catch (err) {
    console.error("Mindbody availability error:", err);
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    );
  }
}
