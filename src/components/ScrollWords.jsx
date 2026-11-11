import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { reduce as rm } from '../lib/motion.js'

function Word({ w, p, a, b, i, n }) {
  const opacity = useTransform(p, [a + ((b - a) * i) / n, a + ((b - a) * (i + 1)) / n], [0.22, 1])
  return <motion.span style={{ opacity }}>{w} </motion.span>
}

// Words brighten one by one. By default it follows the paragraph through the viewport; pass `progress`
// (a scroll MotionValue) and `range` [from, to] to follow a bigger scroll area instead (e.g. next to a pinned column).
export default function ScrollWords({ text, className = 'lead', progress, range = [0, 1] }) {
  const ref = useRef(null)
  const own = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] }).scrollYProgress
  const p = progress || own
  const [a, b] = progress ? range : [0, 1]
  const words = text.split(' ')
  return (
    <p ref={ref} className={className + ' sw'} aria-label={text}>
      {words.map((w, i) => rm ? <span key={i}>{w} </span> : <Word key={i} w={w} p={p} a={a} b={b} i={i} n={words.length} />)}
    </p>
  )
}
