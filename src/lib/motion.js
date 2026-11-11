// Set to true to switch most animations off for visitors whose system has "reduce motion" /
// "show animations" turned off (an accessibility setting). It is false here so the animations always play.
export const RESPECT_REDUCED_MOTION = false

export const reduce = RESPECT_REDUCED_MOTION && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// CSS uses this class to turn off its own animations when reduce is on.
if (reduce) document.documentElement.classList.add('rm')
