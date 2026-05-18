"""Generate Open Graph card PNGs (1200x630) for landing + 3 case studies.

Run with the venv that has Pillow:
    ~/.claude/skills/.venv/bin/python3 scripts/build-og-cards.py

Outputs to public/og/{landing,hti,fpt-hr,fpt-contract}.png. Re-run after copy
changes; ship the PNGs to git.
"""

from __future__ import annotations

import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

CARD_WIDTH = 1200
CARD_HEIGHT = 630
PAD = 80

# Brand tokens — must match src/styles/global.css
BG_LIGHT = "#f8fafc"
ACCENT_PRIMARY = "#2563eb"
ACCENT_SECONDARY = "#0ea5e9"
ACCENT_TERTIARY = "#06b6d4"
TEXT_PRIMARY = "#0f172a"
TEXT_SECONDARY = "#475569"
TEXT_TERTIARY = "#94a3b8"
CHIP_BG = "#e3edff"

FONT_REG = "/usr/share/fonts/truetype/crosextra/Carlito-Regular.ttf"
FONT_BOLD = "/usr/share/fonts/truetype/crosextra/Carlito-Bold.ttf"

CARDS = [
    {
        "out": "public/og/landing.png",
        "eyebrow": "DAM HONG PHUC  ·  AI FULL-STACK ENGINEER",
        "title": "Production Conversational AI Agents",
        "subtitle": "RAG  ·  Multi-Agent Systems  ·  Enterprise AWS",
        "tag": "FORTUNE 500 EXPERIENCE",
    },
    {
        "out": "public/og/hti.png",
        "eyebrow": "CASE STUDY  ·  HTI GROUP",
        "title": "Enterprise HR Agentic Chatbot",
        "subtitle": "LangGraph Multi-Agent  ·  Hierarchical RAG  ·  AWS Lambda + ECS Fargate",
        "tag": "POC → ENTERPRISE PRODUCTION",
    },
    {
        "out": "public/og/fpt-hr.png",
        "eyebrow": "CASE STUDY  ·  COVESTRO AG (VIA FPT SOFTWARE)",
        "title": "HR Conversational AI Platform",
        "subtitle": "Fortune 500 Migration  ·  Event-Driven AWS  ·  Semantic Caching  ·  Zero-Trust",
        "tag": "FORTUNE 500  ·  ZERO DOWNTIME",
    },
    {
        "out": "public/og/fpt-contract.png",
        "eyebrow": "CASE STUDY  ·  FPT SOFTWARE",
        "title": "AI Contract Intelligence System",
        "subtitle": "Skill-Based Framework  ·  Prompt Chaining + Qdrant RAG  ·  AWS Bedrock",
        "tag": "+35% EXTRACTION ACCURACY",
    },
]


def hex_to_rgb(h: str) -> tuple[int, int, int]:
    h = h.lstrip("#")
    return (int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16))


def gradient_bar(width: int, height: int, stops: list[str]) -> Image.Image:
    """Linear horizontal multi-stop gradient bar."""
    bar = Image.new("RGB", (width, height))
    pixels = bar.load()
    rgb = [hex_to_rgb(s) for s in stops]
    segments = len(rgb) - 1
    seg_w = width / segments
    for x in range(width):
        seg = min(int(x / seg_w), segments - 1)
        t = (x - seg * seg_w) / seg_w
        c1, c2 = rgb[seg], rgb[seg + 1]
        r = int(c1[0] + (c2[0] - c1[0]) * t)
        g = int(c1[1] + (c2[1] - c1[1]) * t)
        b = int(c1[2] + (c2[2] - c1[2]) * t)
        for y in range(height):
            pixels[x, y] = (r, g, b)
    return bar


def wrap(text: str, font: ImageFont.FreeTypeFont, max_width: int, draw: ImageDraw.ImageDraw) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current: list[str] = []
    for word in words:
        candidate = " ".join(current + [word])
        bbox = draw.textbbox((0, 0), candidate, font=font)
        if bbox[2] - bbox[0] <= max_width or not current:
            current.append(word)
        else:
            lines.append(" ".join(current))
            current = [word]
    if current:
        lines.append(" ".join(current))
    return lines


def draw_card(spec: dict) -> None:
    img = Image.new("RGB", (CARD_WIDTH, CARD_HEIGHT), BG_LIGHT)

    # Top gradient bar (8px) — visual brand anchor
    bar = gradient_bar(CARD_WIDTH, 8, [ACCENT_PRIMARY, ACCENT_SECONDARY, ACCENT_TERTIARY])
    img.paste(bar, (0, 0))

    # Soft accent orb top-right (radial glow via blurred ellipse)
    orb_layer = Image.new("RGB", (CARD_WIDTH, CARD_HEIGHT), BG_LIGHT)
    orb_draw = ImageDraw.Draw(orb_layer)
    cx, cy, r = int(CARD_WIDTH * 0.88), int(CARD_HEIGHT * 0.18), 360
    orb_draw.ellipse([(cx - r, cy - r), (cx + r, cy + r)], fill=(199, 226, 255))
    orb_layer = orb_layer.filter(ImageFilter.GaussianBlur(160))
    img = Image.blend(img, orb_layer, 0.55)

    draw = ImageDraw.Draw(img)

    font_eyebrow = ImageFont.truetype(FONT_BOLD, 22)
    font_title = ImageFont.truetype(FONT_BOLD, 64)
    font_subtitle = ImageFont.truetype(FONT_REG, 28)
    font_tag = ImageFont.truetype(FONT_BOLD, 20)
    font_footer = ImageFont.truetype(FONT_REG, 22)

    # Eyebrow
    y = 130
    draw.text((PAD, y), spec["eyebrow"], fill=ACCENT_PRIMARY, font=font_eyebrow)
    y += 56

    # Title (wrap if too long)
    for line in wrap(spec["title"], font_title, CARD_WIDTH - 2 * PAD, draw):
        draw.text((PAD, y), line, fill=TEXT_PRIMARY, font=font_title)
        bbox = draw.textbbox((0, 0), line, font=font_title)
        y += (bbox[3] - bbox[1]) + 16

    y += 18

    # Subtitle (wrap)
    for line in wrap(spec["subtitle"], font_subtitle, CARD_WIDTH - 2 * PAD, draw):
        draw.text((PAD, y), line, fill=TEXT_SECONDARY, font=font_subtitle)
        bbox = draw.textbbox((0, 0), line, font=font_subtitle)
        y += (bbox[3] - bbox[1]) + 8

    # Bottom: rounded-pill tag (left) + brand footer (right)
    tag_text = spec["tag"]
    tag_bbox = draw.textbbox((0, 0), tag_text, font=font_tag)
    tag_w = tag_bbox[2] - tag_bbox[0]
    tag_h = tag_bbox[3] - tag_bbox[1]
    chip_pad_x, chip_pad_y = 26, 14
    chip_w = tag_w + chip_pad_x * 2
    chip_h = tag_h + chip_pad_y * 2
    chip_x = PAD
    chip_y = CARD_HEIGHT - PAD - chip_h
    draw.rounded_rectangle(
        [(chip_x, chip_y), (chip_x + chip_w, chip_y + chip_h)],
        radius=999,
        fill=CHIP_BG,
    )
    draw.text((chip_x + chip_pad_x, chip_y + chip_pad_y - 4), tag_text, fill=ACCENT_PRIMARY, font=font_tag)

    # Footer right: site URL
    footer = "maver1ch.github.io"
    fbbox = draw.textbbox((0, 0), footer, font=font_footer)
    fw = fbbox[2] - fbbox[0]
    fh = fbbox[3] - fbbox[1]
    draw.text(
        (CARD_WIDTH - PAD - fw, CARD_HEIGHT - PAD - fh - 6),
        footer,
        fill=TEXT_TERTIARY,
        font=font_footer,
    )

    os.makedirs(os.path.dirname(spec["out"]), exist_ok=True)
    img.save(spec["out"], "PNG", optimize=True)
    print(f"wrote {spec['out']}  ({os.path.getsize(spec['out']) // 1024} KB)")


def main() -> None:
    for spec in CARDS:
        draw_card(spec)


if __name__ == "__main__":
    main()
