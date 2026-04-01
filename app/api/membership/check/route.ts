import { NextResponse } from "next/server";
import { getMindbodyStaffToken } from "@/lib/mindbodyStaffToken";

export const runtime = "nodejs";

/**
 * GET /api/membership/check?email=user@example.com
 *
 * Looks up a client by email in Mindbody and checks their active
 * memberships/contracts to determine tier.
 *
 * Returns:
 *   {
 *     found: boolean,
 *     isMember: boolean,
 *     tier: "essential" | "premier" | "ultimate" | null,
 *     firstName: string | null,
 *     clientId: string | null,
 *     hasCardOnFile: boolean,
 *   }
 */

type MembershipTier = "essential" | "premier" | "ultimate" | null;

/**
 * Determine tier from a Mindbody contract/membership name.
 * Checks for tier keywords in the contract name.
 */
function detectTierFromName(name: string): MembershipTier {
  const lower = name.toLowerCase();
  if (lower.includes("ultimate")) return "ultimate";
  if (lower.includes("premier")) return "premier";
  if (lower.includes("essential")) return "essential";
  // Legacy $99 members absorbed into premier
  if (lower.includes("spa membership") || lower.includes("wellness membership"))
    return "premier";
  return null;
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

  try {
    const token = await getMindbodyStaffToken();

    /* Step 1: Look up client by email */
    const clientUrl = new URL(
      "https://api.mindbodyonline.com/public/v6/client/clients"
    );
    clientUrl.searchParams.set("request.searchText", email);
    clientUrl.searchParams.set("request.includeInactive", "false");
    clientUrl.searchParams.set("request.limit", "1");

    const clientRes = await fetch(clientUrl.toString(), {
      headers: {
        Accept: "application/json",
        "Api-Key": apiKey,
        SiteId: siteId,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!clientRes.ok) {
      console.error(
        "[MEMBERSHIP CHECK] Client lookup failed:",
        clientRes.status
      );
      return NextResponse.json({
        found: false,
        isMember: false,
        tier: null,
        firstName: null,
        clientId: null,
        hasCardOnFile: false,
      });
    }

    const clientData = await clientRes.json();
    const clients = clientData?.Clients ?? [];

    if (clients.length === 0) {
      return NextResponse.json({
        found: false,
        isMember: false,
        tier: null,
        firstName: null,
        clientId: null,
        hasCardOnFile: false,
      });
    }

    const client = clients[0];
    const clientId = String(client.Id ?? client.UniqueId);
    const firstName = client.FirstName ?? null;
    const hasCardOnFile = !!(
      client.ClientCreditCard?.CardNumber &&
      client.ClientCreditCard.CardNumber !== ""
    );

    /* Step 2: Check active contracts/memberships */
    const contractsUrl = new URL(
      "https://api.mindbodyonline.com/public/v6/client/clientcontracts"
    );
    contractsUrl.searchParams.set("request.clientId", clientId);

    const contractsRes = await fetch(contractsUrl.toString(), {
      headers: {
        Accept: "application/json",
        "Api-Key": apiKey,
        SiteId: siteId,
        Authorization: `Bearer ${token}`,
      },
    });

    let tier: MembershipTier = null;

    if (contractsRes.ok) {
      const contractsData = await contractsRes.json();
      const contracts = contractsData?.Contracts ?? [];

      // Find active spa membership contracts
      // Priority: Ultimate > Premier > Essential
      for (const contract of contracts) {
        // Skip terminated/expired contracts
        const isActive =
          contract.IsActive === true ||
          (contract.AgreementDate && !contract.TerminationDate);

        if (!isActive) continue;

        const name = contract.Name ?? contract.ContractName ?? "";
        const detected = detectTierFromName(name);

        if (detected === "ultimate") {
          tier = "ultimate";
          break; // Highest tier, no need to check more
        }
        if (detected === "premier") {
          tier = "premier";
          // Keep checking in case there's an ultimate
        }
        if (detected === "essential" && tier !== "premier") {
          tier = "essential";
        }
      }
    } else {
      console.error(
        "[MEMBERSHIP CHECK] Contracts fetch failed:",
        contractsRes.status
      );
      // Fallback: check client status field
      const status = (client.Status ?? "").toLowerCase();
      if (status.includes("member") && status !== "non-member") {
        // Can't determine tier, default to premier (legacy members)
        tier = "premier";
      }
    }

    return NextResponse.json({
      found: true,
      isMember: tier !== null,
      tier,
      firstName,
      clientId,
      hasCardOnFile,
    });
  } catch (err: any) {
    console.error("[MEMBERSHIP CHECK] Error:", err?.message ?? err);
    // Return a 200 with found=false so the booking flow can continue
    // as a new/unknown client rather than blocking the user.
    return NextResponse.json({
      found: false,
      isMember: false,
      tier: null,
      firstName: null,
      clientId: null,
      hasCardOnFile: false,
      tokenError: true, // signals frontend to show friendly fallback
    });
  }
}
