# Claude Design Prompt — andreasgrape.com (v3)

Project: Premium founder/operator site for Andreas Grape. Build something that does not look like a Claude-generated site.

## 0. Read This First — Anti-Patterns to Reject

This brief is a reaction to two failed drafts. Before designing anything, internalize what to avoid:

- Do not mix roman and italic serif within the same headline. It's a Claude tell.
- Do not put rounded "status pills" with little dots next to portfolio items. Tailwind default.
- Do not number sections "01 — Introduction" with em-dashes. Done to death.
- Do not make a 2x4 grid of equal modules with mono-caps eyebrows above each. It's a framework dashboard, not a founder site.
- Do not use a generic warm-amber accent color (#C8966A) — it's the default "premium" hex. Find something stranger.
- Do not use Söhne, Inter, GT America, JetBrains Mono. Banned. Pick fonts with personality.
- Do not open with a left-aligned hero block + right-side image/placeholder. It's the universal Claude fallback layout.

If you find yourself reaching for any of these — stop and choose differently. The whole point of this brief is to escape the defaults.

## 1. The One-Sentence Brief

A site that feels like it was built by a small studio in Stockholm for a serious operator — not by a design system.

The reference points are unltd.co (Andreas's partner Ash Pournouri's site) for attitude, and the attached portraits for atmosphere. Take the attitude. Reject the symmetry. Build something else.

## 2. What to Steal from unltd.co (and What to Reject)

**Steal:**
- Language as design. unltd.co repeats "One of the world's [...]" as a mantra across the entire portfolio. The repetition becomes the visual rhythm. We will do the same with a different formula (see §6).
- Wordmark as event. "UNLTD" sits as a centered, oversized, near-brutalist logo. Take that wordmark gravity — but make ours feel different.
- Deadpan declaratives. Short sentences. No transitions. No prose. Just statements.
- Year-as-metadata. Every portfolio item shows years, plain mono numerals, nothing else. We borrow this.
- Confidence over politeness. unltd.co never asks. It states. Match that energy.

**Reject:**
- The centered symmetry. unltd.co is bilaterally symmetric and almost archaic. We are not making an archive site. Use intentional, off-balance layouts.
- The all-uppercase grayscale. It's monochrome and cold. Andreas is warm. We have a palette to work with.
- The portfolio-as-wall. unltd.co treats every project equally. We have hierarchy — Nordic Angels is primary, others are secondary, One Agency is muted, sub-initiatives are nested.

## 3. Visual System (Specific Choices)

### Background & Surfaces
Not "dark mode." A lit room at night.

- Base: `#0F0D0A` — warm near-black, almost the color of dark walnut
- Surface (very subtle elevation): `#15110D`
- A single global ambient light source in the top-right of the viewport that follows the cursor with a long lag (~600ms). Soft large radial-gradient blob, ~800px diameter, opacity ~12%, color `#F4C58A`. The rim-light from the portrait, abstracted into the page. The signature of the site. Without it, generic. With it, alive.

### Color Accents (Not the default amber)
Pick something more specific than "warm amber." Two recommendations — choose one and commit:

- **Option A — Sodium streetlight:** `#E89B5C`. The color of Stockholm streetlights at 11pm in November. Warm, slightly orange, slightly nostalgic.
- **Option B — Cognac:** `#B5723E`. Deeper, more spirit-cabinet, less "tech accent."

Use it for: hover states, active nav indicator, the cursor-following light blob, and one additional moment per section (a single underline, a single year, a single dot). Never as a fill. Never as a button background.

### Typography (Banned-list compliant)

- **Display:** PP Editorial New (italic and roman variants, but use them in separate contexts — never mixed in the same headline). Alternative: Migra by PangramPangram. Avoid GT Sectra and Tiempos — they are the safe Claude defaults.
- **Body & UI:** PP Neue Montreal. Slightly geometric, slightly mechanical, distinctly not Inter. Alternative: Aeonik.
- **Numerals & metadata:** PP Fraktion Mono or PP Supply Mono. Avoid JetBrains Mono — default ChatGPT/Claude code font.

If these specific PP fonts aren't available, use other fonts with comparable character — the rule is never the safe defaults.

### Texture
- Real film-grain SVG noise filter at ~4% opacity over the whole viewport. Use feTurbulence + feColorMatrix for true grain, not a tiled PNG.
- Subtle horizontal scanline effect on top, ~2% opacity, 2px line-height. Analog film stock reference. Very subtle.

## 4. The Signature Mechanic — "The Mantra"

unltd.co uses "One of the world's [...]" as a repeated phrase that becomes the visual rhythm. Andreas's signature formula:

> "Built for the Nordic ___ ."

Every portfolio item is described as something *built for* something, in this exact grammatical structure. This becomes the rhythm of the site.

Examples:
- Nordic Angels — "Built for the Nordic capital market."
- Angel House — "Built for the Nordic angel community."
- Mingla — "Built for the room that wants to actually meet."
- Nordisia — "Built for capital meeting real estate."
- Secondry — "Built for the secondaries that don't have a market yet."
- Snöboll — "Built for the angels who invest together."
- Angel Advisory — "Built for the bridge between angels and corporate finance."
- One Agency — "Built for 13 years. Sold."

The repetition of "Built for the [...]" across the page is the design.

## 5. Layout Strategy — Reject the Symmetry

Each section uses a different layout logic. There is no master grid that's reused. The site is a sequence of distinct compositions.

- **Hero:** Type-only. No portrait. Massive wordmark-style headline that fills the screen.
- **Background:** Asymmetric two-column with the portrait drifting in from the right edge.
- **Nordic Angels:** Full-bleed, the portrait reappears as a background layer at low opacity (~15%), text overlaid.
- **Portfolio:** Brutalist single-column list with horizontal rules, not a grid of cards.
- **Road Ahead:** Centered, almost archival.
- **Contact:** Massive headline, no other content.

Each section feels like a different page from the same magazine. They share palette and typography, not layout.

## 6. Section by Section

### 01 — Hero (Type-only, no portrait)
- Top: wordmark "Andreas Grape" in display serif, top-left, with a small accent dot after the "e" in "Grape".
- Top-right: nav as small mono caps. No section numbers. Just words: Background · Nordic Angels · Portfolio · Road Ahead · Contact. Active state: thin sodium underline.
- Center: massive headline filling near-full width. Italic serif, single weight, single style — no mixing:
  > Building infrastructure for the Nordic private capital market.
- Below headline, single mono-caps line in sodium:
  > STOCKHOLM · 25 YEARS · STILL BUILDING
- Bottom: two text-link CTAs side by side, mono caps, thin underline that grows on hover:
  > → Nordic Angels     → Angel House
- Behind everything: cursor-following ambient light blob.

What's missing on purpose: no scroll indicator, no portrait, no decoration, no section number "01."

### 02 — Background (Andreas, in his own words)
Two columns, asymmetric. Left ~40%, right ~50%, wide gutter. Seated dark-shirt portrait bleeds in from right edge, cropped to ~60% — a fragment, not a portrait card.

Left column: display serif italic header "A short version." Then 5-sentence first-person paragraph:
> "I started my first company in 2008. Sold it in 2021. Spent 13 years scaling One Agency to 240 MSEK in revenue. Backed Academic Work in 2001 — it became Scandinavia's largest staffing company. Co-founded Nordic Angels with Ash Pournouri in 2020. Opened Angel House in 2025. Currently building what comes next."

Right column: just the portrait, no caption, no frame. Single mono caps line bottom-right: `STOCKHOLM, 2026`.

### 03 — Nordic Angels (The set piece)
Full-bleed. Standing arms-crossed warmly-lit portrait at ~12% opacity, blurred ~8px, full-bleed background. Everything floats above.

- Top-left mono caps sodium: `THE PRIMARY INITIATIVE`
- Massive italic display serif: *Nordic Angels.*
- Roman serif half-size: *The operating system for the Nordic private capital market.*

Then seven business lines as a vertical ledger of horizontal rules (NOT a 2x4 grid):

```
01    Network        2,000+ vouched members across the region.
─────────────────────────────────────────────────────────────
02    Platform       Invite-only digital home for the network.
─────────────────────────────────────────────────────────────
… (07 lines)
```

Numbers mono. Names display serif italic. Descriptions body sans, muted.

Hover: row brightens, number gets sodium underline, name shifts right ~6px.

Bottom-right link: `→ Visit nordicangels.com`

Why a list, not a grid: a grid says "framework." A list says "ledger." Andreas builds infrastructure — a ledger fits.

### 04 — Portfolio (Brutalist list, not card grid)
Reject the card grid entirely. Single-column brutalist list — film credits roll / reference index.

Header: italic display serif "What I've built." + mono caps muted: `EIGHT COMPANIES · FOUR INITIATIVES · TWO BETS`

Each row, full-width, separated by 1px sodium-tinted divider. Hover: row brightens, sodium underline grows under name.

Row contents L→R:
- Company name — display serif, large, **roman** (no italic here)
- "Built for" line — body sans, muted, italic
- Years — mono numerals, sodium-colored
- Status word — single mono caps: ACTIVE / EXIT / SCALING. **No pill, no badge, no dot.**

Hierarchy:
- Nordic Angels first row, ~25% larger.
- One Agency last row, ~70% opacity.
- No primary card. No 2-col span. The list is the hierarchy.

**Sub-section: Within Nordic Angels** — indented ~80px from left with thin vertical sodium line connecting to Nordic Angels row above. Mono caps header: `WITHIN NORDIC ANGELS`. Four nested rows in same format, smaller.

**Sub-section: Early bets & advisory** — mono caps header: `EARLY BETS · ADVISORY`. Two clean rows (Academic Work, Superhuman.net).

### 05 — Road Ahead (Centered, archival)
Deliberate shift to centered symmetry after brutalist left-aligned portfolio.

- Centered, single column, max-width ~700px.
- Mono caps eyebrow sodium: `WHAT COMES NEXT`
- Three numbered statements stacked, each one display serif roman, large, with sodium mono year prefix:
  > 2026.   Building institutional bridges between angels and the capital that scales them.
  >
  > 2027.   Scaling Angel House as the operational base for the Nordic capital community.
  >
  > 2028.   Cross-border infrastructure across Stockholm, Oslo, Copenhagen, and Helsinki.
- ~96px vertical gap. No image, no decoration.

### 06 — Context (Two images, asymmetric)
Reject equal-size two-image layout.
- Left image: ~65% width, taller (4:5), seated portrait
- Right image: ~30% width, shorter (1:1), aligned to bottom, Angel House interior

Both warm-graded to sodium palette. Subtle parallax on mouse (~4px translation).

Captions mono caps sodium small:
- `[ STOCKHOLM, 2025 ]`
- `[ ANGEL HOUSE, OPENING NIGHT ]`

### 07 — Contact
Almost nothing. Centered both axes in full-viewport-height section.

Single line massive display serif italic:
> *Let's build something.*

Beneath, single mono caps sodium line:
> andreas@[domain] · LinkedIn → /grapeandreas

No form. No social row. No newsletter.

Footer: `STOCKHOLM · 2026` left, `Designed in confidence.` right. Mono caps, very small, muted.

## 7. Motion (Specific, not generic)

Reject "fade up on scroll." Three signature mechanics:

1. **The cursor light.** Soft sodium radial blob follows cursor with long lag (~600ms ease-out). Always present. Heartbeat.
2. **Letter-by-letter hero reveal.** ~20ms per character, slight blur-in (4px → 0px). First load only. One-time signature.
3. **Hover ledger-shift.** Hovering any row in Nordic Angels list or Portfolio: entire row shifts horizontally 6–8px right with 200ms ease, text brightens muted→full white, sodium underline grows L→R under primary name. Only hover effect on entire site.

**Banned:** parallax scrolling on text, scroll-jacked sections, fade-up on every section, scale-on-hover for cards, magnetic buttons, custom cursors as anything other than the light blob, scroll progress indicators, animated SVG icons.

## 8. Responsive

- **Desktop (≥1280px):** Full layout as described.
- **Tablet (768–1279px):** Hero headline ~70% size. Background section single column with portrait below text. Portfolio list full-width. Nordic Angels ledger stays vertical.
- **Mobile (≤767px):** Single column throughout. Portrait in Background bleeds off right at ~70% width. Portfolio rows wrap: name+status row 1, "Built for" row 2, year row 3. Cursor light disappears. Hero letter reveal still plays.
- Touch targets ≥44px. Hover → active states.

## 9. Image Direction

- Hero: no image.
- Background: seated dark-shirt portrait, bleeds off right.
- Nordic Angels: standing arms-crossed warmly-lit portrait, 12% opacity blurred background.
- Context: portrait or stage image + Angel House interior.

If real images unavailable, use solid `#15110D` blocks with mono caps placeholder labels — never diagonal-hatched placeholders.

## 10. The Test

When the draft is finished, ask: "Could this be from any other founder's site?"

If yes, it's still too generic. Three irreducibly Andreas-Grape moments must land:
1. The "Built for the Nordic [...]" mantra running through the portfolio
2. The sodium-streetlight cursor light as the page's heartbeat
3. The brutalist list-as-portfolio instead of a card grid

If those three things land, the site is his. If they're missing or softened, the site is a template.

## 11. Final Instruction

Build something a Stockholm design studio with strong opinions would have made. Not something a design system would have produced. Not something safe.

Look at the attached portraits. Look at unltd.co. Then make something neither of them is. Andreas's site should sit somewhere between the cinematic warmth of his portrait and the brutalist confidence of his partner's site — and look like itself.

When you finish a section and it feels familiar, break it. Choose the second-best layout. Use the strange word. Pick the unusual font. Move the headline somewhere unexpected.

Default-elegance is the failure mode. Specificity is the goal.
