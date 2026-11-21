import { contacts } from '../data/contact.js'

export default function Footer() {
  return (
    <footer className="relative px-(--gutter)">
      <div className="grid gap-7 border-t border-line py-8 lg:grid-cols-12 lg:gap-10 lg:py-12">
        <div className="lg:col-span-6">
          <p className="sig d text-[2.25rem] leading-none sm:text-[3rem]">Daniel Idanan</p>
          <p className="mt-4 text-[.8125rem] tracking-[.22em] text-muted uppercase">BSIT 3C, Gordon College, Olongapo City</p>
        </div>
        <nav className="soc lg:col-span-3" aria-label="Contact">
          <ul className="grid gap-2">
            {contacts.filter((c) => ['School email', 'GitHub'].includes(c.label)).map((c) => (
              <li key={c.label}><a className="min-h-11 md:min-h-0" href={c.href} {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{c.value}</a></li>
            ))}
          </ul>
        </nav>
        <p className="text-[.8125rem] tracking-[.18em] text-muted uppercase lg:col-span-3 lg:text-right">© 2026 Daniel D. Idanan.</p>
      </div>
    </footer>
  )
}
