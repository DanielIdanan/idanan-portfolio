import Split from '../components/Split.jsx'
import Reveal from '../components/Reveal.jsx'
import Logo3D from '../components/Logo3D.jsx'
import PillLink, { GmailIcon, GithubIcon } from '../components/PillLink.jsx'

const EMAIL = 'itzme.guyzzz@gmail.com'
const SUBJECT = 'Working together on [project]?'
const BODY = `Hi Daniel,

I saw your work and I'd like to see if you'd be open to working with me on [project]. I need someone to [what you need done], and you look like a good fit for it.

I'm flexible on how we do it. It could be a paid contract, a one-time job, or something ongoing, depending on what works for you. If you're interested, I can send over the scope, timeline, and budget.

Are you taking on new work right now? If so, a quick reply here or a short call would be great.

Thanks,
[Your name]`
// Opens a Gmail compose window in a new tab. Unlike mailto:, this works even when
// the visitor has no desktop mail app set up (which is why the old link "did nothing").
const GMAIL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}&su=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`

export default function Contact() {
  return (
    <section id="contact" className="pt-top">
      <Split as="h2" className="d" text="Let's work together." mode="c" step={40} />
      <Reveal as="p" className="lead">I'm open to internships and projects. Send me an email and I'll reply.</Reveal>
      <div className="pills">
        <PillLink href={GMAIL} label={EMAIL} icon={<GmailIcon />} external />
        <PillLink href="https://github.com/DanielIdanan" label="github.com/DanielIdanan" icon={<GithubIcon />} delay={0.3} external />
      </div>
      <Logo3D />
    </section>
  )
}
