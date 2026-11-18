"use client";

import ArrowMark from "@/app/components/ArrowMark";

/**
 * ClubOffersPage — shared offers page for the Sway Wellness Club
 * locations (RiNo + Central Park).
 *
 * One first-visit offer per club: $25 first Remedy Lounge visit
 * (code FTVORL, regularly $49, locals only). Mirrors the Larimer
 * FTVORR redemption model: the booking flow doesn't capture promo
 * codes, so guests book online and mention the code at check-in.
 * Membership ($129/mo, contract 143) is the upsell anchor below,
 * not an intro offer.
 *
 * Styling follows the club pages (cream #F7F4E9 / deep green #113D33,
 * rounded-3xl cards), not the dark Larimer offers page.
 */

import Link from "next/link";
import Image from "next/image";
import { OfferRedemption } from "./FirstVisitOffers";
import { CLUB_LOCATIONS } from "@/lib/clubLocations";

/* First massage or facial at a club with servicesLive (RiNo since 11/18/2026): Larimer's FTVO40 terms. */
export const CLUB_TREATMENT_OFFER_CODE = "FTVO40";

export const CLUB_OFFER_CODE = "FTVORL";
export const CLUB_OFFER_PRICE = 25;
export const CLUB_LOUNGE_DROP_IN = 49;
export const CLUB_MEMBERSHIP_PRICE = 129;

type ClubOffersConfig = {
  shortName: string; // "Sway RiNo"
  areaLine: string; // hero eyebrow
  bookHref: string; // lounge booking flow
  membershipHref: string;
  locationHref: string;
  phone: string;
  phoneDigits: string;
  offerImage: string;
  offerImageAlt: string;
  /** Real modalities at this club only. */
  loungeLine: string;
  /** FTVORL-CP-PAUSE: hides the first-visit offer while an amenity is
      down (one-shot first impressions shouldn't land on a degraded
      Lounge). Remove the flag to restore the offer. */
  offerPaused?: boolean;
};

const CLUB_CONFIG: Record<
  "denver-rino" | "denver-central-park",
  ClubOffersConfig
> = {
  "denver-rino": {
    shortName: "Sway RiNo",
    areaLine: "Sway Wellness Club · RiNo Art District, Denver",
    bookHref: "/locations/denver-rino/book-remedy-lounge",
    membershipHref: "/locations/denver-rino/membership",
    locationHref: "/locations/denver-rino",
    phone: "(303) 225-0480",
    phoneDigits: "13032250480",
    offerImage: "/assets/rino1.jpeg",
    offerImageAlt: "Cold plunge and recovery pool at Sway RiNo",
    loungeLine:
      "Traditional dry sauna, infrared sauna cabins, cold plunge, and compression therapy.",
  },
  "denver-central-park": {
    shortName: "Sway Central Park",
    areaLine: "Sway Wellness Club · Central Park, Denver",
    bookHref: "/locations/denver-central-park/book-remedy-lounge",
    membershipHref: "/locations/denver-central-park/membership",
    locationHref: "/locations/denver-central-park",
    phone: "(303) 293-5501",
    phoneDigits: "13032935501",
    offerImage: "/assets/centralpark1.jpg",
    offerImageAlt: "Recovery pools at Sway Central Park",
    loungeLine:
      "Traditional dry sauna, infrared sauna cabins, cold plunges, a warm soak, and compression therapy.",
  },
};

export default function ClubOffersPage({
  clubKey,
}: {
  clubKey: "denver-rino" | "denver-central-park";
}) {
  const cfg = CLUB_CONFIG[clubKey];
  const servicesLive = CLUB_LOCATIONS[clubKey].servicesLive;
  const treatmentBook = `${cfg.locationHref}/book`;

  return (
    <div className="sway-offers-page">
      <section className="sway-campaign-intro sway-club-campaign">
        <div>
          <p className="sway-eyebrow">{cfg.areaLine}</p>
          <Link href="/offers?choose=1" className="sway-text-link">
            Change location
          </Link>
          <h1>
            {cfg.offerPaused ? (
              <>
                A little time.
                <br />A full reset.
              </>
            ) : (
              <>
                Your first reset.
                <br />
                Just $25.
              </>
            )}
          </h1>
          <p>
            {cfg.loungeLine} Take your time with a 75-minute Remedy Lounge
            session at {cfg.shortName}.
          </p>
          {!cfg.offerPaused && (
            <>
              <p className="sway-campaign-eligibility">
                Locals only · First-time guests · Any day · Regularly $49.
                <br />
                Mention <strong>FTVORL</strong> at check-in. Your offer is
                applied at checkout.
              </p>
              <Link href={cfg.bookHref} className="sway-button">
                Book your $25 first visit <span aria-hidden="true"><ArrowMark /></span>
              </Link>
            </>
          )}
          {cfg.offerPaused && (
            <a href="#club-status" className="sway-button">
              View current availability <span aria-hidden="true"><ArrowMark direction="down" /></span>
            </a>
          )}
        </div>
        <div className="sway-campaign-photo">
          <Image
            src={cfg.offerImage}
            alt={cfg.offerImageAlt}
            fill
            priority
            sizes="(max-width: 760px) 100vw, 45vw"
            className="object-cover"
          />
          <span>75 minutes for you · Remedy Lounge</span>
        </div>
      </section>
      {servicesLive && (
        <section className="sway-offers-section" id="massage-facial" aria-labelledby="club-ftvo-heading">
          <div className="sway-section-heading">
            <div>
              <p className="sway-eyebrow">New at {cfg.shortName}</p>
              <h2 id="club-ftvo-heading">Your first massage or facial, $40 off.</h2>
            </div>
            <p>
              Any tier, from a light to medium Signature Massage to Deep Tissue or a facial made for your skin.
            </p>
          </div>
          <article className="sway-offer grid md:grid-cols-2">
            <div className="sway-offer-image !h-[260px] md:!h-auto md:min-h-[360px]">
              <Image
                src="/assets/founding-massage-lamp.jpg"
                alt={`A massage therapist working on a guest's back by lamplight at ${cfg.shortName}`}
                fill
                sizes="(max-width: 760px) 100vw, 50vw"
                className="object-cover"
              />
              <span>First visit · Massage or facial</span>
            </div>
            <div className="sway-offer-copy">
              <h3>Massage or facial</h3>
              <div className="sway-offer-price">
                $99
                <span>
                  50 min · Essential Signature
                  <small>Regularly $139</small>
                </span>
              </div>
              <p>$40 off your first massage or facial at any tier.</p>
              <p className="sway-offer-tier">Essential $99 · Premier $129 · Ultimate $159</p>
              <div className="sway-offer-terms">
                <strong>Locals only · First-time guests</strong>
                <span>
                  Monday–Friday · Mention <b>{CLUB_TREATMENT_OFFER_CODE}</b> at check-in.
                </span>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href={`${treatmentBook}?category=massage`} data-track="club-offer-ftvo-massage" className="sway-button">
                  Book a massage <span aria-hidden="true"><ArrowMark /></span>
                </Link>
                <Link href={`${treatmentBook}?category=facial`} data-track="club-offer-ftvo-facial" className="sway-button">
                  Book a facial <span aria-hidden="true"><ArrowMark /></span>
                </Link>
              </div>
            </div>
          </article>
        </section>
      )}
      {cfg.offerPaused && (
        <section className="sway-offers-section" id="club-status">
          <div className="sway-maintenance-note">
            <p className="sway-eyebrow">Before you visit Central Park</p>
            <h2>A quick amenity update.</h2>
            <p>
              One of our cold plunges and the warm soak are temporarily down for
              maintenance. The $25 first-visit offer is paused until everything
              returns.
            </p>
            <p>
              The saunas, remaining cold plunges, and compression therapy are
              open as usual for $49 drop-in sessions.
            </p>
            <Link href={cfg.bookHref} className="sway-button">
              Book a $49 drop-in <span aria-hidden="true"><ArrowMark /></span>
            </Link>
          </div>
        </section>
      )}
      <section className="sway-offers-section">
        <div className="sway-section-heading">
          <div>
            <p className="sway-eyebrow">Find your rhythm</p>
            <h2>A visit. A ritual. Your choice.</h2>
          </div>
          <p>
            No membership needed to get started.
            <br />
            Choose what fits the way you recover.
          </p>
        </div>
        <div className="sway-visit-options">
          <div>
            <p className="sway-eyebrow">Come when you need it</p>
            <h3>Drop in.</h3>
            <p className="sway-visit-price">
              $49 <span>/ 75-minute session</span>
            </p>
            <p>
              A full Remedy Lounge session. Reserve a time and explore the
              available recovery amenities at your own pace.
            </p>
            <Link href={cfg.bookHref} className="sway-text-link">
              Book a session
            </Link>
          </div>
          <div>
            <p className="sway-eyebrow">Make room for a routine</p>
            <h3>Belong.</h3>
            <p className="sway-visit-price">
              $129 <span>/ month</span>
            </p>
            <p>
              Unlimited Remedy Lounge access, one 75-minute session per day.
              Month-to-month, with no enrollment fee.
            </p>
            <Link href={cfg.membershipHref} className="sway-text-link">
              Explore membership
            </Link>
          </div>
        </div>
      </section>
      {!cfg.offerPaused && <OfferRedemption />}
      <section className="sway-offer-close">
        <p className="sway-eyebrow">Your neighborhood recovery space</p>
        <h2>See you at {cfg.shortName.replace("Sway ", "")}.</h2>
        <p>Arrive 15 minutes early and give yourself time to settle in.</p>
        <div>
          <Link href={cfg.locationHref} className="sway-text-link">
            Plan your visit
          </Link>
          <a href={`tel:+${cfg.phoneDigits}`} className="sway-text-link">
            {cfg.phone} <ArrowMark />
          </a>
          <Link href="/gift-cards" className="sway-text-link">
            Gift cards
          </Link>
        </div>
      </section>
    </div>
  );
}
