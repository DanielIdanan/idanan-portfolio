# Daniel D. Idanan, Portfolio (BSIT 3C)

React portfolio. Routes: `/` Home, `/about`, `/projects`, `/projects/:slug` (one page per project, data in `src/data/projects.js`), `/contact`.
All pages render inside one shared layout (Preloader, Header, Footer) through React Router's `Outlet`.

```bash
npm install
npm run dev
npm run build
```

The loader plays once per browser session, and everything respects `prefers-reduced-motion` (see `src/lib/motion.js`).

Animation stack: Lenis (smooth scroll, synced to GSAP ScrollTrigger) and GSAP (hero reveal, row reveals, page-transition curtain). Everything else is plain CSS. The role-line typewriter and the scroll rail are small hand-written components (no libraries).

Built with React, Vite, React Router, GSAP and Lenis.
