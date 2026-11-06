import Split from '../components/Split.jsx'
import Reveal from '../components/Reveal.jsx'

export default function Contact() {
  return (
    <section id="contact" style={{ paddingTop: '12rem' }}>
      <div className="eb">Let's Build</div>
      <Split as="h2" className="d" text="Let's work on something real." step={60} />
      <Reveal as="p" className="lead">Open to internships, projects, and tech challenges. Email or call me.</Reveal>
      <div className="mail">
        <a href="mailto:itzme.guyzzz@gmail.com">itzme.guyzzz@gmail.com <em>↗</em></a>
      </div>
    </section>
  )
}
