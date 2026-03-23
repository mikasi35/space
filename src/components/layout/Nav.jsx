import { useState, useEffect } from "react";
import { BRAND, FONT, NAV_LINKS } from "../../shared/constants";

// ─── Miniature Jet Button ─────────────────────────────────────────────────────
// Same DNA as the Projects CTA — guard flips open, ignition fires, status strip —
// but scaled to fit a 68px navbar. Width 148px × height 38px.
function NavJetButton() {
  const [hovered, setHovered] = useState(false);
  const [firing, setFiring]   = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (firing) return;
    setFiring(true);
    setTimeout(() => {
      setFiring(false);
      window.location.href = "#contact";
    }, 480);
  };

  return (
    <a
      href="#contact"
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Get a quote — ignite your project"
      style={{
        position: "relative",
        display: "inline-flex",
        width: 148,
        height: 38,
        textDecoration: "none",
        cursor: firing ? "default" : "pointer",
        flexShrink: 0,
      }}
    >
      {/* ── Outer shell ── */}
      <div style={{
        position: "absolute", inset: 0,
        borderRadius: 4,
        background: "#111",
        border: `1px solid ${hovered || firing ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)"}`,
        overflow: "hidden",
        transition: "border-color 0.2s",
      }}>
        {/* Corner brackets */}
        {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h]) => (
          <div key={`${v}${h}`} aria-hidden="true" style={{
            position: "absolute",
            [v]: 5, [h]: 5,
            width: 7, height: 7,
            borderColor: "rgba(255,255,255,0.18)",
            borderStyle: "solid",
            borderWidth: v === "top"    && h === "left"  ? "1px 0 0 1px"
                       : v === "top"    && h === "right" ? "1px 1px 0 0"
                       : v === "bottom" && h === "left"  ? "0 0 1px 1px"
                       : "0 1px 1px 0",
          }} />
        ))}

        {/* LED — top-right, pulses when hovered */}
        <div aria-hidden="true" style={{
          position: "absolute", top: 6, right: 6,
          width: 5, height: 5, borderRadius: "50%",
          background: hovered || firing ? BRAND.orange : "rgba(255,255,255,0.15)",
          transition: "background 0.25s",
          animation: hovered && !firing ? "navLedPulse 1.6s ease-in-out infinite" : "none",
        }} />

        {/* ── Guard cover — flips up on hover ── */}
        <div style={{
          position: "absolute", inset: 0,
          background: BRAND.orange,
          borderRadius: 4,
          transformOrigin: "top center",
          transform: hovered || firing ? "rotateX(-108deg)" : "rotateX(0deg)",
          transition: "transform 0.36s cubic-bezier(0.25,0.46,0.45,0.94)",
          display: "flex", alignItems: "center", justifyContent: "center",
          border: `1px solid #a03a0a`,
          perspective: "300px",
          backfaceVisibility: "hidden",
          zIndex: 2,
        }}>
          <span style={{
            fontFamily: FONT.body,
            fontSize: 8, fontWeight: 700,
            color: "rgba(255,255,255,0.8)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}>Lift to launch</span>
        </div>

        {/* ── Ignition face — revealed under guard ── */}
        <div style={{
          position: "absolute", inset: 3,
          borderRadius: 1,
          background: "#0d0d0d",
          border: "1px solid rgba(255,255,255,0.06)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 2, zIndex: 1,
        }}>
          <span style={{
            fontFamily: FONT.heading,
            fontSize: 11, fontWeight: 500,
            color: "#fff",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            lineHeight: 1,
            transition: "color 0.2s",
          }}>Get a Quote</span>
          
        </div>

        {/* ── Fire sweep — scaleY from bottom on click ── */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: 4,
          background: BRAND.red,
          zIndex: 5,
          transformOrigin: "bottom center",
          transform: firing ? "scaleY(1)" : "scaleY(0)",
          transition: firing
            ? "transform 0.18s ease-out"
            : "transform 0.22s ease-in",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{
            fontFamily: FONT.body,
            fontSize: 9, fontWeight: 700,
            color: "#fff", letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: firing ? 1 : 0,
            transition: "opacity 0.08s 0.1s",
          }}>Launching…</span>
        </div>
      </div>

      <style>{`
        @keyframes navLedPulse {
          0%,100% { opacity:1; }
          50%      { opacity:0.25; }
        }
      `}</style>
    </a>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const linkColor = scrolled ? BRAND.dark : BRAND.white;

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.08)" : "none",
      transition: "all 0.4s ease", padding: "0 24px",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", height: 68,
      }}>

        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img
            src="/assets/logo.png"
            alt="Spacemine Holdings Limited"
            style={{ height: 40, width: "auto", display: "block", transition: "opacity 0.3s" }}
          />
        </a>

        {/* Desktop nav */}
        <div className="sm-desktop-nav" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV_LINKS.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{
                fontFamily: FONT.heading, fontSize: 13, fontWeight: 500,
                color: linkColor, textDecoration: "none",
                letterSpacing: "0.02em", transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.target.style.color = BRAND.orange)}
              onMouseLeave={e => (e.target.style.color = linkColor)}
            >{l}</a>
          ))}

          {/* ── THE JET BUTTON ── */}
          <NavJetButton />
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="sm-hamburger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "none" }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke={scrolled ? BRAND.dark : BRAND.white}
            strokeWidth="2" strokeLinecap="round"
          >
            {open
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
            }
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div style={{
          background: "#fff",
          borderTop: `1px solid ${BRAND.lightgray}`,
          padding: "16px 24px 24px",
        }}>
          {NAV_LINKS.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
              style={{
                display: "block", fontFamily: FONT.heading,
                fontSize: 15, fontWeight: 500, color: BRAND.dark,
                textDecoration: "none", padding: "10px 0",
                borderBottom: `1px solid ${BRAND.lightgray}`,
              }}
            >{l}</a>
          ))}
          {/* Mobile CTA — plain orange pill (jet button needs hover, awkward on touch) */}
          <a href="#contact" onClick={() => setOpen(false)}
            style={{
              display: "block", marginTop: 16,
              background: BRAND.orange, color: "#fff",
              textAlign: "center", padding: "13px 0",
              borderRadius: 4, fontFamily: FONT.heading,
              fontSize: 14, fontWeight: 400,
              textDecoration: "none", letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >Get a Quote</a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .sm-desktop-nav { display: none !important; }
          .sm-hamburger   { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}