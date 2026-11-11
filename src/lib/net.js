// Connection watcher for the preloader. Reports 'ok' | 'slow' | 'offline' and keeps re-checking.
// A real request is used (not just navigator.onLine, which stays true on dead wifi), and the Network
// Information API is only a hint because Safari/Firefox don't expose it.

const SLOW_MS = 2000 // a tiny same-origin request taking longer than this counts as a slow connection

async function probe() {
  if (!navigator.onLine) return 'offline'
  const c = navigator.connection
  if (c && (c.effectiveType === 'slow-2g' || c.effectiveType === '2g')) return 'slow'
  const ctl = new AbortController()
  const timer = setTimeout(() => ctl.abort(), SLOW_MS)
  try {
    const r = await fetch(`${import.meta.env.BASE_URL}favicon.svg?_=${Date.now()}`, { cache: 'no-store', signal: ctl.signal })
    if (!r.ok) return 'offline'
    await r.arrayBuffer()
    return 'ok'
  } catch (e) {
    return e?.name === 'AbortError' ? 'slow' : 'offline'
  } finally { clearTimeout(timer) }
}

export function watchConnection(onChange) {
  let alive = true, last = null, seq = 0, timer
  const set = (s) => { if (s !== last) { last = s; onChange(s) } }

  const run = async () => {
    clearTimeout(timer)
    const id = ++seq
    let s = await probe()
    if (!alive || id !== seq) return
    if (s === 'ok' && document.readyState !== 'complete') s = 'slow' // page assets still arriving
    set(s)
    timer = setTimeout(run, s === 'ok' ? 4000 : 1500)
  }
  const goOffline = () => { seq++; set('offline'); clearTimeout(timer); timer = setTimeout(run, 1500) }

  window.addEventListener('online', run)
  window.addEventListener('offline', goOffline)
  window.addEventListener('load', run)
  run()

  return {
    get: () => last,
    stop: () => {
      alive = false; clearTimeout(timer)
      window.removeEventListener('online', run)
      window.removeEventListener('offline', goOffline)
      window.removeEventListener('load', run)
    },
  }
}
