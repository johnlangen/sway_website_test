import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 3600; // Cache staff list for 1 hour

/**
 * GET /api/service/staff-list?sessionTypeId=88
 *
 * Returns all staff members assigned to a given session type in Mindbody,
 * regardless of current availability. Uses /v6/staff/staff with SessionTypeId filter.
 *
 * Response: { staff: [{ id: number, name: string }] }
 */

/** Strip staff-type codes like "M - ", "M/E - " (prefix) or " M", " M/E" (suffix) */
function cleanStaffName(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let cleaned = raw.replace(/^[ME](?:\/[ME])*\s*[-–—]\s*/i, "");
  cleaned = cleaned.replace(/\s+[ME](?:\/[ME])*$/i, "");
  return cleaned.trim() || null;
}

/** Staff IDs that are system/non-bookable accounts */
const EXCLUDED_STAFF_IDS = new Set([
  -5, -4, -2, 1,       // System accounts (Autoemail, Client, owner, STAFF)
  100000004,            // Mindbody system
  100000009,            // E/M (generic placeholder)
  100000010,            // E/M - (2) (generic placeholder)
  100000014,            // Remedy Room (resource, not a person)
  100000020,            // Team (generic)
  100000034,            // Sway (generic)
  100000040,            // Aescape (robot, not a person)
]);

const FACIAL_SESSION_TYPE_IDS = new Set([
  75, 77, 78, 79, 80, 81, 82, 84, 85, 103, 104, 116,
  5, 6, 9, 10, 11, 12,
]);

const MASSAGE_SESSION_TYPE_IDS = new Set([
  88, 89, 98, 99, 100, 101, 102, 90, 105, 106, 107, 108,
  7, 13, 14, 15, 16, 49,
]);

const ALLOWED_SESSION_TYPE_IDS = new Set([
  ...FACIAL_SESSION_TYPE_IDS,
  ...MASSAGE_SESSION_TYPE_IDS,
]);

async function getStaffToken(): Promise<string | null> {
  const apiKey = process.env.MINDBODY_API_KEY;
  const siteId = process.env.MINDBODY_SITE_ID;
  const username = process.env.MINDBODY_STAFF_USER;
  const password = process.env.MINDBODY_STAFF_PASS;

  if (!apiKey || !siteId || !username || !password) return null;

  try {
    const res = await fetch(
      "https://api.mindbodyonline.com/public/v6/usertoken/issue",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Api-Key": apiKey,
          SiteId: siteId,
        },
        body: JSON.stringify({ Username: username, Password: password }),
        cache: "no-store",
      }
    );
    const data = await res.json();
    return data?.AccessToken ?? null;
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionTypeIdRaw = searchParams.get("sessionTypeId");

  if (!sessionTypeIdRaw) {
    return NextResponse.json(
      { error: "Missing sessionTypeId" },
      { status: 400 }
    );
  }

  const sessionTypeId = Number(sessionTypeIdRaw);

  if (
    !Number.isFinite(sessionTypeId) ||
    !ALLOWED_SESSION_TYPE_IDS.has(sessionTypeId)
  ) {
    return NextResponse.json(
      { error: "Unsupported sessionTypeId" },
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

  const token = await getStaffToken();
  if (!token) {
    return NextResponse.json(
      { error: "Failed to authenticate with Mindbody" },
      { status: 500 }
    );
  }

  const url = new URL(
    "https://api.mindbodyonline.com/public/v6/staff/staff"
  );
  url.searchParams.append("SessionTypeId", String(sessionTypeId));
  url.searchParams.append("request.limit", "100");

  try {
    const res = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
        "Api-Key": apiKey,
        SiteId: siteId,
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("[STAFF LIST] Mindbody error", data);
      return NextResponse.json(
        { error: "Mindbody error" },
        { status: res.status }
      );
    }

    const staffMembers = Array.isArray(data?.StaffMembers)
      ? data.StaffMembers
      : [];

    /** Only include staff whose Mindbody name prefix matches the service category.
     *  M - = massage only, E - = esthetics/facial only, M/E - or E/M - = both. */
    const isFacial = FACIAL_SESSION_TYPE_IDS.has(sessionTypeId);
    const isMassage = MASSAGE_SESSION_TYPE_IDS.has(sessionTypeId);

    const staff: { id: number; name: string }[] = [];

    for (const s of staffMembers) {
      const id = s?.Id;
      if (id == null || !Number.isFinite(Number(id))) continue;
      if (EXCLUDED_STAFF_IDS.has(Number(id))) continue;
      if (!s?.AppointmentInstructor) continue;

      const displayName =
        s?.DisplayName || s?.Name || `${s?.FirstName ?? ""} ${s?.LastName ?? ""}`.trim();
      if (!displayName) continue;

      // Check prefix matches the requested service category
      const hasM = /^M\s*[-–—]/i.test(displayName);       // M - (massage only)
      const hasE = /^E\s*[-–—]/i.test(displayName);       // E - (esthetics only)
      const hasBoth = /^[ME]\/[ME]\s*[-–—]/i.test(displayName); // M/E - or E/M - (both)

      if (hasBoth) {
        // M/E or E/M staff can do both — always include
      } else if (hasM && !isMassage) {
        continue; // Massage-only staff shouldn't show for facial bookings
      } else if (hasE && !isFacial) {
        continue; // Esthetics-only staff shouldn't show for massage bookings
      } else if (!hasM && !hasE && !hasBoth) {
        continue; // No service prefix — admin/front desk
      }

      const name = cleanStaffName(displayName);

      // Hide specific staff who can't be removed from Mindbody
      if (name && /^amber$/i.test(name)) continue;

      if (name) {
        staff.push({ id: Number(id), name });
      }
    }

    staff.sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json({ staff });
  } catch (err) {
    console.error("[STAFF LIST] failure", err);
    return NextResponse.json(
      { error: "Failed to fetch staff list" },
      { status: 500 }
    );
  }
}
