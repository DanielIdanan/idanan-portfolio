import { createContext } from 'react'

// go(path): page transition navigation. lenis: ref to the smooth-scroll instance.
export const Ctx = createContext({ go: () => {}, lenis: { current: null } })
