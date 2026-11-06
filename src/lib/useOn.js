import { useEffect, useRef, useState } from 'react'

// `at` = ms since page load to play (hero); otherwise plays once when scrolled into view.
export function useOn(at) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    if (at != null) {
      const t = setTimeout(() => setOn(true), Math.max(0, at - performance.now()))
      return () => clearTimeout(t)
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); io.disconnect() }
    })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [at])
  return [ref, on]
}
