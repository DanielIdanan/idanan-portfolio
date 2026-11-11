import { useCallback, useEffect, useRef, useState } from 'react'
import shades from '../assets/me-shades.webp'
import laptop from '../assets/me-laptop.webp'
import chill from '../assets/me-chill.webp'

const shots = [
  { src: shades, name: 'shades', alt: 'Daniel wearing shades' },
  { src: laptop, name: 'laptop', alt: 'Daniel working on his laptop' },
  { src: chill, name: 'chill', alt: 'Daniel relaxing' },
]
const EVERY = 3600

// Photos rotate on their own; click or tap (or Enter/Space) skips to the next one.
export default function PhotoSwap() {
  const [i, setI] = useState(0)
  const cur = useRef(0)
  const timer = useRef(null)

  const go = useCallback((n) => { cur.current = n; setI(n) }, [])

  const start = useCallback(() => {
    clearInterval(timer.current)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    timer.current = setInterval(() => go((cur.current + 1) % shots.length), EVERY)
  }, [go])

  useEffect(() => {
    start()
    return () => clearInterval(timer.current)
  }, [start])

  const next = () => { go((cur.current + 1) % shots.length); start() }
  const pause = () => clearInterval(timer.current)

  return (
    <figure className="ps">
      <button type="button" className="ps-b" onClick={next} onMouseEnter={pause} onMouseLeave={start} onFocus={pause} onBlur={start} aria-label="Next photo">
        {shots.map((s, k) => (
          <img key={s.name} src={s.src} alt={s.alt} className={k === i ? 'on' : ''} aria-hidden={k !== i} />
        ))}
      </button>
      <figcaption className="ps-c">
        <span>0{i + 1} / 0{shots.length}</span>
        <span className="ps-n">{shots[i].name}</span>
        <span className="ps-d" aria-hidden="true">
          {shots.map((s, k) => <i key={s.name} className={k === i ? 'on' : ''} />)}
        </span>
      </figcaption>
    </figure>
  )
}
