# CLAUDE.md

## Project quick-reference

- **Workspace path (CRITICAL)**: the live repo is at `~/Desktop/SPRINT ASSEMBLY WEBSITE/` (parent folder). The empty `SprintAssembly Web (NEW)/` subfolder is **not** the project — never mount it. If a session opens against the empty subfolder, immediately call `request_cowork_directory` with `~/Desktop/SPRINT ASSEMBLY WEBSITE` before doing anything else.
- **Stack**: hand-authored static HTML + inline CSS in `index.html` at repo root (~1770 lines). Class system is the Dispatch/Bauhaus naming: every selector is prefixed `.d4-*` (`.d4-nav`, `.d4-h1`, `.d4-post`, `.d4-carousel`, …). No Tailwind, no React runtime. The React code in `src/` is abandoned (since commit `aa7aae1`, 2026-04-19) — do not edit `src/App.jsx`, it ships nothing.
- **Fonts**: Archivo Black (display, all H1/H2/H3 and brand mark), Archivo (body), Space Mono (mono eyebrow labels). All loaded from Google Fonts via `<link>` in `index.html`.
- **Branch**: `main`. Default; `master` does not exist.
- **Push**: from Nabil's Mac terminal, or directly from a cloud Cowork session (those have repo-scoped GitHub credentials via git protocol; the REST API proxy is locked, plain `git push` works). Standard command: `cd ~/Desktop/SPRINT\ ASSEMBLY\ WEBSITE && git push origin main`.
- **Positioning (post-2026-04-17)**: agentic workflow automation; marketing is a proof point, not the frame. Eyebrow "The New Standard of Operations", hero "From Manual Effort to Agentic Scale" with "Agentic Scale" in `<em>` (red highlight).

## Deploy + infrastructure

- **Hosting**: GitHub Pages, repo `nabiliogram/sprint`, custom domain `sprintassembly.com` via apex CNAME. **Cloudflare** sits in front (proxied DNS) — TLS terminates at CF, origin headers show `server: cloudflare`, `cf-cache-status: DYNAMIC` (CF passes through, no edge cache).
- **CI workflow**: single workflow, `.github/workflows/static.yml`. Uses `actions/deploy-pages@v4` with built-in `concurrency: pages`. Pages Source in repo Settings is **"GitHub Actions"** (not "Deploy from a branch").
- **Legacy state to ignore**: the `gh-pages` branch is an orphan (no longer pushed to as of 2026-05-26 commit `88ec993`); was deleted from origin in the same cleanup pass. The old `build-site.yml` (peaceiris/actions-gh-pages) was deleted in the same commit. The Vite scaffolding (`vite.config.js`, `package.json`, `node_modules`) is still in the repo for the `npm run build` step that produces `dist/` — Vite effectively just copies `index.html` and `public/*` into `dist/`.
- **Verify a deploy landed (the routine)** — do this before chasing infra theories:
  1. `git fetch origin main && git log --oneline origin/main -3` — confirm the commit is on the remote, not still in your local working tree.
  2. `curl -sI "https://sprintassembly.com/?cb=$(date +%s)" | grep last-modified` — fresh timestamp means GitHub Pages re-served.
  3. `curl -s "https://sprintassembly.com/?cb=..." | grep -oE 'class="d4-|class="b-'` — sanity-check the design being served.

## Asset layout

| Path | Serves at | Purpose |
|---|---|---|
| `index.html` (root) | `/` | The site. |
| `public/favicon.svg`, `favicon.png`, `favicon-180.png` | `/favicon.*` | SA red/blue split-square favicon. Referenced in `<head>` with root-absolute paths. |
| `public/meta.png` | `/meta.png` | Social share image (1200×630, Bauhaus). Referenced by both `og:image` and `twitter:image`. |
| `public/team/nabil.jpg`, `public/team/daniel.jpg` | `/team/*.jpg` | Founder photos in the Team section. |
| `public/CNAME` | (used by Pages) | Sets custom domain to `sprintassembly.com`. |
| `public/playbook/index.html` | `/playbook/` | The AI Operating Playbook (Project Ted). Canonical source: `PLAYBOOK.html` in the `SA EDUCATION` Cowork project — edit THERE, then copy here; never edit this deployed copy directly. Carries `<meta name="robots" content="noindex">` until launch — REMOVE at launch (Nabil's standing instruction, Jul 14 2026). |
| `index.pre-bauhaus-backup.html`, `index.pre-redesign-backup.html` | (not served) | One-command rollback snapshots. Keep them. |

## LinkedIn carousel — adding a new post

When Nabil drops a LinkedIn post URL to add to the Insights carousel:
1. `WebFetch` the URL, extract the post body from `og:description`.
2. Build an HTML preview card in the outputs folder so Nabil can sanity-check the trim before commit; send a `computer://` link.
3. After approval, edit `index.html` directly. The carousel container is `<div class="d4-carousel" id="carousel">` (around line 1496). Insert the new card as the **first** child (newest at top). Each card looks like:
   ```html
   <a href="<linkedin-url>" target="_blank" rel="noreferrer" class="d4-post">
     <div class="d4-post-meta"><span>Month YYYY</span><span class="d4-post-id">L-NNN</span></div>
     <h3 class="d4-post-title">Headline.</h3>
     <p class="d4-post-body">Body 200–280 chars ending with &hellip;</p>
     <div class="d4-post-link">Read post &rarr;</div>
   </a>
   ```
4. Bump the `L-NNN` id by one. **Last shipped is `L-020`** as of 2026-06-30.
5. Use HTML entities (`&mdash;`, `&rsquo;`, `&hellip;`) consistently with neighbours.
6. Image support is not wired into the schema — cards stay text-only (decision 2026-04-22).
7. Don't push; instruct Nabil to run the terminal push command from `~/Desktop/SPRINT\ ASSEMBLY\ WEBSITE`.

## Design Context (Bauhaus skin)

> **`.impeccable.md` is stale** as of this writing (last touched 2026-04-28, pre-redesign). It still describes the prior aesthetic (mossy green `#afb975`, warm near-white with teal+amber radial wash, Host Grotesk + Geist Mono). Trust this file or read the live `index.html`, not `.impeccable.md`, until it's rewritten.

### Aesthetic (current — Dispatch / Bauhaus skin, shipped 2026-05-26)
- **Palette**: warm off-white `#efece2` ground; red `#d4322d`, blue `#1a4fbf`, ochre `#e8b922` as primary accents; black `#111` for text and rule weights.
- **Typography**: Archivo Black for all display (hero h1, section h2, card h3, brand mark "SA"). Archivo regular for body. Space Mono for eyebrow labels (uppercase, tracked).
- **Identity marks**: the red/blue split-square mark with white "S" + "A" letters and a 4px black border. The Process band uses an ochre fill (`#e8b922`) that runs edge-to-edge.
- **Layout**: content max-width 1000px, applied via `padding-inline: max(40px, calc((100% - 1000px) / 2))` on every section/nav so colored bands stretch full-width but text centers.
- **Mobile**: sticky Process viz becomes an edge-to-edge ochre banner at top of viewport; cards (opportunity pillars, phase cards, insight cards) become full-bleed with reduced padding.

### Brand personality
**Rigorous · Pragmatic · Unfussy.** Engineers-who-do-operations, not consultants-who-like-engineering. References: Klim Type, Linear, Stripe Press, Bravo Bravo. Emotional goal: *"these people are for real."*

### Design principles
1. **Earn every element.** Cut anything that doesn't carry information, hierarchy, or signature character.
2. **Signature over novelty.** Red/blue split mark, ochre Process band, Archivo Black headlines, wide-tracked mono eyebrows — these are the brand. Don't compete with them.
3. **Typography does the heavy lifting.** Scale, weight, tracking, pairing are the primary expressive tools.
4. **Rhythm over uniformity.** Vary spacing and density intentionally; the page should have pace.
5. **Evidence before adjective.** Named frameworks, numbered steps, concrete outcomes.

Must NOT look like: consultancy grey; AI-startup futurism (dark mode, neon, mesh gradients); generic SaaS/B2B template (Inter, Lottie, stock isometric illustrations).
