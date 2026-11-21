import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Ctx } from '../lib/ctx.js'
import Split from '../components/Split.jsx'
import Reveal from '../components/Reveal.jsx'
import NotFound from './NotFound.jsx'
import { projects } from '../data/projects.js'

const url = (p) => import.meta.env.BASE_URL.replace(/\/$/, '') + p

// One page per project: the screenshot, the facts, and (when the data has them) the problem and what was built.
export default function Project() {
  const { slug } = useParams()
  const { go } = useContext(Ctx)
  const i = projects.findIndex((p) => p.slug === slug)
  if (i < 0) return <NotFound />
  const p = projects[i]
  const next = projects[(i + 1) % projects.length]
  const to = (path) => (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return
    e.preventDefault()
    go(path)
  }
  const facts = [
    ['Type', p.category],
    p.role && ['Role', p.role],
    ['Context', p.status],
    p.stack && ['Built with', p.stack.join(', ')],
  ].filter(Boolean)

  return (
    <article className="px-(--gutter) pt-26 pb-(--section) md:pt-48">
      <a href={url('/projects')} onClick={to('/projects')} className="lab inline-flex min-h-11 items-center hover:text-fg">← All projects</a>
      <Split as="h1" className="d mt-4 max-w-[16ch] text-[clamp(2.75rem,11vw,7.5rem)] leading-none text-balance" text={p.title} />

      <Reveal className="mt-12 block aspect-video w-full overflow-hidden bg-[#101110] md:mt-20">
        <img className={'size-full ' + (p.slug === 'sci-cal' ? 'object-contain object-center' : 'object-cover object-top')} src={p.img} alt={p.alt} decoding="async" />
      </Reveal>

      <div className="mt-12 grid gap-12 md:mt-20 lg:grid-cols-12 lg:gap-x-(--gutter)">
        <Reveal as="dl" className="grid content-start gap-6 lg:col-span-4">
          {facts.map(([k, v]) => (
            <div key={k} className="border-t border-line pt-4">
              <dt className="lab">{k}</dt>
              <dd className="mt-2 text-[1.125rem] leading-[1.4] font-semibold">{v}</dd>
            </div>
          ))}
          {p.url && <a className="btn w-full justify-center sm:w-auto sm:justify-self-start" href={p.url} target="_blank" rel="noopener noreferrer">Open the live site ↗</a>}
        </Reveal>

        <div className="grid content-start gap-14 lg:col-span-7 lg:col-start-6">
          <Reveal as="p" className="max-w-[46ch] text-[clamp(1.25rem,1.6vw,1.5rem)] leading-[1.6] tracking-[-.01em]">{p.description}</Reveal>
          {p.problem && (
            <Reveal as="section">
              <h2 className="eb mb-5">The problem</h2>
              <p className="max-w-[52ch] leading-[1.7] text-muted">{p.problem}</p>
            </Reveal>
          )}
          {p.built && (
            <Reveal as="section">
              <h2 className="eb mb-5">What I built</h2>
              <ul>
                {p.built.map((b) => <li key={b} className="max-w-[52ch] border-t border-line py-5 leading-[1.7] text-muted last:border-b">{b}</li>)}
              </ul>
            </Reveal>
          )}
        </div>
      </div>

      <a href={url('/projects/' + next.slug)} onClick={to('/projects/' + next.slug)} className="group mt-24 grid gap-2 border-t border-line pt-8 md:mt-36">
        <span className="lab">Next project</span>
        <span className="flex items-baseline justify-between gap-6 text-[clamp(2rem,6vw,4.5rem)] leading-none font-bold tracking-[-.05em] transition-colors duration-250 group-hover:text-pop">
          {next.title}<span aria-hidden="true">→</span>
        </span>
      </a>
    </article>
  )
}
