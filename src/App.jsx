// App.jsx
import "./App.css";
import "./index.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { MobileMenu } from "./components/Mobilemenu";
import { Home } from "./components/sections/Home";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import { Contact } from "./components/sections/Contact";

import { AiDesign } from "./pages/projects/AiDesign.jsx";
import { Forskningsmetoder } from "./pages/projects/Forskningsmetoder.jsx";
import { Examensarbete } from "./pages/projects/Examensarbete.jsx";
import { Kurr } from "./pages/projects/Kurr.jsx";

function Landing() {
  return (
    <>
      <Home />
      <About />
      <Projects />
      <Contact />
    </>
  );
}

// Scrolla till #hash om den finns, annars till toppen vid route-byte
function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    // Viktigt: scrolla alltid till toppen när pathname ändras
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Fallback om LoadingScreen inte hinner trigga
  useEffect(() => {
    const failSafe = setTimeout(() => setIsLoaded(true), 2000);
    return () => clearTimeout(failSafe);
  }, []);

  // Förhindra att browsern återställer scroll-position
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}

      <div
        className={`min-h-screen transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } bg-[#0b0e14] text-gray-100`}
      >
        <BrowserRouter>
          <ScrollToHash />

          <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

          {menuOpen && (
            <MobileMenu
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
            />
          )}

          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/projects/examensarbete"
              element={<Examensarbete />}
            />
            <Route path="/projects/kurr" element={<Kurr />} />
            <Route
              path="/projects/forskningsmetoder"
              element={<Forskningsmetoder />}
            />
            <Route
              path="/projects/ai-och-design"
              element={<AiDesign />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
