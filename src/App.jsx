import React, { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react';
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
    { href: "#scorecard", label: "Scorecard" },
    { href: "#deliverables", label: "Deliverables" },
    { href: "#team", label: "Team" },
];

const OPPORTUNITY_CARDS = [
    {
        title: "Accelerate LTV & Retention",
        copy: "Maximize customer value by closing the loop on retention. We diagnose unoptimized lifecycle messaging and segmentation failures to <strong>fix systemic friction points</strong> that are currently under-monetizing your existing base.",
    },
    {
        title: "Unlock Marginal ROI Efficiency",
        copy: "Current budget allocation is often constrained by averaged data. We provide the clear framework needed to confidently <strong>shift spending and maximize the return</strong> on every incremental marketing dollar.",
    },
    {
        title: "AI/Automation Readiness",
        copy: "Competitive adoption of AI requires a refined operating model and scalable technical architecture. We audit your MarTech stack and <strong>blueprint your AI readiness</strong> to accelerate performance gains.",
    },
];

const LOGO_SA_URL = "https://haschemie.com/sprint/logo.png";
const PROMINENT_OVERLINE_CLASS = "inline-flex items-center rounded-full border border-slate-200 bg-gradient-to-r from-teal-50 to-amber-50 px-3 py-1 text-xs font-medium text-slate-900 shadow-sm";
const DANIEL_PHOTO_URL = "https://www.haschemie.com/sprint/danielhead.jpg";
const NABIL_PHOTO_URL = "https://www.haschemie.com/sprint/nabilhead.jpeg";
const LINKEDIN_ICON_URL = "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png";

const EXPERIENCE_LOGOS = [
    {
        alt: "Google",
        src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    {
        alt: "Meta",
        src: "https://upload.wikimedia.org/wikipedia/commons/0/05/Meta_Platforms_Inc._logo_%28cropped%29.svg",
    },
    {
        alt: "YouTube",
        src: "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg",
    },
    {
        alt: "BCG",
        src: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Boston_Consulting_Group_2020_logo.svg",
    },
    {
        alt: "P&G",
        src: "https://upload.wikimedia.org/wikipedia/commons/7/7a/P%26G_logo.svg",
    },
];

const TEAM_OVERVIEW = `The Sprint Assembly was founded on the belief that great consulting should be fast, focused, and delivered by operators who've done the work themselves. We're not career consultants—we're senior marketers who've built, scaled, and optimized growth engines at startups and enterprises alike.`;
const NABIL_BIO = `Nabil is a seasoned growth and marketing strategist who blends the rigor of big tech with the curiosity of a builder. As a founding member of Google’s EMEA headquarters, he spent nearly two decades shaping how Google and its clients approached marketing, growth, and customer engagement across Europe, Latin America, and the U.S. He led teams through new market launches, built scalable acquisition systems, and connected data to performance. More recently, he’s worked hands-on as an independent consultant to help startups modernize their marketing and turn promising experiments into repeatable growth. Nabil believes in keeping strategy simple, execution fast, and measurement clear so companies can grow with confidence.`;
const DANIEL_BIO = `Daniel is a practical growth leader with roots in both brand and data. He began his career at Procter & Gamble, where he learned the discipline of consumer insight and the power of clear messaging. At Google, he deepened his expertise in acquisition and measurement. In startups, he built small, fast teams that moved from idea to impact. And at BCG, he guided senior leaders on what to do next—and how to track success.

Today, Daniel leads short, focused projects that align teams, define simple success metrics, and install the right tools to test ideas weekly and double down on what works. Fluent in English and Spanish, Daniel works across the U.S. and Latin America.`;

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

const scorecard = [
    {
        pillar: "I. Growth Engine",
        items: [
            { label: "Marketing–Sales Alignment Logic", status: "Yellow" },
            { label: "End‑to‑End LTV Funnel Flow", status: "Red" },
            { label: "Customer Segmentation Rigor", status: "Yellow" },
            { label: "Strategic Positioning Clarity", "status": "Green" },
        ],
    },
    {
        pillar: "II. Performance Media",
        items: [
            { label: "Cross‑Channel ROI Clarity / Attribution", status: "Yellow" },
            { label: "Marginal CAC Efficiency", status: "Red" },
            { label: "Creative Velocity & Burnout", status: "Yellow" },
            { label: "Paid/Organic Mix Health", status: "Green" },
        ],
    },
    {
        pillar: "III. Technology & Data",
        items: [
            { label: "MarTech Stack Redundancy / Cost", status: "Yellow" },
            { label: "AI / Automation Readiness", status: "Yellow" },
            { label: "Data Integrity & Reporting Hygiene", status: "Red" },
            { label: "Omnichannel Tracking (O2O)", status: "Green" },
        ],
    },
    {
        pillar: "IV. Operating Cadence",
        items: [
            { label: "Agile Marketing Process Maturity", status: "Yellow" },
            { label: "OKR Alignment & Accountability", status: "Yellow" },
            { label: "Agency / Partner Alignment", status: "Red" },
            { label: "Team Structure & Gaps", status: "Green" },
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

// --- 3. REUSABLE COMPONENTS (Memoized for efficiency) ---
 
const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-slate-200 bg-gradient-to-r from-teal-50 to-amber-50 px-3 py-1 text-xs font-medium text-slate-900 shadow-sm">
    {children}
  </span>
);
 
const Badge = ({ status }) => {
  const map = {
    Red: "bg-red-100 text-red-800 border-red-200",
    Yellow: "bg-amber-100 text-amber-900 border-amber-200",
    Green: "bg-emerald-100 text-emerald-900 border-emerald-200",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${
        map[status] || "bg-slate-100 text-slate-800 border-slate-200"
      }`}
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
    // Fallback to text initials if image fails to load
    onError={(e) => { 
        e.target.onerror = null; 
        e.target.style.display = 'none'; // Hide broken image
        // Create a fallback initials container right where the image was
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
    // Check if motion is available before using it
    const MotionDiv = motion ? motion.div : 'div';

    return (
      <MotionDiv
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
      </MotionDiv>
    );
});

// --- 4. PERFORMANCE OPTIMIZATION (Intersection Observer Hook) ---
 
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
  
  // Check if motion is available before using it
  const MotionSection = motion ? motion.section : 'section';

  return (
    <section id={id} ref={ref} className={`py-20 ${className}`}>
      {isVisible ? children : <Placeholder />}
    </section>
  );
};
 
// --- 5. MAIN APPLICATION COMPONENTS ---
 
const DeliverablesSectionContent = () => {

    // Finalized copy and image URLs
    // New combined data for Deliverables section
    const DELIVERABLES_DATA = {
      imageUrl: "https://haschemie.com/sprint/fa.png", // <--- REPLACE with your actual combined image URL
      combinedCopy: "Our core output is the Growth Assembly Blueprint — a clear, evidence-driven plan that shows exactly where to focus and why. It distills deep analysis, validated insights, and a roadmap built for immediate impact. You’ll see what’s working, what’s not, and which opportunities matter most, backed by a Gap Analysis & Financial Quantification linking issues to uplift potential. The Blueprint then converts these insights into a prioritized 6-month execution plan with concrete next steps—giving your team clarity, alignment, and a confident path forward.",
      delay: 0.1, // Still useful for the overall animation
    };
    
    // Check if motion is available before using it
    const MotionDiv = motion ? motion.div : 'div';

    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        <MotionDiv
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: DELIVERABLES_DATA.delay }}
          className="grid md:grid-cols-2 gap-8 items-start" // Grid for image and text, centered vertically
        >
          {/* Image Column */}
          <div className="order-2 md:order-1 flex justify-center md:justify-start items-start h-full">
            <img
              src={DELIVERABLES_DATA.imageUrl}
              alt="Combined Deliverables Report Mockup"
              className="w-full max-w-md h-full object-contain rounded-xl shadow-2xl transition duration-500 hover:scale-[1.03]"
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/700x400/f1f5f9/94a3b8?text=Image+Not+Found"; }}
            />
          </div>

          {/* Text Column */}
          <div className="order-1 md:order-2 text-center md:text-left"> {/* Order changed for mobile-first, text on right on desktop */}
            <p className="text-lg sm:text-xl text-slate-700" dangerouslySetInnerHTML={{ __html: DELIVERABLES_DATA.combinedCopy }} />
          </div>
        </MotionDiv>
        
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
    // Optionally control body scroll when menu is open
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


  // Define the background class for prominent overlines
  const PROMINENT_OVERLINE_CLASS = "inline-flex items-center rounded-full border border-slate-200 bg-gradient-to-r from-teal-50 to-amber-50 px-3 py-1 text-xs font-medium text-slate-900 shadow-sm";
  
  // Check if motion is available before using it
  const MotionDiv = motion ? motion.div : 'div';

  return (
    // FIX: Capped the maximum width to 1000px for large screens (md:max-w-5xl is approx 64rem or 1024px)
<div 
  className="min-h-screen text-slate-900 font-sans mx-auto max-w-full md:max-w-5xl"
>
      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img
  src={LOGO_SA_URL}
  alt="Sprint Assembly SA Logo"
  className="h-8 w-8 object-contain"
/>
            <span className="tracking-tight text-lg">
  <span className="font-extrabold">Sprint</span>
  <span className="font-light text-slate-500"> Assembly</span> {/* Added text-slate-500 for lighter color, adjust as needed */}
</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href} className="hover:text-slate-900">
                {link.label}
              </a>
            ))}
          </nav>
          
          {/* Mobile Menu Button & CTA */}
          <div className="flex items-center gap-3">
            <a
              href="#cta"
              className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-3.5 py-1.5 text-sm font-semibold shadow-sm hover:shadow transition"
            >
              Book a call
            </a>
            
            {/* Hamburger Button (Visible on Mobile/Tablet) */}
            <button 
              onClick={toggleMenu} 
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                // Close Icon (X)
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Menu Icon (Hamburger)
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown (Visible when isMenuOpen is true) */}
        {isMenuOpen && (
          <MotionDiv
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-slate-200 shadow-md absolute w-full z-30"
          >
            <nav className="flex flex-col p-4 space-y-2 text-base">
              {NAV_LINKS.map(link => (
                <a 
                  key={link.href} 
                  href={link.href} 
                  onClick={handleLinkClick} // Close menu on click
                  className="py-2 px-3 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition"
                >
                  {link.label}
                  </a>
              ))}
            </nav>
          </MotionDiv>
        )}
      </header>

      {/* HERO (Static content - must be fast) */}
      <section className="relative">
        <div className="absolute inset-0 -z-10" aria-hidden>
          <div
            className="h-[520px] w-full"
            style={{
              background: `radial-gradient(1200px 520px at 20% -20%, ${PALETTE.teal}20, transparent), radial-gradient(1200px 520px at 80% 0%, ${PALETTE.gold}22, transparent)`
            }}
          />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          <MotionDiv
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <Pill>YOUR GROWTH & MARKETING HEALTH CHECK</Pill>
            <h1 className="mt-6 text-4xl sm:text-6xl font-black tracking-tight leading-[1.05] text-slate-900">
              Isolate Your Core Marketing Constraints.{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(90deg, ${PALETTE.teal}, ${PALETTE.gold})` }}
              >
                Deploy Your Optimized Operating Model.
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-700 max-w-3xl">
              A structured diagnostic engagement that delivers objective, data-backed ratings across 16 critical Marketing and Growth capabilities and a precise roadmap to maximize budget efficiency and marginal ROI.
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* CONDENSED INTRO (Static content - must be fast) */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative">
            <div className="absolute -top-6 -left-2 text-5xl text-slate-200 select-none" aria-hidden>
              "
            </div>
            <p className="text-left text-2xl sm:text-3xl font-semibold text-slate-700 leading-relaxed tracking-tight">
              We’re a network of senior growth and marketing operators who plug into your business for short,
              high‑impact sprints. We assemble the right experts, diagnose precisely, and deliver measurable outcomes —
              fast. Structured like a consultancy, operated like a startup.
            </p>
            <span className="mt-6 inline-block text-xs font-medium tracking-[0.24em] uppercase text-slate-400">
              Growth and Marketing Experience from:
            </span>
            <div className="mt-6 flex flex-wrap items-center gap-6 md:gap-10">
              {EXPERIENCE_LOGOS.map((logo) => (
                <div key={logo.alt} className="flex items-center justify-center">
                  <img
                    src={logo.src}
                    alt={`${logo.alt} logo`}
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/100x40/f1f5f9/94a3b8?text=Logo"; }}
                    className="h-6 sm:h-7 md:h-7 w-auto object-contain opacity-80" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CHALLENGE (Standard content) */}
      <section id="challenge" className="py-20 bg-[#F8FAFC]">
        <SectionTitle
          overlineBgClass={PROMINENT_OVERLINE_CLASS}
          overline="Identifying High-Value Levers"
          title="Precision growth requires rigorous, practitioner-led strategy"
          kicker="We define the highest-leverage growth opportunities—and quantify precisely where the next dollar delivers maximum marginal ROI."
        />
       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 grid md:grid-cols-3 gap-6 items-stretch">
          {OPPORTUNITY_CARDS.map((o,l)=>{
            const accent = CARD_ACCENTS[l];
            return (
              <MotionDiv
                key={l}
                variants={fadeIn}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: l * 0.1 }}
                className="h-full"
              >
                <div className="relative rounded-xl overflow-hidden bg-white shadow-md transition hover:shadow-lg h-full">
                    {/* ACCENT LINE at the top (The colored bar) */}
                    <div className={`absolute top-0 left-0 w-full h-2 ${accent.line}`}></div> 
                    
                    <div className="p-6 pt-8 h-full">
                        {/* Stylized Opportunity Text */}
                        <div className={`text-sm font-extrabold ${accent.text} uppercase tracking-widest`}>
                            Opportunity {l + 1}
                        </div>
                        
                        {/* Title (Larger font, bold) */}
                        <h3 className="mt-2 text-2xl font-bold text-slate-900">
                            {o.title}
                        </h3>
                        
                        {/* Copy (with strong tag retained) */}
                        <p className="mt-3 text-slate-700" dangerouslySetInnerHTML={{ __html: o.copy }} />
                    </div>
                </div>
              </MotionDiv>
            )
          })}
        </div>
      </section>

      {/* BLUEPRINT (Standard content) */}
      <section id="blueprint" className="py-20 bg-white border-y border-slate-200">
        <SectionTitle
          overlineBgClass={PROMINENT_OVERLINE_CLASS}
          overline="Our Blueprint"
          title="The Growth Assembly Blueprint"
          kicker="A single 8–10 week diagnostic & strategy sprint engineered for predictable outcomes."
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              phase: "Assess",
              weeks: "Weeks 1–2",
              desc: "Rapid data transfer, stakeholder alignment, current‑state score‑carding. Initiates the Opportunity Map.",
            },
            {
              phase: "Diagnose",
              weeks: "Weeks 3–4",
              desc: "Pinpoint the single largest constraint and validate financial impact (CAC/CLV modeling).",
            },
            {
              phase: "Optimize",
              weeks: "Weeks 5–8",
              desc: "Design the optimal solution (the Blueprint) and prioritize high‑leverage actions; sets up Test & Learn loops.",
            },
            {
              phase: "Plan",
              weeks: "Weeks 9–10",
              desc: "Finalize roadmap, quantify ROI, and secure executive buy‑in. Establish change management & execution cadence.",
            },
          ].map((p, i) => (
            <MotionDiv
              key={i}
              variants={fadeIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full">
                <div className="text-xs uppercase tracking-wider text-slate-500">{p.weeks}</div>
                <h3
                  className="mt-2 text-2xl font-extrabold"
                  style={{ color: i % 2 === 0 ? PALETTE.teal : PALETTE.gold }}
                >
                  {p.phase}
                </h3>
                <p className="mt-3 text-slate-700">{p.desc}</p>
              </Card>
            </MotionDiv>
          ))}
        </div>
      </section>

      {/* SCORECARD (Lazy Loaded - First section that typically goes below the fold) */}
      <LazyLoadSection id="scorecard">
        <SectionTitle
          overlineBgClass={PROMINENT_OVERLINE_CLASS}
          overline="Diagnosis & Quantification"
          title="The Growth OS Scorecard"
          kicker="Objective, data‑backed ratings across 16 critical capabilities, pinpointing systemic risks and immediate corrective actions."
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {scorecard.map((col, i) => (
            <Card key={i} className="p-6">
              <h4 className="text-lg font-bold text-slate-900">{col.pillar}</h4>
              <div className="mt-4 space-y-3">
                {col.items.map((it, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between gap-4 p-3 rounded-xl border border-slate-200 bg-white"
                  >
                    <span className="text-slate-700">{it.label}</span>
                    <Badge status={it.status} />
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </LazyLoadSection>

      {/* COMBINED DELIVERABLES / QUANTIFIED PROOF (Lazy Loaded) */}
      <LazyLoadSection 
          id="deliverables" 
          className="relative border-y border-slate-200 overflow-hidden" // Removed bg-white
      >
        {/* BACKGROUND GRADIENT LAYER (REPLICATED FROM HERO SECTION) */}
        <div className="absolute inset-0 -z-10" aria-hidden>
          <div
            className="h-full w-full"
            style={{
              // Replicating the Hero's exact background gradient style
              background: `radial-gradient(1200px 520px at 20% -20%, ${PALETTE.teal}20, transparent), radial-gradient(1200px 520px at 80% 0%, ${PALETTE.gold}22, transparent)`
            }}
          />
        </div>
        
        {/* Original Content Wrapper */}
        <SectionTitle
          overlineBgClass={PROMINENT_OVERLINE_CLASS}
          overline="Final Assembly"
          title="Your Blueprint for Quantified Growth & Action"
        />
        <DeliverablesSectionContent />
      </LazyLoadSection>

      {/* TEAM (Lazy Loaded) */}
      <LazyLoadSection id="team">
        <SectionTitle
          overlineBgClass={PROMINENT_OVERLINE_CLASS}
          overline="Specialized Practitioners"
          title="The Assembly Team"
        />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-12 space-y-8">
          
          <div className="relative max-w-4xl mx-auto px-6 pt-4 pb-4">
            <div className="absolute -top-1 -left-0 sm:left-4 text-5xl text-slate-300/80 select-none" aria-hidden>
              "
            </div>
            <p className="text-center text-xl sm:text-2xl font-semibold text-slate-700 leading-relaxed tracking-tight">
              {TEAM_OVERVIEW}
            </p>
          </div>

          {/* Founders Row */}
          <Card className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              
              {/* Nabil Haschemie Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4">
                    <PhotoAvatar name="Nabil Haschemie" src={NABIL_PHOTO_URL} size={64} />
                    <div>
                      <div className="text-xs uppercase tracking-wider text-slate-500">
                        Co‑founder & Senior Growth Operator
                      </div>
                      <div className="mt-0.5 text-xl font-extrabold text-teal-600">Nabil Haschemie</div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-700">{NABIL_BIO}</p>
                </div>
                
                {/* LinkedIn Link for Nabil */}
                <div className="mt-4 flex justify-end">
                  <a 
                    href="#"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center h-8 px-2 rounded-lg bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition"
                    title={`Connect with Nabil on LinkedIn`}
                  >
                    <img 
                      src={LINKEDIN_ICON_URL}
                      alt="LinkedIn Icon"
                      className="h-4 object-contain w-auto" 
                      onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/20x20/c1c7d0/334155?text=LI"; }}
                    />
                  </a>
                </div>
              </div>

              {/* Daniel Besquin Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4">
                    <PhotoAvatar name="Daniel Besquin" src={DANIEL_PHOTO_URL} size={64} />
                    <div>
                      <div className="text-xs uppercase tracking-wider text-slate-500">
                        Co‑founder & Senior Growth Operator
                      </div>
                      <div className="mt-0.5 text-xl font-extrabold text-amber-600">Daniel Besquin</div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-700">{DANIEL_BIO}</p>
                </div>

                {/* LinkedIn Link for Daniel */}
                <div className="mt-4 flex justify-end">
                  <a 
                    href="#"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center h-8 px-2 rounded-lg bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition"
                    title={`Connect with Daniel on LinkedIn`}
                  >
                    <img 
                      src={LINKEDIN_ICON_URL}
                      alt="LinkedIn Icon"
                      className="h-4 object-contain w-auto" 
                      onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/20x20/c1c7d0/334155?text=LI"; }} 
                    />
                  </a>
                </div>
              </div>
            </div>
          </Card>

          {/* SME Network */}
          <div className="text-center">
            <div className="tracking-widest uppercase text-xs font-semibold text-slate-500">Specialist Network</div>
            <h4 className="mt-1 text-2xl font-extrabold">Subject Matter Experts (As‑Needed)</h4>
            <p className="mt-2 text-slate-600 text-sm max-w-3xl mx-auto">
              SMEs plug in for depth and speed across data, media, lifecycle, and technology.
            </p>
          </div>

          {/* SME Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {SMES.map((m, i) => (
              <Card key={i} className="p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-start gap-4">
                    <Avatar name={m.name} size={56} gradient={m.gradient} />
                    <div>
                      <div className="text-base font-bold text-slate-900">{m.name}</div>
                      <div className="text-xs uppercase tracking-wider text-slate-500">{m.title}</div>
                      <p className="mt-2 text-sm text-slate-700">{m.expertise}</p>
                    </div>
                  </div>
                </div>
                
                {/* LinkedIn Link for SME */}
                <div className="mt-4 flex justify-end">
                  <a 
                    href={m.linkedin}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center h-8 px-2 rounded-lg bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition"
                    title={`Connect with ${m.name} on LinkedIn`}
                  >
                    <img 
                      src={LINKEDIN_ICON_URL}
                      alt="LinkedIn Icon"
                      className="h-4 object-contain w-auto" 
                      onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/20x20/c1c7d0/334155?text=LI"; }} 
                    />
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </LazyLoadSection>

    
      {/* CTA (Lazy Loaded) */}
      <LazyLoadSection id="cta" className="py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card className="p-8 text-center">
            <h3 className="text-3xl sm:text-4xl font-extrabold">Ready to De‑Risk Your Next Investment?</h3>
            <p className="mt-3 text-slate-700">
              30‑minute scoping session to validate fit, discuss required data access, and confirm the 48‑Hour Kick‑Off
              timeline.
            </p>
            <a
              href="#"
              className="mt-6 inline-flex items-center rounded-2xl bg-slate-900 text-white px-6 py-3 text-base font-semibold shadow hover:opacity-90 transition"
            >
              Book a Free Initiation Call
            </a>
          </Card>
        </div>
      </LazyLoadSection>

      {/* FOOTER */}
      <footer className="py-10 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
           <img
  src={LOGO_SA_URL} // <-- Uses the new constant
  alt="Sprint Assembly SA Logo"
  className="h-8 w-8 object-contain" // Ensures the logo scales correctly
/>
            <span className="font-semibold">Sprint Assembly</span>
          </div>
          <div className="text-sm text-slate-500">
            © {new Date().getFullYear()} Sprint Assembly. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Render the application
export default App;
