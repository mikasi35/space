import { useState, useRef, useEffect } from "react";
import { BRAND, FONT, SECTION_PAD, MAX_WIDTH, PROJECTS } from "../../shared/constants";
import { SectionLabel } from "../common/SectionLabel";


// ─── Augmented project data ───────────────────────────────────────────────────
// Extend each entry from constants with image + stats.
// Swap `photo` for your real project image URLs when ready.
const PROJECT_DATA = [
  {
    index: 0,
    photo: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&h=500&fit=crop&auto=format&q=75",
    stats: [
      { label: "Projects Delivered", value: "12+" },
      { label: "Avg. Completion", value: "On Time" },
      { label: "Total Value", value: "KSh 4.2B" },
    ],
    description: "From arterial roads to interchanges — precision-engineered infrastructure that connects communities and drives economic growth.",
  },
  {
    index: 1,
    photo: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&h=500&fit=crop&auto=format&q=75",
    stats: [
      { label: "Buildings Completed", value: "18" },
      { label: "ISO Compliance", value: "100%" },
      { label: "Snagging Rate", value: "< 2%" },
    ],
    description: "Civic centres, commercial towers, and institutional buildings designed with precision and delivered to ISO-aligned standards.",
  },
  {
    index: 2,
    photo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&h=500&fit=crop&auto=format&q=75",
    stats: [
      { label: "Pipeline km", value: "340+" },
      { label: "Zero LTIs", value: "8 Yrs" },
      { label: "Communities Served", value: "2.1M" },
    ],
    description: "Water, sewage, and utility networks that serve millions — engineered for resilience and maintained to the highest safety standards.",
  },
  {
    index: 3,
    photo: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=900&h=500&fit=crop&auto=format&q=75",
    stats: [
      { label: "Substations Built", value: "7" },
      { label: "Grid Capacity", value: "+480 MW" },
      { label: "Uptime SLA", value: "99.98%" },
    ],
    description: "Substations, transmission lines, and grid infrastructure delivering reliable power to homes, businesses, and industry across Kenya.",
  },
  {
    index: 4,
    photo: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&h=500&fit=crop&auto=format&q=75",
    stats: [
      { label: "Earth Moved", value: "1.4M m³" },
      { label: "Sites Managed", value: "9" },
      { label: "Avg. Tenure", value: "14 months" },
    ],
    description: "Land clearing, grading, and earthworks forming the solid foundations on which every lasting structure is built.",
  },
];

// Merge constants PROJECTS with our extended data
const ITEMS = PROJECTS.map((p, i) => ({ ...p, ...(PROJECT_DATA[i] || PROJECT_DATA[0]) }));

// ─── Single accordion row ─────────────────────────────────────────────────────
function ProjectRow({ project, isOpen, onToggle, isLast }) {
  const bodyRef  = useRef(null);
  const [height, setHeight] = useState(0);

  // Measure content height for smooth CSS transition
  useEffect(() => {
    if (!bodyRef.current) return;
    setHeight(bodyRef.current.scrollHeight);
  }, [isOpen]);

  const num = String(project.index + 1).padStart(2, "0");

  return (
    <div
      itemScope
      itemType="https://schema.org/CreativeWork"
      style={{
        borderTop: `1px solid rgba(255,255,255,0.08)`,
        ...(isLast ? { borderBottom: "1px solid rgba(255,255,255,0.08)" } : {}),
      }}
    >
      {/* ── Header row (always visible) ── */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`project-body-${project.index}`}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: "0",
          display: "block",
          textAlign: "left",
        }}
      >
        <div
          className="project-row-header"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(12px, 3vw, 32px)",
            padding: "clamp(18px, 2.5vw, 28px) 0",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={e => { if (!isOpen) e.currentTarget.style.opacity = "0.75"; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
        >
          {/* Number */}
          <span
            aria-hidden="true"
            style={{
              fontFamily: FONT.heading,
              fontSize: "clamp(11px, 1.2vw, 13px)",
              fontWeight: 700,
              color: isOpen ? BRAND.orange : "rgba(255,255,255,0.25)",
              letterSpacing: "0.06em",
              flexShrink: 0,
              width: 28,
              transition: "color 0.35s ease",
            }}
          >{num}</span>

          {/* Title */}
          <span
            itemProp="name"
            style={{
              fontFamily: FONT.heading,
              fontSize: "clamp(20px, 3.5vw, 42px)",
              fontWeight: 800,
              color: isOpen ? "#fff" : "rgba(255,255,255,0.55)",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              flex: 1,
              transition: "color 0.35s ease",
            }}
          >{project.type}</span>

          {/* Category tag — hidden on mobile */}
          <span
            className="project-tag"
            style={{
              fontFamily: FONT.body,
              fontSize: 11,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              flexShrink: 0,
              transition: "opacity 0.3s ease",
              opacity: isOpen ? 0 : 1,
            }}
          >{project.label}</span>

          {/* Chevron / plus */}
          <div style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: `1px solid ${isOpen ? BRAND.orange : "rgba(255,255,255,0.15)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "border-color 0.35s ease, transform 0.35s ease",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <line x1="6" y1="1" x2="6" y2="11" stroke={isOpen ? BRAND.orange : "rgba(255,255,255,0.5)"} strokeWidth="1.5" strokeLinecap="round"
                style={{ transition: "stroke 0.35s ease" }}
              />
              <line x1="1" y1="6" x2="11" y2="6" stroke={isOpen ? BRAND.orange : "rgba(255,255,255,0.5)"} strokeWidth="1.5" strokeLinecap="round"
                style={{ transition: "stroke 0.35s ease" }}
              />
            </svg>
          </div>
        </div>
      </button>

      {/* ── Expandable body ── */}
      <div
        id={`project-body-${project.index}`}
        ref={bodyRef}
        role="region"
        aria-label={`${project.type} details`}
        style={{
          overflow: "hidden",
          maxHeight: isOpen ? `${height}px` : "0px",
          transition: "max-height 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          willChange: "max-height",
        }}
      >
        <div style={{ paddingBottom: "clamp(24px, 3vw, 40px)" }}>
          {/* Image + content grid */}
          <div
            className="project-expand-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(20px, 3vw, 48px)",
              alignItems: "start",
            }}
          >
            {/* Image */}
            <div style={{
              borderRadius: 8,
              overflow: "hidden",
              aspectRatio: "16/9",
              background: "rgba(255,255,255,0.05)",
              position: "relative",
            }}>
              <img
                src={project.photo}
                alt={`${project.type} project by Spacemine Holdings`}
                loading="lazy"
                decoding="async"
                width="900"
                height="500"
                itemProp="image"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  filter: "brightness(0.88) contrast(1.05)",
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "scale(1)" : "scale(1.04)",
                  transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
                }}
              />
              {/* Accent overlay line */}
              <div style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                height: 3,
                background: BRAND.orange,
              }} />
            </div>

            {/* Right: description + stats */}
            <div style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s",
            }}>
              {/* Label */}
              <div style={{
                fontFamily: FONT.body,
                fontSize: 11,
                color: BRAND.orange,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: 12,
              }}>{project.label}</div>

              {/* Description */}
              <p
                itemProp="description"
                style={{
                  fontFamily: FONT.body,
                  fontSize: "clamp(13px, 1.4vw, 15px)",
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.75,
                  margin: "0 0 28px",
                }}
              >{project.description}</p>

              {/* Stats */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 16,
                paddingTop: 20,
                borderTop: "1px solid rgba(255,255,255,0.08)",
              }}>
                {project.stats.map((stat) => (
                  <div key={stat.label}>
                    <div style={{
                      fontFamily: FONT.heading,
                      fontSize: "clamp(18px, 2vw, 26px)",
                      fontWeight: 800,
                      color: "#fff",
                      lineHeight: 1,
                      marginBottom: 6,
                    }}>{stat.value}</div>
                    <div style={{
                      fontFamily: FONT.body,
                      fontSize: 11,
                      color: "rgba(255,255,255,0.4)",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Jet Ignition Button ──────────────────────────────────────────────────────
function JetButton({ href }) {
  const [hovered, setHovered]   = useState(false);
  const [firing, setFiring]     = useState(false);
  const [status, setStatus]     = useState("systems-ready");

  const STATUS_MAP = {
    "systems-ready": { dot: "rgba(255,255,255,0.2)", label: "Systems ready" },
    "armed":         { dot: BRAND.orange,            label: "Guard open — armed" },
    "igniting":      { dot: "#fff",                  label: "Ignition sequence…" },
    "liftoff":       { dot: "#4caf82",               label: "We have liftoff" },
  };

  const handleClick = () => {
    setFiring(true);
    setStatus("igniting");
    setTimeout(() => {
      setFiring(false);
      setStatus("liftoff");
      setTimeout(() => {
        setStatus(hovered ? "armed" : "systems-ready");
        window.location.href = href;
      }, 800);
    }, 620);
  };

  const s = STATUS_MAP[status];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, flexShrink: 0 }}>
      {/* Button */}
      <a
        href={href}
        onClick={(e) => { e.preventDefault(); if (!firing) handleClick(); }}
        onMouseEnter={() => { setHovered(true); if (status === "systems-ready") setStatus("armed"); }}
        onMouseLeave={() => { setHovered(false); if (status === "armed") setStatus("systems-ready"); }}
        aria-label="Get a quote — ignite your project"
        role="button"
        style={{
          position: "relative",
          display: "block",
          width: 196,
          height: 68,
          textDecoration: "none",
          cursor: firing ? "default" : "pointer",
          outline: "none",
        }}
      >
        {/* Outer shell */}
        <div style={{
          position: "absolute", inset: 0,
          background: "#1a1a1a",
          border: `1px solid ${hovered ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)"}`,
          borderRadius: 6,
          transition: "border-color 0.2s",
          overflow: "hidden",
        }}>
          {/* Corner brackets */}
          {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h]) => (
            <div key={`${v}${h}`} aria-hidden="true" style={{
              position: "absolute",
              [v]: 7, [h]: 7,
              width: 10, height: 10,
              borderColor: "rgba(255,255,255,0.12)",
              borderStyle: "solid",
              borderWidth: v === "top" && h === "left"  ? "1px 0 0 1px"
                         : v === "top" && h === "right" ? "1px 1px 0 0"
                         : v === "bottom" && h === "left"  ? "0 0 1px 1px"
                         : "0 1px 1px 0",
            }} />
          ))}

          {/* LED indicator */}
          <div aria-hidden="true" style={{
            position: "absolute", top: 9, right: 9,
            width: 6, height: 6, borderRadius: "50%",
            background: hovered ? BRAND.orange : "rgba(255,255,255,0.15)",
            boxShadow: hovered ? `0 0 0 3px ${BRAND.orange}22` : "none",
            transition: "background 0.3s, box-shadow 0.3s",
            animation: hovered && !firing ? "ledpulse 1.8s ease-in-out infinite" : "none",
          }} />

          {/* Guard cover — flips up on hover */}
          <div style={{
            position: "absolute", inset: 0,
            background: BRAND.orange,
            borderRadius: 6,
            transformOrigin: "top center",
            transform: hovered ? "rotateX(-115deg)" : "rotateX(0deg)",
            transition: "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: `1px solid #b03a0a`,
            perspective: "400px",
            backfaceVisibility: "hidden",
            zIndex: 2,
          }}>
            <span style={{ fontFamily: FONT.body, fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.75)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Lift to launch
            </span>
          </div>

          {/* Ignition face — revealed under guard */}
          <div style={{
            position: "absolute", inset: 4,
            borderRadius: 4,
            background: "#0d0d0d",
            border: "1px solid rgba(255,255,255,0.07)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 3, zIndex: 1,
          }}>
            <span style={{ fontFamily: FONT.heading, fontSize: 13, fontWeight: 800, color: "#fff", letterSpacing: "0.12em", textTransform: "uppercase", lineHeight: 1 }}>
              Get a Quote
            </span>
            <span style={{ fontFamily: FONT.body, fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Ignite your project
            </span>
          </div>

          {/* Firing overlay — sweeps up from bottom */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: 6,
            background: BRAND.orange,
            zIndex: 5,
            transformOrigin: "bottom center",
            transform: firing ? "scaleY(1)" : "scaleY(0)",
            transition: firing ? "transform 0.2s ease-out" : "transform 0.28s ease-in",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{
              fontFamily: FONT.body, fontSize: 10, fontWeight: 700,
              color: "#fff", letterSpacing: "0.22em", textTransform: "uppercase",
              opacity: firing ? 1 : 0,
              transition: "opacity 0.1s 0.12s",
            }}>Launching…</span>
          </div>
        </div>
      </a>

      {/* Status strip */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{
          width: 5, height: 5, borderRadius: "50%",
          background: s.dot,
          transition: "background 0.3s",
        }} />
        <span style={{ fontFamily: FONT.body, fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase", transition: "color 0.3s" }}>
          {s.label}
        </span>
      </div>

      <style>{`@keyframes ledpulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </div>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function CtaBanner({ visible }) {
  return (
    <div style={{
      marginTop: "clamp(48px, 6vw, 80px)",
      padding: "clamp(28px, 4vw, 48px) clamp(24px, 4vw, 52px)",
      background: "#111",
      borderRadius: 8,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 32,
      flexWrap: "wrap",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(16px)",
      transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Hatching texture */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.025) 0,rgba(255,255,255,0.025) 1px,transparent 1px,transparent 18px)",
      }} />
      {/* Orange left edge accent */}
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 3, background: BRAND.orange }} />

      <div style={{ position: "relative" }}>
        <div style={{ fontFamily: FONT.body, fontSize: 11, color: BRAND.orange, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, marginBottom: 10 }}>
          Next Mission
        </div>
        <div style={{ fontFamily: FONT.heading, fontSize: "clamp(18px, 2.5vw, 26px)", fontWeight: 800, color: "#fff", marginBottom: 6, letterSpacing: "-0.01em", lineHeight: 1.1 }}>
          Ready to start your<br />next project?
        </div>
        <div style={{ fontFamily: FONT.body, fontSize: "clamp(13px, 1.4vw, 15px)", color: "rgba(255,255,255,0.45)", maxWidth: 340 }}>
          Contact us for a competitive quote tailored to your specific needs and timeline.
        </div>
      </div>

      <JetButton href="#contact" />
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function Projects() {
  const [openIndex, setOpenIndex] = useState(0); // first item open by default
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggle = (i) => setOpenIndex(prev => prev === i ? -1 : i);

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-labelledby="projects-heading"
      style={{ background: BRAND.dark, padding: SECTION_PAD, overflow: "hidden" }}
    >
      <div style={{ maxWidth: MAX_WIDTH, margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
          marginBottom: "clamp(40px, 5vw, 64px)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}>
          <div>
            <SectionLabel>Our Work</SectionLabel>
            <h2
              id="projects-heading"
              style={{
                fontFamily: FONT.heading,
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 800,
                color: BRAND.white,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                marginTop: 10,
                marginBottom: 0,
              }}
            >
              What We Build
            </h2>
          </div>
          <p style={{
            fontFamily: FONT.body,
            fontSize: "clamp(13px, 1.4vw, 15px)",
            color: "rgba(255,255,255,0.4)",
            maxWidth: 320,
            lineHeight: 1.7,
            margin: 0,
          }}>
            Expand any category to see our track record, project stats, and the kind of work we do best.
          </p>
        </div>

        {/* ── Accordion list ── */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.15s",
          }}
        >
          {ITEMS.map((project, i) => (
            <ProjectRow
              key={project.type}
              project={project}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
              isLast={i === ITEMS.length - 1}
            />
          ))}
        </div>

        {/* ── CTA banner ── */}
        <CtaBanner visible={visible} />
      </div>

      <style>{`
        @media (max-width: 640px) {
          .project-expand-grid { grid-template-columns: 1fr !important; }
          .project-tag { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          #projects *, #projects *::before, #projects *::after {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}