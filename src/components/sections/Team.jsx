import { useState, useEffect, useCallback, useRef } from "react";
import { BRAND, FONT, SECTION_PAD, MAX_WIDTH } from "../../shared/constants";
import { SectionLabel } from "../common/SectionLabel";

// ─── Data ────────────────────────────────────────────────────────────────────
const TEAM = [
  {
    id: 1,
    name: "Abdikani",
    role: "Director – Strategic Projects & Government Relations",
    photo: "/assets/images/team/2.png",
    rating: 96,
    strengths: [
      { label: "Strategy",        value: 97 },
      { label: "Partnerships",    value: 95 },
      { label: "Negotiation",     value: 96 },
      { label: "Leadership",      value: 94 },
    ],
    details: {
      experience:     "10+ Years",
      education:      "Strategic Leadership & Government Relations",
      certifications: "Executive Leadership, Public-Private Partnerships",
      projects:       "Multiple Strategic Projects Secured",
    },
    quote:     "Drives growth by securing projects, managing relationships, and setting strategic direction.",
    years:     "10+ yrs",
    specialty: "Strategy & Government Relations",
    accent:    BRAND.green,
    coreFocus: "Strategy, partnerships, and securing projects",
    responsibilities: [
      "Lead government engagement and high-level stakeholder relationships",
      "Liaise with government authorities, regulators, and key partners",
      "Identify and secure new projects, contracts, and strategic opportunities",
      "Provide overall strategic direction across all developments",
      "Ensure alignment with contract obligations, timelines, and expectations",
      "Handle escalations and critical project issues at executive level",
    ],
  },
  {
    id: 4,
    name: "Mustafa",
    role: "Director – Operations & Project Delivery",
    photo: "assets/images/team/3.png",
    rating: 95,
    strengths: [
      { label: "Execution",       value: 97 },
      { label: "Operations",      value: 96 },
      { label: "Coordination",    value: 94 },
      { label: "Problem Solving", value: 95 },
    ],
    details: {
      experience:     "10+ Years",
      education:      "Operations Management & Engineering",
      certifications: "Project Delivery Excellence, Quality Management",
      projects:       "On-Time Delivery Record",
    },
    quote:     "Drives execution by managing contractors, coordinating suppliers, and ensuring smooth, on-time project delivery.",
    years:     "10+ yrs",
    specialty: "Operations & Project Delivery",
    accent:    BRAND.navy,
    coreFocus: "Execution, site control, and delivery",
    responsibilities: [
      "Lead and oversee contractor performance across all project sites",
      "Ensure contractors deliver work in line with quality, timelines, and specifications",
      "Manage and coordinate subcontractors, engineers, and site teams",
      "Oversee coordination between procurement, suppliers, and site operations",
      "Ensure timely availability of materials to avoid delays and disruptions",
      "Monitor supplier and contractor performance, resolving issues proactively",
      "Drive day-to-day site execution and operational efficiency",
      "Identify and resolve bottlenecks and on-site challenges",
      "Ensure projects are delivered on time, within scope, and to required standards",
    ],
  },
  {
    id: 3,
    name: "Abdulqadir",
    role: "Director – Finance, Commercial & Project Execution",
    photo: "/assets/images/team/1.png",
    rating: 94,
    strengths: [
      { label: "Financial Control", value: 97 },
      { label: "Commercial Strategy", value: 95 },
      { label: "Cost Management", value: 96 },
      { label: "Performance",     value: 93 },
    ],
    details: {
      experience:     "10+ Years",
      education:      "Finance & Commercial Management",
      certifications: "Financial Strategy, Procurement Excellence",
      projects:       "Profitability & Efficiency Focus",
    },
    quote:     "Ensures profitability, financial control, and efficient coordination across procurement, operations, and project execution.",
    years:     "10+ yrs",
    specialty: "Finance & Commercial Strategy",
    accent:    BRAND.goldDim,
    coreFocus: "Financial control, commercial strategy, and performance",
    responsibilities: [
      "Oversee financial management across all projects: Budgeting, Cashflow, Cost control",
      "Approve major expenditures and financial decisions",
      "Lead commercial strategy, including: Procurement approach, Supplier negotiations, Cost efficiency initiatives",
      "Oversee coordination between procurement, suppliers, and site operations to ensure financial and operational alignment",
      "Support project execution alongside operations to maintain efficiency and control",
      "Oversee IT systems, reporting, and operational infrastructure",
      "Lead marketing and branding strategy",
      "Monitor: Profitability, Financial performance, Project margins",
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
/** Accessible stat bar — uses a native <meter> for semantics, styled via CSS */
function StatBar({ label, value, accent, visible, delay = 0 }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span
          id={`stat-label-${label.replace(/\s+/g, "-").toLowerCase()}`}
          style={{ fontFamily: FONT.body, fontSize: 11, color: BRAND.gray, letterSpacing: "0.07em", textTransform: "uppercase" }}
        >
          {label}
        </span>
        <span style={{ fontFamily: FONT.heading, fontSize: 13, fontWeight: 700, color: BRAND.dark }} aria-hidden="true">{value}</span>
      </div>
      {/* Visual bar */}
      <div role="meter" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}
        aria-labelledby={`stat-label-${label.replace(/\s+/g, "-").toLowerCase()}`}
        style={{ height: 3, background: "rgba(0,0,0,0.08)", borderRadius: 2, overflow: "hidden" }}
      >
        <div style={{
          height: "100%",
          width: visible ? `${value}%` : "0%",
          background: `linear-gradient(90deg, ${accent}cc, ${accent})`,
          borderRadius: 2,
          transition: "width 0.9s cubic-bezier(0.25,0.46,0.45,0.94)",
          transitionDelay: visible ? `${delay}s` : "0s",
          willChange: "width",
        }} />
      </div>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function MemberModal({ member, onClose }) {
  const [statsVisible, setStatsVisible] = useState(false);
  const closeRef = useRef(null);

  // Animate stats in after mount
  useEffect(() => {
    const t = setTimeout(() => setStatsVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  // Keyboard + scroll lock
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    // Focus the close button for keyboard users
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const PROFILE_FIELDS = {
    Experience:     member.details.experience,
    Education:      member.details.education,
    Certifications: member.details.certifications,
    "Track Record": member.details.projects,
    Specialisation: member.specialty,
  };

  return (
    <div
      role="presentation"
      style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop — separate element so it doesn't eat click events on panel */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0,
        background: "rgba(0,0,0,0.82)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }} />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-member-name"
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "row",
          width: "100%",
          maxWidth: 860,
          maxHeight: "92vh",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: `0 48px 120px rgba(0,0,0,0.7), 0 0 60px ${member.accent}1a`,
          animation: "modalIn 0.38s cubic-bezier(0.25,0.46,0.45,0.94) forwards",
        }}
      >
        {/* ── LEFT: Photo ── */}
        <div style={{
          width: "38%",
          minWidth: 200,
          flexShrink: 0,
          position: "relative",
          background: "#0a0a12",
          overflow: "hidden",
          // On very small screens, hide the photo panel (it stacks below via flexWrap)
        }}>
          <img
            src={member.photo}
            alt={`Portrait of ${member.name}, ${member.role}`}
            loading="lazy"
            decoding="async"
            width="400"
            height="500"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              display: "block",
              filter: "brightness(0.85) contrast(1.05)",
            }}
          />
          {/* Colour gradient overlay */}
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(to top, ${member.accent}cc 0%, transparent 52%)`,
          }} />
          {/* Name block */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 20px 20px" }}>
            <div style={{
              display: "inline-flex", flexDirection: "column", alignItems: "center",
              background: member.accent, borderRadius: 8, padding: "8px 12px", marginBottom: 10, minWidth: 52,
            }}>
              <span style={{ fontFamily: FONT.heading, fontSize: 26, fontWeight: 900, color: "#fff", lineHeight: 1 }}>{member.rating}</span>
              <span aria-hidden="true" style={{ fontFamily: FONT.body, fontSize: 8, color: "rgba(255,255,255,0.75)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 2 }}>RATE</span>
            </div>
            <div id="modal-member-name" style={{ fontFamily: FONT.heading, fontSize: 20, fontWeight: 900, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.01em" }}>{member.name}</div>
            <div style={{ fontFamily: FONT.body, fontSize: 10, color: "rgba(255,255,255,0.72)", marginTop: 3, letterSpacing: "0.08em", textTransform: "uppercase" }}>{member.role}</div>
          </div>
          <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: member.accent }} />
        </div>

        {/* ── RIGHT: Data ── */}
        <div style={{ flex: 1, background: "#fff", display: "flex", flexDirection: "column", overflowY: "auto", minWidth: 0 }}>
          {/* Close */}
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label={`Close ${member.name}'s profile`}
            style={{
              position: "absolute", top: 14, right: 14,
              width: 36, height: 36, borderRadius: "50%",
              background: BRAND.offwhite, border: `1px solid ${BRAND.lightgray}`,
              color: BRAND.dark, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 15, zIndex: 10, transition: "background 0.18s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#e2dfd9"}
            onMouseLeave={e => e.currentTarget.style.background = BRAND.offwhite}
          >✕</button>

          <div style={{ padding: "28px 28px 20px" }}>
            {/* Section label */}
            <p style={{ fontFamily: FONT.body, fontSize: 10, color: member.accent, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, margin: "0 0 18px" }}>
              Professional Profile
            </p>

            {/* Detail rows */}
            <dl style={{ margin: "0 0 24px" }}>
              {Object.entries(PROFILE_FIELDS).map(([key, val]) => (
                <div key={key} style={{ borderBottom: `1px solid ${BRAND.lightgray}`, padding: "9px 0", display: "flex", flexDirection: "column", gap: 2 }}>
                  <dt style={{ fontFamily: FONT.body, fontSize: 10, color: BRAND.gray, letterSpacing: "0.07em", textTransform: "uppercase" }}>{key}</dt>
                  <dd style={{ fontFamily: FONT.body, fontSize: 14, color: BRAND.dark, fontWeight: 600, margin: 0 }}>{val}</dd>
                </div>
              ))}
            </dl>

            {/* Strengths */}
            <p style={{ fontFamily: FONT.body, fontSize: 10, color: member.accent, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, margin: "0 0 14px" }}>
              Core Strengths
            </p>
            {member.strengths.map((s, i) => (
              <StatBar key={s.label} label={s.label} value={s.value} accent={member.accent} visible={statsVisible} delay={0.1 + i * 0.08} />
            ))}
          </div>

          {/* Quote */}
          <div style={{ marginTop: "auto", padding: "18px 28px 24px", borderTop: `1px solid ${BRAND.lightgray}` }}>
            <blockquote style={{ fontFamily: FONT.body, fontSize: 13, color: BRAND.gray, lineHeight: 1.75, fontStyle: "italic", margin: 0 }}>
              "{member.quote}"
            </blockquote>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.93) translateY(18px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
        /* Mobile: stack photo on top, data below */
        @media (max-width: 600px) {
          [role="dialog"] { flex-direction: column !important; max-height: 95vh !important; }
          [role="dialog"] > div:first-child { width: 100% !important; min-width: unset !important; height: 220px !important; flex-shrink: 0 !important; }
        }
      `}</style>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function MemberCard({ member, position, isActive, isMobile, onClick, onExpand }) {
  const abs = Math.abs(position);
  const isVisible = abs <= (isMobile ? 1 : 2);

  // Mobile: tighter spread, no 3‑D rotation
  const translateX = isMobile ? position * 180 : position * 240;
  const translateZ = isActive ? 0 : isMobile ? -30 - abs * 20 : -80 - abs * 40;
  const rotateY    = isMobile ? 0 : position * 10;
  const scale      = isActive ? 1 : isMobile ? 1 - abs * 0.06 : 1 - abs * 0.08;
  const opacity    = isActive ? 1 : abs === 1 ? (isMobile ? 0.45 : 0.55) : 0.22;
  const zIndex     = isActive ? 10 : 5 - abs;

  if (!isVisible) return null;

  return (
    <article
      aria-label={`${member.name}, ${member.role}`}
      aria-current={isActive ? "true" : undefined}
      onClick={onClick}
      itemScope
      itemType="https://schema.org/Person"
      style={{
        position: "absolute",
        left: "50%", top: "50%",
        width: isMobile ? 240 : 285,
        marginLeft: isMobile ? -120 : -130,
        marginTop: isMobile ? -185 : -195,
        cursor: isActive ? "default" : "pointer",
        transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
        opacity,
        zIndex,
        transition: "transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.55s ease",
        transformStyle: "preserve-3d",
        willChange: "transform, opacity",
        contain: "layout",
      }}
    >
      <div style={{
        width: "100%",
        borderRadius: 12,
        overflow: "hidden",
        background: "linear-gradient(160deg,#ffffff 0%,#f7f5f2 100%)",
        border: isActive ? `1px solid ${member.accent}40` : `1px solid ${BRAND.lightgray}`,
        boxShadow: isActive
          ? `0 24px 60px rgba(0,0,0,0.11), 0 0 40px ${member.accent}10`
          : "0 4px 16px rgba(0,0,0,0.07)",
        transition: "box-shadow 0.55s ease, border-color 0.55s ease",
      }}>
        {/* Accent bar */}
        <div aria-hidden="true" style={{ height: 3, background: member.accent }} />

        {/* Photo */}
        <div style={{ position: "relative", height: 150, overflow: "hidden", background: "#e8e5e0" }}>
          <img
            src={member.photo}
            alt={`${member.name}`}
            loading="lazy"
            decoding="async"
            width="260"
            height="150"
            itemProp="image"
            style={{
  width: "100%", height: "100%",
  objectFit: "cover", 
  objectPosition: "center 20%",  // ✅ Centers better on faces
  display: "block",
  filter: "brightness(0.82) contrast(1.04)",
}}
          />
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, #f7f5f2 0%, transparent 58%)",
          }} />
          {/* Rating */}
          <div aria-label={`Rating: ${member.rating}`} style={{
            position: "absolute", top: 10, right: 10,
            width: 44, height: 44, borderRadius: 8,
            background: member.accent,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontFamily: FONT.heading, fontSize: 18, fontWeight: 900, color: "#fff", lineHeight: 1 }}>{member.rating}</span>
            <span aria-hidden="true" style={{ fontFamily: FONT.body, fontSize: 7, color: "rgba(255,255,255,0.7)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 1 }}>RATE</span>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: "13px 16px 15px" }}>
          <div itemProp="name" style={{ fontFamily: FONT.heading, fontSize: 15, fontWeight: 800, color: BRAND.dark, letterSpacing: "-0.01em", lineHeight: 1.15 }}>{member.name}</div>
          <div itemProp="jobTitle" style={{ fontFamily: FONT.body, fontSize: 10, color: member.accent, marginTop: 3, letterSpacing: "0.07em", textTransform: "uppercase", fontWeight: 600 }}>{member.role}</div>

          <div style={{ display: "flex", gap: 5, marginTop: 9, flexWrap: "wrap" }}>
            <span style={{ fontFamily: FONT.body, fontSize: 9, color: BRAND.gray, background: BRAND.offwhite, borderRadius: 4, padding: "3px 6px", letterSpacing: "0.04em" }}>{member.specialty}</span>
            <span style={{ fontFamily: FONT.body, fontSize: 9, color: BRAND.gray, background: BRAND.offwhite, borderRadius: 4, padding: "3px 6px" }}>{member.years}</span>
          </div>

          {/* Stats */}
          <div style={{ marginTop: 12 }}>
            {member.strengths.map((s) => (
              <StatBar key={s.label} label={s.label} value={s.value} accent={member.accent} visible={isActive} />
            ))}
          </div>

          {/* CTA — visible only on active card */}
          <div style={{
            marginTop: 12,
            opacity: isActive ? 1 : 0,
            transform: isActive ? "translateY(0)" : "translateY(5px)",
            transition: "opacity 0.3s ease 0.22s, transform 0.3s ease 0.22s",
            pointerEvents: isActive ? "auto" : "none",
          }}>
            <button
              onClick={(e) => { e.stopPropagation(); onExpand(); }}
              aria-label={`View full profile for ${member.name}`}
              style={{
                width: "100%", padding: "9px 0",
                borderRadius: 6,
                background: "transparent",
                border: `1px solid ${member.accent}60`,
                color: member.accent,
                fontFamily: FONT.heading, fontSize: 11, fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase",
                cursor: "pointer",
                transition: "background 0.18s, border-color 0.18s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = `${member.accent}15`; e.currentTarget.style.borderColor = member.accent; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = `${member.accent}60`; }}
            >
              View Full Profile
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function Team() {
  const [active, setActive]           = useState(0);
  const [modalMember, setModalMember] = useState(null);
  const [isMobile, setIsMobile]       = useState(false);
  const touchStartX                   = useRef(null);
  const carouselRef                   = useRef(null);

  // Responsive flag
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const go = useCallback((dir) => {
    setActive(prev => (prev + dir + TEAM.length) % TEAM.length);
  }, []);

  // Keyboard navigation — paused when modal open
  useEffect(() => {
    if (modalMember) return;
    const handler = (e) => {
      if (e.key === "ArrowLeft")  go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go, modalMember]);

  // Touch swipe
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) go(delta > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const activeMember = TEAM[active];

  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      itemScope
      itemType="https://schema.org/Organization"
      style={{ background: BRAND.white, padding: SECTION_PAD, position: "relative", overflow: "hidden" }}
    >
      {/* Ambient colour wash — cheap radial, GPU-composited */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse 60% 50% at 50% 65%, ${activeMember.accent}07 0%, transparent 70%)`,
        transition: "background 0.8s ease",
      }} />
      {/* Subtle grid lines */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(0,0,0,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.035) 1px,transparent 1px)",
        backgroundSize: "48px 48px",
      }} />

      <div style={{ maxWidth: MAX_WIDTH, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        <header style={{ textAlign: "center", marginBottom: isMobile ? 32 : 48 }}>
          <SectionLabel>Our Team</SectionLabel>
          <h2
            id="team-heading"
            itemProp="name"
            style={{
              fontFamily: FONT.heading,
              fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 800,
              color: BRAND.dark,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginTop: 10,
              marginBottom: 0,
            }}
          >
            The People Behind<br />
            <span style={{ color: activeMember.accent, transition: "color 0.4s ease" }}>Every Project</span>
          </h2>
          <p style={{ fontFamily: FONT.body, fontSize: 14, color: BRAND.gray, margin: "14px auto 0", maxWidth: 440 }}>
            {isMobile ? "Swipe or tap arrows to browse the team" : "Navigate with arrows or keyboard · tap a card to select · view full profile for details"}
          </p>
        </header>

        {/* ── Carousel ── */}
        <div
          ref={carouselRef}
          role="region"
          aria-label="Team member carousel"
          aria-live="polite"
          aria-atomic="true"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            position: "relative",
            height: isMobile ? 460 : 500,
            perspective: "1200px",
            perspectiveOrigin: "50% 40%",
            touchAction: "pan-y",
          }}
        >
          {/* Screen-reader-only live announcement */}
          <span className="sr-only" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap" }}>
            {activeMember.name}, {activeMember.role}
          </span>

          {TEAM.map((member, i) => {
            const position    = ((i - active + TEAM.length + 2) % TEAM.length) - 2;
            const centeredPos = position > 2 ? position - TEAM.length : position;
            return (
              <MemberCard
                key={member.id}
                member={member}
                position={centeredPos}
                isActive={centeredPos === 0}
                isMobile={isMobile}
                onClick={() => { if (centeredPos !== 0) go(centeredPos > 0 ? 1 : -1); }}
                onExpand={() => setModalMember(member)}
              />
            );
          })}
        </div>

        {/* ── Controls ── */}
        <nav aria-label="Team navigation" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginTop: isMobile ? 20 : 32 }}>
          <button
            onClick={() => go(-1)}
            aria-label="Previous team member"
            style={{
              width: 46, height: 46, borderRadius: "50%",
              background: BRAND.offwhite, border: `1px solid ${BRAND.lightgray}`,
              color: BRAND.dark, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 17, flexShrink: 0,
              transition: "background 0.18s, border-color 0.18s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#e2dfd9"; e.currentTarget.style.borderColor = activeMember.accent; }}
            onMouseLeave={e => { e.currentTarget.style.background = BRAND.offwhite; e.currentTarget.style.borderColor = BRAND.lightgray; }}
          >←</button>

          {/* Dot indicators */}
          <div role="tablist" aria-label="Team members" style={{ display: "flex", gap: 7 }}>
            {TEAM.map((m, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                aria-label={m.name}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? 22 : 8, height: 8, borderRadius: 4,
                  background: i === active ? activeMember.accent : BRAND.lightgray,
                  border: "none", cursor: "pointer", padding: 0,
                  transition: "width 0.28s ease, background 0.28s ease",
                }}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            aria-label="Next team member"
            style={{
              width: 46, height: 46, borderRadius: "50%",
              background: BRAND.offwhite, border: `1px solid ${BRAND.lightgray}`,
              color: BRAND.dark, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 17, flexShrink: 0,
              transition: "background 0.18s, border-color 0.18s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#e2dfd9"; e.currentTarget.style.borderColor = activeMember.accent; }}
            onMouseLeave={e => { e.currentTarget.style.background = BRAND.offwhite; e.currentTarget.style.borderColor = BRAND.lightgray; }}
          >→</button>
        </nav>

        {/* Active name label */}
        <p aria-live="polite" style={{ textAlign: "center", marginTop: 18, fontFamily: FONT.heading, fontSize: 11, fontWeight: 700, color: activeMember.accent, letterSpacing: "0.14em", textTransform: "uppercase", transition: "color 0.4s ease" }}>
          {activeMember.name} — {activeMember.role}
        </p>
      </div>

      {/* Modal */}
      {modalMember && <MemberModal member={modalMember} onClose={() => setModalMember(null)} />}

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          #team *, #team *::before, #team *::after {
            transition-duration: 0.01ms !important;
            animation-duration:  0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}