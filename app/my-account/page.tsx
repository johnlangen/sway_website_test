import { ArrowRight, MapPin } from "lucide-react";
import { MY_ACCOUNT_LOCATIONS, myAccountUrl } from "@/lib/myAccount";

/**
 * Location picker for "My Account".
 *
 * Shown whenever we cannot tell the guest's location from the URL. Each Sway
 * is a separate Mindbody site with its own logins, so guessing is worse than
 * asking: a wrong guess lands on a Sway-branded sign-in page where the guest's
 * email is simply not found. See lib/myAccount.ts.
 */
export default function MyAccountPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0e2b24] via-[#113D33] to-[#0b1f1a] text-white font-vance">
      {/* Hero */}
      <section className="px-6 pt-28 md:pt-36 pb-4 text-center max-w-4xl mx-auto">
        <p className="text-sm md:text-base uppercase tracking-[0.2em] text-[#9ABFB3] mb-4">
          My Account
        </p>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          Manage Your Reservations
        </h1>
        <p className="text-base md:text-lg text-gray-300 max-w-xl mx-auto">
          Sign in to see your upcoming visits, reschedule, or cancel. Choose the
          Sway you book with.
        </p>
      </section>

      {/* Location cards */}
      <section className="px-4 sm:px-6 pt-10 pb-6">
        <p className="text-center text-sm uppercase tracking-[0.15em] text-[#9ABFB3] mb-6">
          Select your location
        </p>
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {MY_ACCOUNT_LOCATIONS.map((loc) => (
            <a
              key={loc.slug}
              href={myAccountUrl(loc.siteId)}
              className="group bg-white text-[#113D33] rounded-2xl p-6 shadow-xl transition hover:shadow-2xl hover:scale-[1.02] flex flex-col"
            >
              <h2 className="text-xl font-bold mb-1">{loc.label}</h2>
              <p className="text-sm text-[#113D33]/60 flex items-center gap-1.5 mb-6">
                <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                {loc.city}
              </p>
              <span className="mt-auto inline-flex items-center gap-2 font-semibold text-[#4A776D]">
                Sign in
                <ArrowRight
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Why the picker exists, in guest-facing terms. Someone who signs in at
          the wrong Sway sees "email not found" and assumes their account is
          broken; naming it up front is cheaper than a support email. */}
      <section className="px-6 pb-20 max-w-2xl mx-auto text-center space-y-4">
        <p className="text-sm text-gray-300 leading-relaxed">
          Each Sway keeps its own bookings, so your account lives with the
          location you visit. If you go to more than one, you will have a
          separate login at each.
        </p>
        <p className="text-sm text-gray-300 leading-relaxed">
          Booked a Remedy Lounge session with a sauna? Your sauna time may show
          as its own separate reservation. If you are changing or cancelling,
          please update all of them, or just reach out to the club and we will
          take care of it.
        </p>
        <p className="text-sm text-gray-400 leading-relaxed">
          First time signing in? Choose{" "}
          <span className="text-white">Create account</span> and use the email
          you booked with.
        </p>
      </section>
    </div>
  );
}
