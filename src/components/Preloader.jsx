import { useEffect, useRef, useState } from 'react'
import { animate } from 'motion'

// Counts 0 to 100 in 2s, fades the labels, then wipes upward and unlocks scrolling.
export default function Preloader({ onDone }) {
  const [n, setN] = useState(0)
  const [fade, setFade] = useState(false)
  const [gone, setGone] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const count = animate(0, 100, {
      duration: 2, ease: 'linear',
      onUpdate: (v) => setN(Math.round(v)),
      onComplete: () => {
        setFade(true)
        setTimeout(() => {
          animate(0, -100, {
            duration: 0.65, ease: [0.22, 1, 0.36, 1],
            onUpdate: (v) => { if (ref.current) ref.current.style.transform = `translateY(${v}%)` },
            onComplete: () => { setGone(true); onDone() },
          })
        }, 500)
      },
    })
    return () => count.stop()
  }, [onDone])

  if (gone) return null
  return (
    <div id="pre" ref={ref} className={fade ? 'fade' : ''}>
      <span className="b d l">Daniel Idanan</span>
      <span className="c d l">{n}<b>%</b></span>
    </div>
  )
}
