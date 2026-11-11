import { useContext, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Ctx } from '../lib/ctx.js'
import { reduce } from '../lib/motion.js'

export const GmailIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#EA4335" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
  </svg>
)

export const GithubIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

// A pill link that plays the "circle -> icon pops -> pill expands -> letters fade in" intro.
// The intro waits until the page transition (or preloader) is finished, via whenReady from Layout.
export default function PillLink({ href, label, icon, delay = 0, external = false }) {
  const a = useRef(null)
  const ic = useRef(null)
  const tx = useRef(null)
  const { whenReady } = useContext(Ctx)

  useLayoutEffect(() => {
    if (reduce) return
    const el = a.current
    const icon_ = ic.current
    const chars = tx.current.children
    const w = el.offsetWidth // full pill width, measured before we collapse it
    const h = el.offsetHeight
    gsap.set(el, { width: h, opacity: 0, scale: 0.6 })
    gsap.set(icon_, { scale: 0 })
    gsap.set(chars, { opacity: 0, y: 6 })

    let tl
    const cancel = whenReady(() => {
      tl = gsap.timeline({
        delay,
        onComplete: () => gsap.set([el, icon_, ...chars], { clearProps: 'all' }),
      })
      tl.to(el, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' })
        .to(icon_, { scale: 1, duration: 0.45, ease: 'back.out(2.2)' }, '<0.08')
        .to(el, { width: w, duration: 0.65, ease: 'power3.inOut' }, '>-0.1')
        .to(chars, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', stagger: 0.025 }, '<0.2')
    })

    return () => {
      cancel()
      tl?.kill()
      gsap.set([el, icon_, ...chars], { clearProps: 'all' })
    }
  }, [whenReady, delay])

  return (
    <a
      ref={a}
      className="pill"
      href={href}
      aria-label={label}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className="pill-ic" ref={ic}>{icon}</span>
      <span className="pill-tx" ref={tx} aria-hidden="true">
        {[...label].map((c, i) => <span key={i}>{c}</span>)}
      </span>
    </a>
  )
}
