import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

// A "View" circle that follows the mouse while it is over a project card.
export default function Cursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 300, damping: 28 })
  const sy = useSpring(y, { stiffness: 300, damping: 28 })
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!matchMedia('(hover:hover) and (min-width:769px)').matches) return
    const move = (e) => {
      x.set(e.clientX - 40)
      y.set(e.clientY - 40)
      setShow(!!e.target.closest?.('.vc'))
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])

  return (
    <motion.div
      className="cursor"
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      animate={{ scale: show ? 1 : 0.5, opacity: show ? 1 : 0 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
    >
      View
    </motion.div>
  )
}
