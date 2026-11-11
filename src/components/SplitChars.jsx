import { useLayoutEffect, useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap.js";

// Splits text into characters and slides them up from a mask (GSAP).
// play: start when true. scroll: start when scrolled into view instead.
export default function SplitChars({ text, as: Tag = "span", className = "", play = true, scroll = false, delay = 0 }) {
  const root = useRef(null);
  const tween = useRef(null);

  useLayoutEffect(() => {
    gsap.set(root.current.querySelectorAll(".char"), { yPercent: 115, rotate: 5 });
  }, [text]);

  useEffect(() => {
    if (!play) return;
    const chars = root.current.querySelectorAll(".char");
    const vars = { yPercent: 0, rotate: 0, duration: 0.9, ease: "power4.out", stagger: 0.035, delay };
    if (scroll) {
      tween.current = gsap.to(chars, {
        ...vars,
        scrollTrigger: { trigger: root.current, start: "top 88%", once: true },
      });
    } else {
      tween.current = gsap.to(chars, vars);
    }
    return () => {
      tween.current?.scrollTrigger?.kill();
      tween.current?.kill();
    };
  }, [play, scroll, delay, text]);

  return (
    <Tag className={className} ref={root} aria-label={text}>
      {text.split(" ").map((word, wi, arr) => (
        <span key={wi} className="word" aria-hidden="true">
          {word.split("").map((ch, i) => (
            <span key={i} className="char-wrap">
              <span className="char">{ch}</span>
            </span>
          ))}
          {wi < arr.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}
