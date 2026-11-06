import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { motion } from 'motion/react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

let lenis = null

export default function Layout() {
  const { pathname } = useLocation()

  // Smooth scrolling (skipped when the visitor prefers reduced motion).
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    lenis = new Lenis({ autoRaf: true })
    return () => {
      lenis.destroy()
      lenis = null
    }
  }, [])

  // Start each page at the top.
  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="shell">
      <Header />
      <motion.main
        key={pathname}
        id="main"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  )
}
