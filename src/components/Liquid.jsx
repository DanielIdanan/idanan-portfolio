import { useId, useRef } from 'react'
import { animate } from 'motion'

// Image with an SVG displacement filter that wobbles on hover (spring: stiffness 140, damping 13).
export default function Liquid({ src, alt, max = 28, bare = false, shift = false, className = '', style }) {
  const id = 'lq' + useId().replace(/:/g, '')
  const turb = useRef(null), disp = useRef(null), veil = useRef(null), glow = useRef(null)
  const cur = useRef(0), anim = useRef(null)

  const go = (to) => {
    if (!matchMedia('(hover:hover) and (min-width:769px)').matches) return
    anim.current?.stop()
    anim.current = animate(cur.current, to, {
      type: 'spring', stiffness: 140, damping: 13,
      onUpdate: (x) => {
        cur.current = x
        const c = Math.min(Math.max(x, 0), 1)
        disp.current.setAttribute('scale', 1 + x * (max - 1))
        turb.current.setAttribute('baseFrequency', (0.009 + x * 0.013).toFixed(4))
        if (veil.current) veil.current.style.opacity = 0.88 * (1 - c)
        if (glow.current) glow.current.style.opacity = c
      },
    })
  }

  const tilt = (e) => {
    if (!matchMedia('(hover:hover) and (min-width:769px)').matches) return
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', -((e.clientX - r.left) / r.width - 0.5) * 24 + 'px')
    e.currentTarget.style.setProperty('--my', -((e.clientY - r.top) / r.height - 0.5) * 24 + 'px')
  }

  return (
    <figure className={'lq ' + (shift ? 'shift ' : '') + className} style={style} onMouseEnter={() => go(1)} onMouseLeave={(e) => { go(0); if (shift) { e.currentTarget.style.setProperty('--mx', '0px'); e.currentTarget.style.setProperty('--my', '0px') } }} onMouseMove={shift ? tilt : undefined}>
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <filter id={id}>
          <feTurbulence ref={turb} type="fractalNoise" baseFrequency="0.009" numOctaves="2" result="n" />
          <feDisplacementMap ref={disp} in="SourceGraphic" in2="n" scale="1" />
        </filter>
      </svg>
      <img src={src} alt={alt} style={{ filter: `url(#${id})` }} />
      {!bare && (<><div className="veil" ref={veil} /><div className="glow" ref={glow} /><div className="vig" /></>)}
    </figure>
  )
}
