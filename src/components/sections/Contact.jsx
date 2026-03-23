import { useState } from "react";
import { BRAND, FONT, SERVICES, CONTACT_INFO, SECTION_PAD, MAX_WIDTH } from "../../shared/constants";
import { AnimatedSection } from "../common/AnimatedSection";
import { SectionLabel } from "../common/SectionLabel";
import { PrimaryButton } from "../common/PrimaryButton";
import { Icon } from "../common/Icon";

function ContactInfo() {
  return (
    <>
      <SectionLabel>Contact</SectionLabel>
      <h2 style={{ fontFamily: FONT.heading, fontSize: "clamp(32px,4vw,44px)", fontWeight: 800, color: BRAND.dark, lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.02em" }}>Let's Build<br />Something Great</h2>
      <p style={{ fontFamily: FONT.body, fontSize: 16, color: BRAND.gray, lineHeight: 1.8, marginBottom: 48 }}>Whether it's a large infrastructure project or a targeted renovation, our team is ready to deliver.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {CONTACT_INFO.map(c => (
          <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 44, height: 44, background: `${BRAND.orange}15`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: BRAND.orange, flexShrink: 0 }}>
              <Icon paths={c.icon} size={18} />
            </div>
            <div>
              <div style={{ fontFamily: FONT.heading, fontSize: 11, fontWeight: 700, color: BRAND.gray, letterSpacing: "0.1em", textTransform: "uppercase" }}>{c.label}</div>
              <div style={{ fontFamily: FONT.body, fontSize: 15, color: BRAND.dark, marginTop: 2 }}>{c.value}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = e => { e.preventDefault(); setSent(true); };
  const inp = (extra = {}) => ({ width: "100%", padding: "14px 16px", border: `1px solid ${BRAND.lightgray}`, borderRadius: 4, fontFamily: FONT.body, fontSize: 14, color: BRAND.dark, background: "#fff", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s", ...extra });
  const focusStyle = e => (e.target.style.borderColor = BRAND.orange);
  const blurStyle = e => (e.target.style.borderColor = BRAND.lightgray);

  return (
    <div style={{ background: "#fff", borderRadius: 8, padding: "48px", boxShadow: "0 2px 32px rgba(0,0,0,0.06)", border: `1px solid ${BRAND.lightgray}` }}>
      {sent ? (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <div style={{ width: 64, height: 64, background: `${BRAND.orange}15`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", color: BRAND.orange }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <div style={{ fontFamily: FONT.heading, fontSize: 20, fontWeight: 700, color: BRAND.dark, marginBottom: 12 }}>Message Received</div>
          <p style={{ fontFamily: FONT.body, fontSize: 15, color: BRAND.gray, lineHeight: 1.7 }}>Thank you for reaching out. Our team will be in touch within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={submit}>
          <div style={{ fontFamily: FONT.heading, fontSize: 20, fontWeight: 700, color: BRAND.dark, marginBottom: 32 }}>Send us a message</div>
          <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <input name="name" required placeholder="Full Name" value={form.name} onChange={handle} onFocus={focusStyle} onBlur={blurStyle} style={inp()} />
            <input name="email" required type="email" placeholder="Email Address" value={form.email} onChange={handle} onFocus={focusStyle} onBlur={blurStyle} style={inp()} />
          </div>
          <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handle} onFocus={focusStyle} onBlur={blurStyle} style={inp()} />
            <select name="service" value={form.service} onChange={handle} onFocus={focusStyle} onBlur={blurStyle} style={inp({ color: form.service ? BRAND.dark : BRAND.gray })}>
              <option value="">Select a Service</option>
              {SERVICES.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
            </select>
          </div>
          <textarea name="message" required placeholder="Tell us about your project..." rows={5} value={form.message} onChange={handle} onFocus={focusStyle} onBlur={blurStyle} style={{ ...inp(), resize: "vertical", marginBottom: 24 }} />
          <PrimaryButton style={{ width: "100%", justifyContent: "center" }}>Send Message</PrimaryButton>
        </form>
      )}
      <style>{`@media(max-width:560px){ .form-row { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

export function Contact() {
  return (
    <section id="contact" style={{ background: BRAND.offwhite, padding: SECTION_PAD }}>
      <div style={{ maxWidth: MAX_WIDTH, margin: "0 auto" }}>
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <AnimatedSection><ContactInfo /></AnimatedSection>
          <AnimatedSection delay={100}><ContactForm /></AnimatedSection>
        </div>
      </div>
      <style>{`@media(max-width:768px){ .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
    </section>
  );
}