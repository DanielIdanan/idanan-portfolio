import { createContext } from 'react'

// go(path): page transition navigation. lenis: ref to the smooth-scroll instance.
// whenReady(fn): runs fn once the preloader / page curtain has finished (right away if nothing is running).
// Returns a cancel function.
export const Ctx = createContext({ go: () => {}, lenis: { current: null }, whenReady: (fn) => { fn(); return () => {} } })
