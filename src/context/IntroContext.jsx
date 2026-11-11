import { createContext, useContext } from "react";

// true once the intro overlay has finished (or was skipped)
export const IntroContext = createContext(true);
export const useIntroDone = () => useContext(IntroContext);
