"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function SwayLarimerPage() {
  // Persist location selection for downstream pages (book/offers/gift-cards/membership hubs)
  useEffect(() => {
    try {
      const payload = {
        slug: "denver-larimer",
        name: "Sway Larimer",
        city: "Denver",
        state: "CO",
      };
      localStorage.setItem("sway_selected_location", JSON.stringify(payload));
      document.cookie = `sway_loc=denver-larimer; path=/; max-age=${60 * 60 * 24 * 365}`;
    } catch {}
  }, []);

  // Location constants
  const loc = {
    name: "Sway Larimer",
    street: "1428 Larimer St.",
    city: "Denver",
    state: "CO",
    zip: "80202",
    phone: "+1 303-476-6150",
    phoneDigits: "13034766150",
    latitude: 39.74794,
    longitude: -104.99844,
    url: "https://swaywellnessspa.com/locations/denver-larimer",
    heroImage: "/assets/homepage_photo_outside.png",
    // Replace social handles when live:
    sameAs: [
      "https://www.instagram.com/swaywellnessclub",
      "https://www.tiktok.com/@swaywellnessclub",
      "https://www.facebook.com/swaywellnessclub",
    ],
    hours: {
      monFri: { opens: "10:00", closes: "20:00" },
      sat: { opens: "09:00", closes: "18:00" },
      sun: { opens: "11:00", closes: "18:00" },
    },
    mapUrl:
      "https://www.google.com/maps?q=1428+Larimer+St,+Denver,+CO+80202",
    neighborhoods: "Larimer Square / LoDo",
    landmarks: "Union Station, 16th Street Mall, Dairy Block",
  };

  // JSON-LD: LocalBusiness (DaySpa) with openingHoursSpecification
  const localBizJsonLd = {
    "@context": "https://schema.org",
    "@type": "DaySpa",
    name: loc.name,
    url: loc.url,
    image: [`https://swaywellnessspa.com${loc.heroImage}`],
    telephone: loc.phone,
    priceRange: "$$",
    sameAs: loc.sameAs,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.street,
      addressLocality: loc.city,
      addressRegion: loc.state,
      postalCode: loc.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: loc.latitude,
      longitude: loc.longitude,
    },
    hasMap: loc.mapUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "https://schema.org/Monday",
          "https://schema.org/Tuesday",
          "https://schema.org/Wednesday",
          "https://schema.org/Thursday",
          "https://schema.org/Friday",
        ],
        opens: loc.hours.monFri.opens,
        closes: loc.hours.monFri.closes,
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["https://schema.org/Saturday"],
        opens: loc.hours.sat.opens,
        closes: loc.hours.sat.closes,
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["https://schema.org/Sunday"],
        opens: loc.hours.sun.opens,
        closes: loc.hours.sun.closes,
      },
    ],
    areaServed: {
      "@type": "City",
      name: "Denver",
    },
    // Optional: booking deep links
    potentialAction: [
      {
        "@type": "ReserveAction",
        target:
          "https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=-9",
        name: "Book Online",
      },
      {
        "@type": "ReserveAction",
        target:
          "https://app.aescape.com/map/location-details?location-id=2bb3fffd-f6a7-44b5-92ad-991032a535aa",
        name: "Book Aescape Robot Massage",
      },
      {
        "@type": "CommunicateAction",
        target: `tel:${loc.phoneDigits}`,
        name: "Call to Book",
      },
    ],
  };

  // JSON-LD: FAQPage (trimmed to the most valuable Q&As)
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What’s unique about Sway?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sway blends innovative technology with traditional treatments to create a modern wellness club focused on accessibility, affordability, and total body health.",
        },
      },
      {
        "@type": "Question",
        name: "How can I schedule a treatment?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can book online, through our app, by phone at (303) 476-6150, or walk in (we recommend booking ahead due to high demand).",
        },
      },
      {
        "@type": "Question",
        name: "Where is the best place to park?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We validate parking for the 1st hour at the Larimer Square Parking Garage (1422 Market St, Denver, CO 80202). After that, standard rates apply.",
        },
      },
    ],
  };

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://swaywellnessspa.com/" },
      { "@type": "ListItem", position: 2, name: "Locations", item: "https://swaywellnessspa.com/locations" },
      { "@type": "ListItem", position: 3, name: "Denver – Larimer", item: loc.url },
    ],
  };

  return (
    <main className="bg-[#F7F4E9] text-[#113D33] min-h-screen font-vance">
      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBizJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero / Header */}
      <section className="px-6 pt-28 md:pt-36 pb-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold">Sway Larimer</h1>
            <div className="mt-3 text-lg">
              <div>{loc.street}</div>
              <div>
                {loc.city}, {loc.state} {loc.zip}
              </div>
              <div className="mt-2">
                Phone:{" "}
                <a href={`tel:${loc.phoneDigits}`} className="underline">
                  {loc.phone}
                </a>
              </div>
              <div className="mt-3">
                <span
                  className="inline-block rounded-full px-3 py-1 text-sm"
                  style={{ backgroundColor: "#b6cfbf", color: "#113D33" }}
                >
                  Open
                </span>
              </div>

              <p className="mt-4 max-w-xl leading-relaxed">
                Welcome to <strong>Sway Larimer</strong>, our downtown Denver wellness club on historic{" "}
                <strong>Larimer Square</strong>. Pop in before dinner, reset after work, or make a ritual of your monthly{" "}
                <strong>facial</strong>, <strong>massage</strong>, or time in the <strong>Remedy Room</strong>.
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap gap-3">

            {/* Standout BOOK NOW CTA */}
            <Link
              href="/locations/denver-larimer/book"
              className="inline-block bg-[#113D33] text-white px-6 py-3 rounded-full text-base font-semibold shadow-sm hover:bg-[#0e322a] transition"
            >
              Book Now
            </Link>

            <Link
              href="/membership"
              className="inline-block bg-[#113D33] text-white px-5 py-3 rounded-full hover:opacity-90"
            >
              Join the Club
            </Link>

            <Link
              href="/gift-cards"
              className="inline-block bg-white text-[#113D33] px-5 py-3 rounded-full border border-[#113D33]/20 hover:bg-[#fffdf8]"
            >
              Gift Cards
            </Link>

            <Link
              href="/offers"
              className="inline-block bg-white text-[#113D33] px-5 py-3 rounded-full border border-[#113D33]/20 hover:bg-[#fffdf8]"
            >
              Offers
            </Link>
            </div>

          </div>

          {/* Hero image */}
          <div className="rounded-2xl overflow-hidden shadow border border-black/5 bg-white">
            <img
              src={loc.heroImage}
              alt="Sway Larimer treatment hallway on Larimer Square, Denver"
              className="w-full h-[320px] md:h-[420px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Hours + Details */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow">
            <h2 className="text-xl font-bold mb-3">Hours</h2>
            <ul className="space-y-1 text-sm" aria-label="Business hours">
              <li>Mon–Fri: 10:00 AM – 8:00 PM</li>
              <li>Sat: 9:00 AM – 6:00 PM</li>
              <li>Sun: 11:00 AM – 6:00 PM</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <h2 className="text-xl font-bold mb-3">Details</h2>
            <ul className="space-y-1 text-sm">
              <li>
                <strong>Neighborhood:</strong> {loc.neighborhoods}
              </li>
              <li>
                <strong>Landmarks:</strong> {loc.landmarks}
              </li>
              <li>
                <strong>Map:</strong>{" "}
                <a className="underline" href={loc.mapUrl} target="_blank" rel="noopener noreferrer">
                  View on Google Maps
                </a>
              </li>
              <li>
                <strong>Phone:</strong>{" "}
                <a href={`tel:${loc.phoneDigits}`} className="underline">
                  {loc.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-2xl p-6 shadow md:col-span-2">
            <h2 className="text-xl font-bold mb-4">FAQs</h2>

            {/* The Sway Way */}
            <details className="mb-3">
              <summary className="font-semibold">What’s unique about Sway?</summary>
              <p className="mt-2 text-sm">
                Drawing from cultural hubs like Barcelona and NYC, Sway blends innovative technology with traditional
                treatments to offer a fresh, modern wellness club to enhance your well-being. At Sway, we believe in total
                body health for long-term optimization. Designed to be a luxurious yet accessible wellness club you can
                rejuvenate amid the city hustle. With a focus on affordability, personalized service, and scientific-backed
                treatments, we offer a holistic approach to well-being. Sway will become your happy place that you can’t
                live without. This time is for you.
              </p>
            </details>

            <details className="mb-3">
              <summary className="font-semibold">What product lines do you use in your services?</summary>
              <p className="mt-2 text-sm">
                We use high-quality, in-demand products such as Eminence, Dr. Dennis Gross, and CauseMedic.
              </p>
            </details>

            {/* Scheduling */}
            <details className="mb-3">
              <summary className="font-semibold">How can I schedule a treatment?</summary>
              <p className="mt-2 text-sm">
                You can <a className="underline" href="/book">book online</a>, use our app, call{" "}
                <a className="underline" href={`tel:${loc.phoneDigits}`}>(303) 476-6150</a>, or walk in (we recommend booking ahead).
              </p>
            </details>

            <details className="mb-3">
              <summary className="font-semibold">Do you have a cancellation policy?</summary>
              <p className="mt-2 text-sm">
                We require at least 24 hours’ notice for cancellations or rescheduling. Cancellations within 24 hours or
                no-shows are subject to a 50% fee of the scheduled treatment price.
              </p>
            </details>

            {/* Know Before You Go */}
            <details className="mb-3">
              <summary className="font-semibold">Where is the best place to park?</summary>
              <p className="mt-2 text-sm">
                We validate parking for the 1st hour at the Larimer Square Parking Garage. After the first hour, rates apply.
                <br />
                Parking Address: 1422 Market Street, Denver CO 80202
              </p>
            </details>

            <details className="mb-3">
              <summary className="font-semibold">When should I arrive?</summary>
              <p className="mt-2 text-sm">
                Please arrive at least 15 minutes prior to your treatment time. Enjoy lemon water or our signature wellness tea.
                Members have access to lockers, spa robes, sandals, aromatherapy neck pillows, and snacks in our member lounge.
              </p>
            </details>

            <details className="mb-3">
              <summary className="font-semibold">Late Arrival Policy</summary>
              <p className="mt-2 text-sm">
                If you arrive late, your treatment time may be shortened to avoid delays for the next guest, and full treatment
                fees will still apply.
              </p>
            </details>

            <details className="mb-3">
              <summary className="font-semibold">Do you have showers at your Spa?</summary>
              <p className="mt-2 text-sm">Yes, we have showers available for guest use.</p>
            </details>

            <details className="mb-3">
              <summary className="font-semibold">Is there a place to store my belongings at your Spa?</summary>
              <p className="mt-2 text-sm">
                Members have access to lockers for storing personal belongings. Please note that Sway is not responsible for any
                lost or stolen items.
              </p>
            </details>

            <details className="mb-3">
              <summary className="font-semibold">
                I booked online and I cannot seem to complete my welcome forms. What should I do?
              </summary>
              <p className="mt-2 text-sm">
                Please update your profile with your phone number. If you prefer, you can call the Spa to complete the forms,
                or email <a className="underline" href="mailto:contact@swaywellnessspa.com">contact@swaywellnessspa.com</a> for help.
              </p>
            </details>

            {/* ClassPass */}
            <details className="mb-3">
              <summary className="font-semibold">
                I booked through ClassPass and I cannot seem to complete my welcome forms. What should I do?
              </summary>
              <p className="mt-2 text-sm">
                Enter “0000” for the last four digits of your phone number to access the profile section, then update your phone.
              </p>
            </details>

            {/* Remedy Room */}
            <details className="mb-3">
              <summary className="font-semibold">
                I am interested in booking the Remedy Room. Will I be with other guests or alone?
              </summary>
              <p className="mt-2 text-sm">
                The Remedy Room is a communal space that can accommodate 3–4 guests at a time. For private options, please call the Spa.
              </p>
            </details>

            <details className="mb-3">
              <summary className="font-semibold">
                I am interested in booking the Remedy Room. What should I wear?
              </summary>
              <p className="mt-2 text-sm">
                Because it’s a communal space, please wear a swimsuit or athletic wear.
              </p>
            </details>

            {/* Robot Massage */}
            <details className="mb-3">
              <summary className="font-semibold">
                For the Robot Massage, do I need to bring or wear anything specific?
              </summary>
              <p className="mt-2 text-sm">
                During the Aescape Treatment, you’ll be provided with Airwear (a form-fitting outfit). Ensure your Aescape profile
                is updated with your smallest “fit” size.
              </p>
            </details>

            {/* Pregnancy / Minors */}
            <details className="mb-3">
              <summary className="font-semibold">I am pregnant. Can I receive any of your services?</summary>
              <p className="mt-2 text-sm">
                Yes! First trimester: pregnancy-safe facials. Second trimester: 50-minute Maternity Massage + pregnancy-safe facials.
              </p>
            </details>

            <details className="mb-3">
              <summary className="font-semibold">
                I would like to enjoy services with my teen. What is your Minor Policy?
              </summary>
              <p className="mt-2 text-sm">
                Please call the Spa for details. A Minor Policy Intake Form must be completed by the parent or legal guardian of any minor.
              </p>
            </details>

            {/* Celebrate With Us */}
            <details className="mb-3">
              <summary className="font-semibold">If I want to book a Spalebration, who should I contact?</summary>
              <p className="mt-2 text-sm">
                Email <a className="underline" href="mailto:contact@swaywellnessspa.com">contact@swaywellnessspa.com</a>. We’d love to host you!
              </p>
            </details>

            <details>
              <summary className="font-semibold">
                If my company wants to have an office party at Sway, who should I contact?
              </summary>
              <p className="mt-2 text-sm">
                Email <a className="underline" href="mailto:contact@swaywellnessspa.com">contact@swaywellnessspa.com</a>. We’ll accommodate your team!
              </p>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}
