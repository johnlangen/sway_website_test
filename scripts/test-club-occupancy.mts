// Club occupancy: which appointments hold a seat or cabin. Run: npx tsx scripts/test-club-occupancy.mts
import assert from "node:assert/strict";
import { clientOverlap, holdsSeat, parseWall, peakOverlap } from "../lib/clubOccupancy";

let n = 0;
const ok = (name: string, fn: () => void) => { fn(); n++; console.log("ok ", name); };

ok("a checked-in or completed guest still holds their seat; a cancelled or no-show one does not", () => {
  for (const s of ["Booked", "Confirmed", "Arrived", "Completed"]) assert.equal(holdsSeat(s), true, s);
  for (const s of ["Cancelled", "LateCancelled", "NoShow", "Requested", "None", "", undefined, null, 3]) assert.equal(holdsSeat(s), false, String(s));
});

ok("Central Park 11/22: Glow 4 held by a checked-in guest is not free at 2:55 or 3:00, and is at 3:30", () => {
  // What Mindbody had on Glow 4 when the guest booked at 2:32 PM (the other guest was checked in).
  const glow4 = [
    { Status: "Arrived", StartDateTime: "2026-11-22T14:35:00", EndDateTime: "2026-11-22T15:00:00" },
    { Status: "Arrived", StartDateTime: "2026-11-22T15:00:00", EndDateTime: "2026-11-22T15:25:00" },
    { Status: "Cancelled", StartDateTime: "2026-11-22T15:30:00", EndDateTime: "2026-11-22T15:55:00" },
  ];
  const held = glow4.filter((a) => holdsSeat(a.Status)).map((a) => ({ start: a.StartDateTime, end: a.EndDateTime }));
  const busy = (hhmm: string) => { const s = parseWall(`2026-11-22T${hhmm}:00`); return peakOverlap(held, s, s + 25 * 60_000); };
  assert.equal(busy("14:55"), 1); // the window she first tried
  assert.equal(busy("15:00"), 1); // the window she tried next
  assert.equal(busy("15:30"), 0); // where the desk put her; the cancelled booking there holds nothing
});

ok("one guest cannot hold two overlapping Lounge visits; back-to-back and other guests are fine", () => {
  // 11/22: the guest held 2:55-4:10 and booked 3:00 five minutes later.
  const lounge = [
    { start: "2026-11-22T14:55:00", end: "2026-11-22T16:10:00", clientId: "8913" },
    { start: "2026-11-22T14:35:00", end: "2026-11-22T15:50:00", clientId: "2318" },
  ];
  const at = (hhmm: string) => { const s = parseWall(`2026-11-22T${hhmm}:00`); return [s, s + 75 * 60_000] as const; };
  assert.equal(clientOverlap(lounge, "8913", ...at("15:00"))?.start, "2026-11-22T14:55:00");
  assert.equal(clientOverlap(lounge, "8913", ...at("16:10")), null); // right after their visit ends
  assert.equal(clientOverlap(lounge, "8913", ...at("13:40")), null); // ends as theirs begins
  assert.equal(clientOverlap(lounge, "9999", ...at("15:00")), null); // someone else
  assert.equal(clientOverlap(lounge, "", ...at("15:00")), null);
});

console.log(`\n${n} checks passed`);
