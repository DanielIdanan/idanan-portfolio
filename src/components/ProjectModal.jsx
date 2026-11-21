import { useContext, useEffect } from 'react'
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
    <div className="pm fixed inset-0 z-80 grid place-items-center overflow-y-auto bg-[rgba(11,11,11,.72)] p-5 backdrop-blur-[6px]" role="dialog" aria-modal="true" aria-label={project.title} onClick={onClose} data-lenis-prevent>
      <div className="pm-card relative grid max-h-[calc(100dvh-2.5rem)] w-[min(56rem,100%)] overflow-y-auto rounded-lg border border-line bg-surface dark:bg-surface-2" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-3 right-3 z-2 size-11 rounded-full border border-line-strong bg-[rgba(11,11,11,.75)] text-base text-fg hover:border-accent hover:text-accent dark:bg-[oklch(.3_0_0/.85)]" onClick={onClose} aria-label="Close project" autoFocus>✕</button>
        <div className="grid content-start gap-4 p-6 sm:p-8 md:p-10">
          <p className="lab pr-12">{project.category}</p>
          <h3 className="text-4xl leading-[1.05] font-semibold tracking-[-.01em]">{project.title}</h3>
          <p className="max-w-[46ch] leading-[1.65] text-muted">{project.description}</p>
          <div className="flex flex-wrap items-center gap-4"><span className="lab">{project.tag}</span><b>{project.status}</b></div>
          {project.url ? (
            <a className="btn mt-2 w-full justify-center sm:w-auto sm:justify-self-start" href={project.url} target="_blank" rel="noopener noreferrer">Demo ↗</a>
          ) : (
            <a className="btn mt-2 w-full justify-center sm:w-auto sm:justify-self-start" href="#" onClick={(e) => e.preventDefault()} title="Demo link coming soon">Demo ↗</a>
          )}
        </div>
      </div>
    </div>
  )
}
