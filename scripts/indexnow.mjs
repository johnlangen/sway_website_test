// Tells Bing (and the other IndexNow search engines) which pages changed, so they re-read them now
// instead of whenever they next crawl. Bing also feeds ChatGPT's and Copilot's web answers.
//   node scripts/indexnow.mjs                       the gift card pages + the gift card guide
//   node scripts/indexnow.mjs /some/page/ /other/   any pages (paths on swaywellnessspa.com)
// Run AFTER the deploy is live. The key is not a secret: it is the public file
// https://swaywellnessspa.com/c93b4a20b8e0706c3a9e86fa2eed3bdb.txt that proves the request comes from this site.
const HOST = "swaywellnessspa.com";
const KEY = "c93b4a20b8e0706c3a9e86fa2eed3bdb";
const GIFT_PAGES = [
  "/gift-cards/",
  "/holiday-gift-cards/",
  "/locations/denver-larimer/gift-cards/",
  "/locations/denver-rino/gift-cards/",
  "/locations/denver-central-park/gift-cards/",
  "/blog/how-sway-gift-cards-work/",
  "/blog/",
  "/",
];
const paths = process.argv.slice(2).length ? process.argv.slice(2) : GIFT_PAGES;
const urlList = paths.map((p) => `https://${HOST}${p.startsWith("/") ? p : "/" + p}`);
const keyFile = await fetch(`https://${HOST}/${KEY}.txt`, { cache: "no-store" });
if (!keyFile.ok || (await keyFile.text()).trim() !== KEY) {
  console.error("The key file isn't live yet (deploy first):", keyFile.status);
  process.exit(1);
}
const r = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
// 200 = received, 202 = received and the key is still being checked; both are fine
console.log("IndexNow:", r.status, r.status === 200 || r.status === 202 ? "sent" : await r.text());
for (const u of urlList) console.log("  ", u);
