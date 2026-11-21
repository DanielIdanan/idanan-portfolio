// After `vite build`: give every real route its own index.html, so GitHub Pages answers /about,
// /projects, /projects/<slug> and /contact with 200 instead of the 404.html fallback.
// Unknown addresses still hit dist/404.html (a real 404, which is correct for them).
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs'

const slugs = [...readFileSync('src/data/projects.js', 'utf8').matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])
const routes = ['about', 'projects', 'contact', ...slugs.map((s) => `projects/${s}`)]

for (const r of routes) {
  mkdirSync(`dist/${r}`, { recursive: true })
  copyFileSync('dist/index.html', `dist/${r}/index.html`)
}
copyFileSync('dist/index.html', 'dist/404.html')
console.log(`routes.mjs: wrote ${routes.length} route pages and 404.html`)
