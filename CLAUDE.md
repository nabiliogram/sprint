# CLAUDE.md

## Project quick-reference

- **Workspace path (CRITICAL)**: the live repo is at `~/Desktop/SPRINT ASSEMBLY WEBSITE/` (parent folder). The empty `SprintAssembly Web (NEW)/` subfolder is **not** the project — ignore it / never mount it. If a session opens against the empty subfolder, immediately call `request_cowork_directory` with `~/Desktop/SPRINT ASSEMBLY WEBSITE` before doing anything else. Do not ask the user where the files are.
- **Stack**: hand-authored static HTML + inline CSS in `index.html` at repo root. Fonts: Host Grotesk (display/body) + Geist Mono.
- **Workflow**: edit `index.html` → push to `main` → GitHub Actions runs `vite build` (which effectively just copies `index.html` into `dist/`) and deploys via both `build-site.yml` (gh-pages branch) and `static.yml` (Pages Actions). **The React code in `src/` is abandoned** (`aa7aae1 Ship refined V2 design as static site, drop React app`) — do not waste cycles editing `src/App.jsx`; it is not deployed.
- **Branch**: `main` (not `master`).
- **Push**: must happen from the user's Mac terminal (`cd ~/Desktop/SPRINT\ ASSEMBLY\ WEBSITE && git push origin main`). The sandbox has no GitHub credentials.
- **Positioning (post-2026-04-17)**: agentic workflow automation; marketing is a proof point, not the frame.

## LinkedIn carousel — adding a new post

When the user drops a LinkedIn post URL to add to the Insights carousel:
1. WebFetch the URL, extract the post body from `og:description`.
2. Build an HTML preview card in the outputs folder so the user can sanity-check the trim before commit; send a `computer://` link.
3. After approval, edit `index.html`: the carousel lives in `<div class="carousel" id="carousel">` (~line 1482). Insert the new card as the **first** child (newest at top). Each card is an `<a class="insight-card">` with a `top` row (`date` + `marker // L-NNN`), `<h4>` headline, `<p>` 2–3-sentence body ending in `&hellip;`, and a `more` row. Bump the marker by one (last shipped is `L-010` as of 2026-04-25).
4. Body length target: ~200–280 chars. Use HTML entities (`&mdash;`, `&rsquo;`, `&hellip;`) consistently with neighbours.
5. Image support is not yet wired into the schema (decided 2026-04-22 to defer); cards remain text-only for now.
6. Don't push — instruct the user to run the terminal push command from `~/Desktop/SPRINT\ ASSEMBLY\ WEBSITE`.

## Design Context

The authoritative design brief lives in [`.impeccable.md`](./.impeccable.md). Read it before any visual or frontend work. Short version below for quick reference — treat `.impeccable.md` as the source of truth if they drift.

### Users
Two overlapping audiences: enterprise CMOs/marketing VPs evaluating a specialist consultancy, and hands-on growth/ops leads at $10M–$100M scaleups. The site must work for both the exec skim-reader and the operator who wants depth. JTBD: *help me decide whether these people are credible and can help me unlock capacity without adding headcount.*

### Brand Personality
**Rigorous · Pragmatic · Unfussy.** Engineers-who-do-operations, not consultants-who-like-engineering. Dry, adult, grown-up-confident. Adjacent: Klim Type, Linear, Stripe Press, Bravo Bravo. Emotional goal: *"these people are for real."*

### Aesthetic Direction
**Refined and restrained.** Craft lives in typography, spacing, and micro-details — not in visual effects.

Keep and double down on: the warm near-white surface with soft teal + amber radial wash; mossy green `#afb975` as the single sparingly-used accent; the black-highlight treatment on section titles (`bg-neutral-950 px-4 py-1 text-white` with `box-decoration-clone`); sharp-cornered buttons (`rounded-sm`) paired with softer cards (`rounded-2xl`); wide-tracked uppercase eyebrows; the custom-card LinkedIn insights section.

Upgrade: typography (currently Host Grotesk + Geist Mono via Google Fonts, loaded from the `<link>` in `index.html`); line-length discipline (~65–75ch body); rhythmic rather than uniform spacing; sharper hierarchy contrast between type steps.

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

(Most of this queue was authored when the site still ran on React. Since the 2026-04-19 static rewrite, individual items have been absorbed into `index.html` or are stale. Revisit before acting on any row.)

- [x] Step 0 — Verify copy reframe landed
- [ ] Step 1 — typography pair (Host Grotesk shipped; evaluate further)
- [ ] Step 2a — LinkedIn carousel placement
- [ ] Step 2b — Opportunity 3-card grid
- [ ] Step 3 — mobile polish (partially shipped 2026-04-20)
