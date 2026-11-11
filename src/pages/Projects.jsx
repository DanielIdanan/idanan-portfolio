import { useState } from 'react'
import ProjectModal from '../components/ProjectModal.jsx'
import ProjectShot from '../components/ProjectShot.jsx'
import Split from '../components/Split.jsx'
import Reveal from '../components/Reveal.jsx'
import { projects } from '../data/projects.js'

// One case per row; the image and the text swap sides down the page.
export default function Projects() {
  const [open, setOpen] = useState(null)
  return (
    <section className="pad pt-top">
      <div className="vh">
        <div>
          <Split className="d" style={{ maxWidth: '14ch', lineHeight: 0.95 }} text="Projects." />
        </div>
        <p className="lab">0{projects.length} / Projects</p>
      </div>
      <ul className="pjs">
        {projects.map((p, i) => (
          <Reveal as="li" key={p.title} className="pj" y={50} t=".7s">
            <button className="pj-img" onClick={() => setOpen(p)} aria-label={`Open ${p.title}`}>
              <ProjectShot project={p} />
            </button>
            <div className="pj-t">
              <p className="lab">0{i + 1} / {p.tag}</p>
              <h3>{p.title}</h3>
              <p className="pj-d">{p.description}</p>
              <p className="pj-m">{p.category} · {p.status}</p>
              <button className="pj-go" onClick={() => setOpen(p)}>Open project <span aria-hidden="true">↗</span></button>
            </div>
          </Reveal>
        ))}
      </ul>
      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </section>
  )
}
