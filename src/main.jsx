import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root');
if (!root) {
  document.body.innerHTML = '<h1>Error: #root element not found</h1>';
} else {
  try {
    createRoot(root).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  } catch (e) {
    root.innerHTML = `<h1>App Error</h1><pre>${e.message}\n${e.stack}</pre>`;
  }
}
