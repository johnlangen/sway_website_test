/**
 * The holiday gift season, Nov 1 to Dec 25 (John, 10/28, same as the Spavia site): Holiday is the
 * first occasion after All and its designs lead the gallery, so a holiday design is the default.
 * Mountain-time days (the server runs in UTC). Safe to import in the browser.
 */
export function holidaySeason(at = new Date()): boolean {
  const md = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Denver", month: "2-digit", day: "2-digit" }).format(at);
  return md >= "11-01" && md <= "12-25";
}
