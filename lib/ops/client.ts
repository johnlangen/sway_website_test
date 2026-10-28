"use client";
/**
 * Browser side of the first-party analytics (lib/ops/record.ts, lib/ops/README.md).
 *
 * - visitor: a random id kept in localStorage (no personal data; the server only ever stores it
 *   hashed inside HyperLogLog unique-visitor sketches).
 * - trackView / trackClick / trackStep: small beacons to /api/ops/v/ (sendBeacon, never blocks).
 * - captureTouch: on a tab's landing page, reads utm_* / ad click ids / the external referrer and
 *   keeps two first-party cookies the booking routes copy onto each completed booking:
 *   sw_src_first (set once, 90 days) and sw_src_last (every non-direct landing).
 * - useFlowTrack: one line per booking flow; reports each step reached (with the option picked)
 *   and each error message shown to the guest.
 */
import { useEffect, useRef } from "react";

const ENDPOINT = "/api/ops/v/";

function visitorId(): string {
  try {
    const saved = localStorage.getItem("sw_vid");
    if (saved && /^[A-Za-z0-9-]{8,64}$/.test(saved)) return saved;
    const id = crypto.randomUUID();
    localStorage.setItem("sw_vid", id);
    return id;
  } catch {
    try {
      const s = sessionStorage.getItem("sw_vid");
      if (s) return s;
      const id = crypto.randomUUID();
      sessionStorage.setItem("sw_vid", id);
      return id;
    } catch {
      return "anon-" + Math.random().toString(36).slice(2, 12);
    }
  }
}

/** Don't count staff tools and private pages. */
export const isTrackedPath = (p: string) => !/^\/(clubdesk|internal|ops)(\/|$)|\/dashboard(\/|$)|^\/membership-join-preview/.test(p);

function send(payload: Record<string, unknown>) {
  try {
    if (!/^(www\.)?swaywellnessspa\.com$/.test(location.hostname)) return;
    const path = location.pathname;
    if (!isTrackedPath(path)) return;
    const body = JSON.stringify({ path, visitor: visitorId(), ...payload });
    if (navigator.sendBeacon?.(ENDPOINT, new Blob([body], { type: "application/json" }))) return;
    fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true }).catch(() => {});
  } catch {
    /* analytics never affects a guest */
  }
}

// ---------------------------------------------------------------- attribution
type Touch = { source: string; medium: string; campaign?: string; clickIds?: string[]; day: string };
const CLICK_IDS: [string, string][] = [
  ["gclid", "google"],
  ["gbraid", "google"],
  ["wbraid", "google"],
  ["fbclid", "meta"],
  ["msclkid", "microsoft"],
  ["ttclid", "tiktok"],
];
const clean = (v: string | null | undefined, max = 60) =>
  (v || "").toLowerCase().replace(/[^a-z0-9._~ -]/g, "").trim().slice(0, max);

function fromReferrer(host: string): { source: string; medium: string } {
  const h = host.replace(/^www\./, "");
  const engine = /(^|\.)(google|bing|yahoo|duckduckgo|ecosia|baidu|yandex|brave)\.[a-z.]+$/.exec(h)?.[2];
  if (engine) return { source: engine, medium: "organic" };
  const ai = /(chatgpt\.com|openai\.com|perplexity\.ai|claude\.ai|gemini\.google\.com|copilot\.microsoft\.com)$/.exec(h)?.[1];
  if (ai) return { source: ai.split(".")[0], medium: "ai" };
  const social =
    /(^|\.)(facebook|instagram|tiktok|pinterest|linkedin|youtube|reddit|threads|yelp|nextdoor)\.[a-z]+$/.exec(h)?.[2] ||
    (/^(t\.co|x\.com|twitter\.com|lnkd\.in|l\.facebook\.com|lm\.facebook\.com|l\.instagram\.com)$/.test(h) ? h : "");
  if (social) return { source: social.replace(/^(l|lm)\./, "").replace(/\.com$/, ""), medium: "social" };
  if (/(^|\.)sked\.link$/.test(h)) return { source: "instagram", medium: "social" };
  if (/mindbodyonline\.com$|mindbody\.io$/.test(h)) return { source: "mindbody", medium: "referral" };
  return { source: clean(h, 60), medium: "referral" };
}

function touchFromLanding(): Touch | null {
  const day = new Date().toISOString().slice(0, 10);
  const q = new URLSearchParams(location.search);
  const clickIds = [...new Set(CLICK_IDS.filter(([p]) => q.get(p)).map(([, n]) => n))];
  const utm = clean(q.get("utm_source"));
  if (utm) {
    const campaign = clean(q.get("utm_campaign"), 80);
    return { source: utm, medium: clean(q.get("utm_medium")) || "(none)", ...(campaign ? { campaign } : {}), ...(clickIds.length ? { clickIds } : {}), day };
  }
  if (clickIds.length) {
    const net = clickIds[0];
    return {
      source: net === "meta" ? "facebook" : net === "microsoft" ? "bing" : net,
      medium: net === "meta" || net === "tiktok" ? "paid_social" : "cpc",
      clickIds,
      day,
    };
  }
  let host = "";
  try {
    host = document.referrer ? new URL(document.referrer).hostname.toLowerCase() : "";
  } catch {
    host = "";
  }
  if (!host || /(^|\.)swaywellnessspa\.com$/.test(host) || host.endsWith(".vercel.app")) return null;
  return { ...fromReferrer(host), day };
}

const encodeTouch = (t: Touch) =>
  ["v1", t.source, t.medium, t.campaign || "", (t.clickIds || []).join("+"), t.day].map(encodeURIComponent).join("|");

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; Max-Age=${90 * 86400}; Path=/; SameSite=Lax; Secure`;
}

/** Once per tab, on the landing page: returns the landing source for the view beacon. */
function captureTouch(): { source: string; medium: string; campaign?: string } | undefined {
  try {
    if (sessionStorage.getItem("sw_landed")) return undefined;
    sessionStorage.setItem("sw_landed", "1");
  } catch {
    return undefined;
  }
  const t = touchFromLanding();
  if (!t) return { source: "(direct)", medium: "(none)" };
  try {
    const v = encodeTouch(t);
    setCookie("sw_src_last", v);
    if (!/(^|;\s*)sw_src_first=/.test(document.cookie)) setCookie("sw_src_first", v);
  } catch {
    /* cookies blocked */
  }
  return { source: t.source, medium: t.medium, ...(t.campaign ? { campaign: t.campaign } : {}) };
}

// ---------------------------------------------------------------- views + clicks
export function trackView() {
  const landing = captureTouch();
  send({ kind: "view", ...(landing ? { landing } : {}) });
}

const FLOW_PAGE = /\/(book[^/]*|founding-membership|themavenhotel|checkout)(\/|$)/;
const TIME_OR_DAY = /^(\d{1,2}:\d{2}\s?(AM|PM)|(Mon|Tue|Wed|Thu|Fri|Sat|Sun)[a-z]*\.?,?\s+\w+\s+\d{1,2}|\d{1,2})$/i;
const scrubText = (v: string) => v.replace(/\d[\d -]{5,}\d/g, "#").replace(/[^\s@]+@[^\s@]+/g, "[email]");

function linkTarget(href: string): { type: string; target: string } | null {
  let u: URL;
  try {
    u = new URL(href, location.href);
  } catch {
    return null;
  }
  if (u.protocol === "tel:") return { type: "call", target: "tel" };
  if (u.protocol === "mailto:") return { type: "email", target: "mailto" };
  if (u.protocol === "sms:") return { type: "sms", target: "sms" };
  if (!/^https?:$/.test(u.protocol)) return null;
  const host = u.hostname.replace(/^www\./, "");
  if (host === "swaywellnessspa.com" || host === location.hostname) {
    const p = u.pathname.endsWith("/") ? u.pathname : `${u.pathname}/`;
    const qs = ["session", "category", "tier", "choose"].filter((k) => u.searchParams.has(k)).map((k) => `${k}=${clean(u.searchParams.get(k), 20)}`).join("&");
    const target = `${p}${qs ? `?${qs}` : ""}`;
    if (p === location.pathname.replace(/\/?$/, "/") && u.hash) return { type: "anchor", target: `${p}${u.hash.slice(0, 40)}` };
    const type = /\/book[^/]*\/|\/themavenhotel\//.test(p)
      ? "book"
      : /gift-cards/.test(p)
        ? "gift_cards"
        : /membership/.test(p)
          ? "membership"
          : /\/offers\//.test(p)
            ? "offers"
            : "nav";
    return { type, target };
  }
  if (/(^|\.)google\.[a-z.]+$/.test(host) && u.pathname.startsWith("/maps") || /maps\.app\.goo\.gl|goo\.gl\/maps|maps\.apple\.com/.test(host + u.pathname))
    return { type: "directions", target: host };
  if (/mindbodyonline\.com$/.test(host)) {
    const stype = u.searchParams.get("stype");
    const type = stype === "42" ? "gift_card_purchase" : stype === "40" ? "membership_purchase" : "mindbody";
    return { type, target: `${host}${u.pathname}${stype ? `?stype=${clean(stype, 6)}` : ""}` };
  }
  if (/(instagram|tiktok|facebook|youtube|pinterest|linkedin)\.com$/.test(host)) return { type: "social", target: `${host}${u.pathname.slice(0, 60)}` };
  return { type: "outbound", target: `${host}${u.pathname.slice(0, 80)}` };
}

function onClick(e: MouseEvent) {
  try {
    const start = e.target as Element | null;
    const el = start?.closest?.("a[href],button,[role=button],summary,[data-track]") as HTMLElement | null;
    if (!el || el.closest("[data-ops-ignore]")) return;
    const explicit = el.getAttribute("data-track") || "";
    const text = (el.getAttribute("aria-label") || el.textContent || "").replace(/\s+/g, " ").trim();
    // Booking flows and pop-ups can show a guest's name on a button (member bar, account picker):
    // there, keep only explicit data-track labels and plain times/dates.
    const privateArea = FLOW_PAGE.test(location.pathname) || !!el.closest("[role=dialog],[aria-modal=true],[data-ops-private]");
    const label = explicit || (privateArea && !TIME_OR_DAY.test(text) ? "" : scrubText(text).slice(0, 60));
    let type = "button";
    let target = "";
    if (el.tagName === "A") {
      const t = linkTarget((el as HTMLAnchorElement).getAttribute("href") || "");
      if (!t) return;
      ({ type, target } = t);
    } else if (el.tagName === "SUMMARY") {
      type = "toggle";
    }
    send({ kind: "click", type, target, label: label || (privateArea ? "(private)" : "") });
  } catch {
    /* never affects the page */
  }
}

let listening = false;
export function listenForClicks() {
  if (listening || typeof document === "undefined") return;
  listening = true;
  document.addEventListener("click", onClick, { capture: true, passive: true });
}

// ---------------------------------------------------------------- flow steps
export type OpsFlow = "service" | "aescape" | "remedy_room" | "remedy_lounge" | "membership" | "maven" | "lead" | "gift";

export function trackStep(flow: OpsFlow, step: string, variant?: string | number, extra?: { error?: string; value?: number }) {
  send({
    kind: "step",
    flow,
    step: String(step).toLowerCase().replace(/[^a-z0-9_-]/g, "_").slice(0, 30),
    ...(variant !== undefined && variant !== null && variant !== "" ? { variant: String(variant).toLowerCase().replace(/[^a-z0-9_-]/g, "_").slice(0, 40) } : {}),
    ...(extra?.error ? { error: extra.error.slice(0, 300) } : {}),
    ...(typeof extra?.value === "number" ? { value: extra.value } : {}),
  });
}

/**
 * One line in each booking flow, right after its step state:
 *   useFlowTrack("aescape", step, sessionTypeId, error, step === "done" ? value : undefined)
 * Reports each step once when it's reached (with the option selected at that moment) and each
 * new error message shown.
 */
export function useFlowTrack(flow: OpsFlow, step: string, variant?: string | number | null, error?: string | null, value?: number) {
  const lastStep = useRef("");
  const lastError = useRef("");
  const variantRef = useRef(variant);
  variantRef.current = variant;
  const valueRef = useRef(value);
  valueRef.current = value;
  useEffect(() => {
    if (!step || step === lastStep.current) return;
    lastStep.current = step;
    trackStep(flow, step, variantRef.current ?? undefined, step === "done" && typeof valueRef.current === "number" ? { value: valueRef.current } : undefined);
  }, [flow, step]);
  useEffect(() => {
    if (!error || error === lastError.current) return;
    lastError.current = error;
    trackStep(flow, lastStep.current || step, variantRef.current ?? undefined, { error });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);
}
