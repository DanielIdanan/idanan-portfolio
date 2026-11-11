import { useRef } from 'react'
import { reduce } from '../lib/motion.js'

// Card with a cursor-following spotlight, glowing border and a small 3D tilt.
export default function ProjectCard({ p, index, onOpen }) {
  const ref = useRef(null)

  const move = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left, y = e.clientY - r.top
    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)
    if (!reduce) {
      el.style.setProperty('--rx', `${((y / r.height) - 0.5) * -6}deg`)
      el.style.setProperty('--ry', `${((x / r.width) - 0.5) * 8}deg`)
    }
  }
  const leave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <article
      ref={ref} className="pc" role="button" tabIndex={0} aria-label={`View ${p.title}`}
      onMouseMove={move} onMouseLeave={leave} onClick={() => onOpen(p)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onOpen(p))}
    >
      <div className="pc-in">
        <div className="pc-img">
          <img src={p.image} alt={p.alt} loading="lazy" draggable="false" />
          <span className="pc-num">0{index + 1}</span>
        </div>
        <div className="pc-body">
          <div className="pc-chips"><span>{p.tag}</span>{p.category !== p.tag && <span>{p.category}</span>}</div>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <div className="pc-foot">
            <b>{p.status}</b>
            <span className="pc-go" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
