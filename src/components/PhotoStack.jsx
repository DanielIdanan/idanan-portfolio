import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { reduce } from '../lib/motion.js'
import shades from '../assets/me-shades.webp'
import laptop from '../assets/me-laptop.webp'
import chill from '../assets/me-chill.webp'

const EASE = [0.22, 1, 0.36, 1]
const PHOTOS = [
  { src: shades, alt: 'Daniel in sunglasses, leaning on a chair' },
  { src: laptop, alt: 'Daniel working on his laptop' },
  { src: chill, alt: 'Daniel resting his cheek on his hand' },
]

// Profile photos with the background removed. Swaps every few seconds; tap the photo or a dot to change it yourself.
export default function PhotoStack() {
  const [i, setI] = useState(0)

  useEffect(() => {
    if (reduce) return
    const t = setTimeout(() => setI((v) => (v + 1) % PHOTOS.length), 3800)
    return () => clearTimeout(t)
  }, [i])

  const p = PHOTOS[i]
  return (
    <div className="pstack" onClick={() => setI((v) => (v + 1) % PHOTOS.length)}>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.img
          key={i} className="pimg" src={p.src} alt={p.alt} draggable="false"
          initial={{ y: '10%', opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
          animate={{ y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.75, ease: EASE }}
        />
      </AnimatePresence>
      <div className="pdots">
        {PHOTOS.map((_, n) => (
          <button key={n} className={n === i ? 'on' : ''} aria-label={`Show photo ${n + 1}`} onClick={(e) => { e.stopPropagation(); setI(n) }} />
        ))}
      </div>
    </div>
  )
}
