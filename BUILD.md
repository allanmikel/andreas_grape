# Claude Code Build Prompt — andreasgrape.com

You are building the production code for andreasgrape.com — a premium founder/operator site for Andreas Grape, a Stockholm-based serial entrepreneur and co-founder of Nordic Angels. This is not a standard developer portfolio. The reference target is unltd.co (his business partner Ash Pournouri's site) and Awwwards-tier studio sites like dennissnellenberg.com.

## Critical Context

Two prior visual drafts (v1, v2) failed because they looked "Claude-default elegant" — paper backgrounds, rounded status pills, mixed roman/italic serifs, 2x4 grids with mono-caps eyebrows. The v3 design brief (in /docs/design-brief.md) is a deliberate reaction against those defaults. **Read it first. Honor every anti-pattern listed.**

Your job is not to invent design decisions. Your job is to implement v3 with the technical mechanics that make Awwwards-tier sites feel premium. Those mechanics are not optional — they are why the site won't look like a Claude default.

## Tech Stack (Non-Negotiable)

```
Next.js 15 (App Router)
TypeScript
Sass / SCSS Modules (NOT Tailwind for this project — Tailwind utility soup is part of the "Claude default" failure mode)
Lenis (smooth scroll — the heartbeat of every Awwwards-tier site)
GSAP + ScrollTrigger (text reveals, scroll-pinned moments)
Framer Motion (component-level animations, page transitions)
next/font with self-hosted display fonts
```

Install:
```bash
npx create-next-app@latest andreasgrape --typescript --no-tailwind --app --src-dir --import-alias "@/*"
cd andreasgrape
npm i lenis gsap framer-motion sass
```

Do NOT install: Tailwind, Aceternity UI, Magic UI, shadcn/ui. These libraries pull the site back into "default elegance." We are deliberately rejecting them.

## Reference Repository (Study, Do Not Copy)

Before writing any code, clone this repo into a sibling directory (NOT into the project):
```bash
git clone https://github.com/olivierlarose/awwwards-landing-page reference/
```

This is Olivier Larose's Next.js + GSAP + Framer Motion rebuild of an Awwwards-winning portfolio. Study these specific files for technical patterns:
- `src/app/page.js` — root page with smooth scroll initialization
- `src/components/` — section components, especially how text reveals and image hovers are wired
- The Sass module structure — how each component owns its own styles

**Borrow the technical mechanics. Never copy the layout, copy, color palette, or component structure.** The reference is for "how do I implement letter-by-letter reveals with GSAP" — not for "how should the hero look."

If anything in the reference contradicts the v3 brief, the v3 brief wins.

## Project Structure

```
src/
  app/
    layout.tsx          // Root layout, fonts, Lenis provider
    page.tsx            // Root page composing all sections
    globals.scss        // CSS variables, reset, base styles
  components/
    Lenis/              // Smooth scroll provider
    Cursor/             // The sodium-light cursor blob (signature mechanic)
    Nav/                // Top navigation
    Hero/
    Presence/
    NordicAngels/
    Portfolio/
    Next/
    Context/
    Contact/
    Footer/
  lib/
    content.ts          // All copy, portfolio data, links — single source of truth
    fonts.ts            // next/font configuration
  styles/
    variables.scss      // Design tokens (colors, spacing, typography scale)
    mixins.scss         // Reusable Sass mixins
  hooks/
    useGsapReveal.ts    // Custom hook for scroll-triggered text reveals
docs/
  design-brief.md       // The v3 design brief
public/
  fonts/                // Self-hosted display fonts (PP Editorial New, etc.)
  images/               // Andreas portraits + Angel House imagery
```

## Design Tokens (variables.scss)

These are not suggestions. Implement exactly:

```scss
// Colors — warm dark, never blue-black
$color-bg: #0F0D0A;              // Warm near-black, dark walnut
$color-surface: #15110D;          // Subtle elevation
$color-text: #F2EDE4;             // Warm off-white, never pure white
$color-text-muted: #8C8478;       // Dusty taupe
$color-divider: #2A2723;          // Thin warm-graphite

// Accent — pick ONE and commit. Default to sodium streetlight.
$color-accent: #E89B5C;           // Sodium streetlight (Stockholm Nov 11pm)
// Alternative: #B5723E (cognac)

// Typography scale (fluid via clamp)
$font-display: 'PP Editorial New', 'Migra', Georgia, serif;
$font-body: 'PP Neue Montreal', 'Aeonik', system-ui, sans-serif;
$font-mono: 'PP Fraktion Mono', 'PP Supply Mono', monospace;

// Spacing scale
$space-xs: 0.5rem;
$space-sm: 1rem;
$space-md: 2rem;
$space-lg: 4rem;
$space-xl: 8rem;
$space-2xl: 12rem;

// Breakpoints
$bp-tablet: 768px;
$bp-desktop: 1280px;
```

**Banned font choices:** Inter, GT America, Söhne, JetBrains Mono, GT Sectra, Tiempos. They are "premium default" — every Vercel/Linear/Anthropic site uses them. We pick fonts with personality.

If PP fonts are unavailable (they are commercial, from Pangram Pangram), fall back to: **Fraunces** (display), **Geist** (body), **Geist Mono** (mono). All free via Google Fonts. Tell me if you fall back so I know.

## The Three Signature Mechanics (These Make or Break the Site)

### 1. Lenis Smooth Scroll (The Foundation)

Wrap the root layout in a Lenis provider. Use the new `lenis/react` package, not the deprecated `@studio-freight/lenis`.

Sync Lenis with GSAP ScrollTrigger so they share the same scroll position. This is the most-missed step in tutorials and it's why most copies of Awwwards sites feel janky.

### 2. The Sodium Cursor Light (The Signature)

A large soft warm radial blob follows the cursor with ~600ms ease-out lag. Implement as a fixed-position div, NOT a mix-blend-mode trick. Disabled on `pointer: coarse` and `prefers-reduced-motion`.

### 3. Letter-by-Letter Hero Reveal (One-Time Signature)

Plays once on first load. ~20ms per character, blur 4px → 0px. Uses GSAP. Apply only to the hero headline. Never reuse this elsewhere — its power is its singularity.

## Section Build Order (Strict)

Build in this order. Stop after each section so the reviewer can self-check.

1. **Foundation** — layout.tsx, Lenis, fonts, globals.scss, design tokens, SodiumCursor
2. **Nav** — top navigation with sodium underline on active section
3. **Hero** — type-only, letter-by-letter reveal
4. **Presence** — portrait bleeds in from right, minimal text
5. **Nordic Angels** — full-bleed, blurred portrait background, ledger of 7 lines (NOT a grid)
6. **Portfolio** — brutalist single-column list with hover ledger-shift (NOT cards)
7. **Next** — centered three lines
8. **Context** — asymmetric two-image strip
9. **Contact** — single massive headline
10. **Footer** — minimal mono caps line

## Specific Implementation Notes

### Portfolio rows must NOT be cards
Use `<div role="listitem">` with `display: grid; grid-template-columns: 2fr 3fr 1fr 1fr;` and a 1px sodium-tinted bottom border. On hover: `transform: translateX(8px)`, text brightens, sodium underline grows under name.

### Nordic Angels is a ledger, NOT a grid
Vertical stack of 7 rows separated by 1px dividers. Same hover mechanic as Portfolio.

### Section transitions should NOT be "fade-up on scroll"
Default GSAP `from({ opacity: 0, y: 50 })` fade-ups are the universal Claude tell. Use either:
- A horizontal mask reveal, or
- The same letter-stagger from the hero but at 1/3 the duration, or
- No animation at all

### Image treatment
The seated dark-shirt portrait bleeds off the right edge of the Presence section — no frame, no rounded corners. The Nordic Angels portrait is a full-bleed background layer at `opacity: 0.12` with `filter: blur(8px)`.

### Film grain
Apply via CSS `::before` pseudo-element on the body using an inline SVG `feTurbulence` filter. Not a tiled PNG.

## The Self-Check After Each Section

1. Does it look like any other founder portfolio I've seen? If yes, break it.
2. Did I reach for a Tailwind-style utility-first approach? We're using SCSS modules.
3. Is there a rounded-pill status badge anywhere? Remove it.
4. Did I use mixed roman/italic in the same headline? Pick one.
5. Is there a "01 — Section Name" eyebrow with em-dash? Remove the dash, use mono caps.
6. Did I add explanatory paragraphs? Cut them.

## Performance & Accessibility (Non-Negotiable)

- Lighthouse Performance ≥ 95
- All animations respect `prefers-reduced-motion`
- Sodium cursor disabled on `pointer: coarse`
- Lenis disabled on touch devices (use native scroll)
- All images use `next/image`
- Hero text rendered in HTML, not painted
- Semantic HTML, keyboard-accessible, visible focus states, skip-to-content link
- Meta tags, OG image, sitemap, Person schema

## Deployment

- Target: Vercel
- Domain: andreasgrape.com

## Final Instruction

Build this site like you're a small Stockholm studio with strong opinions, not like you're a SaaS-template generator. When in doubt between "what's safe" and "what has personality" — choose personality.
