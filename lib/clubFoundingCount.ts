import { getMindbodyStaffToken } from "./mindbodyStaffToken";
import { CLUB_LOCATIONS, type ClubLocationKey } from "./clubLocations";

/**
 * How many founding spots are really taken at a club, read from Mindbody sales, so the page never
 * shows a number that isn't true. Counts desk and online sales: anyone who bought a founding contract
 * ($10 off perk) or a regular tier contract (Lounge visits perk) since founding opened, net of
 * refunds. Monthly rebills are the same person, so people are counted, not charges.
 * Item ids are the same on both club sites (read live 11/2/2026).
 */
const FOUNDING_ITEM_IDS = new Set([102366, 102367, 102368, 102351, 102352, 102353]);
const FOUNDING_OPENED = "2026-11-02T00:00:00";

export async function foundingClaimed(clubKey: ClubLocationKey): Promise<number | null> {
  try {
    const siteId = CLUB_LOCATIONS[clubKey].siteId;
    const token = await getMindbodyStaffToken(siteId);
    const end = new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10);
    const perClient = new Map<string, number>();
    for (let offset = 0; ; offset += 200) {
      const url = new URL("https://api.mindbodyonline.com/public/v6/sale/sales");
      url.searchParams.set("StartSaleDateTime", FOUNDING_OPENED);
      url.searchParams.set("EndSaleDateTime", `${end}T00:00:00`);
      url.searchParams.set("limit", "200");
      url.searchParams.set("offset", String(offset));
      const res = await fetch(url, {
        headers: { Accept: "application/json", "Api-Key": process.env.MINDBODY_API_KEY!, SiteId: siteId, Authorization: `Bearer ${token}` },
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) return null;
      const sales: any[] = (await res.json())?.Sales ?? [];
      for (const sale of sales) {
        for (const item of sale.PurchasedItems ?? []) {
          if (!FOUNDING_ITEM_IDS.has(Number(item.Id))) continue;
          const client = String(sale.ClientId);
          perClient.set(client, (perClient.get(client) ?? 0) + Number(item.Quantity ?? 1));
        }
      }
      if (sales.length < 200) break;
    }
    return [...perClient.values()].filter((n) => n > 0).length;
  } catch {
    return null;
  }
}
