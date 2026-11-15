import { memo } from 'react'

// Hand-drawn 2D pixel art, one looping scene per project. Everything is built from 1-unit SVG rects on a
// 160x110 grid (crisp edges, no images). Sprites are written as rows of letters; "." is empty.
// All motion is CSS (see the .px block in index.css) and uses steps() so it ticks like a retro game.

const rects = (rows, pal) => {
  const out = []
  rows.forEach((row, y) => {
    let x = 0
    while (x < row.length) {
      const ch = row[x]
      if (ch === '.' || !pal[ch]) { x++; continue }
      let e = x
      while (e < row.length && row[e] === ch) e++
      out.push({ x, y, w: e - x, c: pal[ch] })
      x = e
    }
  })
  return out
}

// x/y position the sprite; cls/style go on an inner group so CSS animations never fight the position.
function Sprite({ rows, pal, x = 0, y = 0, cls, style }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={cls} style={style}>
        {rects(rows, pal).map((r, i) => <rect key={i} x={r.x} y={r.y} width={r.w} height="1" fill={r.c} />)}
      </g>
    </g>
  )
}

const Box = ({ x, y, w, h, f, cls, style }) => <rect x={x} y={y} width={w} height={h} fill={f} className={cls} style={style} />
const transpose = (rows) => rows[0].split('').map((_, i) => rows.map((r) => r[i]).join(''))

// 3x5 digit font
const FONT = {
  0: ['111', '101', '101', '101', '111'], 1: ['010', '110', '010', '010', '111'], 2: ['111', '001', '111', '100', '111'],
  3: ['111', '001', '111', '001', '111'], 4: ['101', '101', '111', '001', '001'], 5: ['111', '100', '111', '001', '111'],
  6: ['111', '100', '111', '101', '111'], 7: ['111', '001', '001', '010', '010'], 8: ['111', '101', '111', '101', '111'],
  9: ['111', '101', '111', '001', '111'], '.': ['0', '0', '0', '0', '1'],
}
function Digits({ text, xr, y, s, color, cls }) {
  const chars = text.split('')
  const gap = s
  const total = chars.reduce((t, c) => t + FONT[c][0].length * s, 0) + gap * (chars.length - 1)
  let x = xr - total
  const out = []
  chars.forEach((c, ci) => {
    FONT[c].forEach((row, ry) => row.split('').forEach((v, rx) => {
      if (v === '1') out.push(<rect key={`${ci}-${ry}-${rx}`} x={x + rx * s} y={y + ry * s} width={s} height={s} fill={color} />)
    }))
    x += FONT[c][0].length * s + gap
  })
  return <g className={cls}>{out}</g>
}

// Stepped steel girder: a row of 4-wide blocks whose top edge follows y = y0 + (x - x0) * slope.
function Girder({ x0, x1, y0, slope }) {
  const out = []
  for (let x = x0; x < x1; x += 4) {
    const y = Math.round(y0 + (x - x0) * slope)
    out.push(
      <g key={x}>
        <rect x={x} y={y} width="4" height="1" fill="#fb923c" />
        <rect x={x} y={y + 1} width="4" height="3" fill="#c2410c" />
        <rect x={x} y={y + 4} width="4" height="1" fill="#7c2d12" />
        {(x / 4) % 2 === 0 && <rect x={x + 1} y={y + 2} width="2" height="1" fill="#7c2d12" />}
      </g>,
    )
  }
  return <>{out}</>
}

/* ---------------- Donkey Kong (DSA Edition): an original ape, barrels and a runner ---------------- */
const APE = [
  '....BBBBBBBB....',
  '...BBBBBBBBBB...',
  '..BBBbbbbbbBBB..',
  '..BBbSSSSSSbBB..',
  '..BBSKSSSSKSBB..',
  '..BBSSSSSSSSBB..',
  '...BSSSKKSSSB...',
  '....BSSSSSSB....',
  '..BBBBbbbbBBBB..',
  '.BBBBbSSSSbBBBB.',
  '.BBBBbSSSSbBBBB.',
  '.BBBBbbbbbbBBBB.',
  '.BBBBBBBBBBBBBB.',
  '..BBBBBBBBBBBB..',
  '..BBBB....BBBB..',
  '..BBBB....BBBB..',
  '.BBBBB....BBBBB.',
]
const ARM = ['BBB', 'BBB', 'BbB', 'BBB', 'BBB', 'BBB', 'BBB', 'SSS']
const APE_PAL = { B: '#6b4423', b: '#8d5f31', S: '#e3ad72', K: '#111111' }
const BARREL_A = ['..OOOO..', '.OooooO.', 'OooooooO', 'OOOOOOOO', 'OOOOOOOO', 'OooooooO', '.OooooO.', '..OOOO..']
const BARREL_PAL = { O: '#a85d1f', o: '#d28a3c' }
const RUNNER = ['..HHHH..', '.HHHHHH.', '.SSSSSS.', '.SKSSKS.', '..SSSS..', '.TTTTTT.', 'STTTTTTS', 'SBBBBBBS', '.BBBBBB.']
const LEGS_A = ['.BB..BB.', '.BB..BB.', '.LL..LL.']
const LEGS_B = ['..BBBB..', '..BBBB..', '..LLLL..']
const RUN_PAL = { H: '#38bdf8', S: '#f0b98a', K: '#111111', T: '#facc15', B: '#2563eb', L: '#7c3f1d' }

function Kong() {
  return (
    <>
      <Box x="0" y="0" w="160" h="110" f="#12141f" />
      <Digits text="004200" xr={154} y={5} s={1} color="#e5e7eb" />
      <Girder x0={0} x1={132} y0={36} slope={1 / 16} />
      <Girder x0={28} x1={160} y0={76} slope={-1 / 16} />
      <Girder x0={0} x1={160} y0={100} slope={0} />
      {/* the ape: body, plus two arm poses that swap like a chest beat */}
      <Sprite rows={APE} pal={APE_PAL} x={8} y={20} />
      <g className="px-armsA">
        <Sprite rows={ARM} pal={APE_PAL} x={6} y={28} />
        <Sprite rows={ARM} pal={APE_PAL} x={23} y={28} />
      </g>
      <g className="px-armsB">
        <Sprite rows={ARM} pal={APE_PAL} x={6} y={22} />
        <Sprite rows={ARM} pal={APE_PAL} x={23} y={22} />
      </g>
      {/* the barrel travels the whole route; two frames flip so it looks like it rolls */}
      <g className="px-barrel">
        <Sprite rows={BARREL_A} pal={BARREL_PAL} cls="px-fa" />
        <Sprite rows={transpose(BARREL_A)} pal={BARREL_PAL} cls="px-fb" />
      </g>
      <g className="px-hop">
        <Sprite rows={RUNNER} pal={RUN_PAL} x={64} y={88} />
        <Sprite rows={LEGS_A} pal={RUN_PAL} x={64} y={97} cls="px-fa" />
        <Sprite rows={LEGS_B} pal={RUN_PAL} x={64} y={97} cls="px-fb" />
      </g>
    </>
  )
}

/* ---------------- AssessCore: a parcel map, a house, a form that fills in and gets stamped ---------------- */
const HOUSE = [
  '.....RR.....', '....RRRR....', '...RRRRRR...', '..RRRRRRRR..', '.RRRRRRRRRR.', '..WWWWWWWW..',
  '..WWWWWWWW..', '..WKWDDWKW..', '..WWWDDWWW..', '..WWWDDWWW..', '..BBBBBBBB..',
]
const HOUSE_PAL = { R: '#e8503a', W: '#f3e9d2', D: '#7a4a2a', K: '#5ab0e8', B: '#6b6b5a' }
const PIN = ['..RRR..', '.RRRRR.', 'RRRWRRR', 'RRRWRRR', 'RRRRRRR', '.RRRRR.', '.RRRRR.', '..RRR..', '..RRR..', '...R...']
const CHECK = ['.........GG', '........GG.', '.......GG..', 'GG....GG...', '.GG..GG....', '..GGGG.....', '...GG......']
const TILES = ['#2f7d62', '#3a9475', '#c8b46e', '#2a6f5a']

function Assess() {
  const tiles = []
  for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) {
    tiles.push(<Box key={`${i}${j}`} x={11 + i * 18} y={19 + j * 18} w="16" h="16" f={TILES[(i + j * 2) % 4]} />)
  }
  return (
    <>
      <Box x="0" y="0" w="160" h="110" f="#0b2b2e" />
      <Box x="9" y="17" w="74" h="74" f="#0a1c1e" />
      {tiles}
      <g className="px-sel" fill="#ffffff">
        <Box x="47" y="37" w="16" h="1" /><Box x="47" y="52" w="16" h="1" /><Box x="47" y="37" w="1" h="16" /><Box x="62" y="37" w="1" h="16" />
      </g>
      <Sprite rows={HOUSE} pal={HOUSE_PAL} x={49} y={40} />
      <Sprite rows={PIN} pal={{ R: '#ef4444', W: '#fff' }} x={51} y={24} cls="px-bob" />
      {/* the form */}
      <Box x="93" y="13" w="58" h="84" f="#0a1c1e" />
      <Box x="94" y="14" w="56" h="82" f="#f4f1e8" />
      <Box x="98" y="18" w="48" h="6" f="#1f9d8a" />
      <Box x="98" y="30" w="44" h="3" f="#9aa5a3" cls="px-line px-l1" />
      <Box x="98" y="39" w="36" h="3" f="#9aa5a3" cls="px-line px-l2" />
      <Box x="98" y="48" w="44" h="3" f="#9aa5a3" cls="px-line px-l3" />
      <Box x="98" y="57" w="28" h="3" f="#9aa5a3" cls="px-line px-l4" />
      <Box x="98" y="66" w="20" h="3" f="#c9d0ce" />
      <g className="px-stamp">
        <Box x="118" y="72" w="28" h="20" f="#14803c" />
        <Box x="119" y="73" w="26" h="18" f="#dcfce7" />
        <Sprite rows={CHECK} pal={{ G: '#14803c' }} x={126} y={77} />
      </g>
    </>
  )
}

/* ---------------- EcoSort: scan a bottle, it drops into the right bin ---------------- */
const SYMS = {
  R: ['1111.', '1..1.', '1111.', '1.1..', '1..1.'],
  L: ['..111', '.1111', '11111', '1111.', '1....'],
  X: ['1...1', '.1.1.', '..1..', '.1.1.', '1...1'],
  H: ['..1..', '..1..', '..1..', '.....', '..1..'],
}
const BINS = [
  { s: 'R', C: '#3b82f6', c: '#1d4ed8', L: '#2563eb' },
  { s: 'L', C: '#22c55e', c: '#15803d', L: '#16a34a' },
  { s: 'X', C: '#9ca3af', c: '#6b7280', L: '#6b7280' },
  { s: 'H', C: '#ef4444', c: '#b91c1c', L: '#dc2626' },
]
function binBody(sym) {
  const rows = []
  for (let r = 0; r < 23; r++) {
    const inset = 1 + (r >> 3)
    const w = 24 - inset * 2
    const row = Array.from({ length: 24 }, (_, x) => {
      if (x < inset || x >= 24 - inset) return '.'
      if (x === inset || x === 23 - inset) return 'c'
      if (r > 3 && (x === 6 || x === 17)) return 'c'
      return 'C'
    })
    if (w < 1) continue
    rows.push(row)
  }
  SYMS[sym].forEach((line, ry) => line.split('').forEach((v, rx) => { if (v === '1') rows[6 + ry][9 + rx] = 'W' }))
  return rows.map((r) => r.join(''))
}
const LID = ['..LLLLLLLLLLLLLLLLLLLL..', '.LLLLLLLLLLLLLLLLLLLLLL.', 'LLLLLLLLLLLLLLLLLLLLLLLL']
const BOTTLE = ['..CC..', '..CC..', '.BBBB.', 'BBBBBB', 'BhBBBB', 'BhBBBB', 'BBBBBB', 'BBBBBB', 'BBBBBB', 'BBBBBB', 'BBBBBB', '.BBBB.']

function Eco() {
  return (
    <>
      <Box x="0" y="0" w="160" h="110" f="#0e1a10" />
      <Box x="0" y="101" w="160" h="9" f="#1b2b1d" />
      {BINS.map((b, i) => (
        <g key={b.s}>
          <Sprite rows={binBody(b.s)} pal={{ C: b.C, c: b.c, W: '#ffffff' }} x={23 + i * 30} y={78} />
          <Sprite rows={LID} pal={{ L: b.L }} x={23 + i * 30} y={75} cls={i === 0 ? 'px-lid' : undefined} />
        </g>
      ))}
      <g className="px-fall">
        <Sprite rows={BOTTLE} pal={{ C: '#9ca3af', B: '#7dd3fc', h: '#e0f2fe' }} />
        <g className="px-scan" fill="#4ade80">
          <Box x="-4" y="-4" w="4" h="1" f="#4ade80" /><Box x="-4" y="-4" w="1" h="4" f="#4ade80" />
          <Box x="6" y="-4" w="4" h="1" f="#4ade80" /><Box x="9" y="-4" w="1" h="4" f="#4ade80" />
          <Box x="-4" y="15" w="4" h="1" f="#4ade80" /><Box x="-4" y="12" w="1" h="4" f="#4ade80" />
          <Box x="6" y="15" w="4" h="1" f="#4ade80" /><Box x="9" y="12" w="1" h="4" f="#4ade80" />
        </g>
      </g>
      <Sprite rows={CHECK} pal={{ G: '#4ade80' }} x={29} y={62} cls="px-pop" />
    </>
  )
}

/* ---------------- Sci-Cal: a calculator whose display cycles and keys light up ---------------- */
const GLYPHS = {
  '+': ['..1..', '..1..', '11111', '..1..', '..1..'],
  x: ['1...1', '.1.1.', '..1..', '.1.1.', '1...1'],
  p: ['11111', '.1.1.', '.1.1.', '.1.1.', '.1..1'],
  d: ['..1..', '.....', '11111', '.....', '..1..'],
}
const VALUES = ['3.14', '42', '2718', '1.41']

function Cal() {
  const keys = []
  for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) {
    const f = c === 3 ? '#f59e0b' : r === 0 ? '#3b82f6' : '#4b5675'
    keys.push(<Box key={`${r}${c}`} x={61 + c * 10} y={44 + r * 10} w="8" h="8" f={f} />)
  }
  const floats = [['+', 22, '#60a5fa', 0], ['x', 38, '#f59e0b', 1], ['p', 120, '#60a5fa', 2], ['d', 136, '#f59e0b', 3]]
  return (
    <>
      <Box x="0" y="0" w="160" h="110" f="#0d1120" />
      <Box x="55" y="9" w="50" h="92" f="#070a14" />
      <Box x="56" y="10" w="48" h="90" f="#2a3350" />
      <Box x="60" y="14" w="40" h="24" f="#07140a" />
      <Box x="61" y="15" w="38" h="22" f="#a5d6a7" />
      {VALUES.map((v, i) => <Digits key={v} text={v} xr={96} y={21} s={2} color="#1b3a1f" cls={`px-v px-v${i + 1}`} />)}
      {keys}
      <Box x="61" y="44" w="8" h="8" f="#ffffff" cls="px-press" />
      {floats.map(([g, x, col, i]) => (
        <Sprite key={g} rows={GLYPHS[g]} pal={{ 1: col }} x={x} y={80} cls="px-float" style={{ '--i': i }} />
      ))}
    </>
  )
}

const SCENES = { dk: Kong, assess: Assess, eco: Eco, cal: Cal }

export default memo(function PixelArt({ id, label }) {
  const Scene = SCENES[id] || Kong
  return (
    <svg className="px" viewBox="0 0 160 110" shapeRendering="crispEdges" role="img" aria-label={label}>
      <Scene />
    </svg>
  )
})
