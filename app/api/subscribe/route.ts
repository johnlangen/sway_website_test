import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * POST /api/subscribe
 * Subscribes an email (and optionally a phone number) to Attentive.
 *
 * Body: { "email": "customer@example.com", "phone"?: "+15551234567" }
 * Returns:
 *   { success: true, existing: false }  — new subscriber
 *   { success: true, existing: true }   — already subscribed
 *   { error: "..." }                    — failure
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+1\d{10}$/; // E.164 US format

export async function POST(req: Request) {
  let body: { email?: string; phone?: string };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const email = body.email?.trim().toLowerCase();
  const phone = body.phone?.trim();

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address" },
      { status: 400 }
    );
  }

  if (phone && !PHONE_RE.test(phone)) {
    return NextResponse.json(
      { error: "Please enter a valid phone number" },
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

  // Build user object with email and optionally phone
  const user: Record<string, string> = { email };
  if (phone) {
    user.phone = phone;
  }

  // Build request body: use signUpSourceId if available, otherwise
  // fall back to locale + subscriptionType (requires exactly one
  // API-type sign-up unit in the Attentive dashboard).
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

    const responseText = await res.text();

    if (!res.ok) {
      console.error("[subscribe] Attentive error:", res.status, responseText);
      return NextResponse.json(
        { error: "Subscription failed. Please try again." },
        { status: 502 }
      );
    }

    // Detect existing subscriber from Attentive's response body.
    // 202 with "PREVIOUSLY_CREATED" = already subscribed.
    let existing = false;
    try {
      const data = JSON.parse(responseText);
      const responses = Array.isArray(data?.subscriptionResponses)
        ? data.subscriptionResponses
        : [];
      existing = responses.some(
        (r: { subscriptionCreationStatus?: string }) =>
          r.subscriptionCreationStatus === "PREVIOUSLY_CREATED"
      );
    } catch {
      // If we can't parse, assume new subscriber
    }

    return NextResponse.json({ success: true, existing });
  } catch (err) {
    console.error("[subscribe] Network error:", err);
    return NextResponse.json(
      { error: "Could not reach subscription service" },
      { status: 502 }
    );
  }
}
