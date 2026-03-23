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
  arrowRight: ({ size = 12, color = "currentColor", sw = 2.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
  ),
  close: ({ size = 14, color = "currentColor", sw = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  ),
  check: ({ size = 13, color = "currentColor", sw = 2.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
  ),
  pin: ({ size = 11, color = "currentColor", sw = 1.8 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
  plus: ({ size = 12, color = "currentColor", sw = 1.8 }) => (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <line x1="6" y1="1" x2="6" y2="11" stroke={color} strokeWidth={sw} strokeLinecap="round"/>
      <line x1="1" y1="6" x2="11" y2="6" stroke={color} strokeWidth={sw} strokeLinecap="round"/>
    </svg>
  ),
  mail: ({ size = 13, color = "currentColor", sw = 1.8 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
  ),
  // "Why work here" section icons
  impact: ({ size = 20, color = "currentColor", sw = 1.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  ),
  growth: ({ size = 20, color = "currentColor", sw = 1.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
  ),
  shield: ({ size = 20, color = "currentColor", sw = 1.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  ),
  people: ({ size = 20, color = "currentColor", sw = 1.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
};

// ─── Level colour map ─────────────────────────────────────────────────────────
const LEVEL_COLOR = {
  Senior: "#C96C8A",
  Mid:    "#6CA8C9",
  Junior: "#A8C96C",
  Entry:  T.mist,
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const ROLES = [
  { id: 1, title: "Site Engineer — Roads",        dept: "Engineering", type: "Full-time", location: "Nairobi / Field",  level: "Mid",    desc: "Supervise road construction activities, manage subcontractors, and ensure delivery to specification and schedule.",    requirements: ["BSc Civil Engineering or equivalent", "3+ years site experience", "Kenya Engineers Registration Board membership preferred"] },
  { id: 2, title: "Electrical Engineer — Solar",  dept: "Engineering", type: "Full-time", location: "Nairobi / Field",  level: "Mid",    desc: "Design, install and commission solar PV systems for street lighting, water pumping, and farm-scale installations.",     requirements: ["BSc Electrical Engineering", "2+ years solar project experience", "ERC registration preferred"] },
  { id: 3, title: "Project Manager",              dept: "Operations",  type: "Full-time", location: "Nairobi",          level: "Senior", desc: "End-to-end project management across civil and building contracts — from tender through to handover.",                  requirements: ["PMP or PRINCE2 certification", "5+ years construction PM experience", "Experience with government contracts"] },
  { id: 4, title: "Quantity Surveyor",            dept: "Commercial",  type: "Full-time", location: "Nairobi",          level: "Mid",    desc: "Prepare BOQs, manage valuations, track project costs, and support tender submissions.",                               requirements: ["BSc Quantity Surveying", "2+ years QS experience", "BORAQS membership preferred"] },
  { id: 5, title: "HSE Officer",                  dept: "Safety",      type: "Full-time", location: "Nairobi / Field",  level: "Mid",    desc: "Maintain Spacemine's zero-LTI safety culture across all active sites — auditing, training, and incident prevention.",  requirements: ["NEBOSH IGC or equivalent", "3+ years HSE in construction", "Strong reporting and communication skills"] },
  { id: 6, title: "Site Foreman — Civil Works",   dept: "Operations",  type: "Full-time", location: "Field (various)",  level: "Mid",    desc: "Day-to-day supervision of civil works crews on road, drainage, and earthworks projects.",                             requirements: ["Diploma in Civil Engineering", "5+ years site supervision", "Valid driving licence"] },
  { id: 7, title: "Procurement Officer",          dept: "Commercial",  type: "Full-time", location: "Nairobi",          level: "Junior", desc: "Source materials, manage supplier relationships, and support tender preparation.",                                     requirements: ["Diploma/Degree in Supply Chain or Business", "1+ years procurement experience"] },
  { id: 8, title: "Skilled Labourers / Artisans", dept: "Site",        type: "Contract",  location: "Various sites",    level: "Entry",  desc: "Various skilled trades including formwork carpenters, steel fixers, masons, and plumbers for ongoing project work.",   requirements: ["Trade certificate preferred", "Relevant site experience"] },
];

const WHY_ITEMS = [
  { Icon: Icon.impact,  title: "Real Impact",        desc: "Every project directly serves Kenyan communities — roads people drive, water people drink, power people use." },
  { Icon: Icon.growth,  title: "Career Growth",       desc: "We recruit, develop, and promote from within. Continuous training and a clear path upward." },
  { Icon: Icon.shield,  title: "Safety First",        desc: "8 consecutive years of zero lost-time incidents. Your safety is non-negotiable on every site." },
  { Icon: Icon.people,  title: "Inclusive Culture",   desc: "No distinction on race, gender, creed, disability or age. A team that reflects the full diversity of Kenya." },
];

const DEPTS = ["All", ...new Set(ROLES.map(r => r.dept))];
const TYPES = ["All Types", "Full-time", "Contract"];

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.08) {
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

// ─── Shared label ─────────────────────────────────────────────────────────────
function SectionLabel({ color = T.gold, children }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <div style={{ width: 22, height: 1, background: `linear-gradient(90deg, ${color}, transparent)` }} />
      <span style={{ fontFamily: T.mono, fontSize: 9, fontWeight: 500, color, letterSpacing: "0.24em", textTransform: "uppercase" }}>{children}</span>
    </div>
  );
}

// ─── Application modal ────────────────────────────────────────────────────────
function ApplicationModal({ role, onClose }) {
  const [form, setForm]     = useState({ name: "", email: "", phone: "", cover: "" });
  const [submitted, setSub] = useState(false);
  const [hovBtn, setHovBtn] = useState(false);
  const firstRef = useRef(null);
  const set = useCallback(k => v => setForm(p => ({ ...p, [k]: v })), []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    firstRef.current?.focus();
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
    boxSizing: "border-box", fontWeight: 300,
  };
  const labelStyle = {
    display: "block", fontFamily: T.mono, fontSize: 9, fontWeight: 500,
    color: T.mist, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 7,
  };
  const onFocus = e => { e.target.style.borderColor = T.gold; e.target.style.boxShadow = `0 0 0 3px ${T.gold}18`; };
  const onBlur  = e => { e.target.style.borderColor = "rgba(14,21,35,0.12)"; e.target.style.boxShadow = "none"; };
  const levelColor = LEVEL_COLOR[role.level] || T.mist;

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(12px,3vw,24px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "rgba(10,13,20,0.88)", backdropFilter: "blur(14px)" }} />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-role-title"
        style={{
          position: "relative", zIndex: 1,
          background: T.white, borderRadius: 2,
          width: "100%", maxWidth: 500,
          maxHeight: "90vh", overflowY: "auto",
          boxShadow: "0 56px 140px rgba(0,0,0,0.5)",
          animation: "modalIn 0.32s cubic-bezier(0.16,1,0.3,1) forwards",
        }}
      >
        {/* Header */}
        <div style={{ background: T.navy, padding: "24px 26px 20px", position: "relative" }}>
          <div aria-hidden="true" style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, ${T.gold}, transparent 60%)`,
          }} />
          <button
            onClick={onClose}
            aria-label="Close application form"
            style={{
              position: "absolute", top: 14, right: 14,
              background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "50%", width: 34, height: 34,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Icon.close size={14} color={T.white} />
          </button>
          <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
            <span style={{
              fontFamily: T.mono, fontSize: 8, fontWeight: 600,
              background: levelColor + "22", color: levelColor,
              border: `1px solid ${levelColor}30`,
              padding: "4px 10px", borderRadius: 2, letterSpacing: "0.16em", textTransform: "uppercase",
            }}>{role.level}</span>
            <span style={{ fontFamily: T.mono, fontSize: 8, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase", alignSelf: "center" }}>
              {role.dept} · {role.type}
            </span>
          </div>
          <h3 id="modal-role-title" style={{
            fontFamily: T.display, fontSize: 22, fontWeight: 700,
            color: T.white, letterSpacing: "-0.01em", margin: 0,
          }}>{role.title}</h3>
        </div>

        {/* Body */}
        {!submitted ? (
          <div style={{ padding: "24px 26px 28px", display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Name */}
            <div>
              <label htmlFor="app-name" style={labelStyle}>Full Name <span style={{ color: T.gold }}>*</span></label>
              <input ref={firstRef} id="app-name" type="text" required placeholder="Your name"
                value={form.name} onChange={e => set("name")(e.target.value)}
                style={fieldStyle} onFocus={onFocus} onBlur={onBlur}
              />
            </div>
            {/* Email */}
            <div>
              <label htmlFor="app-email" style={labelStyle}>Email Address <span style={{ color: T.gold }}>*</span></label>
              <input id="app-email" type="email" required placeholder="your@email.com"
                value={form.email} onChange={e => set("email")(e.target.value)}
                style={fieldStyle} onFocus={onFocus} onBlur={onBlur}
              />
            </div>
            {/* Phone */}
            <div>
              <label htmlFor="app-phone" style={labelStyle}>Phone <span style={{ color: T.mist, fontWeight: 300 }}>(optional)</span></label>
              <input id="app-phone" type="tel" placeholder="+254 …"
                value={form.phone} onChange={e => set("phone")(e.target.value)}
                style={fieldStyle} onFocus={onFocus} onBlur={onBlur}
              />
            </div>
            {/* Cover */}
            <div>
              <label htmlFor="app-cover" style={labelStyle}>Cover Note <span style={{ color: T.gold }}>*</span></label>
              <textarea id="app-cover" rows={4} required
                placeholder="Briefly describe your experience and why you're a fit…"
                value={form.cover} onChange={e => set("cover")(e.target.value)}
                style={{ ...fieldStyle, resize: "vertical" }}
                onFocus={onFocus} onBlur={onBlur}
              />
            </div>

            {/* CV note */}
            <div style={{
              background: T.ivory, border: `1px solid rgba(14,21,35,0.08)`,
              borderLeft: `2px solid ${T.gold}`,
              borderRadius: 2, padding: "11px 14px",
              display: "flex", gap: 10, alignItems: "flex-start",
            }}>
              <Icon.mail size={13} color={T.gold} sw={1.8} />
              <p style={{ fontFamily: T.sans, fontSize: 11, color: T.slate, margin: 0, lineHeight: 1.65, fontWeight: 300 }}>
                To attach a CV, email it to{" "}
                <a href="mailto:careers@spacemineholdings.com" style={{ color: T.navy, fontWeight: 600, textDecoration: "none" }}>careers@spacemineholdings.com</a>
                {" "}with the job title in the subject line.
              </p>
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={() => setSub(true)}
              onMouseEnter={() => setHovBtn(true)}
              onMouseLeave={() => setHovBtn(false)}
              style={{
                background: hovBtn ? T.goldLight : T.gold,
                color: T.navy, border: "none", borderRadius: 2,
                padding: "13px 0", fontFamily: T.sans, fontSize: 12, fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer",
                transition: "background 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease",
                transform: hovBtn ? "translateY(-1px)" : "none",
                boxShadow: hovBtn ? `0 8px 28px rgba(201,168,76,0.28)` : `0 4px 12px rgba(201,168,76,0.18)`,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              }}
            >
              Submit Application
              <Icon.arrowRight size={12} color={T.navy} />
            </button>
          </div>
        ) : (
          <div style={{ padding: "48px 26px", textAlign: "center" }}>
            <div style={{
              width: 60, height: 60, borderRadius: "50%",
              background: T.gold + "14", border: `1px solid ${T.gold}45`,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 22px",
            }}>
              <Icon.check size={24} color={T.gold} sw={2.5} />
            </div>
            <h3 style={{ fontFamily: T.display, fontSize: 24, fontWeight: 700, color: T.navy, marginBottom: 10, letterSpacing: "-0.01em" }}>
              Application Submitted
            </h3>
            <p style={{ fontFamily: T.sans, fontSize: 13, color: T.slate, lineHeight: 1.75, marginBottom: 24, fontWeight: 300 }}>
              We'll review your application and be in touch within 5 business days.
            </p>
            <button onClick={onClose} style={{
              background: T.gold, color: T.navy, border: "none", borderRadius: 2,
              padding: "11px 26px", fontFamily: T.sans, fontSize: 11,
              fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
            }}>Done</button>
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

// ─── Role card (accordion) ────────────────────────────────────────────────────
function RoleCard({ role, index, visible, onApply }) {
  const [open, setOpen] = useState(false);
  const [hovApply, setHovApply] = useState(false);
  const levelColor = LEVEL_COLOR[role.level] || T.mist;

  return (
    <div style={{
      background: T.white,
      border: `1px solid ${open ? T.gold + "40" : "rgba(14,21,35,0.08)"}`,
      borderRadius: 2, overflow: "hidden",
      boxShadow: open ? `0 8px 32px rgba(14,21,35,0.09)` : "0 2px 8px rgba(14,21,35,0.04)",
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(16px)",
      transition: [
        "border-color 0.25s ease",
        "box-shadow 0.25s ease",
        `opacity 0.55s ease ${index * 0.055}s`,
        `transform 0.55s ease ${index * 0.055}s`,
      ].join(", "),
    }}>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(p => !p)}
        aria-expanded={open}
        style={{
          width: "100%", background: "transparent", border: "none", cursor: "pointer",
          padding: "18px 20px", display: "flex", alignItems: "center", gap: 14, textAlign: "left",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Badges row */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7, flexWrap: "wrap" }}>
            <span style={{
              fontFamily: T.mono, fontSize: 8, fontWeight: 600,
              background: levelColor + "18", color: levelColor,
              border: `1px solid ${levelColor}28`,
              padding: "3px 9px", borderRadius: 2, letterSpacing: "0.16em", textTransform: "uppercase",
            }}>{role.level}</span>
            <span style={{ fontFamily: T.mono, fontSize: 8, color: T.mist, letterSpacing: "0.1em", textTransform: "uppercase" }}>{role.dept}</span>
            <span aria-hidden="true" style={{ color: "rgba(14,21,35,0.2)", fontSize: 10 }}>·</span>
            <span style={{ fontFamily: T.mono, fontSize: 8, color: T.mist, letterSpacing: "0.1em", textTransform: "uppercase" }}>{role.type}</span>
          </div>
          {/* Title */}
          <div style={{
            fontFamily: T.display, fontSize: "clamp(16px,1.6vw,20px)",
            fontWeight: 600, color: T.navy, letterSpacing: "-0.01em", marginBottom: 4,
          }}>{role.title}</div>
          {/* Location */}
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Icon.pin size={10} color={T.mist} />
            <span style={{ fontFamily: T.sans, fontSize: 11, color: T.mist, fontWeight: 300 }}>{role.location}</span>
          </div>
        </div>

        {/* +/- toggle */}
        <div style={{
          width: 30, height: 30, borderRadius: "50%",
          border: `1px solid ${open ? T.gold + "60" : "rgba(14,21,35,0.1)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          transform: open ? "rotate(45deg)" : "rotate(0)",
          transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.22s",
          background: open ? T.gold + "0C" : "transparent",
        }}>
          <Icon.plus size={12} color={open ? T.gold : T.mist} sw={1.8} />
        </div>
      </button>

      {/* Expanded body */}
      {open && (
        <div style={{
          padding: "0 20px 22px",
          borderTop: `1px solid rgba(14,21,35,0.06)`,
          paddingTop: 18,
        }}>
          <p style={{
            fontFamily: T.sans, fontSize: 13, color: T.slate,
            lineHeight: 1.78, marginBottom: 20, fontWeight: 300,
          }}>{role.desc}</p>

          <div style={{
            fontFamily: T.mono, fontSize: 8, fontWeight: 500,
            color: T.mist, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12,
          }}>Requirements</div>

          <ul style={{ margin: "0 0 22px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
            {role.requirements.map(r => (
              <li key={r} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{
                  width: 18, height: 18, borderRadius: "50%",
                  background: T.gold + "14", border: `1px solid ${T.gold}28`,
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, marginTop: 1,
                }}>
                  <Icon.check size={9} color={T.gold} sw={2.5} />
                </span>
                <span style={{ fontFamily: T.sans, fontSize: 13, color: T.slate, lineHeight: 1.65, fontWeight: 300 }}>{r}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => onApply(role)}
            onMouseEnter={() => setHovApply(true)}
            onMouseLeave={() => setHovApply(false)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              background: hovApply ? T.goldLight : T.gold,
              color: T.navy, border: "none", borderRadius: 2,
              padding: "11px 22px", fontFamily: T.sans, fontSize: 11, fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
              transition: "background 0.22s ease, transform 0.22s ease",
              transform: hovApply ? "translateY(-1px)" : "none",
            }}
          >
            Apply Now
            <Icon.arrowRight size={11} color={T.navy} />
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Why work here section ────────────────────────────────────────────────────
function WhySection() {
  const [ref, visible] = useInView(0.1);

  return (
    <section
      ref={ref}
      aria-labelledby="why-heading"
      style={{
        background: T.navyMid,
        padding: "clamp(48px,6vw,72px) clamp(16px,3vw,32px)",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Subtle grid */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: [
          `linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px)`,
          `linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)`,
        ].join(","),
        backgroundSize: "48px 48px",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(32px,4vw,48px)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 22, height: 1, background: `linear-gradient(270deg, ${T.gold}, transparent)` }} />
            <span style={{ fontFamily: T.mono, fontSize: 9, fontWeight: 500, color: T.gold, letterSpacing: "0.24em", textTransform: "uppercase" }}>Why Spacemine</span>
            <div style={{ width: 22, height: 1, background: `linear-gradient(90deg, ${T.gold}, transparent)` }} />
          </div>
          <h2 id="why-heading" style={{
            fontFamily: T.display, fontSize: "clamp(26px,3vw,40px)",
            fontWeight: 600, color: T.white,
            letterSpacing: "-0.02em", lineHeight: 1.06,
          }}>
            More Than a Job.<br />
            <em style={{ color: T.goldLight, fontStyle: "italic" }}>A Building Career.</em>
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "clamp(12px,1.6vw,18px)",
        }}>
          {WHY_ITEMS.map((w, i) => {
            const WIcon = w.Icon;
            return (
              <div key={w.title} style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderTop: `2px solid ${T.gold}`,
                borderRadius: 2, padding: "22px 20px",
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(16px)",
                transition: `opacity 0.6s ease ${i * 0.09}s, transform 0.6s ease ${i * 0.09}s`,
              }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 38, height: 38, borderRadius: 8,
                  background: T.gold + "14", border: `1px solid ${T.gold}28`,
                  marginBottom: 16,
                }}>
                  <WIcon size={17} color={T.gold} sw={1.6} />
                </div>
                <div style={{
                  fontFamily: T.display, fontSize: 18, fontWeight: 600,
                  color: T.white, letterSpacing: "-0.01em", marginBottom: 8,
                }}>{w.title}</div>
                <p style={{
                  fontFamily: T.sans, fontSize: 12, color: "rgba(255,255,255,0.42)",
                  lineHeight: 1.72, margin: 0, fontWeight: 300,
                }}>{w.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);

  return (
    <header role="banner" style={{
      background: T.navy,
      padding: "clamp(100px,12vw,160px) clamp(16px,3vw,32px) clamp(48px,6vw,72px)",
      position: "relative", overflow: "hidden",
    }}>
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: [
          `linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px)`,
          `linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)`,
        ].join(","),
        backgroundSize: "56px 56px",
      }} />
      {/* Decorative "K" */}
      <div aria-hidden="true" style={{
        position: "absolute", right: "-0.04em", top: "50%", transform: "translateY(-50%)",
        fontFamily: T.display, fontSize: "clamp(240px,28vw,400px)",
        fontWeight: 700, color: "rgba(201,168,76,0.04)",
        lineHeight: 1, userSelect: "none", pointerEvents: "none",
      }}>K</div>
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
            <li><span style={{ fontFamily: T.mono, fontSize: 10, color: T.goldLight, letterSpacing: "0.1em", textTransform: "uppercase" }} aria-current="page">Careers</span></li>
          </ol>
        </nav>

        <div className="careers-hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,5vw,72px)", alignItems: "center" }}>
          {/* Left */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20,
              opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(10px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}>
              <div style={{ width: 32, height: 1, background: T.gold }} />
              <span style={{ fontFamily: T.mono, fontSize: 9, color: T.gold, letterSpacing: "0.26em", textTransform: "uppercase" }}>Join the Team</span>
            </div>

            <h1 style={{
              fontFamily: T.display,
              fontSize: "clamp(40px,5.5vw,72px)",
              fontWeight: 600, color: T.white,
              letterSpacing: "-0.03em", lineHeight: 1.0, margin: "0 0 20px",
              opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(22px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}>
              Build Kenya.<br />
              <em style={{ color: T.goldLight, fontStyle: "italic" }}>Build Your Career.</em>
            </h1>

            <p style={{
              fontFamily: T.sans, fontSize: "clamp(14px,1.4vw,16px)",
              color: "rgba(255,255,255,0.42)", lineHeight: 1.82,
              maxWidth: 440, margin: "0 0 32px", fontWeight: 300,
              opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(22px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}>
              Join a team of engineers, project managers, and tradespeople who are literally
              building the infrastructure Kenya runs on.
            </p>

            <a href="#roles" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: T.gold, color: T.navy, borderRadius: 2,
              padding: "14px 26px", fontFamily: T.sans, fontSize: 12, fontWeight: 700,
              textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase",
              opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(22px)",
              transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = T.goldLight; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = T.gold; e.currentTarget.style.transform = mounted ? "none" : "translateY(22px)"; }}
            >
              View Open Roles
              <Icon.arrowRight size={12} color={T.navy} />
            </a>
          </div>

          {/* Right: hero stats */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10,
            opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(22px)",
            transition: "opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s",
          }}>
            {[
              { v: "8",          l: "Open Roles" },
              { v: "Zero LTI",   l: "Safety Culture" },
              { v: "10+",        l: "Yrs Operating" },
              { v: "Kenya-Wide", l: "Project Locations" },
            ].map(s => (
              <div key={s.l} style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 2, padding: "22px 18px",
              }}>
                <div style={{ fontFamily: T.display, fontSize: "clamp(18px,2.2vw,28px)", fontWeight: 700, color: T.gold, lineHeight: 1, letterSpacing: "-0.02em", marginBottom: 6 }}>{s.v}</div>
                <div style={{ fontFamily: T.mono, fontSize: 9, color: "rgba(255,255,255,0.28)", letterSpacing: "0.14em", textTransform: "uppercase" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function CareersPage() {
  const [deptFilter, setDeptFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [applying,   setApplying]   = useState(null);
  const [ref, visible] = useInView(0.06);

  const filtered = ROLES.filter(r =>
    (deptFilter === "All"       || r.dept === deptFilter) &&
    (typeFilter === "All Types" || r.type === typeFilter)
  );

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href={FONTS_HREF} rel="stylesheet" />

      <div style={{ background: T.ivory, minHeight: "100vh" }}>
        <Hero />
        <WhySection />

        {/* Roles section */}
        <main
          id="roles"
          tabIndex={-1}
          ref={ref}
          style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(48px,6vw,72px) clamp(16px,3vw,32px)" }}
        >
          {/* Section header + filters */}
          <div style={{
            display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            flexWrap: "wrap", gap: 20, marginBottom: 28,
            opacity: visible ? 1 : 0, transition: "opacity 0.5s ease",
          }}>
            <div>
              <SectionLabel>Open Positions</SectionLabel>
              <h2 style={{
                fontFamily: T.display, fontSize: "clamp(24px,3vw,36px)",
                fontWeight: 600, color: T.navy, letterSpacing: "-0.02em",
                lineHeight: 1.06, margin: 0,
              }}>
                {filtered.length} Role{filtered.length !== 1 ? "s" : ""}{" "}
                <em style={{ fontStyle: "italic", color: T.gold }}>Available</em>
              </h2>
            </div>

            {/* Filter pills */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
              {DEPTS.map(d => {
                const active = deptFilter === d;
                return (
                  <button key={d} onClick={() => setDeptFilter(d)} aria-pressed={active}
                    style={{
                      fontFamily: T.mono, fontSize: 9, fontWeight: active ? 600 : 400,
                      color: active ? T.gold : T.mist,
                      background: active ? T.gold + "12" : "transparent",
                      border: `1px solid ${active ? T.gold + "45" : "rgba(14,21,35,0.1)"}`,
                      borderRadius: 20, padding: "5px 13px", cursor: "pointer",
                      transition: "all 0.18s", letterSpacing: "0.1em", textTransform: "uppercase",
                    }}
                    onMouseEnter={e => { if (!active) { e.currentTarget.style.color = T.navy; e.currentTarget.style.borderColor = "rgba(14,21,35,0.2)"; } }}
                    onMouseLeave={e => { if (!active) { e.currentTarget.style.color = T.mist; e.currentTarget.style.borderColor = "rgba(14,21,35,0.1)"; } }}
                  >{d}</button>
                );
              })}
              <div aria-hidden="true" style={{ width: 1, height: 20, background: "rgba(14,21,35,0.12)", alignSelf: "center" }} />
              {TYPES.map(tp => {
                const active = typeFilter === tp;
                return (
                  <button key={tp} onClick={() => setTypeFilter(tp)} aria-pressed={active}
                    style={{
                      fontFamily: T.mono, fontSize: 9, fontWeight: active ? 600 : 400,
                      color: active ? T.gold : T.mist,
                      background: active ? T.gold + "12" : "transparent",
                      border: `1px solid ${active ? T.gold + "45" : "rgba(14,21,35,0.1)"}`,
                      borderRadius: 20, padding: "5px 13px", cursor: "pointer",
                      transition: "all 0.18s", letterSpacing: "0.1em", textTransform: "uppercase",
                    }}
                    onMouseEnter={e => { if (!active) { e.currentTarget.style.color = T.navy; e.currentTarget.style.borderColor = "rgba(14,21,35,0.2)"; } }}
                    onMouseLeave={e => { if (!active) { e.currentTarget.style.color = T.mist; e.currentTarget.style.borderColor = "rgba(14,21,35,0.1)"; } }}
                  >{tp}</button>
                );
              })}
            </div>
          </div>

          {/* Role list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {filtered.map((r, i) => (
              <RoleCard key={r.id} role={r} index={i} visible={visible} onApply={setApplying} />
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "56px 24px" }}>
              <div style={{ fontFamily: T.display, fontSize: 22, fontWeight: 600, color: T.navy, marginBottom: 8 }}>No roles match these filters</div>
              <p style={{ fontFamily: T.sans, fontSize: 14, color: T.mist, fontWeight: 300 }}>Try a different department or type filter above.</p>
            </div>
          )}

          {/* Speculative applications */}
          <div style={{
            marginTop: 32,
            background: T.white,
            border: `1px solid rgba(14,21,35,0.08)`,
            borderLeft: `2px solid ${T.gold}`,
            borderRadius: 2, padding: "22px 24px",
            display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap",
          }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontFamily: T.display, fontSize: 18, fontWeight: 600, color: T.navy, letterSpacing: "-0.01em", marginBottom: 8 }}>
                Don't see your role?
              </div>
              <p style={{ fontFamily: T.sans, fontSize: 13, color: T.slate, lineHeight: 1.7, margin: 0, fontWeight: 300 }}>
                We always welcome speculative applications from talented engineers, project managers, and tradespeople.
              </p>
            </div>
            <a href="mailto:careers@spacemineholdings.com"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontFamily: T.sans, fontSize: 12, fontWeight: 600,
                color: T.navy, textDecoration: "none",
                background: T.gold + "14", border: `1px solid ${T.gold}30`,
                padding: "10px 16px", borderRadius: 2,
                flexShrink: 0,
                transition: "background 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = T.gold + "28"}
              onMouseLeave={e => e.currentTarget.style.background = T.gold + "14"}
            >
              <Icon.mail size={12} color={T.gold} />
              careers@spacemineholdings.com
            </a>
          </div>
        </main>
      </div>

      {applying && <ApplicationModal role={applying} onClose={() => setApplying(null)} />}

      <style>{`
        .careers-hero-grid { grid-template-columns: 1fr 1fr; }

        @media (max-width: 768px) {
          .careers-hero-grid { grid-template-columns: 1fr !important; }
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