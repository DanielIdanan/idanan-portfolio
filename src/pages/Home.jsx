import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import gsap from 'gsap'
import NetworkBackground from '../components/NetworkBackground.jsx'
import Counter from '../components/Counter.jsx'
import photo from '../assets/photo.webp'
import { projects } from '../data/projects.js'
import { totalSkills, languageCount } from '../data/skills.js'

const headline = "Hi, I'm an IT Student & Tech Enthusiast.".split(' ')

export default function Home() {
  const hero = useRef(null)

  // One orchestrated moment: the headline rises word by word, then the rest follows.
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.from('.word', { yPercent: 110, duration: 0.7, stagger: 0.07 })
          .from('.hero__fade', { opacity: 0, y: 12, duration: 0.5, stagger: 0.1 }, '-=0.3')
          .from('.hero__photo', { opacity: 0, scale: 0.96, duration: 0.6 }, '<')
      }, hero)
      return () => ctx.revert()
    })
    return () => mm.revert()
  }, [])

  return (
    <>
      <section className="hero" ref={hero}>
        <NetworkBackground />
        <div className="hero__inner">
          <div className="hero__text">
            <h1 className="hero__title" aria-label="Hi, I'm an IT Student & Tech Enthusiast.">
              {headline.map((w, i) => (
                <span key={i} aria-hidden="true">
                  <span className="word-mask">
                    <span className="word">{w}</span>
                  </span>{' '}
                </span>
              ))}
            </h1>
            <p className="hero__lead hero__fade">
              I am a third-year Bachelor of Science in Information Technology student at Gordon
              College in Olongapo City. Merging a passion for technology with creative
              problem-solving, I specialize in hands-on hardware and networking projects. I am
              always eager to learn new systems, tackle unique tech challenges, and expand my
              skillset. Explore my work below!
            </p>
            <div className="hero__actions hero__fade">
              <motion.div whileTap={{ scale: 0.97 }} transition={{ duration: 0.12 }}>
                <Link to="/projects" className="btn btn--solid">
                  See my projects
                </Link>
              </motion.div>
              <motion.div whileTap={{ scale: 0.97 }} transition={{ duration: 0.12 }}>
                <Link to="/contact" className="btn btn--outline">
                  Get in touch
                </Link>
              </motion.div>
            </div>
          </div>
          <figure className="hero__photo">
            <img src={photo} alt="Portrait of Daniel D. Idanan" width="320" height="320" />
            <figcaption>Daniel D. Idanan, BSIT 3C</figcaption>
          </figure>
        </div>
      </section>

      <section className="stats" aria-label="At a glance">
        <dl className="stats__inner">
          <div className="stat">
            <dt>Projects shown here</dt>
            <dd><Counter end={projects.length} /></dd>
          </div>
          <div className="stat">
            <dt>Tools and technologies</dt>
            <dd><Counter end={totalSkills} /></dd>
          </div>
          <div className="stat">
            <dt>Programming languages</dt>
            <dd><Counter end={languageCount} /></dd>
          </div>
        </dl>
      </section>
    </>
  )
}
