import { useEffect } from 'react'
import { reduce } from './motion.js'


// Moves an element at a fraction of the scroll speed (uses the independent `translate` property).
export function useParallax(ref, factor) {
  useEffect(() => {
    if (reduce) return
    const el = ref.current
    const on = () => { el.style.translate = `0 ${window.scrollY * factor}px` }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => { window.removeEventListener('scroll', on); el.style.translate = '' }
  }, [ref, factor])
}
