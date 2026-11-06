import { contacts } from '../data/contact.js'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="fb">
        <div>
          <p className="sig d">Daniel Idanan</p>
          <p className="tag">BSIT 3C, Gordon College, Olongapo City</p>
        </div>
        <nav className="soc" aria-label="Contact">
          <ul style={{ display: 'grid', gap: '.5rem' }}>
            {contacts.filter((c) => c.label !== 'Personal email').map((c) => (
              <li key={c.label}><a href={c.href}>{c.value}</a></li>
            ))}
          </ul>
        </nav>
        <p className="cp">© 2026 Daniel D. Idanan.</p>
      </div>
    </footer>
  )
}
