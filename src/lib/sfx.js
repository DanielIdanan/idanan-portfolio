// Tiny Web Audio synth for the preloader. No audio files: the sounds are generated on the fly.
// Browsers keep an AudioContext "suspended" until the visitor interacts with the page, so playback
// only happens when the context is running; the first click/tap/key resumes it for any later cues.

let ctx = null
let master = null
let noiseBuf = null

function ensure() {
  if (ctx) return ctx
  const AC = window.AudioContext || window.webkitAudioContext
  if (!AC) return null
  try {
    ctx = new AC()
    master = ctx.createGain()
    master.gain.value = 0.55
    master.connect(ctx.destination)
  } catch { ctx = null }
  return ctx
}

const running = () => !!ctx && ctx.state === 'running'

// Rubber-ball "boing": a sine that drops in pitch, plus a soft low thump on impact.
export function bounce(vol = 0.8, pitch = 1) {
  if (!running()) return
  const t = ctx.currentTime
  const o = ctx.createOscillator(), g = ctx.createGain()
  o.type = 'sine'
  o.frequency.setValueAtTime(420 * pitch, t)
  o.frequency.exponentialRampToValueAtTime(150 * pitch, t + 0.16)
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(vol, t + 0.008)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.26)
  o.connect(g).connect(master)
  o.start(t); o.stop(t + 0.3)

  const k = ctx.createOscillator(), kg = ctx.createGain()
  k.type = 'sine'
  k.frequency.setValueAtTime(110 * pitch, t)
  k.frequency.exponentialRampToValueAtTime(48, t + 0.12)
  kg.gain.setValueAtTime(0.0001, t)
  kg.gain.exponentialRampToValueAtTime(vol * 0.9, t + 0.006)
  kg.gain.exponentialRampToValueAtTime(0.0001, t + 0.16)
  k.connect(kg).connect(master)
  k.start(t); k.stop(t + 0.2)
}

// Zoom-in whoosh: a short suck-in, then a rising filtered-noise sweep with a rising tone under it.
export function zoom(dur = 0.7) {
  if (!running()) return
  const t = ctx.currentTime
  if (!noiseBuf) {
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate)
    const d = noiseBuf.getChannelData(0)
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
  }
  const n = ctx.createBufferSource()
  n.buffer = noiseBuf; n.loop = true
  const bp = ctx.createBiquadFilter()
  bp.type = 'bandpass'; bp.Q.value = 1.4
  bp.frequency.setValueAtTime(250, t)
  bp.frequency.exponentialRampToValueAtTime(7000, t + dur)
  const ng = ctx.createGain()
  ng.gain.setValueAtTime(0.0001, t)
  ng.gain.exponentialRampToValueAtTime(0.9, t + dur * 0.8)
  ng.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  n.connect(bp).connect(ng).connect(master)
  n.start(t); n.stop(t + dur + 0.05)

  const o = ctx.createOscillator(), og = ctx.createGain()
  o.type = 'sawtooth'
  o.frequency.setValueAtTime(90, t)
  o.frequency.exponentialRampToValueAtTime(900, t + dur)
  const lp = ctx.createBiquadFilter()
  lp.type = 'lowpass'; lp.frequency.value = 1400
  og.gain.setValueAtTime(0.0001, t)
  og.gain.exponentialRampToValueAtTime(0.18, t + dur * 0.8)
  og.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  o.connect(lp).connect(og).connect(master)
  o.start(t); o.stop(t + dur + 0.05)
}

// Call once when the loader mounts. Returns a cleanup function.
export function armAudio() {
  const c = ensure()
  if (!c) return () => {}
  const resume = () => { if (c.state === 'suspended') c.resume().catch(() => {}) }
  resume() // works when the browser allows autoplay (e.g. visitor arrived via a click)
  const evs = ['pointerdown', 'keydown', 'touchstart']
  evs.forEach((e) => window.addEventListener(e, resume, { passive: true }))
  return () => evs.forEach((e) => window.removeEventListener(e, resume))
}
