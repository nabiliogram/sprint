import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { 
    ResponsiveContainer, 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend 
} from 'recharts';

// --- 1. GLOBAL CONSTANTS & DATA ---

const PALETTE = {
    bg: "#F8FAFC",
    ink: "#0F172A",
    subInk: "#334155",
    teal: "#0EA5A4",
    gold: "#C8A44D",
    gray: "#111827",
};

const CARD_ACCENTS = [
    { text: "text-teal-600", line: "bg-teal-500/70" },
    { text: "text-amber-600", line: "bg-amber-500/70" },
    { text: "text-slate-700", line: "bg-slate-500/50" }
];

const fadeIn = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const NAV_LINKS = [
    { href: "#challenge", label: "Opportunity" },
    { href: "#blueprint", label: "Blueprint" },
    { href: "#scorecard", label: "Roadmap" },
    { href: "#deliverables", label: "Deliverables" },
    { href: "#team", label: "Team" },
];

const OPPORTUNITY_CARDS = [
    {
        title: "Increase Customer Value",
        copy: "We start by finding the gaps in how you communicate with and keep your customers. By fixing your messaging and strategy first, we create a stable foundation for growing revenue from your existing base without increasing costs.",
    },
    {
        title: "Spend Your Budget Where It Works",
        copy: "Once the foundation is solid, we move to your budget. We provide the clarity you need to stop wasting spend on low-performing channels and confidently move your budget toward the specific areas driving the highest real profit.",
    },
    {
        title: "Scale Faster with Automation",
        copy: "Finally, we scale your growth without adding manual work. We audit your tools and set up smarter workflows to handle the heavy lifting, freeing your team to focus on high-level strategy instead of repetitive tasks.",
    },
];

const LOGO_SA_URL = "https://haschemie.com/sprint/logo.png";
const PROMINENT_OVERLINE_CLASS = "inline-flex items-center rounded-full border border-slate-200 bg-gradient-to-r from-teal-50 to-amber-50 px-3 py-1 text-xs font-medium text-slate-900 shadow-sm";
const DANIEL_PHOTO_URL = "https://www.haschemie.com/sprint/danielhead.jpg";
const NABIL_PHOTO_URL = "https://www.haschemie.com/sprint/nabilhead.jpeg";
const LINKEDIN_ICON_URL = "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png";

const EXPERIENCE_LOGOS = [
    { alt: "Google", src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { alt: "Meta", src: "https://upload.wikimedia.org/wikipedia/commons/0/05/Meta_Platforms_Inc._logo_%28cropped%29.svg" },
    { alt: "YouTube", src: "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" },
    { alt: "BCG", src: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Boston_Consulting_Group_2020_logo.svg" },
    { alt: "P&G", src: "https://upload.wikimedia.org/wikipedia/commons/7/7a/P%26G_logo.svg" },
];

const TEAM_OVERVIEW = `The Sprint Assembly was founded on the belief that great consulting should be fast, focused, and delivered by operators who've done the work themselves. We're not career consultants—we're senior marketers who've built, scaled, and optimized growth engines at startups and enterprises alike.`;
const NABIL_BIO = `Nabil is a seasoned growth and marketing strategist who blends the rigor of big tech with the curiosity of a builder. As a founding member of Google’s EMEA headquarters, he spent nearly two decades shaping how Google and its clients approached marketing, growth, and customer engagement across Europe, Latin America, and the U.S. He led teams through new market launches, built scalable acquisition systems, and connected data to performance. More recently, he’s worked hands-on as an independent consultant to help startups modernize their marketing and turn promising experiments into repeatable growth. Nabil believes in keeping strategy simple, execution fast, and measurement clear so companies can grow with confidence.`;
const DANIEL_BIO = `Daniel is a practical growth leader with roots in both brand and data. He began his career at Procter & Gamble, where he learned the discipline of consumer insight and the power of clear messaging. At Google, he deepened his expertise in acquisition and measurement. In startups, he built small, fast teams that moved from idea to impact. And at BCG, he guided senior leaders on what to do next—and how to track success. Today, Daniel leads short, focused projects that align teams, define simple success metrics, and install the right tools to test ideas weekly and double down on what works. Fluent in English and Spanish, Daniel works across the U.S. and Latin America.`;

const SMES = [
    {
        name: "Alex Rivera",
        title: "Data Architect",
        expertise: "Warehousing, dbt, GA4/BigQuery, server‑side tracking",
        gradient: "from-sky-200 to-blue-300",
        linkedin: "#", 
    },
    {
        name: "Priya Menon",
        title: "MarTech Engineer",
        expertise: "CDP implementation, integrations, reverse ETL, automation",
        gradient: "from-fuchsia-200 to-pink-300",
        linkedin: "#", 
    },
    {
        name: "Marcus Chen",
        title: "CLV Strategist",
        expertise: "Retention models, cohort analysis, pricing & bundling",
        gradient: "from-emerald-200 to-teal-300",
        linkedin: "#", 
    },
    {
        name: "Sara Delgado",
        title: "Lifecycle/CRM Lead",
        expertise: "Segmentation, messaging architecture, ESP flows, Braze",
        gradient: "from-amber-200 to-yellow-300",
        linkedin: "#", 
    },
];

// --- ROADMAP DATA WITH DESCRIPTIONS ---
const scorecard = [
    {
        pillar: "BUILD THE BASE",
        items: [
            { label: "Validate Value Proposition", status: "Yellow", desc: "Confirm your fundamental offering resonates with target customers through in-market testing." },
            { label: "Sync ICP & Revenue", status: "Red", desc: "Align your Ideal Customer Profile definition with actual high-value revenue sources to focus efforts." },
            { label: "Clean Data Hygiene", status: "Yellow", desc: "Ensure your CRM and marketing data is accurate, complete, standardized, and de-duplicated." },
            { label: "Audit Funnel Leakage", status: "Red", desc: "Identify and fix specific stages in the customer journey where qualified prospects drop off." },
            { label: "Verify Attribution Rigor", status: "Yellow", desc: "Implement reliable tracking models to truly understand which touchpoints drive conversions." },
        ],
    },
    {
        pillar: "MAXIMIZE PROFIT",
        items: [
            { label: "Optimize Marginal ROI", status: "Yellow", desc: "Focus incremental spending only on channels that provide the best additional return on investment." },
            { label: "Balance Omnichannel Health", status: "Green", desc: "Maintain consistent messaging, branding, and performance across all active marketing channels." },
            { label: "Scale Creative Velocity", status: "Yellow", desc: "Increase the volume and speed of ad creative production and testing to combat ad fatigue." },
            { label: "Refine CRO Strategy", status: "Yellow", desc: "Continuously improve website and landing page conversion rates through structured A/B testing." },
            { label: "Accelerate Speed-to-Market", status: "Red", desc: "Reduce internal friction to launch campaigns and new initiatives faster than competitors." },
        ],
    },
    {
        pillar: "AUTOMATE SCALE",
        items: [
            { label: "Integrate MarTech Stack", status: "Yellow", desc: "Ensure seamless, bi-directional data flow and connectivity between all your marketing tools." },
            { label: "Deploy Workflow Automation", status: "Red", desc: "Reduce manual labor by automating repetitive marketing processes, nurture sequences, and tasks." },
            { label: "Build First-Party Data", status: "Yellow", desc: "Collect and own audience data directly to reduce reliance on third-party cookies and platforms." },
            { label: "Install Real-Time Analytics", status: "Yellow", desc: "Implement live dashboards for immediate visibility into campaign performance and issues." },
            { label: "Set HITL Governance", status: "Green", desc: "Establish Human-In-The-Loop oversight protocols for AI and automated decision-making systems." },
        ],
    },
];

// --- 2. HELPERS & UTILITIES ---
 
const getInitials = (name = "") =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0] ? s[0].toUpperCase() : undefined) 
    .join("") || "SA";

// --- 3. REUSABLE COMPONENTS ---
 
const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-slate-200 bg-gradient-to-r from-teal-50 to-amber-50 px-3 py-1 text-xs font-medium text-slate-900 shadow-sm">
    {children}
  </span>
);
 
const Badge = ({ status }) => {
  const map = {
    Red: "bg-red-100 text-red-700 border-red-200",
    Yellow: "bg-amber-100 text-amber-700 border-amber-200",
    Green: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold shrink-0 ${
        map[status] || "bg-slate-100 text-slate-800 border-slate-200"
      }`}
      style={{ height: 'fit-content' }}
    >
      {status}
    </span>
  );
};
 
const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</div>
);
 
const Avatar = ({ name, size = 80, gradient = "from-slate-100 to-slate-200" }) => (
  <div
    className={`rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center font-semibold text-slate-800 ring-2 ring-slate-200 shrink-0`}
    style={{ height: `${size}px`, width: `${size}px` }}
  >
    {getInitials(name)}
  </div>
);

const PhotoAvatar = ({ src, name, size = 80 }) => (
  <img
    src={src}
    alt={`${name} photo`}
    className="rounded-full object-cover shrink-0 ring-2 ring-slate-200"
    style={{ height: `${size}px`, width: `${size}px` }}
    onError={(e) => { 
        e.target.onerror = null; 
        e.target.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.className = `rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center font-semibold text-slate-800 ring-2 ring-slate-200 shrink-0`;
        fallback.style.height = `${size}px`;
        fallback.style.width = `${size}px`;
        fallback.textContent = getInitials(name);
        e.target.parentNode.insertBefore(fallback, e.target);
    }}
  />
);
 
const SectionTitle = memo(({ overline, title, kicker, overlineBgClass = "" }) => {
    return (
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="max-w-5xl mx-auto">
          {overline && (
            <div className="tracking-widest uppercase text-xs sm:text-sm font-semibold mb-3">
              <span className={overlineBgClass}>
                {overline}
              </span>
            </div>
          )}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-slate-900">
            {title}
          </h2>
          {kicker && <p className="mt-4 text-base sm:text-lg text-slate-600">{kicker}</p>}
        </div>
      </motion.div>
    );
});

// --- 4. PERFORMANCE OPTIMIZATION ---
 
const useSectionVisibility = (options = { threshold: 0.1, rootMargin: '100px 0px' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
 
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isVisible) {
        setIsVisible(true);
        observer.unobserve(ref.current);
      }
    }, options);
 
    if (ref.current) {
      observer.observe(ref.current);
    }
 
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options.threshold, options.rootMargin, isVisible]);
 
  return [ref, isVisible];
};
 
const LazyLoadSection = ({ children, id, className = "" }) => {
  const [ref, isVisible] = useSectionVisibility();
 
  const Placeholder = useCallback(() => (
    <div 
        className="flex items-center justify-center text-slate-400 h-96 animate-pulse" 
        style={{ minHeight: '500px' }}
    >
        Loading content...
    </div>
  ), []);
  
  return (
    <section id={id} ref={ref} className={`py-20 ${className}`}>
      {isVisible ? children : <Placeholder />}
    </section>
  );
};
 
// --- 5. MAIN APPLICATION COMPONENTS ---
 
const DeliverablesSectionContent = () => {
    const DELIVERABLES_DATA = {
      imageUrl: "https://haschemie.com/sprint/fa.png",
      combinedCopy: "Our core output is the Growth Assembly Blueprint — a clear, evidence-driven plan that shows exactly where to focus and why. It distills deep analysis, validated insights, and a roadmap built for immediate impact. You’ll see what’s working, what’s not, and which opportunities matter most, backed by a Gap Analysis & Financial Quantification linking issues to uplift potential. The Blueprint then converts these insights into a prioritized 6-month execution plan with concrete next steps—giving your team clarity, alignment, and a confident path forward.",
      delay: 0.1,
    };
    
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: DELIVERABLES_DATA.delay }}
          className="grid md:grid-cols-2 gap-8 items-start"
        >
          <div className="order-2 md:order-1 flex justify-center md:justify-start items-start h-full">
            <img
              src={DELIVERABLES_DATA.imageUrl}
              alt="Combined Deliverables Report Mockup"
              className="w-full max-w-md h-full object-contain rounded-xl shadow-2xl transition duration-500 hover:scale-[1.03]"
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/700x400/f1f5f9/94a3b8?text=Image+Not+Found"; }}
            />
          </div>

          <div className="order-1 md:order-2 text-center md:text-left">
            <p className="text-lg sm:text-xl text-slate-700" dangerouslySetInnerHTML={{ __html: DELIVERABLES_DATA.combinedCopy }} />
          </div>
        </motion.div>
        
        <div className="mx-auto max-w-4xl mt-12">
          <Card className="p-6 text-center">
            <div className="text-sm text-slate-600">
              <strong>Implementation Partner Match (Optional):</strong> Introduction to our vetted SME network for key
              execution work streams.
            </div>
          </Card>
        </div>
      </div>
    );
};
 
// --- 6. MAIN APP COMPONENT ---

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
        document.body.classList.add('overflow-hidden');
    } else {
        document.body.classList.remove('overflow-hidden');
    }
  };
  
  const handleLinkClick = () => {
    setIsMenuOpen(false);
    document.body.classList.remove('overflow-hidden');
  };

  return (
    <div className="min-h-screen text-slate-900 font-sans mx-auto max-w-full md:max-w-5xl">
      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img src={LOGO_SA_URL} alt="Sprint Assembly Logo" className="h-8 w-8 object-contain" />
            <span className="tracking-tight text-lg">
                <span className="font-extrabold">Sprint</span>
                <span className="font-light text-slate-500"> Assembly</span>
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href} className="hover:text-slate-900">
                {link.label}
              </a>
            ))}
          </nav>
          
          <div className="flex items-center gap-3">
            <a href="#cta" className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-3.5 py-1.5 text-sm font-semibold shadow-sm hover:shadow transition">
              Book a call
            </a>
            
            <button onClick={toggleMenu} className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition">
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-200 shadow-md absolute w-full z-30"
          >
            <nav className="flex flex-col p-4 space-y-2 text-base">
              {NAV_LINKS.map(link => (
                <a key={link.href} href={link.href} onClick={handleLinkClick} className="py-2 px-3 rounded-lg text-slate-700 hover:bg-slate-50 transition">
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0 -z-10" aria-hidden>
          <div
            className="h-[520px] w-full"
            style={{ background: `radial-gradient(1200px 520px at 20% -20%, ${PALETTE.teal}20, transparent), radial-gradient(1200px 520px at 80% 0%, ${PALETTE.gold}22, transparent)` }}
          />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl">
            <Pill>THE GROWTH & AUTOMATION SPRINT</Pill>
            <h1 className="mt-6 text-4xl sm:text-6xl font-black tracking-tight leading-[1.05] text-slate-900">
              Fix the Foundation.{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(90deg, ${PALETTE.teal}, ${PALETTE.gold})` }}>
                Automate the Scale.
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-700 max-w-3xl">
              We identify your highest-leverage growth opportunities and show you exactly where your next marketing dollar will deliver the most profit, helping you grow faster without adding manual work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONDENSED INTRO */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative">
            <div className="absolute -top-6 -left-2 text-5xl text-slate-200 select-none" aria-hidden>"</div>
            <p className="text-left text-2xl sm:text-3xl font-semibold text-slate-700 leading-relaxed tracking-tight">
              {TEAM_OVERVIEW}
            </p>
            <span className="mt-6 inline-block text-xs font-medium tracking-[0.24em] uppercase text-slate-400">
              Growth and Marketing Experience from:
            </span>
            <div className="mt-6 flex flex-wrap items-center gap-6 md:gap-10">
              {EXPERIENCE_LOGOS.map((logo) => (
                <div key={logo.alt} className="flex items-center justify-center">
                  <img src={logo.src} alt={`${logo.alt} logo`} className="h-6 sm:h-7 w-auto object-contain opacity-80" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CHALLENGE */}
      <section id="challenge" className="py-20 bg-[#F8FAFC]">
        <SectionTitle
          overlineBgClass={PROMINENT_OVERLINE_CLASS}
          overline="Identifying High-Value Levers"
          title="Where to pull for the most growth."
          kicker="Our diagnostic finds the biggest constraints in your marketing engine and defines a precise path to maximizing ROI by fixing your core logic and introducing high-efficiency automation."
        />
       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 grid md:grid-cols-3 gap-6 items-stretch">
          {OPPORTUNITY_CARDS.map((o,l)=>{
            const accent = CARD_ACCENTS[l];
            const stepLabels = ["Build the Base", "Maximize Profit", "Automate Scale"];
            return (
              <motion.div
                key={l}
                variants={fadeIn}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: l * 0.1 }}
                className="h-full"
              >
                <div className="relative rounded-xl overflow-hidden bg-white shadow-md transition hover:shadow-lg h-full">
                    <div className={`absolute top-0 left-0 w-full h-2 ${accent.line}`}></div> 
                    <div className="p-6 pt-8 h-full">
                        <div className={`text-sm font-extrabold ${accent.text} uppercase tracking-widest`}>
                            Step {l + 1}: {stepLabels[l]}
                        </div>
                        <h3 className="mt-2 text-2xl font-bold text-slate-900">{o.title}</h3>
                        <p className="mt-3 text-slate-700" dangerouslySetInnerHTML={{ __html: o.copy }} />
                    </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* BLUEPRINT */}
      <section id="blueprint" className="py-20 bg-white border-y border-slate-200">
        <SectionTitle
          overlineBgClass={PROMINENT_OVERLINE_CLASS}
          overline="Our Blueprint"
          title="The Growth Assembly Blueprint"
          kicker="A single 8–10 week diagnostic & strategy sprint engineered for predictable outcomes."
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { phase: "Assess", weeks: "Weeks 1–2", desc: "Rapid data transfer, stakeholder alignment, current‑state score‑carding." },
            { phase: "Diagnose", weeks: "Weeks 3–4", desc: "Pinpoint the single largest constraint and validate financial impact." },
            { phase: "Optimize", weeks: "Weeks 5–8", desc: "Design the optimal solution and prioritize high‑leverage actions." },
            { phase: "Plan", weeks: "Weeks 9–10", desc: "Finalize roadmap, quantify ROI, and secure executive buy‑in." },
          ].map((p, i) => (
            <motion.div key={i} variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Card className="p-6 h-full">
                <div className="text-xs uppercase tracking-wider text-slate-500">{p.weeks}</div>
                <h3 className="mt-2 text-2xl font-extrabold" style={{ color: i % 2 === 0 ? PALETTE.teal : PALETTE.gold }}>{p.phase}</h3>
                <p className="mt-3 text-slate-700">{p.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ROADMAP / SCORECARD SECTION - VERTICAL STACKED VERSION */}
      <LazyLoadSection id="scorecard">
        <SectionTitle
          overlineBgClass={PROMINENT_OVERLINE_CLASS}
          overline="Diagnosis & Quantification"
          title="The Agentic Growth Roadmap"
          kicker="Objective, data‑backed ratings across 15 critical capabilities, organized by your journey to automated scale."
        />
        {/* max-w-3xl ensures text width is optimal for reading vertical blocks */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 gap-12 items-stretch">
          {scorecard.map((col, i) => (
            <div key={i} className="flex flex-col h-full bg-slate-50/50 rounded-3xl border border-slate-200 p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-400">
                   0{i + 1}
                 </span>
                 <h4 className="text-xl font-extrabold uppercase tracking-widest" style={{ color: i === 0 ? "#00A3B3" : i === 1 ? "#B8860B" : "#2C3E50" }}>
                   {col.pillar}
                 </h4>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {col.items.map((it, idx) => (
                  <div 
                    key={idx} 
                    className="flex flex-col gap-2 p-5 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-slate-900 font-bold text-base leading-tight group-hover:text-slate-700 transition-colors">
                        {it.label}
                      </span>
                      <Badge status={it.status} />
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed mt-1">
                      {it.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </LazyLoadSection>

      {/* DELIVERABLES */}
      <LazyLoadSection id="deliverables" className="relative border-y border-slate-200 overflow-hidden">
        <div className="absolute inset-0 -z-10" aria-hidden>
          <div className="h-full w-full" style={{ background: `radial-gradient(1200px 520px at 20% -20%, ${PALETTE.teal}20, transparent), radial-gradient(1200px 520px at 80% 0%, ${PALETTE.gold}22, transparent)` }} />
        </div>
        <SectionTitle overlineBgClass={PROMINENT_OVERLINE_CLASS} overline="Final Assembly" title="Your Blueprint for Quantified Growth & Action" />
        <DeliverablesSectionContent />
      </LazyLoadSection>

      {/* TEAM */}
      <LazyLoadSection id="team">
        <SectionTitle overlineBgClass={PROMINENT_OVERLINE_CLASS} overline="Specialized Practitioners" title="The Assembly Team" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-12 space-y-8">
          <Card className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4">
                    <PhotoAvatar name="Nabil Haschemie" src={NABIL_PHOTO_URL} size={64} />
                    <div>
                      <div className="text-xs uppercase tracking-wider text-slate-500">Co‑founder</div>
                      <div className="mt-0.5 text-xl font-extrabold text-teal-600">Nabil Haschemie</div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-700">{NABIL_BIO}</p>
                </div>
                <div className="mt-4 flex justify-end">
                  <a href="https://www.linkedin.com/in/haschemie/" target="_blank" rel="noopener noreferrer">
                    <img src={LINKEDIN_ICON_URL} alt="LinkedIn" className="h-4 w-auto" />
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4">
                    <PhotoAvatar name="Daniel Besquin" src={DANIEL_PHOTO_URL} size={64} />
                    <div>
                      <div className="text-xs uppercase tracking-wider text-slate-500">Co‑founder</div>
                      <div className="mt-0.5 text-xl font-extrabold text-amber-600">Daniel Besquin</div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-700">{DANIEL_BIO}</p>
                </div>
                <div className="mt-4 flex justify-end">
                  <a href="https://www.linkedin.com/in/danielbesquin/" target="_blank" rel="noopener noreferrer">
                    <img src={LINKEDIN_ICON_URL} alt="LinkedIn" className="h-4 w-auto" />
                  </a>
                </div>
              </div>
            </div>
          </Card>

          <div className="text-center">
            <div className="tracking-widest uppercase text-xs font-semibold text-slate-500">Specialist Network</div>
            <h4 className="mt-1 text-2xl font-extrabold">Subject Matter Experts</h4>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {SMES.map((m, i) => (
              <Card key={i} className="p-5 flex flex-col justify-between">
                <div className="flex items-start gap-4">
                  <Avatar name={m.name} size={56} gradient={m.gradient} />
                  <div>
                    <div className="text-base font-bold text-slate-900">{m.name}</div>
                    <div className="text-xs uppercase tracking-wider text-slate-500">{m.title}</div>
                    <p className="mt-2 text-sm text-slate-700">{m.expertise}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </LazyLoadSection>

      <LazyLoadSection id="cta" className="py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card className="p-8 text-center">
            <h3 className="text-3xl sm:text-4xl font-extrabold">Ready to De‑Risk Your Next Investment?</h3>
            <p className="mt-3 text-slate-700">30‑minute scoping session to validate fit and timeline.</p>
            <a href="#" className="mt-6 inline-flex items-center rounded-2xl bg-slate-900 text-white px-6 py-3 font-semibold shadow hover:opacity-90 transition">
              Book a Free Initiation Call
            </a>
          </Card>
        </div>
      </LazyLoadSection>

      <footer className="py-10 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={LOGO_SA_URL} alt="Logo" className="h-8 w-8" />
            <span className="font-semibold">Sprint Assembly</span>
          </div>
          <div className="text-sm text-slate-500">© {new Date().getFullYear()} Sprint Assembly. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
