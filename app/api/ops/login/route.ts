import { NextResponse } from "next/server";
import { OPS_COOKIE, opsKeyMatches } from "@/lib/ops/report";

/**
 * Opens the private analytics dashboard: /api/ops/login/?key=… sets an httpOnly cookie and goes to
 * /ops/, so the key doesn't stay in the address bar. Wrong or missing key → 404.
 */
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const key = url.searchParams.get("key");
  if (!opsKeyMatches(key)) return NextResponse.json({ error: "not found" }, { status: 404 });
  const res = NextResponse.redirect(new URL("/ops/", url), 303);
  res.cookies.set(OPS_COOKIE, key!, { httpOnly: true, secure: true, sameSite: "strict", path: "/", maxAge: 60 * 60 * 24 * 90 });
  res.headers.set("Referrer-Policy", "no-referrer");
  return res;
}
