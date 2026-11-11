import { H_PATH } from './Logo.jsx'

// Page-transition curtain. Layout.jsx animates it:
//  - pathRef: the <path> whose bottom edge is an arch that sweeps down (cover) and back up (reveal)
//  - logoRef: your "h" mark, centred on the curtain while the new page loads underneath
export default function PageWipe({ wipeRef, pathRef, logoRef }) {
  return (
    <div className="wipe" ref={wipeRef} aria-hidden="true">
      <svg className="w-bg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path ref={pathRef} d="M0 0H100V0Q50 0 0 0Z" />
      </svg>
      <svg className="w-logo" ref={logoRef} viewBox="52 20 152 216">
        <path className="h" d={H_PATH} />
        <circle className="d" cx="176" cy="48" r="24" />
      </svg>
    </div>
  )
}
