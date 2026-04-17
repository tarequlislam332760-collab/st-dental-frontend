import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './i18n' // নিশ্চিত করুন এই লাইনটি আছে এবং i18n.js ফাইলটি src ফোল্ডারে আছে

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)