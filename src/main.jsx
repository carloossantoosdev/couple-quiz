import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { appTitle } from './data/content.js'
import './styles/index.css'

document.title = `${appTitle} 💕`

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
