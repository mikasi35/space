import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

// ─── Design tokens (mirrors the full site suite) ──────────────────────────────
const T = {
    ivory: "#F8F5EF",
    white: "#FFFFFF",
    navy: "#0E1523",
    navyMid: "#16213A",
    gold: "#C9A84C",
    goldLight: "#E2C47A",
    goldDim: "#A0803A",
    slate: "#4A5568",
    mist: "#8896A8",
    display: `'Cormorant Garamond', 'Playfair Display', Georgia, serif`,
    sans: `'DM Sans', 'Outfit', system-ui, sans-serif`,
    mono: `'DM Mono', 'Fira Code', monospace`,
};

const LOGO = {
    href: "assets/logo.png"
}

const FONTS_HREF =
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap";

// ─── Nav links ────────────────────────────────────────────────────────────────
const PRIMARY = [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Investors", href: "/investors" },
    { label: "Contact", href: "/contact" },
];

const MORE = [
    { label: "Media & News", href: "/media", desc: "Project updates & announcements" },
    { label: "Careers", href: "/careers", desc: "Open roles across Kenya" },
];

// ─── Jet Button ───────────────────────────────────────────────────────────────
// Keeps all original animation mechanics; colours updated to gold/navy palette.
function NavJetButton() {
    const [hovered, setHovered] = useState(false);
    const [firing, setFiring] = useState(false);
    const navigate = useNavigate();

    const handleClick = useCallback((e) => {
        e.preventDefault();
        if (firing) return;
        setFiring(true);
        setTimeout(() => { setFiring(false); navigate("/contact"); }, 480);
    }, [firing, navigate]);

    const active = hovered || firing;

    return (
        <Link
            to="/contact"
            onClick={handleClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            aria-label="Get a quote — ignite your project"
            style={{
                position: "relative",
                display: "inline-flex",
                width: 152,
                height: 38,
                textDecoration: "none",
                cursor: firing ? "default" : "pointer",
                flexShrink: 0,
            }}
        >
            <div style={{
                position: "absolute", inset: 0,
                borderRadius: 2,
                background: T.navy,
                border: `1px solid ${active ? `${T.gold}60` : `${T.gold}20`}`,
                overflow: "hidden",
                transition: "border-color 0.22s ease",
            }}>
                {/* Corner brackets — gold tinted */}
                {[["top", "left"], ["top", "right"], ["bottom", "left"], ["bottom", "right"]].map(([v, h]) => (
                    <div key={v + h} aria-hidden="true" style={{
                        position: "absolute", [v]: 5, [h]: 5, width: 6, height: 6,
                        borderColor: active ? `${T.gold}60` : `${T.gold}22`,
                        borderStyle: "solid",
                        borderWidth: v === "top" && h === "left" ? "1px 0 0 1px"
                            : v === "top" && h === "right" ? "1px 1px 0 0"
                                : v === "bottom" && h === "left" ? "0 0 1px 1px"
                                    : "0 1px 1px 0",
                        transition: "border-color 0.22s ease",
                    }} />
                ))}

                {/* LED — gold pulse */}
                <div aria-hidden="true" style={{
                    position: "absolute", top: 6, right: 6,
                    width: 5, height: 5, borderRadius: "50%",
                    background: active ? T.gold : `${T.gold}30`,
                    transition: "background 0.25s ease",
                    animation: hovered && !firing ? "navLed 1.6s ease-in-out infinite" : "none",
                }} />

                {/* Guard (flips up on hover) */}
                <div style={{
                    position: "absolute", inset: 0,
                    background: T.gold,
                    borderRadius: 2,
                    transformOrigin: "top center",
                    transform: active ? "rotateX(-108deg)" : "rotateX(0deg)",
                    transition: "transform 0.36s cubic-bezier(0.25,0.46,0.45,0.94)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: `1px solid ${T.goldDim}`,
                    perspective: "300px",
                    backfaceVisibility: "hidden",
                    zIndex: 2,
                }}>
                    <span style={{
                        fontFamily: T.mono, fontSize: 7, fontWeight: 500,
                        color: `${T.navy}CC`, letterSpacing: "0.22em", textTransform: "uppercase",
                    }}>Lift to launch</span>
                </div>

                {/* Ignition face */}
                <div style={{
                    position: "absolute", inset: 3, borderRadius: 1,
                    background: "#08101C",
                    border: `1px solid ${T.gold}12`,
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", gap: 2,
                    zIndex: 1,
                }}>
                    <span style={{
                        fontFamily: T.display, fontSize: 12, fontWeight: 700,
                        color: T.white, letterSpacing: "0.04em", textTransform: "uppercase", lineHeight: 1,
                    }}>Get a Quote</span>
                    <span style={{
                        fontFamily: T.mono, fontSize: 7, color: `${T.gold}55`,
                        letterSpacing: "0.14em", textTransform: "uppercase",
                    }}>Ignite project</span>
                </div>

                {/* Fire sweep */}
                <div style={{
                    position: "absolute", inset: 0, borderRadius: 2,
                    background: T.gold, zIndex: 5,
                    transformOrigin: "bottom center",
                    transform: firing ? "scaleY(1)" : "scaleY(0)",
                    transition: firing ? "transform 0.18s ease-out" : "transform 0.22s ease-in",
                    display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                    <span style={{
                        fontFamily: T.mono, fontSize: 8, fontWeight: 700,
                        color: T.navy, letterSpacing: "0.2em", textTransform: "uppercase",
                        opacity: firing ? 1 : 0, transition: "opacity 0.08s 0.1s",
                    }}>Launching…</span>
                </div>
            </div>

            <style>{`@keyframes navLed{0%,100%{opacity:1}50%{opacity:0.25}}`}</style>
        </Link>
    );
}

// ─── More dropdown ────────────────────────────────────────────────────────────
function MoreDropdown({ scrolled }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const linkColor = scrolled ? T.navy : T.white;

    useEffect(() => {
        const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        const esc = (e) => { if (e.key === "Escape") setOpen(false); };
        document.addEventListener("mousedown", close);
        window.addEventListener("keydown", esc);
        return () => { document.removeEventListener("mousedown", close); window.removeEventListener("keydown", esc); };
    }, []);

    return (
        <div ref={ref} style={{ position: "relative" }}>
            <button
                onClick={() => setOpen(p => !p)}
                aria-expanded={open}
                aria-haspopup="true"
                style={{
                    display: "flex", alignItems: "center", gap: 5,
                    background: "none", border: "none", cursor: "pointer",
                    fontFamily: T.sans, fontSize: 13, fontWeight: open ? 600 : 400,
                    color: open ? T.gold : linkColor,
                    letterSpacing: "0.02em", padding: 0,
                    transition: "color 0.22s",
                }}
                onMouseEnter={e => { if (!open) e.currentTarget.style.color = T.gold; }}
                onMouseLeave={e => { if (!open) e.currentTarget.style.color = linkColor; }}
            >
                More
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"
                    style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.25s" }}>
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            {open && (
                <div
                    role="menu"
                    style={{
                        position: "absolute", top: "calc(100% + 14px)", right: 0,
                        width: 248,
                        background: T.white,
                        border: `1px solid rgba(14,21,35,0.09)`,
                        borderRadius: 2,
                        boxShadow: "0 16px 56px rgba(14,21,35,0.14), 0 4px 16px rgba(14,21,35,0.06)",
                        overflow: "hidden",
                        animation: "dropIn 0.2s cubic-bezier(0.16,1,0.3,1) forwards",
                        zIndex: 200,
                    }}
                >
                    {/* Gold top stripe */}
                    <div aria-hidden="true" style={{ height: 2, background: `linear-gradient(90deg, ${T.gold}, transparent 70%)` }} />

                    <div style={{ padding: "6px 0" }}>
                        {MORE.map(link => (
                            <Link
                                key={link.href}
                                to={link.href}
                                role="menuitem"
                                onClick={() => setOpen(false)}
                                style={{
                                    display: "flex", flexDirection: "column", gap: 3,
                                    padding: "11px 16px", textDecoration: "none",
                                    transition: "background 0.15s",
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = T.ivory}
                                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                            >
                                <span style={{ fontFamily: T.display, fontSize: 15, fontWeight: 600, color: T.navy, letterSpacing: "-0.01em" }}>{link.label}</span>
                                <span style={{ fontFamily: T.sans, fontSize: 11, color: T.mist, fontWeight: 300 }}>{link.desc}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Social strip */}
                    <div style={{
                        borderTop: `1px solid rgba(14,21,35,0.07)`,
                        padding: "10px 16px",
                        display: "flex", gap: 16,
                    }}>
                        {[
                            { label: "LinkedIn", href: "https://linkedin.com/company/spacemine" },
                            { label: "WhatsApp", href: "https://wa.me/254XXXXXXXXX" },
                        ].map(s => (
                            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                                style={{
                                    fontFamily: T.mono, fontSize: 9, fontWeight: 600,
                                    color: T.gold, textDecoration: "none",
                                    letterSpacing: "0.14em", textTransform: "uppercase",
                                    transition: "opacity 0.15s",
                                }}
                                onMouseEnter={e => e.currentTarget.style.opacity = "0.6"}
                                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                            >{s.label}</a>
                        ))}
                    </div>
                </div>
            )}

            <style>{`@keyframes dropIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}`}</style>
        </div>
    );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
export function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activePath, setActivePath] = useState(
        typeof window !== "undefined" ? window.location.pathname : "/"
    );

    // Scroll listener
    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", fn, { passive: true });
        fn();
        return () => window.removeEventListener("scroll", fn);
    }, []);

    // Sync active path on back/forward navigation
    useEffect(() => {
        const onPop = () => setActivePath(window.location.pathname);
        window.addEventListener("popstate", onPop);
        return () => window.removeEventListener("popstate", onPop);
    }, []);

    // Lock body scroll when mobile menu open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    const linkColor = scrolled ? T.navy : T.white;
    const isActive = (href) => activePath === href || (href !== "/" && activePath.startsWith(href));
    const allMobile = [...PRIMARY, ...MORE.map(({ label, href }) => ({ label, href }))];

    return (
        <>
            {/* Font injection — only once at the top level */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href={FONTS_HREF} rel="stylesheet" />

            <nav
                aria-label="Main navigation"
                style={{
                    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
                    background: scrolled ? "rgba(248,245,239,0.97)" : "transparent",
                    backdropFilter: scrolled ? "blur(16px)" : "none",
                    WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
                    boxShadow: scrolled ? "0 1px 0 rgba(14,21,35,0.07)" : "none",
                    transition: "background 0.35s ease, box-shadow 0.35s ease",
                    padding: "0 clamp(16px,3vw,32px)",
                }}
            >
                {/* ── Main bar ── */}
                <div style={{
                    maxWidth: 1200, margin: "0 auto", height: 68,
                    display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24,
                }}>

                    {/* Logo */}
                    <Link
                        to="/"
                        aria-label="Spacemine Holdings — Home"
                        style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}
                    >
                        <img
                            src={(LOGO.href)}
                            alt="Spacemine Holdings Limited"
                            style={{ height: 38, width: "auto", display: "block" }}
                        />
                    </Link>

                    {/* ── Desktop links ── */}
                    <div className="nav-desktop" style={{
                        display: "flex", alignItems: "center", gap: 22,
                        flex: 1, justifyContent: "center",
                    }}>
                        {PRIMARY.map(link => {
                            const active = isActive(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    aria-current={active ? "page" : undefined}
                                    style={{
                                        position: "relative",
                                        fontFamily: T.sans, fontSize: 13,
                                        fontWeight: active ? 600 : 400,
                                        color: active ? T.gold : linkColor,
                                        textDecoration: "none",
                                        letterSpacing: "0.02em",
                                        paddingBottom: 2,
                                        transition: "color 0.22s",
                                    }}
                                    onMouseEnter={e => { if (!active) e.currentTarget.style.color = T.gold; }}
                                    onMouseLeave={e => { if (!active) e.currentTarget.style.color = linkColor; }}
                                >
                                    {link.label}
                                    {/* Active underline */}
                                    {active && (
                                        <span aria-hidden="true" style={{
                                            position: "absolute", bottom: -2, left: 0, right: 0,
                                            height: 1,
                                            background: `linear-gradient(90deg, ${T.gold}, transparent)`,
                                            borderRadius: 1,
                                        }} />
                                    )}
                                </Link>
                            );
                        })}

                        {/* Thin divider */}
                        <div aria-hidden="true" style={{
                            width: 1, height: 14,
                            background: scrolled ? "rgba(14,21,35,0.1)" : "rgba(255,255,255,0.15)",
                            flexShrink: 0,
                        }} />

                        <MoreDropdown scrolled={scrolled} />
                    </div>

                    {/* ── Right slot ── */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                        <div className="nav-desktop">
                            <NavJetButton />
                        </div>

                        {/* Hamburger */}
                        <button
                            onClick={() => setMobileOpen(p => !p)}
                            className="nav-hamburger"
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                            aria-expanded={mobileOpen}
                            style={{
                                display: "none", background: "none", border: "none",
                                cursor: "pointer", padding: 6, borderRadius: 2,
                                transition: "background 0.15s",
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                                stroke={scrolled ? T.navy : T.white} strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                                {mobileOpen
                                    ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                                    : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
                                }
                            </svg>
                        </button>
                    </div>
                </div>

                {/* ── Mobile menu ── */}
                {mobileOpen && (
                    <div style={{
                        background: T.ivory,
                        borderTop: `1px solid ${T.gold}20`,
                        padding: "10px 0 28px",
                        maxHeight: "calc(100vh - 68px)",
                        overflowY: "auto",
                    }}>
                        {/* Links */}
                        <div style={{ padding: "0 24px" }}>
                            {allMobile.map((link, i) => {
                                const active = isActive(link.href);
                                return (
                                    <Link
                                        key={link.href}
                                        to={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        aria-current={active ? "page" : undefined}
                                        style={{
                                            display: "flex", alignItems: "center", justifyContent: "space-between",
                                            fontFamily: T.display, fontSize: 18, fontWeight: active ? 700 : 400,
                                            color: active ? T.gold : T.navy,
                                            textDecoration: "none",
                                            padding: "14px 0",
                                            borderBottom: i < allMobile.length - 1
                                                ? `1px solid rgba(14,21,35,0.07)` : "none",
                                            letterSpacing: "-0.01em",
                                            transition: "color 0.15s",
                                        }}
                                    >
                                        {link.label}
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                            stroke={active ? T.gold : T.mist}
                                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Mobile CTA block */}
                        <div style={{ padding: "20px 24px 0" }}>
                            {/* Primary CTA */}
                            <Link
                                to="/contact"
                                onClick={() => setMobileOpen(false)}
                                style={{
                                    display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                                    background: T.gold, color: T.navy,
                                    padding: "14px 0", borderRadius: 2,
                                    fontFamily: T.sans, fontSize: 13, fontWeight: 700,
                                    textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase",
                                    transition: "background 0.22s",
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = T.goldLight}
                                onMouseLeave={e => e.currentTarget.style.background = T.gold}
                            >
                                Get a Quote
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={T.navy}
                                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>

                            {/* Quick contact row */}
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
                                {[
                                    {
                                        label: "Call Us",
                                        href: "tel:+254XXXXXXXXX",
                                        icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />,
                                    },
                                    {
                                        label: "WhatsApp",
                                        href: "https://wa.me/254XXXXXXXXX",
                                        icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
                                    },
                                ].map(b => (
                                    <a
                                        key={b.label}
                                        href={b.href}
                                        target={b.href.startsWith("http") ? "_blank" : undefined}
                                        rel="noopener noreferrer"
                                        style={{
                                            display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                                            padding: "11px 0",
                                            background: T.white,
                                            border: `1px solid rgba(14,21,35,0.1)`,
                                            borderRadius: 2,
                                            fontFamily: T.sans, fontSize: 12, fontWeight: 500,
                                            color: T.navy, textDecoration: "none",
                                            transition: "background 0.15s",
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.background = `${T.gold}12`}
                                        onMouseLeave={e => e.currentTarget.style.background = T.white}
                                    >
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                                            stroke={T.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            {b.icon}
                                        </svg>
                                        {b.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <style>{`
          @media (max-width: 768px) {
            .nav-desktop   { display: none !important; }
            .nav-hamburger { display: flex !important; }
          }
          *:focus-visible {
            outline: 2px solid ${T.gold};
            outline-offset: 3px;
            border-radius: 2px;
          }
          @media (prefers-reduced-motion: reduce) {
            nav, nav * {
              transition-duration: 0.01ms !important;
              animation-duration: 0.01ms !important;
            }
          }
        `}</style>
            </nav>
        </>
    );
}