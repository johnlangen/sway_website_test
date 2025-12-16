"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function LarimerGiftCardsPage() {
  const giftCardUrl =
    "https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=42";

  const disclaimer = `*Your Sway® Gift Card cannot be redeemed for cash unless required by law AND THEN ONLY TO THE EXTENT REQUIRED BY LAW. 
Gift cards are valid only at Sway® or Spavia branded spas in the United States. 
Gift Cards cannot be purchased and redeemed on the same day due to a 24-hour hold on all gift card activations. 
During this time, we will verify the transaction made with the credit card provided. 
The gift card will be activated once the transaction is successfully verified. 
Failure to verify the transaction within this period may result in the cancellation of the gift card purchase. 
The value of this Gift Card will not be replaced if this card is damaged, lost or stolen. 
This Gift Card has no dormancy fee and does not expire. Treat this Gift Card like cash. 
Acceptance of this Gift Card constitutes acceptance of these terms.`;

  // Breadcrumb schema
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://swaywellnessspa.com/" },
          { "@type": "ListItem", position: 2, name: "Locations", item: "https://swaywellnessspa.com/locations" },
          { "@type": "ListItem", position: 3, name: "Denver Larimer", item: "https://swaywellnessspa.com/locations/denver-larimer" },
          { "@type": "ListItem", position: 4, name: "Gift Cards", item: "https://swaywellnessspa.com/locations/denver-larimer/gift-cards" },
        ],
      },
      {
        "@type": "Product",
        name: "Sway Larimer Spa Gift Card",
        description: "Give the gift of wellness in Denver’s Larimer Square — redeemable for facials, massages, and Remedy Room experiences.",
        image: "/assets/og-giftcard.jpg",
        brand: { "@type": "Brand", name: "Sway Wellness Spa" },
        offers: {
          "@type": "Offer",
          url: "https://swaywellnessspa.com/locations/denver-larimer/gift-cards",
          priceCurrency: "USD",
          eligibleRegion: { "@type": "Place", name: "Denver, CO" },
          availability: "https://schema.org/InStock",
        },
      },
    ],
  };

  return (
    <div className="bg-[#f4f4f1] pt-32 pb-20 px-4 overflow-hidden text-black">
      {/* JSON-LD schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto flex flex-col items-center text-center"
      >
        <Image
          src="/assets/giftcard.png"
          alt="Sway Larimer Gift Card"
          width={500}
          height={300}
          className="rounded-lg object-cover"
        />

        <motion.h1
          className="text-3xl md:text-5xl font-vance text-[#113D33] font-light mt-10 sm:mt-14 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Share the Spa Experience in Denver
        </motion.h1>

        <motion.p
          className="text-base md:text-xl font-vance text-[#4A776D] leading-relaxed max-w-md mt-6 md:mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Treat someone special to the Sway Larimer experience. Gift cards can
          be redeemed for massages, facials, or Remedy Room recovery right in
          Denver’s historic Larimer Square.
        </motion.p>

        <motion.a
          href={giftCardUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 bg-[#4A776D] text-white rounded-full font-vance hover:bg-[#3a5f56] mt-6 md:mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Purchase a Gift Card
        </motion.a>

        <motion.p
          className="text-[9px] text-[#616161] font-vance leading-snug text-left max-w-md mt-6 md:mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          {disclaimer}
        </motion.p>
      </motion.div>
    </div>
  );
}
