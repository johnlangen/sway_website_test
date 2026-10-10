import Image from "next/image";
import Link from "next/link";
import GoogleReviews from "./components/GoogleReviews";
import EditorialHero from "./components/EditorialHero";

const experiences = [
  {
    number: "01",
    title: "A softer landing.",
    name: "Massage",
    image: "/assets/homepage-massage.jpg",
    alt: "Warm, softly lit massage treatment rooms at Sway",
    href: "/massages",
    text: "Let the day go. From light-to-medium Signature Massage to focused Deep Tissue, find the treatment your body is asking for.",
    detail: "50–90 minutes · Larimer",
    price: "From $139 · Members from $99",
  },
  {
    number: "02",
    title: "Meet your fresh face.",
    name: "Facials",
    image: "/assets/facialExperiences.jpg",
    alt: "A facial treatment at Sway",
    href: "/facials",
    text: "Thoughtful skincare, expert hands. Explore Eminence Organics facials and our dedicated Dr. Dennis Gross Vitamin C treatments.",
    detail: "Skincare, made personal · Larimer",
    price: "From $139 · Members from $99",
  },
  {
    number: "03",
    title: "Change your state.",
    name: "Remedy Room",
    image: "/assets/homepage-remedy.jpg",
    alt: "Sway's recovery space with sauna and cold plunge",
    href: "/remedy-tech",
    text: "Heat. Cold. A deep exhale. Discover sauna, cold plunge, compression, and LED light therapy in one guided recovery circuit.",
    detail: "40-minute circuit · Larimer",
    price: "$49 per visit · $25 for members",
  },
  {
    number: "04",
    title: "Your reset, reimagined.",
    name: "Aescape",
    image: "/assets/aescapeblog6.jpg",
    alt: "Aescape robotic massage technology at Sway",
    href: "/aescape",
    text: "Meet a new kind of massage. Intelligent body mapping and pressure you control, with a session that fits your day.",
    detail: "15, 30, 45 or 60 minutes · Larimer",
    price: "Sessions from $49",
  },
];
const FAQ_ITEMS = [
  {
    q: "What is the Remedy Room?",
    a: "The Remedy Room is a guided 40-minute recovery circuit combining sauna, cold plunge, compression therapy, and LED light therapy. It's $49 per session or $25 for members.",
  },
  {
    q: "What is Aescape?",
    a: "Aescape is an AI-powered robot massage that uses body mapping and dual robotic arms to deliver personalized pressure. You control pressure, target zones, and ambience in real time. Sessions run 15 to 60 minutes.",
  },
  {
    q: "Do you offer memberships?",
    a: "Yes. Memberships start at $99/month and include massages and facials from $99 (regularly from $139) across three tiers: Essential, Premier, and Ultimate. Members also get 50% off all boosts and Remedy Room sessions, plus private lounge access and rollover credits.",
  },
  {
    q: "What should I book for a first visit?",
    a: "Most guests start with an Essential tier massage or facial (50 minutes, from $99 member / $139 drop-in). If you want recovery-focused benefits, the Remedy Room pairs well. Many members do both in one visit.",
  },
  {
    q: "How do I book?",
    a: "Book online anytime at swaywellnessspa.com or call (303) 476-6150. We recommend booking ahead during evenings and weekends.",
  },
] as const;

export default function HomeContent() {
  return (
    <div className="sway-home">
      <EditorialHero
        eyebrow="Sway · A modern wellness club"
        title="A little pause. A whole new feeling."
        description="Massage, facials, and a fresh approach to recovery. Make room for yourself. We'll take care of the rest."
        image="/assets/homepage-massage.jpg"
        imageAlt="The warm, lantern-lit treatment rooms at Sway Larimer"
        href="/book"
        action="Find your feel-good"
        note="Your next reset starts here."
      />

      <div className="sway-recognition">
        <span>Good company. Great recognition.</span>
        <Link href="/press">
          USA Today 10Best <span>· #4 Best Day Spa</span>
        </Link>
        <Link href="/press">
          The Zoe Report <span>· Best U.S. Day Spa</span>
        </Link>
        <Link href="/press" className="recognition-link">
          In the press ↗
        </Link>
      </div>

      <section className="sway-section sway-intro">
        <p className="sway-eyebrow">Less everyday. More you.</p>
        <div>
          <h2>
            Step out of the rush.
            <br />
            Come back to yourself.
          </h2>
          <p>
            A moment of stillness in the middle of the city. Expert care,
            restorative rituals, and spaces that invite you to stay a little
            longer. This is wellness, the Sway way.
          </p>
          <Link href="/swayway" className="sway-text-link">
            Get to know Sway <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className="sway-section sway-experiences" id="experiences">
        <div className="sway-section-heading">
          <div>
            <p className="sway-eyebrow">Find your rhythm</p>
            <h2>How do you want to feel?</h2>
          </div>
          <Link href="/treatments" className="sway-text-link">
            All treatments ↗
          </Link>
        </div>
        <div className="experience-grid">
          {experiences.map((item) => (
            <article className="experience-story" key={item.name}>
              <Link
                className="experience-image"
                href={item.href}
                aria-label={`Explore ${item.name}`}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="object-cover"
                />
                <span className="experience-index">
                  {item.number} / {item.name}
                </span>
                <span className="experience-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
              <p className="sway-eyebrow experience-detail">{item.detail}</p>
              <h3>
                <Link href={item.href}>{item.title}</Link>
              </h3>
              <p>{item.text}</p>
              <p className="experience-price">{item.price}</p>
              <Link href={item.href} className="sway-text-link">
                Explore {item.name} ↗
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="sway-membership-story">
        <div className="membership-photo">
          <Image
            src="/assets/membership_background.jpg"
            alt="Unwind in the Sway wellness club"
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="membership-story-copy">
          <p className="sway-eyebrow">A good habit to get into</p>
          <h2>
            Feel good.
            <br />
            More often.
          </h2>
          <p>
            Your time to reset shouldn&apos;t be a once-in-a-while thing. Find a
            Sway membership that fits your routine, with benefits built around
            your favorite ways to unwind.
          </p>
          <Link href="/membership" className="sway-button sway-button-light">
            Find your membership <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/offers" className="sway-text-link">
            First time here? Explore local offers ↗
          </Link>
        </div>
      </section>

      <section className="sway-section">
        <div className="sway-section-heading">
          <div>
            <p className="sway-eyebrow">Your neighborhood, a little calmer</p>
            <h2>Find your Sway.</h2>
          </div>
          <Link href="/locations" className="sway-text-link">
            All locations ↗
          </Link>
        </div>
        <div className="home-locations">
          {[
            {
              name: "Larimer Square",
              place: "Denver, CO",
              image: "/assets/homepage_photo_outside.jpg",
              slug: "denver-larimer",
              description: "Massage, facials, Aescape & the Remedy Room",
            },
            {
              name: "RiNo",
              place: "Denver, CO",
              image: "/assets/rino-card.jpg",
              slug: "denver-rino",
              description: "Your neighborhood recovery club",
            },
            {
              name: "Central Park",
              place: "Aurora, CO",
              image: "/assets/centralpark-card.jpg",
              slug: "denver-central-park",
              description: "Space to reset, close to home",
            },
          ].map((loc) => (
            <Link
              href={`/locations/${loc.slug}`}
              key={loc.slug}
              className="home-location"
            >
              <div className="home-location-image">
                <Image
                  src={loc.image}
                  alt={`Sway ${loc.name}`}
                  fill
                  sizes="(max-width: 767px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <p className="sway-eyebrow">{loc.place}</p>
              <h3>
                {loc.name}
                <span aria-hidden="true">↗</span>
              </h3>
              <p>{loc.description}</p>
            </Link>
          ))}
        </div>
        <p className="home-coming-soon">
          More good things are coming.{" "}
          <Link href="/locations/knox-henderson">
            Dallas / Knox-Henderson ↗
          </Link>
          <Link href="/locations/union-market">
            Washington, DC / Union Market ↗
          </Link>
        </p>
      </section>

      <section className="home-reviews">
        <GoogleReviews />
      </section>

      <section className="sway-section sway-gift-story">
        <div>
          <p className="sway-eyebrow">A gift that feels different</p>
          <h2>
            Give them
            <br />a moment back.
          </h2>
          <p>
            For a birthday. A thank-you. Or just because. A little Sway goes a
            long way.
          </p>
          <Link href="/gift-cards" className="sway-button">
            Give a little Sway <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="gift-story-art">
          <Image
            src="/assets/swaylogo.png"
            width={160}
            height={100}
            alt="Sway gift card"
          />
          <span>A moment, just for you.</span>
          <span className="sway-eyebrow">The gift of feeling good</span>
        </div>
      </section>

      <section className="sway-section home-faq">
        <div>
          <p className="sway-eyebrow">Before you unwind</p>
          <h2>
            A few good
            <br />
            things to know.
          </h2>
          <Link href="/faq" className="sway-text-link">
            More questions? Start here ↗
          </Link>
        </div>
        <div className="sway-accordions">
          {FAQ_ITEMS.map((item) => (
            <details key={item.q}>
              <summary>
                {item.q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="sway-signoff">
        <p className="sway-eyebrow">Pause. Breathe. Rediscover.</p>
        <h2>See you at Sway.</h2>
        <Link href="/book" className="sway-button sway-button-light">
          Make time for yourself <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </div>
  );
}
