import { NextResponse } from "next/server";
import { foundingClaimed } from "@/lib/clubFoundingCount";
import { CLUB_FOUNDING } from "@/lib/clubFounding";
import type { ClubLocationKey } from "@/lib/clubLocations";

export const runtime = "nodejs";

/** GET /api/founding/count/?club=denver-rino → { claimed, cap }. Cached 30 min. claimed null = unknown. */
export async function GET(req: Request) {
  const club = new URL(req.url).searchParams.get("club") as ClubLocationKey | null;
  if (!club || !(club in CLUB_FOUNDING)) return NextResponse.json({ error: "Unknown club" }, { status: 400 });
  const claimed = await foundingClaimed(club);
  return NextResponse.json(
    { claimed, cap: CLUB_FOUNDING[club].cap },
    { headers: { "Cache-Control": claimed === null ? "no-store" : "public, s-maxage=1800, stale-while-revalidate=3600" } },
  );
}
