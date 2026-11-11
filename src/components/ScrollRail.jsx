import { useEffect, useRef } from 'react'

// Scroll progress as a thin rail on the right edge. The logo's dot rides down it and leaves an ink trail,
// so the one brand detail doubles as the "how far am I" indicator.
export default function ScrollRail() {
  const root = useRef(null), fill = useRef(null), dot = useRef(null)

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight
      const p = max > 8 ? Math.min(1, Math.max(0, scrollY / max)) : 0
      fill.current.style.transform = `scaleY(${p})`
      dot.current.style.top = p * 100 + '%'
      root.current.classList.toggle('off', max <= 8)
    }
    update()
    addEventListener('scroll', update, { passive: true })
    addEventListener('resize', update)
    const ro = new ResizeObserver(update) // page height changes on every route
    ro.observe(document.body)
    return () => { removeEventListener('scroll', update); removeEventListener('resize', update); ro.disconnect() }
  }, [])

  return (
    <div className="rail off" ref={root} aria-hidden="true">
      <span className="rail__fill" ref={fill} />
      <span className="rail__dot" ref={dot} />
    </div>
  )
}
