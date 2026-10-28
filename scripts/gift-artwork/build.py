#!/usr/bin/env python3
"""
Builds the gift card artwork library for the native gift checkout (lib/giftCards/artwork.ts).

  python3 scripts/gift-artwork/build.py

Each design is drawn from Sway's own photos (public/assets) and type (Vance, public/assets/fonts),
in three sizes: image (1200 px, the page and email), thumbnail (480 px, the picker) and printImage
(1800 px, the PDF). Files are named by content hash, so an issued gift keeps its exact artwork
even if a design is redrawn later: never delete a file a design has used (add it to
"archivedFiles" instead). Writes public/gift-cards/art/*.jpg and lib/giftCards/artwork-library.json.

The SWAY wordmark PNGs here are rendered from public/assets/swaylogogreen.svg (sharp, 1500 px).
"""
import hashlib
import json
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
ASSETS = os.path.join(ROOT, "public", "assets")
OUT = os.path.join(ROOT, "public", "gift-cards", "art")
LIBRARY = os.path.join(ROOT, "lib", "giftCards", "artwork-library.json")
HERE = os.path.dirname(__file__)

FOREST = (17, 61, 51)
SAGE = (156, 183, 169)
SAGE_LIGHT = (215, 229, 221)
CREAM = (247, 244, 233)
SAND = (235, 228, 209)
WHITE = (255, 255, 255)

S = 1800  # drawn once at print size, then scaled down


def font(weight, size):
    return ImageFont.truetype(os.path.join(ASSETS, "fonts", f"vance-{weight}.otf"), size)


LOGO = {
    "white": Image.open(os.path.join(HERE, "logo-white.png")).convert("RGBA"),
    "green": Image.open(os.path.join(HERE, "logo-green.png")).convert("RGBA"),
}


def cover(name, focus=(0.5, 0.5), size=(S, S)):
    im = Image.open(os.path.join(ASSETS, name)).convert("RGB")
    w, h = size
    scale = max(w / im.width, h / im.height)
    im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
    x = round((im.width - w) * focus[0])
    y = round((im.height - h) * focus[1])
    return im.crop((x, y, x + w, y + h))


def logo(canvas, color, width, cx, cy):
    lg = LOGO[color]
    h = round(lg.height * width / lg.width)
    lg = lg.resize((width, h), Image.LANCZOS)
    canvas.paste(lg, (round(cx - width / 2), round(cy - h / 2)), lg)


def tracked(draw, text, fnt, cx, y, fill, tracking=0):
    """Centered text with letter spacing (tracking in px between letters)."""
    widths = [draw.textlength(ch, font=fnt) for ch in text]
    total = sum(widths) + tracking * (len(text) - 1)
    x = cx - total / 2
    for ch, w in zip(text, widths):
        draw.text((x, y), ch, font=fnt, fill=fill)
        x += w + tracking


def fit(draw, text, weight, size, max_width):
    while size > 20 and draw.textlength(text, font=font(weight, size)) > max_width:
        size -= 4
    return font(weight, size)


def curve(canvas, cx, cy, width, color, stroke):
    """The SwayCurve motif: M 4 12 Q 50 2 100 12 T 196 12 (app/components/SwayCurve.tsx)."""
    k = 4
    big = Image.new("RGBA", (canvas.width * k, canvas.height * k), (0, 0, 0, 0))
    d = ImageDraw.Draw(big)
    sx = width / 192 * k
    ox = (cx - width / 2) * k - 4 * sx
    oy = cy * k - 12 * sx

    def quad(p0, p1, p2, n=60):
        return [
            ((1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0], (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1])
            for t in [i / n for i in range(n + 1)]
        ]

    pts = quad((4, 12), (50, 2), (100, 12)) + quad((100, 12), (150, 22), (196, 12))[1:]
    pts = [(ox + x * sx, oy + y * sx) for x, y in pts]
    d.line(pts, fill=color + (255,), width=round(stroke * k), joint="curve")
    canvas.paste(big.resize(canvas.size, Image.LANCZOS), (0, 0), big.resize(canvas.size, Image.LANCZOS))


def gradient(canvas, top_alpha, bottom_alpha, start=0.45):
    w, h = canvas.size
    g = Image.new("L", (1, h))
    for y in range(h):
        t = max(0.0, (y / h - start) / (1 - start))
        g.putpixel((0, y), round(255 * (top_alpha + (bottom_alpha - top_alpha) * t)))
    shade = Image.new("RGB", (w, h), (8, 24, 20))
    canvas.paste(shade, (0, 0), g.resize((w, h)))


# ---------------------------------------------------------------- recipes
def solid(bg, headline=None, kicker=None, ink=WHITE, logo_color="white", accent=SAGE, big_logo=False):
    c = Image.new("RGB", (S, S), bg)
    d = ImageDraw.Draw(c)
    if big_logo:
        logo(c, logo_color, 860, S / 2, S / 2 - 70)
        tracked(d, (kicker or "THE GIFT OF WELLNESS"), font("text", 64), S / 2, S / 2 + 230, accent, 18)
        return c
    if kicker:
        tracked(d, kicker.upper(), font("text", 62), S / 2, 560, accent, 20)
    f = fit(d, headline, "regular", 250, S - 260)
    d.text((S / 2, S / 2 - 40), headline, font=f, fill=ink, anchor="mm")
    curve(c, S / 2, S / 2 + 170, 460, accent, 9)
    logo(c, logo_color, 330, S / 2, S - 300)
    return c


def panel(photo, headline, focus=(0.5, 0.5), kicker=None):
    """Photo above, a cream band below with the message and the wordmark."""
    band = 560
    c = Image.new("RGB", (S, S), CREAM)
    c.paste(cover(photo, focus, (S, S - band)), (0, 0))
    d = ImageDraw.Draw(c)
    top = S - band
    if kicker:
        tracked(d, kicker.upper(), font("text", 50), S / 2, top + 70, (74, 119, 109), 16)
    f = fit(d, headline, "regular", 168, S - 220)
    d.text((S / 2, top + (250 if kicker else 215)), headline, font=f, fill=FOREST, anchor="mm")
    curve(c, S / 2, top + (370 if kicker else 345), 300, SAGE, 7)
    logo(c, "green", 230, S / 2, top + 470)
    return c


def bleed(photo, headline=None, focus=(0.5, 0.5), tagline=None):
    """Full-bleed photo, darkened at the bottom, white type."""
    c = cover(photo, focus)
    gradient(c, 0.0, 0.72, 0.35)
    d = ImageDraw.Draw(c)
    if headline:
        f = fit(d, headline, "regular", 190, S - 240)
        d.text((S / 2, S - 470), headline, font=f, fill=WHITE, anchor="mm")
    if tagline:
        tracked(d, tagline.upper(), font("text", 56), S / 2, S - 350, SAGE_LIGHT, 18)
    logo(c, "white", 300, S / 2, S - 200)
    return c


def existing(photo, focus=(0.5, 0.5)):
    """A finished Sway design (already carries its own type), squared."""
    return cover(photo, focus)


DESIGNS = [
    # Everyday
    (201, "gift-of-wellness", "The Gift of Wellness", ["Everyday"], lambda: solid(FOREST, big_logo=True)),
    (202, "just-for-you", "Just for You", ["Everyday", "Self-Care"], lambda: panel("gift_card_image.jpg", "Just for you", (0.5, 0.25))),
    (203, "sway-sign", "The Sway Sign", ["Everyday"], lambda: existing("swaysign.jpg", (0.5, 0.42))),
    (204, "leaf", "Fresh Start", ["Everyday", "Self-Care"], lambda: panel("homepage_photo9.jpg", "A fresh start", (0.5, 0.45))),
    # Birthday
    (211, "happy-birthday-balloons", "Happy Birthday · Balloons", ["Birthday"], lambda: panel("eventballoon.jpg", "Happy Birthday", (0.5, 0.35))),
    (212, "happy-birthday", "Happy Birthday", ["Birthday"], lambda: solid(CREAM, "Birthday", "Happy", ink=FOREST, logo_color="green", accent=(74, 119, 109))),
    (213, "birthday-glow", "Birthday Glow", ["Birthday"], lambda: panel("facial1.jpg", "Happy Birthday", (0.5, 0.3))),
    # Thank You
    (221, "thank-you", "Thank You", ["Thank You"], lambda: solid(SAGE_LIGHT, "Thank You", "With gratitude", ink=FOREST, logo_color="green", accent=(74, 119, 109))),
    (222, "thank-you-stones", "Thank You · Salt Stones", ["Thank You"], lambda: panel("massage4.jpg", "Thank you", (0.5, 0.3))),
    # Love & Anniversary
    (231, "xoxo", "XOXO", ["Love"], lambda: existing("giftcard_valentines.jpg")),
    (232, "with-love", "With Love", ["Love", "Anniversary"], lambda: solid(FOREST, "With Love", "For you", accent=SAGE)),
    (233, "happy-anniversary", "Happy Anniversary", ["Anniversary"], lambda: panel("massage7.jpg", "Happy Anniversary", (0.5, 0.4))),
    # Congratulations
    (241, "congratulations", "Congratulations", ["Congratulations"], lambda: bleed("eventgreen.jpg", "Congratulations", (0.5, 0.5), "You did it")),
    # Self-care
    (251, "time-to-unwind", "Time to Unwind", ["Self-Care"], lambda: bleed("remedy-room.jpg", "Time to unwind", (0.45, 0.5))),
    (252, "sauna-day", "Sauna Day", ["Self-Care", "Everyday"], lambda: panel("join2.jpg", "Time to unwind", (0.5, 0.35))),
    # Mother's Day
    (261, "mothers-day", "Happy Mother's Day", ["Mother’s Day"], lambda: panel("mothersday.jpg", "Happy Mother’s Day", (0.5, 0.3))),
    # Holiday
    (271, "holiday-ornaments", "Holiday · The Gift of Wellness", ["Holiday"], lambda: existing("giftcard.jpg", (0.5, 0.5))),
    (272, "happy-holidays", "Happy Holidays", ["Holiday"], lambda: panel("holidaygcdesktop.jpg", "Happy Holidays", (0.5, 0.5))),
]


def save(img, size, slug, variant, quality):
    out = img if img.width == size else img.resize((size, size), Image.LANCZOS)
    tmp = os.path.join(OUT, "_tmp.jpg")
    out.save(tmp, "JPEG", quality=quality, optimize=True, progressive=True)
    data = open(tmp, "rb").read()
    name = f"{slug}-{variant}-{hashlib.sha256(data).hexdigest()[:16]}.jpg"
    os.replace(tmp, os.path.join(OUT, name))
    return name


def main():
    os.makedirs(OUT, exist_ok=True)
    old = json.load(open(LIBRARY)) if os.path.exists(LIBRARY) else {"designs": [], "archivedFiles": []}
    previous = {f for d in old["designs"] for f in (d["image"], d["thumbnail"], d["printImage"])} | set(old.get("archivedFiles", []))
    designs = []
    for id_, slug, name, occasions, draw in DESIGNS:
        art = draw()
        designs.append(
            {
                "id": id_,
                "slug": slug,
                "name": name,
                "occasions": occasions,
                "image": save(art, 1200, slug, "image", 86),
                "thumbnail": save(art, 480, slug, "thumbnail", 82),
                "printImage": save(art, 1800, slug, "print", 90),
            }
        )
        print(id_, slug)
    current = {f for d in designs for f in (d["image"], d["thumbnail"], d["printImage"])}
    json.dump(
        {"version": 1, "designs": designs, "archivedFiles": sorted((previous - current))},
        open(LIBRARY, "w"),
        indent=2,
        ensure_ascii=False,
    )
    open(LIBRARY, "a").write("\n")


if __name__ == "__main__":
    main()
