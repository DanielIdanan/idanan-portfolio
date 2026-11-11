import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { reduce } from '../lib/motion.js'


// Same effect as the "PORTFOLIO" title in portfolio (1): every letter slides up out of a mask with a small tilt (GSAP).
// `at` = seconds since page load to start.
export default function SplitGsap({ text, className = '', at = 0, stagger = 0.05 }) {
  const root = useRef(null)

  useEffect(() => {
    const chars = root.current.querySelectorAll('.u')
    if (reduce) { gsap.set(chars, { opacity: 1 }); return }
    const tw = gsap.fromTo(
      chars,
      { yPercent: 115, rotate: 5, opacity: 1 },
      { yPercent: 0, rotate: 0, opacity: 1, duration: 0.9, ease: 'power4.out', stagger, delay: Math.max(0, at - performance.now() / 1000) },
    )
    return () => tw.kill()
  }, [at, stagger, text])

  return (
    <span ref={root} className={'gs ' + className} aria-label={text}>
      {[...text].map((ch, i) => (
        <span className="m" key={i} aria-hidden="true"><span className="u">{ch}</span></span>
      ))}
    </span>
  )
}
