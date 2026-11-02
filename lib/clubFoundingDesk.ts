import { getClubBySiteId } from "./clubLocations";
import { recordAlert } from "./ops/record";

const FROM = "Sway Wellness <contact@swaywellnessspa.com>";
/** Regular-price tier contracts at the clubs: bought online only by founders who pick the Lounge visits. */
const VISITS_CONTRACTS = new Set([122, 123, 124]);

/**
 * Tells the club desk about a founding membership sold on the site. The Lounge visits perk is manual,
 * so someone has to add the profile note (Larimer's old pattern: "FM - 6 free remedy room visits").
 * Runs after the sale; a failure never affects the purchase, it shows up as an /ops/ alert instead.
 */
export async function notifyDeskOfFounder(siteId: string, contractId: number, planName: string, clientId: string, guest: string) {
  const club = getClubBySiteId(siteId);
  if (!club) return;
  const visits = VISITS_CONTRACTS.has(contractId);
  const lines = [
    `Guest: ${guest || "(no name)"} (Mindbody client ${clientId})`,
    `Membership: ${planName}`,
    `Founding perk: ${visits ? "6 Remedy Lounge visits" : "$10 off every month (already in their rate)"}`,
    visits
      ? `Please add this to their profile notes and log each visit: FM - 6 free Remedy Lounge visits. Ring those visits at $0. The website shows them the $25 member price.`
      : `Nothing to add. Their first treatment is on their account.`,
  ];
  try {
    const { resend } = await import("./resend");
    const { error } = await resend.emails.send({
      from: FROM,
      to: club.contactEmail,
      subject: visits ? `New founding member: add 6 Lounge visits (${guest || clientId})` : `New founding member (${guest || clientId})`,
      text: lines.join("\n"),
    });
    if (error) throw new Error(error.message);
  } catch {
    await recordAlert("founding-desk", `Founding sale email to ${club.label} failed. Tell the desk.`, lines);
  }
}
