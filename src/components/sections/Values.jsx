import { BRAND, FONT, SECTION_PAD, MAX_WIDTH, VALUES } from "../../shared/constants";
import { AnimatedSection } from "../common/AnimatedSection";
import { SectionLabel } from "../common/SectionLabel";

function MissionBox() {
  return (
    <div style={{ padding: "32px", background: BRAND.offwhite, borderRadius: 8, borderLeft: `4px solid ${BRAND.orange}` }}>
      <div style={{ fontFamily: FONT.heading, fontSize: 13, fontWeight: 700, color: BRAND.orange, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Our Mission</div>
      <p style={{ fontFamily: FONT.body, fontSize: 15, color: BRAND.dark, lineHeight: 1.7, margin: 0 }}>
        To deliver competitively priced, value-added services that respond to the particular needs of our clients through superior capability, innovation, and a team approach.
      </p>
    </div>
  );
}

function ValueList() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, border: `1px solid ${BRAND.lightgray}`, borderRadius: 8, overflow: "hidden" }}>
      {VALUES.map((v, i) => (
        <div key={v.title} style={{ padding: "28px 32px", borderBottom: i < VALUES.length - 1 ? `1px solid ${BRAND.lightgray}` : "none", background: "#fff", transition: "background 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.background = BRAND.offwhite)}
          onMouseLeave={e => (e.currentTarget.style.background = "#fff")}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
            <div style={{ width: 36, height: 36, background: `${BRAND.orange}15`, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
              <span style={{ fontFamily: FONT.heading, fontSize: 11, fontWeight: 800, color: BRAND.orange }}>{String(i + 1).padStart(2, "0")}</span>
            </div>
            <div>
              <div style={{ fontFamily: FONT.heading, fontSize: 15, fontWeight: 700, color: BRAND.dark, marginBottom: 6 }}>{v.title}</div>
              <div style={{ fontFamily: FONT.body, fontSize: 13, color: BRAND.gray, lineHeight: 1.6 }}>{v.desc}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Values() {
  return (
    <section id="values" style={{ background: BRAND.white, padding: SECTION_PAD }}>
      <div style={{ maxWidth: MAX_WIDTH, margin: "0 auto" }}>
        <div className="values-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <AnimatedSection>
            <SectionLabel>Our Values</SectionLabel>
            <h2 style={{ fontFamily: FONT.heading, fontSize: "clamp(32px,4vw,48px)", fontWeight: 800, color: BRAND.dark, lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.02em" }}>What We Stand For</h2>
            <p style={{ fontFamily: FONT.body, fontSize: 16, color: BRAND.gray, lineHeight: 1.8, marginBottom: 40 }}>
              Our core values aren't corporate platitudes — they're the principles baked into every decision, every project, every interaction.
            </p>
            <MissionBox />
          </AnimatedSection>
          <AnimatedSection delay={100}><ValueList /></AnimatedSection>
        </div>
      </div>
      <style>{`@media(max-width:768px){ .values-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
    </section>
  );
}