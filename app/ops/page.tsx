// Private first-party analytics dashboard (lib/ops/README.md), laid out like the Spavia site monitor
// (John 10/27: "make it look almost the same as the spavia tracking dashboard"). Open
// /api/ops/login/?key=… once (sets a cookie), then /ops/. 404 without it. Counts are Sway's own
// (lib/ops/record.ts): ad blockers and GA4 setup gaps don't hide anything here.
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { HideFloatingWidgets } from "@/app/components/HideFloatingWidgets";
import { OPS_COOKIE, opsKeyMatches, opsReport, opsTrend } from "@/lib/ops/report";
import { opsDay } from "@/lib/ops/record";
import { LOCATION_NAMES } from "@/lib/ops/labels";
import AutoRefresh from "./AutoRefresh";
import Dashboard from "./Dashboard";
import "./ops.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: { absolute: "Sway site monitor" },
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

const RANGES = [
  { days: 1, label: "That day" },
  { days: 7, label: "7 days" },
  { days: 28, label: "28 days" },
  { days: 90, label: "90 days" },
];
const LOCS = Object.keys(LOCATION_NAMES);

export default async function OpsPage({
  searchParams,
}: {
  searchParams: Promise<{ days?: string; loc?: string; to?: string; page?: string }>;
}) {
  if (!opsKeyMatches((await cookies()).get(OPS_COOKIE)?.value)) notFound();
  const q = await searchParams;
  const days = RANGES.some((r) => String(r.days) === q.days) ? Number(q.days) : 1;
  const loc = LOCS.includes(q.loc || "") ? q.loc! : "";
  const today = opsDay();
  const day = /^\d{4}-\d{2}-\d{2}$/.test(q.to || "") && q.to! <= today ? q.to! : today;
  const page = q.page && /^\/[A-Za-z0-9/_.~%-]{0,200}$/.test(q.page) ? q.page : "";
  // The bars end on the day shown, or today when the day is within the last two weeks
  const trendEnd = Date.parse(`${today}T12:00:00Z`) - Date.parse(`${day}T12:00:00Z`) < 14 * 86400000 ? today : day;
  const [report, trend] = await Promise.all([opsReport({ to: day, days, loc, page }), opsTrend(trendEnd, 14, loc)]);
  return (
    <>
      <HideFloatingWidgets />
      {day === today && days === 1 && <AutoRefresh seconds={60} />}
      <Dashboard
        report={report}
        trend={trend}
        day={day}
        today={today}
        days={days}
        loc={loc}
        page={page}
        ranges={RANGES}
        locs={LOCS.map((slug) => ({ slug, name: LOCATION_NAMES[slug] }))}
      />
    </>
  );
}
