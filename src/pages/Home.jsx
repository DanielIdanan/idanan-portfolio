import Split from '../components/Split.jsx'
import Reveal from '../components/Reveal.jsx'
import Liquid from '../components/Liquid.jsx'
import Counter from '../components/Counter.jsx'
import cutout from '../assets/cutout.webp'
import { marquee } from '../data/about.js'
import { projects } from '../data/projects.js'
import { totalSkills, languageCount } from '../data/skills.js'

const roles = ['IT Student', 'Developer', 'Hardware', 'Networking']
const name = ['Daniel', 'Idanan']

export default function Home() {
  return (
    <>
      <section id="top">
        <div className="hrow">
          <h2 className="roles d">
            {roles.map((r, i) => <Split key={r} className="ln" mode="line" text={r} at={2700 + i * 80} />)}
          </h2>
          <Reveal as="p" className="hdesc" y={16} t=".52s" at={2900}>
            Hi, I'm an IT Student &amp; Tech Enthusiast. I am a third-year Bachelor of Science in
            Information Technology student at Gordon College in Olongapo City. Merging a passion for
            technology with creative problem-solving, I specialize in hands-on hardware and
            networking projects. Explore my work below!
          </Reveal>
        </div>
        <div className="hport">
          <Liquid bare max={30} src={cutout} alt="Portrait of Daniel D. Idanan" />
        </div>
        <div className="hgrad" />
        <h1 className="name d" aria-label="Daniel Idanan">
          {name.map((n, i) => <Split key={n} className="ln" mode="l" step={52} text={n} at={2500 + i * 240} />)}
        </h1>
        <Reveal className="cue" at={3400}>Scroll to enter</Reveal>
      </section>

      <section className="mq" aria-label="What drives me">
        <div className="track d">
          {[...marquee, ...marquee].map((w, i) => <span key={i}>{w}</span>)}
        </div>
      </section>

      <section className="pad">
        <div className="eb">By The Numbers</div>
        <Split as="h2" className="d h2" style={{ marginTop: '1.5rem' }} text="Measured so far." step={60} />
        <dl className="st-l">
          {[
            [projects.length, '', 'Projects shown here'],
            [totalSkills, '', 'Tools and technologies'],
            [languageCount, '', 'Programming languages'],
            [3, 'rd', 'Year, BSIT at Gordon College'],
          ].map(([end, suffix, label], i) => (
            <Reveal key={label} className="st" delay={i * 110} t=".56s">
              <dd className="d"><Counter end={end} />{suffix}</dd>
              <dt>{label}</dt>
            </Reveal>
          ))}
        </dl>
      </section>
    </>
  )
}
