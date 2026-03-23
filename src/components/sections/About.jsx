import { useEffect, useRef, useState } from "react";
import { BRAND, FONT, SECTION_PAD, MAX_WIDTH } from "../../shared/constants";
import { AnimatedSection } from "../common/AnimatedSection";
import { SectionLabel } from "../common/SectionLabel";

function Tags() {
  const tags = ["Quality First", "BBBEE Committed", "Environmentally Responsible"];
  return (
    <ul aria-label="Company values" style={{ display: "flex", gap: 24, flexWrap: "wrap", listStyle: "none", padding: 0, margin: 0 }}>
      {tags.map(tag => (
        <li key={tag} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span aria-hidden="true" style={{ width: 8, height: 8, background: BRAND.orange, borderRadius: "50%", display: "inline-block", flexShrink: 0 }} />
          <span style={{ fontFamily: FONT.mono, fontSize: 8, fontWeight: 600, color: BRAND.dark, letterSpacing: "0.04em" }}>{tag}</span>
        </li>
      ))}
    </ul>
  );
}

function AnimatedStatCard() {
  const [count, setCount] = useState(1);
  const [hasStarted, setHasStarted] = useState(false);
  const cardRef = useRef(null);
  const TARGET = 10;
  const DURATION_MS = 2800;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    const startTime = performance.now();
    let raf;
    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(1 + eased * (TARGET - 1));
      setCount(current);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hasStarted]);

  const isComplete = count >= TARGET;

  return (
    <div
      ref={cardRef}
      role="img"
      aria-label={`${isComplete ? "10+" : count} years building Kenya's infrastructure`}
      style={{
        background: BRAND.gold,
        borderRadius: 8,
        padding: "40px 28px",
        gridRow: "1 / span 2",
        gridColumn: "1",
      }}
    >
      <div aria-hidden="true" style={{ fontFamily: FONT.heading, fontSize: 56, fontWeight: 800, color: "#fff", lineHeight: 1 }}>
        {count}{isComplete ? "+" : ""}
      </div>
      <div aria-hidden="true" style={{ fontFamily: FONT.body, fontSize: 15, color: "rgba(255,255,255,0.8)", marginTop: 12, lineHeight: 1.5 }}>
        Years Building Kenya's Infrastructure
      </div>
      <div aria-hidden="true" style={{ marginTop: 32, width: 40, height: 2, background: "rgba(255,255,255,0.4)" }} />
    </div>
  );
}

function Cards() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <AnimatedStatCard />

      <div style={{ background: BRAND.offwhite, borderRadius: 8, padding: "28px", border: `1px solid ${BRAND.lightgray}`, gridColumn: "2" }}>
        <div aria-hidden="true" style={{ color: BRAND.gold, marginBottom: 12 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" focusable="false">
            <title>Clock icon</title>
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <h3 style={{ fontFamily: FONT.heading, fontSize: 13, fontWeight: 700, color: BRAND.dark, margin: 0 }}>On-Time Delivery</h3>
        <p style={{ fontFamily: FONT.body, fontSize: 12, color: BRAND.gray, marginTop: 6, lineHeight: 1.5, margin: "6px 0 0" }}>
          Detailed planning ensures deadlines are met without compromise
        </p>
      </div>

      <div style={{ background: BRAND.navy, borderRadius: 8, padding: "28px", gridColumn: "2" }}>
        <div aria-hidden="true" style={{ color: BRAND.gold, marginBottom: 12 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" focusable="false">
            <title>Checkmark icon</title>
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h3 style={{ fontFamily: FONT.heading, fontSize: 13, fontWeight: 700, color: "#fff", margin: 0 }}>ISO-Aligned Standards</h3>
        <p style={{ fontFamily: FONT.body, fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 6, lineHeight: 1.5, margin: "6px 0 0" }}>
          Systems benchmarked against international best practice
        </p>
      </div>
    </div>
  );
}

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      itemScope
      itemType="https://schema.org/Organization"
      style={{ background: BRAND.white, padding: SECTION_PAD }}
    >
      <div style={{ maxWidth: MAX_WIDTH, margin: "0 auto" }}>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <AnimatedSection>
            <SectionLabel>About Us</SectionLabel>
            <h2
              id="about-heading"
              itemProp="name"
              style={{ fontFamily: FONT.heading, fontSize: "clamp(32px,4vw,48px)", fontWeight: 800, color: BRAND.dark, lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.02em" }}
            >
              Built on Trust.<br />Driven by Innovation.
            </h2>
            <p itemProp="description" style={{ fontFamily: FONT.body, fontSize: 16, color: BRAND.gray, lineHeight: 1.8, marginBottom: 20 }}>
              Incorporated in 2014, Spacemine Holdings Limited has grown into a leading engineering and construction powerhouse in Kenya — funding expansion organically through reinvested earnings.
            </p>
            <p style={{ fontFamily: FONT.body, fontSize: 16, color: BRAND.gray, lineHeight: 1.8, marginBottom: 36 }}>
              Our focus is on harnessing new talent and cutting-edge design to deliver projects that genuinely upgrade the living standards of the communities we serve.
            </p>
            <Tags />
          </AnimatedSection>
          <AnimatedSection delay={150}><Cards /></AnimatedSection>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }
        @media (prefers-reduced-motion: reduce) { .about-grid * { transition: none !important; animation: none !important; } }
      `}</style>
    </section>
  );
}