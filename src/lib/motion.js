// Visitors whose system has "reduce motion" turned on get the calm version: no preloader, no curtain,
// no smooth-scroll, no reveals (the .rm class in index.css switches the CSS animations off too).
export const RESPECT_REDUCED_MOTION = true

export const reduce = RESPECT_REDUCED_MOTION && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// CSS uses this class to turn off its own animations when reduce is on.
if (reduce) document.documentElement.classList.add('rm')

// The loader plays once per browser session. After that (reloads, coming back later in the same tab) the
// site opens straight away, so repeat visits never wait on it.
let seen = false
try { seen = sessionStorage.getItem('intro') === '1' } catch { /* storage blocked: just play it */ }
export const skipIntro = reduce || seen
export const markIntroSeen = () => { try { sessionStorage.setItem('intro', '1') } catch { /* ignore */ } }

// Seconds after page load when the home hero starts revealing: right as the loader flood fades out.
export const INTRO = skipIntro ? 0.1 : 1.5
