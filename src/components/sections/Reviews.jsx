import { useState, useEffect, useRef, useCallback } from "react";
import { BRAND, FONT, SECTION_PAD, MAX_WIDTH } from "../../shared/constants";
import { SectionLabel } from "../common/SectionLabel";

// ─── Data ─────────────────────────────────────────────────────────────────────
const REVIEWS = [
  {
    id: 1,
    quote: "Spacemine delivered the Nairobi interchange 3 weeks ahead of schedule. The quality of work exceeded every benchmark we set — and they did it without a single reportable incident.",
    author: "David Ouma",
    title: "Director of Infrastructure",
    organisation: "Kenya Roads Board",
    project: "Nairobi Interchange Upgrade",
    projectType: "Civil Infrastructure",
    initials: "KRB",
    accentColor: BRAND.orange,
  },
  {
    id: 2,
    quote: "What sets Spacemine apart is their relentless focus on safety. Over an 18-month engagement, zero LTIs — a record we hadn't seen from any contractor in our 30-year history.",
    author: "Wanjiru Kamau",
    title: "Chief Operations Officer",
    organisation: "Nairobi Water & Sewerage",
    project: "Pipeline Rehabilitation Phase II",
    projectType: "Water & Sanitation",
    initials: "NWS",
    accentColor: "#2a6b9c",
  },
  {
    id: 3,
    quote: "From design through to handover, the Spacemine team showed a level of professionalism and technical rigour we simply hadn't experienced before. 98% of snagging items resolved at first sign-off.",
    author: "James Kariuki",
    title: "Senior Project Manager",
    organisation: "Nairobi City Council",
    project: "Westlands Civic Centre",
    projectType: "Public Buildings",
    initials: "NCC",
    accentColor: "#2e7d5e",
  },
  {
    id: 4,
    quote: "We've engaged Spacemine across four separate contracts now. The consistency is remarkable — same quality, same rigour, same people. That is very rare in this industry.",
    author: "Otieno Mboya",
    title: "Head of Capital Projects",
    organisation: "Kenya Power",
    project: "Substations Programme 2022–24",
    projectType: "Energy Infrastructure",
    initials: "KP",
    accentColor: "#7a3d8f",
  },
  {
    id: 5,
    quote: "Spacemine's ISO-aligned processes gave our board confidence from day one. The documentation, reporting, and site management were all exemplary. We'll be working with them again.",
    author: "Amina Farah",
    title: "Programme Director",
    organisation: "KETRACO",
    project: "Northern Corridor Transmission Line",
    projectType: "Transmission & Grid",
    initials: "KET",
    accentColor: "#c0392b",
  },
];

// Client logos (text-based placeholders — swap for <img> when real logos available)
const LOGOS = REVIEWS.map(r => ({ initials: r.initials, organisation: r.organisation, accentColor: r.accentColor }));

// ─── Star rating display ───────────────────────────────────────────────────────
function Stars({ count = 5, color }) {
  return (
    <div aria-label={`${count} out of 5 stars`} style={{ display: "flex", gap: 4 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill={i < count ? color : "none"} stroke={color} strokeWidth="1.2" aria-hidden="true">
          <polygon points="7,1 8.8,5.3 13.5,5.7 10,8.8 11.1,13.4 7,10.8 2.9,13.4 4,8.8 0.5,5.7 5.2,5.3" />
        </svg>
      ))}
    </div>
  );
}

// ─── Animated quote text (word-by-word fade in) ────────────────────────────────
function AnimatedQuote({ text, isActive, accent }) {
  const words = text.split(" ");
  return (
    <blockquote
      style={{ margin: 0, padding: 0, fontStyle: "normal" }}
      aria-live="polite"
    >
      <p style={{
        fontFamily: FONT.heading,
        fontSize: "clamp(18px, 2.4vw, 30px)",
        fontWeight: 700,
        color: BRAND.dark,
        lineHeight: 1.45,
        letterSpacing: "-0.01em",
        margin: 0,
      }}>
        <span aria-hidden="true" style={{ color: accent, fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 0.6, verticalAlign: "bottom", marginRight: 4, fontFamily: "Georgia, serif", opacity: 0.9 }}>"</span>
        {words.map((word, i) => (
          <span
            key={`${text.slice(0, 8)}-${i}`}
            style={{
              display: "inline-block",
              opacity: isActive ? 1 : 0,
              transform: isActive ? "translateY(0)" : "translateY(6px)",
              transition: isActive
                ? `opacity 0.4s ease ${0.05 + i * 0.018}s, transform 0.4s ease ${0.05 + i * 0.018}s`
                : "none",
              marginRight: "0.28em",
            }}
          >
            {word}
          </span>
        ))}
        <span aria-hidden="true" style={{ color: accent, fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 0.6, verticalAlign: "bottom", marginLeft: 2, fontFamily: "Georgia, serif", opacity: 0.9 }}>"</span>
      </p>
    </blockquote>
  );
}

// ─── Progress bar (auto-rotate timer) ─────────────────────────────────────────
function ProgressBar({ duration, isRunning, accent, onComplete }) {
  const barRef = useRef(null);

  useEffect(() => {
    if (!barRef.current) return;
    barRef.current.style.transition = "none";
    barRef.current.style.width = "0%";
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!barRef.current) return;
        barRef.current.style.transition = isRunning
          ? `width ${duration}ms linear`
          : "none";
        barRef.current.style.width = isRunning ? "100%" : "0%";
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [isRunning, duration]);

  return (
    <div style={{ height: 2, background: "rgba(0,0,0,0.08)", borderRadius: 1, overflow: "hidden", flex: 1 }}>
      <div
        ref={barRef}
        onTransitionEnd={onComplete}
        style={{ height: "100%", width: "0%", background: accent, borderRadius: 1 }}
      />
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export function Reviews() {
  const [active, setActive]       = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef                = useRef(null);
  const DURATION                  = 7000;

  const current = REVIEWS[active];

  // Intersection observer — start playing when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setIsPlaying(true);
        } else {
          setIsPlaying(false);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const go = useCallback((dir) => {
    setActive(prev => (prev + dir + REVIEWS.length) % REVIEWS.length);
    setIsPlaying(true);
  }, []);

  const goTo = useCallback((i) => {
    setActive(i);
    setIsPlaying(true);
  }, []);

  // Keyboard nav
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft")  go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go]);

  return (
    <section
      ref={sectionRef}
      id="reviews"
      aria-labelledby="reviews-heading"
      itemScope
      itemType="https://schema.org/Organization"
      style={{ background: BRAND.white, padding: SECTION_PAD, position: "relative", overflow: "hidden" }}
    >
      {/* Decorative background mark */}
      <div aria-hidden="true" style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(600px, 80vw)",
        height: "min(600px, 80vw)",
        borderRadius: "50%",
        border: `1px solid rgba(0,0,0,0.04)`,
        pointerEvents: "none",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(900px, 120vw)",
        height: "min(900px, 120vw)",
        borderRadius: "50%",
        border: `1px solid rgba(0,0,0,0.03)`,
        pointerEvents: "none",
      }} />
      {/* Subtle accent wash behind quote */}
      <div aria-hidden="true" style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${current.accentColor}06 0%, transparent 70%)`,
        transition: "background 0.8s ease",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: MAX_WIDTH, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: "clamp(40px, 5vw, 72px)" }}>
          <SectionLabel>Client Reviews</SectionLabel>
          <h2
            id="reviews-heading"
            style={{
              fontFamily: FONT.heading,
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              color: BRAND.dark,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginTop: 10,
            }}
          >
            Trusted by Kenya's<br />
            <span style={{ color: current.accentColor, transition: "color 0.5s ease" }}>Leading Organisations</span>
          </h2>
        </div>

        {/* ── Quote stage ── */}
        <div
          style={{
            maxWidth: 820,
            margin: "0 auto",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          {/* Project tag */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 28,
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.5s ease 0.1s",
          }}>
            <div style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              background: current.accentColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "background 0.5s ease",
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ fontFamily: FONT.body, fontSize: 12, color: BRAND.gray, letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>
              {current.projectType} · {current.project}
            </span>
          </div>

          {/* The quote */}
          <AnimatedQuote text={current.quote} isActive={isVisible} accent={current.accentColor} key={active} />

          {/* Attribution */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 36,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s",
          }}>
            {/* Avatar */}
            <div style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${current.accentColor}22, ${current.accentColor}0a)`,
              border: `2px solid ${current.accentColor}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "border-color 0.5s ease, background 0.5s ease",
            }}>
              <span style={{ fontFamily: FONT.heading, fontSize: 14, fontWeight: 800, color: current.accentColor, transition: "color 0.5s ease" }}>
                {current.author.split(" ").map(n => n[0]).join("")}
              </span>
            </div>

            <div>
              <div style={{ fontFamily: FONT.heading, fontSize: 15, fontWeight: 700, color: BRAND.dark }}>
                {current.author}
              </div>
              <div style={{ fontFamily: FONT.body, fontSize: 13, color: BRAND.gray, marginTop: 2 }}>
                {current.title}, <span style={{ color: current.accentColor, fontWeight: 600, transition: "color 0.5s ease" }}>{current.organisation}</span>
              </div>
            </div>

            {/* Stars — right-aligned */}
            <div style={{ marginLeft: "auto" }}>
              <Stars count={5} color={current.accentColor} />
            </div>
          </div>

          {/* ── Controls row ── */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 40,
            paddingTop: 28,
            borderTop: `1px solid ${BRAND.lightgray}`,
          }}>
            {/* Prev */}
            <button
              onClick={() => go(-1)}
              aria-label="Previous review"
              style={{
                width: 40, height: 40, borderRadius: "50%",
                background: BRAND.offwhite, border: `1px solid ${BRAND.lightgray}`,
                color: BRAND.dark, cursor: "pointer", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, transition: "background 0.18s, border-color 0.18s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#e2dfd9"; e.currentTarget.style.borderColor = current.accentColor; }}
              onMouseLeave={e => { e.currentTarget.style.background = BRAND.offwhite; e.currentTarget.style.borderColor = BRAND.lightgray; }}
            >←</button>

            {/* Progress indicators */}
            <div style={{ flex: 1, display: "flex", gap: 8, alignItems: "center" }}>
              {REVIEWS.map((r, i) => (
                <button
                  key={r.id}
                  onClick={() => goTo(i)}
                  aria-label={`Review by ${r.author}`}
                  aria-current={i === active ? "true" : undefined}
                  style={{
                    flex: i === active ? 3 : 1,
                    height: 28,
                    padding: "13px 0",
                    display: "flex", alignItems: "center",
                    background: "transparent", border: "none", cursor: "pointer",
                    transition: "flex 0.35s ease",
                  }}
                >
                  {i === active ? (
                    <ProgressBar
                      duration={DURATION}
                      isRunning={isPlaying}
                      accent={current.accentColor}
                      onComplete={() => go(1)}
                    />
                  ) : (
                    <div style={{ height: 2, width: "100%", background: i < active ? current.accentColor : "rgba(0,0,0,0.1)", borderRadius: 1, opacity: i < active ? 0.4 : 1 }} />
                  )}
                </button>
              ))}
            </div>

            {/* Counter */}
            <span style={{ fontFamily: FONT.heading, fontSize: 12, fontWeight: 700, color: BRAND.gray, letterSpacing: "0.06em", flexShrink: 0 }}>
              <span style={{ color: current.accentColor, transition: "color 0.5s ease" }}>{String(active + 1).padStart(2, "0")}</span>
              {" / "}
              {String(REVIEWS.length).padStart(2, "0")}
            </span>

            {/* Pause / Play */}
            <button
              onClick={() => setIsPlaying(p => !p)}
              aria-label={isPlaying ? "Pause auto-rotation" : "Resume auto-rotation"}
              style={{
                width: 40, height: 40, borderRadius: "50%",
                background: BRAND.offwhite, border: `1px solid ${BRAND.lightgray}`,
                color: BRAND.dark, cursor: "pointer", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.18s, border-color 0.18s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#e2dfd9"; e.currentTarget.style.borderColor = current.accentColor; }}
              onMouseLeave={e => { e.currentTarget.style.background = BRAND.offwhite; e.currentTarget.style.borderColor = BRAND.lightgray; }}
            >
              {isPlaying ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><rect x="2" y="1" width="3" height="10" rx="1"/><rect x="7" y="1" width="3" height="10" rx="1"/></svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M3 2l7 4-7 4V2z"/></svg>
              )}
            </button>

            {/* Next */}
            <button
              onClick={() => go(1)}
              aria-label="Next review"
              style={{
                width: 40, height: 40, borderRadius: "50%",
                background: BRAND.offwhite, border: `1px solid ${BRAND.lightgray}`,
                color: BRAND.dark, cursor: "pointer", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, transition: "background 0.18s, border-color 0.18s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#e2dfd9"; e.currentTarget.style.borderColor = current.accentColor; }}
              onMouseLeave={e => { e.currentTarget.style.background = BRAND.offwhite; e.currentTarget.style.borderColor = BRAND.lightgray; }}
            >→</button>
          </div>
        </div>

        {/* ── Logo strip ── */}
        <div
          aria-label="Client organisations"
          style={{
            marginTop: "clamp(48px, 6vw, 88px)",
            paddingTop: 32,
            borderTop: `1px solid ${BRAND.lightgray}`,
            display: "flex",
            alignItems: "center",
            gap: "clamp(16px, 3vw, 40px)",
            flexWrap: "wrap",
            justifyContent: "center",
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.8s ease 0.4s",
          }}
        >
          <span style={{ fontFamily: FONT.body, fontSize: 11, color: BRAND.gray, letterSpacing: "0.08em", textTransform: "uppercase", flexShrink: 0 }}>
            Trusted by
          </span>
          {LOGOS.map((logo, i) => (
            <div
              key={logo.initials}
              aria-label={logo.organisation}
              title={logo.organisation}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                opacity: i === active ? 1 : 0.45,
                transform: i === active ? "scale(1.04)" : "scale(1)",
                transition: "opacity 0.4s ease, transform 0.4s ease",
                cursor: "pointer",
              }}
              onClick={() => goTo(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") goTo(i); }}
            >
              {/* Logo placeholder — replace with <img> when logos available */}
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: i === active ? logo.accentColor : BRAND.offwhite,
                border: `1px solid ${i === active ? logo.accentColor : BRAND.lightgray}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.4s ease, border-color 0.4s ease",
                flexShrink: 0,
              }}>
                <span style={{
                  fontFamily: FONT.heading,
                  fontSize: 9,
                  fontWeight: 800,
                  color: i === active ? "#fff" : BRAND.gray,
                  letterSpacing: "0.04em",
                  transition: "color 0.4s ease",
                }}>{logo.initials}</span>
              </div>
              <span style={{
                fontFamily: FONT.body,
                fontSize: 12,
                fontWeight: 600,
                color: i === active ? BRAND.dark : BRAND.gray,
                transition: "color 0.4s ease",
                whiteSpace: "nowrap",
              }}>{logo.organisation}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #reviews .logo-strip { gap: 12px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          #reviews *, #reviews *::before, #reviews *::after {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}