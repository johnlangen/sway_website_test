"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string | React.ReactNode;
};

function Accordion({ title, items }: { title: string; items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="border rounded-lg overflow-hidden shadow-sm">
            <button
              aria-expanded={openIndex === idx}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full text-left px-4 py-3 font-semibold flex justify-between items-center bg-[#113D33] text-white hover:bg-[#0d2f28]"
            >
              {item.question}
              <span>{openIndex === idx ? "–" : "+"}</span>
            </button>
            {openIndex === idx && (
              <div className="px-4 py-3 text-sm bg-[#145c4b] text-white">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SwayLarimerFAQPage() {
  return (
    <div className="bg-white text-[#113D33] min-h-screen font-vance px-6 pt-32 md:pt-40 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-5xl font-bold mb-12 text-center"
        >
          FAQ – Sway Larimer
        </motion.h1>

        {/* Sections */}
        <Accordion
          title="The Sway Way"
          items={[
            {
              question: "What’s unique about Sway?",
              answer: (
                <p>
                  Drawing from cultural hubs like Barcelona and NYC, Sway blends
                  innovative technology with traditional treatments to offer a fresh,
                  modern wellness club to enhance your well-being. At Sway, we
                  believe in total body health for long-term optimization. Designed
                  to be a luxurious yet accessible wellness club you can rejuvenate
                  amid the city hustle. With a focus on affordability, personalized
                  service, and scientific-backed treatments, we offer a holistic
                  approach to well-being. Sway will become your happy place that you
                  can’t live without. This time is for you.
                </p>
              ),
            },
            {
              question: "What product lines do you use in your services?",
              answer: (
                <p>
                  We use high-quality, in-demand products such as Eminence, Dr.
                  Dennis Gross, and CauseMedic.
                </p>
              ),
            },
          ]}
        />

        <Accordion
          title="Scheduling"
          items={[
            {
              question: "How can I schedule a treatment?",
              answer: (
                <p>
                  You can schedule an appointment online, through the Spavia app, or
                  directly by phone at <strong>303-476-6150</strong>. We also welcome
                  walk-ins, but due to high demand, we recommend scheduling in
                  advance.
                </p>
              ),
            },
            {
              question: "Do you have a cancellation policy?",
              answer: (
                <p>
                  To provide the best experience for all guests, we require at least
                  24 hours’ notice for cancellations or rescheduling. Cancellations
                  within 24 hours or no-shows will be subject to a cancellation fee
                  of 50% of the scheduled treatment price.
                </p>
              ),
            },
          ]}
        />

        <Accordion
          title="Know Before You Go"
          items={[
            {
              question: "Where is the best place to park?",
              answer: (
                <div className="space-y-3">
                  <p>
                    Sway is located in <strong>Larimer Square</strong>, Denver’s
                    most historic block and a pedestrian-only street with no cars.
                    The <strong>Larimer Square Parking Garage</strong> is open
                    24/7 and is the easiest option. We validate the 1st hour{" "}
                    <strong>on weekdays</strong>.
                  </p>
                  <p>
                    <strong>Parking Address:</strong> 1422 Market Street, Denver CO
                    80202. The garage entrance is on Market Street, on the right
                    side as you pass the intersection of 14th and Market.
                  </p>
                  <div>
                    <p className="font-semibold">Day rates</p>
                    <ul className="list-disc pl-5">
                      <li>Monday to Friday, 5 AM to 5 PM: $2 per 10 minutes ($24 max)</li>
                      <li>Saturday, 5 AM to 5 PM: $10 flat</li>
                      <li>Sunday, all day: $10 flat</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold">Night rates</p>
                    <ul className="list-disc pl-5">
                      <li>Monday to Thursday, 5 PM to 5 AM: $10 flat</li>
                      <li>Friday, 5 PM to 5 AM: $30 flat</li>
                    </ul>
                  </div>
                  <p className="text-sm opacity-80">
                    Garage rates are set by the garage and can change.
                  </p>
                </div>
              ),
            },
            {
              question: "When should I arrive?",
              answer: (
                <p>
                  Please arrive at least 15 minutes prior to your treatment time.
                  Enjoy lemon water or our signature wellness tea. Starting your
                  treatment on time allows you the full relaxing experience you
                  deserve. As a member, your locker, spa robe, spa sandals, warm
                  aromatherapy neck pillow, and snacks will be waiting for you in our
                  member lounge.
                </p>
              ),
            },
            {
              question: "Late Arrival Policy",
              answer: (
                <p>
                  If you arrive late, your treatment time may be shortened to avoid
                  delays for the next guest, and full treatment fees will still
                  apply.
                </p>
              ),
            },
            {
              question: "Do you have showers at your Spa?",
              answer: <p>Yes, we have one shower available for guest use.</p>,
            },
            {
              question: "Is there a place to store my belongings at your Spa?",
              answer: (
                <p>
                  Our members have access to Members Lockers for storing personal
                  belongings. Please note that Sway is not responsible for any lost
                  or stolen items.
                </p>
              ),
            },
            {
              question:
                "I booked online and I cannot seem to complete my welcome forms. What should I do?",
              answer: (
                <p>
                  Please update your profile with your phone number. If you prefer,
                  you can call the Spa to complete the forms, or you can email us at{" "}
                  <a
                    href="mailto:contact@swaywellnessspa.com"
                    className="underline"
                  >
                    contact@swaywellnessspa.com
                  </a>{" "}
                  for assistance.
                </p>
              ),
            },
          ]}
        />

        <Accordion
          title="ClassPass"
          items={[
            {
              question:
                "I booked through ClassPass and I cannot seem to complete my welcome forms. What should I do?",
              answer: (
                <p>
                  To complete your welcome forms, please enter “0000” when prompted
                  for the last four digits of your phone number. Once you access the
                  profile section of the form, you can update your phone number.
                </p>
              ),
            },
          ]}
        />

        <Accordion
          title="Remedy Room"
          items={[
            {
              question:
                "I am interested in booking the Remedy Room. Will I be with other guests or alone?",
              answer: (
                <p>
                  The Remedy Room is a communal space that can accommodate 3-4 guests
                  at a time. If you are interested in a private option, please call
                  the Spa for further details.
                </p>
              ),
            },
            {
              question:
                "I am interested in booking the Remedy Room. What should I wear?",
              answer: (
                <p>
                  As the Remedy Room is a communal space, we ask that all guests wear
                  a swimsuit or athletic wear.
                </p>
              ),
            },
          ]}
        />

        <Accordion
          title="The Robot Massage"
          items={[
            {
              question:
                "For the Robot Massage, do I need to bring or wear anything specific?",
              answer: (
                <p>
                  During the Aescape treatment, compression apparel is provided
                  at check-in, a form-fitting outfit that allows the Aescape
                  technology to perform at its best. Please ensure your Aescape
                  profile is updated with your smallest fit size.
                </p>
              ),
            },
          ]}
        />

        <Accordion
          title="Pregnancy / Minors"
          items={[
            {
              question: "I am pregnant. Can I receive any of your services?",
              answer: (
                <p>
                  Yes, and congratulations! Expectant mothers in their first
                  trimester can enjoy pregnancy-safe facials. Those in their second
                  trimester may book our 50-minute Maternity Massage and also receive
                  pregnancy-safe facials.
                </p>
              ),
            },
            {
              question: "I would like to enjoy services with my teen. What is your Minor Policy?",
              answer: (
                <div className="space-y-3">
                  <p>
                    We welcome teens with a parent or legal guardian&apos;s consent.
                    Before any treatment, a parent or legal guardian must complete
                    and sign our Minor Consent Form.
                  </p>
                  <ul className="list-disc pl-5">
                    <li>Under 12: not eligible for spa treatments.</li>
                    <li>
                      Ages 12 to 15: select facials and massages with signed
                      consent. A parent or guardian must stay on site and be in
                      the treatment room.
                    </li>
                    <li>
                      Ages 16 to 17: approved treatments with signed consent. A
                      parent or guardian is encouraged to stay on site.
                    </li>
                    <li>Aescape robot massage is for guests 18 and older.</li>
                  </ul>
                  <p>
                    Please call the Spa at <strong>303-476-6150</strong> before
                    booking so we can help choose the right treatment.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <Accordion
          title="Celebrate With Us!"
          items={[
            {
              question: "If I want to book a Spalebration, who should I contact?",
              answer: (
                <p>
                  A Spalebration is a group spa celebration for 4 or more guests:
                  bachelorettes, birthdays, bridal parties, and more. See our{" "}
                  <a href="/group-events" className="underline">
                    group events page
                  </a>{" "}
                  for ideas. To book a Spalebration, please reach out to us at{" "}
                  <a
                    href="mailto:contact@swaywellnessspa.com"
                    className="underline"
                  >
                    contact@swaywellnessspa.com
                  </a>
                  . We would love to host you and your guests!
                </p>
              ),
            },
            {
              question:
                "If my company wants to have an office party at Sway, who should I contact?",
              answer: (
                <p>
                  For inquiries about hosting an office party, please email{" "}
                  <a
                    href="mailto:contact@swaywellnessspa.com"
                    className="underline"
                  >
                    contact@swaywellnessspa.com
                  </a>
                  . We would love to accommodate you and your team!
                </p>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
