import { useSyncExternalStore } from 'react'
import { reduce } from './motion.js'

// Dark mode. One shared switch: the nav button and the hero photo both call toggleDark().
// It sets data-dark on <html> (the palette lives in index.css) and remembers the choice.
const KEY = 'dark'
let on = false
try { on = localStorage.getItem(KEY) === '1' } catch { /* storage blocked: start with it off */ }
const subs = new Set()

function apply() {
  document.documentElement.toggleAttribute('data-dark', on)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', on ? '#0b0b0b' : '#d9d9d9')
}
apply()

export const useDark = () => useSyncExternalStore(
  (cb) => { subs.add(cb); return () => subs.delete(cb) },
  () => on,
)

// Pass the click/keyboard event: the dark theme spreads out as a circle from that point.
export function toggleDark(e) {
  const next = !on
  const set = () => {
    on = next
    try { localStorage.setItem(KEY, next ? '1' : '0') } catch { /* ignore */ }
    apply()
    subs.forEach((f) => f())
  }
  if (reduce || !document.startViewTransition) { set(); return }

  let x = e?.clientX, y = e?.clientY
  if (!x && !y && e?.currentTarget) {           // keyboard press: spread from the middle of the control
    const r = e.currentTarget.getBoundingClientRect()
    x = r.left + r.width / 2; y = r.top + r.height / 2
  }
  x ??= innerWidth / 2; y ??= innerHeight / 2
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

  const t = document.startViewTransition(set)
  t.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
      { duration: 800, easing: 'cubic-bezier(.16,1,.3,1)', pseudoElement: '::view-transition-new(root)' },
    )
  }).catch(() => {})
}
