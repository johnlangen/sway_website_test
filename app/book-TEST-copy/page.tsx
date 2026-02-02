"use client";

import { useEffect } from "react";

export default function BookingPage() {
  useEffect(() => {
    if (!document.getElementById("mindbody-widget-script")) {
      const script = document.createElement("script");
      script.id = "mindbody-widget-script";
      script.src = "https://brandedweb.mindbodyonline.com/embed/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F4E9] flex flex-col items-center px-4 pt-40 pb-20 font-vance">
      <h1 className="text-3xl md:text-5xl font-bold text-[#113D33] mb-8">
        Book Your Appointment
      </h1>

      <div
        className="mindbody-widget w-full max-w-[900px]"
        data-widget-type="Appointments"
        data-widget-id="9510982b8da"
      ></div>
    </div>
  );
}
