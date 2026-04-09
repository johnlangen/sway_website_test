import { NextResponse } from "next/server";
import { getMindbodyStaffToken } from "@/lib/mindbodyStaffToken";

export const runtime = "nodejs";

/**
 * GET /api/membership/check?email=user@example.com
 *
 * Looks up a client by email in Mindbody, checks local contracts first,
 * then falls back to cross-regional membership lookup across all 60+ sites.
 *
 * Returns:
 *   {
 *     found: boolean,
 *     isMember: boolean,
 *     tier: "essential" | "premier" | "ultimate" | null,
 *     firstName: string | null,
 *     clientId: string | null,
 *     hasCardOnFile: boolean,
 *     homeLocation: string | null,   // e.g. "Spavia Park Meadows, CO"
 *     isLocalMember: boolean,         // true if membership is at this site
 *   }
 */

type MembershipTier = "essential" | "premier" | "ultimate" | null;

const TIER_RANK: Record<string, number> = { essential: 1, premier: 2, ultimate: 3 };

/**
 * Determine tier from a Mindbody contract or membership name.
 */
function detectTierFromName(name: string): MembershipTier {
  const lower = name.toLowerCase();
  if (lower.includes("ultimate")) return "ultimate";
  if (lower.includes("premier")) return "premier";
  if (lower.includes("essential")) return "essential";
  // Legacy members absorbed into premier
  if (
    lower.includes("spa club") ||
    lower.includes("spa membership") ||
    lower.includes("wellness membership") ||
    lower.includes("sway club") ||
    lower.includes("sway membership")
  )
    return "premier";
  // Cross-regional "premier membership" etc
  if (lower.includes("membership")) {
    if (lower.includes("premier")) return "premier";
    // Generic "membership" without tier keyword — default to premier
    return "premier";
  }
  return null;
}

/**
 * Look up site name from site ID. Returns a friendly location name.
 * We fetch from the Mindbody API on demand — the sites endpoint is fast
 * and the result is used only when a cross-regional member is found.
 */
async function getSiteName(
  siteId: number,
  apiKey: string
): Promise<string | null> {
  try {
    const url = new URL("https://api.mindbodyonline.com/public/v6/site/sites");
    const res = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
        "Api-Key": apiKey,
        SiteId: String(siteId),
      },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const sites = data?.Sites ?? [];
    const site = sites.find((s: any) => s.Id === siteId);
    return site?.Name ?? null;
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const rawEmail = searchParams.get("email");

  if (!rawEmail) {
    return NextResponse.json(
      { error: "Missing email parameter" },
      { status: 400 }
    );
  }

  const email = rawEmail.trim().toLowerCase();
  const apiKey = process.env.MINDBODY_API_KEY;
  const siteId = process.env.MINDBODY_SITE_ID;

  if (!apiKey || !siteId) {
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500 }
    );
  }

  const NOT_FOUND = {
    found: false,
    isMember: false,
    tier: null,
    firstName: null,
    clientId: null,
    hasCardOnFile: false,
    homeLocation: null,
    isLocalMember: false,
  };

  try {
    const token = await getMindbodyStaffToken();
    const mbHeaders = {
      Accept: "application/json",
      "Api-Key": apiKey,
      SiteId: siteId,
      Authorization: `Bearer ${token}`,
    };

    /* ── Step 1: Look up client by email at local site ── */
    const clientUrl = new URL(
      "https://api.mindbodyonline.com/public/v6/client/clients"
    );
    clientUrl.searchParams.set("request.searchText", email);
    clientUrl.searchParams.set("request.includeInactive", "false");
    clientUrl.searchParams.set("request.limit", "10");

    const clientRes = await fetch(clientUrl.toString(), { headers: mbHeaders });

    if (!clientRes.ok) {
      console.error("[MEMBERSHIP CHECK] Client lookup failed:", clientRes.status);
      return NextResponse.json(NOT_FOUND);
    }

    const clientData = await clientRes.json();
    const clients = clientData?.Clients ?? [];

    if (clients.length === 0) {
      return NextResponse.json(NOT_FOUND);
    }

    // Exact email match (case-insensitive) — Mindbody searchText is fuzzy
    // Multiple clients can share the same email — collect all matches
    const matchingClients = clients.filter(
      (c: any) => (c.Email ?? "").trim().toLowerCase() === email
    );
    if (matchingClients.length === 0) {
      return NextResponse.json(NOT_FOUND);
    }

    /* ── Steps 2–4: Check each matching client for a membership ──
       Multiple clients can share the same email in Mindbody (duplicates).
       Try each one — return the first that has an active membership. */
    for (const client of matchingClients) {
      const clientId = String(client.Id ?? client.UniqueId);
      const firstName = client.FirstName ?? null;
      const hasCardOnFile = !!(
        client.ClientCreditCard?.CardNumber &&
        client.ClientCreditCard.CardNumber !== ""
      );

      // Step 2: local contracts
      let tier: MembershipTier = null;
      const contractsUrl = new URL(
        "https://api.mindbodyonline.com/public/v6/client/clientcontracts"
      );
      contractsUrl.searchParams.set("request.clientId", clientId);
      const contractsRes = await fetch(contractsUrl.toString(), { headers: mbHeaders });

      if (contractsRes.ok) {
        const contracts = (await contractsRes.json())?.Contracts ?? [];
        for (const contract of contracts) {
          const termDate = contract.TerminationDate ?? "";
          const isRealTermination =
            termDate &&
            !termDate.startsWith("0001-01-01") &&
            termDate !== "" &&
            new Date(termDate) < new Date();
          if (contract.IsActive === false || isRealTermination) continue;
          const detected = detectTierFromName(contract.Name ?? contract.ContractName ?? "");
          if (detected === "ultimate") { tier = "ultimate"; break; }
          if (detected && (!tier || TIER_RANK[detected] > TIER_RANK[tier])) tier = detected;
        }
      }

      if (tier) {
        return NextResponse.json({ found: true, isMember: true, tier, firstName, clientId, hasCardOnFile, homeLocation: null, isLocalMember: true });
      }

      // Step 3: cross-regional memberships
      const membershipUrl = new URL(
        "https://api.mindbodyonline.com/public/v6/client/activeclientmemberships"
      );
      membershipUrl.searchParams.set("request.clientId", clientId);
      membershipUrl.searchParams.set("request.crossRegionalLookup", "true");
      const membershipRes = await fetch(membershipUrl.toString(), { headers: mbHeaders });

      if (membershipRes.ok) {
        const memberships = (await membershipRes.json())?.ClientMemberships ?? [];
        let bestTier: MembershipTier = null;
        let bestSiteId: number | null = null;
        for (const m of memberships) {
          if (!m.Current) continue;
          const detected = detectTierFromName(m.Name ?? "");
          if (detected && (!bestTier || TIER_RANK[detected] > TIER_RANK[bestTier])) {
            bestTier = detected;
            bestSiteId = m.SiteId ?? null;
          }
          if (bestTier === "ultimate") break;
        }
        if (bestTier) {
          const siteName = bestSiteId ? await getSiteName(bestSiteId, apiKey) : null;
          return NextResponse.json({ found: true, isMember: true, tier: bestTier, firstName, clientId, hasCardOnFile, homeLocation: siteName, isLocalMember: !bestSiteId });
        }
      }

      // Step 4: status field fallback
      const status = (client.Status ?? "").toLowerCase();
      if (status.includes("member") && status !== "non-member") {
        return NextResponse.json({ found: true, isMember: true, tier: "premier" as MembershipTier, firstName, clientId, hasCardOnFile, homeLocation: null, isLocalMember: false });
      }
    }

    // Found in Mindbody but no membership on any matching client
    const fallbackClient = matchingClients[0];
    return NextResponse.json({
      found: true,
      isMember: false,
      tier: null,
      firstName: fallbackClient.FirstName ?? null,
      clientId: String(fallbackClient.Id ?? fallbackClient.UniqueId),
      hasCardOnFile: !!(fallbackClient.ClientCreditCard?.CardNumber && fallbackClient.ClientCreditCard.CardNumber !== ""),
      homeLocation: null,
      isLocalMember: false,
    });
  } catch (err: any) {
    console.error("[MEMBERSHIP CHECK] Error:", err?.message ?? err);
    return NextResponse.json({
      ...NOT_FOUND,
      tokenError: true,
    });
  }
}
