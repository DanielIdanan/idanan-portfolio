import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap.js";

// Blueprint-style wireframe that "draws" the page layout, then fades into the real page.
const BOXES = [
  { l: 30, t: 3, w: 40, h: 5, label: "NAV" },
  { l: 4, t: 14, w: 92, h: 24, label: "H1 · PORTFOLIO" },
  { l: 4, t: 43, w: 16, h: 5, label: "HELLO" },
  { l: 4, t: 50, w: 24, h: 11, label: "NAME" },
  { l: 4, t: 64, w: 38, h: 14, label: "TEXT" },
  { l: 46, t: 42, w: 22, h: 40, label: "IMG" },
  { l: 72, t: 44, w: 24, h: 34, label: "CARDS" },
];

export default function Intro({ onDone }) {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: onDone });
      tl.from(".wf-box", { scaleX: 0, transformOrigin: "left center", duration: 0.55, ease: "power3.out", stagger: 0.12 })
        .from(".wf-chip", { opacity: 0, y: 6, duration: 0.3, stagger: 0.08 }, "<0.2")
        .to({}, { duration: 0.45 })
        .to(".wf-box", { opacity: 0, duration: 0.35, stagger: 0.04 })
        .to(root.current, { opacity: 0, duration: 0.5 }, "-=0.15");
    }, root);
    return () => ctx.revert();
  }, [onDone]);

  return (
    <div className="intro" ref={root}>
      {BOXES.map((b) => (
        <div
          key={b.label}
          className="wf-box"
          style={{ left: `${b.l}%`, top: `${b.t}%`, width: `${b.w}%`, height: `${b.h}%` }}
        >
          <span className="wf-chip">{b.label}</span>
        </div>
      ))}
    </div>
  );
}
