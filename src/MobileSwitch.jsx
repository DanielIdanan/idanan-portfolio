import { BrowserRouter, useInRouterContext } from "react-router-dom";
import useIsMobile from "./hooks/useIsMobile";
import MobileApp from "./MobileApp";

// Renders the phone site on screens <= 760px wide, otherwise your normal App.
// Works whether or not your main.jsx already wraps the app in a router.
export default function MobileSwitch({ Desktop }) {
  const isMobile = useIsMobile();
  const inRouter = useInRouterContext();

  if (!isMobile) return <Desktop />;
  return inRouter ? (
    <MobileApp />
  ) : (
    <BrowserRouter>
      <MobileApp />
    </BrowserRouter>
  );
}
