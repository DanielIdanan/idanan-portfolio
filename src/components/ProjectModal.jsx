import { useContext, useEffect } from 'react'
import ProjectShot from './ProjectShot.jsx'
import { Ctx } from '../lib/ctx.js'

// Opens a clicked project in a big view. The Demo button only exists here; it opens the live site when a project has a `url`, otherwise it is a placeholder.
export default function ProjectModal({ project, onClose }) {
  const { lenis } = useContext(Ctx)

  useEffect(() => {
    if (!project) return
    const l = lenis.current
    l?.stop()
    const key = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', key)
    return () => { window.removeEventListener('keydown', key); l?.start() }
  }, [project, onClose, lenis])

  if (!project) return null
  return (
    <div className="pm" role="dialog" aria-modal="true" aria-label={project.title} onClick={onClose} data-lenis-prevent>
      <div className="pm-card" onClick={(e) => e.stopPropagation()}>
        <button className="pm-x" onClick={onClose} aria-label="Close project" autoFocus>✕</button>
        <div className="pm-img"><ProjectShot project={project} big /></div>
        <div className="pm-body">
          <p className="lab">{project.category}</p>
          <h3>{project.title}</h3>
          <p className="pm-desc">{project.description}</p>
          <div className="pm-meta"><span className="lab">{project.tag}</span><b>{project.status}</b></div>
          {project.url ? (
            <a className="btn pm-demo" href={project.url} target="_blank" rel="noopener noreferrer">Demo ↗</a>
          ) : (
            <a className="btn pm-demo" href="#" onClick={(e) => e.preventDefault()} title="Demo link coming soon">Demo ↗</a>
          )}
        </div>
      </div>
    </div>
  )
}
