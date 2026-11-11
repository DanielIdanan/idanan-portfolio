import { toggleDark, useDark } from '../lib/theme.js'

// Small dark mode switch for the nav. The mark is a split dot: a solid half facing a ring half
// (a nod to the dot in the h logo). It turns half a revolution when dark mode is on.
export default function ThemeToggle() {
  const on = useDark()
  return (
    <button type="button" className="tt" onClick={toggleDark} aria-pressed={on} aria-label="Dark mode" title={on ? 'Dark mode: on' : 'Dark mode: off'}>
      <svg viewBox="0 0 256 256" aria-hidden="true">
        <path fill="currentColor" d="M47.1 62.7A104 104 0 0 0 193.3 208.9Z" />
        <path fill="currentColor" d="M208.9 193.3A104 104 0 0 0 62.7 47.1L78.3 62.8A82 82 0 0 1 193.2 177.7Z" />
      </svg>
    </button>
  )
}
