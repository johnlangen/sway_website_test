import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * POST /api/subscribe
 * Subscribes an email address to Attentive for marketing emails.
 *
 * Body: { "email": "customer@example.com" }
 * Returns: { success: true } or { error: "..." }
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: { email?: string };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const email = body.email?.trim().toLowerCase();

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address" },
      { status: 400 }
    );
  }

  const apiKey = process.env.ATTENTIVE_API_KEY;
  const signUpSourceId = process.env.ATTENTIVE_SIGNUP_SOURCE_ID;

  if (!apiKey) {
    console.error("[subscribe] Missing ATTENTIVE_API_KEY");
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500 }
    );
  }

  // Build request body: use signUpSourceId if available, otherwise
  // fall back to locale + subscriptionType (requires exactly one
  // API-type sign-up unit in the Attentive dashboard).
  const reqBody: Record<string, unknown> = { user: { email } };

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
      const text = await res.text();
      console.error("[subscribe] Attentive error:", res.status, text);
      return NextResponse.json(
        { error: "Subscription failed. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[subscribe] Network error:", err);
    return NextResponse.json(
      { error: "Could not reach subscription service" },
      { status: 502 }
    );
  }
}
