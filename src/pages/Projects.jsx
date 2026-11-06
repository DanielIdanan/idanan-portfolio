import Split from '../components/Split.jsx'
import Reveal from '../components/Reveal.jsx'
import Liquid from '../components/Liquid.jsx'
import { projects } from '../data/projects.js'

export default function Projects() {
  return (
    <section className="pad" style={{ paddingTop: '12rem' }}>
      <div className="vh">
        <div>
          <div className="eb">Selected Projects</div>
          <Split as="h2" className="d" style={{ marginTop: '1.5rem', maxWidth: '14ch', lineHeight: 0.95 }} text="What I've built." step={60} />
        </div>
        <p className="lab">0{projects.length} / Projects</p>
      </div>
      <ul className="vl">
        {projects.map((p, i) => (
          <Reveal as="li" className="vc" key={p.title} y={60} t=".62s" delay={(i % 2) * 120}>
            <article>
              <Liquid max={28} src={p.image} alt={p.alt} style={{ aspectRatio: '16/11', borderRadius: '.125rem', background: 'var(--surface)' }} />
              <div className="vr">
                <div className="vn"><h3>{p.title}</h3><p>{p.description}</p></div>
                <div className="vy"><span className="lab">{p.tag}</span><b>{p.status}</b></div>
              </div>
              <p className="vcat">{p.category}</p>
            </article>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
