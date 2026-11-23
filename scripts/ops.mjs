#!/usr/bin/env node
// Query Sway's first-party analytics (lib/ops, lib/ops/README.md) from the terminal.
//
//   node scripts/ops.mjs                       # last 7 days, all locations: summary
//   node scripts/ops.mjs --days 28 --loc denver-rino
//   node scripts/ops.mjs --funnel aescape      # one flow, with the option picked (e.g. Brady)
//   node scripts/ops.mjs --funnel membership   # the membership checkout, screen by screen
//   node scripts/ops.mjs --funnel checkout     # the checkout's detail: entry button, card trouble, time per screen, where they left
//   node scripts/ops.mjs --stopped [--loc denver-rino] [--days 30]   # WHO started a membership checkout and stopped (prints contact details)
//   node scripts/ops.mjs --clicks /aescape/brady-protocol/   # every click on one page
//   node scripts/ops.mjs --waitlist --days 90  # Larimer appointment waitlist joins: day/treatment wanted
//   node scripts/ops.mjs --json                # the whole report as JSON
//   node scripts/ops.mjs --link                # the dashboard login link (prints the key: keep private)
//
// The key is OPS_KEY, or derived from MINDBODY_API_KEY in .env.local exactly like the server does.
import { readFileSync } from "fs";
import { createHash } from "crypto";

const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim().replace(/^"|"$/g, "")])
);
const key = env.OPS_KEY || createHash("sha256").update(`sway-ops|${env.MINDBODY_API_KEY}`).digest("hex").slice(0, 32);
const args = process.argv.slice(2);
const arg = (name, dflt) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] ?? true : dflt;
};
const base = arg("base", "https://swaywellnessspa.com");

if (args.includes("--link")) {
  console.log(`${base}/api/ops/login/?key=${key}`);
  process.exit(0);
}

if (args.includes("--stopped")) {
  // Who started a membership checkout and hasn't joined, with the furthest screen they reached
  // (lib/foundingCheckouts.ts). Contact details: this prints them, so keep the output private.
  const q = new URLSearchParams({ key, all: "1" });
  if (arg("loc")) q.set("spa", arg("loc"));
  const res = await fetch(`${base}/api/ops/founding-checkouts/?${q}`);
  if (!res.ok) {
    console.error(`stopped checkouts ${res.status}`);
    process.exit(1);
  }
  const { rows } = await res.json();
  const since = Date.now() - Number(arg("days", 30)) * 86400000;
  const recent = rows.filter((r) => Date.parse(r.updatedAt) >= since);
  const open = recent.filter((r) => r.stage !== "joined");
  console.log(`membership checkouts, last ${arg("days", 30)} days${arg("loc") ? ` · ${arg("loc")}` : ""}: started ${recent.length} · joined ${recent.length - open.length} · stopped ${open.length}`);
  const by = {};
  for (const r of open) by[`${r.spa} · stopped after ${r.stage}`] = (by[`${r.spa} · stopped after ${r.stage}`] || 0) + 1;
  for (const [k, v] of Object.entries(by).sort()) console.log(`  ${String(v).padStart(4)}  ${k}`);
  console.log("\nstopped (newest first)");
  for (const r of open)
    console.log(`  ${r.updatedAt.slice(0, 16)}  ${r.spa.padEnd(20)} ${r.stage.padEnd(8)} ${[r.firstName, r.lastName].filter(Boolean).join(" ") || "(no name yet)"}  ${r.email}${r.phone ? `  ${r.phone}` : ""}`);
  process.exit(0);
}

const qs = new URLSearchParams({ key, days: String(arg("days", 7)) });
if (arg("loc")) qs.set("loc", arg("loc"));
if (arg("to")) qs.set("to", arg("to"));
if (arg("clicks") && arg("clicks") !== true) qs.set("page", arg("clicks"));
const res = await fetch(`${base}/api/ops/report/?${qs}`);
if (!res.ok) {
  console.error(`report ${res.status}`);
  process.exit(1);
}
const r = await res.json();
if (args.includes("--json")) {
  console.log(JSON.stringify(r, null, 2));
  process.exit(0);
}

if (args.includes("--waitlist")) {
  // Successful joins only (server ledger, after Mindbody confirms). No names: match ref to the
  // desk's Appointment Waitlist screen. The report returns the newest 200 ledger rows.
  const rows = r.ledger.filter((row) => row.flow === "lead" && /^waitlist-/.test(row.item || ""));
  console.log(`${r.range.from} → ${r.range.to} · waitlist joins ${rows.length}`);
  const tally = (f) => Object.entries(rows.reduce((m, row) => ((m[f(row)] = (m[f(row)] || 0) + 1), m), {})).sort((a, b) => b[1] - a[1]);
  console.log("\nby weekday wanted");
  for (const [k, n] of tally((row) => row.extra?.weekday ?? "?")) console.log(`  ${String(n).padStart(4)}  ${k}`);
  console.log("\nby time of day wanted");
  for (const [k, n] of tally((row) => row.extra?.time_pref ?? "any")) console.log(`  ${String(n).padStart(4)}  ${k}`);
  console.log("\nby treatment");
  for (const [k, n] of tally((row) => row.item)) console.log(`  ${String(n).padStart(4)}  ${k}`);
  console.log("\njoins (newest first)");
  for (const row of rows) {
    const x = row.extra || {};
    const src = row.last ? `${row.last.source}/${row.last.medium}` : "direct";
    console.log(`  ${row.at.slice(0, 16)}  wants ${x.wanted_date ?? "?"} ${x.weekday ?? ""} ${x.time_pref ?? "any"}  ${row.item}  ${x.specialist ? `staff ${x.staff_id}` : "any"}  ${x.days_out ?? "?"}d out  entry ${row.ref}  ${src}`);
  }
  process.exit(0);
}

const pct = (a, b) => (b ? `${Math.round((a / b) * 100)}%` : "-");
console.log(`${r.range.from} → ${r.range.to}${r.range.loc ? ` · ${r.range.loc}` : ""}`);
console.log(
  `visitors ${r.totals.visitors} · views ${r.totals.views} · clicks ${r.totals.clicks} · completed ${r.totals.completions} · membership value $${r.totals.completedValue}`
);
const only = arg("funnel");
for (const f of r.funnels.filter((f) => !only || f.flow === only)) {
  const first = f.steps[0]?.visitors || 0;
  console.log(`\n${f.flow}`);
  for (const s of f.steps) console.log(`  ${s.step.padEnd(12)} ${String(s.visitors).padStart(5)}  ${pct(s.visitors, first).padStart(4)}`);
  console.log(`  ${"completed".padEnd(12)} ${String(f.completed).padStart(5)}  ${pct(f.completed, first).padStart(4)}  (server)`);
  if (f.variants.length > 1 || only)
    for (const v of f.variants) console.log(`    option ${String(v.variant).padEnd(16)} started ${v.first}  done ${v.done}  completed ${v.completed}`);
}
if (only === "checkout" && r.checkout?.length) {
  // Times each thing happened, split by its variant (the plan, the card field, or the time bucket)
  console.log("\ncheckout detail (times it happened · by variant)");
  const steps = [...new Set(r.checkout.map((x) => x.step))].sort();
  for (const step of steps) {
    const rows = r.checkout.filter((x) => x.step === step).sort((a, b) => b.n - a.n);
    console.log(`  ${step.padEnd(18)} ${String(rows.reduce((n, x) => n + x.n, 0)).padStart(5)}   ${rows.map((x) => `${x.variant || "-"} ${x.n}`).join(" · ")}`);
  }
}
if (!only) {
  console.log("\nlandings by source");
  for (const l of r.landings.slice(0, 15)) console.log(`  ${String(l.n).padStart(5)}  ${l.source} / ${l.medium}${l.campaign ? ` · ${l.campaign}` : ""}`);
  console.log("\ntop pages (views / visitors)");
  for (const p of r.pages.slice(0, 15)) console.log(`  ${String(p.views).padStart(5)} ${String(p.visitors).padStart(5)}  ${p.page}`);
}
if (arg("clicks") || !only) {
  console.log(`\nclicks${arg("clicks") && arg("clicks") !== true ? ` on ${arg("clicks")}` : ""}`);
  for (const c of r.clicks.slice(0, arg("clicks") ? 80 : 20))
    console.log(`  ${String(c.n).padStart(5)}  ${c.page}  [${c.type}] ${c.target} ${c.label ? `"${c.label}"` : ""}`);
}
if (r.shown.length && !only) {
  console.log("\nmessages guests saw");
  for (const s of r.shown.slice(0, 15)) console.log(`  ${String(s.n).padStart(4)}  ${s.flow}/${s.step}: ${s.message}`);
}
