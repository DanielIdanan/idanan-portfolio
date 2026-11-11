import { useContext, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Ctx } from '../lib/ctx.js'
import { useParallax } from '../lib/useParallax.js'
import Split from '../components/Split.jsx'
import SplitGsap from '../components/SplitGsap.jsx'
import Typewriter from '../components/Typewriter.jsx'
import Reveal from '../components/Reveal.jsx'
import hero from '../assets/hero.webp'
import { projects } from '../data/projects.js'
import { reduce } from '../lib/motion.js'

const roles = ['IT student', 'Developer', 'Hardware', 'Networking']
gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const nameRef = useRef(null)
  const portRef = useRef(null)
  useParallax(nameRef, 0.32)
  useParallax(portRef, 0.1)
  const rootRef = useRef(null)
  const { go } = useContext(Ctx)

  useLayoutEffect(() => {
    if (reduce) return
    const ctx = gsap.context(() => {
      // Portrait wipes up from the bottom while the photo settles from a zoom (GSAP), right after the preloader.
      gsap.set('.hport', { clipPath: 'inset(100% 0 0 0)' })
      gsap.set('.hport img', { scale: 1.35 })
      gsap.set('.hblock', { clipPath: 'inset(0 100% 0 0)' })
      const tl = gsap.timeline({ delay: Math.max(0, 3.05 - performance.now() / 1000) })
      tl.to('.hport', { clipPath: 'inset(0% 0 0 0)', duration: 1.1, ease: 'power4.inOut' }, 0)
        .to('.hport img', { scale: 1, duration: 1.4, ease: 'power3.out' }, 0)
        .to('.hblock', { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power4.inOut' }, 0.15)

      // Selected-work rows fade up in a staggered batch as they enter the viewport (ScrollTrigger).
      gsap.set('.row', { opacity: 0, y: 40 })
      ScrollTrigger.batch('.row', {
        start: 'top 90%', once: true,
        onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }),
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  const url = (p) => import.meta.env.BASE_URL.replace(/\/$/, '') + p
  const to = (path) => (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return
    e.preventDefault()
    go(path)
  }
  return (
    <div ref={rootRef} className="home">
      <section id="top">
        <div className="hblock" aria-hidden="true" />
        <div className="hport" ref={portRef}>
          <img src={hero} alt="Portrait of Daniel D. Idanan" />
        </div>
        <div className="hgrad" />

        <h1 className="hname" aria-label="Daniel" ref={nameRef}>
          <SplitGsap text="daniel" at={3.05} /><span className="stop">.</span>
        </h1>
        <Reveal className="hindex" at={3550} aria-hidden="true">01</Reveal>

        <div className="hintro">
          <Reveal as="span" className="hlabel" y={12} t=".52s" at={3350}>/ Hello</Reveal>
          <h2 className="roles d"><Typewriter words={roles} at={3250} /></h2>
          <Reveal as="p" className="hdesc" y={16} t=".52s" at={3450}>
            Hi, I'm Daniel, a third-year IT student at Gordon College in Olongapo City. I like working with hardware and networks, and I build apps when I can. Have a look at what I've made below.
          </Reveal>
        </div>

        <Reveal className="htag" y={0} t=".6s" at={3650}>
          <span>Idanan, Daniel D.</span>
          <span>IT Student / Developer</span>
        </Reveal>

        <a href={url('/projects')} onClick={to('/projects')} className="harrow" aria-label="View projects">→</a>
        <Reveal className="cue" at={3950}>Scroll down</Reveal>
      </section>

      <section className="pad">
        <Split className="d h2" style={{ marginTop: '1.5rem' }} text="Things I've built." />
        <ul className="rows">
          {projects.map((p, i) => (
            <li key={p.title} className="row">
              <a href={url('/projects')} onClick={to('/projects')}>
                <span className="lab">0{i + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <span className="ar">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="pad cta">
        <Split className="d" text="Open to internships." />
        <a href={url('/contact')} onClick={to('/contact')} className="btn">Say hello →</a>
      </section>
    </div>
  )
}
