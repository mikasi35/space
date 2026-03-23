import { BRAND, FONT, NAV_LINKS } from "../../shared/constants";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: BRAND.dark, padding: "60px 24px 32px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="footer-top" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: 48, paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, background: BRAND.orange, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
<a href="#" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img
            src="/assets/logo.png"
            alt="Spacemine Holdings Limited"
            style={{ height: 40, width: "auto", display: "block", transition: "opacity 0.3s" }}
          />
        </a>
              </div>
              
            </div>
            <p style={{ fontFamily: FONT.body, fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, maxWidth: 280 }}>
              A leading construction and engineering company committed to quality, innovation, and building Kenya's future — one project at a time.
            </p>
          </div>
          <div>
            <div style={{ fontFamily: FONT.heading, fontSize: 11, fontWeight: 700, color: BRAND.orange, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>Quick Links</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {NAV_LINKS.map(l => (
                <a key={l} href={`#${l.toLowerCase()}`}
                  style={{ fontFamily: FONT.body, fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.target.style.color = "#fff")}
                  onMouseLeave={e => (e.target.style.color = "rgba(255,255,255,0.5)")}
                >{l}</a>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: FONT.heading, fontSize: 11, fontWeight: 700, color: BRAND.orange, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>Sectors</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["Construction", "Roads & Bridges", "Water Works", "Electrical", "Solar Energy", "Interior Design"].map(s => (
                <span key={s} style={{ fontFamily: FONT.body, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ paddingTop: 28, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontFamily: FONT.body, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{year} Spacemine Holdings Limited. All rights reserved.</span>
          <span style={{ fontFamily: FONT.body, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Nairobi, Kenya</span>
        </div>
      </div>
      <style>{`@media(max-width:768px){ .footer-top { grid-template-columns: 1fr !important; gap: 36px !important; } }`}</style>
    </footer>
  );
}