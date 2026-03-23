import { useRef, useEffect, useState } from "react";
import { BRAND, FONT, MAX_WIDTH, ENVIRONMENT_CARDS } from "../../shared/constants";
import { Icon } from "../common/Icon";

// ─── Black hole image — swap path for your preferred image ────────────────────
// Use either of the two images shared. Recommended: the NASA orange-ring one.
// Place it at /assets/blackhole.jpg or update the path below.
const BH_IMAGE = "/assets/images/blackhole.png";

// ─── Single card with scroll-driven reveal ────────────────────────────────────
function EnvCard({ card, index, scrollProgress }) {
  // Each card enters at a different scroll threshold, staggered
  const threshold = 0.15 + index * 0.18;
  const entered   = scrollProgress > threshold;
  const delay     = index * 0.08;

  return (
    <div
      style={{
        textAlign: "center",
        padding: "clamp(28px,4vw,48px) clamp(20px,3vw,32px)",
        borderRadius: 12,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 8px 48px rgba(0,0,0,0.6)",
        opacity: entered ? 1 : 0,
        transform: entered ? "translateY(0) scale(1)" : "translateY(32px) scale(0.96)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        willChange: "opacity, transform",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle orange glow behind icon */}
      <div aria-hidden="true" style={{
        position: "absolute",
        top: -20, left: "50%", transform: "translateX(-50%)",
        width: 120, height: 120,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${BRAND.orange}18 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      {/* Icon */}
      <div style={{
        color: BRAND.orange,
        marginBottom: 20,
        display: "flex",
        justifyContent: "center",
        position: "relative",
      }}>
        <Icon paths={card.icon} size={28} />
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: FONT.heading,
        fontSize: "clamp(14px, 1.6vw, 17px)",
        fontWeight: 700,
        color: "#fff",
        marginBottom: 12,
        letterSpacing: "-0.01em",
        lineHeight: 1.2,
      }}>{card.title}</h3>

      {/* Body */}
      <p style={{
        fontFamily: FONT.body,
        fontSize: "clamp(13px, 1.2vw, 14px)",
        color: "rgba(255,255,255,0.5)",
        lineHeight: 1.75,
        margin: 0,
      }}>{card.body}</p>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function Environment() {
  const sectionRef    = useRef(null);
  const [progress, setProgress] = useState(0); // 0→1 as section scrolls through viewport
  const [zoom, setZoom]         = useState(1);  // parallax scale on the bg image

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect    = el.getBoundingClientRect();
      const vh      = window.innerHeight;
      const total   = el.offsetHeight + vh;
      // progress: 0 when section top hits bottom of viewport, 1 when section bottom hits top
      const raw     = (vh - rect.top) / total;
      const clamped = Math.max(0, Math.min(1, raw));

      setProgress(clamped);

      // Zoom: starts at 1.08 (slightly zoomed), pulls to 1.22 at deepest scroll
      // Gives the "falling in" sensation
      setZoom(1.08 + clamped * 0.18);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Vignette deepens as you scroll deeper in
  const vignetteOpacity = 0.55 + progress * 0.35;

  // Section heading reveals at progress > 0.05
  const headerVisible = progress > 0.05;

  return (
    <section
      ref={sectionRef}
      id="environment"
      aria-labelledby="env-heading"
      style={{
        position: "relative",
        padding: "clamp(80px, 10vw, 140px) 24px",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      {/* ── Fixed-feel background: black hole image ── */}
      {/* Using position:sticky on a pseudo-layer gives a parallax feel
          without the jank of background-attachment:fixed on mobile */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-10%",          // oversized so zoom never shows edges
          zIndex: 0,
          backgroundImage: `url(${BH_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          transform: `scale(${zoom})`,
          transition: "transform 0.05s linear",
          willChange: "transform",
          filter: "brightness(0.7) saturate(1.2)",
        }}
      />

      {/* ── Deep vignette — pulls the eye to centre, deepens on scroll ── */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: `radial-gradient(ellipse 70% 70% at 50% 50%,
          transparent 0%,
          rgba(0,0,0,${(vignetteOpacity * 0.4).toFixed(2)}) 50%,
          rgba(0,0,0,${vignetteOpacity.toFixed(2)}) 100%)`,
        transition: "background 0.1s linear",
      }} />

      {/* ── Top fade: blends with section above ── */}
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "18%", zIndex: 2, pointerEvents: "none",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 100%)",
      }} />

      {/* ── Bottom fade: blends with section below ── */}
      <div aria-hidden="true" style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "18%", zIndex: 2, pointerEvents: "none",
        background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)",
      }} />

      {/* ── Subtle gravitational ring overlay ── */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background: `radial-gradient(ellipse 90% 30% at 50% 50%,
          ${BRAND.orange}08 0%,
          transparent 60%)`,
        transform: `scaleY(${0.8 + progress * 0.4})`,
        transition: "transform 0.1s linear",
      }} />

      {/* ── Content ── */}
      <div style={{ maxWidth: MAX_WIDTH, margin: "0 auto", position: "relative", zIndex: 10 }}>

        {/* Section header */}
        <div style={{
          textAlign: "center",
          marginBottom: "clamp(40px, 6vw, 72px)",
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          {/* Eyebrow */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            marginBottom: 16,
          }}>
            <div style={{ width: 24, height: 1, background: BRAND.orange }} />
            <span style={{
              fontFamily: FONT.body, fontSize: 11, fontWeight: 700,
              color: BRAND.orange, letterSpacing: "0.18em", textTransform: "uppercase",
            }}>Our Values</span>
            <div style={{ width: 24, height: 1, background: BRAND.orange }} />
          </div>

          <h2
            id="env-heading"
            style={{
              fontFamily: FONT.heading,
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              margin: 0,
              textShadow: "0 2px 24px rgba(0,0,0,0.8)",
            }}
          >
            Built on Principles.<br />
            <span style={{ color: BRAND.orange }}>Driven by Purpose.</span>
          </h2>

          <p style={{
            fontFamily: FONT.body,
            fontSize: "clamp(14px, 1.4vw, 16px)",
            color: "rgba(255,255,255,0.45)",
            marginTop: 16,
            maxWidth: 480,
            margin: "16px auto 0",
            lineHeight: 1.7,
            textShadow: "0 1px 8px rgba(0,0,0,0.9)",
          }}>
            The commitments that guide every decision we make on site and in the boardroom.
          </p>
        </div>

        {/* Cards grid */}
        <div
          className="env-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(16px, 2vw, 28px)",
          }}
        >
          {ENVIRONMENT_CARDS.map((card, i) => (
            <EnvCard
              key={card.title}
              card={card}
              index={i}
              scrollProgress={progress}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .env-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 1024px) and (min-width: 769px) {
          .env-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          #environment * {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}