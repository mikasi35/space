import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

// ─── Design tokens (mirrors ServicesPage) ─────────────────────────────────────
const T = {
  ivory:      "#F8F5EF",
  white:      "#FFFFFF",
  navy:       "#0E1523",
  navyMid:    "#16213A",
  gold:       "#C9A84C",
  goldLight:  "#E2C47A",
  goldDim:    "#A0803A",
  slate:      "#4A5568",
  mist:       "#8896A8",
  border:     "rgba(201,168,76,0.15)",
  display: `'Cormorant Garamond', 'Playfair Display', Georgia, serif`,
  sans:    `'DM Sans', 'Outfit', system-ui, sans-serif`,
  mono:    `'DM Mono', 'Fira Code', monospace`,
};

const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap";

// ─── Inline SVG icons ─────────────────────────────────────────────────────────
const Icon = {
  road: ({ size = 18, color = "currentColor", sw = 1.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 21 9 3"/><path d="M19 21 15 3"/><path d="M5 21h14"/>
      <line x1="12" y1="9" x2="12" y2="7"/><line x1="12" y1="13" x2="12" y2="11"/><line x1="12" y1="17" x2="12" y2="15"/>
    </svg>
  ),
  water: ({ size = 18, color = "currentColor", sw = 1.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2C6 9 4 13.5 4 16a8 8 0 0 0 16 0c0-2.5-2-7-8-14z"/>
    </svg>
  ),
  light: ({ size = 18, color = "currentColor", sw = 1.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  ),
  power: ({ size = 18, color = "currentColor", sw = 1.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  community: ({ size = 18, color = "currentColor", sw = 1.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  pin: ({ size = 12, color = "currentColor", sw = 1.8 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  arrowRight: ({ size = 13, color = "currentColor", sw = 2.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  ),
  arrowLeft: ({ size = 16, color = "currentColor", sw = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 12H5M5 12l7 7M5 12l7-7"/>
    </svg>
  ),
  download: ({ size = 13, color = "currentColor", sw = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  expand: ({ size = 12, color = "#fff", sw = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
    </svg>
  ),
  check: ({ size = 13, color = "currentColor", sw = 2.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  close: ({ size = 16, color = "currentColor", sw = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
};

const INFRA_ICONS = { road: Icon.road, water: Icon.water, light: Icon.light, power: Icon.power, community: Icon.community };

// ─── Projects data ────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "nairobi-interchange",
    title: "Nairobi Outer Ring Interchange",
    subtitle: "Urban Road Infrastructure",
    category: "Road & Bridge",
    status: "Completed",
    year: "2023",
    value: "KSh 1.2B",
    location: "Nairobi, Kenya",
    client: "Kenya Roads Board",
    govAlignment: "Kenya Vision 2030 — Infrastructure Pillar",
    heroImage: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1600&h=900&fit=crop&auto=format&q=75",
    masterplanImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=800&fit=crop&auto=format&q=75",
    overview: "A critical urban interchange connecting three major arterial roads in Nairobi's outer ring. Delivered 3 weeks ahead of schedule with zero lost-time incidents across an 18-month construction programme.",
    units: [
      { label: "Lane km Constructed", value: "24.6 km" },
      { label: "Interchange Ramps", value: "8" },
      { label: "Pedestrian Bridges", value: "3" },
      { label: "Drainage Structures", value: "47" },
    ],
    amenities: [
      "LED street lighting (solar-powered)",
      "Pedestrian walkways and crossings",
      "Storm water management system",
      "Road safety signage and markings",
      "Landscaping and green buffers",
    ],
    infrastructure: [
      { icon: "road",  label: "Roads",    detail: "24.6 km of dual carriageway with full kerbing and surfacing" },
      { icon: "water", label: "Drainage", detail: "Comprehensive storm water network with 47 drainage structures" },
      { icon: "light", label: "Lighting", detail: "Full solar LED street lighting along all interchange arms" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1520262494112-9fe481d36ec3?w=800&h=600&fit=crop&auto=format&q=75",
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop&auto=format&q=75",
      "https://images.unsplash.com/photo-1597106776019-b75892be2b7a?w=800&h=600&fit=crop&auto=format&q=75",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop&auto=format&q=75",
    ],
    investment: {
      totalValue: "KSh 1.2B",
      duration: "18 months",
      roi: "Public infrastructure — economic multiplier est. 4.2×",
      financing: "Government of Kenya — Roads Fund",
      keyMetrics: [
        { label: "Daily Traffic Volume",    value: "84,000 vehicles" },
        { label: "Journey Time Reduction",  value: "38%" },
        { label: "Accident Rate Reduction", value: "61%" },
      ],
    },
    brochureUrl: null,
    featured: true,
    accentColor: T.gold,
  },
  {
    id: "westlands-civic",
    title: "Westlands Civic Centre",
    subtitle: "Public Buildings & Institutions",
    category: "Building Construction",
    status: "Completed",
    year: "2022",
    value: "KSh 780M",
    location: "Westlands, Nairobi",
    client: "Nairobi City County",
    govAlignment: "Nairobi County Development Plan 2018–2022",
    heroImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&h=900&fit=crop&auto=format&q=75",
    masterplanImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=800&fit=crop&auto=format&q=75",
    overview: "A flagship civic centre housing county administration offices, a public library, community halls, and ground-floor retail. Delivered to ISO 9001-aligned quality standards with 98% snagging resolved at first sign-off.",
    units: [
      { label: "Gross Floor Area", value: "12,400 m²" },
      { label: "Floors",           value: "G + 7" },
      { label: "Office Suites",    value: "64" },
      { label: "Community Halls",  value: "3" },
    ],
    amenities: [
      "Public library — 600 seat capacity",
      "County administration offices",
      "Community multipurpose halls",
      "Basement parking — 180 bays",
      "Solar water heating and backup power",
      "Disabled access throughout",
    ],
    infrastructure: [
      { icon: "power",     label: "Electrical", detail: "Solar-backed electrical system with full UPS for critical services" },
      { icon: "water",     label: "Plumbing",   detail: "Solar water heating system serving all floors" },
      { icon: "road",      label: "Access",     detail: "New access road and landscaped public plaza" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop&auto=format&q=75",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&auto=format&q=75",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop&auto=format&q=75",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop&auto=format&q=75",
    ],
    investment: {
      totalValue: "KSh 780M",
      duration: "14 months",
      roi: "Public asset — long-term service delivery value",
      financing: "Nairobi City County Development Fund",
      keyMetrics: [
        { label: "Citizens Served Daily",       value: "3,200+" },
        { label: "Jobs Created (Construction)", value: "420" },
        { label: "Snagging Resolution Rate",    value: "98%" },
      ],
    },
    brochureUrl: null,
    featured: true,
    accentColor: "#6CA8C9",
  },
  {
    id: "northern-pipeline",
    title: "Northern Corridor Water Pipeline",
    subtitle: "Water & Utility Infrastructure",
    category: "Water Works",
    status: "Completed",
    year: "2023",
    value: "KSh 640M",
    location: "Isiolo–Marsabit Corridor",
    client: "Nairobi Water & Sewerage Co.",
    govAlignment: "Kenya National Water Master Plan",
    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&h=900&fit=crop&auto=format&q=75",
    masterplanImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=800&fit=crop&auto=format&q=75",
    overview: "A 117 km water transmission pipeline extending clean water access to 340,000+ residents across the Northern Corridor. Completed with zero lost-time incidents over a 16-month programme.",
    units: [
      { label: "Pipeline Length",       value: "117 km" },
      { label: "Pump Stations",         value: "4" },
      { label: "Storage Reservoirs",    value: "6" },
      { label: "Community Connections", value: "28" },
    ],
    amenities: [
      "28 community water kiosks",
      "6 elevated storage reservoirs",
      "Solar-powered pump stations",
      "SCADA remote monitoring system",
      "Wayleave restoration and landscaping",
    ],
    infrastructure: [
      { icon: "water",     label: "Pipeline", detail: "117 km DN400 steel pipeline with full cathodic protection" },
      { icon: "power",     label: "Energy",   detail: "4 solar-powered pump stations with grid backup" },
      { icon: "community", label: "Access",   detail: "28 community water points serving 340,000+ residents" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop&auto=format&q=75",
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop&auto=format&q=75",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop&auto=format&q=75",
      "https://images.unsplash.com/photo-1470093851219-69951fcbb533?w=800&h=600&fit=crop&auto=format&q=75",
    ],
    investment: {
      totalValue: "KSh 640M",
      duration: "16 months",
      roi: "Social infrastructure — water security for 340,000+ people",
      financing: "African Development Bank / Government of Kenya",
      keyMetrics: [
        { label: "Residents Served",  value: "340,000+" },
        { label: "Pipeline Length",   value: "117 km" },
        { label: "Safety Record",     value: "Zero LTI" },
      ],
    },
    brochureUrl: null,
    featured: false,
    accentColor: "#A8C96C",
  },
  {
    id: "ketraco-substation",
    title: "Olkaria–Lessos Transmission Substation",
    subtitle: "Energy Infrastructure",
    category: "Electrical Works",
    status: "Completed",
    year: "2022",
    value: "KSh 520M",
    location: "Nakuru County, Kenya",
    client: "KETRACO",
    govAlignment: "Kenya Electricity Expansion Programme — Vision 2030",
    heroImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1600&h=900&fit=crop&auto=format&q=75",
    masterplanImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=800&fit=crop&auto=format&q=75",
    overview: "A 220kV grid substation forming a critical node in Kenya's national transmission network. Delivered to KETRACO's stringent technical specifications with 99.98% uptime achieved in the first year of operation.",
    units: [
      { label: "Installed Capacity", value: "480 MW" },
      { label: "Transformer Bays",   value: "4" },
      { label: "Control Building",   value: "1,200 m²" },
      { label: "Site Area",          value: "8.4 ha" },
    ],
    amenities: [
      "220kV switchyard with GIS equipment",
      "SCADA and protection systems",
      "Perimeter security and CCTV",
      "Staff welfare facilities",
      "Fire suppression systems",
      "Internal access road network",
    ],
    infrastructure: [
      { icon: "power", label: "Grid",      detail: "480MW capacity connected to national transmission network" },
      { icon: "road",  label: "Access",    detail: "2.4 km access road with full drainage" },
      { icon: "water", label: "Fire Safety", detail: "Full fire suppression and water storage system" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop&auto=format&q=75",
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&h=600&fit=crop&auto=format&q=75",
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=600&fit=crop&auto=format&q=75",
      "https://images.unsplash.com/photo-1611365892117-bede7a956882?w=800&h=600&fit=crop&auto=format&q=75",
    ],
    investment: {
      totalValue: "KSh 520M",
      duration: "12 months",
      roi: "National grid infrastructure — serves 1.2M+ households",
      financing: "KETRACO / World Bank Energy Programme",
      keyMetrics: [
        { label: "Grid Capacity Added",  value: "480 MW" },
        { label: "First-Year Uptime",    value: "99.98%" },
        { label: "Households Served",    value: "1.2M+" },
      ],
    },
    brochureUrl: null,
    featured: false,
    accentColor: "#E2C47A",
  },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────
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

// ─── Gallery lightbox ─────────────────────────────────────────────────────────
function Gallery({ images, accent }) {
  const [lightbox, setLightbox] = useState(null);

  const prev = useCallback(e => {
    e.stopPropagation();
    setLightbox(i => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(e => {
    e.stopPropagation();
    setLightbox(i => (i + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const fn = e => { if (e.key === "Escape") setLightbox(null); if (e.key === "ArrowLeft") setLightbox(i => (i - 1 + images.length) % images.length); if (e.key === "ArrowRight") setLightbox(i => (i + 1) % images.length); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [lightbox, images.length]);

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setLightbox(i)}
            aria-label={`Open project photo ${i + 1} in lightbox`}
            style={{
              gridColumn: i === 0 ? "span 2" : "span 1",
              aspectRatio: i === 0 ? "16/9" : "4/3",
              borderRadius: 2,
              overflow: "hidden",
              cursor: "pointer",
              background: T.navyMid,
              border: "none",
              padding: 0,
              position: "relative",
              display: "block",
            }}
          >
            <img
              src={src}
              alt={`Project photo ${i + 1}`}
              loading="lazy"
              decoding="async"
              width="800"
              height="600"
              style={{
                width: "100%", height: "100%",
                objectFit: "cover", display: "block",
                filter: "brightness(0.88) contrast(1.05)",
                transition: "transform 0.4s ease, filter 0.3s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.filter = "brightness(1) contrast(1.05)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.filter = "brightness(0.88) contrast(1.05)"; }}
            />
            {/* Expand hint */}
            <div aria-hidden="true" style={{
              position: "absolute", bottom: 10, right: 10,
              background: "rgba(14,21,35,0.7)",
              borderRadius: 2, padding: "5px 7px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon.expand size={11} />
            </div>
            {/* Accent line on hover */}
            <div aria-hidden="true" style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
              background: accent,
              transform: "scaleX(0)", transformOrigin: "left",
              transition: "transform 0.35s ease",
            }} className="gallery-accent" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Project photo lightbox"
          style={{
            position: "fixed", inset: 0, zIndex: 3000,
            background: "rgba(10,13,20,0.96)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "clamp(16px,4vw,40px)",
          }}
          onClick={() => setLightbox(null)}
        >
          <img
            src={images[lightbox]}
            alt={`Project gallery image ${lightbox + 1}`}
            style={{
              maxWidth: "90vw", maxHeight: "85vh",
              borderRadius: 2, objectFit: "contain",
              boxShadow: "0 40px 120px rgba(0,0,0,0.8)",
            }}
            onClick={e => e.stopPropagation()}
          />
          {/* Controls */}
          <button onClick={() => setLightbox(null)} aria-label="Close lightbox"
            style={{
              position: "absolute", top: 20, right: 20,
              background: "rgba(255,255,255,0.08)",
              border: `1px solid rgba(255,255,255,0.15)`,
              borderRadius: "50%", width: 44, height: 44,
              color: T.white, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
            <Icon.close size={16} color="#fff" />
          </button>
          <button onClick={prev} aria-label="Previous photo"
            style={{
              position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.08)",
              border: `1px solid rgba(255,255,255,0.15)`,
              borderRadius: "50%", width: 48, height: 48,
              color: T.white, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
            <Icon.arrowLeft size={18} color="#fff" />
          </button>
          <button onClick={next} aria-label="Next photo"
            style={{
              position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.08)",
              border: `1px solid rgba(255,255,255,0.15)`,
              borderRadius: "50%", width: 48, height: 48,
              color: T.white, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
            <Icon.arrowRight size={18} color="#fff" />
          </button>
          {/* Counter */}
          <div style={{
            position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)",
            fontFamily: T.mono, fontSize: 11, color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.12em",
          }}>
            {lightbox + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}

// ─── Project card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index, onSelect }) {
  const [hov, setHov] = useState(false);
  const [ref, visible] = useInView(0.1);

  return (
    <article
      ref={ref}
      itemScope
      itemType="https://schema.org/CreativeWork"
      onClick={() => onSelect(project)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      tabIndex={0}
      role="button"
      aria-label={`View ${project.title}`}
      onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(project); } }}
      style={{
        borderRadius: 2,
        overflow: "hidden",
        background: T.white,
        border: `1px solid ${hov ? project.accentColor + "50" : "rgba(14,21,35,0.08)"}`,
        boxShadow: hov
          ? `0 20px 56px rgba(14,21,35,0.14), 0 4px 16px rgba(14,21,35,0.06)`
          : "0 2px 12px rgba(14,21,35,0.04)",
        cursor: "pointer",
        transform: hov ? "translateY(-6px)" : "translateY(0)",
        opacity: visible ? 1 : 0,
        transition: [
          "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
          "box-shadow 0.4s ease",
          "border-color 0.3s ease",
          `opacity 0.6s ease ${index * 0.09}s`,
        ].join(", "),
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: 230, overflow: "hidden", background: T.navyMid }}>
        <img
          src={project.heroImage}
          alt={project.title}
          loading="lazy"
          decoding="async"
          width="800"
          height="440"
          itemProp="image"
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            filter: "brightness(0.82) contrast(1.06) saturate(0.9)",
            transform: hov ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        {/* Gradient overlay */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(10,13,20,0.82) 0%, transparent 55%)",
        }} />
        {/* Status badge */}
        <div style={{
          position: "absolute", top: 14, left: 14,
          background: project.status === "Completed"
            ? "rgba(168,201,108,0.9)"
            : "rgba(201,168,76,0.9)",
          backdropFilter: "blur(8px)",
          color: T.navy, borderRadius: 2,
          fontFamily: T.mono, fontSize: 9, fontWeight: 600,
          letterSpacing: "0.18em", textTransform: "uppercase",
          padding: "5px 10px",
        }}>{project.status}</div>
        {/* Featured badge */}
        {project.featured && (
          <div style={{
            position: "absolute", top: 14, right: 14,
            background: "rgba(14,21,35,0.75)",
            backdropFilter: "blur(10px)",
            color: T.gold, borderRadius: 2,
            fontFamily: T.mono, fontSize: 9, fontWeight: 600,
            letterSpacing: "0.18em", textTransform: "uppercase",
            padding: "5px 10px",
            border: `1px solid ${T.gold}30`,
          }}>Featured</div>
        )}
        {/* Value */}
        <div style={{
          position: "absolute", bottom: 14, left: 14,
          fontFamily: T.display, fontSize: 22, fontWeight: 700,
          color: T.white, letterSpacing: "-0.01em",
          textShadow: "0 2px 12px rgba(0,0,0,0.6)",
        }}>{project.value}</div>
        {/* Accent bar */}
        <div aria-hidden="true" style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, ${project.accentColor}, transparent)`,
          transform: hov ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.4s ease",
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: "20px 22px 22px" }}>
        <div style={{
          fontFamily: T.mono, fontSize: 9, fontWeight: 500,
          color: project.accentColor, letterSpacing: "0.18em",
          textTransform: "uppercase", marginBottom: 8,
        }}>
          {project.category} · {project.year}
        </div>
        <h3 itemProp="name" style={{
          fontFamily: T.display,
          fontSize: "clamp(17px,1.6vw,20px)",
          fontWeight: 600, color: T.navy,
          letterSpacing: "-0.01em", lineHeight: 1.2, marginBottom: 10,
        }}>{project.title}</h3>
        <p itemProp="description" style={{
          fontFamily: T.sans, fontSize: 13, color: T.slate,
          lineHeight: 1.7, margin: "0 0 16px",
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden",
          fontWeight: 300,
        }}>{project.overview}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{
            fontFamily: T.sans, fontSize: 11, color: T.mist,
            display: "flex", alignItems: "center", gap: 5,
          }}>
            <Icon.pin size={11} color={T.mist} />
            {project.location}
          </span>
          <span style={{
            fontFamily: T.sans, fontSize: 11, fontWeight: 600,
            color: hov ? project.accentColor : T.mist,
            transition: "color 0.22s",
            display: "flex", alignItems: "center", gap: 5,
          }}>
            View project
            <Icon.arrowRight size={11} color={hov ? project.accentColor : T.mist} />
          </span>
        </div>
      </div>
    </article>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────
function SectionLabel({ color, children }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
      <div style={{ width: 20, height: 1, background: `linear-gradient(90deg, ${color}, transparent)` }} />
      <span style={{
        fontFamily: T.mono, fontSize: 9, fontWeight: 500,
        color, letterSpacing: "0.22em", textTransform: "uppercase",
      }}>{children}</span>
    </div>
  );
}

// ─── Project detail panel ─────────────────────────────────────────────────────
function ProjectDetail({ project, onClose }) {
  const accent = project.accentColor;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const fn = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", fn); };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-title"
      style={{ position: "fixed", inset: 0, zIndex: 1000, background: T.ivory, overflowY: "auto" }}
    >
      {/* Sticky header */}
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "rgba(248,245,239,0.97)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: T.border,
        boxShadow: "0 1px 0 rgba(14,21,35,0.05)",
        padding: "0 clamp(16px,3vw,32px)",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", height: 60,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button
              onClick={onClose}
              aria-label="Back to all projects"
              style={{
                background: "none", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 7,
                fontFamily: T.sans, fontSize: 12, fontWeight: 500,
                color: T.slate, padding: 0,
              }}
            >
              <Icon.arrowLeft size={14} color={T.slate} />
              All Projects
            </button>
            <span aria-hidden="true" style={{ color: "rgba(14,21,35,0.15)", fontSize: 18, lineHeight: 1 }}>|</span>
            <span style={{ fontFamily: T.display, fontSize: 15, fontWeight: 600, color: T.navy }}>{project.title}</span>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {project.brochureUrl && (
              <a href={project.brochureUrl} download style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: T.white, border: `1px solid rgba(14,21,35,0.12)`,
                color: T.navy, borderRadius: 2, padding: "8px 14px",
                fontFamily: T.sans, fontSize: 11, fontWeight: 600,
                textDecoration: "none", letterSpacing: "0.06em", textTransform: "uppercase",
              }}>
                <Icon.download size={12} color={T.navy} />
                Brochure
              </a>
            )}
            <Link to="/contact" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: accent, color: T.navy, borderRadius: 2,
              padding: "8px 16px", fontFamily: T.sans, fontSize: 11,
              fontWeight: 700, textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase",
            }}>
              Enquire
              <Icon.arrowRight size={11} color={T.navy} />
            </Link>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div style={{ position: "relative", height: "clamp(280px,42vw,520px)", overflow: "hidden", background: T.navyMid }}>
        <img
          src={project.heroImage}
          alt={project.title}
          width="1600" height="900"
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.58) contrast(1.06) saturate(0.85)" }}
        />
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(10,13,20,0.88) 0%, rgba(10,13,20,0.2) 60%, transparent 100%)",
        }} />
        {/* Gold bottom rule */}
        <div aria-hidden="true" style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, ${accent}, transparent 70%)`,
        }} />
        <div style={{
          position: "absolute", bottom: "clamp(24px,4vw,52px)", left: 0, right: 0,
          padding: "0 clamp(16px,3vw,32px)",
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{
              fontFamily: T.mono, fontSize: 10, fontWeight: 500,
              color: accent, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12,
            }}>
              {project.category} · {project.location} · {project.year}
            </div>
            <h1 id="detail-title" style={{
              fontFamily: T.display,
              fontSize: "clamp(28px,4.5vw,56px)",
              fontWeight: 700, color: T.white,
              letterSpacing: "-0.025em", lineHeight: 1.0, marginBottom: 14,
            }}>{project.title}</h1>
            <p style={{
              fontFamily: T.sans,
              fontSize: "clamp(13px,1.3vw,16px)",
              color: "rgba(255,255,255,0.55)", lineHeight: 1.75, maxWidth: 580, fontWeight: 300,
            }}>{project.overview}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(16px,3vw,32px)" }}>

        {/* Quick stats */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4,1fr)",
          gap: 1, background: "rgba(14,21,35,0.06)",
          borderRadius: "0 0 2px 2px", overflow: "hidden",
          marginBottom: "clamp(48px,6vw,80px)",
        }} className="stats-bar">
          {[
            { label: "Project Value", value: project.value },
            { label: "Duration",      value: project.investment.duration },
            { label: "Client",        value: project.client },
            { label: "Status",        value: project.status },
          ].map(s => (
            <div key={s.label} style={{ background: T.white, padding: "20px 22px", textAlign: "center" }}>
              <div style={{
                fontFamily: T.mono, fontSize: 9, color: T.mist,
                letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6,
              }}>{s.label}</div>
              <div style={{
                fontFamily: T.display, fontSize: "clamp(15px,1.6vw,20px)",
                fontWeight: 700, color: T.navy, letterSpacing: "-0.01em",
              }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Masterplan + breakdown */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,5vw,72px)", marginBottom: "clamp(48px,6vw,80px)", alignItems: "start" }} className="detail-grid">
          <div>
            <SectionLabel color={accent}>Masterplan</SectionLabel>
            <div style={{ borderRadius: 2, overflow: "hidden", aspectRatio: "4/3", background: T.navyMid, position: "relative" }}>
              <img
                src={project.masterplanImage}
                alt={`${project.title} masterplan`}
                loading="lazy" decoding="async" width="1200" height="800"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.9)" }}
              />
              <div aria-hidden="true" style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, ${accent}, transparent)`,
              }} />
            </div>
          </div>

          <div>
            <SectionLabel color={accent}>Project Breakdown</SectionLabel>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 28 }}>
              {project.units.map(u => (
                <div key={u.label} style={{
                  background: T.white, border: `1px solid rgba(14,21,35,0.08)`,
                  borderTop: `2px solid ${accent}`,
                  borderRadius: 2, padding: "16px 18px",
                }}>
                  <div style={{
                    fontFamily: T.display,
                    fontSize: "clamp(18px,2vw,26px)",
                    fontWeight: 700, color: accent, lineHeight: 1, marginBottom: 6,
                  }}>{u.value}</div>
                  <div style={{
                    fontFamily: T.mono, fontSize: 9, color: T.mist,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                  }}>{u.label}</div>
                </div>
              ))}
            </div>

            <SectionLabel color={accent}>Amenities & Features</SectionLabel>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
              {project.amenities.map(a => (
                <li key={a} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{
                    width: 18, height: 18, borderRadius: "50%",
                    background: accent + "18",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: 1,
                  }}>
                    <Icon.check size={10} color={accent} sw={2.5} />
                  </span>
                  <span style={{ fontFamily: T.sans, fontSize: 13, color: T.slate, lineHeight: 1.65, fontWeight: 300 }}>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Infrastructure */}
        <div style={{ marginBottom: "clamp(48px,6vw,80px)" }}>
          <SectionLabel color={accent}>Infrastructure</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(10px,1.5vw,18px)" }} className="infra-grid">
            {project.infrastructure.map(item => {
              const InfraIcon = INFRA_ICONS[item.icon] || Icon.road;
              return (
                <div key={item.label} style={{
                  background: T.white,
                  border: `1px solid rgba(14,21,35,0.08)`,
                  borderTop: `2px solid ${accent}`,
                  borderRadius: 2, padding: "20px 20px",
                }}>
                  <div style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    width: 36, height: 36, borderRadius: 6,
                    background: accent + "14",
                    marginBottom: 14,
                  }}>
                    <InfraIcon size={17} color={accent} sw={1.6} />
                  </div>
                  <div style={{ fontFamily: T.display, fontSize: 17, fontWeight: 600, color: T.navy, marginBottom: 8 }}>{item.label}</div>
                  <p style={{ fontFamily: T.sans, fontSize: 12, color: T.slate, lineHeight: 1.7, margin: 0, fontWeight: 300 }}>{item.detail}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Gallery */}
        <div style={{ marginBottom: "clamp(48px,6vw,80px)" }}>
          <SectionLabel color={accent}>Project Gallery</SectionLabel>
          <Gallery images={project.gallery} accent={accent} />
        </div>

        {/* Investment + Gov alignment */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(20px,3vw,40px)", marginBottom: "clamp(64px,8vw,100px)" }} className="invest-grid">

          {/* Investment card */}
          <div style={{
            background: T.navy, borderRadius: 2,
            padding: "clamp(24px,3vw,36px)",
            position: "relative", overflow: "hidden",
          }}>
            {/* Grid texture */}
            <div aria-hidden="true" style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              backgroundImage: `linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }} />
            <div aria-hidden="true" style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 2,
              background: `linear-gradient(90deg, ${accent}, transparent 60%)`,
            }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <SectionLabel color={accent}>Investment Overview</SectionLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                {[
                  { l: "Total Project Value",   v: project.investment.totalValue },
                  { l: "Construction Duration", v: project.investment.duration },
                  { l: "Financing",             v: project.investment.financing },
                ].map(r => (
                  <div key={r.l} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "baseline",
                    paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.06)",
                    gap: 16,
                  }}>
                    <span style={{ fontFamily: T.sans, fontSize: 12, color: "rgba(255,255,255,0.35)", fontWeight: 300, flexShrink: 0 }}>{r.l}</span>
                    <span style={{ fontFamily: T.display, fontSize: 15, fontWeight: 600, color: T.white, textAlign: "right" }}>{r.v}</span>
                  </div>
                ))}
              </div>
              <div style={{
                fontFamily: T.mono, fontSize: 9, fontWeight: 500,
                color: accent, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 16,
              }}>Key Metrics</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                {project.investment.keyMetrics.map(m => (
                  <div key={m.label} style={{
                    textAlign: "center",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 2, padding: "14px 8px",
                  }}>
                    <div style={{
                      fontFamily: T.display, fontSize: "clamp(14px,1.6vw,20px)",
                      fontWeight: 700, color: accent, lineHeight: 1, marginBottom: 6,
                    }}>{m.value}</div>
                    <div style={{
                      fontFamily: T.mono, fontSize: 8, color: "rgba(255,255,255,0.28)",
                      letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1.4,
                    }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Government alignment card */}
          <div style={{
            background: T.white, borderRadius: 2,
            border: `1px solid rgba(14,21,35,0.08)`,
            borderLeft: `2px solid ${accent}`,
            padding: "clamp(24px,3vw,36px)",
          }}>
            <SectionLabel color={accent}>Government Alignment</SectionLabel>
            <div style={{
              background: T.ivory, border: `1px solid rgba(14,21,35,0.07)`,
              borderRadius: 2, padding: "14px 16px", marginBottom: 22,
            }}>
              <div style={{ fontFamily: T.mono, fontSize: 9, color: T.mist, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Policy Framework</div>
              <div style={{ fontFamily: T.display, fontSize: 16, fontWeight: 600, color: T.navy }}>{project.govAlignment}</div>
            </div>
            <div style={{
              fontFamily: T.mono, fontSize: 9, color: T.mist,
              letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14,
            }}>Compliance & Standards</div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "Full compliance with Kenya Roads Board / relevant authority standards",
                "ISO-aligned quality management throughout construction",
                "All statutory and regulatory requirements met",
                "Environmental impact assessment completed and approved",
                "Community consultation and stakeholder engagement conducted",
              ].map(pt => (
                <li key={pt} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{
                    width: 18, height: 18, borderRadius: "50%",
                    background: accent + "14",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: 1,
                  }}>
                    <Icon.check size={10} color={accent} sw={2.5} />
                  </span>
                  <span style={{ fontFamily: T.sans, fontSize: 12, color: T.slate, lineHeight: 1.65, fontWeight: 300 }}>{pt}</span>
                </li>
              ))}
            </ul>
            {project.brochureUrl && (
              <a href={project.brochureUrl} download style={{
                display: "inline-flex", alignItems: "center", gap: 8, marginTop: 24,
                background: accent, color: T.navy, borderRadius: 2,
                padding: "12px 20px", fontFamily: T.sans, fontSize: 11,
                fontWeight: 700, textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase",
              }}>
                <Icon.download size={12} color={T.navy} />
                Download Project Brochure
              </a>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .stats-bar  { grid-template-columns: repeat(4,1fr); }
        .detail-grid, .invest-grid { grid-template-columns: 1fr 1fr; }
        .infra-grid { grid-template-columns: repeat(3,1fr); }
        @media (max-width: 768px) {
          .stats-bar  { grid-template-columns: repeat(2,1fr) !important; }
          .detail-grid, .invest-grid { grid-template-columns: 1fr !important; }
          .infra-grid { grid-template-columns: 1fr !important; }
        }
        button:focus-visible { outline: 2px solid ${T.gold}; outline-offset: 3px; border-radius: 2px; }
      `}</style>
    </div>
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
      {/* Large decorative "P" */}
      <div aria-hidden="true" style={{
        position: "absolute", right: "-0.04em", top: "50%",
        transform: "translateY(-50%)",
        fontFamily: T.display, fontSize: "clamp(240px,28vw,400px)",
        fontWeight: 700, color: "rgba(201,168,76,0.04)",
        lineHeight: 1, userSelect: "none", pointerEvents: "none",
        letterSpacing: "-0.04em",
      }}>P</div>
      {/* Gold bottom rule */}
      <div aria-hidden="true" style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, ${T.gold}, transparent 70%)`,
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: 32 }}>
          <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", alignItems: "center", gap: 10 }}>
            <li><Link to="/" style={{ fontFamily: T.mono, fontSize: 10, color: "rgba(255,255,255,0.32)", textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase" }}>Home</Link></li>
            <li aria-hidden="true" style={{ color: T.goldDim, fontSize: 10 }}>›</li>
            <li><span style={{ fontFamily: T.mono, fontSize: 10, color: T.goldLight, letterSpacing: "0.1em", textTransform: "uppercase" }} aria-current="page">Projects</span></li>
          </ol>
        </nav>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "clamp(24px,4vw,64px)", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 320px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20,
              opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(10px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}>
              <div style={{ width: 32, height: 1, background: T.gold }} />
              <span style={{ fontFamily: T.mono, fontSize: 9, color: T.gold, letterSpacing: "0.26em", textTransform: "uppercase" }}>Our Portfolio</span>
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
              Projects That<br />
              <em style={{ color: T.goldLight, fontStyle: "italic" }}>Define Kenya</em>
            </h1>
            <p style={{
              fontFamily: T.sans,
              fontSize: "clamp(14px,1.4vw,16px)",
              color: "rgba(255,255,255,0.42)", lineHeight: 1.8, maxWidth: 480, margin: 0, fontWeight: 300,
              opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}>
              Roads, buildings, water systems, and energy infrastructure — every project
              delivered on time, within budget, to the highest standard.
            </p>
          </div>

          {/* Stats */}
          <div className="hero-stats" style={{
            display: "grid", gridTemplateColumns: "repeat(3,1fr)",
            border: `1px solid rgba(201,168,76,0.14)`,
            borderRadius: 2, overflow: "hidden", flexShrink: 0,
            opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
          }}>
            {[{ v: "KSh 4.2B+", l: "Delivered" }, { v: "47+", l: "Projects" }, { v: "98%", l: "On Time" }].map((s, i) => (
              <div key={s.l} style={{
                padding: "clamp(18px,2.5vw,28px) clamp(14px,2vw,24px)",
                borderRight: i < 2 ? `1px solid rgba(201,168,76,0.14)` : "none",
                textAlign: "center",
                background: "rgba(255,255,255,0.03)",
              }}>
                <div style={{ fontFamily: T.display, fontSize: "clamp(18px,2.4vw,30px)", fontWeight: 700, color: T.gold, lineHeight: 1, letterSpacing: "-0.02em", marginBottom: 6 }}>{s.v}</div>
                <div style={{ fontFamily: T.mono, fontSize: 9, color: "rgba(255,255,255,0.28)", letterSpacing: "0.14em", textTransform: "uppercase" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── Projects index page ──────────────────────────────────────────────────────
export function ProjectsPage() {
  const [selected, setSelected] = useState(null);
  const [filter,   setFilter]   = useState("All");
  const [hovCTA,   setHovCTA]   = useState(false);
  const [ctaRef, ctaVisible] = useInView(0.2);

  const categories = ["All", ...new Set(PROJECTS.map(p => p.category))];
  const filtered   = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  if (selected) return <ProjectDetail project={selected} onClose={() => setSelected(null)} />;

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href={FONTS_HREF} rel="stylesheet" />

      <div style={{ background: T.ivory, minHeight: "100vh" }}>
        <Hero />

        {/* Filter bar */}
        <nav
          aria-label="Filter projects by category"
          style={{
            borderBottom: T.border,
            padding: "0 clamp(16px,3vw,32px)",
            position: "sticky", top: 68, zIndex: 50,
            background: "rgba(248,245,239,0.97)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: "0 1px 0 rgba(14,21,35,0.05)",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", overflowX: "auto", scrollbarWidth: "none" }}>
            {categories.map(cat => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  aria-pressed={active}
                  style={{
                    fontFamily: T.sans, fontSize: 11,
                    fontWeight: active ? 600 : 400,
                    color: active ? T.gold : T.slate,
                    background: "none", border: "none",
                    borderBottom: `2px solid ${active ? T.gold : "transparent"}`,
                    padding: "14px clamp(10px,1.4vw,18px)",
                    cursor: "pointer", whiteSpace: "nowrap",
                    transition: "color 0.22s, border-color 0.22s",
                    letterSpacing: "0.04em", textTransform: "uppercase",
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = T.navy; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = T.slate; }}
                >{cat}</button>
              );
            })}
          </div>
        </nav>

        {/* Grid */}
        <main
          id="main-content"
          tabIndex={-1}
          style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(40px,5vw,64px) clamp(16px,3vw,32px)" }}
        >
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))",
            gap: "clamp(16px,2vw,28px)",
          }}>
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} onSelect={setSelected} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div
            ref={ctaRef}
            style={{
              marginTop: "clamp(48px,6vw,80px)",
              textAlign: "center",
              padding: "clamp(48px,6vw,80px) clamp(24px,4vw,48px)",
              background: T.navy, borderRadius: 2,
              position: "relative", overflow: "hidden",
              opacity: ctaVisible ? 1 : 0,
              transform: ctaVisible ? "none" : "translateY(28px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            {/* Hatching texture */}
            <div aria-hidden="true" style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              backgroundImage: `repeating-linear-gradient(-45deg, rgba(201,168,76,0.025) 0, rgba(201,168,76,0.025) 1px, transparent 1px, transparent 18px)`,
            }} />
            {/* Gold top rule */}
            <div aria-hidden="true" style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 1,
              background: `linear-gradient(90deg, ${T.gold}, transparent 60%)`,
            }} />
            {/* Corner accents */}
            {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h]) => (
              <div key={v+h} aria-hidden="true" style={{
                position: "absolute", [v]: 24, [h]: 24, width: 20, height: 20,
                borderColor: "rgba(201,168,76,0.25)", borderStyle: "solid",
                borderWidth: v==="top"&&h==="left"?"2px 0 0 2px":v==="top"&&h==="right"?"2px 2px 0 0":v==="bottom"&&h==="left"?"0 0 2px 2px":"0 2px 2px 0",
              }} />
            ))}

            <div style={{ position: "relative", zIndex: 1, maxWidth: 480, margin: "0 auto" }}>
              <div style={{ fontFamily: T.mono, fontSize: 9, fontWeight: 500, color: T.gold, letterSpacing: "0.26em", textTransform: "uppercase", marginBottom: 18 }}>
                Have a project in mind?
              </div>
              <h2 style={{
                fontFamily: T.display,
                fontSize: "clamp(28px,4vw,48px)",
                fontWeight: 600, color: T.white,
                letterSpacing: "-0.02em", lineHeight: 1.06, marginBottom: 16,
              }}>
                Tell us about<br />
                <em style={{ color: T.goldLight, fontStyle: "italic" }}>your vision</em>
              </h2>
              <p style={{
                fontFamily: T.sans, fontSize: 14, color: "rgba(255,255,255,0.35)",
                lineHeight: 1.8, marginBottom: 36, fontWeight: 300,
              }}>
                We respond within 24 hours with a clear proposal. Competitive pricing, transparent timelines, no obligations.
              </p>
              <Link
                to="/contact"
                onMouseEnter={() => setHovCTA(true)}
                onMouseLeave={() => setHovCTA(false)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  background: hovCTA ? T.goldLight : T.gold,
                  color: T.navy,
                  fontFamily: T.sans, fontSize: 12, fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  textDecoration: "none", padding: "15px 32px", borderRadius: 2,
                  transition: "background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
                  transform: hovCTA ? "translateY(-2px)" : "none",
                  boxShadow: hovCTA ? `0 12px 40px rgba(201,168,76,0.35)` : `0 4px 16px rgba(201,168,76,0.2)`,
                }}
              >
                Start a Conversation
                <Icon.arrowRight size={13} color={T.navy} sw={2.5} />
              </Link>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        *:focus-visible {
          outline: 2px solid ${T.gold};
          outline-offset: 3px;
          border-radius: 2px;
        }
        html { scroll-behavior: smooth; }
        nav::-webkit-scrollbar { display: none; }
        @media (max-width: 768px) {
          .hero-stats { width: 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
          html { scroll-behavior: auto; }
        }
      `}</style>
    </>
  );
}