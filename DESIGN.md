---
name: Among Cultists – Begleiter
description: Aufgeschlagenes Ledertagebuch mit Pergamentseiten als Interface, direkt aus dem Regelheft und der Player-Aid-Karte abgeleitet
colors:
  leather-900: "#1c110a"
  leather-800: "#2b1a0f"
  leather-700: "#3e2515"
  leather-600: "#55311b"
  leather-500: "#6e4021"
  parchment-100: "#f6ecd6"
  parchment-200: "#efe1c2"
  parchment-300: "#e6d3a8"
  parchment-stripe: "#e7c9ab"
  parchment-edge: "#cbae7c"
  ink: "#3a2413"
  ink-soft: "#5c4327"
  ink-faint: "#85714f"
  band: "#8a5a34"
  band-dark: "#6b4326"
  band-ink: "#f5e9cf"
  gold: "#c8952e"
  gold-bright: "#e3b656"
  navy: "#24324e"
  navy-soft: "#3a4d72"
  red: "#8a2f22"
  red-soft: "#b6493a"
typography:
  display:
    fontFamily: "PT Serif, Georgia, Times New Roman, serif"
    fontSize: "clamp(1.6rem, 5vw, 2.3rem)"
    fontWeight: 700
    letterSpacing: "-0.01em"
  title:
    fontFamily: "PT Serif, Georgia, Times New Roman, serif"
    fontSize: "clamp(1.25rem, 4.4vw, 1.7rem)"
    fontWeight: 700
  section:
    fontFamily: "PT Serif, Georgia, Times New Roman, serif"
    fontSize: "1.05rem"
    fontWeight: 700
  body:
    fontFamily: "Baloo 2, Trebuchet MS, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.48
  label:
    fontFamily: "Baloo 2, Trebuchet MS, sans-serif"
    fontSize: "0.82rem"
    fontWeight: 700
    letterSpacing: "0.03em"
    textTransform: uppercase
rounded:
  pill: "999px"
  card: "14px"
  page: "20px"
  input: "10px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "10px"
  lg: "14px"
  xl: "22px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.leather-900}"
    rounded: "{rounded.pill}"
    padding: "12px 22px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "12px 22px"
  button-danger:
    backgroundColor: "{colors.red}"
    textColor: "{colors.parchment-100}"
    rounded: "{rounded.pill}"
    padding: "12px 22px"
  pill-selected:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.leather-900}"
    rounded: "{rounded.pill}"
    padding: "9px 16px"
  pill-default:
    backgroundColor: "{colors.parchment-100}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "9px 16px"
  card:
    backgroundColor: "{colors.parchment-100}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "13px 14px"
  tab-active:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.leather-900}"
    rounded: "{rounded.card}"
  tab-default:
    backgroundColor: "{colors.band}"
    textColor: "{colors.band-ink}"
    rounded: "{rounded.card}"
---

# Design System: Among Cultists – Begleiter

## Overview

**Creative North Star: "The Diary on the Table"**

The app is a single physical object: an old leather diary, opened flat on the table, its pages made of aged parchment. There is no dashboard, no app chrome, no floating nav bar invented on top of the material — the tab strip is drawn as three banner-headed table headings taken from the game's own printed tables, and the "page" itself carries the content. This is a Brief-Pinned world: the palette, the type pairing, and the texture photography are all lifted directly from the user's own reference photo and the official rulebook/player-aid pages, not invented. Every color in `theme.css` traces back to leather, parchment, ink, or the game's own iconographic gold/navy/red — nothing was added for decoration.

The material is real, not simulated: `leather-tile.jpg`, `parchment-tile.jpg`, and `deckle-edge.jpg` are photographic textures from CC0 sources (ambientCG Leather030 and Paper003; the torn edge with stitches is composed in-house, see `src/assets/textures/QUELLEN.md`), injected as CSS custom properties (`--tex-leather`, `--tex-parchment`, `--tex-deckle`) at runtime in `main.tsx` so Vite can hash and base-path them correctly. CSS gradients layer light vignettes and color washes *over* these photographs for depth and legibility — they never replace them with a flat simulated pattern. The deckle-edge texture repeats vertically down the left edge of every page as a torn book-edge, which is the one deliberate departure from a flat rectangle in an otherwise rectangular, card-based layout.

**Key Characteristics:**
- Real photographic leather/parchment/deckle-edge material (CC0), never CSS-simulated texture and never third-party artwork
- Serif display type (PT Serif 700) for titles, rounded sans (Baloo 2) for everything else, including numerals
- Gold as the single interactive accent; navy and red are fixed semantic colors (Investigator / Cultist), never used for arbitrary UI
- Tab strip styled as the game's own printed table-header banners, not an invented nav bar
- Pill-shaped buttons and toggles throughout; the page and its cards are the only rectangular, large-radius shapes

## Colors

The palette is warm and low-saturation everywhere except the two semantic accents (navy, red), which are reserved for the game's own factions.

### Primary
- **Gold** (`#c8952e`, bright variant `#e3b656`): the single interaction accent. Used for the active tab, the primary button, selected pills/toggles, focus rings, the progress-bar fill, and the scrollbar thumb. Nowhere else.

### Secondary
- **Navy** (`#24324e`, soft variant `#3a4d72`): fixed semantic color for the Investigator faction — the "alive" side of the alive/geist switch, the Investigator verdict banner, navy badges. Never used decoratively.
- **Muted Red** (`#8a2f22`, soft variant `#b6493a`): fixed semantic color for the Cultist/death faction — the "geist" side of the switch, the Cultist verdict banner, destructive buttons (`.btn.danger`), the icon-button hover state. Never used decoratively.

### Neutral
- **Deep Leather** (`#1c110a` through `#6e4021`, five steps): the frame material — page shadows' color basis, text-on-gold color, tab-strip and pill borders, scrollbar track.
- **Warm Parchment** (`#f6ecd6`, `#efe1c2`, `#e6d3a8`): the page/card surface family. `parchment-100` is the base card fill and input background; `parchment-stripe` (`#e7c9ab`) alternates with `parchment-100` in printed-table rows; `parchment-edge` (`#cbae7c`) is the card/stripe border.
- **Ink** (`#3a2413` body, `#5c4327` soft, `#85714f` faint): the text ramp on parchment, darkest for headings and primary body copy, softest for subtitles and disabled-feeling captions.
- **Band Brown** (`#8a5a34` / `#6b4326`): the inactive tab-strip banner, echoing the printed table-header bands from the source material.

### Named Rules
**The One Accent Rule.** Gold is the only color used purely for interaction/selection state. Navy and red are semantic (faction-bound), never applied to a control just because it needs emphasis.

**The Real Material Rule.** Leather, parchment, and the deckle edge are photographic crops, injected via CSS custom properties, never approximated with CSS gradients or patterns alone; gradients only wash *over* the photograph for depth or legibility.

## Typography

**Display Font:** PT Serif (with Georgia, Times New Roman fallback)
**Body Font:** Baloo 2 (with Trebuchet MS fallback)

**Character:** A heavy serif for headings gives the printed-rulebook weight the world calls for (PT Serif ships no 900 cut, so 700 is the ceiling and the system doesn't fight that). Baloo 2's rounded, friendly sans carries everything else — labels, body copy, and numerals — so the interface stays legible and tappable at the table despite the antique dressing.

### Hierarchy
- **Display** (700, `clamp(1.6rem, 5vw, 2.3rem)`): the app title only, set on parchment-tinted text over the leather frame with a drop shadow for legibility.
- **Title** (700, `clamp(1.25rem, 4.4vw, 1.7rem)`): the page-title heading at the top of each opened book page.
- **Section** (700, `1.05rem`): recurring sub-headings within a page (e.g. grouped setup steps).
- **Body** (400, `0.9rem`, line-height 1.48): card copy, descriptions, rule text — always ink-colored on parchment.
- **Label** (700, `0.82rem`, `0.03em` tracking, uppercase): table-row keys (`.stripe-row .k`) and badges only — never used as a decorative kicker above headings.

### Named Rules
**The Tabular Numerals Rule.** `font-variant-numeric: tabular-nums` is set globally; counters, round numbers, and score displays never jitter in width as digits change.

## Layout

Single-column, mobile-first, capped at an `880px` max-width shell centered on the page (`.app-shell`). Content stacks as a sequence of "pages" (`.page`), each a self-contained parchment surface with generous internal padding (`22px 20px 26px 40px` — the extra left padding accommodates the deckle-edge strip). Cards within a page stack vertically with `10px` gaps; stripe-table rows have no gap (`2px`) so the alternating bands read as one continuous printed table. The tab strip is a sticky 3-column grid pinned near the top (`top: 10px`) so navigation stays reachable while scrolling a long page during a live game. A single breakpoint at `640px` nudges tab padding and font size up slightly for larger phones/tablets; no separate desktop layout exists — the product is a phone-in-hand companion.

## Elevation & Depth

Hybrid: flat photographic material for surfaces, with soft directional shadows used structurally to stack "page over background" and "card over page" rather than for ambient decoration.

### Shadow Vocabulary
- **Page shadow** (`0 18px 45px -12px rgba(10,5,2,0.65), 0 4px 12px rgba(10,5,2,0.35)`): lifts the whole parchment page off the leather background, like a physical sheet lying on the diary.
- **Card shadow** (`0 6px 16px -6px rgba(58,36,19,0.35), 0 2px 4px rgba(58,36,19,0.18)`): the same relationship one level down — a card sitting on the page.
- **Inset highlight** (`inset 0 1px 0 rgba(255,255,255,0.25)`): a single top-edge sheen on the page, suggesting a slightly curved paper surface catching light.

### Named Rules
**The Stacked-Paper Rule.** Shadow strength scales with the physical stacking order (background < page < card); nothing floats above its material without a shadow that justifies it.

## Shapes

Two coexisting corner languages, both deliberate: **pill shapes** (`999px` radius) for anything interactive and tappable — buttons, pills, toggles, badges, the progress track — so touch targets read as friendly and unambiguous at the table; and **soft rectangles** (`20px` page radius, `14px` card radius, `10px` input radius) for containers, echoing a physical sheet of paper with rounded-off corners rather than a sharp-cut card. The one intentional break from rectilinear geometry is the deckle-edge strip along the left margin of every page — a real torn-paper silhouette, not a UI affordance.

## Components

### Buttons
- **Shape:** pill (`border-radius: 999px`)
- **Primary:** gold gradient fill (`linear-gradient(180deg, var(--gold-bright), var(--gold))`) on a gold border, dark leather text, `12px 22px` padding, card shadow at rest
- **Hover / Focus:** primary lifts 1px and gains a warmer gold glow shadow; global focus-visible state is a `2.5px` gold-bright outline with `2px` offset on every focusable element, not just buttons
- **Ghost:** transparent background, ink text, leather border — used for secondary/dismissive actions
- **Danger:** red gradient fill, parchment text — reserved for destructive actions only, reusing the Cultist semantic red

### Chips (Pills)
- **Style:** parchment-100 background, ink text, leather border, pill radius; used for single/multi-select option groups (player count, variant choice)
- **State:** selected pill switches to the gold gradient with dark leather text and a soft gold focus ring; a `.small` variant reduces padding/font-size for dense option rows

### Cards / Containers
- **Corner Style:** `14px` radius
- **Background:** the same parchment photograph as the page, with a slightly darker warm wash layered on top so the card visibly separates from the page beneath it
- **Shadow Strategy:** card shadow (see Elevation)
- **Border:** `1px solid` parchment-edge
- **Internal Padding:** `13px 14px`

### Inputs / Fields
- **Style:** parchment-100 background, ink text, `1.5px` leather border, `10px` radius
- **Focus:** border shifts to gold, outline suppressed in favor of the border-color change

### Navigation
- **Style:** the three-tab strip is styled as the game's own printed table-header banner (brown gradient, cream text), not an invented app nav bar. Default tabs use the band-brown gradient; the active tab switches to the gold gradient with dark leather text and a soft outer glow ring. Sticky-positioned so it stays reachable mid-scroll during live play.

### Stripe Table (signature component)
Rows alternate between `parchment-100` and `parchment-stripe` backgrounds with no gap between them, directly reproducing the printed material-count tables from the rulebook. Each row is a key/value pair: an uppercase, letter-spaced label on the left, a larger plain-weight value on the right. Used wherever the app needs to present rulebook-sourced tabular data (setup material counts, reference tables).

### Hand-Drawn Icon Set (signature component)
All icons in `Icon.tsx` are single-weight (`1.7px` stroke), round-cap/round-join SVG line drawings authored to match the feather-illustration style of the source material — no emoji, no icon font, no filled glyph icons. Every icon shares the same `24x24` viewBox and stroke treatment so the set reads as one drawn hand across setup, status, and reference views.

## Do's and Don'ts

### Do:
- **Do** keep the tab strip framed as a printed table-header banner (brown/gold gradient bands), not a generic bottom or top app-bar.
- **Do** use pill radius (`999px`) for every tappable control and soft rectangle radii (`10–20px`) for every container.
- **Do** reserve navy and red strictly for Investigator/Cultist semantics; reach for gold when a new control needs an interactive accent.
- **Do** layer new photographic or gradient washes only on top of the existing leather/parchment/deckle-edge photographs — never introduce a fourth simulated material.
- **Do** keep numerals and body text in Baloo 2, reserving PT Serif for display, title, and section headings only.

### Don't:
- **Don't** invent flat Material-Design dashboard chrome (nav rails, FABs, elevation cards with drop shadows unrelated to the paper metaphor) — the direction contract explicitly refuses the category norm here, and the build honors that.
- **Don't** add a fourth accent color for a one-off UI need; the system has exactly three (gold interactive, navy/red semantic) and no others are in circulation.
- **Don't** introduce uppercase label styling as decorative kicker text above headings — in this build, uppercase letter-spaced text is reserved for stripe-table keys and badges, both of which mirror real printed table conventions from the source material, and should not spread further.
- **Don't** use glyph/emoji icons anywhere; the hand-drawn line-icon set is the only icon language.
