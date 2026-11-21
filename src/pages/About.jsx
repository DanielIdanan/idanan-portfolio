import { useRef, useState } from 'react'
import Split from '../components/Split.jsx'
import Reveal from '../components/Reveal.jsx'
import { bio, ojt } from '../data/about.js'
import { skillGroups, aiTools, stageOf } from '../data/skills.js'
import { useOn } from '../lib/useOn.js'
import AiIcon from '../components/AiIcon.jsx'
import GlitchPhoto from '../components/GlitchPhoto.jsx'

function Row({ x, i }) {
  const stage = stageOf(x.level)
  return (
    <div className="ed-r" style={{ '--i': i, '--w': x.level + '%' }}>
      <span className="ed-n">{x.name}</span>
      <span className="ed-t" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={x.level} aria-valuetext={stage} aria-label={x.name}><b /></span>
      <span className="ed-s">{stage}</span>
    </div>
  )
}

function Skills() {
  const [active, setActive] = useState(0)
  const [ref, on] = useOn()
  const tabs = useRef([])
  const g = skillGroups[active]
  // Arrow keys, Home and End move between tabs (roving tabindex); nothing changes until a tab is chosen.
  const onKey = (e) => {
    const n = skillGroups.length
    const next = { ArrowRight: (active + 1) % n, ArrowLeft: (active - 1 + n) % n, Home: 0, End: n - 1 }[e.key]
    if (next == null) return
    e.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }
  return (
    <section className="px-(--gutter) py-(--section)">
      <Split className="font-sans font-bold normal-case tracking-[-.05em] leading-none text-balance text-[clamp(3.5rem,12vw,9rem)]" text="Skills & tools." />
      <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-(--gutter)">
        <div className="grid min-w-0 gap-6 lg:col-span-8">
        <div ref={ref} className={'fu ed' + (on ? ' on' : '')} style={{ '--d': '0ms', '--sc': '1.04', '--t': '.64s' }}>
          <div className="ed-bar">
            <span className="ed-dots" aria-hidden="true"><i /><i /><i /></span>
            <div className="ed-tabs" role="tablist" aria-label="Skill groups" onKeyDown={onKey}>
              {skillGroups.map((s, i) => (
                <button
                  key={s.file}
                  ref={(el) => { tabs.current[i] = el }}
                  role="tab"
                  id={'tab-' + s.file}
                  aria-selected={i === active}
                  aria-controls="skills-panel"
                  tabIndex={i === active ? 0 : -1}
                  className={'ed-tab' + (i === active ? ' a' : '')}
                  onClick={() => setActive(i)}
                >
                  {s.file}
                </button>
              ))}
            </div>
          </div>
          <div className="ed-body" role="tabpanel" id="skills-panel" aria-labelledby={'tab-' + g.file} key={active}>
            <div className="ed-hd">
              <p className="ed-c">{'// ' + g.label}</p>
              <p className="ed-avg"><span>{g.items.length}</span><small>{g.items.length === 1 ? 'skill' : 'skills'}</small></p>
            </div>
            {g.items.map((x, i) => <Row key={x.name} x={x} i={i} />)}
          </div>
          <div className="ed-foot">
            <span>{g.file}.js</span>
            <span>{g.items.length} items</span>
          </div>
        </div>
        <div className="ai">
          <p className="ed-c">{'// AI tools'}</p>
          <ul className="ai-l">
            {aiTools.map((t, i) => (
              <li key={t.name} style={{ '--i': i }}>
                <a href={t.url} target="_blank" rel="noopener noreferrer" aria-label={t.name + ' (opens in a new tab)'}>
                  <AiIcon name={t.name} />
                  <span>{t.name}</span>
                  <svg className="ai-x" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" focusable="false"><path d="M4 12L12 4M5.5 4H12v6.5" /></svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
        </div>
        <Reveal className="w-full max-w-116 lg:col-span-4 lg:justify-self-start" sc="1.06" t=".64s">
          <GlitchPhoto />
        </Reveal>
      </div>
    </section>
  )
}

export default function About() {
  return (
    <div className="about">
      <section className="story px-(--gutter) pt-26 pb-[calc(var(--section)*1.3)] md:pt-48">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-x-[calc(var(--gutter)*2.5)]">
          <div className="lg:sticky lg:top-28 lg:col-span-5">
            <Split className="font-sans font-bold normal-case tracking-[-.05em] leading-none text-balance mt-6 text-[clamp(3.25rem,8vw,6.5rem)]" text="I learn by doing." />
            <Reveal as="p" className="mt-10 max-w-[46ch] text-[clamp(1.25rem,1.6vw,1.5rem)] leading-[1.6] tracking-[-.01em] text-fg" delay={200}>{bio[0]}</Reveal>
            <Reveal as="p" className="mt-5 max-w-[46ch] text-[clamp(1.25rem,1.6vw,1.5rem)] leading-[1.6] tracking-[-.01em] text-fg" delay={300}>{bio[1]}</Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="eb mb-6">OJT at the City Assessor's Office</div>
            <ul className="ojt">
              {ojt.map(([title, text]) => (
                <Reveal as="li" className="pr relative border-t border-line py-7 last:border-b md:py-14 lg:first:pt-8" key={title} t=".56s">
                  <div>
                    <h3 className="mb-1 text-2xl leading-[1.15] font-semibold tracking-[-.02em] md:text-[1.75rem]">{title}</h3>
                    <p className="mt-4 max-w-[44ch] leading-[1.7] text-muted">{text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <Skills />
    </div>
  )
}
