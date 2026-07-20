# Option 1 — "Studio Editorial"

**File:** `design-options/option-1.html` · **Title:** `New Nuevo — Studio Editorial`
**Reference:** https://www.eticalgarve.com/ — follow its **layout, style and design language**,
not its typeface. Think confident southern-European creative-school energy: poster-scale type,
strict grid, flat colour blocking, playful but disciplined.

## Concept

New Nuevo as a bold editorial poster. The page reads like a printed studio manifesto: huge
display headlines, hairline rules, numbered lists, a marquee strip, and colour-blocked sections
that alternate as you scroll. Minimal motion — the design carries the page, not animation.

## Palette

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#F4F1EA` | Page background (warm off-white, never pure white) |
| `--ink` | `#141414` | Text, rules, dark section backgrounds |
| `--coral` | `#FF5B55` | Brand accent: hero highlight word, hovers, marquee, buttons, section numbers |
| `--paper-dim` | `#E7E2D6` | Alternate section background / card fill |

Sections alternate backgrounds in this order: paper → ink (inverted text) → paper → coral (ink text) → ink.

## Typography

- **Display:** `Archivo` (Google Fonts, weights 500 + 800, use `font-stretch`/`Archivo Expanded`
  if available) — fallback stack `Archivo, 'Helvetica Neue', Arial, sans-serif`.
  Headlines set in **uppercase**, tight tracking (`letter-spacing: -0.02em`), tight leading (`line-height: 0.95`).
- **Body/labels:** Questrial (the existing brand font), fallback `system-ui, sans-serif`. 16–18 px, `line-height: 1.6`.
- Scale: hero headline `clamp(3rem, 11vw, 9.5rem)`; section headlines `clamp(2rem, 6vw, 4.5rem)`;
  small caps labels 12 px uppercase with `letter-spacing: 0.15em`.

## Layout — section by section

Grid: 12-column, `max-width: 1440px`, 24 px gutters (16 px on mobile). Sections separated by
1 px `--ink` hairline rules running full-bleed.

1. **Header (sticky, top):** logo SVG left at 44 px tall; right side: `hello@newnuevo.com`
   link + a coral square (12×12 px, echoes the logo mark). Header has a 1 px bottom rule and
   `--paper` background with slight blur (`backdrop-filter`).
2. **Hero (≈95vh):** the positioning line as a poster, broken over 3–4 lines:
   `CREATIVE / DIGITAL / STUDIO*` with the word `STUDIO` in coral. Below it, small body line:
   "Software development & design — London E17." Bottom edge of hero: a tiny footnote
   `*est. Walthamstow` left, and "Scroll" with a ↓ right.
3. **Marquee strip:** full-bleed coral band, one row of repeating uppercase text scrolling
   horizontally on a loop: `DESIGN — BUILD — SHIP — REPEAT — `. Pure CSS animation
   (duplicate the run of text, `translateX` keyframes). Pauses on hover; static text if reduced motion.
4. **Services ("What we do"):** ink (dark) section. Left column: small label `01 — SERVICES`.
   Right: the five services as an oversized numbered list, one per row with hairline dividers.
   On hover a row's text turns coral and slides 12 px right.
5. **Selected work:** paper section, label `02 — SELECTED WORK`. The three projects (Talk
   Changes, Adidas MDE, MCB Harvard) as full-width rows: big project name left, roles + one-line
   description right, hairline rule between. Each row hover reveals its abstract placeholder
   "image" (a 16:10 gradient/SVG block, per README imagery rules) sliding up from `opacity: 0,
   translateY(16px)` on the right side. On mobile, placeholders always visible above the text.
6. **Studio blurb:** coral section, ink text. Two-column: label `03 — STUDIO` left; right, a
   short 3-sentence paragraph set at `clamp(1.4rem, 2.6vw, 2.2rem)` about being a small studio
   that designs and builds end-to-end.
7. **Footer / contact (ink, tall ≈70vh):** giant `LET'S TALK →` mailto link at hero scale, coral
   on hover with the arrow translating right. Below in a 3-column row: address (with map link),
   socials (Instagram / Twitter), and the logo mark. Tiny `© New Nuevo 2026` bottom rule.

## Motion (keep it restrained)

- Enter-viewport reveal on section headlines and list rows: fade + `translateY(24px→0)`,
  400 ms, 60 ms stagger between rows (IntersectionObserver, once).
- Marquee as above.
- All link hovers: 200 ms colour transition to coral.
- Nothing else. No parallax in this option — its identity is *stillness and confidence*.

## Mobile (≤768 px)

Single column everywhere; hero type at the clamp minimum still fills the width; services list
numbers move above the text; work rows stack (placeholder, name, roles, description); footer
columns stack. Marquee stays.

## Commit checkpoints

1. `✨ Added: Design option 1 — editorial layout structure`
2. `✨ Added: Design option 1 — hover states, marquee and reveal polish`
