import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Liquid from './Liquid.jsx'
import { reduce as rm } from '../lib/motion.js'

// Screenshot drifts slowly inside its frame while you scroll.
export default function ProjectImage({ src, alt }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])
  return (
    <div ref={ref} className="pxf">
      <motion.div style={rm ? undefined : { y, scale: 1.18 }} className="pxi">
        <Liquid shift max={28} src={src} alt={alt} style={{ borderRadius: 0, background: 'var(--surface)' }} />
      </motion.div>
    </div>
  )
}
