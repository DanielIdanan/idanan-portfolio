import { useState } from 'react'
import Split from '../components/Split.jsx'
import Reveal from '../components/Reveal.jsx'
import Liquid from '../components/Liquid.jsx'
import photo from '../assets/photo.webp'
import { bio, ojt } from '../data/about.js'
import { skillGroups } from '../data/skills.js'

function Skills() {
  const [active, setActive] = useState(0)
  const g = skillGroups[active]
  return (
    <section className="pad">
      <div className="eb">Skills</div>
      <Split as="h2" className="d h2" style={{ marginTop: '1.5rem' }} text="What I work with." step={60} />
      <div className="vo">
        <ul>
          {skillGroups.map((s, i) => (
            <li key={s.label}>
              <button
                className={'vb' + (i === active ? ' a' : '')}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <span className="i">0{i + 1}</span>
                <span>
                  <span className="nn">{s.label}</span>
                  <small>{s.items.length} skills</small>
                </span>
                <span className="rl" />
              </button>
            </li>
          ))}
        </ul>
        <div className="fp">
          <blockquote>
            <Split key={active} as="p" className="q" text={g.items.join(', ')} step={22} />
            <footer>{g.label}</footer>
          </blockquote>
          <Reveal className="fpw" sc="1.06" t=".64s">
            <Liquid max={22} src={photo} alt="Daniel D. Idanan" style={{ aspectRatio: '4/5', borderRadius: '.125rem', background: 'var(--surface)' }} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default function About() {
  return (
    <>
      <section className="pad story" style={{ paddingTop: '12rem' }}>
        <div className="grid">
          <div>
            <div className="eb">About Me</div>
            <Split as="h2" className="d" text="Hands-on problem solving." step={60} />
            <Reveal as="p" className="lead">{bio[0]}</Reveal>
            <Reveal as="p" className="lead" delay={90}>{bio[1]}</Reveal>
          </div>
          <div>
            <div className="eb" style={{ marginBottom: '1.5rem' }}>OJT at the City Assessor's Office</div>
            <ul>
              {ojt.map(([title, text], i) => (
                <Reveal as="li" className="pr" key={title} delay={i * 90} t=".56s">
                  <span className="n">0{i + 1}</span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <Skills />
    </>
  )
}
