import { Fragment } from 'react'
import { useOn } from '../lib/useOn.js'

// Text revealed unit by unit: mode "l" letters, "w" words, "line" whole line.
export default function Split({ as: T = 'span', text, mode = 'w', step = 0, at, className = '', ...rest }) {
  const [ref, on] = useOn(at)
  const units = mode === 'l' ? [...text] : mode === 'line' ? [text] : text.split(' ')
  return (
    <T ref={ref} aria-label={text} className={className + (on ? ' on' : '')} {...rest}>
      {units.map((u, i) => (
        <Fragment key={i}>
          <span className="m" aria-hidden="true">
            <span className="u" style={{ '--d': i * step + 'ms' }}>{u}</span>
          </span>
          {mode === 'w' && i < units.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </T>
  )
}
