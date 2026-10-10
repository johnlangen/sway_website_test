import Image from "next/image";
import Link from "next/link";

const offers = [
  {
    id: "massage-facial",
    name: "Massage or facial",
    price: "$99",
    duration: "50 min · Essential Signature",
    regular: "$139",
    description:
      "$40 off your first massage or facial, any tier. Choose light-to-medium Signature Massage, deeper work, or a facial made for your skin.",
    tiers: "Essential Signature $99 · Premier $129 · Ultimate $159",
    image: "/assets/homepage-massage.jpg",
    alt: "A private massage treatment room at Sway Larimer",
    href: "/locations/denver-larimer/book",
    action: "Book massage or facial",
    code: "FTVO40",
    days: "Monday–Friday",
  },
  {
    id: "aescape",
    name: "Aescape robot massage",
    price: "$99",
    duration: "60 min",
    regular: "$139",
    description:
      "An hour to switch off. Set your pressure and focus areas for a personalized robot massage, with compression apparel provided at check-in.",
    tiers: "First-visit offer applies to the 60-minute session.",
    image: "/assets/aescapeblog7.jpg",
    alt: "The Aescape robot massage experience at Sway",
    href: "/locations/denver-larimer/book-aescape",
    action: "Book Aescape",
    code: "FTVO40",
    days: "Monday–Friday",
  },
  {
    id: "remedy",
    name: "Remedy Room",
    price: "$25",
    duration: "40 min",
    regular: "$49",
    description:
      "A guided reset through traditional sauna, cold plunge, compression therapy, and LED light therapy. Four experiences, one recovery circuit.",
    tiers: "Your first recovery circuit at member pricing.",
    image: "/assets/homepage-remedy.jpg",
    alt: "The Remedy Room at Sway Larimer",
    href: "/locations/denver-larimer/book-remedy-room",
    action: "Book Remedy Room",
    code: "FTVORR",
    days: "Any day",
  },
];

export default function FirstVisitOffers({
  onChoose,
}: {
  onChoose?: () => void;
}) {
  return (
    <>
      <nav
        className="sway-offer-quick-links"
        aria-label="Jump to a first-visit offer"
      >
        {offers.map((offer) => (
          <a key={offer.id} href={`#${offer.id}`}>
            {offer.name}
            <span>{offer.price} ↓</span>
          </a>
        ))}
      </nav>
      <div className="sway-offer-grid">
        {offers.map((offer, index) => (
          <article className="sway-offer" key={offer.id} id={offer.id}>
            <div className="sway-offer-image">
              <Image
                src={offer.image}
                alt={offer.alt}
                fill
                sizes="(max-width: 760px) 100vw, 33vw"
                className="object-cover"
              />
              <span>0{index + 1} / First visit</span>
            </div>
            <div className="sway-offer-copy">
              <h3>{offer.name}</h3>
              <div className="sway-offer-price">
                {offer.price}
                <span>
                  {offer.duration}
                  <small>Regularly {offer.regular}</small>
                </span>
              </div>
              <p>{offer.description}</p>
              <p className="sway-offer-tier">{offer.tiers}</p>
              <div className="sway-offer-terms">
                <strong>Locals only · First-time guests</strong>
                <span>
                  {offer.days} · Mention <b>{offer.code}</b> at check-in.
                </span>
              </div>
              <Link
                href={offer.href}
                onClick={onChoose}
                className="sway-button"
              >
                {offer.action}
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

export function OfferRedemption() {
  return (
    <section className="sway-redemption" aria-labelledby="redemption-heading">
      <div>
        <p className="sway-eyebrow">A little know-before-you-go</p>
        <h2 id="redemption-heading">Your first visit, made easy.</h2>
      </div>
      <ol>
        <li>
          <span>01</span>
          <div>
            <h3>Choose your experience.</h3>
            <p>
              Book the service and time that work for you. Check the offer’s
              location and eligible days before booking.
            </p>
          </div>
        </li>
        <li>
          <span>02</span>
          <div>
            <h3>Bring your offer code.</h3>
            <p>
              Mention the code at check-in. Your first-visit price is applied at
              checkout; you don’t enter a code online.
            </p>
          </div>
        </li>
        <li>
          <span>03</span>
          <div>
            <h3>Give yourself a little time.</h3>
            <p>
              Arrive 15 minutes early so you can settle in before your session
              begins.
            </p>
          </div>
        </li>
      </ol>
    </section>
  );
}
