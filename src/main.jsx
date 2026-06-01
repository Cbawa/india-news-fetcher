import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import './index.css'
import './theme.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeToggle />
    <App />
  </React.StrictMode>
)
