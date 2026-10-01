import Link from "next/link";

/** Post-booking "know before you go" parking line for Sway Larimer done steps. */
export function LarimerParkingNote({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-xl bg-[#F7F4E9] border border-[#113D33]/10 p-4 text-left text-sm text-[#113D33]/80 leading-relaxed ${className}`}>
      <p className="font-semibold text-[#113D33]">Parking</p>
      <p>
        Larimer Square Garage, 1422 Market St. The entrance is on Market Street,
        on the right as you pass 14th and Market. Open 24/7, and we validate the
        1st hour on weekdays.{" "}
        <Link href="/faq/larimer" className="underline underline-offset-2">
          Rates and details
        </Link>
      </p>
    </div>
  );
}
