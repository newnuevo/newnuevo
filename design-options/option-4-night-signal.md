# Option 4 — "Night Signal"

**File:** `design-options/option-4.html` · **Title:** `New Nuevo — Night Signal`
**Reference:** none — this is the wildcard, built purely from New Nuevo's existing brand
(black canvas, coral signal). It should feel clearly different from Options 1–3: darker,
sharper, more "engineering studio at 1am".

## Concept

A single dense screenful-plus of near-black interface where the coral `#ff5b55` behaves like a
signal light. Kinetic type, a cursor-following glow, and terminal-adjacent details (mono
labels, timestamps, coordinates). Where Option 1 is a poster and Option 2 is a story, this is
an instrument panel.

## Palette

| Token | Hex | Use |
|---|---|---|
| `--void` | `#0A0A0B` | Page background |
| `--panel` | `#131316` | Cards/panels, 1 px `#26262B` borders |
| `--text` | `#EDEDEF` | Primary text |
| `--dim` | `#77777E` | Secondary text, mono labels |
| `--coral` | `#FF5B55` | The signal: glow, live elements, hovers, status dot |

## Typography

- **Display:** `Space Grotesk` (Google Fonts, 500/700), fallback `system-ui, sans-serif`.
  Tight uppercase for the hero, sentence case elsewhere.
- **Mono details:** `Space Mono` or `ui-monospace, 'SF Mono', monospace` for labels like
  `LDN 51.5886°N / −0.0399°W`, `[STATUS: ACCEPTING PROJECTS]`, section indices.
- Hero wordmark line at `clamp(2.6rem, 9vw, 8rem)`.

## Layout — section by section

1. **Header:** logo SVG (use `filter: invert(1)` on the black paths or recolour fills to
   `--text`; keep the coral square coral) left; right, a mono status chip: pulsing coral dot +
   `ACCEPTING PROJECTS`. 1 px `#26262B` bottom border.
2. **Hero (100vh):**
   - Centre: `NEW NUEVO` as kinetic type — each letter is a span; letters have a slow idle
     drift (CSS keyframes, ±3 px, staggered delays) and repel a few px from the cursor within
     120 px radius (lerped rAF; touch/reduced-motion: static).
   - Beneath: positioning line in `--dim`, then `hello@newnuevo.com` in coral mono.
   - **Cursor glow:** a 480 px radial-gradient coral glow at 7% opacity follows the cursor
     (fixed element, `transform` lerped at 0.08 — trails softly). On touch devices it slowly
     roams on a keyframe path instead.
   - Corners of the hero carry fixed mono metadata: top-left `CREATIVE DIGITAL STUDIO`,
     top-right current time (JS, `Europe/London`), bottom-left the coordinates line,
     bottom-right `SCROLL ↓`.
3. **Marquee divider:** thin coral-bordered band, mono text loop:
   `DESIGN / BUILD / SHIP / ` — same CSS marquee technique + rules as Option 1.
4. **Services grid:** label `01 / CAPABILITIES`. Five `--panel` cards in an asymmetric grid
   (first card spans 2 columns). Each card: index `01`–`05` in mono, service name in Space
   Grotesk, one-line description in `--dim`. Hover: border turns coral and a faint coral
   radial gradient blooms from the cursor's entry point within the card.
5. **Work list:** label `02 / SELECTED WORK`. The three projects as compact terminal-style rows
   on `#26262B` rules: mono index, project name, roles in `--dim`, year-ish tag, and an `↗`.
   Hovering a row lights it coral and reveals a small floating preview card (the abstract
   placeholder visual) that follows the cursor near the row (desktop only; on mobile the
   preview sits statically under each row).
6. **Footer (short):** big coral `hello@newnuevo.com` mailto; under it a single mono line:
   address · Instagram · Twitter · `© NEW NUEVO 2026`.

## Motion rules

- One rAF loop for cursor glow, letter repel, and preview-card follow; all lerped, all
  `translate3d`.
- The pulsing status dot: 2 s opacity keyframe loop.
- Card border/gradient hovers: CSS only, 250 ms.
- **Reduced motion:** glow static-centred at low opacity, letters static, marquee static,
  status dot steady, preview cards revealed by focus/hover without following.

## Mobile (≤768 px)

Kinetic letters become a static stacked wordmark; corner metadata collapses to one mono line
under the hero; services grid stacks to one column; work previews inline; glow disabled.

## Commit checkpoints

1. `✨ Added: Design option 4 — night layout, hero and cursor glow`
2. `✨ Added: Design option 4 — capability cards, work list and polish`
