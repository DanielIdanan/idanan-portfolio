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
const W = 900, H = 1200
const HOLD = 2800 // ms each photo stays
const GLITCH = 650 // ms the slice transition takes
const STEP = 70 // ms between re-shuffles while glitching

const rnd = (a, b) => a + Math.random() * (b - a)

// Draws image `im` covering the canvas, optionally shifted sideways and brightened.
function cover(g, im, x, y, w, h, dx = 0, bright = 1) {
  const s = Math.max(W / im.width, H / im.height)
  const sw = w / s, sh = h / s
  const sx = (im.width - W / s) / 2 + x / s, sy = (im.height - H / s) / 2 + y / s
  g.filter = bright === 1 ? 'none' : `brightness(${bright}) contrast(1.25)`
  g.drawImage(im, sx, sy, sw, sh, x + dx, y, w, h)
}

// One frame of the glitch: horizontal bands cut into blocks, each block showing the old or the new photo.
// `p` goes 0 -> 1; the share of blocks that already show the new photo grows with it.
function glitchFrame(g, from, to, p) {
  g.filter = 'none'
  cover(g, from, 0, 0, W, H)
  let y = 0
  while (y < H) {
    const h = Math.round(rnd(H * 0.02, H * 0.12))
    let x = 0
    while (x < W) {
      const w = Math.round(rnd(W * 0.22, W * 0.7))
      const useNew = Math.random() < p
      const wild = Math.random() < 0.28
      if (useNew || wild) {
        g.save()
        g.beginPath(); g.rect(x, y, Math.min(w, W - x), h); g.clip()
        const src = useNew ? to : from
        cover(g, src, 0, 0, W, H, wild ? rnd(-W * 0.12, W * 0.12) : 0, wild ? (Math.random() < 0.5 ? 0.35 : 1.9) : 1)
        g.restore()
      }
      x += w
    }
    y += h
  }
  g.filter = 'none'
}

// Photos hold still, then break into sliced blocks and re-form as the next one. Click or tap skips ahead.
export default function GlitchPhoto() {
  const cv = useRef(null)
  const imgs = useRef([])
  const cur = useRef(0)
  const busy = useRef(false)
  const timer = useRef(null)
  const raf = useRef(0)
  const [i, setI] = useState(0)
  const [ready, setReady] = useState(false)

  const paint = useCallback((n) => {
    const c = cv.current
    if (!c || !imgs.current[n]) return
    const g = c.getContext('2d')
    g.filter = 'none'
    cover(g, imgs.current[n], 0, 0, W, H)
  }, [])

  const calm = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

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
      if (e - last >= STEP) { last = e; glitchFrame(g, imgs.current[from], imgs.current[to], Math.min(1, (e / GLITCH) ** 1.3 + 0.05)) }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
  }, [paint])

  const start = useCallback(() => {
    clearInterval(timer.current)
    if (calm()) return
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

  return (
    <button type="button" className="gp" onClick={next} onMouseEnter={pause} onMouseLeave={start} onFocus={pause} onBlur={start} aria-label="Next photo">
      <canvas ref={cv} width={W} height={H} role="img" aria-label={shots[i].alt} />
    </button>
  )
}
