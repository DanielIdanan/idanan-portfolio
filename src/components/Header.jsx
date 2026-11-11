import Logo from './Logo.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import Dock from './Dock.jsx'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Ctx } from '../lib/ctx.js'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const { go } = useContext(Ctx)
  const nav = (to) => (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return
    e.preventDefault()
    go(to)
  }
  return (
    <header>
      <nav className="top" aria-label="Primary">
        <NavLink to="/" className="logo" onClick={nav('/')}>
          <span className="mono"><Logo /></span>
          <span className="nm">Daniel Idanan</span>
        </NavLink>
        <div className="navr">
          <ul className="links">
            {links.map((l) => (
              <li key={l.to}><NavLink to={l.to} end onClick={nav(l.to)}>{l.label}</NavLink></li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
      <Dock />
    </header>
  )
}
