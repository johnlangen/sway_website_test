import { eventFormUrl, type EventFormLocation } from "@/lib/eventInquiry";

/**
 * The team's Google Form, embedded with the location already picked. Tall on purpose: a nested
 * scroll area inside the page is hard to use on a phone. Google Form sections vary in length, so
 * shorter sections leave some empty space at the bottom of the frame.
 */
export default function EventInquiryForm({ location }: { location: EventFormLocation }) {
  return (
    <div>
      <div className="overflow-hidden rounded-[4px] bg-[#F0EBE0]">
        <iframe
          src={eventFormUrl(location, true)}
          title={`Event and experience inquiry form for ${location}`}
          loading="lazy"
          className="block h-[2050px] w-full border-0 md:h-[1800px]"
        />
      </div>
      <p className="mt-3 text-sm opacity-80">
        Form not loading?{" "}
        <a href={eventFormUrl(location, false)} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
          Open it in a new tab
        </a>
        .
      </p>
    </div>
  );
}
