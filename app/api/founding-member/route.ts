import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * POST /api/founding-member
 * Captures founding member interest (name, email, membership preference).
 *
 * Body: { "name": "Jane Doe", "email": "jane@example.com", "membership": "spa-club" }
 * Returns:
 *   { success: true }  — subscribed
 *   { error: "..." }   — failure
 *
 * TODO: Replace with Mindbody API integration for CC capture + account creation
 *       once Dallas studio is set up in Mindbody.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: { name?: string; email?: string; membership?: string };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();
  const membership = body.membership?.trim();

  if (!name) {
    return NextResponse.json(
      { error: "Please enter your name" },
      { status: 400 }
    );
  }

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address" },
      { status: 400 }
    );
  }

  // Log founding member interest for now
  console.log("[founding-member]", { name, email, membership });

  // Forward to Attentive for email marketing
  const apiKey = process.env.ATTENTIVE_API_KEY;
  const signUpSourceId = process.env.ATTENTIVE_SIGNUP_SOURCE_ID;

  if (apiKey) {
    const user: Record<string, string> = { email };
    const reqBody: Record<string, unknown> = { user };

    if (signUpSourceId) {
      reqBody.signUpSourceId = signUpSourceId;
    } else {
      reqBody.locale = "en-US";
      reqBody.subscriptionType = "MARKETING";
    }

    try {
      const res = await fetch(
        "https://api.attentivemobile.com/v1/subscriptions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        }
      );

      if (!res.ok) {
        const responseText = await res.text();
        console.error(
          "[founding-member] Attentive error:",
          res.status,
          responseText
        );
        // Don't fail the whole request — we still captured the data in logs
      }
    } catch (err) {
      console.error("[founding-member] Attentive network error:", err);
    }
  } else {
    console.warn("[founding-member] ATTENTIVE_API_KEY not set — skipping subscription");
  }

  // TODO: Also store in a persistent data source (Vercel KV, webhook, etc.)
  // so founding member interest data isn't lost in logs.

  return NextResponse.json({ success: true });
}
