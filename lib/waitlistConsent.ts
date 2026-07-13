/**
 * Shared express-consent disclosure for ALL pre-opening lead forms
 * (waitlist compact/full + founding-membership pages). Mirrors the contest
 * form's TCPA pattern: the exact text shown at submission is stored on the
 * lead (consentText) together with a version tag (consentVersion), so every
 * entry carries an audit trail of what was agreed to.
 *
 * v1 history: before v2, waitlist/founding forms said only "you agree to
 * receive updates about Sway Wellness" — email-only, no SMS consent. Leads
 * captured under that copy have consentVersion=null and must NOT be texted.
 *
 * If this copy changes, bump the version and keep the old text in git.
 */

export const WAITLIST_CONSENT_VERSION = "v2-2026-07-13";

export function waitlistConsentText(location: "dallas" | "georgetown"): string {
  const brand = location === "dallas" ? "Sway Dallas" : "Sway Georgetown";
  return (
    `By signing up, you agree to receive recurring automated marketing emails and ` +
    `text messages from ${brand} at the email and number you provide. Consent is ` +
    `not a condition of purchase. Reply HELP for help and STOP to cancel. Msg ` +
    `frequency varies. Msg and data rates may apply. See our Terms and Privacy ` +
    `Policy. We'll never share your info.`
  );
}
