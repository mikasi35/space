import { useState, useEffect, useRef, useCallback } from "react";
import { BRAND, FONT, SECTION_PAD, MAX_WIDTH, SERVICES, SERVICE_META, ENRICHED } from "../../shared/constants";
import { SectionLabel } from "../common/SectionLabel";
import { ServiceViewer3D } from "../common/ServiceViewer3D";
import { Link } from "react-router-dom";

// ─── Detail panel (right side) ────────────────────────────────────────────────
function ServicePanel({ service, visible, onView3D }) {
  return (
    <div
      aria-live="polite"
      style={{
        flex: 1,
        minWidth: 0,
        position: "relative",
        borderRadius: 12,
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(12px)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
        background: BRAND.white,
        border: `1px solid ${BRAND.lightgray}`,
        boxShadow: "0 4px 32px rgba(0,0,0,0.07)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "clamp(140px, 18vw, 200px)", overflow: "hidden", flexShrink: 0 }}>
        <img
          key={service.id}
          src={service.photo}
          alt={`${service.title} — Spacemine Holdings`}
          loading="lazy"
          decoding="async"
          width="900"
          height="600"
          itemProp="image"
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center",
            display: "block",
            filter: "brightness(0.9) contrast(1.05) saturate(0.95)",
            animation: "imgReveal 0.5s ease forwards",
          }}
        />
        {/* Bottom fade into content */}
        <div aria-hidden="true" style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "50%",
          background: `linear-gradient(to top, ${BRAND.white} 0%, transparent 100%)`,
        }} />
        {/* Category badge */}
        <div style={{
          position: "absolute", top: 16, left: 16,
          background: BRAND.gold, color: "#fff",
          fontFamily: FONT.body, fontSize: 10, fontWeight: 700,
          letterSpacing: "0.12em", textTransform: "uppercase",
          padding: "4px 10px", borderRadius: 4,
        }}>{service.category}</div>
      </div>

      {/* Content */}
      <div style={{ padding: "clamp(16px,2vw,24px)", flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <h3
            itemProp="name"
            style={{
              fontFamily: FONT.body,
              fontSize: "clamp(18px, 2vw, 24px)",
              fontWeight: 800, color: BRAND.navy,
              letterSpacing: "-0.02em", lineHeight: 1.1,
              margin: "0 0 10px",
            }}
          >{service.title}</h3>
          <p
            itemProp="description"
            style={{
              fontFamily: FONT.body,
              fontSize: "clamp(13px, 1.3vw, 15px)",
              color: BRAND.gray, lineHeight: 1.75, margin: 0,
            }}
          >{service.desc}</p>
        </div>

        {/* Stats strip — PUBG-style stat readouts */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1,
          background: BRAND.lightgray,
          borderRadius: 8,
          overflow: "hidden",
          marginTop: "auto",
        }}>
          {service.stats.map((stat, i) => (
            <div key={stat.label} style={{
              background: i === 0 ? BRAND.offwhite : BRAND.white,
              padding: "10px 12px",
              textAlign: "center",
            }}>
              <div style={{
                fontFamily: FONT.body,
                fontSize: "clamp(16px, 2vw, 22px)",
                fontWeight: 800, color: BRAND.goldDim,
                lineHeight: 1, marginBottom: 4,
              }}>{stat.value}</div>
              <div style={{
                fontFamily: FONT.body,
                fontSize: 10, color: BRAND.gray,
                letterSpacing: "0.07em", textTransform: "uppercase",
              }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* View in 3D — same trigger as before */}
        <button
          onClick={onView3D}
          aria-label={`Explore ${service.title} in 3D`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "transparent",
            border: `1px solid ${BRAND.lightgray}`,
            borderRadius: 6,
            padding: "10px 16px",
            cursor: "pointer",
            fontFamily: FONT.heading,
            fontSize: 12,
            fontWeight: 700,
            color: BRAND.navy,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            transition: "border-color 0.2s, color 0.2s",
            width: "fit-content",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = BRAND.orange;
            e.currentTarget.style.color = BRAND.orange;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = BRAND.lightgray;
            e.currentTarget.style.color = BRAND.navy;
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
          </svg>
          Explore in 3D
        </button>

        {/* Learn More → Services page */}
        <Link
  to="/services"
  aria-label={`Learn more about ${service.title}`}
  style={{
    display: "inline-flex",
    alignItems: "right",
    gap: 6,
    fontFamily: FONT.body,
    fontSize: 12,
    fontWeight: 600,
    color: BRAND.gold,
    textDecoration: "none",
    letterSpacing: "0.04em",
    borderBottom: `1px solid ${BRAND.goldLight}`,
    paddingBottom: 1,
    transition: "color 0.2s, border-color 0.2s",
  }}
  onMouseEnter={e => {
    e.currentTarget.style.color = BRAND.navy;
    e.currentTarget.style.borderColor = BRAND.navy;
  }}
  onMouseLeave={e => {
    e.currentTarget.style.color = BRAND.gray;
    e.currentTarget.style.borderColor = BRAND.lightgray;
  }}
>
  Learn more
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
</Link>
      </div>
    </div>
  );
}

// ─── Single tab row (left selector) ──────────────────────────────────────────
function ServiceTab({ service, isActive, index, onClick }) {
  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${service.id}`}
      id={`tab-${service.id}`}
      onClick={onClick}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "clamp(10px,1.5vw,14px) clamp(12px,2vw,18px)",
        background: isActive ? BRAND.white : "transparent",
        border: "none",
        borderLeft: `3px solid ${isActive ? BRAND.navy : "transparent"}`,
        borderRadius: isActive ? "0 8px 8px 0" : 0,
        cursor: "pointer",
        textAlign: "left",
        transition: "background 0.2s, border-color 0.2s",
        boxShadow: isActive ? "0 2px 16px rgba(0,0,0,0.07)" : "none",
        position: "relative",
        zIndex: isActive ? 1 : 0,
      }}
      onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.6)"; }}
      onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
    >
      {/* Index number */}
      <span aria-hidden="true" style={{
        fontFamily: FONT.heading,
        fontSize: 18, fontWeight: 700,
        color: isActive ? BRAND.navyMid : "rgba(3, 23, 97, 0.4)",
        letterSpacing: "0.04em",
        flexShrink: 0, width: 20,
        transition: "color 0.2s",
      }}>
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Label */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: FONT.heading,
          fontSize: "clamp(12px, 1.3vw, 14px)",
          fontWeight: 700,
          color: isActive ? BRAND.navy : BRAND.gray,
          letterSpacing: "-0.01em",
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          transition: "color 0.2s",
        }}>{service.title}</div>
        <div style={{
          fontFamily: FONT.mono,
          fontSize: 10,
          color: isActive ? BRAND.navy : "rgba(0,0,0,0.3)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginTop: 2,
          transition: "color 0.2s",
        }}>{service.category}</div>
      </div>

      {/* Active arrow — like PUBG selection indicator */}
      <div aria-hidden="true" style={{
        width: 6, height: 6,
        borderTop: `1.5px solid ${BRAND.navy}`,
        borderRight: `1.5px solid ${BRAND.navy}`,
        transform: "rotate(45deg)",
        flexShrink: 0,
        opacity: isActive ? 1 : 0,
        transition: "opacity 0.2s",
      }} />
    </button>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function Services() {
  const [active, setActive] = useState(0);
  const [panelVisible, setPanelVisible] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const prevActive = useRef(0);
  const touchStartX = useRef(null);

  // Fade out → swap → fade in on tab change
  const handleSelect = useCallback((i) => {
    if (i === active) return;
    setPanelVisible(false);
    setTimeout(() => {
      setActive(i);
      prevActive.current = i;
      setPanelVisible(true);
    }, 220);
  }, [active]);

  // Keyboard up/down navigation
  useEffect(() => {
    const handler = (e) => {
      if (!["ArrowUp","ArrowDown"].includes(e.key)) return;
      e.preventDefault();
      handleSelect(e.key === "ArrowDown"
        ? Math.min(active + 1, ENRICHED.length - 1)
        : Math.max(active - 1, 0));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active, handleSelect]);

  // Touch swipe — left = next, right = prev, wraps around at both ends
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return; // ignore accidental taps
    if (delta > 0) {
      // swiped left → next; if last, wrap to first
      handleSelect(active === ENRICHED.length - 1 ? 0 : active + 1);
    } else {
      // swiped right → prev; if first, wrap to last
      handleSelect(active === 0 ? ENRICHED.length - 1 : active - 1);
    }
  };

  const currentService = ENRICHED[active];

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      itemScope
      itemType="https://schema.org/Service"
      style={{ background: BRAND.offwhite, padding: SECTION_PAD }}
    >
      <div style={{ maxWidth: MAX_WIDTH, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "clamp(32px, 4vw, 52px)" }}>
          <SectionLabel>What We Do</SectionLabel>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginTop: 10 }}>
            <h2
              id="services-heading"
              style={{
                fontFamily: FONT.heading,
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 800, color: BRAND.navy,
                letterSpacing: "-0.02em", lineHeight: 1.05, margin: 0,
              }}
            >Our Services</h2>
            <p style={{
              fontFamily: FONT.body,
              fontSize: "clamp(13px,1.3vw,15px)",
              color: BRAND.gray, maxWidth: 360,
              lineHeight: 1.7, margin: 0,
            }}>
              Select a service to explore our track record, capabilities, and key metrics.
            </p>
          </div>
        </div>

        {/* Selector layout */}
        <div
          className="services-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "clamp(200px,28%,280px) 1fr",
            gap: "clamp(12px, 2vw, 24px)",
            alignItems: "stretch",
          }}
        >
          {/* ── LEFT: Tab list ── */}
          <div
            role="tablist"
            aria-label="Services"
            aria-orientation="vertical"
            style={{
              background: BRAND.offwhite,
              borderRadius: 12,
              border: `1px solid ${BRAND.lightgray}`,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              padding: "8px 0",
              gap: 2,
            }}
          >
            {/* Decorative top strip */}
            <div aria-hidden="true" style={{
              height: 3, background: BRAND.goldDim,
              margin: "0 0 10px", borderRadius: 0,
            }} />

            {ENRICHED.map((service, i) => (
              <ServiceTab
                key={service.id}
                service={service}
                index={i}
                isActive={active === i}
                onClick={() => handleSelect(i)}
              />
            ))}

            {/* Keyboard hint */}
            <div style={{
              marginTop: "auto",
              padding: "12px 18px 10px",
              borderTop: `1px solid ${BRAND.lightgray}`,
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <div style={{
                display: "flex", gap: 3,
              }}>
                {["↑","↓"].map(k => (
                  <kbd key={k} style={{
                    fontFamily: FONT.body, fontSize: 9,
                    background: BRAND.white, border: `1px solid ${BRAND.lightgray}`,
                    borderRadius: 3, padding: "1px 5px", color: BRAND.gray,
                    lineHeight: 1.6,
                  }}>{k}</kbd>
                ))}
              </div>
              <span style={{ fontFamily: FONT.body, fontSize: 10, color: "rgba(0,0,0,0.3)", letterSpacing: "0.04em" }}>
                navigate
              </span>
            </div>
          </div>

          {/* ── RIGHT: Detail panel ── */}
          <div
            id={`panel-${currentService.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${currentService.id}`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{ touchAction: "pan-y" }}
          >
            <ServicePanel
              service={currentService}
              visible={panelVisible}
              onView3D={() => setSelectedService(currentService)}
            />
            {/* Mobile swipe hint — only visible on small screens */}
            <div className="swipe-hint" style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginTop: 12,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={BRAND.gray} strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <path d="M19 12H5M5 12l7-7M5 12l7 7"/>
              </svg>
              <span style={{ fontFamily: FONT.body, fontSize: 11, color: BRAND.gray, letterSpacing: "0.06em" }}>
                {active + 1} / {ENRICHED.length} — swipe to navigate
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={BRAND.gray} strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <path d="M5 12h14M14 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Viewer Modal */}
      {selectedService && (
        <ServiceViewer3D
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}

      <style>{`
        @keyframes imgReveal {
          from { opacity: 0; transform: scale(1.03); }
          to   { opacity: 1; transform: scale(1); }
        }
        @media (max-width: 680px) {
          .services-layout {
            grid-template-columns: 1fr !important;
          }
          .swipe-hint {
            display: flex !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          #services *, #services *::before, #services *::after {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}