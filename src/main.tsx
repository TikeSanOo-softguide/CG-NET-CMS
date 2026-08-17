import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './lib/i18n' // Initialize i18next before rendering

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found. Check index.html.')

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
