import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility Statement | Sway Wellness Spa",
  description:
    "Sway Wellness Spa is committed to digital accessibility and to meeting WCAG 2.2 Level AA. Learn how to report an accessibility issue.",
  alternates: { canonical: "/accessibility/" },
  robots: { index: true, follow: true },
};

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#113D33] px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-vance font-semibold tracking-tight mb-6">
          Accessibility Statement
        </h1>

        <p className="mb-4 leading-relaxed">
          Sway Wellness Spa is committed to ensuring that our website is
          accessible to everyone, including people with disabilities. We want
          every guest to be able to learn about our services, find our
          locations and hours, and book an appointment independently.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Our standard</h2>
        <p className="mb-4 leading-relaxed">
          We are working to conform to the Web Content Accessibility Guidelines
          (WCAG) 2.2 Level AA, the recognized standard for making web content
          accessible to people with a wide range of disabilities, including
          those who use screen readers such as JAWS, NVDA, and VoiceOver, and
          those who navigate by keyboard.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Ongoing effort</h2>
        <p className="mb-4 leading-relaxed">
          Accessibility is an ongoing effort. We review our website on a
          periodic basis using both automated testing tools and manual review,
          and we work to remediate issues as they are identified. As we add and
          update content, we aim to maintain and improve accessibility over
          time.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Third-party content</h2>
        <p className="mb-4 leading-relaxed">
          Some features of our website, including online booking and certain
          embedded tools, rely on third-party services that we do not fully
          control. If you reach a barrier in any of these, please contact us
          using the details below and we will help you get the information or
          appointment you need by another means.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">
          Need help, or want to book by phone?
        </h2>
        <p className="mb-4 leading-relaxed">
          If you have difficulty using any part of this website, we are glad to
          assist you directly, including helping you explore our services and
          book an appointment by phone at{" "}
          <a
            href="tel:+13034766150"
            className="underline font-semibold focus:outline-none focus:ring-2 focus:ring-[#113D33]/40 rounded"
          >
            (303) 476-6150
          </a>
          . You can also{" "}
          <a
            href="/locations"
            className="underline font-semibold focus:outline-none focus:ring-2 focus:ring-[#113D33]/40 rounded"
          >
            find your nearest Sway location here
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">
          Reporting an accessibility issue
        </h2>
        <p className="mb-4 leading-relaxed">
          If you encounter any difficulty using our website, or need assistance
          with any part of it, please contact us and we will work with you to
          provide the information, service, or transaction you are seeking
          through an accessible method:
        </p>
        <ul className="mb-4 leading-relaxed list-disc pl-6 space-y-1">
          <li>
            Email:{" "}
            <a
              href="mailto:contact@swaywellnessspa.com"
              className="underline font-semibold focus:outline-none focus:ring-2 focus:ring-[#113D33]/40 rounded"
            >
              contact@swaywellnessspa.com
            </a>
          </li>
          <li>
            Phone:{" "}
            <a
              href="tel:+13034766150"
              className="underline font-semibold focus:outline-none focus:ring-2 focus:ring-[#113D33]/40 rounded"
            >
              (303) 476-6150
            </a>
          </li>
        </ul>
        <p className="leading-relaxed">
          We aim to respond to accessibility feedback within a reasonable
          timeframe and welcome your suggestions on how we can improve.
        </p>

        <p className="mt-8 text-xs text-[#113D33]/70">
          This statement was last reviewed on July 7, 2026.
        </p>
      </div>
    </div>
  );
}
