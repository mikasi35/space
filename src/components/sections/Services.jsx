import { useState } from "react";
import { BRAND, FONT, SECTION_PAD, MAX_WIDTH, SERVICES } from "../../shared/constants";
import { AnimatedSection } from "../common/AnimatedSection";
import { SectionLabel } from "../common/SectionLabel";
import { ServiceViewer3D } from "../common/ServiceViewer3D"; // Import the 3D viewer

// Map services to specific high-quality stock images
// In a real project, replace these URLs with your local assets in /public/assets/services/
const SERVICE_IMAGES = {
  1: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
  2: "https://loremflickr.com/800/600/bridge,construction",
  3: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
  4: "https://loremflickr.com/800/600/dam,engineering,construction",
  5: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
  6: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
};

function ServiceCard({ service, active, onEnter, onLeave, onClick }) {
  const imageUrl = SERVICE_IMAGES[service.id] || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80";
  
  return (
    <article 
      className="service-card"
      onMouseEnter={onEnter} 
      onMouseLeave={onLeave}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label={`Explore ${service.title} in 3D`}
      style={{
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        height: "100%",
        minHeight: "320px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        transition: "transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s ease",
        background: BRAND.white,
        boxShadow: active ? "0 20px 40px rgba(0,0,0,0.15)" : "0 4px 6px rgba(0,0,0,0.05)",
        transform: active ? "translateY(-8px)" : "translateY(0)",
        cursor: "pointer",
        outline: "none",
      }}
      onFocus={(e) => {
        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(200, 75, 17, 0.5)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.boxShadow = active ? "0 20px 40px rgba(0,0,0,0.15)" : "0 4px 6px rgba(0,0,0,0.05)";
      }}
    >
      {/* Background Image */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden"
      }}>
        <img
          src={imageUrl}
          alt={`Professional ${service.title.toLowerCase()} service by Spacemine Holdings`}
          loading="lazy"
          decoding="async"
          width={800}
          height={600}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.6s ease",
            transform: active ? "scale(1.05)" : "scale(1)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Faint Engineered Overlay */}
      <div 
        aria-hidden="true"
        className="service-overlay"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: `linear-gradient(
            to top, 
            ${BRAND.dark} 0%, 
            rgba(10, 10, 11, 0.85) 40%, 
            rgba(10, 10, 11, 0.4) 70%, 
            transparent 100%
          )`,
          transition: "background 0.4s ease",
          opacity: active ? 0.9 : 0.85,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div style={{
        position: "relative",
        zIndex: 2,
        padding: "32px 28px",
        textAlign: "left"
      }}>
        <h3 style={{
          fontFamily: FONT.heading,
          fontSize: "clamp(18px, 2vw, 22px)",
          fontWeight: 800,
          color: BRAND.white,
          marginBottom: "12px",
          letterSpacing: "-0.01em",
          lineHeight: 1.3,
          textShadow: "0 2px 4px rgba(0,0,0,0.3)"
        }}>
          {service.title}
        </h3>
        <p style={{
          fontFamily: FONT.body,
          fontSize: "14px",
          color: "rgba(255,255,255,0.85)",
          lineHeight: 1.6,
          margin: 0,
          textShadow: "0 1px 2px rgba(0,0,0,0.3)"
        }}>
          {service.desc}
        </p>
        
        {/* Decorative Bottom Border (Orange Accent) */}
        <div style={{
          marginTop: "20px",
          width: active ? "60px" : "40px",
          height: "3px",
          background: BRAND.orange,
          transition: "width 0.4s ease",
          borderRadius: "2px"
        }} />
        
        {/* Click Hint */}
        <div style={{
          marginTop: "16px",
          display: "flex",
          alignItems: "center",
          gap: 6,
          color: "rgba(255,255,255,0.6)",
          fontSize: "12px",
          fontFamily: FONT.body,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
          <span>Explore in 3D</span>
        </div>
      </div>
    </article>
  );
}

export function Services() {
  const [hovered, setHovered] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section id="services" aria-labelledby="services-heading" style={{ background: BRAND.offwhite, padding: SECTION_PAD }}>
      <div className="container" style={{ maxWidth: MAX_WIDTH, margin: "0 auto" }}>
        
        {/* Header */}
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <SectionLabel>What We Do</SectionLabel>
            <h2 id="services-heading" style={{
              fontFamily: FONT.heading,
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 800,
              color: BRAND.dark,
              letterSpacing: "-0.02em",
              marginTop: "16px",
              marginBottom: "24px"
            }}>
              Our Services
            </h2>
            <p style={{
              fontFamily: FONT.body,
              fontSize: "17px",
              color: BRAND.gray,
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.7
            }}>
              Engineering and construction solutions delivered with expertise, innovation, and unwavering quality across Kenya.
            </p>
          </div>
        </AnimatedSection>

        {/* Grid */}
        <div className="services-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px"
        }}>
          {SERVICES.map((s, i) => (
            <AnimatedSection key={s.id} delay={i * 80}>
              <ServiceCard 
                service={s} 
                active={hovered === s.id} 
                onEnter={() => setHovered(s.id)} 
                onLeave={() => setHovered(null)}
                onClick={() => setSelectedService(s)}
              />
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* 3D Viewer Modal */}
      {selectedService && (
        <ServiceViewer3D 
          service={selectedService} 
          onClose={() => setSelectedService(null)} 
        />
      )}

      {/* Responsive Styles */}
      <style>{`
        .services-grid {
          gap: 24px;
        }
        
        /* Tablet: 2 columns */
        @media (max-width: 900px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Mobile: 1 column */
        @media (max-width: 600px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
          
          .service-card {
            min-height: 280px;
          }
        }
      `}</style>
    </section>
  );
}