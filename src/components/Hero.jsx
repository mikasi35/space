import { useRef, useState, useEffect } from "react";
import "./style/hero.css"; // 
import { PrimaryButton } from "./common/PrimaryButton";
import { GhostButton } from "./common/GhostButton";
import { StatsStrip } from "./common/StatsStrip";
import { ArrowRight } from "./common/ArrowRight";
import { Link } from "react-router-dom";
import { VIDEO_MP4, VIDEO_WEBM, POSTER_SRC, BRAND, FONT, MAX_WIDTH, PRIMARY } from "../shared/constants";

export function Hero() {
    const videoRef = useRef(null);
    const [videoReady, setVideoReady] = useState(false);
    const [loadVideo, setLoadVideo] = useState(false);

    // Lazy-load video
    useEffect(() => {
        let idleId;
        if (typeof requestIdleCallback !== "undefined") {
            idleId = requestIdleCallback(() => setLoadVideo(true), { timeout: 2000 });
        } else {
            idleId = setTimeout(() => setLoadVideo(true), 500);
        }
        return () => {
            if (typeof cancelIdleCallback !== "undefined") cancelIdleCallback(idleId);
            else clearTimeout(idleId);
        };
    }, []);

    // Video canplay handler
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const onCanPlay = () => setVideoReady(true);
        const onError = () => console.warn("[Hero] Video failed to load — poster remains.");

        video.addEventListener("canplay", onCanPlay, { once: true });
        video.addEventListener("error", onError, { once: true });

        video.play().catch(() => { });

        return () => {
            video.removeEventListener("canplay", onCanPlay);
            video.removeEventListener("error", onError);
        };
    }, [loadVideo]);

    return (
        <section className="hero-section">
            {/* Poster */}
            <img
                src={POSTER_SRC}
                alt="Construction and infrastructure development project in Kenya"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width={1600}
                height={900}
                className={`hero-poster ${videoReady ? "video-ready" : ""}`}
            />

            {/* Video */}
            {loadVideo && (VIDEO_WEBM || VIDEO_MP4) && (
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    aria-hidden="true"
                    className={`hero-video ${videoReady ? "video-ready" : ""}`}
                >
                    {VIDEO_WEBM && <source src={VIDEO_WEBM} type="video/webm" />}
                    {VIDEO_MP4 && <source src={VIDEO_MP4} type="video/mp4" />}
                </video>
            )}

            <div className="hero-gradient" />
            <div className="hero-grain" />
            <HeroBackground />

            <div className="hero-content">
                {/* Badge */}
                <div className="hero-badge">
                    <span className="hero-badge-dot" />
                    <span className="hero-badge-text">Est. 2014 — Nairobi, Kenya</span>
                </div>

                {/* H1 */}
                <h1 className="hero-title">
                    Building Kenya's<br />
                    <span className="hero-title-highlight">
                        Future
                        <span className="hero-title-underline" />
                    </span>{" "}with<br />Precision
                </h1>

                {/* Subheading */}
                <p className="hero-subheading">
                    A leading powerhouse in construction and engineering — delivering roads, buildings, water systems, and renewable energy solutions across Kenya.
                </p>

                {/* CTAs */}
                <div className="hero-ctas">
                    <PrimaryButton href="#services">Explore Services <ArrowRight /></PrimaryButton>
                    <Link to="/investors">
                        <GhostButton>Partner With Us</GhostButton>
                    </Link>
                </div>

                <StatsStrip />
            </div>

            {/* Scroll indicator */}
            <div className="hero-scroll">
                <span>Scroll</span>
                <div className="hero-scroll-line">
                    <div className="hero-scroll-fill" />
                </div>
            </div>
        </section>
    );
}

function HeroBackground() {
    return (
        <div className="hero-background" aria-hidden="true">
            <div className="hero-bg-rect1" />
            <div className="hero-bg-rect2" />
            <div className="hero-bg-line" />
            <div className="hero-bg-corner" />
            {[0, 1, 2, 3, 4, 5].map(i => (
                <div key={i} className={`hero-bg-dot dot-${i}`} />
            ))}
        </div>
    );
}

