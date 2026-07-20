# Option 2 — "Scroll Story"

**File:** `design-options/option-2.html` · **Title:** `New Nuevo — Scroll Story`
**References:** https://copula.agency/ for the **storytelling flow** (the page is a narrative
you read by scrolling, told in chapters, one idea at a time) and
https://wearedaima.framer.website/ for the **parallax feel** (layered elements drifting at
different scroll speeds, giving the page physical depth).

## Concept

The homepage is a story in four chapters: who New Nuevo is → what it makes → proof (work) →
invitation (contact). Each chapter owns the full viewport while you read it. Copy arrives as
short, oversized statements revealed line by line; background shapes drift on parallax layers
behind the words. The user never clicks to learn — they just scroll.

## Palette

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#0E0E10` | Page background (near-black, slightly warm) |
| `--fog` | `#1A1A1E` | Cards, chapter panels |
| `--text` | `#F5F2EC` | Primary text |
| `--muted` | `#8B8781` | Labels, secondary text |
| `--coral` | `#FF5B55` | Accent: highlighted words, progress UI, shapes, hovers |

Dark canvas throughout — this contrasts deliberately with Option 1.

## Typography

- **Display:** `Fraunces` (Google Fonts, weights 400 + 600, optical size on) — a warm serif
  that makes the statements feel narrated, not shouted. Fallback `Georgia, serif`.
- **Labels/body:** Questrial, fallback `system-ui, sans-serif`.
- Statements: `clamp(1.8rem, 4.5vw, 3.8rem)`, `line-height: 1.2`, sentence case (not uppercase).
- Chapter labels: `01 · Who we are` style — 13 px uppercase Questrial, `--muted`, coral number.

## Fixed UI

- **Top-left:** logo mark only (crop the SVG to the coral square + "N", or use the full logo at
  36 px), links to top.
- **Top-right:** `hello@newnuevo.com`.
- **Left edge (desktop only):** vertical chapter progress — four dots with labels on hover;
  active dot is coral and elongated (pill). Clicking a dot smooth-scrolls to its chapter.
  Built by observing chapter sections with IntersectionObserver.
- **Bottom-right:** thin scroll progress arc or bar in coral.

## The story — chapter by chapter

Each chapter is a `<section>` of `min-height: 180vh–250vh` containing a `position: sticky;
top: 0; height: 100vh` inner panel. The extra height is the "reading time": while the section
scrolls past, the sticky panel stays put and its lines reveal in sequence, driven by scroll
progress through the section (compute `progress = (scrollY - section.offsetTop) /
(section.height - viewport)` in a rAF loop; map progress ranges to line reveals).

### Prologue (100vh, not sticky)
Logo wordmark centred at ~200 px wide, beneath it one Fraunces line: *"Every product starts as
a story."* and a `--muted` "Scroll" hint that fades out on first scroll. Two parallax blobs
(coral, 8% opacity, blurred 80 px) drift behind at speed 0.15.

### Chapter 01 — Who we are (sticky, 3 lines)
Label `01 · Who we are`. Lines reveal one at a time (previous lines stay, dimming to 55%):
1. *"We're New Nuevo — a creative digital studio in East London."*
2. *"Small by design: the people you meet are the people who build."*
3. *"Design and engineering under one roof, from first sketch to shipped product."*
Parallax: a large outlined circle (1 px coral stroke) rising at speed 0.3 behind the text; a
small solid coral square falling at speed 0.5.

### Chapter 02 — What we make (sticky, service sweep)
Label `02 · What we make`. A fixed statement *"We take products from"* with a swap-word after
it that changes with scroll progress: **idea → identity → interface → code → launch** (each word
in coral, crossfade + `translateY` swap). Beneath, the five services fade in one by one as
small pills. Parallax: three horizontal bars (fog colour) sliding sideways at speeds −0.2, 0.3, −0.4.

### Chapter 03 — Proof (work, NOT sticky — normal scroll)
Label `03 · Recent stories`. The three projects as alternating full-width panels (each ≈90vh,
`--fog` background, 24 px radius): abstract placeholder visual one side (README imagery rules;
give each project a distinct tint — Talk Changes teal-ish `#5BBFB5`, Adidas MDE coral, MCB
Harvard `#C9A34E`), text the other side — project name in Fraunces `clamp(2rem,4vw,3rem)`,
one-line description, roles as pills, fake "Read the story →" link (dead `#`, coral hover).
**Parallax here is the Daima moment:** each panel's visual translates vertically at 0.85× scroll
speed while its text moves at 1× — a gentle ±40 px divergence, clamped, via rAF + transform.

### Chapter 04 — Invitation (100vh, centred)
Label `04 · Your story`. Statement: *"The next story could be yours."* then a giant
`hello@newnuevo.com` mailto (coral underline sweep on hover). Below: address + map link,
Instagram, Twitter, `© New Nuevo 2026`. One slow coral blob drifting behind (speed 0.1).

## Motion rules

- Line reveals: `opacity 0→1` + `translateY(30px→0)`, 500 ms `cubic-bezier(0.22, 1, 0.36, 1)`.
- Parallax offsets always via `transform: translate3d`, computed in a single rAF loop reading
  one cached `scrollY`; clamp every offset so layers never overlap text illegibly.
- Native scroll only — sticky sections must never trap the wheel (see README §3.3).
- **Reduced motion:** kill parallax and the swap-word (render `idea → identity → interface →
  code → launch` inline as static text); replace sticky chapters with normal static sections
  where all lines are visible; keep simple fades only.

## Mobile (≤768 px)

Keep the sticky-chapter storytelling (it works well on mobile) but reduce section heights to
~160vh; hide the left progress rail (keep the bottom progress bar); stack Chapter 03 panels
(visual on top, text below) with parallax reduced to ±16 px; statements at clamp minimum.

## Commit checkpoints

1. `✨ Added: Design option 2 — chapter structure and sticky story panels`
2. `✨ Added: Design option 2 — parallax layers and progress UI`
3. `✨ Added: Design option 2 — work panels and reduced-motion fallbacks`
