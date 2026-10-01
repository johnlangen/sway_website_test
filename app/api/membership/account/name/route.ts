import { POST as updateClient } from "@/app/api/mindbody/update-client/route";
import { pinClient, proxyWithSession } from "../sessionProxy";

export const runtime = "nodejs";

/** Backfill name/phone on a session-owned client for the membership checkout. */
export async function POST(req: Request) {
  return proxyWithSession(req, updateClient, { rewrite: pinClient });
}
