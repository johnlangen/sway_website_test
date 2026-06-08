import { getClubBySiteId } from "@/lib/clubLocations";

// Per-site token cache. Larimer (default site) is keyed by its resolved site id too.
const cachedTokens: Record<string, { token: string; expiresAt: number }> = {};

/**
 * Resolve the staff username/password for a given Mindbody site.
 * - Default / Larimer site → existing MINDBODY_STAFF_USER / MINDBODY_STAFF_PASS.
 * - Club sites (RiNo / Central Park) → their own per-site env vars (provisioned by
 *   John; Mindbody now requires a location-specific login to create appointments).
 */
function resolveCreds(siteId: string): { user?: string; pass?: string } {
  const club = getClubBySiteId(siteId);
  if (club) {
    return {
      user: process.env[club.staffCreds.userEnv],
      pass: process.env[club.staffCreds.passEnv],
    };
  }
  return {
    user: process.env.MINDBODY_STAFF_USER,
    pass: process.env.MINDBODY_STAFF_PASS,
  };
}

/**
 * Get a Mindbody staff bearer token for the given site (defaults to the Larimer
 * MINDBODY_SITE_ID). Tokens are site-scoped: a token issued for one site is
 * rejected on another ("User token site id does not match requested site").
 */
export async function getMindbodyStaffToken(siteIdArg?: string) {
  const siteId = siteIdArg || process.env.MINDBODY_SITE_ID!;

  const cached = cachedTokens[siteId];
  if (cached && cached.expiresAt > Date.now() + 60_000) {
    return cached.token;
  }

  const { user, pass } = resolveCreds(siteId);
  if (!user || !pass) {
    const club = getClubBySiteId(siteId);
    throw new Error(
      club
        ? `Online booking for Sway ${club.label} isn't available yet. Please call us at ${club.phone} to book.`
        : "Online booking is temporarily unavailable. Please call us at (303) 476-6150 to book your appointment."
    );
  }

  const res = await fetch(
    "https://api.mindbodyonline.com/public/v6/usertoken/issue",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": process.env.MINDBODY_API_KEY!,
        SiteId: siteId,
      },
      body: JSON.stringify({ Username: user, Password: pass }),
    }
  );

  if (!res.ok) {
    delete cachedTokens[siteId];
    console.error(
      "Mindbody staff token fetch failed:",
      siteId,
      res.status,
      await res.text().catch(() => "")
    );
    throw new Error(
      "Online booking is temporarily unavailable. Please call us at (303) 476-6150 to book your appointment."
    );
  }

  const data = await res.json();

  cachedTokens[siteId] = {
    token: data.AccessToken,
    expiresAt: new Date(data.Expires).getTime(),
  };

  return cachedTokens[siteId].token;
}
