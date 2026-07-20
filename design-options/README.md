# New Nuevo — Homepage Design Options (Brief for Implementation)

This folder contains the brief for producing **4 alternative homepage design directions** for
New Nuevo as fast, throwaway **HTML/CSS/JS prototypes** (no Next.js integration yet — that
comes after Mike picks a direction).

Read this file fully first. Then implement each option from its own spec file:

| # | File | Direction | Primary reference |
|---|------|-----------|-------------------|
| 1 | [`option-1-studio-editorial.md`](./option-1-studio-editorial.md) | Bold editorial agency layout | https://www.eticalgarve.com/ (layout / style / design — **not** the font) |
| 2 | [`option-2-scroll-story.md`](./option-2-scroll-story.md) | Chaptered scroll storytelling + parallax | https://copula.agency/ (storytelling flow) + https://wearedaima.framer.website/ (parallax) |
| 3 | [`option-3-editorial-motion.md`](./option-3-editorial-motion.md) | Hybrid: editorial grid + parallax motion | Both of the above |
| 4 | [`option-4-night-signal.md`](./option-4-night-signal.md) | Dark, kinetic-type alternative | Original direction using existing brand |

> **References note:** if your network allows, open the reference sites and study them before
> starting. If they are unreachable (all three were blocked from the environment that wrote
> this brief), the option specs below are written to be fully self-contained — every layout,
> palette, and motion decision is spelled out so you do not need the live sites.

---

## 1. What New Nuevo is (use this content everywhere)

- **Name:** New Nuevo
- **Positioning line:** *Creative Digital Studio specialising in software development and design*
- **Location:** Creative Works, First Floor, 7 Blackhorse Lane, London, E17 6DS
  (link to: https://www.google.co.uk/maps/place/Creative+Works/@51.5886675,-0.0420934,17z)
- **Email:** use `hello@newnuevo.com` as placeholder text (the live site pulls the real value
  from Contentful — do not wire Contentful into the prototypes)
- **Social:** Instagram https://instagram.com/thenewnuevo · Twitter/X https://twitter.com/thenewnuevo
- **Logo:** the stacked "NEW NUEVO" wordmark SVG. Copy the inline `<svg>` verbatim from
  `pages/index.tsx` (the one with the coral square `#ff5b55` path). Do not redraw it.
- **Brand accent:** coral `#ff5b55` — this is the one fixed brand colour. Every option must use it.
- **Current body font:** Questrial (Google Fonts). Options may keep or replace it — each spec says which.

### Case-study / project content (real projects, from `public/new_nuevo_design_branding_examples_v1.1.pdf`)

Use these three as the "Selected work" items in every option:

1. **Talk Changes** — talkchanges.org.uk. Free, confidential NHS psychological-therapy service
   for adults in City & Hackney. *Roles: Branding, UX/UI Design, Web Development.*
2. **Adidas MDE** — adidasmde.com. A 3-stage interactive self-assessment helping Adidas
   managers understand how they learn and grow. *Roles: UX/UI Development (with Hex Digital).*
3. **MCB Harvard** — mcb.harvard.edu. Website for Harvard's Department of Molecular and
   Cellular Biology: information, news and events. *Roles: UX/UI Development (with Hex Digital).*

### Services list (use in every option)

Brand & Identity · UX/UI Design · Web Development · Product Prototyping · Creative Direction

If an option needs more copy than listed in its spec, write short, confident, first-person-plural
studio copy ("We design and build…"). No lorem ipsum anywhere.

---

## 2. Deliverables

Create these files inside `design-options/`:

```
design-options/
  index.html      ← hub page: title, one card per option (name, 1-line concept, link), plain and quick
  option-1.html   ← Studio Editorial
  option-2.html   ← Scroll Story
  option-3.html   ← Editorial × Motion
  option-4.html   ← Night Signal
```

Each `option-*.html` is **one fully self-contained file**: all CSS in a `<style>` tag, all JS in
a `<script>` tag at the end of `<body>`. They must open correctly via `file://` double-click —
no build step, no server, no imports between files.

The only external requests allowed are:
- `/public/logo.png` or the inline SVG logo (prefer the inline SVG — zero requests), and
- Google Fonts (`fonts.googleapis.com`) **with a spec-compliant system-font fallback stack**,
  so the page still looks intentional if fonts fail to load.

No other CDNs, no JS libraries, no frameworks. **Vanilla JS only.**

### Imagery

No stock photos and no hotlinked images. Where a spec calls for "imagery", build abstract
placeholders in code: CSS gradients, layered `border-radius` shapes, inline SVG patterns,
duotone noise via SVG `<feTurbulence>`, or big typographic blocks. Each project card gets its
own placeholder treatment tinted per the option's palette. These read as deliberate art
direction, not missing content.

---

## 3. Hard technical rules (all options)

1. **Responsive:** must look right at 360 px, 768 px, 1024 px, 1440 px, and 1920 px wide.
   Mobile is not an afterthought — every spec includes mobile behaviour; follow it.
2. **Motion implementation:** `IntersectionObserver` for enter-viewport reveals;
   `requestAnimationFrame` + passive scroll listeners for parallax. Animate **only**
   `transform` and `opacity` (compositor-friendly). Never animate `top/left/width/height`.
3. **No scroll-jacking.** Native scroll always works. Parallax and pinning are done with
   `position: sticky` and transform offsets, never by intercepting wheel events.
4. **`prefers-reduced-motion: reduce`** must disable all parallax, marquees, and large
   translate reveals (fall back to simple fades or nothing). This is mandatory in every option.
5. **Accessibility:** semantic landmarks (`header/main/section/footer`), one `h1` per page,
   visible focus styles, colour contrast ≥ 4.5:1 for body text (coral `#ff5b55` on white fails
   for small text — use it for large display type, rules, buttons, and hovers, not paragraphs).
6. **Performance:** each file should stay under ~150 KB. Use `will-change` sparingly and only
   on actively animating elements.
7. Keep the page `<title>` format: `New Nuevo — {Option name}`.

---

## 4. Workflow & git rules — IMPORTANT

- Work on branch **`claude/blissful-cori-def90r`** only. Push with
  `git push -u origin claude/blissful-cori-def90r`.
- **Commit frequently.** Minimum commit checkpoints (more is fine):
  1. `design-options/index.html` hub created
  2. after each option's structure/layout is in place (one commit per option)
  3. after each option's motion + polish pass (one commit per option)
  Never batch multiple finished options into a single commit.
- **Mike is the sole commit author.** The repo's local git config is already set to
  `MikeDre <info@mikedre.com>` — do not change it, do not add `Co-Authored-By:` trailers,
  and do not add any AI/assistant attribution to commit messages, code comments, or files.
- Commit message style matches repo history: `✨ Added: …` / `♻️ Changed: …`, e.g.
  `✨ Added: Design option 2 — scroll story prototype`.
- Do **not** touch `pages/`, `styles/`, or anything outside `design-options/`.
- Do not open a pull request.

---

## 5. Definition of done (per option)

- [ ] Matches every section of its spec file, in the specified order
- [ ] All real content from §1 present (no lorem ipsum, no TODOs)
- [ ] Uses the real logo SVG and `#ff5b55`
- [ ] Responsive at all five widths in §3
- [ ] Reduced-motion fallback verified (emulate via devtools)
- [ ] Opens standalone from `file://` with no console errors
- [ ] Linked from `design-options/index.html`
- [ ] Committed and pushed
