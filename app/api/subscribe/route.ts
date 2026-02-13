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

  if (!apiKey || !signUpSourceId) {
    console.error("[subscribe] Missing ATTENTIVE_API_KEY or ATTENTIVE_SIGNUP_SOURCE_ID");
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500 }
    );
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
        body: JSON.stringify({
          user: { email },
          signUpSourceId,
        }),
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
