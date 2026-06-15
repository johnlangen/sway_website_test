import Link from "next/link";
import { MarianaBookingWidget } from "@/app/components/MarianaBookingWidget";

export default function SwayCentralParkBookPage() {
  return (
    <main className="bg-[#F7F4E9] text-[#113D33] font-vance min-h-screen">
      <section className="px-6 pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs tracking-wide uppercase opacity-70 mb-2">
            Sway Wellness Spa · Central Park
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
            Book Your Sway Remedy Lounge Session
          </h1>
          <p className="mt-4 text-base sm:text-lg opacity-80">
            Traditional and infrared saunas, cold plunges, a warm soak, and compression therapy.
          </p>

          {/* Bridge-period notice */}
          <div className="mt-6 rounded-2xl bg-[#113D33] text-white p-5 sm:p-6 text-sm sm:text-base leading-relaxed">
            Massage and facial treatments are coming, along with an updated
            booking experience. For now, book your recovery session below.
          </div>

          {/* MT widget */}
          <div className="mt-8">
            <MarianaBookingWidget locationId={48718} />
          </div>

          {/* Fallback + contact */}
          <div className="mt-8 border-t border-black/10 pt-6 space-y-2 text-sm opacity-75">
            <p>
              Having trouble with the booking tool?{" "}
              <a
                href="https://upswellstudio.com/book-now"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:opacity-100"
              >
                Book directly on our previous site <span className="sr-only">(opens in new tab)</span>
              </a>
              .
            </p>
            <p>
              Questions? Call{" "}
              <a href="tel:+13034766150" className="underline underline-offset-4">
                (303) 476-6150
              </a>
              .
            </p>
            <p>
              <Link
                href="/locations/denver-central-park"
                className="underline underline-offset-4"
              >
                Back to Sway Central Park
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
