---
name: impeccable-design
description: "Use when designing, redesigning, shaping, critiquing, auditing, polishing, clarifying, distilling, hardening, optimizing, adapting, animating, colorizing, extracting, or otherwise improving a frontend interface. Covers websites, landing pages, dashboards, product UI, app shells, components, forms, settings, onboarding, and empty states. Handles UX review, visual hierarchy, information architecture, cognitive load, accessibility, performance, responsive behavior, theming, anti-patterns, typography, fonts, spacing, layout, alignment, color, motion, micro-interactions, UX copy, error states, edge cases, i18n, and reusable design systems or tokens. Also use for bland designs that need to become bolder or more delightful, loud designs that should become quieter, or ambitious visual effects that should feel technically extraordinary. Not for backend-only or non-UI tasks."
---

Designs and iterates production-grade frontend interfaces. Real working code, committed design choices, exceptional craft.

This is a prompt-only adaptation of Paul Bakaus's `impeccable` skill — design knowledge preserved, executable scripts and live-server tooling removed. See [NOTICE.md](NOTICE.md) for attribution.

## Setup

Before designing, read whatever project context exists:

- **PRODUCT.md** (project root, `.agents/context/`, or `docs/`): users, brand, tone, anti-references, strategic principles. If missing or placeholder (`[TODO]` markers, <200 chars), ask the user a few sharp questions to gather: target users, voice, three anti-references (brands you do NOT want to feel like), and the one strategic principle that matters most. Cache their answers in PRODUCT.md before continuing.
- **DESIGN.md** (same locations, optional but strongly recommended): colors, typography, elevation, components. If missing, infer from existing code on first read and offer to write a DESIGN.md once the design pass is done.

## Register

Every design task is **brand** (marketing, landing, campaign, long-form content, portfolio: design IS the product) or **product** (app UI, admin, dashboard, tool: design SERVES the product).

Identify before designing. Priority: (1) cue in the task itself ("landing page" vs "dashboard"); (2) the surface in focus (the page, file, or route being worked on); (3) `register` field in PRODUCT.md. First match wins.

If PRODUCT.md lacks the `register` field, infer it once from its "Users" and "Product Purpose" sections.

Load the matching reference: [reference/brand.md](reference/brand.md) or [reference/product.md](reference/product.md). The shared design laws below apply to both.

## Shared design laws

Apply to every design, both registers. Match implementation complexity to the aesthetic vision: maximalism needs elaborate code, minimalism needs precision. Interpret creatively. Vary across projects; never converge on the same choices. Don't hold back.

### Color

- Use OKLCH. Reduce chroma as lightness approaches 0 or 100; high chroma at extremes looks garish.
- Never use `#000` or `#fff`. Tint every neutral toward the brand hue (chroma 0.005–0.01 is enough).
- Pick a **color strategy** before picking colors. Four steps on the commitment axis:
  - **Restrained**: tinted neutrals + one accent ≤10%. Product default; brand minimalism.
  - **Committed**: one saturated color carries 30–60% of the surface. Brand default for identity-driven pages.
  - **Full palette**: 3–4 named roles, each used deliberately. Brand campaigns; product data viz.
  - **Drenched**: the surface IS the color. Brand heroes, campaign pages.
- The "one accent ≤10%" rule is Restrained only. Committed / Full palette / Drenched exceed it on purpose. Don't collapse every design to Restrained by reflex.

### Theme

Dark vs. light is never a default. Not dark "because tools look cool dark." Not light "to be safe."

Before choosing, write one sentence of physical scene: who uses this, where, under what ambient light, in what mood. If the sentence doesn't force the answer, it's not concrete enough. Add detail until it does.

"Observability dashboard" does not force an answer. "SRE glancing at incident severity on a 27-inch monitor at 2am in a dim room" does. Run the sentence, not the category.

### Typography

- Cap body line length at 65–75ch.
- Hierarchy through scale + weight contrast (≥1.25 ratio between steps). Avoid flat scales.

### Layout

- Vary spacing for rhythm. Same padding everywhere is monotony.
- Cards are the lazy answer. Use them only when they're truly the best affordance. Nested cards are always wrong.
- Don't wrap everything in a container. Most things don't need one.

### Motion

- Don't animate CSS layout properties.
- Ease out with exponential curves (ease-out-quart / quint / expo). No bounce, no elastic.

### Absolute bans

Match-and-refuse. If you're about to write any of these, rewrite the element with different structure.

- **Side-stripe borders.** `border-left` or `border-right` greater than 1px as a colored accent on cards, list items, callouts, or alerts. Never intentional. Rewrite with full borders, background tints, leading numbers/icons, or nothing.
- **Gradient text.** `background-clip: text` combined with a gradient background. Decorative, never meaningful. Use a single solid color. Emphasis via weight or size.
- **Glassmorphism as default.** Blurs and glass cards used decoratively. Rare and purposeful, or nothing.
- **The hero-metric template.** Big number, small label, supporting stats, gradient accent. SaaS cliché.
- **Identical card grids.** Same-sized cards with icon + heading + text, repeated endlessly.
- **Modal as first thought.** Modals are usually laziness. Exhaust inline / progressive alternatives first.

### Copy

- Every word earns its place. No restated headings, no intros that repeat the title.
- **No em dashes.** Use commas, colons, semicolons, periods, or parentheses. Also not `--`.

### The AI slop test

If someone could look at this interface and say "AI made that" without doubt, it's failed. Cross-register failures are the absolute bans above. Register-specific failures live in each reference.

**Category-reflex check.** Run at two altitudes; the second one catches what the first one misses.

- **First-order:** if someone could guess the theme + palette from the category alone ("observability → dark blue", "healthcare → white + teal", "finance → navy + gold", "crypto → neon on black"), it's the first training-data reflex. Rework the scene sentence and color strategy until the answer isn't obvious from the domain.
- **Second-order:** if someone could guess the aesthetic family from category-plus-anti-references ("AI workflow tool that's not SaaS-cream → editorial-typographic", "fintech that's not navy-and-gold → terminal-native dark mode"), it's the trap one tier deeper. The first reflex was avoided; the second wasn't. Rework until both answers are not obvious. The brand register's [reflex-reject aesthetic lanes](reference/brand.md) list catches the currently-saturated families.

## Modes

Each mode below is a focused way to approach a design task. Load the reference file for the matching mode and follow its instructions.

| Mode | Category | When to use | Reference |
|---|---|---|---|
| `craft` | Build | Shape, then build a feature end-to-end | [reference/craft.md](reference/craft.md) |
| `shape` | Build | Plan UX/UI before writing code | [reference/shape.md](reference/shape.md) |
| `extract` | Build | Pull reusable tokens and components into a design system | [reference/extract.md](reference/extract.md) |
| `critique` | Evaluate | UX design review with heuristic scoring | [reference/critique.md](reference/critique.md) |
| `audit` | Evaluate | Technical quality checks (a11y, perf, responsive) | [reference/audit.md](reference/audit.md) |
| `polish` | Refine | Final quality pass before shipping | [reference/polish.md](reference/polish.md) |
| `bolder` | Refine | Amplify safe or bland designs | [reference/bolder.md](reference/bolder.md) |
| `quieter` | Refine | Tone down aggressive or overstimulating designs | [reference/quieter.md](reference/quieter.md) |
| `distill` | Refine | Strip to essence, remove complexity | [reference/distill.md](reference/distill.md) |
| `harden` | Refine | Production-ready: errors, i18n, edge cases | [reference/harden.md](reference/harden.md) |
| `onboard` | Refine | Design first-run flows, empty states, activation | [reference/onboard.md](reference/onboard.md) |
| `animate` | Enhance | Add purposeful animations and motion | [reference/animate.md](reference/animate.md) |
| `colorize` | Enhance | Add strategic color to monochromatic UIs | [reference/colorize.md](reference/colorize.md) |
| `typeset` | Enhance | Improve typography hierarchy and fonts | [reference/typeset.md](reference/typeset.md) |
| `layout` | Enhance | Fix spacing, rhythm, and visual hierarchy | [reference/layout.md](reference/layout.md) |
| `delight` | Enhance | Add personality and memorable touches | [reference/delight.md](reference/delight.md) |
| `overdrive` | Enhance | Push past conventional limits | [reference/overdrive.md](reference/overdrive.md) |
| `clarify` | Fix | Improve UX copy, labels, and error messages | [reference/clarify.md](reference/clarify.md) |
| `adapt` | Fix | Adapt for different devices and screen sizes | [reference/adapt.md](reference/adapt.md) |
| `optimize` | Fix | Diagnose and fix UI performance | [reference/optimize.md](reference/optimize.md) |

Additional reference material: [brand.md](reference/brand.md), [product.md](reference/product.md), [color-and-contrast.md](reference/color-and-contrast.md), [cognitive-load.md](reference/cognitive-load.md), [heuristics-scoring.md](reference/heuristics-scoring.md), [interaction-design.md](reference/interaction-design.md), [motion-design.md](reference/motion-design.md), [responsive-design.md](reference/responsive-design.md), [spatial-design.md](reference/spatial-design.md), [typography.md](reference/typography.md), [ux-writing.md](reference/ux-writing.md), [personas.md](reference/personas.md).

### Routing

1. **No mode in the request:** apply setup → register → shared design laws → loaded register reference, using the user's full request as context.
2. **Mode named explicitly:** load its reference file and follow its instructions. Everything after the mode name is the target.
3. **`craft` mode:** setup runs first; [reference/craft.md](reference/craft.md) owns the rest of the flow.
