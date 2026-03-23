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

// ─── SVG icons ────────────────────────────────────────────────────────────────
const Icon = {
  arrowLeft: ({ size = 14, color = "currentColor", sw = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M5 12l7 7M5 12l7-7"/></svg>
  ),
  arrowRight: ({ size = 12, color = "currentColor", sw = 2.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
  ),
  mail: ({ size = 13, color = "currentColor", sw = 1.8 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
  ),
  clock: ({ size = 11, color = "currentColor", sw = 1.6 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
  mic: ({ size = 18, color = "currentColor", sw = 1.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
  ),
};

// ─── Article data ─────────────────────────────────────────────────────────────
const ARTICLES = [
  {
    id: 1,
    slug: "nairobi-interchange-completed",
    category: "Project Update",
    tag: "Roads",
    title: "Nairobi Outer Ring Interchange Delivered 3 Weeks Ahead of Schedule",
    excerpt: "Spacemine Holdings has completed the Nairobi Outer Ring Interchange — one of the most complex urban road projects in the city's recent history — three weeks ahead of the contractual completion date.",
    body: `Spacemine Holdings Limited has delivered the Nairobi Outer Ring Interchange project to the Kenya Roads Board, completing all works three weeks ahead of the contractual completion date and within the approved budget.\n\nThe 18-month construction programme involved 24.6 km of dual carriageway, 8 interchange ramps, and 3 pedestrian bridges — all delivered with zero lost-time incidents across the entire project duration.\n\n"This project is a testament to what detailed planning, proactive risk management, and a committed site team can achieve," said [Director Name], Director of Engineering at Spacemine Holdings. "We're proud to have delivered infrastructure that will serve Nairobi commuters for decades."\n\nThe interchange is expected to reduce peak-hour journey times along the outer ring by up to 38% and has already been identified by the Kenya Roads Board as a model for future urban road delivery programmes.`,
    date: "March 2024",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&h=700&fit=crop&auto=format&q=75",
    featured: true,
    accentColor: T.gold,
  },
  {
    id: 2,
    slug: "ketraco-substation-energised",
    category: "Announcement",
    tag: "Energy",
    title: "Olkaria–Lessos Substation Successfully Energised by KETRACO",
    excerpt: "The 480MW substation constructed by Spacemine Holdings for KETRACO has been successfully energised, bringing additional grid capacity to Nakuru County and the surrounding region.",
    body: `The 220kV Olkaria–Lessos transmission substation, constructed by Spacemine Holdings Limited for the Kenya Electricity Transmission Company (KETRACO), has been successfully energised and commissioned.\n\nThe facility adds 480MW of grid capacity to the national transmission network and is now operating at 99.98% uptime in its first month of service — exceeding the contracted SLA of 99.9%.\n\nThe project was delivered in 12 months to KETRACO's stringent technical specifications, including full SCADA integration, GIS switchgear, and a comprehensive perimeter security and CCTV system.\n\nSpacemine's Electrical Works division managed the full scope of civil, structural, and electromechanical works, working in close coordination with KETRACO's project team throughout the construction programme.`,
    date: "January 2024",
    readTime: "2 min",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=700&fit=crop&auto=format&q=75",
    featured: false,
    accentColor: T.goldLight,
  },
  {
    id: 3,
    slug: "northern-pipeline-communities",
    category: "Community Impact",
    tag: "Water",
    title: "340,000 Residents Gain Clean Water Access Through Northern Corridor Pipeline",
    excerpt: "The completion of the 117 km Northern Corridor Water Pipeline marks a milestone in water access for communities across the Isiolo–Marsabit corridor.",
    body: `The completion of the 117km Northern Corridor Water Pipeline has brought clean, reliable water access to 340,000 residents across the Isiolo–Marsabit corridor — one of Kenya's most water-stressed regions.\n\nThe project, commissioned by Nairobi Water & Sewerage Company and delivered by Spacemine Holdings over a 16-month programme, includes 28 community water kiosks, 6 elevated storage reservoirs, and four solar-powered pump stations.\n\n"Access to clean water is the foundation of community health, education, and economic development," said [Name], Project Director at Spacemine Holdings. "This pipeline will change lives — and that's why we do what we do."\n\nThe project was completed with zero lost-time incidents across the entire construction programme and has been nominated for the Kenya Engineering Awards 2024 in the Water Infrastructure category.`,
    date: "November 2023",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=700&fit=crop&auto=format&q=75",
    featured: false,
    accentColor: "#A8C96C",
  },
  {
    id: 4,
    slug: "spacemine-bbbee-commitment",
    category: "Company News",
    tag: "Governance",
    title: "Spacemine Reaffirms BBBEE Commitment Across 2024 Project Programme",
    excerpt: "Spacemine Holdings Limited has announced the continuation and expansion of its Broad-Based Black Economic Empowerment programme across all 2024 project operations.",
    body: `Spacemine Holdings Limited has reaffirmed its commitment to Broad-Based Black Economic Empowerment (BBBEE) principles across its full 2024 project programme, covering skills development, supplier development, and socio-economic development initiatives.\n\nThe company has committed to sourcing a minimum of 40% of its subcontractor and supplier spend from BBBEE-compliant entities, and has expanded its artisan training programme to include 60 new trainees across road, civil, and electrical disciplines.\n\n"BBBEE is not a compliance checkbox for us — it's core to how we operate," said [Director Name]. "We believe that the construction industry has a responsibility to actively develop the workforce and supplier base that will build Kenya's next decade of infrastructure."\n\nSpacemine's BBBEE programme is independently audited annually, with results available to clients and partners on request.`,
    date: "September 2023",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=700&fit=crop&auto=format&q=75",
    featured: false,
    accentColor: "#6CA8C9",
  },
  {
    id: 5,
    slug: "westlands-civic-handover",
    category: "Project Update",
    tag: "Buildings",
    title: "Westlands Civic Centre Handed Over to Nairobi City County",
    excerpt: "Spacemine Holdings has successfully handed over the Westlands Civic Centre to Nairobi City County, completing the 12,400m² development with a 98% first-pass snagging resolution rate.",
    body: `Spacemine Holdings Limited has formally handed over the Westlands Civic Centre to Nairobi City County, bringing to a close a 14-month construction programme that delivered 12,400m² of public space across G+7 floors.\n\nThe centre, which houses county administration offices, a 600-seat public library, three community multipurpose halls, and 180-bay basement parking, was delivered with a 98% snagging resolution rate at first sign-off — among the highest ever recorded on a Nairobi County project.\n\nThe building features a full solar water heating system, disabled access throughout, and backup power for critical services — all designed to minimise long-term operational costs for the county.\n\n"Our team's focus on quality at every stage — from pour to plaster to finishing — is what drives results like this," said [Name]. "We're proud to have delivered a facility that the people of Westlands can be proud of."`,
    date: "July 2023",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=700&fit=crop&auto=format&q=75",
    featured: false,
    accentColor: "#C96C8A",
  },
];

const CATEGORIES = ["All", ...new Set(ARTICLES.map(a => a.category))];

// ─── Hook ─────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.08) {
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

// ─── Shared label ─────────────────────────────────────────────────────────────
function SectionLabel({ color = T.gold, children }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <div style={{ width: 22, height: 1, background: `linear-gradient(90deg, ${color}, transparent)` }} />
      <span style={{ fontFamily: T.mono, fontSize: 9, fontWeight: 500, color, letterSpacing: "0.24em", textTransform: "uppercase" }}>{children}</span>
    </div>
  );
}

// ─── Category badge ───────────────────────────────────────────────────────────
function CategoryBadge({ label, color }) {
  return (
    <span style={{
      fontFamily: T.mono, fontSize: 8, fontWeight: 600,
      background: color + "18", color,
      border: `1px solid ${color}30`,
      padding: "4px 10px", borderRadius: 2,
      letterSpacing: "0.16em", textTransform: "uppercase",
    }}>{label}</span>
  );
}

// ─── Article detail ───────────────────────────────────────────────────────────
function ArticleDetail({ article, onClose }) {
  const accent = article.accentColor;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const fn = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", fn); };
  }, [onClose]);

  const paragraphs = article.body.split("\n\n");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-title"
      style={{ position: "fixed", inset: 0, zIndex: 1000, background: T.ivory, overflowY: "auto" }}
    >
      {/* Sticky nav */}
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "rgba(248,245,239,0.97)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: `1px solid rgba(14,21,35,0.07)`,
        boxShadow: "0 1px 0 rgba(14,21,35,0.04)",
        padding: "0 clamp(16px,3vw,32px)",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", height: 58,
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <button
            onClick={onClose}
            aria-label="Back to all news"
            style={{
              background: "none", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 7,
              fontFamily: T.sans, fontSize: 12, fontWeight: 500, color: T.slate,
              padding: 0, flexShrink: 0,
            }}
          >
            <Icon.arrowLeft size={14} color={T.slate} />
            All News
          </button>
          <span aria-hidden="true" style={{ color: "rgba(14,21,35,0.15)", fontSize: 18 }}>|</span>
          <span style={{
            fontFamily: T.sans, fontSize: 12, color: T.mist,
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            fontWeight: 300,
          }}>{article.title}</span>
        </div>
      </div>

      {/* Hero image */}
      <div style={{
        position: "relative",
        height: "clamp(240px,38vw,480px)",
        overflow: "hidden", background: T.navyMid,
      }}>
        <img
          src={article.image}
          alt={article.title}
          width="1200" height="700"
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.52) contrast(1.06) saturate(0.85)" }}
        />
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(10,13,20,0.9) 0%, rgba(10,13,20,0.15) 65%, transparent 100%)",
        }} />
        {/* Gold bottom rule */}
        <div aria-hidden="true" style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, ${accent}, transparent 60%)`,
        }} />

        {/* Hero overlay content */}
        <div style={{
          position: "absolute",
          bottom: "clamp(24px,4vw,52px)",
          left: 0, right: 0,
          padding: "0 clamp(16px,3vw,32px)",
        }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            {/* Badges */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{
                fontFamily: T.mono, fontSize: 8, fontWeight: 700,
                background: accent, color: T.navy,
                padding: "5px 12px", borderRadius: 2,
                letterSpacing: "0.18em", textTransform: "uppercase",
              }}>{article.category}</span>
              <span style={{
                fontFamily: T.mono, fontSize: 8,
                color: "rgba(255,255,255,0.45)",
                letterSpacing: "0.14em",
              }}>{article.tag}</span>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5 }}>
                <Icon.clock size={10} color={"rgba(255,255,255,0.35)"} />
                <span style={{ fontFamily: T.mono, fontSize: 9, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>{article.date} · {article.readTime} read</span>
              </span>
            </div>
            <h1 id="article-title" style={{
              fontFamily: T.display,
              fontSize: "clamp(26px,4vw,50px)",
              fontWeight: 700, color: T.white,
              letterSpacing: "-0.025em", lineHeight: 1.08,
              maxWidth: 700,
            }}>{article.title}</h1>
          </div>
        </div>
      </div>

      {/* Article body */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "clamp(36px,5vw,60px) clamp(16px,3vw,32px) clamp(64px,8vw,100px)" }}>
        {/* Excerpt pull-quote */}
        <p style={{
          fontFamily: T.display,
          fontSize: "clamp(17px,1.7vw,21px)",
          fontWeight: 600,
          color: T.navy,
          lineHeight: 1.65,
          marginBottom: 36,
          paddingLeft: 20,
          borderLeft: `2px solid ${accent}`,
          fontStyle: "italic",
          letterSpacing: "-0.01em",
        }}>
          {article.excerpt}
        </p>

        {/* Body paragraphs */}
        {paragraphs.map((para, i) => (
          <p key={i} style={{
            fontFamily: T.sans,
            fontSize: "clamp(14px,1.3vw,16px)",
            color: T.slate,
            lineHeight: 1.88,
            marginBottom: 24,
            fontWeight: 300,
          }}>{para}</p>
        ))}

        {/* Footer actions */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginTop: 48, paddingTop: 28,
          borderTop: `1px solid rgba(14,21,35,0.08)`,
          flexWrap: "wrap", gap: 12,
        }}>
          <button
            onClick={onClose}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "transparent", border: `1px solid rgba(14,21,35,0.12)`,
              borderRadius: 2, padding: "10px 18px",
              fontFamily: T.sans, fontSize: 12, fontWeight: 500,
              color: T.slate, cursor: "pointer", letterSpacing: "0.04em",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = T.gold; e.currentTarget.style.color = T.navy; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(14,21,35,0.12)"; e.currentTarget.style.color = T.slate; }}
          >
            <Icon.arrowLeft size={12} color="currentColor" />
            Back to News
          </button>
          <Link
            to="/contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: accent, color: T.navy, borderRadius: 2,
              padding: "10px 20px", fontFamily: T.sans, fontSize: 12,
              fontWeight: 700, textDecoration: "none",
              letterSpacing: "0.1em", textTransform: "uppercase",
            }}
          >
            Enquire About This Project
            <Icon.arrowRight size={11} color={T.navy} />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Featured article card ────────────────────────────────────────────────────
function FeaturedCard({ article, visible, onSelect }) {
  const [hov, setHov] = useState(false);
  const accent = article.accentColor;

  return (
    <article
      onClick={() => onSelect(article)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      tabIndex={0}
      role="button"
      aria-label={`Read article: ${article.title}`}
      onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(article); } }}
      className="featured-card"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        borderRadius: 2,
        overflow: "hidden",
        border: `1px solid ${hov ? accent + "45" : "rgba(14,21,35,0.08)"}`,
        cursor: "pointer",
        boxShadow: hov
          ? `0 20px 60px rgba(14,21,35,0.12), 0 4px 16px rgba(14,21,35,0.06)`
          : "0 2px 12px rgba(14,21,35,0.04)",
        marginBottom: 24,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
        transition: [
          "border-color 0.3s ease",
          "box-shadow 0.3s ease",
          "opacity 0.7s ease",
          "transform 0.7s ease",
        ].join(", "),
      }}
    >
      {/* Image side */}
      <div style={{ position: "relative", minHeight: 300, overflow: "hidden", background: T.navyMid }}>
        <img
          src={article.image} alt={article.title}
          loading="lazy" decoding="async" width="800" height="600"
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            filter: "brightness(0.8) contrast(1.06) saturate(0.88)",
            transform: hov ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.65s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, transparent 50%, rgba(248,245,239,0.3) 100%)",
        }} />
        {/* Accent bar */}
        <div aria-hidden="true" style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, ${accent}, transparent)`,
        }} />
        {/* Featured label */}
        <div style={{
          position: "absolute", top: 16, left: 16,
          fontFamily: T.mono, fontSize: 8, fontWeight: 600,
          background: "rgba(14,21,35,0.75)", backdropFilter: "blur(8px)",
          color: T.gold, padding: "5px 12px", borderRadius: 2,
          letterSpacing: "0.2em", textTransform: "uppercase",
          border: `1px solid ${T.gold}25`,
        }}>Featured</div>
      </div>

      {/* Text side */}
      <div style={{
        padding: "clamp(28px,3.5vw,44px)",
        display: "flex", flexDirection: "column", justifyContent: "center",
        background: T.white,
      }}>
        {/* Meta */}
        <div style={{ display: "flex", gap: 8, marginBottom: 18, alignItems: "center", flexWrap: "wrap" }}>
          <CategoryBadge label={article.category} color={accent} />
          <CategoryBadge label={article.tag}      color={T.mist} />
          <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5 }}>
            <Icon.clock size={10} color={T.mist} />
            <span style={{ fontFamily: T.mono, fontSize: 9, color: T.mist, letterSpacing: "0.1em" }}>{article.date}</span>
          </span>
        </div>

        <h2 style={{
          fontFamily: T.display,
          fontSize: "clamp(20px,2.4vw,30px)",
          fontWeight: 700, color: T.navy,
          letterSpacing: "-0.02em", lineHeight: 1.18, marginBottom: 14,
        }}>{article.title}</h2>

        <p style={{
          fontFamily: T.sans, fontSize: "clamp(13px,1.2vw,14px)",
          color: T.slate, lineHeight: 1.76, marginBottom: 24,
          fontWeight: 300,
        }}>{article.excerpt}</p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: T.mono, fontSize: 9, color: T.mist, letterSpacing: "0.1em" }}>
            <Icon.clock size={10} color={T.mist} />
            {article.readTime} read
          </span>
          <span style={{
            fontFamily: T.sans, fontSize: 12, fontWeight: 600,
            color: hov ? accent : T.mist,
            display: "flex", alignItems: "center", gap: 5,
            transition: "color 0.22s",
          }}>
            Read article
            <Icon.arrowRight size={11} color={hov ? accent : T.mist} />
          </span>
        </div>
      </div>
    </article>
  );
}

// ─── Regular article card ─────────────────────────────────────────────────────
function ArticleCard({ article, index, visible, onSelect }) {
  const [hov, setHov] = useState(false);
  const accent = article.accentColor;

  return (
    <article
      onClick={() => onSelect(article)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      tabIndex={0}
      role="button"
      aria-label={`Read article: ${article.title}`}
      onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(article); } }}
      style={{
        background: T.white, borderRadius: 2, overflow: "hidden",
        border: `1px solid ${hov ? accent + "45" : "rgba(14,21,35,0.08)"}`,
        cursor: "pointer",
        transform: hov ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hov
          ? `0 20px 56px rgba(14,21,35,0.12), 0 4px 14px rgba(14,21,35,0.06)`
          : "0 2px 12px rgba(14,21,35,0.04)",
        opacity: visible ? 1 : 0,
        transition: [
          "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
          "box-shadow 0.4s ease",
          "border-color 0.3s ease",
          `opacity 0.6s ease ${index * 0.08}s`,
        ].join(", "),
      }}
    >
      {/* Image */}
      <div style={{ height: 196, overflow: "hidden", position: "relative", background: T.navyMid }}>
        <img
          src={article.image} alt={article.title}
          loading="lazy" decoding="async" width="800" height="500"
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            filter: "brightness(0.82) contrast(1.06) saturate(0.88)",
            transform: hov ? "scale(1.07)" : "scale(1)",
            transition: "transform 0.65s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, transparent 50%, rgba(10,13,20,0.6) 100%)",
        }} />
        {/* Accent bar */}
        <div aria-hidden="true" style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, ${accent}, transparent)`,
          transform: hov ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.4s ease",
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: "18px 20px 22px" }}>
        <div style={{ display: "flex", gap: 7, marginBottom: 12, alignItems: "center", flexWrap: "wrap" }}>
          <CategoryBadge label={article.category} color={accent} />
          <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5 }}>
            <Icon.clock size={9} color={T.mist} />
            <span style={{ fontFamily: T.mono, fontSize: 8, color: T.mist, letterSpacing: "0.1em" }}>{article.date}</span>
          </span>
        </div>

        <h3 style={{
          fontFamily: T.display,
          fontSize: "clamp(16px,1.5vw,18px)",
          fontWeight: 600, color: T.navy,
          letterSpacing: "-0.01em", lineHeight: 1.28, marginBottom: 10,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>{article.title}</h3>

        <p style={{
          fontFamily: T.sans, fontSize: 12, color: T.slate,
          lineHeight: 1.7, margin: "0 0 14px",
          display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
          fontWeight: 300,
        }}>{article.excerpt}</p>

        <div style={{
          fontFamily: T.sans, fontSize: 11, fontWeight: 600,
          color: hov ? accent : T.mist,
          display: "flex", alignItems: "center", gap: 5,
          transition: "color 0.22s",
        }}>
          Read article
          <Icon.arrowRight size={10} color={hov ? accent : T.mist} />
        </div>
      </div>
    </article>
  );
}

// ─── Press contact banner ─────────────────────────────────────────────────────
function PressContact() {
  const [hov, setHov] = useState(false);

  return (
    <div style={{
      marginTop: "clamp(48px,6vw,72px)",
      background: T.navy,
      borderRadius: 2,
      padding: "clamp(28px,3.5vw,40px) clamp(24px,3vw,40px)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      gap: 24, flexWrap: "wrap",
      position: "relative", overflow: "hidden",
    }}>
      {/* Texture */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `repeating-linear-gradient(-45deg, rgba(201,168,76,0.025) 0, rgba(201,168,76,0.025) 1px, transparent 1px, transparent 18px)`,
      }} />
      {/* Gold rule */}
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, ${T.gold}, transparent 55%)`,
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 10,
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: 6,
            background: T.gold + "14", border: `1px solid ${T.gold}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon.mic size={15} color={T.gold} sw={1.6} />
          </div>
          <div style={{
            fontFamily: T.mono, fontSize: 9, fontWeight: 500,
            color: T.gold, letterSpacing: "0.22em", textTransform: "uppercase",
          }}>Media Enquiries</div>
        </div>
        <div style={{ fontFamily: T.display, fontSize: "clamp(18px,2.2vw,26px)", fontWeight: 700, color: T.white, letterSpacing: "-0.01em", marginBottom: 8 }}>
          Press Contact
        </div>
        <p style={{ fontFamily: T.sans, fontSize: 13, color: "rgba(255,255,255,0.38)", margin: 0, lineHeight: 1.65, maxWidth: 440, fontWeight: 300 }}>
          For press enquiries, interview requests, or project photography — contact our communications team.
        </p>
      </div>

      <a
        href="mailto:media@spacemineholdings.com"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          background: hov ? T.goldLight : T.gold,
          color: T.navy, borderRadius: 2,
          padding: "14px 24px",
          fontFamily: T.sans, fontSize: 12, fontWeight: 700,
          textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase",
          flexShrink: 0, position: "relative", zIndex: 1,
          transition: "background 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease",
          transform: hov ? "translateY(-2px)" : "none",
          boxShadow: hov ? "0 10px 30px rgba(201,168,76,0.3)" : "0 4px 14px rgba(201,168,76,0.2)",
        }}
      >
        <Icon.mail size={13} color={T.navy} />
        media@spacemineholdings.com
      </a>
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
      padding: "clamp(100px,12vw,160px) clamp(16px,3vw,32px) clamp(48px,6vw,72px)",
      position: "relative", overflow: "hidden",
    }}>
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: [
          `linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px)`,
          `linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)`,
        ].join(","),
        backgroundSize: "56px 56px",
      }} />
      {/* Decorative "N" */}
      <div aria-hidden="true" style={{
        position: "absolute", right: "-0.03em", top: "50%", transform: "translateY(-50%)",
        fontFamily: T.display, fontSize: "clamp(220px,26vw,380px)",
        fontWeight: 700, color: "rgba(201,168,76,0.04)",
        lineHeight: 1, userSelect: "none", pointerEvents: "none",
        letterSpacing: "-0.04em",
      }}>N</div>
      <div aria-hidden="true" style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, ${T.gold}, transparent 70%)`,
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <nav aria-label="Breadcrumb" style={{ marginBottom: 32 }}>
          <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", alignItems: "center", gap: 10 }}>
            <li><Link to="/" style={{ fontFamily: T.mono, fontSize: 10, color: "rgba(255,255,255,0.3)", textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase" }}>Home</Link></li>
            <li aria-hidden="true" style={{ color: T.goldDim, fontSize: 10 }}>›</li>
            <li><span style={{ fontFamily: T.mono, fontSize: 10, color: T.goldLight, letterSpacing: "0.1em", textTransform: "uppercase" }} aria-current="page">Media & News</span></li>
          </ol>
        </nav>

        <div style={{ maxWidth: 620 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20,
            opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(10px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}>
            <div style={{ width: 32, height: 1, background: T.gold }} />
            <span style={{ fontFamily: T.mono, fontSize: 9, color: T.gold, letterSpacing: "0.26em", textTransform: "uppercase" }}>Press & Updates</span>
          </div>

          <h1 style={{
            fontFamily: T.display,
            fontSize: "clamp(44px,6vw,80px)",
            fontWeight: 600, color: T.white,
            letterSpacing: "-0.03em", lineHeight: 1.0, margin: "0 0 20px",
            opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(22px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}>
            News &<br />
            <em style={{ color: T.goldLight, fontStyle: "italic" }}>Updates</em>
          </h1>

          <p style={{
            fontFamily: T.sans, fontSize: "clamp(14px,1.4vw,16px)",
            color: "rgba(255,255,255,0.42)", lineHeight: 1.82,
            maxWidth: 460, margin: 0, fontWeight: 300,
            opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(22px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}>
            Project completions, government partnerships, community impact, and company
            announcements from across Spacemine's operations.
          </p>
        </div>
      </div>
    </header>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function MediaPage() {
  const [catFilter, setCatFilter] = useState("All");
  const [selected, setSelected]  = useState(null);
  const [ref, visible] = useInView(0.06);

  const filtered = catFilter === "All" ? ARTICLES : ARTICLES.filter(a => a.category === catFilter);
  const featured = filtered.find(a => a.featured);
  const rest     = filtered.filter(a => !a.featured);

  if (selected) return <ArticleDetail article={selected} onClose={() => setSelected(null)} />;

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href={FONTS_HREF} rel="stylesheet" />

      <div style={{ background: T.ivory, minHeight: "100vh" }}>
        <Hero />

        {/* Filter bar */}
        <nav
          aria-label="Filter articles by category"
          style={{
            borderBottom: `1px solid rgba(201,168,76,0.15)`,
            padding: "0 clamp(16px,3vw,32px)",
            position: "sticky", top: 68, zIndex: 50,
            background: "rgba(248,245,239,0.97)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: "0 1px 0 rgba(14,21,35,0.05)",
          }}
        >
          <div style={{
            maxWidth: 1200, margin: "0 auto",
            display: "flex", overflowX: "auto", scrollbarWidth: "none",
          }}>
            {CATEGORIES.map(cat => {
              const isActive = catFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCatFilter(cat)}
                  aria-pressed={isActive}
                  style={{
                    fontFamily: T.sans, fontSize: 11,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? T.gold : T.slate,
                    background: "none", border: "none",
                    borderBottom: `2px solid ${isActive ? T.gold : "transparent"}`,
                    padding: "14px clamp(10px,1.4vw,18px)",
                    cursor: "pointer", whiteSpace: "nowrap",
                    transition: "color 0.22s, border-color 0.22s",
                    letterSpacing: "0.04em", textTransform: "uppercase",
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = T.navy; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = T.slate; }}
                >{cat}</button>
              );
            })}
          </div>
        </nav>

        {/* Articles */}
        <main
          id="main-content"
          tabIndex={-1}
          ref={ref}
          style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(40px,5vw,64px) clamp(16px,3vw,32px)" }}
        >
          {/* Featured */}
          {featured && (
            <FeaturedCard article={featured} visible={visible} onSelect={setSelected} />
          )}

          {/* Article grid */}
          {rest.length > 0 && (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "clamp(14px,2vw,22px)",
            }}>
              {rest.map((a, i) => (
                <ArticleCard key={a.id} article={a} index={i} visible={visible} onSelect={setSelected} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "64px 24px" }}>
              <div style={{ fontFamily: T.display, fontSize: 22, fontWeight: 600, color: T.navy, marginBottom: 10 }}>No articles in this category</div>
              <p style={{ fontFamily: T.sans, fontSize: 14, color: T.mist, fontWeight: 300 }}>Try selecting a different filter above.</p>
            </div>
          )}

          <PressContact />
        </main>
      </div>

      <style>{`
        .featured-card { grid-template-columns: 1fr 1fr !important; }

        @media (max-width: 768px) {
          .featured-card { grid-template-columns: 1fr !important; }
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