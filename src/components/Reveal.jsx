import { useOn } from '../lib/useOn.js'

// Fade + slide in once (on scroll, or at `at` ms after page load).
export default function Reveal({ as: T = 'div', className = '', delay = 0, y, t, sc, at, style, children, ...rest }) {
  const [ref, on] = useOn(at)
  const s = { ...style, '--d': delay + 'ms' }
  if (y != null) s['--y'] = y + 'px'
  if (t) s['--t'] = t
  if (sc) s['--sc'] = sc
  return (
    <T ref={ref} className={'fu ' + className + (on ? ' on' : '')} style={s} {...rest}>
      {children}
    </T>
  )
}
