
import ArrowMark from "@/app/components/ArrowMark";
import Link from "next/link";

export default function LocationExperienceNav({
  location,
}: {
  location: "denver-larimer" | "denver-rino" | "denver-central-park";
}) {
  const spa = location === "denver-larimer";
  const choices = spa
    ? [
        {
          name: "Massage",
          detail: "50–90 minutes · From $139",
          href: "/locations/denver-larimer/book/?category=massage",
        },
        {
          name: "Facials",
          detail: "Three treatment tiers · From $139",
          href: "/locations/denver-larimer/book/?category=facial",
        },
        {
          name: "Remedy Room",
          detail: "40-minute recovery circuit · $49",
          href: "/locations/denver-larimer/book-remedy-room",
        },
        {
          name: "Aescape",
          detail: "15–60-minute robot massage · From $49",
          href: "/locations/denver-larimer/book-aescape",
        },
      ]
    : [
        {
          name: "Remedy Lounge",
          detail: "75-minute recovery session · $49 drop-in",
          href: `/locations/${location}/book-remedy-lounge`,
        },
        {
          name: "Make it a ritual",
          detail: "Unlimited recovery · $129/month",
          href: `/locations/${location}/membership`,
        },
        {
          name: "Before your first visit",
          detail:
            location === "denver-central-park"
              ? "Current pricing & amenity maintenance update"
              : "Current offers & first-visit details",
          href: `/locations/${location}/offers`,
        },
      ];
  return (
    <nav
      className={`sway-experience-nav ${spa ? "sway-experience-nav-spa" : ""}`}
      aria-label="Choose your Sway experience"
    >
      <p className="sway-eyebrow">
        {spa ? "What brings you in?" : "Your recovery, your rhythm"}
      </p>
      <div>
        {choices.map((choice) => (
          <Link href={choice.href} key={choice.name}>
            <span>
              {choice.name}
              <span aria-hidden="true"><ArrowMark /></span>
            </span>
            <small>{choice.detail}</small>
          </Link>
        ))}
      </div>
    </nav>
  );
}
