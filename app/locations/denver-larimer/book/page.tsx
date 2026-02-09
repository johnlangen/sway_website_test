import Link from "next/link";
import Image from "next/image";

const BOOKING_OPTIONS = [
  {
    title: "Massage",
    subtitle: "Deep Tissue, Sports, CBD & more",
    price: "From $129",
    duration: "50 min",
    image: "/assets/massage2.png",
    href: "/locations/denver-larimer/book-service?category=massage",
  },
  {
    title: "Facial",
    subtitle: "Forever Young, Glow Getter & more",
    price: "From $139",
    duration: "50 min",
    image: "/assets/facial6.png",
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
      <div className="max-w-5xl mx-auto px-4 pt-32 md:pt-40 pb-20">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            Book Your Appointment
          </h1>
          <p className="max-w-2xl mx-auto text-[#113D33]/75 leading-relaxed">
            Choose your experience at Sway Larimer in historic Larimer Square.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 mb-12">
          {BOOKING_OPTIONS.map((opt) => (
            <Link
              key={opt.title}
              href={opt.href}
              className="group relative overflow-hidden rounded-3xl bg-white border border-[#113D33]/10 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
            >
              <div className="relative h-44 md:h-52 w-full overflow-hidden">
                <Image
                  src={opt.image}
                  alt={opt.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Price badge */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-[#113D33] text-xs font-semibold px-3 py-1.5 rounded-full">
                  {opt.price}
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold leading-tight">
                      {opt.title}
                    </h2>
                    <p className="text-sm text-[#113D33]/65 mt-1">
                      {opt.subtitle}
                    </p>
                  </div>
                  <div className="shrink-0 text-xs text-[#113D33]/50 mt-0.5">
                    {opt.duration}
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-[#113D33] group-hover:gap-2.5 transition-all duration-300">
                  Book now
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center space-y-4">
          <a
            href="tel:3034766150"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#113D33] text-[#113D33] font-semibold hover:bg-[#113D33] hover:text-white transition focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
          >
            Prefer to call? (303) 476-6150
          </a>

          <p className="text-sm text-[#113D33]/60 leading-relaxed">
            Mon–Fri: 10:00 AM – 8:00 PM
            <br />
            Sat: 9:00 AM – 6:00 PM
            <br />
            Sun: 11:00 AM – 6:00 PM
          </p>
        </div>
      </div>
    </div>
  );
}
