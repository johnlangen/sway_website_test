import Link from "next/link";
import Image from "next/image";

const BOOKING_OPTIONS = [
  {
    title: "Massage",
    subtitle: "Deep Tissue, Sports, CBD & more",
    price: "From $129",
    duration: "50 min",
    image: "/assets/massage2.jpg",
    href: "/locations/denver-larimer/book-service?category=massage",
  },
  {
    title: "Facial",
    subtitle: "Forever Young, Glow Getter & more",
    price: "From $129",
    duration: "50 min",
    image: "/assets/facial6.jpg",
    href: "/locations/denver-larimer/book-service?category=facial",
  },
  {
    title: "Aescape Robot Massage",
    subtitle: "AI-powered massage",
    price: "From $49",
    duration: "15–60 min",
    image: "/assets/aescapeblog2.jpg",
    href: "/locations/denver-larimer/book-aescape",
  },
  {
    title: "Remedy Room",
    subtitle: "Sauna + cold plunge recovery",
    price: "$49",
    duration: "40 min",
    image: "/assets/remedy-room2.jpg",
    href: "/locations/denver-larimer/book-remedy-room",
  },
] as const;

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-[#F7F4E9] font-vance text-[#113D33]">
      <div className="max-w-3xl mx-auto px-4 pt-28 md:pt-36 pb-20">
        {/* Hero */}
        <div className="text-center mb-10 md:mb-12">
          <p className="text-sm md:text-base uppercase tracking-[0.2em] text-[#4A776D] mb-4">
            Sway Wellness Spa
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Book Your Experience
          </h1>
          <p className="text-base md:text-lg text-[#113D33]/60 max-w-xl mx-auto">
            Choose your treatment to get started.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
          {BOOKING_OPTIONS.map((opt) => (
            <Link
              key={opt.title}
              href={opt.href}
              className="group relative overflow-hidden rounded-2xl bg-white/70 border border-[#113D33]/10 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
            >
              <div className="relative h-44 md:h-52 w-full overflow-hidden">
                <Image
                  src={opt.image}
                  alt={opt.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                {/* Price + duration overlay */}
                <div className="absolute bottom-3 right-3">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-right">
                    <div className="text-sm font-bold text-[#113D33]">{opt.price}</div>
                    <div className="text-[10px] text-[#113D33]/50">{opt.duration}</div>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-semibold leading-tight">
                      {opt.title}
                    </h2>
                    <p className="text-sm text-[#113D33]/50 mt-0.5">
                      {opt.subtitle}
                    </p>
                  </div>
                  <div className="shrink-0 w-8 h-8 rounded-full bg-[#113D33]/5 flex items-center justify-center group-hover:bg-[#113D33]/10 transition-colors">
                    <svg
                      className="w-4 h-4 text-[#113D33] transition-transform duration-300 group-hover:translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center">
          <div className="text-xs text-[#113D33]/40">
            Prefer to book with staff?{" "}
            <a
              href="tel:3034766150"
              className="underline underline-offset-4 hover:text-[#113D33]/60 transition"
            >
              Call (303) 476-6150
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
