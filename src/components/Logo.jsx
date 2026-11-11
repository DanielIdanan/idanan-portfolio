// The "h" with a dot mark (from the supplied SVG). The h follows the text colour, the dot is the accent (ink).
export const H_PATH = 'M56 24 H104 V232 H56 Z M56 168 A72 72 0 0 1 200 168 H152 A24 24 0 0 0 104 168 Z M152 168 H200 V232 H152 Z'

export default function Logo({ className = '' }) {
  return (
    <svg className={'mark ' + className} viewBox="52 20 152 216" role="img" aria-label="Logo">
      <path d={H_PATH} fill="currentColor" />
      <circle className="mark-dot" cx="176" cy="48" r="24" />
    </svg>
  )
}
