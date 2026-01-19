import React, { useEffect, useState } from "react";

// Helper for conditional classes
const cx = (...xs) => xs.filter(Boolean).join(" ");

// Theme and Constants
const THEME = { 
  cta: "#afb975", // MOSSY GREEN
  ctaHover: "#8c965e", 
  ctaRing: "#6b7347",
  accentTeal: "rgba(184,240,237,0.55)",
  accentAmber: "rgba(255,237,184,0.28)"
};

// Primary contact email
const CONTACT_EMAIL = "grow@sprintassembly.com";
const LOGO_URL = "https://haschemie.com/sprint/logo.png";

// Navigation setup
const NAV = [
  ["Opportunity", "#opportunity"],
  ["Calculator", "#calculator"],
  ["Process", "#roadmap"],
  ["Team", "#team"],
];

const HERO_LOGOS = [
  ["Google", "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"],
  ["Meta", "https://upload.wikimedia.org/wikipedia/commons/0/05/Meta_Platforms_Inc._logo_%28cropped%29.svg"],
  ["YouTube", "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"],
  ["BCG", "https://upload.wikimedia.org/wikipedia/commons/d/d0/Boston_Consulting_Group_2020_logo.svg"],
  ["P&G", "https://upload.wikimedia.org/wikipedia/commons/7/7a/P%26G_logo.svg"],
];

// Design Tokens & Backgrounds
const PAGE_BG = `radial-gradient(1100px circle at 12% -12%, ${THEME.accentTeal}, transparent 55%), radial-gradient(900px circle at 92% 18%, ${THEME.accentAmber}, transparent 60%), linear-gradient(180deg, rgba(244,252,251,0.95), rgba(255,250,236,0.78) 48%, rgba(255,255,255,1) 100%)`;

const PAPER_CLIP = "polygon(0% 14%, 3% 9%, 7% 13%, 11% 8%, 15% 14%, 19% 9%, 24% 15%, 29% 10%, 34% 16%, 40% 9%, 46% 15%, 52% 10%, 59% 16%, 66% 9%, 73% 15%, 80% 10%, 86% 16%, 92% 9%, 97% 13%, 100% 15%, 100% 90%, 97% 95%, 92% 91%, 87% 97%, 81% 92%, 74% 98%, 67% 91%, 60% 97%, 52% 92%, 44% 98%, 36% 91%, 28% 97%, 20% 92%, 12% 98%, 6% 92%, 2% 95%, 0% 90%)";

const PAPER_TEXTURE = "linear-gradient(180deg, rgba(255,249,239,0.985), rgba(255,241,210,0.95)), radial-gradient(circle at 18% 26%, rgba(0,0,0,0.06), transparent 58%), radial-gradient(circle at 84% 74%, rgba(0,0,0,0.05), transparent 62%), repeating-radial-gradient(circle at 12% 18%, rgba(17,24,39,0.030) 0px, rgba(17,24,39,0.030) 1px, transparent 1px, transparent 6px), repeating-radial-gradient(circle at 78% 62%, rgba(17,24,39,0.018) 0px, rgba(17,24,39,0.018) 1px, transparent 1px, transparent 7px), repeating-linear-gradient(0deg, rgba(17,24,39,0.015) 0px, rgba(17,24,39,0.015) 1px, transparent 1px, transparent 6px), repeating-linear-gradient(90deg, rgba(17,24,39,0.012) 0px, rgba(17,24,39,0.012) 1px, transparent 1px, transparent 7px)";

// Common Components
const Wrap = ({ children, className = "" }) => (
  <div className={cx("mx-auto w-[92%] sm:w-[88%] lg:w-[75%] xl:w-[70%] max-w-[1280px]", className)}>{children}</div>
);

const Eyebrow = ({ children }) => (
  <div className="text-[11px] tracking-[0.28em] uppercase font-bold text-neutral-500/80">{children}</div>
);

const Section = ({
  id,
  eyebrow,
  title,
  children,
}) => (
  <section id={id} className="relative border-t border-neutral-200/50">
    <Wrap className="pt-12 pb-20 sm:pt-16 sm:pb-24">
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      {title ? (
        <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-neutral-950 leading-normal md:leading-tight">
          <span className="box-decoration-clone bg-neutral-950 px-4 py-1 text-white shadow-xl ring-1 ring-white/10">
            {title}
          </span>
        </h2>
      ) : null}
      <div className="mt-6">{children}</div>
    </Wrap>
  </section>
);

const Btn = ({
  href,
  children,
  variant = "primary",
  className = "",
}) => {
  const base = "inline-flex items-center justify-center rounded-sm px-7 py-4 text-sm font-bold transition-all duration-300 transform active:scale-95";
  
  if (variant === "ghost") {
    return (
      <a
        href={href}
        className={cx(
          base,
          "bg-white/40 text-neutral-900 ring-1 ring-neutral-300 hover:bg-white hover:ring-neutral-400 hover:shadow-md",
          className
        )}
      >
        {children}
      </a>
    );
  }
  
  return (
    <a
      href={href}
      className={cx(base, "text-white ring-1 shadow-md hover:shadow-lg", className)}
      style={{ background: THEME.cta, borderColor: THEME.ctaRing }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = THEME.ctaHover;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = THEME.cta;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {children}
    </a>
  );
};

const Svg = ({ p, children }) => (
  <svg className={p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const Icon = {
  bolt: (p) => <Svg p={p}><path d="M13 2 3 14h8l-1 8 10-12h-8l1-8Z" /></Svg>,
  graph: (p) => <Svg p={p}><path d="M4 19V5M4 19h16M8 15v-4M12 15V7M16 15v-6" /></Svg>,
  target: (p) => <Svg p={p}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2" /></Svg>,
  spark: (p) => <Svg p={p}><path d="M12 2v4M12 18v4 suicideM2 12h4 suicideM18 12h4M4.5 4.5l2.8 2.8M16.7 16.7l2.8 2.8M19.5 4.5l-2.8 2.8M7.3 16.7l-2.8 2.8" /></Svg>,
  cpu: (p) => <Svg p={p}><rect x="7" y="7" width="10" height="10" rx="2" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" /></Svg>,
  coins: (p) => <Svg p={p}><path d="M12 6c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3ZM4 3v6c0 1.7 3.6 3 8 3s8-1.3 8-3V3M4 9v6c0 1.7 3.6 3 8 3s8-1.3 8-3V9" /></Svg>,
  beaker: (p) => <Svg p={p}><path d="M10 2v6l-5 9a3 3 0 0 0 2.6 4.5h8.8A3 3 0 0 0 19 17l-5-9V2M8 8h8M9 14h6" /></Svg>,
  layers: (p) => <Svg p={p}><path d="M12 2 2 7l10 5 10-5-10-5ZM2 12l10 5 10-5M2 17l10 5 10-5" /></Svg>,
  loop: (p) => <Svg p={p}><path d="M21 12a9 9 0 0 1-15.5 6.4M3 12a9 9 0 0 1 15.5-6.4M6 18H3v-3M18 6h3v3" /></Svg>,
  chevronDown: (p) => <Svg p={p}><path d="m6 9 6 6 6-6" /></Svg>,
  copy: (p) => <Svg p={p}><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></Svg>,
  check: (p) => <Svg p={p}><path d="M20 6 9 17l-5-5" /></Svg>,
};

// Data
const OPPORTUNITY = [
  { 
    tag: "PRODUCTIVITY", 
    headline: "Reclaim capacity by removing manual labor.", 
    body: "By automating your data integration and content workflows, you can reclaim up to 40% of your team's capacity for higher-level strategy. We help you build a standardized, error-free operating model that allows your business to scale without needing to add more headcount.", 
    icon: Icon.graph 
  },
  { 
    tag: "PERFORMANCE", 
    headline: "Optimize performance with real-time wins.", 
    body: "While manual teams are waiting for weekly reports, our autonomous systems shift budget to the best-performing segments and creative signals in real time. This ensures your capital is always used efficiently, resulting in a much lower cost of acquisition.", 
    icon: Icon.target 
  },
  { 
    tag: "PROFIT", 
    headline: "Maximize profit with systemized economics.", 
    body: "We transform your customer data into a system that automatically sends the right communication based on individual behavior. This increases customer lifetime value and builds a moat around your most profitable segments, making your growth both sustainable and profitable.", 
    icon: Icon.bolt 
  },
];

const ROADMAP = [
  { 
    step: 1, 
    title: "Diagnostic Sprint", 
    sub: "We audit your channels and data to identify operational constraints. This roadmap ensures capital is focused strictly on the highest-return automation opportunities.", 
    areas: ["Marketing and measurement maturity", "Budget allocation and channel ROI", "Customer lifecycle friction", "AI readiness audit"], 
    outcome: "A clear, prioritized view of where change will drive the highest return." 
  },
  { 
    step: 2, 
    title: "Strategic Foundations", 
    sub: "We build the infrastructure and messaging needed for reliable automation. This governance layer ensures your engine operates on clean data and brand-safe logic.", 
    areas: ["Growth strategy & messaging", "Data & measurement standards", "Experimentation governance", "Data activation workflows"], 
    outcome: "A growth architecture where AI and automation operate reliably." 
  },
  { 
    step: 3, 
    title: "Autonomous Systems", 
    sub: "We install loops that optimize spend and creative in real-time. This shifts your team to system oversight, enabling scale that is independent of headcount.", 
    areas: ["Automated budget optimization", "Creative experimentation at scale", "Predictive CRM orchestration", "Real-time measurement loops"], 
    outcome: "Marketing that improves itself over time - driving efficiency and predictable growth." 
  },
];

const SME = ["Data Science", "Web Development", "Creative Production", "Social / New Media", "Agentic Workflows", "CRM Engineering"];

const roadmapAreaIcon = (label) => {
  const t = label.toLowerCase();
  if (t.includes("budget") || t.includes("roi")) return Icon.coins;
  if (t.includes("measurement") || t.includes("data")) return Icon.graph;
  if (t.includes("lifecycle") || t.includes("crm")) return Icon.loop;
  if (t.includes("automation") || t.includes("ai")) return Icon.cpu;
  if (t.includes("experiment") || t.includes("beaker")) return Icon.beaker;
  if (t.includes("strategy") || t.includes("messaging")) return Icon.layers;
  if (t.includes("creative")) return Icon.spark;
  return Icon.target;
};

const INDUSTRY_BENCH = {
  general: { growth: 0.065, labor: 0.2, media: 0.17, agency: 0.4 },
  ecommerce: { growth: 0.095, labor: 0.18, media: 0.2, agency: 0.45 },
  saas: { growth: 0.075, labor: 0.28, media: 0.15, agency: 0.4 },
  professional: { growth: 0.03, labor: 0.3, media: 0.1, agency: 0.35 },
  finserve: { growth: 0.05, labor: 0.22, media: 0.18, agency: 0.5 },
  cpg: { growth: 0.04, labor: 0.15, media: 0.22, agency: 0.35 },
  healthcare: { growth: 0.055, labor: 0.2, media: 0.12, agency: 0.4 },
};

// Sub-components
const Metric = ({ label, value, note }) => (
  <div className="rounded-2xl bg-white/90 p-3 sm:p-6 shadow-sm ring-1 ring-black/5 hover:ring-emerald-500/20 transition-all text-center flex flex-col justify-center min-h-[100px] sm:min-h-[120px]">
    <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.24em] text-neutral-400">{label}</div>
    <div className="mt-1 sm:mt-2 text-xl sm:text-2xl font-black tracking-tight text-emerald-600">{value}</div>
    <div className="mt-1 text-[8px] sm:text-[10px] uppercase font-bold tracking-[0.15em] sm:tracking-[0.20em] text-neutral-400 leading-tight">{note}</div>
  </div>
);

function ValueCalculator() {
  const [industry, setIndustry] = useState("general");
  const [rev, setRev] = useState(10_000_000);
  const [hc, setHc] = useState(15);
  const [media, setMedia] = useState(100_000);
  const [agency, setAgency] = useState(15_000);

  const compactFmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 1, notation: "compact" });
  const b = INDUSTRY_BENCH[industry] || INDUSTRY_BENCH.general;

  const growthVal = rev * b.growth;
  const laborVal = hc * 110_000 * b.labor;
  const mediaVal = media * 12 * b.media;
  const agencyVal = agency * 12 * b.agency;
  const total = growthVal + laborVal + mediaVal + agencyVal;

  return (
    <div className="w-full">
      <style>{`input.calc-range{-webkit-appearance:none;width:100%;background:transparent}input.calc-range::-webkit-slider-runnable-track{height:6px;background:#f3f4f6;border-radius:999px}input.calc-range::-webkit-slider-thumb{-webkit-appearance:none;height:20px;width:20px;border-radius:999px;background:#111827;margin-top:-7px;border:3px solid #fff;box-shadow:0 4px 10px rgba(0,0,0,.15)}`}</style>
      
      <div className="max-w-4xl px-2">
        <p className="text-lg leading-relaxed text-neutral-600 font-medium mb-12">
          Transitioning to autonomous systems requires understanding your current opportunity space. Applying benchmarks from{" "}
          <a href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai" target="_blank" rel="noreferrer" className="text-neutral-900 font-bold hover:text-emerald-700 transition-colors">McKinsey</a>,{" "}
          <a href="https://www.gartner.com/en/articles/ai-is-coming-for-inefficiency" target="_blank" rel="noreferrer" className="text-neutral-900 font-bold hover:text-emerald-700 transition-colors">Gartner</a>, and{" "}
          <a href="https://www.nielsen.com/insights/2025/google-mmm-case-study/" target="_blank" rel="noreferrer" className="text-neutral-900 font-bold hover:text-emerald-700 transition-colors">Nielsen</a>,{" "}
          this simulator estimates gains from agentic workflows. It bridges the gap between AI hype and financial reality, visualizing potential scale for your unique model.
        </p>
      </div>

      <div className="rounded-[40px] bg-white/90 ring-1 ring-black/5 shadow-2xl overflow-hidden backdrop-blur-xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 md:p-12 space-y-8 border-b md:border-b-0 md:border-r border-neutral-100">
            <div className="flex flex-col gap-3 mb-8">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Industry Vertical</label>
              <div className="relative group">
                <select 
                  value={industry} 
                  onChange={(e) => setIndustry(e.target.value)} 
                  className="w-full p-3 rounded-sm bg-neutral-50 ring-1 ring-black/5 font-bold text-neutral-900 appearance-none focus:ring-2 focus:ring-neutral-900/10 outline-none cursor-pointer pr-10"
                >
                  <option value="general">General / Other</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="saas">B2B SaaS</option>
                  <option value="professional">Professional Services</option>
                  <option value="finserve">Financial Services</option>
                  <option value="cpg">CPG & Manufacturing</option>
                  <option value="healthcare">Healthcare</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 group-hover:text-neutral-900 transition-colors">
                  {Icon.chevronDown("h-4 w-4")}
                </div>
              </div>
            </div>

            {[
              { label: "Annual Revenue", val: rev, set: setRev, min: 1_000_000, max: 100_000_000, step: 1_000_000, disp: compactFmt.format(rev) },
              { label: "FTE Headcount", val: hc, set: setHc, min: 1, max: 200, step: 1, disp: hc },
              { label: "Monthly Media Spend", val: media, set: setMedia, min: 0, max: 1_000_000, step: 10_000, disp: compactFmt.format(media) },
              { label: "Monthly Agency Fees", val: agency, set: setAgency, min: 0, max: 250_000, step: 1_000, disp: compactFmt.format(agency) },
            ].map((r) => (
              <div key={r.label}>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{r.label}</span>
                  <span className="text-lg font-black text-neutral-900">{r.disp}</span>
                </div>
                <input type="range" className="calc-range" min={r.min} max={r.max} step={r.step} value={r.val} onChange={(e) => r.set(Number(e.target.value))} />
              </div>
            ))}
          </div>
          
          <div className="p-6 sm:p-8 md:p-12 bg-neutral-50/50 flex flex-col justify-center">
            <div className="text-center md:text-left mb-8 sm:mb-10">
              <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-400">Projected Annual Upside</div>
              <div className="mt-2 text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-neutral-950">{compactFmt.format(total)}</div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <Metric label="Growth Op" value={"+" + compactFmt.format(growthVal)} note="Top-line Lift" />
              <Metric label="Efficiency" value={"+" + compactFmt.format(laborVal)} note="Capacity Saved" />
              <Metric label="Media Lift" value={"+" + compactFmt.format(mediaVal)} note="ROI Performance" />
              <Metric label="VENDOR SAVINGS" value={"+" + compactFmt.format(agencyVal)} note="Cost Reduction" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const RoadmapStepCard = ({ step, title, sub, areas, outcome }) => (
  <article className="relative rounded-[32px] bg-white/30 backdrop-blur-2xl p-8 shadow-xl shadow-black/5 ring-1 ring-white/40 border border-black/[0.03] shadow-[inset_0px_1px_1px_rgba(255,255,255,0.8)] hover:shadow-2xl hover:bg-white/40 transition-all duration-500 group">
    <div className="lg:hidden text-xs font-black tracking-[0.2em] text-neutral-400 mb-2">STEP {step}</div>
    <h3 className="text-2xl font-bold tracking-tight text-neutral-950 leading-normal md:leading-tight">{title}</h3>
    <p className="mt-3 text-neutral-600 leading-relaxed font-medium">{sub}</p>
    <div className="mt-8">
      <div className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 mb-4">Focus Areas</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {areas.map(a => (
          <div key={a} className="flex items-start gap-3 text-sm text-neutral-800">
            <div className="mt-1 text-neutral-500/60 group-hover:text-emerald-600 transition-colors">{roadmapAreaIcon(a)("h-4 w-4")}</div>
            <span className="font-medium">{a}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="mt-8 pt-6 border-t border-black/[0.05] flex items-center gap-3">
       <div className="h-2 w-2 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
       <p className="text-sm font-bold text-neutral-800"><span className="text-neutral-400 font-medium">Outcome:</span> {outcome}</p>
    </div>
  </article>
);

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    console.assert(Array.isArray(ROADMAP) && ROADMAP.length === 3, "Expected 3 roadmap steps");
  }, []);

  const copyEmail = () => {
    const el = document.createElement('textarea');
    el.value = CONTACT_EMAIL;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen text-neutral-900 selection:bg-amber-100 scroll-smooth" style={{ backgroundImage: PAGE_BG }}>
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-neutral-200/50">
        <Wrap className="py-5 sm:py-6">
          <div className="flex items-center justify-between gap-10">
            <a href="#top" className="flex items-center gap-4 group flex-shrink-0">
              <img src={LOGO_URL} alt="Sprint Assembly" className="h-9 w-9 rounded-xl shadow-sm group-hover:rotate-6 transition-transform" />
              <span className="font-bold tracking-tight text-lg">Sprint Assembly</span>
            </a>
            
            <nav className="hidden md:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-neutral-500/80">
              {NAV.map(([label, href]) => (
                <a key={href} href={href} className="hover:text-neutral-950 transition-colors whitespace-nowrap">{label}</a>
              ))}
              <a 
                href="#contact" 
                className="rounded-sm px-6 py-2.5 text-white hover:brightness-110 transition-all shadow-sm font-bold"
                style={{ background: THEME.cta }}
              >
                Book Call
              </a>
            </nav>

            <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
              <div className="space-y-1.5 w-6">
                <div className={cx("h-0.5 w-full bg-neutral-950 transition-all", menuOpen && "rotate-45 translate-y-2")} />
                <div className={cx("h-0.5 w-full bg-neutral-950 transition-all", menuOpen && "opacity-0")} />
                <div className={cx("h-0.5 w-full bg-neutral-950 transition-all", menuOpen && "-rotate-45 -translate-y-2")} />
              </div>
            </button>
          </div>
          {menuOpen && (
            <div className="md:hidden py-8 flex flex-col gap-6 text-lg font-bold bg-white/95 absolute top-full left-0 w-full px-[6%] border-b border-neutral-200 shadow-xl">
              {NAV.map(([l, h]) => <a key={h} href={h} onClick={() => setMenuOpen(false)}>{l}</a>)}
              <a 
                href="#contact" 
                className="rounded-full px-5 py-4 text-white text-center font-bold" 
                style={{ background: THEME.cta }}
                onClick={() => setMenuOpen(false)}
              >
                Book Call
              </a>
            </div>
          )}
        </Wrap>
      </header>

      <main>
        {/* Grounded Hero Section */}
        <section 
          className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32"
          style={{ 
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.04) 0%, rgba(15, 23, 42, 0.02) 60%, transparent 100%)',
            backdropFilter: 'blur(10px)',
            boxShadow: 'inset 0px -20px 40px -20px rgba(0,0,0,0.03), inset 0px 1px 0px rgba(255,255,255,0.8)'
          }}
        >
          <div className="absolute inset-0 z-0 pointer-events-none opacity-40" style={{ backgroundImage: "url(https://haschemie.com/sprint/bg.svg)", backgroundSize: "cover", mixBlendMode: "multiply" }} />
          <Wrap className="relative z-10">
            <Eyebrow>The New Standard of Performance</Eyebrow>
            <h1 className="mt-8 font-black tracking-tight leading-[1.1] text-neutral-950 text-[13vw] sm:text-7xl md:text-8xl lg:text-[7vw] xl:text-[80px]">
              <span className="block lg:whitespace-nowrap">
                <span className="block lg:inline">From Manual </span>
                <span className="block lg:inline">Marketing to</span>
              </span>
              <span className="block w-fit lg:bg-black lg:text-white lg:px-4 lg:py-1 lg:mt-2 lg:whitespace-nowrap">
                <span className="block lg:inline bg-black lg:bg-transparent text-white lg:text-inherit px-4 lg:px-0 py-1 lg:py-0 mt-2 lg:mt-0 w-fit lg:w-auto">Autonomous </span>
                <span className="block lg:inline bg-black lg:bg-transparent text-white lg:text-inherit px-4 lg:px-0 py-1 lg:py-0 mt-2 lg:mt-0 w-fit lg:w-auto">Growth</span>
              </span>
            </h1>
            <p className="mt-10 text-xl md:text-2xl text-neutral-600 max-w-3xl font-medium leading-relaxed">
              We help leadership teams align data, creative, and media into an autonomous lifecycle engine that aligns every touchpoint with data and improves continuously.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Btn href="#opportunity">See the Opportunity</Btn>
              <Btn href="#calculator" variant="ghost">Calculate Upside</Btn>
            </div>

            {/* Torn Paper Section */}
            <div className="mt-20 relative isolate">
              <div className="absolute inset-0 translate-y-3 blur-md opacity-20 bg-neutral-900" style={{ clipPath: PAPER_CLIP }} />
              <div className="relative bg-white px-8 pt-20 pb-12 md:px-12 md:pt-24 md:pb-16 shadow-2xl flex flex-col justify-center min-h-[200px] md:min-h-[280px]" style={{ clipPath: PAPER_CLIP, backgroundImage: PAPER_TEXTURE }}>
                 <p className="text-xl md:text-2xl italic font-serif leading-relaxed text-neutral-800 max-w-4xl text-center md:text-left">
                   "Sprint Assembly is led by senior operators who’ve built and scaled growth across global enterprises. We work in focused sprints to make automation reliable."
                 </p>
                 <div className="mt-3 pt-3 border-t border-black/5">
                   <div className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-4 text-center md:text-left">Experience across:</div>
                   <div className="flex flex-wrap gap-8 md:gap-12 items-center justify-center md:justify-start opacity-80">
                     {HERO_LOGOS.map(([a, s]) => <img key={a} src={s} alt={a} className="h-5 md:h-7" />)}
                   </div>
                 </div>
              </div>
            </div>
          </Wrap>
        </section>

        <Section id="opportunity" eyebrow="Business Impact" title="The Opportunity">
           <div className="max-w-4xl">
             <p className="text-lg leading-relaxed text-neutral-600 font-medium mb-12">
               Marketing operations have hit the limit of manual scale. We help teams transition to an autonomous engine that optimizes the three primary levers of modern growth: reclaimed team capacity, real-time media performance, and superior unit economics.
             </p>
           </div>
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {OPPORTUNITY.map(o => (
               <div key={o.tag} className="bg-white/60 p-8 rounded-3xl ring-1 ring-black/5 flex flex-col">
                 <div className="flex justify-between items-start mb-6">
                   <div className="px-3 py-1 bg-neutral-950 text-white text-[10px] font-black tracking-widest">{o.tag}</div>
                   <div className="text-neutral-300">{o.icon("h-8 w-8")}</div>
                 </div>
                 <h3 className="text-2xl font-bold mb-4 leading-tight">{o.headline}</h3>
                 <p className="text-neutral-600 leading-relaxed text-sm md:text-base">{o.body}</p>
               </div>
             ))}
           </div>
        </Section>

        <Section id="calculator" eyebrow="IMPACT" title="Marketing Upside Estimator">
          <ValueCalculator />
        </Section>

        <Section id="roadmap" eyebrow="Process" title="How We Modernize You">
           <div className="max-w-4xl">
             <p className="text-lg leading-relaxed text-neutral-600 font-medium mb-12">
               Modernization begins with a diagnostic sprint to audit efforts and resolve infrastructure gaps. Once your data foundation is solid, we transition manual workflows into autonomous systems. This systematic shift allows your business to realize the efficiency gains and ROI potential identified in the upside estimator.
             </p>
           </div>
           <div className="space-y-8 relative">
             <div className="hidden lg:block absolute left-10 top-0 bottom-0 w-px bg-neutral-200" />
             {ROADMAP.map(r => (
               <div key={r.step} className="grid grid-cols-1 lg:grid-cols-[80px_1fr] gap-8 items-start">
                 <div className="hidden lg:flex h-20 items-center justify-center relative z-10">
                    <div className="h-14 w-14 rounded-2xl bg-white shadow-lg ring-1 ring-black/10 flex items-center justify-center font-black text-lg">0{r.step}</div>
                 </div>
                 <RoadmapStepCard {...r} />
               </div>
             ))}
           </div>
        </Section>

        <Section id="team" eyebrow="Team" title="Built by Operators">
           <div className="max-w-4xl">
             <p className="text-lg leading-relaxed text-neutral-600 font-medium mb-12">
               We are a collective of experts with decades of hands-on experience scaling global enterprises. As founders, we personally lead every diagnostic sprint and foundation build, drawing on our curated network of Subject Matter Experts when a specific workstream requires deep domain expertise or specialized technical execution.
             </p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {[
               { 
                 name: "Nabil Haschemie", 
                 role: "Co-founder", 
                 img: "https://haschemie.com/sprint/nabilhead.jpeg", 
                 bio: "Nabil is a growth and marketing strategist who brings big-tech rigor to practical execution. As a founding member of Google’s EMEA headquarters, he spent nearly two decades shaping how Google and its clients approached growth, performance marketing, and customer engagement across Europe, Latin America, and the U.S. He led new market launches, built scalable acquisition systems, and helped organizations connect data directly to performance. More recently, he has worked hands-on with startups and growth-stage companies, turning experiments into repeatable growth. His approach is simple: clear strategy, fast execution, and honest measurement.",
                 li: "https://www.linkedin.com/in/haschemie/" 
               },
               { 
                 name: "Daniel Besquin", 
                 role: "Co-founder", 
                 img: "https://haschemie.com/sprint/danielhead.jpg", 
                 bio: "Daniel is a pragmatic growth leader with experience across brand, data, and execution. He began his career at Procter & Gamble, where he developed a strong foundation in consumer insight and disciplined messaging. At Google, he deepened his expertise in acquisition and measurement. In startups, he built lean teams that moved quickly from idea to impact. And at BCG, he advised senior leaders on priorities and performance tracking. Today, Daniel leads focused engagements that align teams, define simple success metrics, and install tools to test and scale what works. Fluent in English and Spanish, he works across the U.S. and Latin America.",
                 li: "https://www.linkedin.com/in/danielbesquin/" 
               }
             ].map(p => (
               <div key={p.name} className="relative bg-white/70 p-8 rounded-[40px] ring-1 ring-black/5 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow">
                 <div className="flex items-center gap-6">
                    <img src={p.img} alt={p.name} className="h-20 w-20 rounded-3xl object-cover shadow-lg" />
                    <div>
                      <h3 className="text-xl font-bold text-neutral-950">{p.name}</h3>
                      <p className="text-neutral-400 font-bold text-[10px] uppercase tracking-[0.2em]">{p.role}</p>
                    </div>
                 </div>
                 <p className="text-sm text-neutral-600 leading-relaxed mb-12">{p.bio}</p>
                 <a 
                   href={p.li} 
                   target="_blank" 
                   rel="noreferrer" 
                   className="absolute bottom-8 right-8 inline-flex items-center justify-center p-2 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors border border-black/5"
                   aria-label={`${p.name} LinkedIn`}
                 >
                   <img src="https://haschemie.com/assets/linkedin-logo.png" alt="" className="h-5 w-auto object-contain" />
                 </a>
               </div>
             ))}
           </div>
           <div className="mt-12 text-center">
             <div className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400 mb-6">Supported by a SME network in:</div>
             <div className="flex flex-wrap justify-center gap-3">
               {SME.map(s => <span key={s} className="px-5 py-2.5 bg-white/80 backdrop-blur rounded-2xl border border-black/5 text-xs font-bold text-neutral-700 shadow-sm">{s}</span>)}
             </div>
           </div>
        </Section>

        <Section id="contact" eyebrow="CONTACT" title="Ready to Modernize?">
           <div className="max-w-4xl">
             <p className="text-xl text-neutral-600 mb-10 leading-relaxed font-medium">
               We’d be happy to jump on an exploratory call to discuss your current challenges and see where our expertise can help scale your growth. Reach out for a non-committal introductory session where we can explore your objectives and map out a potential path forward together.
             </p>
             
             <div className="flex flex-col lg:flex-row items-stretch gap-6">
               {/* Primary CTA */}
               <Btn 
                 href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Sprint Assembly - Intro")}`}
                 className="lg:w-1/3"
               >
                 Contact via Email
               </Btn>

               {/* Refined Email Display Card */}
               <div className="flex-1 flex flex-col sm:flex-row items-center justify-between p-5 gap-4 rounded-sm bg-white/50 border border-neutral-200 shadow-sm transition-all group hover:border-neutral-300 text-center sm:text-left">
                 <div className="text-lg md:text-xl font-bold text-neutral-950 tracking-wider break-all leading-tight">
                   {CONTACT_EMAIL}
                 </div>
                 
                 <button 
                   onClick={copyEmail}
                   className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all shrink-0"
                   style={{ 
                     background: copied ? THEME.cta : "transparent", 
                     color: copied ? "white" : THEME.cta,
                     border: `1px solid ${THEME.cta}` 
                   }}
                 >
                   {copied ? Icon.check("h-3 w-3") : Icon.copy("h-3 w-3")}
                   {copied ? "Copied" : "Copy Address"}
                 </button>
               </div>
             </div>
           </div>
        </Section>
      </main>

      <footer className="border-t border-neutral-200 bg-white/50 py-12">
        <Wrap>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <img src={LOGO_URL} alt="Sprint Assembly" className="h-7 w-7 rounded-lg shadow-sm" />
              <span className="font-bold tracking-tight">Sprint Assembly</span>
            </div>
            <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">
              &copy; {new Date().getFullYear()} Sprint Assembly
            </div>
          </div>
        </Wrap>
      </footer>
    </div>
  );
}
