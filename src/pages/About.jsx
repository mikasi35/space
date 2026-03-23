import { useRef, useEffect, useState } from "react";
import { BRAND, FONT, MAX_WIDTH } from "../shared/constants";

// ─── Data (replace placeholders with real content) ────────────────────────────

const LEADERSHIP = [
  {
    id: "mustafa",
    name: "Mustafa [Surname]",          // TODO: full name
    title: "Chief Executive Officer",
    initials: "MU",
    photo: null,                         // TODO: "/assets/images/mustafa.jpg"
    bio: "Mustafa brings over [X] years of leadership experience in construction and engineering across East Africa. Since founding Spacemine Holdings in 2014, he has driven the company's organic growth from a focused civil contractor to a multi-disciplinary engineering powerhouse.",
    credentials: ["[Qualification]", "[Professional Body]", "[Certification]"],
    linkedin: null,                      // TODO: LinkedIn URL
  },
  {
    id: "abdulqadir",
    name: "Abdulqadir [Surname]",       // TODO: full name
    title: "Director of Engineering",
    initials: "AQ",
    photo: null,
    bio: "Abdulqadir oversees all technical delivery across Spacemine's project portfolio. His rigorous approach to engineering precision and ISO-aligned quality management has established the company's reputation for zero-defect handovers.",
    credentials: ["[Engineering Qualification]", "[Professional Registration]"],
    linkedin: null,
  },
  {
    id: "abdikani",
    name: "Abdikani [Surname]",         // TODO: full name
    title: "Director of Operations",
    initials: "AB",
    photo: null,
    bio: "Abdikani leads Spacemine's operational systems, supply chain, and project control functions. His focus on risk management and cost efficiency ensures every project is delivered on time and within budget.",
    credentials: ["[Operations Qualification]", "[Professional Registration]"],
    linkedin: null,
  },
];

const GOVERNANCE = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Company Registration",
    detail: "Registered under the Companies Act of Kenya · Registration No. [TODO]",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: "ISO-Aligned Quality System",
    detail: "Business management systems maintained and continually improved to conform to legally required market standards.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    title: "BBBEE Compliance",
    detail: "Committed to Broad-Based Black Economic Empowerment — actively improving the standing and skills of historically disadvantaged groups.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    title: "Professional Indemnity",
    detail: "Full professional indemnity and public liability insurance maintained across all active projects and operations.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "People & Equity Policy",
    detail: "No distinction made between employees on grounds of race, gender, creed, disability or age — an inclusive, merit-based organisation.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    title: "Environmental Responsibility",
    detail: "Corporate activities geared toward preserving public health, employee safety, and long-term environmental maintenance.",
  },
];

const TIMELINE = [
  { year: "2014", event: "Spacemine Holdings Limited incorporated in Kenya. Initial focus on general construction and civil works." },
  { year: "2016", event: "First major road infrastructure contract awarded. Engineering division formally established." },
  { year: "2018", event: "Expansion into electrical works and solar energy solutions. First community solar pumping system delivered." },
  { year: "2020", event: "Water works division launched. Borehole drilling programme serving rural communities across Kenya." },
  { year: "2022", event: "ISO-aligned quality management systems formalised. Zero LTI safety record achieved across all active sites." },
  { year: "2024", event: "10+ years of operation. KSh 4.2B+ in completed infrastructure. 2.1M+ communities served." },
];

const VALUES = [
  { label: "Professionalism", desc: "Every engagement conducted to the highest standard of professional conduct." },
  { label: "Integrity & Accountability", desc: "We own our commitments — to clients, partners, and communities." },
  { label: "Courtesy", desc: "Respectful, transparent communication at every level of the organisation." },
  { label: "Creativity & Innovation", desc: "New talent and cutting-edge design translate into real-world upgrades." },
  { label: "Teamwork", desc: "Collaborative culture where every individual's contribution is valued and developed." },
];

// ─── Shared scroll-reveal hook ────────────────────────────────────────────────
function useVisible(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── Page hero ────────────────────────────────────────────────────────────────
function PageHero() {
  return (
    <div style={{
      background: BRAND.dark,
      padding: "clamp(100px,12vw,160px) 24px clamp(56px,7vw,96px)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Grid texture */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)",
        backgroundSize: "48px 48px",
      }} />
      {/* Diagonal accent line */}
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, right: "15%",
        width: 1, height: "100%",
        background: "linear-gradient(to bottom, transparent, rgba(200,75,17,0.35), transparent)",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: 3, background: BRAND.orange,
      }} />

      <div style={{ maxWidth: MAX_WIDTH, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32 }}>
          <a href="/" style={{ fontFamily: FONT.body, fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Home</a>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>/</span>
          <span style={{ fontFamily: FONT.body, fontSize: 12, color: BRAND.orange }}>About Us</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,6vw,96px)", alignItems: "center" }} className="hero-grid">
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <div style={{ width: 20, height: 2, background: BRAND.orange, borderRadius: 1 }} />
              <span style={{ fontFamily: FONT.body, fontSize: 10, fontWeight: 700, color: BRAND.orange, letterSpacing: "0.14em", textTransform: "uppercase" }}>Est. 2014 — Nairobi, Kenya</span>
            </div>
            <h1 style={{
              fontFamily: FONT.heading,
              fontSize: "clamp(36px,5vw,64px)",
              fontWeight: 900, color: "#fff",
              letterSpacing: "-0.025em", lineHeight: 1.0,
              margin: "0 0 20px",
            }}>
              Built on Trust.<br />
              <span style={{ color: BRAND.orange }}>Driven by Purpose.</span>
            </h1>
            <p style={{
              fontFamily: FONT.body,
              fontSize: "clamp(14px,1.4vw,17px)",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.8, margin: 0, maxWidth: 480,
            }}>
              Spacemine Holdings Limited has grown from a focused civil contractor into one of Kenya's most trusted engineering and construction companies — funding every step of that growth organically through reinvested earnings.
            </p>
          </div>

          {/* Hero stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { v: "2014", l: "Year Founded" },
              { v: "10+", l: "Years Operating" },
              { v: "KSh 4.2B+", l: "Infrastructure Delivered" },
              { v: "2.1M+", l: "Communities Served" },
              { v: "98%", l: "On-Time Delivery" },
              { v: "Zero LTI", l: "8-Year Safety Record" },
            ].map(s => (
              <div key={s.l} style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 8, padding: "18px 20px",
              }}>
                <div style={{ fontFamily: FONT.heading, fontSize: "clamp(18px,2vw,24px)", fontWeight: 900, color: BRAND.orange, lineHeight: 1, marginBottom: 6 }}>{s.v}</div>
                <div style={{ fontFamily: FONT.body, fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.07em", textTransform: "uppercase" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Overview + Vision/Mission ────────────────────────────────────────────────
function Overview() {
  const [ref, visible] = useVisible();
  return (
    <div ref={ref} style={{ maxWidth: MAX_WIDTH, margin: "0 auto", padding: "clamp(56px,7vw,96px) 24px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,6vw,80px)", alignItems: "start" }} className="overview-grid">
        {/* Left: overview */}
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <div style={{ width: 20, height: 2, background: BRAND.orange, borderRadius: 1 }} />
            <span style={{ fontFamily: FONT.body, fontSize: 10, fontWeight: 700, color: BRAND.orange, letterSpacing: "0.14em", textTransform: "uppercase" }}>Who We Are</span>
          </div>
          <h2 style={{ fontFamily: FONT.heading, fontSize: "clamp(24px,3vw,36px)", fontWeight: 800, color: BRAND.dark, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 20 }}>
            A Decade of Building Kenya's Infrastructure
          </h2>
          <p style={{ fontFamily: FONT.body, fontSize: "clamp(14px,1.3vw,16px)", color: BRAND.gray, lineHeight: 1.8, marginBottom: 16 }}>
            Incorporated in 2014, Spacemine Holdings Limited has evolved into a leading powerhouse in construction and engineering. Our establishment has been rooted in ensuring that quality in services and suitability remain our major goals.
          </p>
          <p style={{ fontFamily: FONT.body, fontSize: "clamp(14px,1.3vw,16px)", color: BRAND.gray, lineHeight: 1.8, marginBottom: 24 }}>
            The company has grown organically by re-investing its earnings to fund growth — a deliberate strategy that keeps us lean, debt-free, and fully accountable to our clients rather than external shareholders.
          </p>
          <p style={{ fontFamily: FONT.body, fontSize: "clamp(14px,1.3vw,16px)", color: BRAND.gray, lineHeight: 1.8 }}>
            One of our key focus areas is the development of innovations in ensuring that new talents are utilised to come up with sustainable, cutting-edge designs — translated directly into our works and in turn upgrading the living standards of the people of Kenya.
          </p>
        </div>

        {/* Right: Vision + Mission */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {[
            {
              label: "Vision",
              color: BRAND.orange,
              points: [
                "Continually and innovatively expand our technical expertise to become champions in the industry.",
                "Become a leading supplier in Kenya — financially strong and highly respected.",
                "Be known externally for quality, integrity and resourcefulness; internally for profitability and employee satisfaction.",
                "Be the preferred general contractor in the region and beyond.",
              ],
            },
            {
              label: "Mission",
              color: "#2a6b9c",
              points: [
                "Offer effective and efficient solutions to communities regardless of the customer's status.",
                "Deliver competitively priced, value-added services through superior capability, innovation and teamwork.",
                "Advocate and practise social responsibility and financial discipline.",
                "Nurture the entrepreneurial initiatives of our people, emphasising our brand at all times.",
              ],
            },
          ].map((block, bi) => (
            <div key={block.label} style={{
              background: BRAND.offwhite,
              border: `1px solid ${BRAND.lightgray}`,
              borderLeft: `3px solid ${block.color}`,
              borderRadius: "0 8px 8px 0",
              padding: "20px 22px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(16px)",
              transition: `opacity 0.6s ease ${0.15 + bi * 0.12}s, transform 0.6s ease ${0.15 + bi * 0.12}s`,
            }}>
              <div style={{ fontFamily: FONT.body, fontSize: 10, fontWeight: 700, color: block.color, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12 }}>
                {block.label}
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {block.points.map((p, i) => (
                  <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: block.color, flexShrink: 0, marginTop: 7 }} />
                    <span style={{ fontFamily: FONT.body, fontSize: 13, color: BRAND.gray, lineHeight: 1.65 }}>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Values ───────────────────────────────────────────────────────────────────
function ValuesSection() {
  const [ref, visible] = useVisible();
  return (
    <div style={{ background: BRAND.dark, padding: "clamp(56px,7vw,96px) 24px" }}>
      <div ref={ref} style={{ maxWidth: MAX_WIDTH, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(36px,4vw,56px)", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <div style={{ width: 20, height: 1, background: BRAND.orange }} />
            <span style={{ fontFamily: FONT.body, fontSize: 10, fontWeight: 700, color: BRAND.orange, letterSpacing: "0.14em", textTransform: "uppercase" }}>Core Values</span>
            <div style={{ width: 20, height: 1, background: BRAND.orange }} />
          </div>
          <h2 style={{ fontFamily: FONT.heading, fontSize: "clamp(24px,3vw,40px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
            What We Stand For
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "clamp(10px,1.5vw,20px)" }} className="values-grid">
          {VALUES.map((v, i) => (
            <div key={v.label} style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderTop: `2px solid ${BRAND.orange}`,
              borderRadius: "0 0 8px 8px",
              padding: "24px 18px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`,
            }}>
              <div style={{ fontFamily: FONT.heading, fontSize: 14, fontWeight: 800, color: "#fff", marginBottom: 8, letterSpacing: "-0.01em" }}>{v.label}</div>
              <p style={{ fontFamily: FONT.body, fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, margin: 0 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Timeline ─────────────────────────────────────────────────────────────────
function Timeline() {
  const [ref, visible] = useVisible();
  return (
    <div style={{ background: BRAND.white, padding: "clamp(56px,7vw,96px) 24px" }}>
      <div ref={ref} style={{ maxWidth: MAX_WIDTH, margin: "0 auto" }}>
        <div style={{ marginBottom: "clamp(36px,4vw,56px)", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <div style={{ width: 20, height: 2, background: BRAND.orange, borderRadius: 1 }} />
            <span style={{ fontFamily: FONT.body, fontSize: 10, fontWeight: 700, color: BRAND.orange, letterSpacing: "0.14em", textTransform: "uppercase" }}>Our Journey</span>
          </div>
          <h2 style={{ fontFamily: FONT.heading, fontSize: "clamp(24px,3vw,40px)", fontWeight: 800, color: BRAND.dark, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
            A Decade of Progress
          </h2>
        </div>

        {/* Timeline track */}
        <div style={{ position: "relative" }}>
          {/* Vertical line */}
          <div aria-hidden="true" style={{
            position: "absolute", left: 79, top: 0, bottom: 0,
            width: 1, background: BRAND.lightgray,
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {TIMELINE.map((item, i) => (
              <div key={item.year} style={{
                display: "flex", alignItems: "flex-start", gap: 0,
                paddingBottom: i < TIMELINE.length - 1 ? 32 : 0,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-16px)",
                transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
              }}>
                {/* Year */}
                <div style={{
                  width: 72, flexShrink: 0,
                  fontFamily: FONT.heading, fontSize: 13, fontWeight: 800,
                  color: i === TIMELINE.length - 1 ? BRAND.orange : BRAND.gray,
                  textAlign: "right", paddingTop: 2,
                }}>{item.year}</div>

                {/* Dot */}
                <div style={{
                  width: 16, height: 16, borderRadius: "50%", flexShrink: 0,
                  background: i === TIMELINE.length - 1 ? BRAND.orange : BRAND.white,
                  border: `2px solid ${i === TIMELINE.length - 1 ? BRAND.orange : BRAND.lightgray}`,
                  margin: "0 16px", marginTop: 1,
                }} />

                {/* Event */}
                <div style={{
                  flex: 1,
                  fontFamily: FONT.body, fontSize: "clamp(13px,1.3vw,15px)",
                  color: i === TIMELINE.length - 1 ? BRAND.dark : BRAND.gray,
                  lineHeight: 1.7, paddingTop: 0,
                  fontWeight: i === TIMELINE.length - 1 ? 600 : 400,
                }}>{item.event}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Leadership ───────────────────────────────────────────────────────────────
function LeadershipSection() {
  const [ref, visible] = useVisible();
  return (
    <div style={{ background: BRAND.offwhite, padding: "clamp(56px,7vw,96px) 24px" }}>
      <div ref={ref} style={{ maxWidth: MAX_WIDTH, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "clamp(36px,4vw,56px)", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <div style={{ width: 20, height: 2, background: BRAND.orange, borderRadius: 1 }} />
            <span style={{ fontFamily: FONT.body, fontSize: 10, fontWeight: 700, color: BRAND.orange, letterSpacing: "0.14em", textTransform: "uppercase" }}>Leadership</span>
          </div>
          <h2 style={{ fontFamily: FONT.heading, fontSize: "clamp(24px,3vw,40px)", fontWeight: 800, color: BRAND.dark, letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: 12 }}>
            The People at the Helm
          </h2>
          <p style={{ fontFamily: FONT.body, fontSize: "clamp(13px,1.3vw,15px)", color: BRAND.gray, maxWidth: 520, lineHeight: 1.75 }}>
            Spacemine's leadership combines decades of hands-on engineering experience with a shared commitment to professional excellence and community impact.
          </p>
        </div>

        {/* Leader cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(16px,2vw,28px)" }} className="leader-grid">
          {LEADERSHIP.map((person, i) => (
            <article
              key={person.id}
              itemScope
              itemType="https://schema.org/Person"
              style={{
                background: BRAND.white,
                border: `1px solid ${BRAND.lightgray}`,
                borderRadius: 12,
                overflow: "hidden",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
              }}
            >
              {/* Photo / initials avatar */}
              <div style={{
                height: 220,
                background: person.photo
                  ? "transparent"
                  : `linear-gradient(135deg, ${BRAND.dark} 0%, #1a1a2a 100%)`,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}>
                {person.photo ? (
                  <img
                    src={person.photo}
                    alt={person.name}
                    loading="lazy"
                    decoding="async"
                    itemProp="image"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                  />
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <div style={{
                      width: 80, height: 80, borderRadius: "50%",
                      background: `${BRAND.orange}20`,
                      border: `2px solid ${BRAND.orange}40`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 12px",
                    }}>
                      <span style={{ fontFamily: FONT.heading, fontSize: 28, fontWeight: 900, color: BRAND.orange }}>{person.initials}</span>
                    </div>
                    <div style={{ fontFamily: FONT.body, fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em" }}>
                      Photo coming soon
                    </div>
                  </div>
                )}
                {/* Orange bottom stripe */}
                <div aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: BRAND.orange }} />
              </div>

              {/* Info */}
              <div style={{ padding: "22px 24px 24px" }}>
                <div itemProp="jobTitle" style={{ fontFamily: FONT.body, fontSize: 10, fontWeight: 700, color: BRAND.orange, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
                  {person.title}
                </div>
                <h3 itemProp="name" style={{ fontFamily: FONT.heading, fontSize: "clamp(16px,1.8vw,20px)", fontWeight: 800, color: BRAND.dark, letterSpacing: "-0.01em", lineHeight: 1.15, marginBottom: 12 }}>
                  {person.name}
                </h3>
                <p itemProp="description" style={{ fontFamily: FONT.body, fontSize: 13, color: BRAND.gray, lineHeight: 1.72, margin: "0 0 16px" }}>
                  {person.bio}
                </p>

                {/* Credentials */}
                {person.credentials.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {person.credentials.map(c => (
                      <span key={c} style={{
                        fontFamily: FONT.body, fontSize: 10,
                        color: BRAND.gray, background: BRAND.offwhite,
                        border: `1px solid ${BRAND.lightgray}`,
                        borderRadius: 4, padding: "3px 8px",
                      }}>{c}</span>
                    ))}
                  </div>
                )}

                {/* LinkedIn placeholder */}
                {person.linkedin && (
                  <a href={person.linkedin} target="_blank" rel="noopener noreferrer" style={{
                    display: "inline-flex", alignItems: "center", gap: 6, marginTop: 14,
                    fontFamily: FONT.body, fontSize: 12, fontWeight: 600,
                    color: BRAND.orange, textDecoration: "none",
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                    </svg>
                    LinkedIn Profile
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Governance ───────────────────────────────────────────────────────────────
function GovernanceSection() {
  const [ref, visible] = useVisible();
  return (
    <div style={{ background: BRAND.dark, padding: "clamp(56px,7vw,96px) 24px" }}>
      <div ref={ref} style={{ maxWidth: MAX_WIDTH, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,5vw,72px)", alignItems: "center", marginBottom: "clamp(40px,5vw,64px)" }} className="gov-header">
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 20, height: 2, background: BRAND.orange, borderRadius: 1 }} />
              <span style={{ fontFamily: FONT.body, fontSize: 10, fontWeight: 700, color: BRAND.orange, letterSpacing: "0.14em", textTransform: "uppercase" }}>Governance</span>
            </div>
            <h2 style={{ fontFamily: FONT.heading, fontSize: "clamp(24px,3vw,40px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: 16 }}>
              Compliance, Transparency & Accountability
            </h2>
            <p style={{ fontFamily: FONT.body, fontSize: "clamp(13px,1.3vw,15px)", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, margin: 0 }}>
              Strong governance is not a box to tick — it is the foundation of every client relationship, every contract, and every project Spacemine undertakes.
            </p>
          </div>

          {/* Quality policy excerpt */}
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: `1px solid rgba(255,255,255,0.08)`,
            borderLeft: `3px solid ${BRAND.orange}`,
            borderRadius: "0 8px 8px 0",
            padding: "24px 28px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(16px)",
            transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
          }}>
            <div style={{ fontFamily: FONT.body, fontSize: 10, fontWeight: 700, color: BRAND.orange, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12 }}>Quality Policy</div>
            <p style={{ fontFamily: FONT.body, fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, margin: "0 0 14px", fontStyle: "italic" }}>
              "Committed to offering high quality services in tandem with emerging technologies — responsive to both our customers and the environment whilst ensuring generational equity."
            </p>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
              {[
                "Services comply with all applicable requirements",
                "Continually monitor and improve customer experience",
                "Quality standards established and enforced for all suppliers",
              ].map(pt => (
                <li key={pt} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: BRAND.orange, flexShrink: 0, marginTop: 7 }} />
                  <span style={{ fontFamily: FONT.body, fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Governance cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(10px,1.5vw,18px)" }} className="gov-grid">
          {GOVERNANCE.map((g, i) => (
            <div key={g.title} style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 8,
              padding: "20px 20px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 0.5s ease ${0.1 + i * 0.06}s, transform 0.5s ease ${0.1 + i * 0.06}s`,
            }}>
              <div style={{ color: BRAND.orange, marginBottom: 12 }}>{g.icon}</div>
              <div style={{ fontFamily: FONT.heading, fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 8, letterSpacing: "-0.01em" }}>{g.title}</div>
              <p style={{ fontFamily: FONT.body, fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.65, margin: 0 }}>{g.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Bottom CTA ───────────────────────────────────────────────────────────────
function AboutCTA() {
  return (
    <div style={{ background: BRAND.white, padding: "clamp(56px,7vw,80px) 24px", borderTop: `1px solid ${BRAND.lightgray}` }}>
      <div style={{ maxWidth: MAX_WIDTH, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
        <div>
          <h2 style={{ fontFamily: FONT.heading, fontSize: "clamp(22px,3vw,36px)", fontWeight: 800, color: BRAND.dark, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 10 }}>
            Want to work with us?
          </h2>
          <p style={{ fontFamily: FONT.body, fontSize: "clamp(13px,1.3vw,15px)", color: BRAND.gray, lineHeight: 1.7, margin: 0, maxWidth: 420 }}>
            Whether you're a government body, investor, developer or contractor — we're ready to talk.
          </p>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="/contact" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: BRAND.orange, color: "#fff",
            fontFamily: FONT.heading, fontSize: 13, fontWeight: 800,
            letterSpacing: "0.06em", textTransform: "uppercase",
            textDecoration: "none", padding: "14px 28px", borderRadius: 6,
            transition: "background 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#a03a0a"}
          onMouseLeave={e => e.currentTarget.style.background = BRAND.orange}
          >
            Get in Touch
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="/projects" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "transparent", color: BRAND.dark,
            border: `1px solid ${BRAND.lightgray}`,
            fontFamily: FONT.heading, fontSize: 13, fontWeight: 700,
            letterSpacing: "0.06em", textTransform: "uppercase",
            textDecoration: "none", padding: "14px 28px", borderRadius: 6,
            transition: "border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = BRAND.orange; e.currentTarget.style.color = BRAND.orange; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = BRAND.lightgray; e.currentTarget.style.color = BRAND.dark; }}
          >
            View Projects
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function AboutPage() {
  return (
    <div style={{ background: BRAND.white, minHeight: "100vh" }}>
      <PageHero />
      <Overview />
      <ValuesSection />
      <Timeline />
      <LeadershipSection />
      <GovernanceSection />
      <AboutCTA />

      <style>{`
        .hero-grid, .overview-grid, .gov-header {
          grid-template-columns: 1fr 1fr;
        }
        .leader-grid { grid-template-columns: repeat(3,1fr); }
        .values-grid { grid-template-columns: repeat(5,1fr); }
        .gov-grid    { grid-template-columns: repeat(3,1fr); }

        @media (max-width: 900px) {
          .hero-grid, .overview-grid, .gov-header { grid-template-columns: 1fr !important; }
          .leader-grid { grid-template-columns: repeat(2,1fr) !important; }
          .values-grid { grid-template-columns: repeat(3,1fr) !important; }
          .gov-grid    { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 560px) {
          .leader-grid { grid-template-columns: 1fr !important; }
          .values-grid { grid-template-columns: repeat(2,1fr) !important; }
          .gov-grid    { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
        }
      `}</style>
    </div>
  );
}