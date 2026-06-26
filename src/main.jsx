import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Global error capture for debugging
window.onerror = (msg, url, line, col, err) => {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `<div style="padding:40px;font-family:monospace;color:red">
      <h2>JS Error</h2>
      <p>${msg}</p>
      <pre style="font-size:12px;white-space:pre-wrap">${err?.stack || ''}</pre>
    </div>`;
  }
};

// Also catch unhandled promise rejections
window.onunhandledrejection = (e) => {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `<div style="padding:40px;font-family:monospace;color:red">
      <h2>Unhandled Promise Error</h2>
      <p>${e.reason?.message || e.reason}</p>
      <pre style="font-size:12px;white-space:pre-wrap">${e.reason?.stack || ''}</pre>
    </div>`;
  }
};

const root = document.getElementById('root');
if (!root) {
  document.body.innerHTML = '<h1>Error: #root element not found</h1>';
} else {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
