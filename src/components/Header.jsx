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
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <nav className="pointer-events-auto flex items-center justify-between px-(--gutter) py-6" aria-label="Primary">
        <NavLink to="/" className="logo flex items-center gap-3" onClick={nav('/')}>
          <span className="mono"><Logo /></span>
          <span className="hidden text-[.8125rem] font-medium tracking-[.22em] text-muted uppercase sm:block">Daniel Idanan</span>
        </NavLink>
        <div className="flex items-center gap-5 md:gap-7">
          <ul className="links hidden gap-10 md:flex">
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
