import { useContext, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Ctx } from '../lib/ctx.js'
import { reduce } from '../lib/motion.js'


// Glides left forever (GSAP); speeds up and skews with scroll velocity, then settles.
export default function Marquee({ words }) {
  const ref = useRef(null)
  const { lenis } = useContext(Ctx)

  useEffect(() => {
    if (reduce) return
    const el = ref.current
    const loop = gsap.to(el, { xPercent: -50, duration: 22, ease: 'none', repeat: -1 })
    const setSkew = gsap.quickSetter(el, 'skewX', 'deg')
    let skew = 0
    const tick = () => {
      const v = lenis.current?.velocity || 0
      loop.timeScale(1 + Math.min(Math.abs(v), 40) * 0.12)
      skew += (Math.max(-8, Math.min(8, v * 0.35)) - skew) * 0.12
      setSkew(-skew)
    }
    gsap.ticker.add(tick)
    return () => { gsap.ticker.remove(tick); loop.kill(); gsap.set(el, { clearProps: 'transform' }) }
  }, [lenis])

  return (
    <section className="mq" aria-label="What I work with">
      <div className="track d" ref={ref}>
        {[...words, ...words].map((w, i) => <span key={i}>{w}</span>)}
      </div>
    </section>
  )
}
