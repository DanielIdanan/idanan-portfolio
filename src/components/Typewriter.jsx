import { useEffect, useState } from 'react'
import { reduce } from '../lib/motion.js'

// Role line that types itself out, holds, erases and moves to the next word. The caret is the dot from
// the logo (vermilion), so the line carries the brand mark: solid while typing, blinking while it holds.
// `at` = ms since page load to start (so it begins after the preloader).
export default function Typewriter({ words, at = 0, type = 70, erase = 35, hold = 1600 }) {
  const [text, setText] = useState(reduce ? words[0] : '')
  const [idle, setIdle] = useState(true)

  useEffect(() => {
    if (reduce) return
    let w = 0, n = 0, dir = 1, t
    const step = () => {
      const word = words[w]
      n += dir
      setText(word.slice(0, n))
      if (dir === 1 && n === word.length) {
        setIdle(true); dir = -1
        t = setTimeout(() => { setIdle(false); step() }, hold)
        return
      }
      if (dir === -1 && n === 0) {
        setIdle(true); dir = 1; w = (w + 1) % words.length
        t = setTimeout(() => { setIdle(false); step() }, 320)
        return
      }
      t = setTimeout(step, dir === 1 ? type : erase)
    }
    t = setTimeout(() => { setIdle(false); step() }, Math.max(0, at - performance.now()))
    return () => clearTimeout(t)
  }, [words, at, type, erase, hold])

  return (
    <span className="tw">
      <span className="sr">{words.join(', ')}</span>
      <span aria-hidden="true">{text}</span>
      <i className={'tw-dot' + (idle ? ' idle' : '')} aria-hidden="true" />
    </span>
  )
}
