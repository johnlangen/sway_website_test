import { POST as addClientWithCard } from "@/app/api/mindbody/add-client-with-card/route";
import { proxyWithSession } from "../sessionProxy";

export const runtime = "nodejs";

/** New-guest account + card for the membership checkout. Email/site come from the session. */
export async function POST(req: Request) {
  return proxyWithSession(req, addClientWithCard, {
    rewrite: (body, session) => {
      if (body.siteId != null && body.siteId !== "" && body.siteId !== session.siteId) return null;
      return { ...body, email: session.email, siteId: session.siteId };
    },
    captureClientId: true,
  });
}
