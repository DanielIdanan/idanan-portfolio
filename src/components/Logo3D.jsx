import { useContext, useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Ctx } from '../lib/ctx.js'
import { reduce } from '../lib/motion.js'
import { H_PATH } from './Logo.jsx'

// A 3D version of the logo with no extra libraries: the flat mark is stacked as thin layers along Z
// (an extrusion), tilted, then gently swayed and nudged by the mouse.
const LAYERS = 40 // more = smoother sides, but more DOM
const DEPTH = 64 // how thick the logo is, in px

export default function Logo3D() {
  const wrap = useRef(null)
  const tilt = useRef(null)
  const sway = useRef(null)
  const { whenReady } = useContext(Ctx)

  // intro: fade + scale in once the page transition is done
  useLayoutEffect(() => {
    if (reduce) return
    const el = wrap.current
    gsap.set(el, { opacity: 0, scale: 0.85 })
    let tw
    const cancel = whenReady(() => {
      tw = gsap.to(el, { opacity: 1, scale: 1, duration: 0.9, delay: 0.2, ease: 'power3.out', clearProps: 'opacity,transform' })
    })
    return () => { cancel(); tw?.kill(); gsap.set(el, { clearProps: 'opacity,transform' }) }
  }, [whenReady])

  // idle sway + mouse follow
  useEffect(() => {
    if (reduce) return
    const idle = gsap.to(sway.current, { rotateY: 14, rotateX: -5, duration: 3.6, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    const rx = gsap.quickTo(tilt.current, 'rotateX', { duration: 0.9, ease: 'power3.out' })
    const ry = gsap.quickTo(tilt.current, 'rotateY', { duration: 0.9, ease: 'power3.out' })
    const move = (e) => {
      const r = wrap.current.getBoundingClientRect()
      const nx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / window.innerWidth * 2))
      const ny = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / window.innerHeight * 2))
      ry(nx * 16)
      rx(-ny * 12)
    }
    window.addEventListener('pointermove', move)
    return () => { window.removeEventListener('pointermove', move); idle.kill() }
  }, [])

  return (
    <div className="l3" ref={wrap} role="img" aria-label="3D model of the logo">
      <div className="l3-shadow" />
      <div className="l3-tilt" ref={tilt}>
        <div className="l3-sway" ref={sway}>
          <div className="l3-stage">
            {Array.from({ length: LAYERS }, (_, i) => {
              const t = i / (LAYERS - 1) // 0 = back, 1 = front
              const z = (t - 0.5) * DEPTH
              const p = Math.round(34 + 66 * t * t) // sides are darker, the front face is full colour
              return (
                <svg
                  key={i}
                  className="l3-layer"
                  viewBox="52 20 152 216"
                  aria-hidden="true"
                  style={{ transform: `translate(-50%,-50%) translateZ(${z}px)` }}
                >
                  <path d={H_PATH} style={{ fill: `color-mix(in srgb, var(--fg) ${p}%, var(--bg))` }} />
                  <circle cx="176" cy="48" r="24" style={{ fill: `color-mix(in srgb, var(--pop, #ff4b1f) ${p}%, #000)` }} />
                </svg>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
