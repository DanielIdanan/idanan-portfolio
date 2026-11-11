import { Routes, Route } from "react-router-dom";
import MobileLayout from "./components/mobile/MobileLayout";
import MobileHome from "./pages/mobile/MobileHome";
import MobileAbout from "./pages/mobile/MobileAbout";
import MobileProjects from "./pages/mobile/MobileProjects";
import MobileContact from "./pages/mobile/MobileContact";

// The whole phone site. Independent of your desktop App.
export default function MobileApp() {
  return (
    <Routes>
      <Route element={<MobileLayout />}>
        <Route path="/" element={<MobileHome />} />
        <Route path="/about" element={<MobileAbout />} />
        <Route path="/projects" element={<MobileProjects />} />
        <Route path="/contact" element={<MobileContact />} />
        <Route path="*" element={<MobileHome />} />
      </Route>
    </Routes>
  );
}
