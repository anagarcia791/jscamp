import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/Styles.css";
import Jobs from './Jobs.jsx'


createRoot(document.getElementById('root')).render(
  <Jobs />
  // <StrictMode> avoid some problems in dev mode, but can cause double rendering
  //   <Jobs />
  // </StrictMode>,
)
