import { useState, useRef, useEffect } from "react";
import { BRAND, FONT, SECTION_PAD, MAX_WIDTH } from "../../shared/constants";
import { SectionLabel } from "../common/SectionLabel";

// ─── Partner types ────────────────────────────────────────────────────────────
const PARTNERS = [
  {
    id: "gov",
    label: "Government Agencies",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 22V12M21 22V12M12 22V6M12 6l9 6H3l9-6z"/><line x1="3" y1="22" x2="21" y2="22"/>
      </svg>
    ),
    desc: "County and national government bodies seeking compliant, proven contractors for public infrastructure.",
    tags: ["Roads & Bridges", "Public Buildings", "Water Systems"],
  },
  {
    id: "inv",
    label: "Private Investors",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
    desc: "Real estate developers, infrastructure funds, and private equity seeking scalable construction partnerships in Kenya.",
    tags: ["Residential Dev", "Commercial", "Energy Projects"],
  },
  {
    id: "ngo",
    label: "NGOs & Development Bodies",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    desc: "Development organisations funding community water, schools, and rural electrification across the region.",
    tags: ["Water Access", "Schools", "Solar Pumping"],
  },
  {
    id: "sub",
    label: "Subcontractors & Suppliers",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
    desc: "Specialist trades, material suppliers, and equipment providers who meet our quality and compliance standards.",
    tags: ["Civil Works", "Electrical", "Materials Supply"],
  },
];

// ─── Jet Button (same as Nav/Projects — self-contained) ───────────────────────
function JetButton({ href, label = "Get a Quote", sub = "Ignite your project", size = "large" }) {
  const [hovered, setHovered] = useState(false);
  const [firing, setFiring]   = useState(false);

  const isLarge = size === "large";
  const W = isLarge ? 220 : 196;
  const H = isLarge ? 76 : 68;

  const handleClick = (e) => {
    e.preventDefault();
    if (firing) return;
    setFiring(true);
    setTimeout(() => {
      setFiring(false);
      window.location.href = href;
    }, 500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, flexShrink: 0 }}>
      <a
        href={href}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={`${label} — ignite your project`}
        role="button"
        style={{ position: "relative", display: "block", width: W, height: H, textDecoration: "none", cursor: firing ? "default" : "pointer" }}
      >
        <div style={{
          position: "absolute", inset: 0,
          background: "#111",
          border: `1px solid ${hovered ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.1)"}`,
          borderRadius: 6,
          overflow: "hidden",
          transition: "border-color 0.2s",
        }}>
          {/* Corner brackets */}
          {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h]) => (
            <div key={`${v}${h}`} aria-hidden="true" style={{
              position: "absolute", [v]: 7, [h]: 7,
              width: 10, height: 10,
              borderColor: "rgba(255,255,255,0.14)",
              borderStyle: "solid",
              borderWidth: v==="top"&&h==="left" ? "1px 0 0 1px"
                         : v==="top"&&h==="right" ? "1px 1px 0 0"
                         : v==="bottom"&&h==="left" ? "0 0 1px 1px" : "0 1px 1px 0",
            }} />
          ))}

          {/* LED */}
          <div aria-hidden="true" style={{
            position: "absolute", top: 9, right: 9,
            width: 6, height: 6, borderRadius: "50%",
            background: hovered ? BRAND.orange : "rgba(255,255,255,0.15)",
            transition: "background 0.25s",
            animation: hovered && !firing ? "jetLed 1.8s ease-in-out infinite" : "none",
          }} />

          {/* Guard cover */}
          <div style={{
            position: "absolute", inset: 0,
            background: BRAND.orange,
            borderRadius: 6,
            transformOrigin: "top center",
            transform: hovered || firing ? "rotateX(-112deg)" : "rotateX(0deg)",
            transition: "transform 0.38s cubic-bezier(0.25,0.46,0.45,0.94)",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: `1px solid #a03a0a`,
            perspective: "400px",
            backfaceVisibility: "hidden",
            zIndex: 2,
          }}>
            <span style={{ fontFamily: FONT.body, fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.8)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Lift to launch
            </span>
          </div>

          {/* Ignition face */}
          <div style={{
            position: "absolute", inset: 4, borderRadius: 3,
            background: "#0d0d0d",
            border: "1px solid rgba(255,255,255,0.07)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 3, zIndex: 1,
          }}>
            <span style={{ fontFamily: FONT.heading, fontSize: isLarge ? 14 : 12, fontWeight: 800, color: "#fff", letterSpacing: "0.12em", textTransform: "uppercase", lineHeight: 1 }}>
              {label}
            </span>
            <span style={{ fontFamily: FONT.body, fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {sub}
            </span>
          </div>

          {/* Fire sweep */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: 6,
            background: BRAND.red, zIndex: 5,
            transformOrigin: "bottom center",
            transform: firing ? "scaleY(1)" : "scaleY(0)",
            transition: firing ? "transform 0.18s ease-out" : "transform 0.22s ease-in",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{
              fontFamily: FONT.body, fontSize: 10, fontWeight: 700,
              color: "#fff", letterSpacing: "0.22em", textTransform: "uppercase",
              opacity: firing ? 1 : 0, transition: "opacity 0.08s 0.1s",
            }}>Launching…</span>
          </div>
        </div>
      </a>

      {/* Status strip */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{
          width: 5, height: 5, borderRadius: "50%",
          background: hovered ? BRAND.orange : firing ? "#fff" : "rgba(255,255,255,0.2)",
          transition: "background 0.25s",
          animation: hovered && !firing ? "jetLed 1.8s ease-in-out infinite" : "none",
        }} />
        <span style={{ fontFamily: FONT.body, fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {firing ? "Launching…" : hovered ? "Guard open — armed" : "Systems ready"}
        </span>
      </div>

      <style>{`@keyframes jetLed{0%,100%{opacity:1}50%{opacity:0.25}}`}</style>
    </div>
  );
}

// ─── Partner card ─────────────────────────────────────────────────────────────
function PartnerCard({ partner, index, visible }) {
  const [hovered, setHovered] = useState(false);
  const delay = 0.1 + index * 0.08;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? `${BRAND.orange}40` : "rgba(255,255,255,0.07)"}`,
        borderRadius: 10,
        padding: "clamp(20px,2.5vw,28px)",
        transition: "background 0.25s, border-color 0.25s",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transitionProperty: "background, border-color, opacity, transform",
        transitionDuration: `0.25s, 0.25s, 0.5s, 0.5s`,
        transitionDelay: `0s, 0s, ${delay}s, ${delay}s`,
        cursor: "default",
      }}
    >
      {/* Icon */}
      <div style={{
        color: hovered ? BRAND.orange : "rgba(255,255,255,0.35)",
        marginBottom: 14,
        transition: "color 0.25s",
      }}>{partner.icon}</div>

      {/* Title */}
      <div style={{
        fontFamily: FONT.heading,
        fontSize: "clamp(13px,1.4vw,15px)",
        fontWeight: 700,
        color: hovered ? "#fff" : "rgba(255,255,255,0.8)",
        marginBottom: 8,
        letterSpacing: "-0.01em",
        transition: "color 0.25s",
      }}>{partner.label}</div>

      {/* Description */}
      <p style={{
        fontFamily: FONT.body,
        fontSize: "clamp(12px,1.1vw,13px)",
        color: "rgba(255,255,255,0.4)",
        lineHeight: 1.7,
        margin: "0 0 16px",
      }}>{partner.desc}</p>

      {/* Tags */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {partner.tags.map(tag => (
          <span key={tag} style={{
            fontFamily: FONT.body,
            fontSize: 10,
            color: hovered ? BRAND.orange : "rgba(255,255,255,0.3)",
            background: hovered ? `${BRAND.orange}12` : "rgba(255,255,255,0.05)",
            border: `1px solid ${hovered ? `${BRAND.orange}30` : "rgba(255,255,255,0.08)"}`,
            borderRadius: 4,
            padding: "3px 8px",
            letterSpacing: "0.05em",
            transition: "color 0.25s, background 0.25s, border-color 0.25s",
          }}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function PartnerCTA() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="partner"
      aria-labelledby="partner-heading"
      style={{ background: BRAND.dark, padding: SECTION_PAD, overflow: "hidden" }}
    >
      <div style={{ maxWidth: MAX_WIDTH, margin: "0 auto" }}>

        {/* ── Partner section ── */}
        <div style={{ marginBottom: "clamp(64px, 8vw, 112px)" }}>

          {/* Header */}
          <div style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
            marginBottom: "clamp(36px,4vw,56px)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}>
            <div>
              <SectionLabel>Partner With Us</SectionLabel>
              <h2
                id="partner-heading"
                style={{
                  fontFamily: FONT.heading,
                  fontSize: "clamp(28px,4vw,48px)",
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                  marginTop: 10,
                  marginBottom: 0,
                }}
              >
                Built for Those Who<br />
                <span style={{ color: BRAND.orange }}>Build Kenya's Future</span>
              </h2>
            </div>
            <p style={{
              fontFamily: FONT.body,
              fontSize: "clamp(13px,1.3vw,15px)",
              color: "rgba(255,255,255,0.4)",
              maxWidth: 340,
              lineHeight: 1.75,
              margin: 0,
            }}>
              Whether you're a government agency, investor, NGO, or specialist trade — Spacemine is structured to partner at every level of the value chain.
            </p>
          </div>

          {/* Partner cards */}
          <div
            className="partner-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "clamp(12px,1.5vw,20px)",
            }}
          >
            {PARTNERS.map((p, i) => (
              <PartnerCard key={p.id} partner={p} index={i} visible={visible} />
            ))}
          </div>

          {/* Enquiry nudge */}
          <div style={{
            marginTop: 28,
            display: "flex",
            alignItems: "center",
            gap: 12,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.5s ease 0.4s",
          }}>
            <div style={{ width: 24, height: 1, background: BRAND.orange }} />
            <span style={{ fontFamily: FONT.body, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
              Partnership enquiries welcome at{" "}
              <a href="mailto:info@spacemineholdings.com" style={{ color: BRAND.orange, textDecoration: "none", fontWeight: 600 }}>
                info@spacemineholdings.com
              </a>
            </span>
          </div>
        </div>

        {/* ── CTA section ── */}
        <div
          id="cta"
          style={{
            position: "relative",
            borderRadius: 12,
            overflow: "hidden",
            padding: "clamp(48px,6vw,80px) clamp(28px,5vw,72px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "clamp(28px,4vw,48px)",
            flexWrap: "wrap",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
          }}
        >
          {/* BG layers */}
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0,
            background: "#0d0d0d",
          }} />
          {/* Orange left border */}
          <div aria-hidden="true" style={{
            position: "absolute", top: 0, left: 0, bottom: 0,
            width: 4, background: BRAND.orange,
          }} />
          {/* Hatching */}
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.018) 0,rgba(255,255,255,0.018) 1px,transparent 1px,transparent 20px)",
          }} />
          {/* Radial warm glow behind text */}
          <div aria-hidden="true" style={{
            position: "absolute", top: 0, left: 0, bottom: 0,
            width: "50%",
            background: `radial-gradient(ellipse 80% 100% at 0% 50%, ${BRAND.orange}0a 0%, transparent 70%)`,
            pointerEvents: "none",
          }} />

          {/* Text */}
          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Eyebrow */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 18,
            }}>
              <div style={{ width: 20, height: 1, background: BRAND.orange }} />
              <span style={{
                fontFamily: FONT.body, fontSize: 10, fontWeight: 700,
                color: BRAND.orange, letterSpacing: "0.18em", textTransform: "uppercase",
              }}>Next Mission</span>
            </div>

            <h2
              aria-label="Let's Build the Future Together"
              style={{
                fontFamily: FONT.heading,
                fontSize: "clamp(28px,4vw,52px)",
                fontWeight: 900,
                color: "#fff",
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                marginBottom: 16,
              }}
            >
              Let's Build the<br />
              <span style={{ color: BRAND.orange }}>Future Together</span>
            </h2>

            <p style={{
              fontFamily: FONT.body,
              fontSize: "clamp(13px,1.3vw,16px)",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.75,
              maxWidth: 440,
              margin: 0,
            }}>
              A decade of delivered infrastructure. A team built for scale. Tell us your project and we'll tell you how we can make it happen — on time, within budget, to the highest standard.
            </p>

            {/* Trust signals */}
            <div style={{
              display: "flex",
              gap: "clamp(16px,3vw,32px)",
              marginTop: 28,
              flexWrap: "wrap",
            }}>
              {[
                { value: "10+", label: "Years" },
                { value: "KSh 4.2B", label: "Delivered" },
                { value: "Zero LTI", label: "Safety Record" },
                { value: "ISO", label: "Aligned" },
              ].map(s => (
                <div key={s.label}>
                  <div style={{
                    fontFamily: FONT.heading,
                    fontSize: "clamp(16px,1.8vw,20px)",
                    fontWeight: 800,
                    color: BRAND.orange,
                    lineHeight: 1,
                    marginBottom: 3,
                  }}>{s.value}</div>
                  <div style={{
                    fontFamily: FONT.body,
                    fontSize: 10,
                    color: "rgba(255,255,255,0.3)",
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                  }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Jet button */}
          <div style={{ position: "relative", zIndex: 1, flexShrink: 0 }}>
            <JetButton href="#contact" label="Get a Quote" sub="Ignite your project" size="large" />
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .partner-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 540px) {
          .partner-grid { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          #partner *, #partner *::before, #partner *::after {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}