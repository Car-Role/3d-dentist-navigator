import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

// Add version query to force cache refresh
declare const __BUILD_TIME__: string
if (import.meta.env.PROD) {
  const params = new URLSearchParams(window.location.search)
  params.set('v', __BUILD_TIME__)
  window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`)
}

const root = createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <BrowserRouter basename="/3d-dentist-navigator">
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
