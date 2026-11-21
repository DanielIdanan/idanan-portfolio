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
import { reduce, INTRO } from '../lib/motion.js'

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
      const tl = gsap.timeline({ delay: Math.max(0, INTRO - performance.now() / 1000) })
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
      <section id="top" className="relative flex flex-col overflow-hidden pt-22 pb-12 lg:block lg:min-h-svh lg:p-0">
        <div className="hblock absolute top-[52%] right-0 bottom-[10%] left-[38%] z-1 hidden bg-block lg:block" aria-hidden="true" />
        <div className="hport pointer-events-none relative order-2 mx-(--gutter) mt-4 h-[108vw] w-[calc(100%-var(--gutter)*2)] overflow-hidden bg-block md:h-[72vw] lg:absolute lg:right-[12vw] lg:bottom-0 lg:z-15 lg:m-0 lg:aspect-[867/1982] lg:h-[94%] lg:w-auto lg:max-w-[80vw] lg:overflow-visible lg:bg-transparent" ref={portRef}>
          <img src={hero} alt="Portrait of Daniel D. Idanan" />
        </div>
        <div className="hgrad absolute inset-x-0 bottom-0 z-20 hidden h-[24svh] bg-linear-to-b/oklab from-transparent to-bg lg:block" />

        <h1 className="hname pointer-events-none relative order-1 px-(--gutter) font-sans text-[clamp(4rem,26vw,12rem)] leading-[.95] font-bold tracking-[-.05em] text-fg lg:absolute lg:top-1/2 lg:left-(--gutter) lg:z-25 lg:-mt-[.5em] lg:p-0 lg:text-[clamp(4rem,14.5vw,15rem)] lg:leading-none" aria-label="Daniel" ref={nameRef}>
          <SplitGsap text="daniel" at={INTRO} /><span className="stop">.</span>
        </h1>

        <div className="order-4 mx-(--gutter) mt-7 flex flex-col gap-4 lg:absolute lg:top-32 lg:left-(--gutter) lg:z-30 lg:m-0 lg:w-[min(24rem,40vw)] lg:gap-[.9rem]">
          <Reveal as="span" className="text-xs font-bold tracking-[.1em] text-fg uppercase" y={12} t=".52s" at={INTRO * 1000 + 300}>/ Hello</Reveal>
          <h2 className="roles d min-h-[1.1em] text-[2.25rem] leading-[1.05] text-fg"><Typewriter words={roles} at={INTRO * 1000 + 200} /></h2>
          <Reveal as="p" className="text-[1.0625rem] leading-[1.6] text-muted lg:text-sm" y={16} t=".52s" at={INTRO * 1000 + 400}>
            Hi, I'm Daniel, a third-year IT student at Gordon College in Olongapo City. I like working with hardware and networks, and I build apps when I can. Have a look at what I've made below.
          </Reveal>
        </div>

        <Reveal className="order-3 mx-(--gutter) flex justify-between gap-3 border-b border-line py-[.9rem] text-[.6875rem] font-bold tracking-[.12em] uppercase lg:absolute lg:top-32 lg:right-(--gutter) lg:z-30 lg:m-0 lg:justify-start lg:gap-4 lg:border-r-2 lg:border-b-0 lg:border-fg lg:p-0 lg:pr-3 lg:text-[.8125rem] lg:tracking-[.08em] lg:[writing-mode:vertical-rl]" y={0} t=".6s" at={INTRO * 1000 + 600}>
          <span>Idanan, Daniel D.</span>
          <span>IT Student / Developer</span>
        </Reveal>

        <a href={url('/projects')} onClick={to('/projects')} className="order-5 mx-(--gutter) mt-6 flex h-14 items-center justify-between bg-accent px-5 text-2xl leading-none text-bg transition-[transform,background-color,color] duration-250 ease-ex before:text-[.9375rem] before:font-semibold before:content-['View_projects'] hover:bg-pop hover:text-on-pop lg:absolute lg:bottom-[10%] lg:left-[38%] lg:z-30 lg:m-0 lg:grid lg:size-14 lg:place-items-center lg:px-0 lg:before:content-none lg:hover:translate-x-[.4rem]" aria-label="View projects">→</a>
        <Reveal className="hidden items-center gap-3 text-[.8125rem] tracking-[.22em] text-fg uppercase before:h-px before:w-10 before:bg-pop before:content-[''] lg:absolute lg:bottom-8 lg:left-[calc(38%+5rem)] lg:z-30 lg:flex" at={INTRO * 1000 + 900}>Scroll down</Reveal>
      </section>

      <section className="px-(--gutter) py-(--section) lg:py-[calc(var(--section)*1.4)]">
        <Split className="mt-6 font-sans text-[4rem] leading-none font-bold tracking-[-.05em] sm:text-[6rem]" text="Things I've built." />
        <ul className="mt-8 border-t border-line md:mt-22">
          {projects.map((p) => (
            <li key={p.title} className="row border-b border-line">
              <a
                href={url('/projects/' + p.slug)}
                onClick={to('/projects/' + p.slug)}
                className="group grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 py-6 transition-[background-color,color,padding] duration-250 hover:bg-accent hover:text-bg lg:grid-cols-[1.2fr_2fr_auto] lg:gap-x-6 lg:gap-y-2 lg:px-2 lg:py-10 lg:hover:pl-5"
              >
                <h3 className="col-start-1 row-start-1 text-2xl leading-[1.15] font-semibold tracking-[-.01em] lg:col-auto lg:row-auto lg:text-[1.75rem]">{p.title}</h3>
                <p className="col-start-1 row-start-2 mt-2 text-muted group-hover:text-bg group-hover:opacity-70 lg:col-auto lg:row-auto lg:m-0 lg:max-w-[44ch]">{p.description}</p>
                <span className="ar col-start-2 row-span-2 row-start-1 grid size-11 place-items-center bg-accent text-xl text-bg transition-[background-color,color] duration-250 group-hover:bg-pop group-hover:text-on-pop lg:col-auto lg:row-auto lg:row-span-1" aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col items-center gap-14 px-(--gutter) py-20 text-center lg:py-[calc(var(--section)*1.6)]">
        <Split className="font-sans text-[clamp(2.5rem,11vw,7.5rem)] leading-none font-bold tracking-[-.05em]" text="Open to internships." />
        <a href={url('/contact')} onClick={to('/contact')} className="btn w-full justify-center md:w-auto">Say hello →</a>
      </section>
    </div>
  )
}
