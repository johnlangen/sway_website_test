import { NextResponse, after } from "next/server";
import { FLOWS, countsForAnalytics, isBot, recordBeacon, type Beacon, type OpsFlow } from "@/lib/ops/record";

/**
 * POST /api/ops/v/ : page views, clicks and flow steps from the pages (lib/ops/client.ts), counted
 * first-party in Redis (lib/ops/record.ts). Deliberately not called "track"/"analytics" (blocker
 * lists match those). Always answers 204 and records after the response, so it can never slow or
 * break a page. Only the production domain counts; bots are dropped; inputs are validated and
 * clipped (no personal data is accepted: see lib/ops/record.ts).
 */
export const dynamic = "force-dynamic";

const PATH = /^\/[A-Za-z0-9/_.~%-]{0,200}$/;
const ID = /^[A-Za-z0-9-]{8,64}$/;
const WORD = /^[a-z0-9_-]{1,40}$/;

export async function POST(req: Request) {
  const nothing = new NextResponse(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  if (!countsForAnalytics(req) || isBot(req)) return nothing;
  const raw = await req.text().catch(() => "");
  if (!raw || raw.length > 2000) return nothing;
  let b: Record<string, unknown>;
  try {
    b = JSON.parse(raw);
  } catch {
    return nothing;
  }
  const path = typeof b.path === "string" ? b.path.split("?")[0].split("#")[0] : "";
  const visitor = typeof b.visitor === "string" ? b.visitor : "";
  if (!PATH.test(path) || !ID.test(visitor)) return nothing;
  const str = (v: unknown, n: number) => (typeof v === "string" ? v.slice(0, n) : "");

  let beacon: Beacon | null = null;
  if (b.kind === "view") {
    const l = b.landing as Record<string, unknown> | undefined;
    const landing =
      l && typeof l.source === "string" && l.source
        ? { source: str(l.source, 60), medium: str(l.medium, 40) || "(none)", campaign: str(l.campaign, 80) || undefined }
        : undefined;
    beacon = { kind: "view", path, visitor, ...(landing ? { landing } : {}) };
  } else if (b.kind === "click") {
    const type = str(b.type, 24);
    if (!WORD.test(type)) return nothing;
    beacon = { kind: "click", path, visitor, type, target: str(b.target, 160), label: str(b.label, 80) };
  } else if (b.kind === "step") {
    const flow = str(b.flow, 24) as OpsFlow;
    const step = str(b.step, 30);
    const variant = str(b.variant, 40);
    if (!FLOWS.includes(flow) || !WORD.test(step) || (variant && !WORD.test(variant))) return nothing;
    const value = typeof b.value === "number" && Number.isFinite(b.value) ? b.value : undefined;
    beacon = {
      kind: "step",
      path,
      visitor,
      flow,
      step,
      ...(variant ? { variant } : {}),
      ...(typeof b.error === "string" && b.error.trim() ? { error: b.error.trim().slice(0, 300) } : {}),
      ...(value !== undefined ? { value } : {}),
    };
  }
  if (!beacon) return nothing;
  const toRecord = beacon;
  after(() => recordBeacon(toRecord));
  return nothing;
}
