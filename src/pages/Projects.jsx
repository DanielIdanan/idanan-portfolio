import { useState } from 'react'
import ProjectModal from '../components/ProjectModal.jsx'
import Split from '../components/Split.jsx'
import Reveal from '../components/Reveal.jsx'
import { projects } from '../data/projects.js'

// One case per row; the project screenshot and the text swap sides down the page (from lg up).
export default function Projects() {
  const [open, setOpen] = useState(null)
  return (
    <section className="px-(--gutter) pt-26 pb-(--section) md:pt-48">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Split className="d max-w-[14ch] text-[3.5rem] leading-[.95] sm:text-[5rem]" text="Projects." />
        </div>
      </div>
      <ul className="mt-20 grid gap-24 lg:gap-36">
        {projects.map((p, i) => {
          const flip = i % 2 === 1
          const last = i === projects.length - 1
          return (
            <Reveal as="li" key={p.title} className="grid gap-7 lg:grid-cols-12 lg:items-end lg:gap-x-(--gutter)" y={50} t=".7s">
              <button
                className={'group relative block aspect-video w-full cursor-pointer overflow-hidden focus-visible:outline-offset-4 lg:col-span-7 lg:row-start-1 ' + (flip ? 'lg:col-start-6 ' : 'lg:col-start-1 ') + (last ? 'bg-black' : 'bg-[#101110]')}
                onClick={() => setOpen(p)}
                aria-label={`Open ${p.title}`}
              >
                <img
                  className={'size-full transition-transform duration-600 ease-ex group-hover:scale-[1.03] group-focus-visible:scale-[1.03] ' + (last ? 'object-contain object-center' : 'object-cover object-top')}
                  src={p.img} alt={p.alt} loading="lazy" decoding="async"
                />
              </button>
              <div className={'lg:col-span-4 lg:row-start-1 ' + (flip ? 'lg:col-start-1' : 'lg:col-start-9')}>
                <p className="lab">{p.tag}</p>
                <h3 className="mt-4 font-sans text-5xl leading-none font-bold tracking-[-.045em] lg:text-[4.25rem]">{p.title}</h3>
                <p className="mt-5 max-w-[40ch] text-[1.125rem] leading-[1.6] text-muted">{p.description}</p>
                <p className="mt-6 text-[.8125rem] tracking-[.14em] text-muted uppercase">{p.category} · {p.status}</p>
                <button className="pj-go" onClick={() => setOpen(p)}>Open project <span aria-hidden="true">↗</span></button>
              </div>
            </Reveal>
          )
        })}
      </ul>
      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </section>
  )
}
