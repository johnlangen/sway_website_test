# Sway website design

Sway is a modern neighborhood wellness club: forest green, warm paper, generous space, and real Sway photography. The October 2026 refresh takes editorial composition and restraint from the local `/Users/John/spavia-website` project while retaining Sway's identity, assets, and Vance typefaces.

## Foundation

- `app/editorial.css` contains the shared visual system. `app/globals.css` retains Tailwind, font declarations, and existing utility animations.
- Forest `#113D33`, paper `#F7F4E9`, sage `#D8DFC9`, dark footer `#0B2C25`. Use restrained hairline borders and small corners. Photography and spacing supply depth.
- Vance Light for display headings, Vance Text for reading copy. Keep headings fluid, with comfortably sized mobile text and short line lengths.
- Real photographs from `public/assets`. Use Next Image with responsive `sizes`; prioritize the opening image only.
- `EditorialHero` is a reusable split opening with a visible heading and primary action. Its mobile layout puts the useful content before the photograph.
- `SiteCanvas` distinguishes marketing, articles, transaction flows, and internal tools. Scope marketing treatments accordingly. Do not apply decorative rules to payment inputs, booking state, or staff tools.

## Composition

Use asymmetric image stories, alternating photo/text sections, open treatment lists, and hairline dividers. Avoid repeated shadowed rounded cards and full-screen scroll trapping. The homepage and treatment directory are reference compositions.

Navigation must remain useful at every width. The fixed header is 72px; page openings and anchor offsets must account for it. The desktop navigation starts at 1280px. Smaller widths use the focus-contained mobile menu. Cards that navigate must be native links or buttons.

Articles use a consistent title banner and a narrower reading column. Preserve their content, canonical URLs, and metadata. Location pages keep their individual amenities, status, phone numbers, and offer restrictions.

## Motion and interaction

Content must be available immediately. Opening motion is short and disabled under reduced motion. No mandatory scroll snapping, cursor spotlight, or endless image zoom. The Aescape background film has a pause/play control and respects reduced motion; it pauses when the tab is hidden.

Treatment tier buttons expose their selected state. Interactive changes must preserve prices, treatment definitions, booking destinations, attribution, and all existing defensive checks.

## Business facts

`CLAUDE.md` remains the source for brand facts, pricing restrictions, location differences, booking rules, and integration boundaries. In particular, first-visit Larimer discounts are locals only; Signature Massage is light to medium pressure; and the RiNo/Central Park amenities differ from Larimer. This design system does not override those rules.
