import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  ivory:     "#F8F5EF",
  white:     "#FFFFFF",
  navy:      "#0E1523",
  navyMid:   "#16213A",
  navyLight: "#1E2D4D",
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

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const Icon = {
  pin: ({ size = 16, color = "currentColor", sw = 1.6 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  phone: ({ size = 14, color = "currentColor", sw = 1.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  mail: ({ size = 14, color = "currentColor", sw = 1.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  clock: ({ size = 14, color = "currentColor", sw = 1.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  chat: ({ size = 14, color = "currentColor", sw = 1.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  externalLink: ({ size = 11, color = "currentColor", sw = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  ),
  arrowRight: ({ size = 12, color = "currentColor", sw = 2.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  ),
  check: ({ size = 22, color = "currentColor", sw = 2.5 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const OFFICES = [
  {
    id: "nairobi",
    city: "Nairobi",
    label: "Head Office",
    address: "[Street Address]",
    area: "Nairobi, Kenya",
    phone: "+254 [number]",
    email: "info@spacemineholdings.com",
    mapUrl: "https://maps.google.com",
    hours: "Mon–Fri: 8:00 am – 5:00 pm",
    primary: true,
  },
  {
    id: "mombasa",
    city: "Mombasa",
    label: "Regional Office",
    address: "[Street Address]",
    area: "Mombasa, Kenya",
    phone: "+254 [number]",
    email: "mombasa@spacemineholdings.com",
    mapUrl: "https://maps.google.com",
    hours: "Mon–Fri: 8:00 am – 5:00 pm",
    primary: false,
  },
];

const DEPARTMENTS = [
  { value: "general",   label: "General Inquiry" },
  { value: "projects",  label: "Project Inquiry / Quote" },
  { value: "investors", label: "Investment & Partnerships" },
  { value: "careers",   label: "Careers & Recruitment" },
  { value: "media",     label: "Media & Press" },
  { value: "suppliers", label: "Suppliers & Subcontractors" },
];

const QUICK_CONTACTS = [
  { label: "WhatsApp",        value: "+254 [number]",                href: "https://wa.me/254XXXXXXXXX",          IconC: Icon.chat },
  { label: "General Email",   value: "info@spacemineholdings.com",   href: "mailto:info@spacemineholdings.com",   IconC: Icon.mail },
  { label: "Projects / RFQs", value: "projects@spacemineholdings.com", href: "mailto:projects@spacemineholdings.com", IconC: Icon.mail },
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

// ─── Shared label ─────────────────────────────────────────────────────────────
function SectionLabel({ color = T.gold, children }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <div style={{ width: 22, height: 1, background: `linear-gradient(90deg, ${color}, transparent)` }} />
      <span style={{ fontFamily: T.mono, fontSize: 9, fontWeight: 500, color, letterSpacing: "0.24em", textTransform: "uppercase" }}>{children}</span>
    </div>
  );
}

// ─── Form field ───────────────────────────────────────────────────────────────
function Field({ label, id, type = "text", required, placeholder, value, onChange, options, rows }) {
  const fieldStyle = {
    width: "100%", padding: "11px 14px",
    border: `1px solid rgba(14,21,35,0.12)`, borderRadius: 2,
    fontFamily: T.sans, fontSize: 14, color: T.navy,
    background: T.ivory, outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
    fontWeight: 300,
  };
  const onFocus = e => { e.target.style.borderColor = T.gold; e.target.style.boxShadow = `0 0 0 3px ${T.gold}18`; };
  const onBlur  = e => { e.target.style.borderColor = "rgba(14,21,35,0.12)"; e.target.style.boxShadow = "none"; };

  return (
    <div>
      <label htmlFor={id} style={{
        display: "block", fontFamily: T.mono, fontSize: 9, fontWeight: 500,
        color: T.mist, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 7,
      }}>
        {label}
        {required && <span style={{ color: T.gold, marginLeft: 3 }} aria-hidden="true">*</span>}
      </label>

      {options ? (
        <select id={id} value={value} onChange={e => onChange(e.target.value)}
          required={required} style={{ ...fieldStyle, appearance: "none", cursor: "pointer" }}
          onFocus={onFocus} onBlur={onBlur}
        >
          <option value="">Select…</option>
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      ) : rows ? (
        <textarea id={id} rows={rows} value={value} onChange={e => onChange(e.target.value)}
          placeholder={placeholder} required={required}
          style={{ ...fieldStyle, resize: "vertical", minHeight: 110 }}
          onFocus={onFocus} onBlur={onBlur}
        />
      ) : (
        <input id={id} type={type} value={value} onChange={e => onChange(e.target.value)}
          placeholder={placeholder} required={required}
          style={fieldStyle} onFocus={onFocus} onBlur={onBlur}
        />
      )}
    </div>
  );
}

// ─── Contact form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm]     = useState({ name: "", org: "", email: "", phone: "", dept: "", message: "" });
  const [submitted, setSub] = useState(false);
  const [hovBtn, setHovBtn] = useState(false);
  const set = useCallback((k) => (v) => setForm(p => ({ ...p, [k]: v })), []);

  if (submitted) return (
    <div style={{ textAlign: "center", padding: "52px 24px" }}>
      <div style={{
        width: 64, height: 64, borderRadius: "50%",
        background: T.gold + "14", border: `1px solid ${T.gold}50`,
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 22px",
      }}>
        <Icon.check size={26} color={T.gold} sw={2.5} />
      </div>
      <h3 style={{ fontFamily: T.display, fontSize: 24, fontWeight: 700, color: T.navy, marginBottom: 10, letterSpacing: "-0.01em" }}>
        Message Sent
      </h3>
      <p style={{ fontFamily: T.sans, fontSize: 14, color: T.slate, lineHeight: 1.75, maxWidth: 340, margin: "0 auto 28px", fontWeight: 300 }}>
        We've received your inquiry and will respond within 24 hours. If urgent, call us directly.
      </p>
      <button
        onClick={() => setSub(false)}
        style={{
          background: T.gold, color: T.navy, border: "none", borderRadius: 2,
          padding: "12px 24px", fontFamily: T.sans, fontSize: 12,
          fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
        }}
      >
        Send Another
      </button>
    </div>
  );

  return (
    <form
      onSubmit={e => { e.preventDefault(); setSub(true); }}
      style={{ display: "flex", flexDirection: "column", gap: 16 }}
      noValidate
    >
      <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Field id="name"  label="Full Name"    required placeholder="Your name"       value={form.name}  onChange={set("name")} />
        <Field id="org"   label="Organisation"          placeholder="Company / Body"  value={form.org}   onChange={set("org")} />
      </div>
      <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Field id="email" label="Email"        required type="email" placeholder="your@email.com" value={form.email} onChange={set("email")} />
        <Field id="phone" label="Phone"                 type="tel"   placeholder="+254 …"         value={form.phone} onChange={set("phone")} />
      </div>
      <Field id="dept"    label="Department"   required options={DEPARTMENTS} value={form.dept}    onChange={set("dept")} />
      <Field id="message" label="Message"      required rows={5} placeholder="Tell us about your inquiry…" value={form.message} onChange={set("message")} />

      <button
        type="submit"
        onMouseEnter={() => setHovBtn(true)}
        onMouseLeave={() => setHovBtn(false)}
        style={{
          background: hovBtn ? T.goldLight : T.gold,
          color: T.navy, border: "none", borderRadius: 2,
          padding: "14px 0", fontFamily: T.sans, fontSize: 12, fontWeight: 700,
          letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer",
          transition: "background 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease",
          transform: hovBtn ? "translateY(-1px)" : "none",
          boxShadow: hovBtn ? `0 8px 28px rgba(201,168,76,0.28)` : `0 4px 12px rgba(201,168,76,0.18)`,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
        }}
      >
        Send Message
        <Icon.arrowRight size={12} color={T.navy} />
      </button>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <div style={{ width: 16, height: 1, background: `rgba(14,21,35,0.1)` }} />
        <span style={{ fontFamily: T.mono, fontSize: 9, color: T.mist, letterSpacing: "0.14em", textTransform: "uppercase" }}>
          24hr response · Treated confidentially
        </span>
        <div style={{ width: 16, height: 1, background: `rgba(14,21,35,0.1)` }} />
      </div>
    </form>
  );
}

// ─── Office card ──────────────────────────────────────────────────────────────
function OfficeCard({ office, index, visible }) {
  const isPrimary = office.primary;
  const iconColor = isPrimary ? "rgba(255,255,255,0.35)" : T.mist;
  const textColor = isPrimary ? "rgba(255,255,255,0.55)" : T.slate;

  const rows = [
    { IconC: Icon.pin,   text: `${office.address}, ${office.area}` },
    { IconC: Icon.phone, text: office.phone, href: `tel:${office.phone}` },
    { IconC: Icon.mail,  text: office.email, href: `mailto:${office.email}` },
    { IconC: Icon.clock, text: office.hours },
  ];

  return (
    <div style={{
      background: isPrimary ? T.navy : T.white,
      border: `1px solid ${isPrimary ? "rgba(255,255,255,0.07)" : "rgba(14,21,35,0.08)"}`,
      borderTop: `2px solid ${T.gold}`,
      borderRadius: 2,
      overflow: "hidden",
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(20px)",
      transition: `opacity 0.55s ease ${index * 0.1}s, transform 0.55s ease ${index * 0.1}s`,
    }}>
      {/* Card header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "18px 20px 14px",
        borderBottom: `1px solid ${isPrimary ? "rgba(255,255,255,0.06)" : "rgba(14,21,35,0.06)"}`,
      }}>
        <div>
          <div style={{
            fontFamily: T.mono, fontSize: 8, fontWeight: 500,
            color: T.gold, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 4,
          }}>{office.label}</div>
          <div style={{
            fontFamily: T.display, fontSize: 22, fontWeight: 700,
            color: isPrimary ? T.white : T.navy, letterSpacing: "-0.01em",
          }}>{office.city}</div>
        </div>
        <div style={{
          width: 38, height: 38, borderRadius: "50%",
          background: T.gold + "14", border: `1px solid ${T.gold}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Icon.pin size={16} color={T.gold} sw={1.6} />
        </div>
      </div>

      {/* Detail rows */}
      <div style={{ padding: "16px 20px 14px", display: "flex", flexDirection: "column", gap: 11 }}>
        {rows.map(({ IconC, text, href }) => (
          <div key={text} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ flexShrink: 0, marginTop: 2, opacity: 0.7 }}>
              <IconC size={13} color={iconColor} sw={1.5} />
            </span>
            {href ? (
              <a href={href} style={{ fontFamily: T.sans, fontSize: 12, color: textColor, textDecoration: "none", lineHeight: 1.55, fontWeight: 300, transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = T.gold}
                onMouseLeave={e => e.currentTarget.style.color = textColor}
              >{text}</a>
            ) : (
              <span style={{ fontFamily: T.sans, fontSize: 12, color: textColor, lineHeight: 1.55, fontWeight: 300 }}>{text}</span>
            )}
          </div>
        ))}
      </div>

      {/* Maps link */}
      <div style={{ padding: "0 20px 18px" }}>
        <a href={office.mapUrl} target="_blank" rel="noopener noreferrer" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontFamily: T.mono, fontSize: 9, fontWeight: 500,
          color: T.gold, textDecoration: "none",
          letterSpacing: "0.14em", textTransform: "uppercase",
          borderBottom: `1px solid ${T.gold}35`, paddingBottom: 1,
          transition: "border-color 0.2s, opacity 0.2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = T.gold; e.currentTarget.style.opacity = "0.75"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = `${T.gold}35`; e.currentTarget.style.opacity = "1"; }}
        >
          Open in Maps
          <Icon.externalLink size={10} color={T.gold} sw={2} />
        </a>
      </div>
    </div>
  );
}

// ─── Quick contacts strip ─────────────────────────────────────────────────────
function QuickContacts({ visible }) {
  return (
    <div style={{
      borderRadius: 2,
      border: `1px solid rgba(14,21,35,0.08)`,
      overflow: "hidden",
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(16px)",
      transition: "opacity 0.6s ease 0.22s, transform 0.6s ease 0.22s",
    }}>
      {/* Header */}
      <div style={{
        background: T.navy, padding: "12px 18px",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{ width: 18, height: 1, background: `linear-gradient(90deg, ${T.gold}, transparent)` }} />
        <span style={{ fontFamily: T.mono, fontSize: 9, fontWeight: 500, color: T.gold, letterSpacing: "0.22em", textTransform: "uppercase" }}>Quick Contact</span>
      </div>

      {QUICK_CONTACTS.map((c, i) => {
        const CIcon = c.IconC;
        return (
          <a key={c.label} href={c.href}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              textDecoration: "none", padding: "14px 18px",
              background: T.white,
              borderBottom: i < QUICK_CONTACTS.length - 1 ? `1px solid rgba(14,21,35,0.06)` : "none",
              transition: "background 0.18s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = T.ivory}
            onMouseLeave={e => e.currentTarget.style.background = T.white}
          >
            <div style={{
              width: 34, height: 34, borderRadius: 6,
              background: T.gold + "12", border: `1px solid ${T.gold}28`,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <CIcon size={13} color={T.gold} sw={1.6} />
            </div>
            <div>
              <div style={{ fontFamily: T.mono, fontSize: 8, color: T.mist, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 2 }}>{c.label}</div>
              <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 500, color: T.navy }}>{c.value}</div>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <Icon.arrowRight size={11} color={T.mist} />
            </div>
          </a>
        );
      })}
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
      {/* Grid texture */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: [
          `linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px)`,
          `linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)`,
        ].join(","),
        backgroundSize: "56px 56px",
      }} />
      {/* Decorative "C" */}
      <div aria-hidden="true" style={{
        position: "absolute", right: "-0.04em", top: "50%", transform: "translateY(-50%)",
        fontFamily: T.display, fontSize: "clamp(240px,28vw,400px)",
        fontWeight: 700, color: "rgba(201,168,76,0.04)",
        lineHeight: 1, userSelect: "none", pointerEvents: "none",
        letterSpacing: "-0.04em",
      }}>C</div>
      {/* Gold bottom rule */}
      <div aria-hidden="true" style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, ${T.gold}, transparent 70%)`,
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: 32 }}>
          <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", alignItems: "center", gap: 10 }}>
            <li><Link to="/" style={{ fontFamily: T.mono, fontSize: 10, color: "rgba(255,255,255,0.3)", textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase" }}>Home</Link></li>
            <li aria-hidden="true" style={{ color: T.goldDim, fontSize: 10 }}>›</li>
            <li><span style={{ fontFamily: T.mono, fontSize: 10, color: T.goldLight, letterSpacing: "0.1em", textTransform: "uppercase" }} aria-current="page">Contact</span></li>
          </ol>
        </nav>

        <div style={{ maxWidth: 640 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20,
            opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(10px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}>
            <div style={{ width: 32, height: 1, background: T.gold }} />
            <span style={{ fontFamily: T.mono, fontSize: 9, color: T.gold, letterSpacing: "0.26em", textTransform: "uppercase" }}>Get in Touch</span>
          </div>

          <h1 style={{
            fontFamily: T.display,
            fontSize: "clamp(44px,6vw,80px)",
            fontWeight: 600, color: T.white,
            letterSpacing: "-0.03em", lineHeight: 1.0,
            margin: "0 0 20px",
            opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(22px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}>
            Let's Start a<br />
            <em style={{ color: T.goldLight, fontStyle: "italic" }}>Conversation</em>
          </h1>

          <p style={{
            fontFamily: T.sans,
            fontSize: "clamp(14px,1.4vw,16px)",
            color: "rgba(255,255,255,0.42)", lineHeight: 1.82,
            maxWidth: 460, margin: 0, fontWeight: 300,
            opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(22px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}>
            Whether you're enquiring about a project, partnership, career, or press —
            route your message to the right team and we'll respond within 24 hours.
          </p>
        </div>
      </div>
    </header>
  );
}

// ─── Map placeholder ──────────────────────────────────────────────────────────
function MapBlock() {
  return (
    <div style={{
      height: "clamp(240px,32vw,400px)",
      background: T.navyMid,
      position: "relative", overflow: "hidden",
      borderTop: `1px solid rgba(14,21,35,0.1)`,
    }}>
      {/* Subtle grid on dark bg */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0,
        backgroundImage: [
          `linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px)`,
          `linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)`,
        ].join(","),
        backgroundSize: "48px 48px",
      }} />
      {/* Crosshair */}
      <div aria-hidden="true" style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: 48, height: 48,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ width: 1, height: "100%", background: `${T.gold}40`, position: "absolute" }} />
        <div style={{ height: 1, width: "100%", background: `${T.gold}40`, position: "absolute" }} />
        <div style={{
          width: 10, height: 10, borderRadius: "50%",
          background: T.gold, position: "absolute",
          boxShadow: `0 0 0 6px ${T.gold}25, 0 0 0 12px ${T.gold}0C`,
        }} />
      </div>
      {/* Label */}
      <div style={{
        position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
        background: "rgba(14,21,35,0.8)", backdropFilter: "blur(8px)",
        border: `1px solid ${T.gold}20`,
        borderRadius: 2, padding: "8px 16px", textAlign: "center",
        whiteSpace: "nowrap",
      }}>
        <div style={{ fontFamily: T.mono, fontSize: 9, color: T.gold, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 2 }}>Map embed</div>
        <div style={{ fontFamily: T.sans, fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 300 }}>Replace with Google Maps iframe — API key required</div>
      </div>
      {/* Gold bottom rule */}
      <div aria-hidden="true" style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, ${T.gold}, transparent 60%)`,
      }} />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function ContactPage() {
  const [ref, visible] = useInView(0.06);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href={FONTS_HREF} rel="stylesheet" />

      <div style={{ background: T.ivory, minHeight: "100vh" }}>
        <Hero />

        {/* Main content */}
        <main
          id="main-content"
          tabIndex={-1}
          ref={ref}
          style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(48px,6vw,80px) clamp(16px,3vw,32px)" }}
        >
          <div className="contact-grid" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr",
            gap: "clamp(32px,5vw,72px)",
            alignItems: "start",
          }}>

            {/* ── Left column: offices + quick contacts ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Label + heading */}
              <div style={{
                opacity: visible ? 1 : 0, transition: "opacity 0.5s ease",
              }}>
                <SectionLabel>Our Offices</SectionLabel>
                <h2 style={{
                  fontFamily: T.display,
                  fontSize: "clamp(24px,2.8vw,36px)",
                  fontWeight: 600, color: T.navy,
                  letterSpacing: "-0.02em", lineHeight: 1.1,
                  margin: 0,
                }}>
                  Where to <em style={{ fontStyle: "italic", color: T.gold }}>Find Us</em>
                </h2>
              </div>

              {/* Office cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {OFFICES.map((o, i) => (
                  <OfficeCard key={o.id} office={o} index={i} visible={visible} />
                ))}
              </div>

              {/* Quick contacts */}
              <QuickContacts visible={visible} />
            </div>

            {/* ── Right column: form ── */}
            <div style={{
              background: T.white,
              border: `1px solid rgba(14,21,35,0.08)`,
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "0 8px 40px rgba(14,21,35,0.07)",
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateX(20px)",
              transition: "opacity 0.65s ease 0.12s, transform 0.65s ease 0.12s",
            }}>
              {/* Form header */}
              <div style={{ background: T.navy, padding: "26px 28px 22px", position: "relative" }}>
                <div aria-hidden="true" style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, ${T.gold}, transparent 60%)`,
                }} />
                <SectionLabel color={T.gold}>Send a Message</SectionLabel>
                <h2 style={{
                  fontFamily: T.display, fontSize: 26, fontWeight: 700,
                  color: T.white, letterSpacing: "-0.02em", margin: "0 0 8px",
                }}>
                  How Can We Help?
                </h2>
                <p style={{
                  fontFamily: T.sans, fontSize: 12, color: "rgba(255,255,255,0.35)",
                  lineHeight: 1.7, margin: 0, fontWeight: 300,
                }}>
                  Use the department selector to route your message directly to the right team.
                </p>
              </div>

              {/* Form body */}
              <div style={{ padding: "26px 28px 30px" }}>
                <ContactForm />
              </div>
            </div>
          </div>
        </main>

        {/* Map */}
        <MapBlock />
      </div>

      <style>{`
        .contact-grid { grid-template-columns: 1fr 1.5fr; }
        .form-row     { grid-template-columns: 1fr 1fr; }

        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .form-row { grid-template-columns: 1fr !important; }
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
      `}</style>
    </>
  );
}