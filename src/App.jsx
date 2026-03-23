import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { Nav } from "./components/layout/Nav";
import { Footer } from "./components/layout/Footer";

import { Hero } from "./components/Hero";
import { About } from "./components/sections/About";
import { Services } from "./components/sections/Services";
import { Values } from "./components/sections/Values";
import { Environment } from "./components/sections/Environment";
import { Contact } from "./components/sections/Contact";
import { Team } from "./components/sections/Team";
import { Reviews } from "./components/sections/Reviews";
import { WhySpacemine } from "./components/sections/Why";
import { PartnerCTA } from "./components/sections/PartnerCTA";


import { AboutPage } from "./pages/About";
import { ProjectsPage } from "./pages/Project";
import { InvestorsPage } from "./pages/Investors";
import { CareersPage } from "./pages/Careers";
import { ContactPage } from "./pages/Contact";
import { MediaPage } from "./pages/Media";
import { ServicesPage } from "./pages/Services";

import "./index.css";

export default function App() {
  // Mouse glow state
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* GLOBAL CURSOR GLOW */}
      <div
        className="cursor-glow"
        style={{
          left: mousePos.x,
          top: mousePos.y,
        }}
      />

      <Nav />

      <main>
        <Routes>
          {/* 🏠 HOME PAGE */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About />
                <Services />
                <WhySpacemine />
                <PartnerCTA />
                <Values />
                <Team />
                <Environment />
                <Reviews />
                <Contact />
              </>
            }
          />

          {/* 📄 PAGES */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/investors" element={<InvestorsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/services" element={<ServicesPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}