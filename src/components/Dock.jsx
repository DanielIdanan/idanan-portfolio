import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Ctx } from '../lib/ctx.js'

const I = (d) => <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
const items = [
  { to: '/', label: 'Home', icon: I(<path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" />) },
  { to: '/about', label: 'About', icon: I(<><circle cx="12" cy="8" r="3.6" /><path d="M5 20c.6-3.6 3.4-5.6 7-5.6s6.4 2 7 5.6" /></>) },
  { to: '/projects', label: 'Projects', icon: I(<><rect x="4" y="4" width="7" height="7" rx="1.6" /><rect x="13" y="4" width="7" height="7" rx="1.6" /><rect x="4" y="13" width="7" height="7" rx="1.6" /><rect x="13" y="13" width="7" height="7" rx="1.6" /></>) },
  { to: '/contact', label: 'Contact', icon: I(<><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="M4 7l8 6 8-6" /></>) },
]

// Mobile-only speed dial: one round button fans the page links out upward as circles, one after another.
export default function Dock() {
  const [open, setOpen] = useState(false)
  const { go } = useContext(Ctx)
  const { pathname } = useLocation()

  useEffect(() => {
    if (!open) return
    const key = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [open])

  const nav = (to) => (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return
    e.preventDefault()
    setOpen(false)
    go(to)
  }

  return (
    <div className={'dock' + (open ? ' open' : '')}>
      <button className="dock-scrim" tabIndex={-1} aria-hidden="true" onClick={() => setOpen(false)} />
      <nav aria-label="Mobile">
        <ul className="dock-list">
          {items.map((it, i) => (
            <li key={it.to} style={{ '--i': i, '--n': items.length - i }}>
              <a href={it.to} className={pathname === it.to ? 'on' : ''} aria-current={pathname === it.to ? 'page' : undefined} tabIndex={open ? 0 : -1} onClick={nav(it.to)}>
                <span className="dock-lab">{it.label}</span>
                <span className="dock-ic">{it.icon}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <button className="dock-fab" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="8" cy="8" r="2.4" /><circle cx="16" cy="8" r="2.4" /><circle cx="8" cy="16" r="2.4" /><circle cx="16" cy="16" r="2.4" />
        </svg>
      </button>
    </div>
  )
}
