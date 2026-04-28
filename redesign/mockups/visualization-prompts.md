# Process section — visualization prompts

Portable prompts for testing in any gen AI visualization engine (Claude Design, Midjourney, DALL·E, Sora, v0, etc.). Use the shared brand preamble once before any of the three section prompts.

---

## Shared brand preamble

> Sprint Assembly is a B2B consultancy that builds autonomous AI agent workflows for established companies — not a SaaS startup, not a creative agency. The brand personality is rigorous, pragmatic, unfussy: engineers-who-do-operations, not consultants-who-like-engineering. Aesthetic references: Linear, Stripe Press, Klim Type. The work is presented like an engineering brief, not marketing collateral.
>
> Color palette: warm near-white background (#f5f3ee), sage/olive accent (#6f7340) used sparingly. Typography (if any text appears): Inter Tight or JetBrains Mono. The mood should feel calm, credible, and grown-up — closer to a technical schematic than to a hero illustration.
>
> Avoid: dark mode, neon, mesh gradients, AI-startup futurism, glassmorphism, cyberpunk styling, isometric stock illustrations, busy or showy motion, stock vector clipart, decorative flourishes that don't carry meaning.
>
> Motion (if applicable): minimal, slow, purposeful. Always justified by what the visual is communicating. If unsure whether to add motion, don't.

---

## Stage 01 — Diagnostic Sprint

> Make a visual for a section about *looking deeply at a complex business system and finding the small number of problems that are worth fixing first*.
>
> The work shown is a time-capped audit. The audit takes a tangled, opaque operation and produces a clear, prioritized view: where is human effort being wasted, which signals are being missed, which handoffs stall. The transition is from "we don't know what's broken" to "we know exactly which problems matter most, in what order."
>
> The visual should evoke *the output of careful observation* — signal resolving from noise, pattern emerging from disorder, clarity arriving through rigor. It should look contemplative and purposeful, not active. As if the analysis has just finished and what we're seeing is the result.
>
> Avoid: search/scan animations, magnifying glass metaphors, dashboard widgets, anything that suggests ongoing monitoring (this is a one-time engagement, not a live tool).

---

## Stage 02 — Instrumentation

> Make a visual for a section about *building the foundation that allows autonomous AI systems to run reliably*.
>
> The work shown is the unglamorous substrate work that has to happen before agents can be deployed: unifying scattered data sources, documenting workflows that previously lived as tribal knowledge, installing guardrails and evaluation criteria. The transition is from "operations holding together because people care" to "clean structure that AI agents can stand on."
>
> The visual should evoke *engineering substrate* — load-bearing, integrated, complete. Architecture, scaffold, lattice, foundation. The feeling of looking at structure that has just been built and is ready for what comes next. Static, sturdy, deliberate. Visible craft.
>
> Avoid: corporate "building blocks" cliché, Lego-style stacks, generic puzzle pieces, anything that looks like a stock illustration of teamwork or assembly.

---

## Stage 03 — Autonomous Orchestration

> Make a visual for a section about *a business running on autonomous AI agents that make decisions in parallel, without a human in the loop for day-to-day execution*.
>
> What's happening: many agents, many decisions, many signals — across marketing, operations, customer success, revenue — all firing concurrently. Output is decoupled from headcount: the company can scale what gets done without scaling who does it. The system is alive, intelligent, and continuous.
>
> The visual should evoke *a working system in steady state*. Composed but unmistakably active. Multiple parallel processes happening at once. Like an orchestra in performance, a living circuit, or signals branching across a network. Subtle, continuous motion is appropriate here — not a loop that completes and restarts, but ambient activity that feels ongoing.
>
> Avoid: "robot" or humanoid imagery, brain/neural-network clichés, AI-as-glowing-orb, dashboard UIs, frantic or chaotic motion. The system is sophisticated and calm, not flashy.

---

## Tool-specific tweaks

**For image generators (Midjourney / DALL·E / Imagen / Firefly):**
Append a line specifying medium and shot — e.g., `Style: minimal vector illustration on warm cream background. Composition: centered, balanced, generous white space.`

**For motion / video tools (Sora / Runway / Kling):**
Specify duration and loop behavior — e.g., `6–10 second loop, ambient and continuous, no hard cuts. Motion is slow and editorial.`

**For code / HTML tools (Claude Design / v0 / bolt):**
Append `Render as a self-contained SVG or HTML+CSS component, around 340×340px, suitable for embedding alongside body copy in a static website.`

**For all tools:**
If you need to give a single shorthand, say: *"Engineering schematic, not infographic."*
