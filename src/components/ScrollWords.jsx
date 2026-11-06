import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'

function Word({ w, p, i, n }) {
  const opacity = useTransform(p, [i / n, (i + 1) / n], [0.22, 1])
  return <motion.span style={{ opacity }}>{w} </motion.span>
}

// Words brighten one by one as the paragraph scrolls through the viewport.
export default function ScrollWords({ text, className = 'lead' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] })
  const rm = useReducedMotion()
  const words = text.split(' ')
  return (
    <p ref={ref} className={className + ' sw'} aria-label={text}>
      {words.map((w, i) => rm ? <span key={i}>{w} </span> : <Word key={i} w={w} p={scrollYProgress} i={i} n={words.length} />)}
    </p>
  )
}
