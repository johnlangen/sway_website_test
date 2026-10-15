"use client";

import ArrowMark from "@/app/components/ArrowMark";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { myAccountHrefForPath } from "@/lib/myAccount";

// Per-location footer contact info. The site is multi-location now, so the
// footer must not show Larimer's address/phone/hours on every page. Larimer
// info shows only on Larimer pages; the clubs show their own address, phone +
// contact email (hours TBD); brand-level pages (homepage, general
// services) show a neutral "find a location" block.
const FOOTER_LOCATIONS = {
  larimer: {
    name: "Sway Larimer",
    address: ["1428 Larimer St.", "Denver, CO 80202"],
    phone: "+1 303-476-6150",
    hours: [
      "Mon-Fri: 10:00 AM - 8:00 PM",
      "Sat: 9:00 AM - 6:00 PM",
      "Sun: 11:00 AM - 6:00 PM",
    ],
  },
  rino: {
    name: "Sway RiNo",
    address: ["3636 Blake St.", "Denver, CO 80205"],
    phone: "+1 303-225-0480",
    email: "contact@swayrino.com",
  },
  "central-park": {
    name: "Sway Central Park",
    address: ["2271 Clinton St.", "Aurora, CO 80010"],
    phone: "+1 303-293-5501",
    email: "contact@swaycentralpark.com",
  },
} as const;

function resolveFooterLocation(
  pathname: string | null,
): keyof typeof FOOTER_LOCATIONS | null {
  if (!pathname) return null;
  if (pathname.startsWith("/locations/denver-rino")) return "rino";
  if (pathname.startsWith("/locations/denver-central-park"))
    return "central-park";
  if (pathname.startsWith("/locations/denver-larimer")) return "larimer";
  return null; // brand-level pages -> neutral block
}

export default function Footer() {
  const pathname = usePathname();
  const locKey = resolveFooterLocation(pathname);
  const loc = locKey ? FOOTER_LOCATIONS[locKey] : null;
  return (
    <footer className="sway-footer">
      <div className="footer-topline">
        <p>Make room for feeling good.</p>
        <Link href="/book" className="sway-button sway-button-light">
          Find your next reset <span aria-hidden="true"><ArrowMark /></span>
        </Link>
      </div>
      <div className="footer-columns">
        <div>
          <Link href="/" aria-label="Sway home">
            <Image
              src="/assets/swaylogo.png"
              width={75}
              height={27}
              alt="Sway"
              className="w-[90px] h-auto"
            />
          </Link>
          <p className="footer-brand-note">
            A modern wellness club.
            <br />
            Part of the Spavia family.
          </p>
          <a
            href="https://www.instagram.com/swaywellnessclub/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram <span className="sr-only"> (opens in new tab)</span>
          </a>
          <a
            href="https://www.tiktok.com/@swaywellnessclub"
            target="_blank"
            rel="noopener noreferrer"
          >
            TikTok <span className="sr-only"> (opens in new tab)</span>
          </a>
        </div>
        <div>
          <h2>Your Sway</h2>
          {[
            ["Treatments", "/treatments"],
            ["Memberships", "/membership"],
            ["Offers", "/offers"],
            ["Gift Cards", "/gift-cards"],
            ["Locations", "/locations"],
          ].map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
          <a href={myAccountHrefForPath(pathname)}>My Account</a>
        </div>
        <div>
          <h2>A little more Sway</h2>
          {[
            ["Our Philosophy", "/swayway"],
            ["Group Events", "/group-events"],
            ["Date Night", "/date-night"],
            ["Couples Spa", "/couples-spa"],
            ["The Journal", "/blog"],
            ["Press", "/press"],
            ["Careers", "/careers"],
            ["Own a Sway", "/own"],
            ["Questions?", "/faq"],
          ].map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </div>
        <div>
          <h2>{loc ? loc.name : "Find your neighborhood"}</h2>
          {loc ? (
            <>
              <p>
                {loc.address[0]}
                <br />
                {loc.address[1]}
              </p>
              <a href={`tel:${loc.phone.replace(/[^+\d]/g, "")}`}>
                {loc.phone}
              </a>
              {"email" in loc && (
                <a href={`mailto:${loc.email}`}>{loc.email}</a>
              )}
              {"hours" in loc && (
                <p className="mt-4">
                  {loc.hours.map((h) => (
                    <span className="block" key={h}>
                      {h}
                    </span>
                  ))}
                </p>
              )}
              <Link href="/locations">Explore all locations </Link>
            </>
          ) : (
            <>
              {[
                ["Denver / Larimer Square", "denver-larimer"],
                ["Denver / RiNo", "denver-rino"],
                ["Aurora / Central Park", "denver-central-park"],
                ["Dallas / Knox-Henderson", "knox-henderson"],
                ["Washington, DC / Union Market", "union-market"],
              ].map(([name, slug]) => (
                <Link key={slug} href={`/locations/${slug}`}>
                  {name} <ArrowMark />
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Sway Wellness Spa</span>
        <span>Pause. Breathe. Rediscover.</span>
        <div>
          <Link href="/terms-and-conditions">Terms & Conditions</Link>
          <Link href="/accessibility">Accessibility</Link>
        </div>
      </div>
    </footer>
  );
}
