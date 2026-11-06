import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <header className={open ? 'open' : ''}>
      <nav className="top" aria-label="Primary">
        <NavLink to="/" className="logo" onClick={close}>
          <span className="mono">DI</span>
          <span className="nm">Daniel Idanan</span>
        </NavLink>
        <ul className="links">
          {links.map((l) => (
            <li key={l.to}><NavLink to={l.to} end>{l.label}</NavLink></li>
          ))}
        </ul>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <i /><i /><i />
        </button>
      </nav>
      <div id="menu">
        {links.map((l, i) => (
          <NavLink key={l.to} to={l.to} end className="d" style={{ '--i': i }} onClick={close}>{l.label}</NavLink>
        ))}
      </div>
    </header>
  )
}
