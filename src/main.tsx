import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Global styles
import './styles';

// Main app component
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
