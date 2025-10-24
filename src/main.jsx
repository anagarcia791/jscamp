import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/Styles.css";
import Jobs from './Jobs.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Jobs />
  </StrictMode>,
)
