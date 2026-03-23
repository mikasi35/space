import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  ivory:     "#F8F5EF",
  white:     "#FFFFFF",
  navy:      "#0E1523",
  navyMid:   "#16213A",
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

// ─── SVG Icon components ──────────────────────────────────────────────────────
const Icon = {
  // Civil — road with lane markers
  civil: ({ size = 24, color = "currentColor", sw = 1.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 21 9 3"/>
      <path d="M19 21 15 3"/>
      <path d="M5 21h14"/>
      <line x1="12" y1="9" x2="12" y2="7"/>
      <line x1="12" y1="13" x2="12" y2="11"/>
      <line x1="12" y1="17" x2="12" y2="15"/>
    </svg>
  ),
  // Energy — lightning bolt
  energy: ({ size = 24, color = "currentColor", sw = 1.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  // Water — droplet
  water: ({ size = 24, color = "currentColor", sw = 1.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2C6 9 4 13.5 4 16a8 8 0 0 0 16 0c0-2.5-2-7-8-14z"/>
    </svg>
  ),
  // Buildings — grid / facade
  buildings: ({ size = 24, color = "currentColor", sw = 1.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="1"/>
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>
    </svg>
  ),
  // Surveying — crosshair
  survey: ({ size = 24, color = "currentColor", sw = 1.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="8"/>
      <line x1="12" y1="2" x2="12" y2="6"/>
      <line x1="12" y1="18" x2="12" y2="22"/>
      <line x1="2" y1="12" x2="6" y2="12"/>
      <line x1="18" y1="12" x2="22" y2="12"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  // Consulting — bar chart
  consulting: ({ size = 24, color = "currentColor", sw = 1.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6"  y1="20" x2="6"  y2="14"/>
      <line x1="2"  y1="20" x2="22" y2="20"/>
    </svg>
  ),
  // Arrow right (CTA)
  arrowRight: ({ size = 14, color = "currentColor", sw = 2.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  ),
};

// ─── Service data ─────────────────────────────────────────────────────────────
const SERVICE_CATEGORIES = [
  {
    id: "civil", label: "Civil Engineering",
    headline: "Roads, Bridges & Infrastructure",
    tagline: "Arterial roads, bridges, and public infrastructure built to last generations — engineered for Kenya's terrain and climate.",
    color: "#C9A84C", Icon: Icon.civil,
    stats: [{ v: "200km+", l: "Roads Constructed" }, { v: "40+", l: "Projects Delivered" }, { v: "ISO", l: "9001 Certified" }],
    photo: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&q=80",
    subServices: [
      { title: "Road Construction & Rehabilitation", desc: "Arterial, collector, and access roads built to Kenya Roads Board standards.", photo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=75" },
      { title: "Bridge & Culvert Works",             desc: "RC and pre-stressed concrete structures engineered for heavy axle loads.",     photo: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&q=75" },
      { title: "Drainage Systems",                   desc: "Storm water management, lined channels, and flood mitigation works.",          photo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=75" },
      { title: "Earthworks & Grading",               desc: "Cut-and-fill, compaction, and mass earthwork using GPS-guided plant.",         photo: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=75" },
    ],
  },
  {
    id: "energy", label: "Energy",
    headline: "Solar, Power & Renewables",
    tagline: "From off-grid solar installations to grid-tied farms — delivering clean, reliable energy across Kenya's counties.",
    color: "#E2C47A", Icon: Icon.energy,
    stats: [{ v: "15MW+", l: "Installed Capacity" }, { v: "120+", l: "Solar Sites" }, { v: "99.2%", l: "Uptime SLA" }],
    photo: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80",
    subServices: [
      { title: "Solar Farm EPC",    desc: "Full engineering, procurement, and construction of utility-scale PV plants.",              photo: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=75" },
      { title: "Off-Grid Systems",  desc: "Rural electrification with battery storage, designed for 25-year LCOE.",                  photo: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=75" },
      { title: "HV Line Construction", desc: "33kV and 11kV overhead lines, transformers, and substations.",                        photo: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=75" },
      { title: "O&M Services",      desc: "Scheduled preventive maintenance, remote SCADA monitoring, and rapid-response teams.",    photo: "https://images.unsplash.com/photo-1545208878-8c8a32da1d4f?w=800&q=75" },
    ],
  },
  {
    id: "water", label: "Water & Sanitation",
    headline: "Boreholes, WASH & Water Supply",
    tagline: "Safe water for communities — from borehole drilling and piped schemes to water treatment and sanitation infrastructure.",
    color: "#6CA8C9", Icon: Icon.water,
    stats: [{ v: "300+", l: "Boreholes Drilled" }, { v: "1M+", l: "People Served" }, { v: "98%", l: "Water Quality Pass" }],
    photo: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1200&q=80",
    subServices: [
      { title: "Borehole Drilling & Equipping", desc: "Hydrogeological surveys, rotary drilling to 400m, pump installation.",               photo: "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=800&q=75" },
      { title: "Piped Water Schemes",           desc: "Gravity-fed and pumped distribution networks for rural and peri-urban areas.",        photo: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=75" },
      { title: "Water Treatment Plants",        desc: "Conventional and membrane filtration plants with SCADA control.",                     photo: "https://images.unsplash.com/photo-1574607383476-f517f562d04a?w=800&q=75" },
      { title: "Sanitation & Sewerage",         desc: "Sewerage networks, wastewater treatment, and community WASH facilities.",             photo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=75" },
    ],
  },
  {
    id: "buildings", label: "Buildings",
    headline: "Civic, Commercial & Industrial",
    tagline: "Hospitals, schools, offices, and industrial structures — designed for functionality, built with precision.",
    color: "#C9A84C", Icon: Icon.buildings,
    stats: [{ v: "80+", l: "Buildings Completed" }, { v: "250k m²", l: "Floor Area" }, { v: "5 Stars", l: "Client Rating" }],
    photo: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
    subServices: [
      { title: "Civic & Institutional",  desc: "County offices, hospitals, schools, and courthouses — built to government standards.",   photo: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=75" },
      { title: "Commercial Buildings",   desc: "Office blocks, retail centres, and mixed-use developments.",                             photo: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=75" },
      { title: "Industrial Structures",  desc: "Warehouses, factories, and logistics hubs designed for operational efficiency.",          photo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=75" },
      { title: "Renovations & Fit-Out",  desc: "Structural upgrades, interior fit-outs, and compliance retrofits.",                     photo: "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=800&q=75" },
    ],
  },
  {
    id: "survey", label: "Surveying",
    headline: "Geospatial & Land Survey",
    tagline: "Precision geospatial services underpinning every project — from topographic surveys to GIS mapping and land registration.",
    color: "#A8C96C", Icon: Icon.survey,
    stats: [{ v: "5000+", l: "Hectares Surveyed" }, { v: "±2cm", l: "GPS Accuracy" }, { v: "72hr", l: "Report Turnaround" }],
    photo: "https://images.unsplash.com/photo-1527576539890-dfa815648363?w=1200&q=80",
    subServices: [
      { title: "Topographic Survey",    desc: "Contour mapping and DTM generation using GNSS and total station.",                     photo: "https://images.unsplash.com/photo-1559825481-12a05cc00344?w=800&q=75" },
      { title: "Drone & Aerial Mapping",desc: "UAV photogrammetry and LiDAR for large-area mapping at sub-5cm resolution.",          photo: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=75" },
      { title: "GIS & Spatial Analysis",desc: "Database creation, analysis, and web GIS dashboards for project monitoring.",         photo: "https://images.unsplash.com/photo-1569336415962-a4bd9f69c8bf?w=800&q=75" },
      { title: "Land Registration",     desc: "Mutation, sub-division, and land registration services under the Land Act.",          photo: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&q=75" },
    ],
  },
  {
    id: "consulting", label: "Consulting",
    headline: "Engineering Advisory & PMC",
    tagline: "Independent engineering advice, feasibility studies, and project management consultancy across all infrastructure sectors.",
    color: "#C96C8A", Icon: Icon.consulting,
    stats: [{ v: "50+", l: "Studies Completed" }, { v: "$200M+", l: "Projects Advised" }, { v: "15+", l: "Gov. Clients" }],
    photo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
    subServices: [
      { title: "Feasibility Studies",    desc: "Technical, economic, and environmental feasibility for infrastructure investments.",   photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=75" },
      { title: "Project Management",     desc: "PMC and supervision services — scope, schedule, cost, and quality control.",          photo: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=75" },
      { title: "ESIA & Environmental",   desc: "Environmental and Social Impact Assessments for NEMA approval.",                     photo: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=75" },
      { title: "Structural Engineering", desc: "Analysis, design, and peer review for RC, steel, and composite structures.",         photo: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=75" },
    ],
  },
];

const CAT_IDS = SERVICE_CATEGORIES.map(c => c.id);

// ─── useInView (animate-once) ─────────────────────────────────────────────────
function useInView(threshold = 0.1) {
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

// ─── useScrollSpy ─────────────────────────────────────────────────────────────
// Single passive scroll listener. The active section is whichever section's
// top is closest to (but ≤) the sticky-nav bottom (~116px from viewport top).
function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const OFFSET = 116; // top-nav 68px + service-nav ~48px

    function compute() {
      let best = ids[0];
      let bestTop = -Infinity;
      for (const id of ids) {
        const el = document.getElementById(`service-${id}`);
        if (!el) continue;
        const top = el.getBoundingClientRect().top - OFFSET;
        // The section whose top has crossed the threshold most recently wins
        if (top <= 4 && top > bestTop) {
          bestTop = top;
          best = id;
        }
      }
      setActive(best);
    }

    compute(); // run once on mount
    window.addEventListener("scroll", compute, { passive: true });
    return () => window.removeEventListener("scroll", compute);
  }, [ids]);

  return active;
}

// ─── SubCard ──────────────────────────────────────────────────────────────────
function SubCard({ sub, accentColor, index, visible }) {
  const [hov, setHov] = useState(false);

  return (
    <article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 2,
        overflow: "hidden",
        background: T.white,
        border: `1px solid ${hov ? accentColor + "55" : "rgba(14,21,35,0.08)"}`,
        boxShadow: hov
          ? `0 20px 60px rgba(14,21,35,0.12), 0 4px 16px rgba(14,21,35,0.06)`
          : `0 2px 12px rgba(14,21,35,0.04)`,
        transform: hov ? "translateY(-6px)" : "translateY(0)",
        opacity: visible ? 1 : 0,
        transition: [
          `transform 0.4s cubic-bezier(0.16,1,0.3,1)`,
          `box-shadow 0.4s ease`,
          `border-color 0.3s ease`,
          `opacity 0.6s ease ${index * 80}ms`,
        ].join(", "),
      }}
    >
      <div style={{ height: 180, overflow: "hidden", position: "relative", background: T.navyMid }}>
        <img
          src={sub.photo} alt={sub.title}
          loading="lazy" decoding="async" width="800" height="500"
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hov ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
            filter: "brightness(0.82) contrast(1.08) saturate(0.9)",
          }}
        />
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(180deg, transparent 40%, ${T.navy}CC 100%)`,
        }} />
        {/* Accent bar on hover */}
        <div aria-hidden="true" style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, ${accentColor}, transparent)`,
          transform: hov ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1)",
        }} />
      </div>

      <div style={{ padding: "20px 22px 24px" }}>
        <h4 style={{
          fontFamily: T.display, fontSize: 17, fontWeight: 600,
          color: T.navy, letterSpacing: "-0.01em", lineHeight: 1.3, marginBottom: 10,
        }}>{sub.title}</h4>
        <p style={{
          fontFamily: T.sans, fontSize: 13, color: T.slate,
          lineHeight: 1.75, margin: 0, fontWeight: 300,
        }}>{sub.desc}</p>
      </div>
    </article>
  );
}

// ─── CategorySection ──────────────────────────────────────────────────────────
function CategorySection({ cat, isFirst }) {
  const [ref, visible] = useInView(0.07);
  const CatIcon = cat.Icon;

  return (
    <section
      ref={ref}
      id={`service-${cat.id}`}
      aria-labelledby={`heading-${cat.id}`}
      style={{
        padding: isFirst
          ? "clamp(48px,6vw,80px) 0 clamp(64px,8vw,100px)"
          : "clamp(64px,8vw,100px) 0",
        borderBottom: `1px solid rgba(14,21,35,0.07)`,
      }}
    >
      {/* Header grid */}
      <div
        className="cat-header"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(32px,5vw,80px)",
          alignItems: "center",
          marginBottom: "clamp(40px,5vw,64px)",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(28px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        {/* Text */}
        <div>
          {/* Eyebrow — icon + rule + label */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 32, height: 32, borderRadius: 6,
              background: cat.color + "18",
              border: `1px solid ${cat.color}30`,
              flexShrink: 0,
            }}>
              <CatIcon size={15} color={cat.color} sw={1.8} />
            </span>
            <div style={{ width: 18, height: 1, background: `linear-gradient(90deg, ${cat.color}, transparent)` }} />
            <span style={{
              fontFamily: T.mono, fontSize: 10, fontWeight: 500,
              color: cat.color, letterSpacing: "0.22em", textTransform: "uppercase",
            }}>{cat.label}</span>
          </div>

          <h2 id={`heading-${cat.id}`} style={{
            fontFamily: T.display,
            fontSize: "clamp(28px,3.8vw,48px)",
            fontWeight: 600, color: T.navy,
            letterSpacing: "-0.025em", lineHeight: 1.08, marginBottom: 18,
          }}>{cat.headline}</h2>

          <p style={{
            fontFamily: T.sans,
            fontSize: "clamp(13px,1.3vw,15px)",
            color: T.slate, lineHeight: 1.8, fontWeight: 300,
            marginBottom: 32, maxWidth: 420,
          }}>{cat.tagline}</p>

          {/* Stats */}
          <div style={{
            display: "flex", gap: "clamp(24px,3vw,48px)", flexWrap: "wrap",
            paddingTop: 28, borderTop: `1px solid rgba(14,21,35,0.07)`,
          }}>
            {cat.stats.map(s => (
              <div key={s.l}>
                <div style={{
                  fontFamily: T.display,
                  fontSize: "clamp(22px,2.5vw,32px)",
                  fontWeight: 700, color: cat.color,
                  lineHeight: 1, letterSpacing: "-0.02em", marginBottom: 4,
                }}>{s.v}</div>
                <div style={{
                  fontFamily: T.mono, fontSize: 9,
                  color: T.mist, letterSpacing: "0.14em", textTransform: "uppercase",
                }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero image */}
        <div style={{
          borderRadius: 2, overflow: "hidden",
          aspectRatio: "4/3", position: "relative",
          background: T.navyMid,
          boxShadow: "0 24px 80px rgba(14,21,35,0.16)",
        }}>
          <img
            src={cat.photo}
            alt={`${cat.headline} — Spacemine Holdings`}
            loading="lazy" decoding="async" width="1200" height="700"
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              filter: "brightness(0.85) contrast(1.06) saturate(0.88)",
            }}
          />
          {/* Corner triangle accent */}
          <div aria-hidden="true" style={{
            position: "absolute", top: 0, right: 0,
            width: 48, height: 48, background: cat.color,
            clipPath: "polygon(100% 0, 0 0, 100% 100%)",
            opacity: 0.9,
          }} />
          {/* Icon in corner (over triangle) */}
          <div aria-hidden="true" style={{
            position: "absolute", top: 7, right: 7, opacity: 0.85,
          }}>
            <CatIcon size={16} color={T.navy} sw={2} />
          </div>
          {/* Bottom label bar */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "32px 18px 14px",
            background: `linear-gradient(transparent, ${T.navy}E6)`,
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <CatIcon size={16} color={cat.color} sw={1.5} />
            <span style={{
              fontFamily: T.mono, fontSize: 9, fontWeight: 500,
              color: cat.color, letterSpacing: "0.16em", textTransform: "uppercase",
            }}>{cat.label}</span>
          </div>
        </div>
      </div>

      {/* Sub-services grid */}
      <div
        className="sub-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "clamp(12px,1.6vw,20px)",
        }}
      >
        {cat.subServices.map((sub, i) => (
          <SubCard key={sub.title} sub={sub} accentColor={cat.color} index={i} visible={visible} />
        ))}
      </div>
    </section>
  );
}

// ─── ServiceNav ───────────────────────────────────────────────────────────────
function ServiceNav({ active }) {
  const stripRef = useRef(null);

  // Auto-scroll the active pill into view in the horizontal strip
  useEffect(() => {
    if (!stripRef.current) return;
    const pill = stripRef.current.querySelector(`[data-id="${active}"]`);
    if (pill) pill.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [active]);

  const handleClick = useCallback((id, e) => {
    e.preventDefault();
    const el = document.getElementById(`service-${id}`);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 116;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  return (
    <nav
      aria-label="Jump to service category"
      style={{
        position: "sticky", top: 68, zIndex: 50,
        background: "rgba(248,245,239,0.97)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: `1px solid rgba(201,168,76,0.15)`,
        boxShadow: "0 1px 0 rgba(14,21,35,0.05)",
      }}
    >
      <div
        ref={stripRef}
        style={{
          maxWidth: 1200, margin: "0 auto",
          padding: "0 clamp(16px,3vw,32px)",
          display: "flex", overflowX: "auto",
          scrollbarWidth: "none", msOverflowStyle: "none",
        }}
      >
        {SERVICE_CATEGORIES.map(cat => {
          const isActive = active === cat.id;
          const CatIcon = cat.Icon;
          return (
            <a
              key={cat.id}
              data-id={cat.id}
              href={`#service-${cat.id}`}
              onClick={e => handleClick(cat.id, e)}
              aria-current={isActive ? "true" : undefined}
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                fontFamily: T.sans, fontSize: 11,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? cat.color : T.slate,
                textDecoration: "none",
                padding: "14px clamp(10px,1.4vw,18px)",
                whiteSpace: "nowrap",
                borderBottom: `2px solid ${isActive ? cat.color : "transparent"}`,
                transition: "color 0.22s, border-color 0.22s",
                letterSpacing: "0.04em", textTransform: "uppercase",
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = T.navy; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = T.slate; }}
            >
              <span style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: 16, height: 16,
                opacity: isActive ? 1 : 0.45,
                transition: "opacity 0.22s",
                flexShrink: 0,
              }}>
                <CatIcon size={13} color={isActive ? cat.color : "currentColor"} sw={1.8} />
              </span>
              {cat.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);

  return (
    <header role="banner" style={{
      background: T.navy,
      padding: "clamp(100px,12vw,160px) clamp(16px,3vw,32px) clamp(56px,7vw,96px)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Grid texture */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: [
          `linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px)`,
          `linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)`,
        ].join(","),
        backgroundSize: "56px 56px",
      }} />
      {/* Large decorative "S" */}
      <div aria-hidden="true" style={{
        position: "absolute", right: "-0.05em", top: "50%",
        transform: "translateY(-50%)",
        fontFamily: T.display,
        fontSize: "clamp(240px,28vw,400px)",
        fontWeight: 700, color: "rgba(201,168,76,0.04)",
        lineHeight: 1, userSelect: "none", pointerEvents: "none",
        letterSpacing: "-0.04em",
      }}>S</div>
      {/* Gold bottom rule */}
      <div aria-hidden="true" style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, ${T.gold}, transparent 70%)`,
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: 32 }}>
          <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", alignItems: "center", gap: 10 }}>
            <li><Link to="/" style={{ fontFamily: T.mono, fontSize: 10, color: "rgba(255,255,255,0.35)", textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase" }}>Home</Link></li>
            <li aria-hidden="true" style={{ color: T.goldDim, fontSize: 10 }}>›</li>
            <li><span style={{ fontFamily: T.mono, fontSize: 10, color: T.goldLight, letterSpacing: "0.1em", textTransform: "uppercase" }} aria-current="page">Services</span></li>
          </ol>
        </nav>

        <div style={{
          display: "flex", alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "clamp(24px,4vw,64px)", flexWrap: "wrap",
        }}>
          <div style={{ flex: "1 1 320px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20,
              opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(10px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}>
              <div style={{ width: 32, height: 1, background: T.gold }} />
              <span style={{ fontFamily: T.mono, fontSize: 9, color: T.gold, letterSpacing: "0.26em", textTransform: "uppercase" }}>Engineering Excellence</span>
            </div>

            <h1 style={{
              fontFamily: T.display,
              fontSize: "clamp(44px,6vw,84px)",
              fontWeight: 600, color: T.white,
              letterSpacing: "-0.03em", lineHeight: 1.0,
              margin: "0 0 20px",
              opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}>
              Our <em style={{ color: T.goldLight, fontStyle: "italic" }}>Services</em>
            </h1>

            <p style={{
              fontFamily: T.sans,
              fontSize: "clamp(14px,1.4vw,16px)",
              color: "rgba(255,255,255,0.45)", lineHeight: 1.8,
              maxWidth: 480, margin: 0, fontWeight: 300,
              opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}>
              Engineering and construction solutions across Kenya — from arterial roads
              and solar farms to boreholes and civic buildings, all delivered to ISO‑aligned standards.
            </p>
          </div>

          {/* Stats panel */}
          <div className="hero-stats" style={{
            display: "grid", gridTemplateColumns: "repeat(3,1fr)",
            border: `1px solid rgba(201,168,76,0.14)`,
            borderRadius: 2, overflow: "hidden", flexShrink: 0,
            opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
          }}>
            {[{ v: "6", l: "Divisions" }, { v: "30+", l: "Services" }, { v: "10+", l: "Yrs Active" }].map((s, i) => (
              <div key={s.l} style={{
                padding: "clamp(18px,2.5vw,28px) clamp(16px,2.2vw,28px)",
                borderRight: i < 2 ? `1px solid rgba(201,168,76,0.14)` : "none",
                textAlign: "center",
                background: "rgba(255,255,255,0.03)",
              }}>
                <div style={{ fontFamily: T.display, fontSize: "clamp(22px,2.8vw,36px)", fontWeight: 700, color: T.gold, lineHeight: 1, letterSpacing: "-0.02em", marginBottom: 6 }}>{s.v}</div>
                <div style={{ fontFamily: T.mono, fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.14em", textTransform: "uppercase" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── Bottom CTA ───────────────────────────────────────────────────────────────
function BottomCTA() {
  const [ref, visible] = useInView(0.2);
  const [hov, setHov] = useState(false);

  return (
    <section ref={ref} aria-labelledby="cta-heading" style={{
      background: T.navy,
      padding: "clamp(64px,9vw,120px) clamp(16px,3vw,32px)",
      position: "relative", overflow: "hidden", textAlign: "center",
    }}>
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `repeating-linear-gradient(-45deg, rgba(201,168,76,0.025) 0, rgba(201,168,76,0.025) 1px, transparent 1px, transparent 18px)`,
      }} />
      {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h]) => (
        <div key={v+h} aria-hidden="true" style={{
          position: "absolute", [v]: 32, [h]: 32, width: 24, height: 24,
          borderColor: `rgba(201,168,76,0.3)`, borderStyle: "solid",
          borderWidth: v==="top"&&h==="left"?"2px 0 0 2px":v==="top"&&h==="right"?"2px 2px 0 0":v==="bottom"&&h==="left"?"0 0 2px 2px":"0 2px 2px 0",
        }} />
      ))}

      <div style={{
        position: "relative", zIndex: 1, maxWidth: 560, margin: "0 auto",
        opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(32px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}>
        <div style={{ fontFamily: T.mono, fontSize: 9, fontWeight: 500, color: T.gold, letterSpacing: "0.26em", textTransform: "uppercase", marginBottom: 20 }}>
          Ready to begin?
        </div>
        <h2 id="cta-heading" style={{
          fontFamily: T.display,
          fontSize: "clamp(32px,5vw,56px)",
          fontWeight: 600, color: T.white,
          letterSpacing: "-0.025em", lineHeight: 1.06, marginBottom: 18,
        }}>
          Tell us about<br />
          <em style={{ color: T.goldLight, fontStyle: "italic" }}>your project</em>
        </h2>
        <p style={{ fontFamily: T.sans, fontSize: 15, color: "rgba(255,255,255,0.38)", lineHeight: 1.8, marginBottom: 40, fontWeight: 300 }}>
          Our team reviews every enquiry within 24 hours.
          Competitive pricing, clear timelines, no obligations.
        </p>
        <Link
          to="/contact"
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
          style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            background: hov ? T.goldLight : T.gold,
            color: T.navy,
            fontFamily: T.sans, fontSize: 12, fontWeight: 700,
            letterSpacing: "0.12em", textTransform: "uppercase",
            textDecoration: "none", padding: "16px 36px", borderRadius: 2,
            transition: "background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
            transform: hov ? "translateY(-2px)" : "none",
            boxShadow: hov ? `0 12px 40px rgba(201,168,76,0.35)` : `0 4px 16px rgba(201,168,76,0.2)`,
          }}
        >
          Get a Quote
          <Icon.arrowRight size={13} color={T.navy} sw={2.5} />
        </Link>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function ServicesPage() {
  const active = useScrollSpy(CAT_IDS);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href={FONTS_HREF} rel="stylesheet" />

      <div style={{ background: T.ivory, minHeight: "100vh" }}>
        <Hero />
        <ServiceNav active={active} />

        <main
          id="main-content"
          tabIndex={-1}
          style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(16px,3vw,32px)" }}
        >
          {SERVICE_CATEGORIES.map((cat, i) => (
            <CategorySection key={cat.id} cat={cat} isFirst={i === 0} />
          ))}
        </main>

        <BottomCTA />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cat-header { grid-template-columns: 1fr !important; }
          .cat-header > div:last-child { order: -1; }
          .hero-stats { width: 100%; }
          .sub-grid   { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .sub-grid { grid-template-columns: 1fr !important; }
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
        nav::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  );
}