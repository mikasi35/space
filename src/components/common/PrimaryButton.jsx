import { BRAND, FONT } from "../../shared/constants";
import { ArrowRight } from "./ArrowRight";

export function PrimaryButton({ href, onClick, children, style = {} }) {
  const base = {
    display: "inline-flex", alignItems: "center", gap: 10,
    background: BRAND.orange, color: "#fff",
    padding: "15px 36px", borderRadius: 4,
    fontFamily: FONT.heading, fontSize: 14, fontWeight: 700,
    textDecoration: "none", letterSpacing: "0.04em",
    border: "none", cursor: "pointer", transition: "all 0.2s",
    ...style,
  };
  const hover = e => { e.currentTarget.style.background = "#A03A0A"; e.currentTarget.style.transform = "translateY(-2px)"; };
  const leave = e => { e.currentTarget.style.background = style.background || BRAND.orange; e.currentTarget.style.transform = "translateY(0)"; };
  
  return href
    ? <a href={href} style={base} onMouseEnter={hover} onMouseLeave={leave}>{children}</a>
    : <button onClick={onClick} style={base} onMouseEnter={hover} onMouseLeave={leave}>{children}</button>;
}