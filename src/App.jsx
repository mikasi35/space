import { useState, useEffect } from "react";
import { Nav } from "./components/layout/Nav";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/Hero";
import { About } from "./components/sections/About";
import { Services } from "./components/sections/Services";
import { Projects } from "./components/sections/Projects";
import { Values } from "./components/sections/Values";
import { Environment } from "./components/sections/Environment";
import { Contact } from "./components/sections/Contact";
import "./index.css"; 
import { Team } from "./components/sections/Team";
import { Reviews } from "./components/sections/Reviews";

export default function App() {
  // State to track mouse position
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
        <Hero />
        <About />
        <Services />
        <Projects />
        <Values />
        <Team />
        <Environment />
        <Reviews/>
        <Contact />
      </main>
      <Footer />
    </>
  );
}