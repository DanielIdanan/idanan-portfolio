import { motion, useScroll, useSpring } from 'motion/react'

// Thin bar at the top of the page that fills as you scroll (Motion spring).
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 })
  return <motion.div className="progress" style={{ scaleX }} aria-hidden="true" />
}
