import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Scale the rem grid up on screens wider than 1920px (smaller screens use the CSS vw rules).
function applyAdaptiveGrid() {
  const size = 16 - (16 * (((1920 - window.innerWidth) / 1920) * 100 * 0.6666)) / 100
  if (size > 16) document.documentElement.style.fontSize = size + 'px'
  else document.documentElement.style.removeProperty('font-size')
}
applyAdaptiveGrid()
window.addEventListener('resize', applyAdaptiveGrid)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
