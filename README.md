# Daniel D. Idanan, portfolio (BSIT 3C)

A React portfolio for Daniel D. Idanan, a third-year BSIT student at Gordon College in Olongapo City. It shows his projects, has a light and a dark theme, and ends on a contact page.

The routes are `/` (Home), `/about`, `/projects`, `/projects/:slug` and `/contact`. Each project has its own page, and the data for all of them lives in `src/data/projects.js`. Every page renders inside one shared layout (preloader, header, footer) through React Router's `Outlet`.

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Deploying

The site is served from https://danielidanan.github.io/idanan-portfolio/, so `vite.config.js` sets `base` to `/idanan-portfolio/`. The GitHub Actions workflow in `.github/workflows/deploy.yml` builds and publishes it on every push to `main`.

`npm run build` runs `vite build` and then `scripts/routes.mjs`. The script copies `dist/index.html` into a folder for each route, so GitHub Pages answers `/about`, `/projects`, `/projects/<slug>` and `/contact` with a 200 instead of its 404 fallback. It also writes `dist/404.html` for addresses that don't exist. It reads the slugs from `src/data/projects.js`, so a new project gets its page without any other change.

## Motion and accessibility

The loader plays once per browser session. Everything respects `prefers-reduced-motion` (see `src/lib/motion.js`): those visitors get no loader, no page curtain, no smooth scroll and no reveals.

Lenis handles smooth scroll and is synced to GSAP ScrollTrigger. GSAP also drives the hero reveal, the project row reveals and the page-transition curtain. Everything else is plain CSS, and the role-line typewriter and the scroll rail are small hand-written components.

## Styling and theme

Styles are Tailwind v4 utilities plus hand-written CSS in `src/index.css`, which covers the animation-heavy parts such as the loader, the mobile dock and the 3D logo. Dark mode sets `data-dark` on `<html>` and remembers the choice in `localStorage`. A small inline script in `index.html` applies it before first paint, so dark-mode visitors don't see a light flash. Text on the vermilion accent uses `--on-pop`, which is white in light mode and ink in dark mode.

Built with React, Vite, React Router, Tailwind, GSAP and Lenis.
