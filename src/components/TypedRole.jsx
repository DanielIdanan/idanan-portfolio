import { useEffect, useRef } from 'react'
import Typed from 'typed.js'
import { reduce } from '../lib/motion.js'


// Rotating typewriter line (Typed.js). Starts `at` ms after page load.
export default function TypedRole({ strings, at = 0 }) {
  const el = useRef(null)

  useEffect(() => {
    if (reduce) return
    const typed = new Typed(el.current, {
      strings,
      typeSpeed: 55,
      backSpeed: 28,
      backDelay: 1500,
      startDelay: Math.max(0, at - performance.now()),
      loop: true,
      smartBackspace: true,
    })
    return () => typed.destroy()
  }, [strings, at])

  return (
    <span className="typed" aria-label={strings.join(', ')}>
      <span ref={el} aria-hidden="true">{reduce ? strings[0] : null}</span>
    </span>
  )
}
