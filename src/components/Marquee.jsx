import { useContext, useEffect, useRef } from 'react'
import { Ctx } from '../lib/ctx.js'

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Loops forever; speeds up and skews with scroll velocity, then settles.
export default function Marquee({ words }) {
  const ref = useRef(null)
  const { lenis } = useContext(Ctx)

  useEffect(() => {
    if (reduce) return
    const el = ref.current
    let x = 0, skew = 0, last = performance.now(), raf
    const tick = (t) => {
      const dt = Math.min((t - last) / 1000, 0.05)
      last = t
      const half = el.scrollWidth / 2
      const v = lenis.current?.velocity || 0
      x -= (half / 22) * (1 + Math.min(Math.abs(v), 40) * 0.12) * dt
      if (x <= -half) x += half
      skew += (Math.max(-8, Math.min(8, v * 0.35)) - skew) * Math.min(dt * 8, 1)
      el.style.transform = `translate3d(${x}px,0,0) skewX(${-skew}deg)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [lenis])

  return (
    <section className="mq" aria-label="What drives me">
      <div className="track d" ref={ref}>
        {[...words, ...words].map((w, i) => <span key={i}>{w}</span>)}
      </div>
    </section>
  )
}
