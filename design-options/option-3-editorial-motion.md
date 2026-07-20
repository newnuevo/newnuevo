# Option 3 — "Editorial × Motion" (recommended starting point)

**File:** `design-options/option-3.html` · **Title:** `New Nuevo — Editorial × Motion`
**References:** the **layout/style discipline** of https://www.eticalgarve.com/ combined with
the **parallax depth** of https://wearedaima.framer.website/ and a lighter dose of
https://copula.agency/'s narrative sequencing. This is the "best of both" candidate.

## Concept

Option 1's confident editorial grid, but alive: the poster typography sits on a page with
physical depth — images and shapes drift at different scroll speeds, headlines assemble as you
reach them, and one signature pinned moment shows the studio's range. Light theme, print-like,
but unmistakably built by people who love motion.

## Palette

Same as Option 1 (`--paper #F4F1EA`, `--ink #141414`, `--coral #FF5B55`,
`--paper-dim #E7E2D6`) — plus `--shadow: rgba(20,20,20,0.08)` for floating layers. Sections do
**not** alternate dark/light here; the whole page stays paper except the footer (ink).

## Typography

Same pairing as Option 1: Archivo (800) uppercase display + Questrial body. One addition:
display headlines animate in **per-line** — wrap each headline line in an overflow-hidden span
and slide the inner text up from 100% (`translateY(100%) → 0`, 600 ms, 80 ms stagger) when it
enters the viewport.

## Layout — section by section

1. **Header:** identical pattern to Option 1 (sticky, logo left, email right, hairline rule).
2. **Hero (100vh) — the depth statement:** headline `WE DESIGN & / BUILD DIGITAL / PRODUCTS`
   at `clamp(3rem, 10vw, 9rem)`, layered with three parallax objects *behind and in front of*
   the type:
   - a large coral outlined circle behind (speed 0.2),
   - a small solid ink square in front of the headline's corner (speed 0.6),
   - a mid-size abstract gradient card (like a floating project thumbnail, speed 0.4) peeking
     from the right edge, overlapping one headline line by ~10%.
   Subtle mouse-move parallax on desktop too: layers shift up to ±10 px toward the cursor
   (lerped in rAF, disabled on touch + reduced motion). Bottom: positioning line + "Scroll ↓".
3. **Intro statement (short):** centred single sentence at `clamp(1.6rem, 3vw, 2.6rem)`:
   *"A small London studio taking products from first sketch to shipped code."* Words fade from
   30% to 100% ink as the section crosses the viewport middle (scroll-progress mapped, like a
   read-along highlight — this is the Copula touch).
4. **Selected work — parallax rows:** label `01 — SELECTED WORK`. Three editorial rows on
   hairline rules as in Option 1, but each row carries its abstract visual **always visible**,
   offset into the grid (visual spans columns 7–12, text 1–6; alternate sides per row). The
   visual translates at 0.9× scroll speed (±30 px divergence) and scales `1.04 → 1.0` as it
   enters — the Daima drift. Project name slides up per-line. Same three projects + content
   as the README.
5. **Signature pinned moment — services:** a 300vh section with a sticky 100vh panel. Left:
   giant `WHAT WE DO` stays fixed. Right: the five services swap through as scroll progresses
   (one at a time, huge Archivo, previous one exits up / next enters from below, coral index
   number `1/5 … 5/5`). This is the one "wow" scroll moment — keep every other section calm.
6. **Studio strip:** full-bleed `--paper-dim` band, two columns: short studio paragraph left;
   right, a compact fact list (Founded · London E17 · Independent · Design + Engineering) on
   hairline rules.
7. **Footer (ink):** identical to Option 1's footer (giant `LET'S TALK →`, address, socials,
   logo, copyright).

## Motion rules

- One shared rAF loop for: scroll parallax, hero mouse parallax, read-along highlight, pinned
  services progress. All transforms `translate3d`/`scale`, all offsets clamped.
- IntersectionObserver (once) for line-slide headline reveals and row fades.
- Hover: work rows lift their visual by 6 px + deepen `--shadow`; links go coral.
- **Reduced motion:** no parallax, no mouse-follow, no pinned swap (render all five services
  as a static list), headlines appear without slide; keep plain fades.

## Mobile (≤768 px)

Hero layers shrink and clamp to ±12 px drift, mouse parallax off; work rows stack
(visual above text) keeping ±14 px scroll drift; pinned services section becomes a static
numbered list (the sticky swap is desktop-only — gate it at `min-width: 769px`); footer stacks.

## Commit checkpoints

1. `✨ Added: Design option 3 — editorial grid and hero depth layers`
2. `✨ Added: Design option 3 — work rows with parallax drift`
3. `✨ Added: Design option 3 — pinned services moment and polish`
