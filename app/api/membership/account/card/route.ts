import { POST as updateClientCard } from "@/app/api/mindbody/update-client-card/route";
import { pinClient, proxyWithSession } from "../sessionProxy";

export const runtime = "nodejs";

/** Save a card on a session-owned client for the membership checkout. */
export async function POST(req: Request) {
  return proxyWithSession(req, updateClientCard, { rewrite: pinClient });
}
