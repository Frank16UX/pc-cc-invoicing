import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@frank16ux/pc-cookbook-legacy/dist/styles.css'
import './styles/global.scss'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
