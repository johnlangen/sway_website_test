"use client";

import { motion } from "framer-motion";

export default function TermsContent() {
  return (
    <div className="bg-[#F8F5F3] min-h-screen text-black px-6 pt-32 md:pt-40 pb-20 max-w-4xl mx-auto font-vance leading-relaxed">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl font-bold mb-8"
      >
        Terms and Conditions
      </motion.h1>

      <p className="text-sm md:text-base mb-8">Updated September 18, 2024</p>

      <p className="mb-6">
        Welcome to Sway. These Terms and Conditions govern your use of our
        website and services. By accessing or using our site, you agree to
        comply with these Terms. If you do not agree, you must stop using the
        website immediately.
      </p>

      <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-2">Services</h2>
      <p className="mb-6">
        Sway offers wellness services, including facials, massages, and remedy
        technologies like saunas and cold plunges. These services are subject to
        availability, and Sway reserves the right to modify or discontinue any
        service without notice.
      </p>

      <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-2">
        User Responsibilities
      </h2>
      <p className="mb-6">
        By using our site, you agree to:
        <br />- Provide accurate information when making a purchase or
        registration.
        <br />- Not use the site for unlawful purposes.
        <br />- Not interfere with the operation of the site or access to other
        users.
      </p>

      <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-2">
        Orders and Payments
      </h2>
      <p className="mb-6">
        All orders placed through our website are subject to acceptance by Sway.
        We reserve the right to cancel any order for any reason, including
        product or service availability or errors in pricing. Prices are
        displayed in U.S. dollars and do not include taxes, shipping, or other
        fees unless stated. You are responsible for payment of any applicable
        taxes.
      </p>

      <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-2">
        Memberships
      </h2>
      <p className="mb-6">
        If Sway offers memberships, such memberships are subject to the terms
        outlined at the time of registration, including cancellation policies,
        fees, and benefits. Sway reserves the right to modify or cancel
        memberships at its discretion.
      </p>

      <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-2">
        Cancellations and Refunds
      </h2>
      <p className="mb-6">
        You may cancel services booked through our website according to the
        cancellation policy provided at the time of booking. Refunds, if
        applicable, will be processed within [X] business days.
      </p>

      <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-2">
        Intellectual Property
      </h2>
      <p className="mb-6">
        All content, including text, graphics, logos, and images on the Sway
        website, is the property of Sway or its content suppliers and is
        protected by copyright laws. You may not use or reproduce any content
        without express permission.
      </p>

      <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-2">
        Links to Third-Party Sites
      </h2>
      <p className="mb-6">
        Our website may contain links to third-party websites. These links are
        provided for your convenience, and Sway is not responsible for the
        content or privacy practices of these sites.
      </p>

      <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-2">
        Disclaimer of Warranties
      </h2>
      <p className="mb-6">
        All services and products provided by Sway are offered “as is” without
        warranties of any kind, either express or implied. We do not warrant
        that the site will be error-free, secure, or continuously available.
      </p>

      <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-2">
        Limitation of Liability
      </h2>
      <p className="mb-6">
        Sway and its affiliates are not liable for any direct, indirect,
        incidental, or consequential damages arising from your use of the
        website or our services, including but not limited to lost profits or
        data.
      </p>

      <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-2">
        Indemnification
      </h2>
      <p className="mb-6">
        You agree to indemnify and hold Sway harmless from any claims,
        liabilities, damages, or expenses arising from your use of the site or
        violation of these Terms and Conditions.
      </p>

      <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-2">
        Governing Law
      </h2>
      <p className="mb-6">
        These Terms and Conditions are governed by and construed in accordance
        with the laws of Denver, CO, USA, without regard to conflict of law
        principles. Any legal action related to these Terms shall be filed in
        the courts of Denver, CO, USA.
      </p>

      <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-2">
        Changes to These Terms
      </h2>
      <p className="mb-6">
        Sway reserves the right to update or modify these Terms and Conditions
        at any time. Changes will be effective immediately upon posting.
        Continued use of the website constitutes your acceptance of the revised
        Terms.
      </p>

      <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-2">Contact Us</h2>
      <p className="mb-6">
        If you have any questions about these Terms and Conditions, please
        contact us at{" "}
        <a
          href="mailto:info@swaywellnessspa.com"
          className="text-[#113D33] underline"
        >
          info@swaywellnessspa.com
        </a>
        .
      </p>
    </div>
  );
}
