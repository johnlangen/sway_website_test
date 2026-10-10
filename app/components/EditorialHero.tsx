import Image from "next/image";
import Link from "next/link";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  href?: string;
  action?: string;
  note?: string;
};

/** Shared photographic opening; content is visible before hydration. */
export default function EditorialHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  href,
  action = "Explore treatments",
  note,
}: Props) {
  return (
    <section className="editorial-hero">
      <div className="editorial-hero-copy">
        <p className="sway-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {description && (
          <p className="editorial-hero-description">{description}</p>
        )}
        {href && (
          <Link href={href} className="sway-button sway-button-light">
            {action}
            <span aria-hidden="true">↗</span>
          </Link>
        )}
        {note && <p className="editorial-hero-note">{note}</p>}
      </div>
      <div className="editorial-hero-image">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="(max-width: 767px) 100vw, 55vw"
          className="object-cover"
        />
        <span className="image-caption">Pause. Breathe. Rediscover.</span>
      </div>
    </section>
  );
}
