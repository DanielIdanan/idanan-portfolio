import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Preloader from '../components/Preloader.jsx'
import PageWipe from '../components/PageWipe.jsx'
import ScrollRail from '../components/ScrollRail.jsx'
import { Ctx } from '../lib/ctx.js'
import { reduce } from '../lib/motion.js'

const EASE = 'power4.inOut' // cubic-bezier(.76,0,.24,1): slow start, fast middle, soft landing
const ARCH = 14 // how much the curtain's edge bows (% of screen height)
const TITLES = { '/': 'Daniel D. Idanan | IT Student & Developer', '/about': 'About | Daniel D. Idanan', '/projects': 'Projects | Daniel D. Idanan', '/contact': 'Contact | Daniel D. Idanan' }
gsap.registerPlugin(ScrollTrigger)

export default function Layout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const lenis = useRef(null)
  const wipe = useRef(null)
  const path = useRef(null)
  const logo = useRef(null)
  const covered = useRef(false)
  const busy = useRef(false)
  const pending = useRef(!reduce) // true while the preloader or page curtain is still running
  const queue = useRef(new Set())
  const st = useRef({ p: 0, l: 0 }) // p: curtain 0..1, l: logo opacity 0..1

  // p = 0: curtain gone, p = 1: screen fully covered. The bottom edge is an arch (centre lags on the way
  // down, leads on the way back up) that flattens out as it reaches either end.
  const draw = () => {
    if (!path.current) return
    const p = st.current.p
    const c = p * 101, a = ARCH * Math.sin(Math.PI * p)
    path.current.setAttribute('d', `M0 0H100V${c + a}Q50 ${c - a} 0 ${c + a}Z`)
    wipe.current.classList.toggle('on', p > 0)
  }
  const fade = () => {
    if (!logo.current) return
    const v = st.current.l
    logo.current.style.opacity = v
    logo.current.style.transform = `scale(${0.8 + 0.2 * v})`
  }

  const flush = useCallback(() => {
    pending.current = false
    queue.current.forEach((fn) => fn())
    queue.current.clear()
  }, [])
  const whenReady = useCallback((fn) => {
    if (!pending.current) { fn(); return () => {} }
    queue.current.add(fn)
    return () => queue.current.delete(fn)
  }, [])

  // Smooth scroll; locked until the preloader finishes.
  useEffect(() => {
    if (reduce) return
    const l = new Lenis({ autoRaf: true })
    l.on('scroll', ScrollTrigger.update)
    l.stop()
    lenis.current = l
    return () => { l.destroy(); lenis.current = null }
  }, [])

  // Page change: jump to top, and if the curtain is covering the screen, hold on the logo, then lift it.
  useLayoutEffect(() => {
    if (lenis.current) lenis.current.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
    document.title = TITLES[pathname] || TITLES['/']
    if (!covered.current) return
    covered.current = false
    gsap.to(st.current, { l: 0, duration: 0.2, delay: 0.55, ease: 'none', onUpdate: fade })
    gsap.to(st.current, { p: 0, duration: 0.7, delay: 0.7, ease: EASE, onUpdate: draw, onComplete: () => { busy.current = false; flush() } })
  }, [pathname, flush])

  // Curtain drops over the page, the logo fades in, then the route changes underneath it.
  const go = useCallback((to) => {
    if (to === pathname || busy.current) return
    if (reduce) { navigate(to); return }
    busy.current = true
    covered.current = true
    pending.current = true
    gsap.to(st.current, { l: 1, duration: 0.3, delay: 0.3, ease: 'none', onUpdate: fade })
    gsap.to(st.current, { p: 1, duration: 0.55, ease: EASE, onUpdate: draw, onComplete: () => navigate(to) })
  }, [pathname, navigate])

  const unlock = useCallback(() => { lenis.current?.start(); flush() }, [flush])
  const ctx = useMemo(() => ({ go, lenis, whenReady }), [go, whenReady])

  return (
    <Ctx.Provider value={ctx}>
      {!reduce && <Preloader onDone={unlock} />}
      <PageWipe wipeRef={wipe} pathRef={path} logoRef={logo} />
      <a className="skip" href="#main">Skip to content</a>
      <ScrollRail />
      <Header />
      <main id="main">
        <div key={pathname} className="pg">
          <Outlet />
        </div>
      </main>
      <Footer />
    </Ctx.Provider>
  )
}
