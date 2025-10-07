import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './output.css';
import App from './App.jsx'
import AppState from './context/AppState.jsx';


createRoot(document.getElementById('root')).render(
  <AppState >
     <App />
  </AppState>
  
)
