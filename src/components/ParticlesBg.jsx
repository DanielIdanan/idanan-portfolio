import { useEffect, useMemo, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { reduce } from '../lib/motion.js'
import { useDark } from '../lib/theme.js'


// Floating sparkles in the background (tsParticles). They drift and get pushed away from the mouse.
export default function ParticlesBg() {
  const [ready, setReady] = useState(false)
  const dark = useDark()

  useEffect(() => {
    if (reduce) return
    initParticlesEngine(async (engine) => { await loadSlim(engine) }).then(() => setReady(true))
  }, [])

  const options = useMemo(() => ({
    fullScreen: { enable: false },
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    detectRetina: true,
    particles: {
      number: { value: 38, density: { enable: true } },
      color: { value: dark ? ['#d9d9d9', '#7b7b7b', '#4a4a4a'] : ['#0b0b0b', '#4a4a4a', '#7b7b7b'] },
      shape: { type: 'star', options: { star: { sides: 4 } } },
      opacity: { value: { min: 0.15, max: 0.75 }, animation: { enable: true, speed: 0.5, sync: false } },
      size: { value: { min: 1.5, max: 4.5 } },
      rotate: { value: { min: 0, max: 360 }, animation: { enable: true, speed: 4 } },
      move: { enable: true, speed: 0.45, direction: 'none', random: true, straight: false, outModes: { default: 'out' } },
    },
    interactivity: {
      detectsOn: 'window',
      events: { onHover: { enable: true, mode: 'repulse' }, resize: { enable: true } },
      modes: { repulse: { distance: 120, duration: 0.5 } },
    },
  }), [dark])

  if (!ready || reduce) return null
  return <Particles id="bg-particles" className="particles" options={options} />
}
