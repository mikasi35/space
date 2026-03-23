import { BRAND, FONT } from "../../shared/constants";

export function GhostButton({ href, children }) {
  const base = {
    display: "inline-flex", alignItems: "center", gap: 10,
    color: BRAND.white, padding: "15px 36px", borderRadius: 4,
    fontFamily: FONT.heading, fontSize: 14, fontWeight: 600,
    textDecoration: "none", letterSpacing: "0.04em",
    border: "1px solid rgba(255,255,255,0.2)", transition: "all 0.2s",
  };
  return (
    <a href={href} style={base}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.background = "transparent"; }}
    >
      {children}
    </a>
  );
}