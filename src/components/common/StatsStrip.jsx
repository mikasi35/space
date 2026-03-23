import { BRAND, FONT, STATS } from "../../shared/constants";

export function StatsStrip() {
  return (
    <div className="hero-stats">
      {STATS.map((s, i) => (
        <div key={s.label} className={`stat-item ${i % 2 === 0 ? "stat-item-even" : ""}`}>
          <span className="stat-value">{s.value}</span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}