import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { Ctx } from '../lib/ctx.js'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

const hoverOK = () => matchMedia('(hover:hover) and (min-width:769px) and (prefers-reduced-motion:no-preference)').matches

// Leans toward the cursor, then springs back.
function Magnetic({ children }) {
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16 }), sy = useSpring(y, { stiffness: 220, damping: 16 })
  const move = (e) => {
    if (!hoverOK()) return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.35)
    y.set((e.clientY - r.top - r.height / 2) * 0.35)
  }
  return (
    <motion.li style={{ x: sx, y: sy }} onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0) }}>
      {children}
    </motion.li>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const { go } = useContext(Ctx)
  const nav = (to) => (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return
    e.preventDefault()
    setOpen(false)
    go(to)
  }
  return (
    <header className={open ? 'open' : ''}>
      <nav className="top" aria-label="Primary">
        <NavLink to="/" className="logo" onClick={nav('/')}>
          <span className="mono">DI</span>
          <span className="nm">Daniel Idanan</span>
        </NavLink>
        <ul className="links">
          {links.map((l) => (
            <Magnetic key={l.to}><NavLink to={l.to} end onClick={nav(l.to)}>{l.label}</NavLink></Magnetic>
          ))}
        </ul>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <i /><i /><i />
        </button>
      </nav>
      <div id="menu">
        {links.map((l, i) => (
          <NavLink key={l.to} to={l.to} end className="d" style={{ '--i': i }} onClick={nav(l.to)}>{l.label}</NavLink>
        ))}
      </div>
    </header>
  )
}
