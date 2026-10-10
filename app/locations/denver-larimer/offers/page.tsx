import Link from "next/link";
import Image from "next/image";
import FirstVisitOffers, {
  OfferRedemption,
} from "../../../components/FirstVisitOffers";
import GoogleReviews, {
  ReviewBadge,
  ClassPassBadge,
} from "../../../components/GoogleReviews";

export default function LarimerOffersPage() {
  return (
    <div className="sway-offers-page">
      <section className="sway-campaign-intro">
        <div>
          <p className="sway-eyebrow">
            Sway Larimer · Denver{" "}
            <Link href="/offers?choose=1">Change location ↗</Link>
          </p>
          <h1>
            Your first visit.
            <br />A lasting feeling.
          </h1>
          <p>
            Massage or facial from $99. A 60-minute Aescape session for $99. A
            Remedy Room reset for $25. Find your first experience at Larimer
            Square.
          </p>
          <a href="#first-visit" className="sway-button">
            Find your first experience <span aria-hidden="true">↓</span>
          </a>
          <p className="sway-campaign-eligibility">
            Locals only · First-time guests. Massage, facial, and 60-minute
            Aescape offers valid Monday–Friday. Remedy Room offer valid any day.
          </p>
        </div>
        <div className="sway-campaign-photo">
          <Image
            src="/assets/homepage_photo_outside.jpg"
            alt="Sway Wellness Spa on Denver’s Larimer Square"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 40vw"
            className="object-cover"
          />
          <span>1428 Larimer St · Denver</span>
        </div>
      </section>
      <section id="first-visit" className="sway-offers-section">
        <div className="sway-section-heading">
          <div>
            <p className="sway-eyebrow">A little something for you</p>
            <h2>Choose what feels right.</h2>
          </div>
          <p>
            Book online. Mention your code at check-in.
            <br />
            We apply your first-visit price at checkout.
          </p>
        </div>
        <FirstVisitOffers />
      </section>
      <OfferRedemption />
      <section className="sway-offer-membership">
        <div>
          <p className="sway-eyebrow">Make the feeling a regular thing</p>
          <h2>
            One visit is just
            <br />
            the beginning.
          </h2>
          <p>
            Memberships from $99/month unlock member pricing on massages and
            facials, 50% off boost add-ons, $25 Remedy Room sessions, and access
            to the private member lounge.
          </p>
          <Link
            href="/locations/denver-larimer/membership"
            className="sway-button sway-button-light"
          >
            Explore membership <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="sway-offer-membership-image">
          <Image
            src="/assets/membership_background_logo.jpg"
            alt="Inside the Sway member lounge"
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>
      <section className="sway-offers-section">
        <div className="flex flex-wrap gap-6 mb-10">
          <ReviewBadge />
          <ClassPassBadge />
        </div>
        <GoogleReviews />
      </section>
      <section className="sway-offer-close">
        <p className="sway-eyebrow">We’re here to help</p>
        <h2>A little guidance? Just ask.</h2>
        <a href="tel:13034766150" className="sway-text-link">
          (303) 476-6150 ↗
        </a>
        <div>
          <Link href="/locations/denver-larimer" className="sway-text-link">
            Plan your visit ↗
          </Link>
          <Link
            href="/locations/denver-larimer/gift-cards"
            className="sway-text-link"
          >
            Give the feeling ↗
          </Link>
        </div>
      </section>
    </div>
  );
}
