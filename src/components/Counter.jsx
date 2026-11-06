import { useEffect, useRef } from 'react'
import { CountUp } from 'countup.js'

// Counts up to `end` the first time it scrolls into view.
export default function Counter({ end }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      el.textContent = String(end)
      return
    }
    const counter = new CountUp(el, end, { duration: 1.6 })
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          counter.start()
          io.disconnect()
        }
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [end])

  return <span ref={ref}>0</span>
}
