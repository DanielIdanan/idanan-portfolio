import { useOn } from '../lib/useOn.js'

// Heading that slides up out of a mask once, when it scrolls into view (or `at` ms after page load).
export default function Split({ as: T = 'h2', text, at, className = '', ...rest }) {
  const [ref, on] = useOn(at)
  return (
    <T ref={ref} aria-label={text} className={className + (on ? ' on' : '')} {...rest}>
      <span className="m" aria-hidden="true"><span className="u">{text}</span></span>
    </T>
  )
}
