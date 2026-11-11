import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap.js";

const COLORS = ["#ff3b30", "#5ac8fa", "#ffd60a", "#30d158", "#bf5af2", "#ff9f0a", "#64d2ff", "#ff6482", "#ffffff"];
const rand = (a, b) => a + Math.random() * (b - a);

// A swarm of little multiplayer-style cursors that wander across the page (GSAP).
// Every so often one of them flies over to wherever your real mouse is.
export default function CursorSwarm() {
  const root = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const cursors = gsap.utils.toArray(".swarm-cursor");
      const vw = () => window.innerWidth;
      const vh = () => window.innerHeight;

      const wander = (el) => {
        gsap.to(el, {
          x: rand(0, vw() - 20),
          y: rand(0, vh() - 20),
          rotation: rand(-35, 35),
          duration: rand(2.5, 5.5),
          ease: "power2.inOut",
          onComplete: () => wander(el),
        });
      };

      cursors.forEach((el) => {
        gsap.set(el, { x: rand(0, vw()), y: rand(0, vh()), opacity: 0, scale: 0.6 });
        gsap.to(el, { opacity: 0.9, scale: 1, duration: 0.8, delay: rand(0.2, 1.4) });
        wander(el);
      });

      let last = 0;
      const onMove = (e) => {
        const now = performance.now();
        if (now - last < 700) return;
        last = now;
        const el = gsap.utils.random(cursors);
        gsap.to(el, {
          x: e.clientX + rand(-40, 40),
          y: e.clientY + rand(-40, 40),
          duration: 1.1,
          ease: "power3.out",
          overwrite: true,
          onComplete: () => wander(el),
        });
      };
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="swarm" ref={root} aria-hidden="true">
      {COLORS.map((c) => (
        <svg key={c} className="swarm-cursor" width="18" height="18" viewBox="0 0 24 24">
          <path d="M3 2l17 8-7 2-3 8z" fill={c} stroke="#0a0a0b" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      ))}
    </div>
  );
}
