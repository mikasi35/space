import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  ivory:     "#F8F5EF",
  white:     "#FFFFFF",
  navy:      "#0E1523",
  navyMid:   "#16213A",
  navyLight: "#1E2D4D",
  gold:      "#C9A84C",
  goldLight: "#E2C47A",
  goldDim:   "#A0803A",
  slate:     "#4A5568",
  mist:      "#8896A8",
  display: `'Cormorant Garamond', 'Playfair Display', Georgia, serif`,
  sans:    `'DM Sans', 'Outfit', system-ui, sans-serif`,
  mono:    `'DM Mono', 'Fira Code', monospace`,
};

const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap";

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const Icon = {
  arrowRight: ({ size = 13, color = "currentColor", sw = 2.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
  ),
  arrowLeft: ({ size = 14, color = "currentColor", sw = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M5 12l7 7M5 12l7-7"/></svg>
  ),
  check: ({ size = 12, color = "currentColor", sw = 2.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
  ),
  close: ({ size = 14, color = "currentColor", sw = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  ),
  download: ({ size = 16, color = "currentColor", sw = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
  ),
  shield: ({ size = 20, color = "currentColor", sw = 1.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  ),
  trendUp: ({ size = 20, color = "currentColor", sw = 1.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
  ),
  building: ({ size = 20, color = "currentColor", sw = 1.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>
  ),
  handshake: ({ size = 20, color = "currentColor", sw = 1.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>
  ),
  barChart: ({ size = 20, color = "currentColor", sw = 1.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
  ),
  map: ({ size = 20, color = "currentColor", sw = 1.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
  ),
  lock: ({ size = 14, color = "currentColor", sw = 1.8 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
  ),
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const WHY_INVEST = [
  {
    num: "01",
    title: "Proven Track Record",
    body: "KSh 4.2B+ in completed infrastructure over 10 years. 98% on-time delivery. 47+ projects across roads, buildings, water, and energy.",
    stat: { value: "KSh 4.2B+", label: "Delivered" },
    color: T.gold,
    Icon: Icon.trendUp,
  },
  {
    num: "02",
    title: "Government-Backed Pipeline",
    body: "A substantial portion of our project pipeline is government-contracted — providing payment certainty and low counterparty risk that institutional investors require.",
    stat: { value: "70%+", label: "Govt Pipeline" },
    color: "#6CA8C9",
    Icon: Icon.shield,
  },
  {
    num: "03",
    title: "Organic, Debt-Free Growth",
    body: "Spacemine has grown entirely through reinvested earnings — no external debt, no equity dilution. A lean balance sheet means stronger returns for partners.",
    stat: { value: "Zero", label: "External Debt" },
    color: "#A8C96C",
    Icon: Icon.building,
  },
  {
    num: "04",
    title: "ISO-Aligned Risk Management",
    body: "Best-practice risk methodologies filtering through all processes. Highly skilled teams build detailed project plans before any spade hits the ground.",
    stat: { value: "100%", label: "ISO Aligned" },
    color: "#C96C8A",
    Icon: Icon.handshake,
  },
];

const ROI_MODEL = [
  {
    type: "Government Infrastructure",
    description: "Fixed-price contracts with Government of Kenya, county governments, and parastatals. Payment guaranteed on milestone completion.",
    riskLevel: "Low",
    roiRange: "12–18%",
    duration: "12–24 months",
    minTicket: "KSh 50M",
    color: "#6CA8C9",
    highlights: [
      "Sovereign payment guarantee",
      "Performance bonds required",
      "Kenya Roads Board / county frameworks",
      "Repeat contract relationships",
    ],
  },
  {
    type: "Private Development JV",
    description: "Joint ventures on commercial, residential, and mixed-use developments. Spacemine contributes construction expertise; partner contributes land or capital.",
    riskLevel: "Medium",
    roiRange: "18–28%",
    duration: "18–36 months",
    minTicket: "KSh 100M",
    color: T.gold,
    highlights: [
      "Co-investment structure",
      "Spacemine as build partner",
      "Revenue sharing on completion",
      "Market-rate development returns",
    ],
  },
  {
    type: "Infrastructure Fund Partnership",
    description: "Strategic partnerships with development banks, NGOs, and infrastructure funds. Spacemine executes; partners provide DFI-sourced capital.",
    riskLevel: "Low–Medium",
    roiRange: "10–15%",
    duration: "24–48 months",
    minTicket: "KSh 200M",
    color: "#A8C96C",
    highlights: [
      "DFI / AfDB eligible projects",
      "Social impact reporting",
      "Long-term programme frameworks",
      "Blended finance structures",
    ],
  },
];

const PIPELINE = [
  { id: 1, name: "Lamu Port Access Road — Phase 2",     sector: "Road Infrastructure",    value: "KSh 2.1B", stage: "Tendering",              govBody: "Kenya Ports Authority",             alignment: "LAPSSET Corridor Programme",              year: "2025", color: T.gold },
  { id: 2, name: "Turkana County Water Distribution",   sector: "Water Works",            value: "KSh 890M", stage: "Pre-qualification",      govBody: "Nat'l Water Harvesting Authority",  alignment: "Kenya Water Security Programme",          year: "2025", color: "#6CA8C9" },
  { id: 3, name: "Kisumu Solar Farm — 5MWp",            sector: "Electrical Works",       value: "KSh 640M", stage: "Design Phase",           govBody: "Kenya Power / KETRACO",            alignment: "Kenya Electricity Expansion Programme",   year: "2025", color: T.goldLight },
  { id: 4, name: "Mombasa County Civic Centre",         sector: "Building Construction",  value: "KSh 1.4B", stage: "Feasibility",            govBody: "Mombasa County Government",        alignment: "County Development Plan 2023–2027",       year: "2026", color: "#A8C96C" },
  { id: 5, name: "Northern Corridor Road Upgrade",      sector: "Road Infrastructure",    value: "KSh 3.2B", stage: "Expression of Interest", govBody: "Kenya National Highways Authority", alignment: "Vision 2030 Infrastructure Pillar",       year: "2026", color: "#C96C8A" },
];

const STAGE_STYLE = {
  "Tendering":               { bg: `${T.gold}18`,      text: T.gold },
  "Pre-qualification":       { bg: "#6CA8C918",        text: "#6CA8C9" },
  "Design Phase":            { bg: `${T.goldLight}22`, text: T.goldDim },
  "Feasibility":             { bg: "#A8C96C18",        text: "#6B9440" },
  "Expression of Interest":  { bg: "#C96C8A18",        text: "#C96C8A" },
};

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── Shared: SectionLabel ─────────────────────────────────────────────────────
function SectionLabel({ color = T.gold, children, centered = false }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: centered ? 10 : 10, marginBottom: 18, ...(centered ? { justifyContent: "center" } : {}) }}>
      <div style={{ width: 24, height: 1, background: `linear-gradient(${centered ? "270deg" : "90deg"}, ${color}, transparent)` }} />
      <span style={{ fontFamily: T.mono, fontSize: 9, fontWeight: 500, color, letterSpacing: "0.24em", textTransform: "uppercase" }}>{children}</span>
      {centered && <div style={{ width: 24, height: 1, background: `linear-gradient(90deg, ${color}, transparent)` }} />}
    </div>
  );
}

// ─── Shared: PrimaryButton ────────────────────────────────────────────────────
function PrimaryButton({ onClick, href, children, color = T.gold, style: extraStyle = {} }) {
  const [hov, setHov] = useState(false);
  const base = {
    display: "inline-flex", alignItems: "center", gap: 10,
    background: hov ? T.goldLight : color,
    color: T.navy, border: "none", borderRadius: 2,
    padding: "14px 28px", cursor: "pointer",
    fontFamily: T.sans, fontSize: 12, fontWeight: 700,
    letterSpacing: "0.12em", textTransform: "uppercase",
    textDecoration: "none",
    transition: "background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
    transform: hov ? "translateY(-2px)" : "none",
    boxShadow: hov ? `0 12px 36px rgba(201,168,76,0.3)` : `0 4px 16px rgba(201,168,76,0.18)`,
    ...extraStyle,
  };
  if (href) return <Link to={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={base}>{children}</Link>;
  return <button type="button" onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={base}>{children}</button>;
}

// ─── NDA Inquiry Form ─────────────────────────────────────────────────────────
function InquiryForm({ onClose }) {
  const [form, setForm] = useState({ name: "", org: "", email: "", type: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const firstInputRef = useRef(null);

  const set = useCallback((k, v) => setForm(p => ({ ...p, [k]: v })), []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    firstInputRef.current?.focus();
    const fn = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", fn); };
  }, [onClose]);

  const fieldStyle = {
    width: "100%", padding: "11px 14px",
    border: `1px solid rgba(14,21,35,0.12)`, borderRadius: 2,
    fontFamily: T.sans, fontSize: 14, color: T.navy,
    background: T.ivory, outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
  };
  const labelStyle = {
    display: "block", fontFamily: T.mono, fontSize: 9, fontWeight: 500,
    color: T.mist, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 7,
  };

  const onFocus = e => { e.target.style.borderColor = T.gold; e.target.style.boxShadow = `0 0 0 3px ${T.gold}18`; };
  const onBlur  = e => { e.target.style.borderColor = "rgba(14,21,35,0.12)"; e.target.style.boxShadow = "none"; };

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(12px,3vw,24px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "rgba(10,13,20,0.88)", backdropFilter: "blur(14px)" }} />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{
          position: "relative", zIndex: 1,
          background: T.white, borderRadius: 2,
          width: "100%", maxWidth: 500,
          maxHeight: "90vh", overflowY: "auto",
          boxShadow: "0 56px 140px rgba(0,0,0,0.5)",
          animation: "modalIn 0.32s cubic-bezier(0.16,1,0.3,1) forwards",
        }}
      >
        {/* Modal header */}
        <div style={{ background: T.navy, padding: "26px 28px 22px", position: "relative" }}>
          <div aria-hidden="true" style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, ${T.gold}, transparent 60%)`,
          }} />
          <button
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              position: "absolute", top: 16, right: 16,
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "50%", width: 34, height: 34,
              color: T.white, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <Icon.close size={14} color={T.white} />
          </button>
          <SectionLabel color={T.gold}>Investor Inquiry</SectionLabel>
          <h3 id="modal-title" style={{
            fontFamily: T.display, fontSize: 24, fontWeight: 700,
            color: T.white, letterSpacing: "-0.02em", margin: "0 0 8px",
          }}>Request Investor Deck</h3>
          <p style={{ fontFamily: T.sans, fontSize: 12, color: "rgba(255,255,255,0.38)", lineHeight: 1.7, margin: 0, fontWeight: 300 }}>
            All inquiries are treated with strict confidentiality. An NDA can be provided on request.
          </p>
        </div>

        {/* Form body */}
        {!submitted ? (
          <div style={{ padding: "26px 28px 30px", display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Name */}
            <div>
              <label htmlFor="inv-name" style={labelStyle}>Full Name</label>
              <input
                ref={firstInputRef}
                id="inv-name" type="text" required
                placeholder="Your full name"
                value={form.name}
                onChange={e => set("name", e.target.value)}
                style={fieldStyle}
                onFocus={onFocus} onBlur={onBlur}
              />
            </div>
            {/* Organisation */}
            <div>
              <label htmlFor="inv-org" style={labelStyle}>Organisation</label>
              <input
                id="inv-org" type="text" required
                placeholder="Company / Fund / Institution"
                value={form.org}
                onChange={e => set("org", e.target.value)}
                style={fieldStyle}
                onFocus={onFocus} onBlur={onBlur}
              />
            </div>
            {/* Email */}
            <div>
              <label htmlFor="inv-email" style={labelStyle}>Email Address</label>
              <input
                id="inv-email" type="email" required
                placeholder="your@email.com"
                value={form.email}
                onChange={e => set("email", e.target.value)}
                style={fieldStyle}
                onFocus={onFocus} onBlur={onBlur}
              />
            </div>
            {/* Type */}
            <div>
              <label htmlFor="inv-type" style={labelStyle}>Partnership Type</label>
              <select
                id="inv-type"
                value={form.type}
                onChange={e => set("type", e.target.value)}
                style={{ ...fieldStyle, appearance: "none", cursor: "pointer" }}
                onFocus={onFocus} onBlur={onBlur}
              >
                <option value="">Select type…</option>
                <option>Government Infrastructure</option>
                <option>Private Development JV</option>
                <option>Infrastructure Fund Partnership</option>
                <option>General Inquiry</option>
              </select>
            </div>
            {/* Message */}
            <div>
              <label htmlFor="inv-msg" style={labelStyle}>Message <span style={{ fontWeight: 300, opacity: 0.6 }}>(optional)</span></label>
              <textarea
                id="inv-msg" rows={3}
                placeholder="Brief description of your interest or any specific projects…"
                value={form.message}
                onChange={e => set("message", e.target.value)}
                style={{ ...fieldStyle, resize: "vertical", minHeight: 88 }}
                onFocus={onFocus} onBlur={onBlur}
              />
            </div>
            {/* Submit */}
            <button
              type="button"
              onClick={e => { e.preventDefault(); setSubmitted(true); }}
              style={{
                background: T.gold, color: T.navy, border: "none", borderRadius: 2,
                padding: "14px 0", fontFamily: T.sans, fontSize: 12, fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer",
                transition: "background 0.22s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.background = T.goldLight}
              onMouseLeave={e => e.currentTarget.style.background = T.gold}
            >
              Send Inquiry
            </button>
            {/* Confidentiality note */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
              <Icon.lock size={12} color={T.mist} />
              <span style={{ fontFamily: T.mono, fontSize: 9, color: T.mist, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Confidential · NDA on request · 24hr response
              </span>
            </div>
          </div>
        ) : (
          <div style={{ padding: "48px 28px", textAlign: "center" }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              background: T.gold + "18",
              border: `1px solid ${T.gold}50`,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 22px",
            }}>
              <Icon.check size={22} color={T.gold} sw={2.5} />
            </div>
            <h3 style={{ fontFamily: T.display, fontSize: 24, fontWeight: 700, color: T.navy, marginBottom: 12, letterSpacing: "-0.01em" }}>
              Inquiry Received
            </h3>
            <p style={{ fontFamily: T.sans, fontSize: 14, color: T.slate, lineHeight: 1.75, marginBottom: 28, fontWeight: 300 }}>
              Thank you. Our partnerships team will be in touch within 24 hours with the investor deck and next steps.
            </p>
            <button
              onClick={onClose}
              style={{
                background: T.gold, color: T.navy, border: "none", borderRadius: 2,
                padding: "12px 28px", fontFamily: T.sans, fontSize: 12,
                fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
              }}
            >Close</button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(16px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─── Section: Why Invest ──────────────────────────────────────────────────────
function WhyInvest({ onInquire }) {
  const [ref, visible] = useInView(0.08);

  return (
    <section ref={ref} aria-labelledby="why-heading" style={{
      background: T.ivory,
      padding: "clamp(64px,8vw,112px) clamp(16px,3vw,32px)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="why-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "clamp(40px,6vw,80px)", alignItems: "start",
        }}>
          {/* Left column */}
          <div style={{
            opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}>
            <SectionLabel>Why Partner With Us</SectionLabel>
            <h2 id="why-heading" style={{
              fontFamily: T.display,
              fontSize: "clamp(28px,3.5vw,48px)",
              fontWeight: 600, color: T.navy,
              letterSpacing: "-0.025em", lineHeight: 1.06, marginBottom: 22,
            }}>
              Kenya's Infrastructure Gap<br />
              Is Your <em style={{ color: T.goldLight, fontStyle: "italic" }}>Biggest Opportunity</em>
            </h2>
            <p style={{ fontFamily: T.sans, fontSize: "clamp(13px,1.3vw,15px)", color: T.slate, lineHeight: 1.82, marginBottom: 16, fontWeight: 300 }}>
              Kenya requires an estimated KSh 3.6 trillion in infrastructure investment through 2030 — roads, water, energy, and buildings. Spacemine is positioned at the centre of that demand, with an established pipeline, proven delivery systems, and government relationships that take years to build.
            </p>
            <p style={{ fontFamily: T.sans, fontSize: "clamp(13px,1.3vw,15px)", color: T.slate, lineHeight: 1.82, marginBottom: 36, fontWeight: 300 }}>
              Partnering with Spacemine gives you direct access to a project pipeline that is either government-contracted or government-aligned — the closest thing to guaranteed infrastructure demand in East Africa.
            </p>
            <PrimaryButton onClick={onInquire}>
              Request Investor Deck
              <Icon.arrowRight size={12} color={T.navy} />
            </PrimaryButton>
          </div>

          {/* Right column: reason cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {WHY_INVEST.map((item, i) => {
              const CatIcon = item.Icon;
              return (
                <div key={item.num} style={{
                  display: "flex", gap: 0, alignItems: "stretch",
                  background: T.white,
                  border: `1px solid rgba(14,21,35,0.07)`,
                  borderLeft: `2px solid ${item.color}`,
                  borderRadius: 2,
                  overflow: "hidden",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateX(16px)",
                  transition: `opacity 0.5s ease ${0.12 + i * 0.09}s, transform 0.5s ease ${0.12 + i * 0.09}s`,
                }}>
                  {/* Stat block */}
                  <div style={{
                    flexShrink: 0, width: 76,
                    background: item.color + "0C",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    padding: "16px 10px", gap: 4,
                    borderRight: `1px solid rgba(14,21,35,0.06)`,
                  }}>
                    <CatIcon size={16} color={item.color} sw={1.6} />
                    <div style={{ fontFamily: T.display, fontSize: "clamp(14px,1.4vw,17px)", fontWeight: 700, color: item.color, lineHeight: 1, textAlign: "center", marginTop: 6 }}>{item.stat.value}</div>
                    <div style={{ fontFamily: T.mono, fontSize: 8, color: T.mist, letterSpacing: "0.1em", textTransform: "uppercase", textAlign: "center", lineHeight: 1.3 }}>{item.stat.label}</div>
                  </div>
                  {/* Text block */}
                  <div style={{ padding: "16px 18px", flex: 1 }}>
                    <div style={{ fontFamily: T.display, fontSize: 16, fontWeight: 600, color: T.navy, marginBottom: 6, letterSpacing: "-0.01em" }}>{item.title}</div>
                    <p style={{ fontFamily: T.sans, fontSize: 12, color: T.slate, lineHeight: 1.7, margin: 0, fontWeight: 300 }}>{item.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: ROI Model ───────────────────────────────────────────────────────
function ROISection({ onInquire }) {
  const [ref, visible] = useInView(0.06);
  const [active, setActive] = useState(0);
  const model = ROI_MODEL[active];

  return (
    <section
      ref={ref}
      aria-labelledby="roi-heading"
      style={{ background: T.navy, padding: "clamp(64px,8vw,112px) clamp(16px,3vw,32px)", position: "relative", overflow: "hidden" }}
    >
      {/* Grid texture */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: [
          `linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px)`,
          `linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)`,
        ].join(","),
        backgroundSize: "56px 56px",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{
          textAlign: "center", marginBottom: "clamp(36px,4vw,56px)",
          opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}>
          <SectionLabel color={T.gold} centered>Investment Structures</SectionLabel>
          <h2 id="roi-heading" style={{
            fontFamily: T.display,
            fontSize: "clamp(28px,3.5vw,52px)",
            fontWeight: 600, color: T.white,
            letterSpacing: "-0.025em", lineHeight: 1.05,
          }}>
            How the <em style={{ color: T.goldLight, fontStyle: "italic" }}>ROI Model</em> Works
          </h2>
          <p style={{
            fontFamily: T.sans, fontSize: "clamp(13px,1.3vw,15px)",
            color: "rgba(255,255,255,0.35)", marginTop: 14,
            maxWidth: 480, margin: "14px auto 0", lineHeight: 1.8, fontWeight: 300,
          }}>
            Three structures, calibrated to different risk appetites and capital scales. All figures indicative — specific terms agreed during due diligence.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: 2, flexWrap: "wrap", justifyContent: "center" }}>
          {ROI_MODEL.map((m, i) => {
            const isActive = i === active;
            return (
              <button
                key={m.type}
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                style={{
                  fontFamily: T.sans, fontSize: 11, fontWeight: isActive ? 600 : 400,
                  color: isActive ? m.color : "rgba(255,255,255,0.35)",
                  background: isActive ? "rgba(255,255,255,0.06)" : "transparent",
                  border: `1px solid ${isActive ? m.color + "50" : "rgba(255,255,255,0.08)"}`,
                  borderBottom: isActive ? `1px solid ${isActive ? "rgba(255,255,255,0.06)" : "transparent"}` : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "2px 2px 0 0",
                  padding: "10px 20px", cursor: "pointer",
                  transition: "all 0.2s", letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  position: "relative",
                  marginBottom: isActive ? -1 : 0,
                  zIndex: isActive ? 2 : 1,
                }}
              >{m.type}</button>
            );
          })}
        </div>

        {/* Model card */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${model.color}35`,
          borderTop: `2px solid ${model.color}`,
          borderRadius: "0 2px 2px 2px",
          padding: "clamp(28px,4vw,52px)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.5s ease 0.15s",
        }}
        className="roi-grid"
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(28px,4vw,56px)", alignItems: "start" }}>
            {/* Left */}
            <div>
              <div style={{ fontFamily: T.mono, fontSize: 9, fontWeight: 500, color: model.color, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14 }}>{model.type}</div>
              <p style={{ fontFamily: T.sans, fontSize: "clamp(13px,1.3vw,15px)", color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: 28, fontWeight: 300 }}>{model.description}</p>

              {/* Metrics grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, marginBottom: 28 }}>
                {[
                  { l: "Indicative ROI",    v: model.roiRange },
                  { l: "Typical Duration",  v: model.duration },
                  { l: "Min. Ticket Size",  v: model.minTicket },
                  { l: "Risk Profile",      v: model.riskLevel },
                ].map(s => (
                  <div key={s.l} style={{
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid rgba(255,255,255,0.07)`,
                    borderTop: `1px solid ${model.color}30`,
                    borderRadius: 2, padding: "14px 16px",
                  }}>
                    <div style={{ fontFamily: T.mono, fontSize: 8, color: "rgba(255,255,255,0.28)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>{s.l}</div>
                    <div style={{ fontFamily: T.display, fontSize: "clamp(15px,1.6vw,20px)", fontWeight: 700, color: model.color, letterSpacing: "-0.01em" }}>{s.v}</div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={onInquire}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  background: model.color, color: T.navy, border: "none", borderRadius: 2,
                  padding: "12px 22px", fontFamily: T.sans, fontSize: 11,
                  fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                  cursor: "pointer", transition: "opacity 0.22s",
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.82"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                Inquire about this structure
                <Icon.arrowRight size={11} color={T.navy} />
              </button>
            </div>

            {/* Right: highlights */}
            <div>
              <div style={{ fontFamily: T.mono, fontSize: 9, color: "rgba(255,255,255,0.28)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 16 }}>Key Structure Features</div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
                {model.highlights.map(h => (
                  <li key={h} style={{
                    display: "flex", gap: 12, alignItems: "flex-start",
                    padding: "13px 16px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 2,
                  }}>
                    <span style={{
                      width: 20, height: 20, borderRadius: "50%",
                      background: model.color + "18",
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, marginTop: 0,
                    }}>
                      <Icon.check size={10} color={model.color} sw={2.5} />
                    </span>
                    <span style={{ fontFamily: T.sans, fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.55, fontWeight: 300 }}>{h}</span>
                  </li>
                ))}
              </ul>
              {/* Disclaimer */}
              <div style={{
                padding: "14px 16px",
                background: "rgba(255,255,255,0.02)",
                border: `1px solid ${model.color}20`,
                borderLeft: `2px solid ${model.color}40`,
                borderRadius: 2,
              }}>
                <p style={{ fontFamily: T.sans, fontSize: 11, color: "rgba(255,255,255,0.25)", lineHeight: 1.7, margin: 0, fontWeight: 300 }}>
                  <strong style={{ color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>Disclaimer:</strong> All ROI figures are indicative and based on historical project performance. Actual returns are subject to project-specific terms, market conditions, and due diligence outcomes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Pipeline ────────────────────────────────────────────────────────
function PipelineSection({ onInquire }) {
  const [ref, visible] = useInView(0.06);

  return (
    <section
      id="pipeline"
      ref={ref}
      aria-labelledby="pipeline-heading"
      style={{ background: T.ivory, padding: "clamp(64px,8vw,112px) clamp(16px,3vw,32px)" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          gap: 24, flexWrap: "wrap",
          marginBottom: "clamp(36px,4vw,56px)",
          opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}>
          <div>
            <SectionLabel>Government Pipeline</SectionLabel>
            <h2 id="pipeline-heading" style={{
              fontFamily: T.display,
              fontSize: "clamp(28px,3.5vw,48px)",
              fontWeight: 600, color: T.navy,
              letterSpacing: "-0.025em", lineHeight: 1.06, margin: 0,
            }}>
              <em style={{ fontStyle: "italic", color: T.gold }}>KSh 8.2B+</em> in Active Pipeline
            </h2>
          </div>
          <p style={{
            fontFamily: T.sans, fontSize: "clamp(13px,1.3vw,15px)",
            color: T.slate, maxWidth: 340, lineHeight: 1.8, margin: 0, fontWeight: 300,
          }}>
            Government-aligned projects across road infrastructure, water, energy, and buildings — at various stages of procurement.
          </p>
        </div>

        {/* Table */}
        <div style={{
          border: `1px solid rgba(14,21,35,0.08)`,
          borderRadius: 2, overflow: "hidden", marginBottom: 28,
          boxShadow: "0 4px 24px rgba(14,21,35,0.06)",
        }}>
          {/* Head */}
          <div style={{
            display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.4fr 1fr",
            background: T.navy, padding: "13px 22px",
          }} className="pipeline-row">
            {["Project", "Sector", "Est. Value", "Government Body", "Stage"].map(h => (
              <div key={h} style={{
                fontFamily: T.mono, fontSize: 8, fontWeight: 500,
                color: "rgba(255,255,255,0.35)", letterSpacing: "0.16em", textTransform: "uppercase",
              }}>{h}</div>
            ))}
          </div>

          {/* Rows */}
          {PIPELINE.map((p, i) => (
            <div key={p.id} style={{
              display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.4fr 1fr",
              padding: "18px 22px",
              borderBottom: i < PIPELINE.length - 1 ? `1px solid rgba(14,21,35,0.06)` : "none",
              alignItems: "center",
              background: T.white,
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateX(-10px)",
              transition: `opacity 0.5s ease ${0.1 + i * 0.07}s, transform 0.5s ease ${0.1 + i * 0.07}s`,
            }}
            className="pipeline-row"
            >
              <div>
                <div style={{ fontFamily: T.display, fontSize: 15, fontWeight: 600, color: T.navy, letterSpacing: "-0.01em", marginBottom: 3 }}>{p.name}</div>
                <div style={{ fontFamily: T.mono, fontSize: 9, color: T.mist, letterSpacing: "0.06em" }}>{p.alignment}</div>
              </div>
              <div style={{ fontFamily: T.sans, fontSize: 12, color: T.slate, fontWeight: 300 }}>{p.sector}</div>
              <div style={{ fontFamily: T.display, fontSize: 16, fontWeight: 700, color: p.color, letterSpacing: "-0.01em" }}>{p.value}</div>
              <div style={{ fontFamily: T.sans, fontSize: 12, color: T.slate, fontWeight: 300 }}>{p.govBody}</div>
              <div>
                <span style={{
                  fontFamily: T.mono, fontSize: 8, fontWeight: 600,
                  background: STAGE_STYLE[p.stage]?.bg || `${T.gold}14`,
                  color: STAGE_STYLE[p.stage]?.text || T.gold,
                  padding: "5px 10px", borderRadius: 2,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                }}>{p.stage}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer + CTA */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 24, flexWrap: "wrap",
        }}>
          <p style={{ fontFamily: T.sans, fontSize: 12, color: T.mist, maxWidth: 520, lineHeight: 1.7, margin: 0, fontWeight: 300 }}>
            Pipeline details are indicative and subject to procurement outcomes. Full pipeline information with financial projections is available to qualified investors under NDA.
          </p>
          <button
            type="button"
            onClick={onInquire}
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: T.navy, color: T.white, border: "none", borderRadius: 2,
              padding: "13px 22px", flexShrink: 0,
              fontFamily: T.sans, fontSize: 11, fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
              transition: "background 0.22s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.background = T.navyLight}
            onMouseLeave={e => e.currentTarget.style.background = T.navy}
          >
            Request Full Pipeline Brief
            <Icon.arrowRight size={11} color={T.white} />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Deck CTA ────────────────────────────────────────────────────────
function DeckCTA({ onInquire }) {
  const [ref, visible] = useInView(0.15);

  const DECK_CONTENTS = [
    { Icon: Icon.barChart,  label: "Financial Performance", detail: "10-year track record, project margins, revenue history" },
    { Icon: Icon.map,       label: "Project Pipeline",      detail: "Full pipeline with timelines, values, and government alignment" },
    { Icon: Icon.handshake, label: "Investment Structures", detail: "Detailed ROI models and partnership terms by structure" },
  ];

  return (
    <section
      ref={ref}
      aria-labelledby="deck-heading"
      style={{ background: T.navy, padding: "clamp(64px,8vw,100px) clamp(16px,3vw,32px)", position: "relative", overflow: "hidden", textAlign: "center" }}
    >
      {/* Hatching */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `repeating-linear-gradient(-45deg, rgba(201,168,76,0.025) 0, rgba(201,168,76,0.025) 1px, transparent 1px, transparent 18px)`,
      }} />
      {/* Corner accents */}
      {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h]) => (
        <div key={v+h} aria-hidden="true" style={{
          position: "absolute", [v]: 28, [h]: 28, width: 22, height: 22,
          borderColor: "rgba(201,168,76,0.22)", borderStyle: "solid",
          borderWidth: v==="top"&&h==="left"?"2px 0 0 2px":v==="top"&&h==="right"?"2px 2px 0 0":v==="bottom"&&h==="left"?"0 0 2px 2px":"0 2px 2px 0",
        }} />
      ))}

      <div style={{
        maxWidth: 680, margin: "0 auto", position: "relative", zIndex: 1,
        opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}>
        <SectionLabel color={T.gold} centered>Investor Deck</SectionLabel>
        <h2 id="deck-heading" style={{
          fontFamily: T.display,
          fontSize: "clamp(32px,4.5vw,56px)",
          fontWeight: 600, color: T.white,
          letterSpacing: "-0.025em", lineHeight: 1.05, marginBottom: 18,
        }}>
          See the Full Picture.<br />
          <em style={{ color: T.goldLight, fontStyle: "italic" }}>Download the Investor Deck.</em>
        </h2>
        <p style={{
          fontFamily: T.sans, fontSize: "clamp(14px,1.4vw,16px)",
          color: "rgba(255,255,255,0.38)", lineHeight: 1.8, marginBottom: 40,
          maxWidth: 500, margin: "0 auto 40px", fontWeight: 300,
        }}>
          The Spacemine investor deck covers financial performance, pipeline overview, investment structures, governance, and the full case for partnership. Available to qualified investors on request.
        </p>

        {/* Contents grid */}
        <div className="deck-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 40, textAlign: "left" }}>
          {DECK_CONTENTS.map(d => {
            const DeckIcon = d.Icon;
            return (
              <div key={d.label} style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderTop: `2px solid ${T.gold}40`,
                borderRadius: 2, padding: "18px 16px",
              }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 32, height: 32, borderRadius: 6,
                  background: T.gold + "14", marginBottom: 12,
                }}>
                  <DeckIcon size={15} color={T.gold} sw={1.6} />
                </div>
                <div style={{ fontFamily: T.display, fontSize: 15, fontWeight: 600, color: T.white, marginBottom: 6, letterSpacing: "-0.01em" }}>{d.label}</div>
                <p style={{ fontFamily: T.sans, fontSize: 11, color: "rgba(255,255,255,0.32)", lineHeight: 1.65, margin: 0, fontWeight: 300 }}>{d.detail}</p>
              </div>
            );
          })}
        </div>

        <PrimaryButton onClick={onInquire}>
          <Icon.download size={14} color={T.navy} />
          Request the Investor Deck
        </PrimaryButton>
        <div style={{
          display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginTop: 18,
        }}>
          <Icon.lock size={11} color={"rgba(255,255,255,0.2)"} />
          <span style={{ fontFamily: T.mono, fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.16em", textTransform: "uppercase" }}>
            Confidential · NDA on request · 24-hour response
          </span>
        </div>
      </div>
    </section>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ onInquire }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);

  return (
    <header role="banner" style={{
      background: T.navy,
      padding: "clamp(100px,12vw,160px) clamp(16px,3vw,32px) clamp(56px,7vw,96px)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Grid */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: [
          `linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px)`,
          `linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)`,
        ].join(","),
        backgroundSize: "56px 56px",
      }} />
      {/* Hatching */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.012) 0, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 24px)`,
      }} />
      {/* Decorative "I" */}
      <div aria-hidden="true" style={{
        position: "absolute", right: "2vw", top: "50%", transform: "translateY(-50%)",
        fontFamily: T.display, fontSize: "clamp(240px,26vw,380px)",
        fontWeight: 700, color: "rgba(201,168,76,0.04)",
        lineHeight: 1, userSelect: "none", pointerEvents: "none",
        letterSpacing: "-0.04em",
      }}>I</div>
      {/* Gold bottom rule */}
      <div aria-hidden="true" style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, ${T.gold}, transparent 70%)`,
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: 32 }}>
          <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", alignItems: "center", gap: 10 }}>
            <li><Link to="/" style={{ fontFamily: T.mono, fontSize: 10, color: "rgba(255,255,255,0.3)", textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase" }}>Home</Link></li>
            <li aria-hidden="true" style={{ color: T.goldDim, fontSize: 10 }}>›</li>
            <li><span style={{ fontFamily: T.mono, fontSize: 10, color: T.goldLight, letterSpacing: "0.1em", textTransform: "uppercase" }} aria-current="page">Investors</span></li>
          </ol>
        </nav>

        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,6vw,80px)", alignItems: "center" }}>
          {/* Left */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20,
              opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(10px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}>
              <div style={{ width: 32, height: 1, background: T.gold }} />
              <span style={{ fontFamily: T.mono, fontSize: 9, color: T.gold, letterSpacing: "0.26em", textTransform: "uppercase" }}>Investors & Partners</span>
            </div>

            <h1 style={{
              fontFamily: T.display,
              fontSize: "clamp(40px,5.5vw,72px)",
              fontWeight: 600, color: T.white,
              letterSpacing: "-0.03em", lineHeight: 1.0, margin: "0 0 22px",
              opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(22px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}>
              Invest in Kenya's<br />
              <em style={{ color: T.goldLight, fontStyle: "italic" }}>Infrastructure Future</em>
            </h1>

            <p style={{
              fontFamily: T.sans, fontSize: "clamp(14px,1.4vw,16px)",
              color: "rgba(255,255,255,0.42)", lineHeight: 1.82,
              maxWidth: 460, margin: "0 0 36px", fontWeight: 300,
              opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(22px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}>
              Government-contracted pipeline. Proven delivery. Debt-free operations.
              A decade of infrastructure track record — now open to strategic partners and investors.
            </p>

            <div style={{
              display: "flex", gap: 12, flexWrap: "wrap",
              opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(22px)",
              transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
            }}>
              <PrimaryButton onClick={onInquire}>
                Request Investor Deck
                <Icon.arrowRight size={12} color={T.navy} />
              </PrimaryButton>
              <a href="#pipeline" style={{
                display: "inline-flex", alignItems: "center", gap: 9,
                background: "transparent", color: "rgba(255,255,255,0.75)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: 2, padding: "14px 22px",
                fontFamily: T.sans, fontSize: 12, fontWeight: 500,
                textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase",
                transition: "border-color 0.22s, color 0.22s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.gold; e.currentTarget.style.color = T.goldLight; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
              >
                View Pipeline
              </a>
            </div>
          </div>

          {/* Right: hero stats 2×2 */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10,
            opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(22px)",
            transition: "opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s",
          }}>
            {[
              { v: "KSh 4.2B+", l: "Track Record",    sub: "Completed infrastructure" },
              { v: "KSh 8.2B+", l: "Active Pipeline",  sub: "Govt-aligned projects" },
              { v: "Zero",       l: "External Debt",    sub: "Organic growth only" },
              { v: "10+ Yrs",    l: "Operating",        sub: "Est. 2014, Nairobi" },
            ].map(s => (
              <div key={s.l} style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 2, padding: "22px 20px",
              }}>
                <div style={{ fontFamily: T.display, fontSize: "clamp(20px,2.4vw,30px)", fontWeight: 700, color: T.gold, lineHeight: 1, letterSpacing: "-0.02em", marginBottom: 6 }}>{s.v}</div>
                <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.white, marginBottom: 3, letterSpacing: "0.01em" }}>{s.l}</div>
                <div style={{ fontFamily: T.mono, fontSize: 9, color: "rgba(255,255,255,0.28)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function InvestorsPage() {
  const [showForm, setShowForm] = useState(false);
  const open  = useCallback(() => setShowForm(true),  []);
  const close = useCallback(() => setShowForm(false), []);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href={FONTS_HREF} rel="stylesheet" />

      <div style={{ background: T.ivory, minHeight: "100vh" }}>
        <Hero onInquire={open} />
        <WhyInvest onInquire={open} />
        <ROISection onInquire={open} />
        <PipelineSection onInquire={open} />
        <DeckCTA onInquire={open} />
      </div>

      {showForm && <InquiryForm onClose={close} />}

      <style>{`
        .hero-grid, .why-grid { grid-template-columns: 1fr 1fr; }
        .roi-grid .inner       { grid-template-columns: 1fr 1fr; }
        .deck-grid             { grid-template-columns: repeat(3,1fr); }
        .pipeline-row          { grid-template-columns: 2fr 1fr 1fr 1.4fr 1fr; }

        @media (max-width: 900px) {
          .hero-grid, .why-grid { grid-template-columns: 1fr !important; }
          .deck-grid            { grid-template-columns: 1fr !important; }
          .roi-grid > div:first-child { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .pipeline-row { grid-template-columns: 1fr !important; }
          .pipeline-row > div:not(:first-child):not(:last-child) { display: none; }
        }

        *:focus-visible {
          outline: 2px solid ${T.gold};
          outline-offset: 3px;
          border-radius: 2px;
        }
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
          html { scroll-behavior: auto; }
        }
      `}</style>
    </>
  );
}