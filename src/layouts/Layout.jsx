import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Lenis from 'lenis'
import { animate } from 'motion'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Preloader from '../components/Preloader.jsx'
import { Ctx } from '../lib/ctx.js'

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const EASE = [0.22, 1, 0.36, 1]

export default function Layout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const lenis = useRef(null)
  const panel = useRef(null)
  const covered = useRef(false)
  const set = (v) => { if (panel.current) panel.current.style.transform = `translateY(${v}%)` }

  // Smooth scroll; locked until the preloader finishes.
  useEffect(() => {
    if (reduce) return
    const l = new Lenis({ autoRaf: true })
    l.stop()
    lenis.current = l
    return () => { l.destroy(); lenis.current = null }
  }, [])

  // Page change: jump to top, and if the blue panel is covering the screen, sweep it away.
  useLayoutEffect(() => {
    if (lenis.current) lenis.current.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
    if (!covered.current) return
    covered.current = false
    animate(0, -100, { duration: 0.55, delay: 0.1, ease: EASE, onUpdate: set, onComplete: () => set(100) })
  }, [pathname])

  // Blue panel sweeps up to cover the page, then the route changes.
  const go = useCallback((to) => {
    if (to === pathname) return
    if (reduce) { navigate(to); return }
    covered.current = true
    animate(100, 0, { duration: 0.4, ease: EASE, onUpdate: set, onComplete: () => navigate(to) })
  }, [pathname, navigate])

  const unlock = useCallback(() => lenis.current?.start(), [])
  const ctx = useMemo(() => ({ go, lenis }), [go])

  return (
    <Ctx.Provider value={ctx}>
      {!reduce && <Preloader onDone={unlock} />}
      <div className="wipe" ref={panel} aria-hidden="true" />
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </Ctx.Provider>
  )
}
