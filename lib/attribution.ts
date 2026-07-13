/* Client-side first-touch attribution for lead forms.
 *
 * On first load of any page that imports this module, utm_* params and the
 * external referrer are persisted to sessionStorage, so the attribution
 * survives navigating from a landing page to the form page. getAttribution()
 * returns the persisted first-touch values (or the current URL's, if nothing
 * was persisted) for inclusion in a form POST body.
 */

const KEY = "sway_attribution";

type Attribution = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrerHost?: string;
};

function clean(v: string | null): string | undefined {
  const t = v?.trim().slice(0, 120);
  return t ? t : undefined;
}

function fromCurrentUrl(): Attribution {
  const p = new URLSearchParams(window.location.search);
  let referrerHost: string | undefined;
  try {
    const ref = document.referrer;
    if (ref) {
      const host = new URL(ref).hostname;
      if (!host.endsWith("swaywellnessspa.com")) referrerHost = host;
    }
  } catch {}
  return {
    utmSource: clean(p.get("utm_source")),
    utmMedium: clean(p.get("utm_medium")),
    utmCampaign: clean(p.get("utm_campaign")),
    referrerHost,
  };
}

function capture() {
  if (sessionStorage.getItem(KEY)) return;
  const att = fromCurrentUrl();
  if (att.utmSource || att.utmMedium || att.utmCampaign || att.referrerHost) {
    sessionStorage.setItem(KEY, JSON.stringify(att));
  }
}

// First-touch capture on module load in the browser.
if (typeof window !== "undefined") {
  try {
    capture();
  } catch {}
}

export function getAttribution(): Attribution {
  try {
    const saved = sessionStorage.getItem(KEY);
    if (saved) return JSON.parse(saved);
    return fromCurrentUrl();
  } catch {
    return {};
  }
}
