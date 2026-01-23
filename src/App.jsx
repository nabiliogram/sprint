import React, { useEffect, useState } from "react";

// 1. Helpers
const cx = (...xs) => xs.filter(Boolean).join(" ");

// 2. Theme & Constants
const THEME = { 
  cta: "#afb975", // MOSSY GREEN
  ctaHover: "#8c965e", 
  ctaRing: "#6b7347",
  accentTeal: "rgba(184,240,237,0.55)",
  accentAmber: "rgba(255,237,184,0.28)"
};

const CONTACT_EMAIL = "grow@sprintassembly.com";
const LOGO_URL = "https://haschemie.com/sprint/logo.png";

const NAV = [
  ["Opportunity", "#opportunity"],
  ["Simulator", "#calculator"],
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

// 3. SVG & Icons
const Svg = ({ p, children }) => (
  <svg className={cx("transition-colors", p)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const Icon = {
  bolt: (p) => <Svg p={p}><path d="M13 2 3 14h8l-1 8 10-12h-8l1-8Z" /></Svg>,
  graph: (p) => <Svg p={p}><path d="M4 19V5M4 19h16M8 15v-4M12 15V7M16 15v-6" /></Svg>,
  target: (p) => <Svg p={p}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2" /></Svg>,
  help: (p) => <Svg p={p}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></Svg>,
  copy: (p) => <Svg p={p}><rect width="14" height="14" x="8" ry="2" rx="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></Svg>,
  check: (p) => <Svg p={p}><path d="M20 6 9 17l-5-5" /></Svg>,
  coins: (p) => <Svg p={p}><path d="M12 6c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3ZM4 3v6c0 1.7 3.6 3 8 3s8-1.3 8-3V3M4 9v6c0 1.7 3.6 3 8 3s8-1.3 8-3V9" /></Svg>,
  beaker: (p) => <Svg p={p}><path d="M10 2v6l-5 9a3 3 0 0 0 2.6 4.5h8.8A3 3 0 0 0 19 17l-5-9V2M8 8h8M9 14h6" /></Svg>,
  layers: (p) => <Svg p={p}><path d="M12 2 2 7l10 5 10-5-10-5ZM2 12l10 5 10-5M2 17l10 5 10-5" /></Svg>,
  loop: (p) => <Svg p={p}><path d="M21 12a9 9 0 0 1-15.5 6.4M3 12a9 9 0 0 1 15.5-6.4M6 18H3v-3M18 6h3v3" /></Svg>,
  spark: (p) => <Svg p={p}><path d="M12 2v4M12 18v4 suicideM2 12h4 suicideM18 12h4M4.5 4.5l2.8 2.8M16.7 16.7l2.8 2.8M19.5 4.5l-2.8 2.8M7.3 16.7l-2.8 2.8" /></Svg>,
  cpu: (p) => <Svg p={p}><rect x="7" y="7" width="10" height="10" rx="2" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" /></Svg>,
  chevronRight: (p) => <Svg p={p}><path d="m9 18 6-6-6-6" /></Svg>,
  chevronDown: (p) => <Svg p={p}><path d="m6 9 6 6 6-6" /></Svg>,
  flowChevron: (p) => (
    <svg className={p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m4 9 8 8 8-8" />
    </svg>
  ),
};

// 4. Data & Logic
const roadmapAreaIcon = (label) => {
  const t = label.toLowerCase();
  if (t.includes("budget") || t.includes("roi")) return Icon.coins;
  if (t.includes("measurement") || t.includes("data")) return Icon.graph;
  if (t.includes("lifecycle") || t.includes("crm")) return Icon.loop;
  if (t.includes("automation") || t.includes("ai")) return Icon.cpu;
  if (t.includes("experiment") || t.includes("beaker")) return Icon.beaker;
  if (t.includes("strategy") || t.includes("messaging") || t.includes("performance")) return Icon.layers;
  if (t.includes("creative") || t.includes("spark")) return Icon.spark;
  if (t.includes("process") || t.includes("efficiency")) return Icon.cpu;
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

const OPPORTUNITY = [
  { 
    tag: "PRODUCTIVITY", 
    headline: "Scale your business without hiring more people.", 
    body: "Eliminate the manual bottlenecks slowing your growth. By automating data integration and repetitive workflows, we build a standardized operating model that scales. This allows your organization to increase total output without the need for linear increases in headcount.", 
    icon: Icon.graph 
  },
  { 
    tag: "PERFORMANCE", 
    headline: "Optimize performance across the entire lifecycle.", 
    body: "Our autonomous systems respond to performance signals in real-time. We ensure your budget and creative are always directed toward the highest-performing segments, making every interaction across the customer journey more efficient and every dollar of spend more impactful.", 
    icon: Icon.target 
  },
  { 
    tag: "PROFIT", 
    headline: "Increase profitability through smart orchestration.", 
    body: "Transform customer data into an intelligent orchestration engine. By automating the logic behind growth, we increase lifetime value and protect margins. This delivers a growth model that is both predictable and profitable, ensuring sustainable scale through data-driven precision.", 
    icon: Icon.bolt 
  },
];

const ROADMAP_DATA = [
  { 
    step: 1, 
    title: "Diagnostic Sprint", 
    sub: "Analysis before assembly.", 
    body: "Every partnership begins with a time-capped audit of your growth stack. This 4-to-6 week sprint identifies where performance is leaking and locates your highest-margin opportunities. We don’t move to execution until we have a data-led map for your investment.",
    areas: [
      "Growth process and operational efficiency",
      "Marketing measurement maturity", 
      "Budget allocation and channel ROI", 
      "Customer lifecycle friction", 
      "AI readiness audit"
    ], 
    outcome: "A clear, prioritized view of where change will drive the highest return." 
  },
  { 
    step: 2, 
    title: "Performance Standards", 
    sub: "Immediate performance lift.", 
    body: "We fill operational gaps by installing rigorous standards across your marketing engine. By creating a unified source of truth and clear experimentation rules, we remove the drag of manual coordination. This stage drives an immediate lift in return on spend.",
    areas: ["Unified data & measurement standards", "Creative experimentation frameworks", "Lifecycle communication governance", "Faster testing & optimization loops"], 
    outcome: "Immediate acceleration in testing velocity, better creative performance, and significantly sharper budget allocation." 
  },
  { 
    step: 3, 
    title: "Autonomous Orchestration", 
    sub: "Scale independent of headcount.", 
    body: "Finally, we transition your team from manual execution to system oversight. We design the autonomous workflows that manage media and creative optimization in real-time. This builds a self-optimizing engine that improves your bottom line through intelligent scale.",
    areas: ["Automated budget optimization", "Agentic creative generation", "Predictive CRM orchestration", "Real-time measurement loops"], 
    outcome: "A self-optimizing growth engine that scales predictably while reclaiming up to 40% of your team’s strategic capacity." 
  },
];

const SME = ["Data Science", "Web Development", "Creative Production", "Agentic Workflows"];

const PAGE_BG = `radial-gradient(1100px circle at 12% -12%, ${THEME.accentTeal}, transparent 55%), radial-gradient(900px circle at 92% 18%, ${THEME.accentAmber}, transparent 60%), linear-gradient(180deg, rgba(244,252,251,0.95), rgba(255,250,236,0.78) 48%, rgba(255,250,236,0.78) 48%, rgba(255,255,255,1) 100%)`;

// 5. Shared Components
const Wrap = ({ children, className = "" }) => (
  <div className={cx("mx-auto w-[92%] sm:w-[88%] lg:w-[85%] max-w-[950px]", className)}>{children}</div>
);

const Eyebrow = ({ children }) => (
  <div className="text-[11px] tracking-[0.28em] uppercase font-bold text-neutral-500/80">{children}</div>
);

const Section = ({ id, eyebrow, title, children }) => (
  <section id={id} className="relative border-t border-neutral-200/50">
    <Wrap className="pt-3 pb-20 sm:pt-4 sm:pb-24">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {title && (
        <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-neutral-950 leading-tight">
          <span className="box-decoration-clone bg-neutral-950 px-4 py-1 text-white shadow-xl ring-1 ring-white/10">
            {title}
          </span>
        </h2>
      )}
      <div className="mt-6">
        {children}
      </div>
    </Wrap>
  </section>
);

const Btn = ({ href, children, variant = "primary", className = "" }) => {
  const base = "inline-flex items-center justify-center rounded-sm px-7 py-4 text-sm font-bold transition-all duration-300 transform active:scale-95";
  if (variant === "ghost") {
    return (
      <a href={href} className={cx(base, "bg-white/60 sm:bg-white/40 text-neutral-900 border border-neutral-300 hover:bg-white hover:border-neutral-400 hover:shadow-md", className)}>
        {children}
      </a>
    );
  }
  return (
    <a
      href={href}
      className={cx(base, "text-white ring-1 shadow-md hover:shadow-lg", className)}
      style={{ background: THEME.cta, borderColor: THEME.ctaRing }}
      onMouseEnter={(e) => (e.currentTarget.style.background = THEME.ctaHover)}
      onMouseLeave={(e) => (e.currentTarget.style.background = THEME.cta)}
    >
      {children}
    </a>
  );
};

const Metric = ({ label, value, note }) => (
  <div className="rounded-2xl bg-white p-2 sm:p-4 shadow-sm ring-1 ring-black/5 text-center flex flex-col justify-center min-h-[80px] sm:min-h-[100px]">
    <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.24em] text-neutral-400">{label}</div>
    <div className="mt-0.5 sm:mt-1 text-xl sm:text-2xl font-black tracking-tight text-emerald-600">{value}</div>
    <div className="mt-0.5 text-[8px] sm:text-[9px] uppercase font-bold tracking-[0.15em] text-neutral-400 leading-tight">{note}</div>
  </div>
);

// 6. Logic Components
const ValueCalculator = () => {
  const [industry, setIndustry] = useState("general");
  const [rev, setRev] = useState(10_000_000);
  const [hc, setHc] = useState(15);
  const [media, setMedia] = useState(100_000);
  const [agency, setAgency] = useState(15_000);
  const [showMethodology, setShowMethodology] = useState(false);

  const compactFmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 1, notation: "compact" });
  const b = INDUSTRY_BENCH[industry] || INDUSTRY_BENCH.general;

  const total = (rev * b.growth) + (hc * 110_000 * b.labor) + (media * 12 * b.media) + (agency * 12 * b.agency);

  return (
    <div className="w-full">
      <style>{`input.calc-range{-webkit-appearance:none;width:100%;background:transparent}input.calc-range::-webkit-slider-runnable-track{height:4px;background:#f3f4f6;border-radius:999px}input.calc-range::-webkit-slider-thumb{-webkit-appearance:none;height:18px;width:18px;border-radius:999px;background:#111827;margin-top:-7px;border:3px solid #fff;box-shadow:0 3px 8px rgba(0,0,0,.12)}`}</style>
      <div className="max-w-full mb-8">
        <p className="text-lg leading-relaxed text-neutral-600 font-medium italic">
          Get a high-level view of your modernization opportunity. By applying validated performance data to your current model, this simulator offers a directional estimate of how autonomous workflows can impact your bottom line. It serves as an initial look at the scale available before moving into a granular Diagnostic Sprint.
        </p>
      </div>
      <div className="rounded-[40px] bg-white ring-1 ring-black/5 shadow-2xl overflow-hidden transition-all">
        <div className="grid grid-cols-1 md:grid-cols-2 relative">
          <div className="p-6 md:p-10 space-y-5 border-b md:border-b-0 md:border-r border-neutral-100">
            <div className="flex flex-col gap-2 mb-4">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Vertical</label>
              <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="w-full p-2.5 rounded-sm bg-neutral-50 ring-1 ring-black/5 font-bold text-neutral-900 appearance-none outline-none cursor-pointer">
                <option value="general">General / Other</option>
                <option value="ecommerce">E-commerce</option>
                <option value="saas">B2B SaaS</option>
                <option value="professional">Professional Services</option>
                <option value="finserve">Financial Services</option>
                <option value="cpg">CPG & Manufacturing</option>
                <option value="healthcare">Healthcare</option>
              </select>
            </div>
            {[
              { label: "Annual Revenue", val: rev, set: setRev, min: 1_000_000, max: 100_000_000, step: 1_000_000, disp: compactFmt.format(rev) },
              { label: "FTE Headcount", val: hc, set: setHc, min: 1, max: 200, step: 1, disp: hc },
              { label: "Monthly Media Spend", val: media, set: setMedia, min: 0, max: 1_000_000, step: 10_000, disp: compactFmt.format(media) },
              { label: "Monthly Agency Fees", val: agency, set: setAgency, min: 0, max: 250_000, step: 1_000, disp: compactFmt.format(agency) },
            ].map((r) => (
              <div key={r.label}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{r.label}</span>
                  <span className="text-lg font-black text-neutral-900">{r.disp}</span>
                </div>
                <input type="range" className="calc-range" min={r.min} max={r.max} step={r.step} value={r.val} onChange={(e) => r.set(Number(e.target.value))} />
              </div>
            ))}
          </div>
          <div className="p-6 md:p-10 bg-neutral-50/50 flex flex-col justify-center relative">
            <div className="flex justify-between items-start mb-6">
              <div className="text-center md:text-left flex-grow">
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-400">Annual Upside</div>
                <div className="mt-1 text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-neutral-950">{compactFmt.format(total)}</div>
              </div>
              <button onClick={() => setShowMethodology(!showMethodology)} className={cx("p-2 rounded-full transition-colors shrink-0", showMethodology ? "bg-neutral-900 text-white shadow-md" : "hover:bg-neutral-200/50")} style={{ color: showMethodology ? 'white' : THEME.cta }}>
                {Icon.help("h-5 w-5")}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <Metric label="Growth" value="+6.5%" note="Lift" />
              <Metric label="Efficiency" value="+20%" note="Capacity" />
              <Metric label="Media" value="+17%" note="ROAS Lift" />
              <Metric label="Structural" value="+40%" note="Rationalized" />
            </div>
          </div>
        </div>
        {showMethodology && (
          <div className="border-t border-neutral-100 bg-neutral-50/80 p-8 md:p-10 animate-in fade-in slide-in-from-top-4 duration-300">
            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 mb-3">Simulator Logic</h4>
            <p className="text-sm leading-relaxed text-neutral-600 font-medium">
              This simulator applies high-level directional benchmarks: 
              <a href="https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights/the-value-of-getting-personalization-right-or-wrong-is-multiplying" target="_blank" rel="noreferrer" className="mx-1 text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-950 transition-all">McKinsey</a> 
              (+6.5% revenue lift through AI-driven journeys), 
              <a href="https://www.gartner.com/en/marketing/topics/marketing-ai" target="_blank" rel="noreferrer" className="mx-1 text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-950 transition-all">Gartner</a> 
              (20% capacity reclaim via automated administration), and 
              <a href="https://www.nielsen.com/insights/2017/when-it-comes-to-advertising-effectiveness-what-is-the-most-important-element/" target="_blank" rel="noreferrer" className="mx-1 text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-950 transition-all">Nielsen</a> 
              (+17% media lift). These figures provide a baseline for the deeper, customized analysis performed during our Diagnostic Sprint.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const RoadmapStepCard = ({ title, sub, body, areas, outcome, variant = "default" }) => {
  const isElevated = variant === "elevated";
  
  return (
    <article className={cx(
      "relative rounded-[32px] bg-white transition-all duration-500 overflow-hidden flex flex-col h-full",
      isElevated 
        ? "shadow-[0_40px_80px_-15px_rgba(0,0,0,0.12)] ring-1 ring-black/5 border-t-[5px] z-20" 
        : "p-6 md:p-8 shadow-xl shadow-black/5 ring-1 ring-black/5 z-10 hover:shadow-2xl"
    )} style={{ borderTopColor: isElevated ? THEME.cta : "transparent" }}>
      
      <div className={cx("grid grid-cols-1 items-stretch", isElevated ? "md:grid-cols-[1.5fr_1.1fr]" : "flex-1 flex flex-col")}>
        <div 
          className={cx("transition-colors", isElevated ? "p-8 md:p-10 space-y-4" : "md:min-h-[150px] mb-2")}
          style={isElevated ? { backgroundColor: 'rgba(184,240,237,0.12)' } : {}}
        >
          <div className={cx("space-y-3", isElevated ? "" : "mb-4")}>
            <p className="text-neutral-500 font-bold uppercase text-[10px] tracking-[0.3em]">{sub}</p>
            <h3 className={cx("font-bold tracking-tight text-neutral-950 leading-tight", isElevated ? "text-2xl md:text-4xl" : "text-xl md:text-2xl")}>{title}</h3>
          </div>
          <p className="text-neutral-600 leading-relaxed font-medium text-base">{body}</p>
        </div>
        
        <div className={cx(
          "relative flex flex-col flex-1",
          isElevated ? "p-8 md:p-10 border-t md:border-t-0 md:border-l border-neutral-100 justify-center" : "mt-10"
        )}>
          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 mb-6">Focus Areas</div>
          <div className="grid grid-cols-1 gap-3.5 mb-6">
            {areas.map(a => (
              <div key={a} className="flex items-start gap-4 text-sm text-neutral-800">
                <div className="mt-1 shrink-0" style={{ color: THEME.cta }}>{roadmapAreaIcon(a)("h-4 w-4")}</div>
                <span className="font-bold leading-snug">{a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={cx(
        "pt-5 border-t border-black/[0.05] flex items-center gap-3 mt-auto",
        isElevated ? "mx-8 md:mx-10 mb-8" : ""
      )}>
         <div className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
         <p className="text-sm font-bold text-neutral-800"><span className="text-neutral-400 font-medium">Outcome:</span> {outcome}</p>
      </div>
    </article>
  );
};

// 7. Main Application
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const LogoGrid = ({ isMobile = false }) => (
    <div className={cx(
      "items-center justify-items-center",
      isMobile 
        ? "grid grid-cols-5 gap-x-2 mt-4 w-full" 
        : "grid grid-cols-3 gap-y-6 gap-x-8"
    )}>
      {HERO_LOGOS.map(([a, s]) => {
        const isWordmark = a === "Google" || a === "YouTube";
        return (
          <img 
            key={a} 
            src={s} 
            alt={a} 
            className={cx(
              "w-auto object-contain transition-all duration-300 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-105",
              isMobile 
                ? (isWordmark ? "max-h-[1.1rem]" : "max-h-[0.9rem]")
                : (isWordmark ? "h-7" : "h-6")
            )} 
          />
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen text-neutral-900 selection:bg-amber-100 scroll-smooth" style={{ backgroundImage: PAGE_BG }}>
      <style>{`
        .blueprint-grid {
          background-image: radial-gradient(circle, rgba(0,0,0,0.25) 1.5px, transparent 1.5px);
          background-size: 32px 32px;
        }
        .corner-bracket {
          width: 24px;
          height: 24px;
          position: absolute;
          border-color: ${THEME.cta};
          z-index: 20;
        }
        .roadmap-connector-v { width: 1px; background: ${THEME.cta}; opacity: 0.2; }
        .roadmap-connector-h { height: 1px; background: ${THEME.cta}; opacity: 0.2; }
      `}</style>

      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-neutral-200/50">
        <Wrap className="py-5 sm:py-6">
          <div className="flex items-center justify-between gap-10">
            <a href="#top" className="flex items-center gap-4 group flex-shrink-0">
              <img src={LOGO_URL} alt="Sprint Assembly" className="h-9 w-9 rounded-xl shadow-sm group-hover:rotate-6 transition-transform" />
              <span className="font-bold tracking-tight text-lg">Sprint Assembly</span>
            </a>
            <nav className="hidden md:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-neutral-500/80">
              {NAV.map(([label, href]) => (<a key={href} href={href} className="hover:text-neutral-950 transition-colors whitespace-nowrap">{label}</a>))}
              <a href="#contact" className="rounded-sm px-6 py-2.5 text-white hover:brightness-110 transition-all shadow-sm font-bold" style={{ background: THEME.cta }}>Book Call</a>
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
              <a href="#contact" className="rounded-full px-5 py-4 text-white text-center font-bold" style={{ background: THEME.cta }} onClick={() => setMenuOpen(false)}>Book Call</a>
            </div>
          )}
        </Wrap>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-24 lg:pt-16 lg:pb-32">
          <div className="absolute inset-0 z-0 pointer-events-none opacity-40 flex justify-center overflow-hidden">
            <div 
              className="w-full max-w-[1200px] h-full bg-no-repeat bg-center" 
              style={{ 
                backgroundImage: "url(https://haschemie.com/sprint/bg.svg)", 
                backgroundSize: "contain",
                mixBlendMode: "multiply" 
              }} 
            />
          </div>

          <Wrap className="relative z-10">
            <div className="relative lg:bg-white/40 lg:backdrop-blur-md lg:p-16 lg:rounded-[48px] lg:ring-1 lg:ring-black/5 lg:shadow-2xl overflow-hidden">
              <div className="hidden lg:block absolute inset-0 blueprint-grid opacity-50 pointer-events-none" />
              <div className="hidden lg:block corner-bracket top-6 left-6 border-t-2 border-l-2" />
              <div className="hidden lg:block corner-bracket top-6 right-6 border-t-2 border-r-2" />
              <div className="hidden lg:block corner-bracket bottom-6 left-6 border-b-2 border-l-2" />
              <div className="hidden lg:block corner-bracket bottom-6 right-6 border-b-2 border-r-2" />

              <div className="relative z-10">
                <Eyebrow>The New Standard of Performance</Eyebrow>
                <h1 className="mt-8 font-black tracking-tight leading-[1.1] text-neutral-950 text-[13vw] sm:text-7xl md:text-8xl lg:text-5xl xl:text-6xl">
                  <span className="block lg:whitespace-nowrap">
                    From Manual <br className="lg:hidden" />Marketing to
                  </span>
                  <span className="block w-fit lg:bg-black lg:text-white lg:px-4 lg:py-1 lg:mt-2 lg:whitespace-nowrap">
                    <span className="block lg:inline bg-black lg:bg-transparent text-white px-4 lg:px-0 py-1 lg:py-0 mt-2 lg:mt-0 w-fit lg:w-auto">Autonomous </span>
                    <span className="block lg:inline bg-black lg:bg-transparent text-white px-4 lg:px-0 py-1 lg:py-0 mt-2 lg:mt-0 w-fit lg:w-auto">Growth</span>
                  </span>
                </h1>
                <p className="mt-10 text-lg md:text-xl text-neutral-600 max-w-2xl font-medium leading-relaxed">
                  We replace manual marketing with autonomous systems. By aligning data, creative, and media into an automated engine, we remove operational bottlenecks and deliver growth that adapts to performance in real-time.
                </p>
                <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:items-center">
                  <Btn href="#opportunity" className="w-full sm:w-auto">See the Opportunity</Btn>
                  <Btn href="#calculator" variant="ghost" className="w-full sm:w-auto">Calculate Upside</Btn>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-10 mt-12 border-t border-black/[0.05] pt-8">
              <div className="flex-[2.4]">
                 <p className="text-xl md:text-2xl italic font-serif leading-relaxed text-neutral-800 text-justify">
                   "Sprint Assembly is led by senior operators who’ve built and scaled growth across global enterprises. We work in focused sprints to transition your marketing from manual execution to autonomous scale."
                 </p>
              </div>
              <div className="w-px h-32 self-center opacity-30" style={{ background: THEME.cta }} />
              <div className="flex-1">
                 <div className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-2 text-left">Experience across:</div>
                 <LogoGrid />
              </div>
            </div>

            <div className="lg:hidden mt-12 border-t border-black/[0.05] pt-8">
              <div className="space-y-6">
                 <p className="text-xl italic font-serif leading-relaxed text-neutral-800 text-center px-2">
                   "Sprint Assembly is led by senior operators who’ve built and scaled growth across global enterprises. We work in focused sprints to transition your marketing from manual execution to autonomous scale."
                 </p>
                 
                 <div className="flex justify-center">
                   <div className="w-16 h-px opacity-30" style={{ background: THEME.cta }} />
                 </div>

                 <div className="text-center">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-2">Experience across:</div>
                    <div className="px-1">
                      <LogoGrid isMobile={true} />
                    </div>
                 </div>
              </div>
            </div>
          </Wrap>
        </section>

        <Section id="opportunity" eyebrow="Business Impact" title="The Opportunity">
           <div className="mb-8">
             <p className="text-lg leading-relaxed text-neutral-600 font-medium mb-12 italic">
               You can’t scale through manual effort alone. We help you transition to an autonomous system that targets the three essentials of modern performance: reclaiming team bandwidth, making the entire customer journey more responsive to data, and improving your bottom line through systematic orchestration.
             </p>
           </div>
           <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
             {OPPORTUNITY.map((o, idx) => (
               <div key={o.tag} className="bg-white p-7 rounded-3xl ring-1 ring-black/5 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
                 <div className="flex justify-between items-start mb-6">
                   <div className="px-3 py-1 bg-neutral-950 text-white text-[10px] font-black tracking-widest uppercase">{o.tag}</div>
                   <div style={{ color: THEME.cta }}>{o.icon("h-8 w-8")}</div>
                 </div>
                 <h3 className="text-2xl font-bold mb-4 leading-tight md:min-h-[4rem]">{o.headline}</h3>
                 <p className="text-neutral-600 leading-relaxed text-sm md:text-base">{o.body}</p>
               </div>
             ))}
           </div>
        </Section>

        <Section id="calculator" eyebrow="POTENTIAL" title="Growth Potential Simulator">
          <ValueCalculator />
        </Section>

        <Section id="roadmap" eyebrow="Process" title="How We Modernize You">
           <div className="mb-8">
             <p className="text-lg leading-relaxed text-neutral-600 font-medium italic">
               We begin every partnership with a Diagnostic Sprint to map where your performance is leaking and find your biggest wins. Next, we fill operational gaps with rigorous Performance Standards to capture an immediate lift in return on spend. This foundation allows us to transition you to Autonomous Orchestration by building the systems that maximize your bottom line through intelligent scale.
             </p>
           </div>

           <div className="relative">
             <div className="hidden md:block absolute left-1/2 top-[410px] -translate-x-1/2 w-[500px] h-[60px] pointer-events-none">
                <div className="roadmap-connector-v h-10 w-px absolute left-1/2 -top-10" />
                <div className="roadmap-connector-h w-full absolute top-0 left-0" />
                <div className="roadmap-connector-v h-10 w-px absolute left-0 top-0" />
                <div className="roadmap-connector-v h-10 w-px absolute right-0 top-0" />
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-y-0 md:gap-y-2 md:gap-x-12 lg:gap-x-20 relative">
               <div className="col-span-full mb-0 md:mb-2 relative z-20">
                  <RoadmapStepCard {...ROADMAP_DATA[0]} variant="elevated" />
               </div>

               <div className="md:hidden flex justify-center py-1">
                  {Icon.flowChevron("w-12 h-12 text-[#afb975]")}
               </div>
               
               <div className="col-span-1 relative z-10 flex flex-col">
                  <RoadmapStepCard {...ROADMAP_DATA[1]} />
                  <div className="hidden md:flex absolute -right-10 lg:-right-14 top-1/2 -translate-y-1/2 z-30 bg-white shadow-md ring-1 ring-black/5 rounded-full p-2" style={{ color: THEME.cta }}>
                    {Icon.chevronRight("h-5 w-5")}
                  </div>
               </div>

               <div className="md:hidden flex justify-center py-1">
                  {Icon.flowChevron("w-12 h-12 text-[#afb975]")}
               </div>

               <div className="col-span-1 relative z-10 flex flex-col">
                  <RoadmapStepCard {...ROADMAP_DATA[2]} />
               </div>
             </div>
           </div>
        </Section>

        <Section id="team" eyebrow="Team" title="Built by Operators">
           <div className="mb-8">
             <p className="text-lg leading-relaxed text-neutral-600 font-medium italic">
               Sprint Assembly is led by growth veterans who prioritize execution over theory. We personally oversee every Diagnostic Sprint and implementation, drawing on a vetted network of specialists to solve your complex operational challenges without the overhead or friction of a traditional agency.
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
                 bio: "Daniel is a practical growth leader with experience across brand, data, and execution. He began his career at Procter & Gamble, where he developed a strong foundation in consumer insight and disciplined messaging. At Google, he deepened his expertise in acquisition and measurement. In startups, he built small, fast teams that moved quickly from idea to impact. And at BCG, he advised senior leaders on priorities and performance tracking. Today, Daniel leads focused engagements that align teams, define simple success metrics, and install tools to test and scale what works. Fluent in English and Spanish, he works across the U.S. and Latin America.", 
                 li: "https://www.linkedin.com/in/danielbesquin/" 
               }
             ].map(p => (
               <div key={p.name} className="relative bg-white p-8 rounded-[40px] ring-1 ring-black/5 flex flex-col gap-6 shadow-sm">
                 <div className="flex items-center gap-6">
                    <img src={p.img} alt={p.name} className="h-20 w-20 rounded-3xl object-cover shadow-lg" />
                    <div>
                      <h3 className="text-xl font-bold text-neutral-950">{p.name}</h3>
                      <p className="text-neutral-400 font-bold text-[10px] uppercase tracking-[0.2em]">{p.role}</p>
                    </div>
                 </div>
                 <p className="text-sm text-neutral-600 leading-relaxed mb-12">{p.bio}</p>
                 <a href={p.li} target="_blank" rel="noreferrer" className="absolute bottom-8 right-8 inline-flex items-center justify-center p-2 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors border border-black/5" aria-label={`${p.name} LinkedIn`}>
                   <img src="https://haschemie.com/assets/linkedin-logo.png" alt="" className="h-5 w-auto object-contain" />
                 </a>
               </div>
             ))}
           </div>
           <div className="mt-12 text-center">
             <div className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400 mb-6">Supported by a SME network in:</div>
             <div className="flex flex-wrap justify-center gap-3">
               {SME.map(s => <span key={s} className="px-5 py-2.5 bg-white/80 rounded-2xl border border-black/5 text-xs font-bold text-neutral-700 shadow-sm">{s}</span>)}
             </div>
           </div>
        </Section>

        <Section id="contact" eyebrow="CONTACT" title="Ready to Modernize?">
           <div className="max-w-full">
             <p className="text-xl text-neutral-600 mb-8 leading-relaxed font-medium">
               Modernizing your growth engine begins with a conversation. We’re available for a brief, non-committal session to discuss your current bottlenecks and map out a potential path from manual effort to autonomous scale. We’ll provide an objective assessment of your modernization potential to help you determine the most effective next step for your growth.
             </p>
             <div className="flex flex-col lg:flex-row items-stretch gap-6">
               {/* UPDATED: Custom style to match Nav Button format exactly */}
               <a 
                 href={`mailto:${CONTACT_EMAIL}?subject=Sprint%20Assembly%20Intro`} 
                 className="lg:w-1/3 inline-flex items-center justify-center rounded-sm px-6 py-2.5 text-white hover:brightness-110 transition-all shadow-sm font-bold" 
                 style={{ background: THEME.cta }}
               >
                 Contact via Email
               </a>
               <div className="flex-1 flex flex-col sm:flex-row items-center justify-between p-5 gap-4 rounded-sm bg-white/50 border border-neutral-200 shadow-sm transition-all group hover:border-neutral-300 text-center sm:text-left">
                 <div className="text-lg md:text-xl font-bold text-neutral-950 tracking-wider break-all leading-tight font-sans">{CONTACT_EMAIL}</div>
                 <button onClick={copyEmail} className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all shrink-0" style={{ background: copied ? THEME.cta : "transparent", color: copied ? "white" : THEME.cta, border: `1px solid ${THEME.cta}` }}>
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
            <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">&copy; {new Date().getFullYear()} Sprint Assembly</div>
          </div>
        </Wrap>
      </footer>
    </div>
  );
}
