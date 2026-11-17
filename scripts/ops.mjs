#!/usr/bin/env node
// Query Sway's first-party analytics (lib/ops, lib/ops/README.md) from the terminal.
//
//   node scripts/ops.mjs                       # last 7 days, all locations: summary
//   node scripts/ops.mjs --days 28 --loc denver-rino
//   node scripts/ops.mjs --funnel aescape      # one flow, with the option picked (e.g. Brady)
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
  console.log("\nby treatment");
  for (const [k, n] of tally((row) => row.item)) console.log(`  ${String(n).padStart(4)}  ${k}`);
  console.log("\njoins (newest first)");
  for (const row of rows) {
    const x = row.extra || {};
    const src = row.last ? `${row.last.source}/${row.last.medium}` : "direct";
    console.log(`  ${row.at.slice(0, 16)}  wants ${x.wanted_date ?? "?"} ${x.weekday ?? ""}  ${row.item}  ${x.specialist ? `staff ${x.staff_id}` : "any"}  ${x.days_out ?? "?"}d out  entry ${row.ref}  ${src}`);
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
