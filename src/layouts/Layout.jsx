import { useCallback, useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Preloader from '../components/Preloader.jsx'

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Layout() {
  const { pathname } = useLocation()
  const lenis = useRef(null)

  // Smooth scroll; locked until the preloader finishes.
  useEffect(() => {
    if (reduce) return
    const l = new Lenis({ autoRaf: true })
    l.stop()
    lenis.current = l
    return () => { l.destroy(); lenis.current = null }
  }, [])

  useEffect(() => {
    if (lenis.current) lenis.current.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname])

  const unlock = useCallback(() => lenis.current?.start(), [])

  return (
    <>
      {!reduce && <Preloader onDone={unlock} />}
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
