import { useMemo } from 'react'
import Particles, { ParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

// Must be a stable reference for ParticlesProvider.
const initEngine = async (engine) => {
  await loadSlim(engine)
}

// Dots joined by lines read as a small network; hovering "grabs" nearby nodes.
export default function NetworkBackground() {
  const options = useMemo(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.matchMedia('(max-width: 640px)').matches
    return {
      fullScreen: { enable: false },
      background: { color: 'transparent' },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: { value: small ? 45 : 110, density: { enable: true, width: 1000, height: 600 } },
        color: { value: '#ffffff' },
        opacity: { value: 0.75 },
        size: { value: { min: 1.5, max: 3 } },
        links: { enable: true, distance: small ? 110 : 150, color: '#ffffff', opacity: 0.15, width: 1 },
        move: { enable: !reduce, speed: 0.55, outModes: { default: 'bounce' } },
      },
      interactivity: {
        detectsOn: 'window',
        events: { onHover: { enable: !reduce, mode: 'grab' } },
        modes: { grab: { distance: 180, links: { opacity: 0.9, color: '#f2b01e' } } },
      },
    }
  }, [])

  return (
    <ParticlesProvider init={initEngine}>
      <Particles id="network" className="network" options={options} />
    </ParticlesProvider>
  )
}
