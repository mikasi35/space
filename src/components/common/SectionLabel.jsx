import { BRAND, FONT } from "../../shared/constants";

export function SectionLabel({ children }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
      <div style={{ width: 32, height: 2, background: BRAND.orange }} />
      <span style={{ fontFamily: FONT.heading, fontSize: 11, fontWeight: 700, color: BRAND.orange, letterSpacing: "0.12em", textTransform: "uppercase" }}>
        {children}
      </span>
    </div>
  );
}