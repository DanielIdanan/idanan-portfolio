import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Served from https://danielidanan.github.io/idanan-portfolio/
  base: '/idanan-portfolio/',
  plugins: [react()],
})
