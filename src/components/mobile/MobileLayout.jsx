import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import "../../styles/mobile.css";

const links = [
  { to: "/", label: "Home", n: "01", end: true },
  { to: "/about", label: "About", n: "02" },
  { to: "/projects", label: "Projects", n: "03" },
  { to: "/contact", label: "Contact", n: "04" },
];

export default function MobileLayout() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const { pathname } = useLocation();

  // close the menu and scroll to top on every navigation
  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  // lock page scroll while the menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="m-root" data-theme={dark ? "dark" : "light"}>
      <header className="m-header">
        <Link to="/" className="m-logo" aria-label="Home">
          h<span className="m-logo__dot" />
        </Link>
        <div className="m-header__actions">
          <button
            className="m-iconbtn"
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setDark((d) => !d)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
            </svg>
          </button>
          <button className="m-iconbtn m-burger" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
            <i /><i /><i />
          </button>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      {open && (
        <div className="m-menu" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="m-header">
            <Link to="/" className="m-logo" aria-label="Home">
              h<span className="m-logo__dot" />
            </Link>
            <button className="m-iconbtn" aria-label="Close menu" onClick={() => setOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 4l16 16M20 4L4 20" />
              </svg>
            </button>
          </div>
          <nav className="m-menu__nav" aria-label="Primary">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className="m-menu__link">
                <span>{l.label}</span>
                <em>{l.n}</em>
              </NavLink>
            ))}
          </nav>
          <div className="m-menu__foot">
            <span className="m-eyebrow-sm">Open to internships</span>
            <a href="mailto:itzme.guyzzz@gmail.com">itzme.guyzzz@gmail.com</a>
          </div>
        </div>
      )}
    </div>
  );
}
