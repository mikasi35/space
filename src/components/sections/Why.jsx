import { useRef, useEffect, useState } from "react";
import { BRAND, FONT, SECTION_PAD, MAX_WIDTH } from "../../shared/constants";
import { SectionLabel } from "../common/SectionLabel";

// ─── Differentiator data (drawn from company profile) ─────────────────────────
const DIFFERENTIATORS = [
  {
    num: "01",
    title: "Government-Compliant by Default",
    proof: "All works fully adhere to Kenya's statutory, regulatory, and ISO-aligned standards — no exceptions, no shortcuts.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Fast Delivery Systems",
    proof: "Detailed project plans, up-to-date estimating software, and a culture of proactive resourcing keep every site on schedule.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "Cost-Efficient Engineering",
    proof: "Organic growth funded by reinvested earnings — we run lean, pass savings on, and never sacrifice quality for margin.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    num: "04",
    title: "Scalable Developments",
    proof: "From single boreholes to multi-MW solar farms and full road programmes — our systems and teams scale to match any scope.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    num: "05",
    title: "BBBEE Committed",
    proof: "Actively advancing equity, diversity, and skills development across all operations — not just on paper.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    num: "06",
    title: "Zero-LTI Safety Culture",
    proof: "Eight consecutive years without a lost-time incident across all sites — safety is a standard, not a target.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
];

// ─── Single differentiator row ─────────────────────────────────────────────────
function DiffRow({ item, index, visible }) {
  const [hovered, setHovered] = useState(false);
  const delay = index * 0.07;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 20,
        padding: "18px 0",
        borderBottom: `1px solid rgba(255,255,255,0.07)`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(20px)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
        cursor: "default",
      }}
    >
      {/* Number */}
      <span style={{
        fontFamily: FONT.heading,
        fontSize: 11,
        fontWeight: 800,
        color: hovered ? BRAND.orange : "rgba(255,255,255,0.2)",
        letterSpacing: "0.06em",
        flexShrink: 0,
        width: 24,
        paddingTop: 2,
        transition: "color 0.25s ease",
      }}>{item.num}</span>

      {/* Icon */}
      <div style={{
        color: hovered ? BRAND.orange : "rgba(255,255,255,0.3)",
        flexShrink: 0,
        paddingTop: 1,
        transition: "color 0.25s ease",
      }}>{item.icon}</div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: FONT.heading,
          fontSize: "clamp(13px, 1.4vw, 15px)",
          fontWeight: 700,
          color: hovered ? "#fff" : "rgba(255,255,255,0.85)",
          letterSpacing: "-0.01em",
          marginBottom: 4,
          transition: "color 0.25s ease",
        }}>{item.title}</div>
        <div style={{
          fontFamily: FONT.body,
          fontSize: "clamp(12px, 1.1vw, 13px)",
          color: "rgba(255,255,255,0.4)",
          lineHeight: 1.65,
          transition: "color 0.25s ease",
        }}>{item.proof}</div>
      </div>

      {/* Hover arrow */}
      <div style={{
        color: BRAND.orange,
        flexShrink: 0,
        opacity: hovered ? 1 : 0,
        transform: hovered ? "translateX(0)" : "translateX(-6px)",
        transition: "opacity 0.2s ease, transform 0.2s ease",
        paddingTop: 2,
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function WhySpacemine() {
  const sectionRef = useRef(null);
  const [visible, setVisible]   = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why"
      aria-labelledby="why-heading"
      style={{ background: BRAND.dark, padding: SECTION_PAD, overflow: "hidden" }}
    >
      <div style={{ maxWidth: MAX_WIDTH, margin: "0 auto" }}>
        <div
          className="why-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(40px, 6vw, 96px)",
            alignItems: "start",
          }}
        >

          {/* ── LEFT: Image panel ── */}
          <div style={{
            position: "sticky",
            top: 100,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}>
            {/* Image container */}
            <div style={{
              borderRadius: 12,
              overflow: "hidden",
              position: "relative",
              aspectRatio: "4/5",
              background: "#1a1a1a",
            }}>
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=1000&fit=crop&auto=format&q=75"
                alt="Spacemine Holdings construction site — Kenya infrastructure project"
                loading="lazy"
                decoding="async"
                width="800"
                height="1000"
                onLoad={() => setImgLoaded(true)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  filter: "brightness(0.55) contrast(1.1) saturate(0.8)",
                  opacity: imgLoaded ? 1 : 0,
                  transition: "opacity 0.6s ease",
                }}
              />

              {/* Gradient overlay */}
              <div aria-hidden="true" style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(to top, ${BRAND.dark} 0%, rgba(10,10,11,0.3) 50%, transparent 100%)`,
              }} />

              {/* Floating stat card */}
              <div style={{
                position: "absolute",
                bottom: 28,
                left: 28,
                right: 28,
                background: "rgba(10,10,11,0.75)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "20px 24px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 16,
              }}>
                {[
                  { value: "10+", label: "Years" },
                  { value: "98%", label: "On Time" },
                  { value: "0 LTI", label: "8 Yrs" },
                ].map(stat => (
                  <div key={stat.label} style={{ textAlign: "center" }}>
                    <div style={{
                      fontFamily: FONT.heading,
                      fontSize: "clamp(18px, 2vw, 24px)",
                      fontWeight: 900,
                      color: BRAND.orange,
                      lineHeight: 1,
                      marginBottom: 4,
                    }}>{stat.value}</div>
                    <div style={{
                      fontFamily: FONT.body,
                      fontSize: 10,
                      color: "rgba(255,255,255,0.4)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Orange top accent */}
              <div aria-hidden="true" style={{
                position: "absolute", top: 0, left: 0, right: 0,
                height: 3, background: BRAND.orange,
              }} />
            </div>
          </div>

          {/* ── RIGHT: Differentiators ── */}
          <div>
            {/* Header */}
            <div style={{
              marginBottom: "clamp(28px, 3vw, 40px)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}>
              <SectionLabel>Why Spacemine</SectionLabel>
              <h2
                id="why-heading"
                style={{
                  fontFamily: FONT.heading,
                  fontSize: "clamp(28px, 4vw, 48px)",
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                  marginTop: 10,
                  marginBottom: 0,
                }}
              >
                What Sets Us<br />
                <span style={{ color: BRAND.orange }}>Apart from the Rest</span>
              </h2>
              <p style={{
                fontFamily: FONT.body,
                fontSize: "clamp(13px, 1.3vw, 15px)",
                color: "rgba(255,255,255,0.4)",
                marginTop: 16,
                lineHeight: 1.75,
                maxWidth: 420,
              }}>
                A decade of delivering Kenya's infrastructure — the numbers, the people, and the systems that make the difference.
              </p>
            </div>

            {/* Differentiator rows */}
            <div role="list" aria-label="Spacemine differentiators">
              {DIFFERENTIATORS.map((item, i) => (
                <div key={item.num} role="listitem">
                  <DiffRow item={item} index={i} visible={visible} />
                </div>
              ))}
            </div>

            {/* Bottom CTA link */}
            <div style={{
              marginTop: 32,
              opacity: visible ? 1 : 0,
              transition: "opacity 0.5s ease 0.5s",
            }}>
              <a
                href="#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: FONT.heading,
                  fontSize: 12,
                  fontWeight: 700,
                  color: BRAND.orange,
                  textDecoration: "none",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  borderBottom: `1px solid ${BRAND.orange}40`,
                  paddingBottom: 2,
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = BRAND.orange}
                onMouseLeave={e => e.currentTarget.style.borderColor = `${BRAND.orange}40`}
              >
                Start a project with us
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .why-grid {
            grid-template-columns: 1fr !important;
          }
          .why-grid > div:first-child {
            position: static !important;
            aspect-ratio: 16/9 !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          #why *, #why *::before, #why *::after {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}