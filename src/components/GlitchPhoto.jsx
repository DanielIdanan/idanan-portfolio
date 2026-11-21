import { useCallback, useEffect, useRef, useState } from 'react'
import a1 from '../assets/about-1.webp'
import a2 from '../assets/about-2.webp'
import a3 from '../assets/about-3.webp'
import a4 from '../assets/about-4.webp'

const shots = [
  { src: a1, alt: 'Daniel in shades at a cafe' },
  { src: a2, alt: 'Daniel working on his laptop' },
  { src: a3, alt: 'Daniel in shades, resting his chin on his hand' },
  { src: a4, alt: 'Daniel on his phone in an armchair' },
]
const calm = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const W = 900, H = 1200
const HOLD = 2800 // ms each photo stays
const GLITCH = 800 // ms the pixelate transition takes
const STEP = 60 // ms between block-size steps, so it ticks like a retro game

// Draws image `im` covering the canvas, optionally shifted sideways and brightened.
function cover(g, im, x, y, w, h, dx = 0, bright = 1) {
  const s = Math.max(W / im.width, H / im.height)
  const sw = w / s, sh = h / s
  const sx = (im.width - W / s) / 2 + x / s, sy = (im.height - H / s) / 2 + y / s
  g.filter = bright === 1 ? 'none' : `brightness(${bright}) contrast(1.25)`
  g.drawImage(im, sx, sy, sw, sh, x + dx, y, w, h)
}

// One frame of the pixelate: the old photo breaks into bigger and bigger blocks, then the new one
// resolves from big blocks back to sharp. `p` goes 0 -> 1; the swap happens at 0.5, at the coarsest size.
const SIZES = [1, 6, 14, 28, 48, 80]
function pixelFrame(g, from, to, p) {
  const q = p < 0.5 ? p * 2 : (1 - p) * 2
  const b = SIZES[Math.round(q * (SIZES.length - 1))]
  g.filter = 'none'
  g.imageSmoothingEnabled = true
  cover(g, p < 0.5 ? from : to, 0, 0, W, H)
  if (b === 1) return
  const w = Math.ceil(W / b), h = Math.ceil(H / b)
  const c = g.canvas
  g.drawImage(c, 0, 0, W, H, 0, 0, w, h)
  g.imageSmoothingEnabled = false
  g.drawImage(c, 0, 0, w, h, 0, 0, w * b, h * b)
  g.imageSmoothingEnabled = true
}

// Photos hold still, then pixelate out and resolve into the next one. Click or tap skips ahead; the Pause
// button stops the slideshow for good (WCAG 2.2.2: anything that moves by itself needs a way to stop).
export default function GlitchPhoto() {
  const cv = useRef(null)
  const imgs = useRef([])
  const cur = useRef(0)
  const busy = useRef(false)
  const timer = useRef(null)
  const raf = useRef(0)
  const [i, setI] = useState(0)
  const [ready, setReady] = useState(false)
  const held = useRef(false) // the visitor pressed Pause: stays paused, whatever hover or focus does
  const [paused, setPaused] = useState(false)
  const [auto] = useState(() => !calm()) // no slideshow at all when motion is reduced

  const paint = useCallback((n) => {
    const c = cv.current
    if (!c || !imgs.current[n]) return
    const g = c.getContext('2d')
    g.filter = 'none'
    cover(g, imgs.current[n], 0, 0, W, H)
  }, [])

  const go = useCallback((to) => {
    if (busy.current || to === cur.current) return
    const from = cur.current
    const g = cv.current.getContext('2d')
    cur.current = to
    setI(to)
    if (calm()) { paint(to); return }
    busy.current = true
    const t0 = performance.now()
    let last = -STEP
    const tick = (t) => {
      const e = t - t0
      if (e >= GLITCH) { paint(to); busy.current = false; return }
      if (e - last >= STEP) { last = e; pixelFrame(g, imgs.current[from], imgs.current[to], e / GLITCH) }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
  }, [paint])

  const start = useCallback(() => {
    clearInterval(timer.current)
    if (calm() || held.current) return
    timer.current = setInterval(() => go((cur.current + 1) % shots.length), HOLD + GLITCH)
  }, [go])

  useEffect(() => {
    let dead = false
    Promise.all(shots.map((s) => new Promise((res) => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(im); im.src = s.src })))
      .then((list) => { if (dead) return; imgs.current = list; paint(0); setReady(true) })
    return () => { dead = true; clearInterval(timer.current); cancelAnimationFrame(raf.current) }
  }, [paint])

  useEffect(() => {
    if (!ready) return
    start()
    return () => clearInterval(timer.current)
  }, [ready, start])

  const next = () => { go((cur.current + 1) % shots.length); start() }
  const pause = () => clearInterval(timer.current)
  const toggle = () => {
    held.current = !held.current
    setPaused(held.current)
    if (held.current) pause(); else start()
  }

  return (
    <div>
      <button type="button" className="gp" onClick={next} onMouseEnter={pause} onMouseLeave={start} onFocus={pause} onBlur={start} aria-label="Next photo">
        <canvas ref={cv} width={W} height={H} role="img" aria-label={shots[i].alt} />
      </button>
      <div className="mt-3 flex items-center justify-between">
        <span className="lab" aria-hidden="true">{String(i + 1).padStart(2, '0')} / {String(shots.length).padStart(2, '0')}</span>
        {auto && (
          <button type="button" className="lab min-h-11 px-1 hover:text-fg" onClick={toggle} aria-pressed={paused}>
            {paused ? 'Play slideshow' : 'Pause slideshow'}
          </button>
        )}
      </div>
    </div>
  )
}
