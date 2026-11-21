import Split from '../components/Split.jsx'
import Reveal from '../components/Reveal.jsx'
import Logo3D from '../components/Logo3D.jsx'
import PillLink, { GmailIcon, GithubIcon } from '../components/PillLink.jsx'

const EMAIL = 'itzme.guyzzz@gmail.com'
const SUBJECT = 'Working together'
const BODY = `Hi Daniel,

I saw your portfolio and I'd like to talk about working with you.

Are you taking on new work right now? If so, a quick reply here or a short call would be great.

Thanks,
`
// Opens a Gmail compose window in a new tab. Unlike mailto:, this works even when
// the visitor has no desktop mail app set up (which is why the old link "did nothing").
const GMAIL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}&su=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`

export default function Contact() {
  return (
    <section id="contact" className="relative px-(--gutter) pt-26 pb-(--section) md:pt-48">
      <Split as="h2" className="d mt-6 max-w-[14ch] text-[clamp(2.75rem,12vw,4.5rem)] leading-none sm:text-[clamp(4.5rem,9vw,7.5rem)]" text="Let's work together." mode="c" step={40} />
      <Reveal as="p" className="mt-8 max-w-[44ch] text-[1.375rem] leading-[1.45] text-muted">I'm open to internships and projects. Send me an email and I'll reply.</Reveal>
      <div className="mt-12 flex max-w-full flex-col items-start gap-4">
        <PillLink href={GMAIL} label={EMAIL} icon={<GmailIcon />} external />
        <PillLink href="https://github.com/DanielIdanan" label="github.com/DanielIdanan" icon={<GithubIcon />} delay={0.3} external />
      </div>
      <Logo3D />
    </section>
  )
}
