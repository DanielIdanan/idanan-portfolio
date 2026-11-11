import { useEffect, useState } from 'react'
import { H_PATH } from './Logo.jsx'

// Timeline (ms). The CSS (.ld-* in index.css) draws the h and drops the dot for the first 2.3s. At 2300
// the dot hops in place (HOP ms per hop) until the page has finished loading, then it swells into an ink
// flood that fades away to reveal the page.
const HOP_START = 2300
const HOP = 800
const AFTER_GO = 1050 // flood + fade-out, matches .go rules in index.css

export default function Preloader({ onDone }) {
  const [gone, setGone] = useState(false)
  const [go, setGo] = useState(false)

  useEffect(() => {
    const t0 = performance.now()
    const timers = []
    const at = (ms, fn) => timers.push(setTimeout(fn, Math.max(0, ms - (performance.now() - t0))))
    const tick = (n) => {
      if (document.readyState === 'complete') {
        setGo(true)
        timers.push(setTimeout(() => { setGone(true); onDone() }, AFTER_GO))
      } else {
        at(HOP_START + (n + 1) * HOP, () => tick(n + 1))
      }
    }
    at(HOP_START, () => tick(0))
    return () => timers.forEach(clearTimeout)
  }, [onDone])

  if (gone) return null
  return (
    <div id="pre" className={go ? 'go' : undefined} role="status" aria-label="Loading">
      <svg className="ld-mark" viewBox="40 8 176 240" aria-hidden="true">
        <path className="ld-line" d={H_PATH} pathLength="1" />
        <path className="ld-h" d={H_PATH} />
        <g className="ld-drop"><g className="ld-squash"><circle className="ld-dot" cx="176" cy="48" r="24" /></g></g>
      </svg>
      <span className="ld-cap" aria-hidden="true">Daniel Idanan</span>
    </div>
  )
}
