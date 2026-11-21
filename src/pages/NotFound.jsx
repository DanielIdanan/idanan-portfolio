import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { Ctx } from '../lib/ctx.js'
import Split from '../components/Split.jsx'
import Reveal from '../components/Reveal.jsx'

// Shown for any URL that doesn't match a real page.
export default function NotFound() {
  const { go } = useContext(Ctx)
  const { pathname } = useLocation()
  const url = (p) => import.meta.env.BASE_URL.replace(/\/$/, '') + p
  const to = (path) => (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return
    e.preventDefault()
    go(path)
  }
  return (
    <section className="flex min-h-[70vh] flex-col items-start gap-6 px-(--gutter) pt-26 pb-(--section) md:pt-48">
      <Reveal as="p" className="lab">Error 404</Reveal>
      <Split as="h1" className="d text-[clamp(2.75rem,10vw,8rem)] leading-none" text="Page not found." />
      <Reveal as="p" className="max-w-[44ch] text-[1.375rem] leading-[1.45] text-muted">
        There's nothing at <code className="font-[inherit] break-all text-fg">{pathname}</code>. The link may be broken, or the page may have moved.
      </Reveal>
      <div className="mt-6 flex w-full flex-col items-stretch gap-8 sm:w-auto sm:flex-row sm:items-center">
        <a href={url('/')} onClick={to('/')} className="btn justify-center">Back to home →</a>
        <a href={url('/projects')} onClick={to('/projects')} className="pj-go self-start !mt-0">See projects <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  )
}
