"use client";

import Script from "next/script";

/**
 * Embeds the Mariana Tek (MT) booking widget for the former Upswell locations.
 * Bridge solution through the Mindbody cutover. Tenant + view ID are derived
 * from Upswell's production booking URL; only the location ID differs per site.
 *   RiNo Station = 48717 · Central Park = 48718
 */
export function MarianaBookingWidget({ locationId }: { locationId: number }) {
  return (
    <>
      <div
        data-mariana-integrations={`/schedule/daily/48541?locations=${locationId}`}
        className="min-h-[800px] w-full"
      />
      <Script
        id="mariana-tek-loader"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function () {
              var TENANT_NAME = 'upswellstudio';
              var d = document;
              var sA = ['polyfills', 'js'];
              for (var i = 0; i < sA.length; i++) {
                var s = d.createElement('script');
                s.src = 'https://' + TENANT_NAME + '.marianaiframes.com/' + sA[i];
                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
              }
            })();
          `,
        }}
      />
    </>
  );
}
