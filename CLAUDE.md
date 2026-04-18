# CLAUDE.md

## Project quick-reference

- **Stack**: Vite + React + Tailwind CSS; single-page app in `src/App.jsx`.
- **Workflow**: edit `src/App.jsx` → `vite build` → GitHub Actions deploys to Pages.
- **Branch**: `main` (not `master`).
- **Positioning (post-2026-04-17)**: agentic workflow automation; marketing is a proof point, not the frame.

## Design Context

The authoritative design brief lives in [`.impeccable.md`](./.impeccable.md). Read it before any visual or frontend work. Short version below for quick reference — treat `.impeccable.md` as the source of truth if they drift.

### Users
Two overlapping audiences: enterprise CMOs/marketing VPs evaluating a specialist consultancy, and hands-on growth/ops leads at $10M–$100M scaleups. The site must work for both the exec skim-reader and the operator who wants depth. JTBD: *help me decide whether these people are credible and can help me unlock capacity without adding headcount.*

### Brand Personality
**Rigorous · Pragmatic · Unfussy.** Engineers-who-do-operations, not consultants-who-like-engineering. Dry, adult, grown-up-confident. Adjacent: Klim Type, Linear, Stripe Press, Bravo Bravo. Emotional goal: *"these people are for real."*

### Aesthetic Direction
**Refined and restrained.** Craft lives in typography, spacing, and micro-details — not in visual effects.

Keep and double down on: the warm near-white surface with soft teal + amber radial wash; mossy green `#afb975` as the single sparingly-used accent; the black-highlight treatment on section titles (`bg-neutral-950 px-4 py-1 text-white` with `box-decoration-clone`); sharp-cornered buttons (`rounded-sm`) paired with softer cards (`rounded-2xl`); wide-tracked uppercase eyebrows; the custom-card LinkedIn insights section.

Upgrade: typography (body currently uses Inter from `src/index.css` — biggest open lever; reject the reflex fonts like Inter, IBM Plex, Fraunces, Instrument, DM Sans, Space Grotesk and audition faces with genuine opinion); line-length discipline (~65–75ch body); rhythmic rather than uniform spacing; sharper hierarchy contrast between type steps.

Theme: **light.** Dark would contradict the unfussy, pragmatic positioning.

Must NOT look like: consultancy grey; AI-startup futurism (dark mode, neon, mesh gradients); generic SaaS/B2B template (Inter, Lottie, stock isometric illustrations, uniform icon grids).

### Design Principles
1. **Earn every element.** Cut anything that doesn't carry information, hierarchy, or signature character.
2. **Signature over novelty.** Mossy green, warm wash, black-highlight titles, wide-tracked eyebrows — these are the brand. Don't compete with them.
3. **Typography does the heavy lifting.** Scale, weight, tracking, pairing are the primary expressive tools.
4. **Rhythm over uniformity.** Vary spacing and density intentionally. The page should have pace.
5. **Evidence before adjective.** Named frameworks, numbered steps, concrete outcomes — the design should mirror the copy's instinct for precise, load-bearing language.

## Open design queue (2026-04-17)

Design Health Score baseline: **27/40** (Acceptable). Working through in sequence, each with Nabil's review gate:

- [x] Step 0 — Verify copy reframe landed in `App.jsx`
- [ ] Step 1 — `/typeset`: replace Inter, install display/body pair
- [ ] Step 2a — `/layout`: relocate LinkedIn carousel, remove the `borderLeft: 3px solid` that got added during the 2026-04-17 rewrite
- [ ] Step 2b — `/layout`: redesign Opportunity 3-card grid
- [ ] Step 3 — `/adapt` + `/polish`: mobile corner-brackets + blueprint-grid, hero h1 size inversion at `lg`, italic pruning, `bg-black` → `bg-neutral-950`, `index.html` metadata refresh, radius consolidation
