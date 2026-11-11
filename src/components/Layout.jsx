import { useState, useCallback } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import SmoothScroll from "./SmoothScroll.jsx";
import ScrollProgress from "./ScrollProgress.jsx";
import ParticlesBg from "./ParticlesBg.jsx";
import CursorSwarm from "./CursorSwarm.jsx";
import Intro from "./Intro.jsx";
import { IntroContext } from "../context/IntroContext.jsx";
import { prefersReducedMotion } from "../lib/gsap.js";

// The intro only plays when the site is first opened on the home page.
const shouldPlayIntro = () => window.location.pathname === "/" && !prefersReducedMotion();

export default function Layout() {
  const { pathname } = useLocation();
  const outlet = useOutlet();
  const [introDone, setIntroDone] = useState(() => !shouldPlayIntro());
  const finishIntro = useCallback(() => setIntroDone(true), []);

  return (
    <IntroContext.Provider value={introDone}>
      <SmoothScroll />
      <ParticlesBg />
      <CursorSwarm />
      <ScrollProgress />
      {!introDone && <Intro onDone={finishIntro} />}

      <div className="layout">
        <Header />
        <main className="main">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {outlet}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </IntroContext.Provider>
  );
}
