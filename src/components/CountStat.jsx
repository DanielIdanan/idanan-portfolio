import { useEffect, useRef } from "react";
import { CountUp } from "countup.js";

// Number that counts up once it is visible (CountUp.js).
export default function CountStat({ end, suffix = "", label, play = true }) {
  const numRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    if (!play) return;
    const counter = new CountUp(numRef.current, end, { duration: 2.2, suffix, startVal: 0 });
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          counter.start();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(boxRef.current);
    return () => io.disconnect();
  }, [play, end, suffix]);

  return (
    <div className="stat" ref={boxRef}>
      <span className="stat-num" ref={numRef}>0</span>
      <span className="mono tiny">{label}</span>
    </div>
  );
}
