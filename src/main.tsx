import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

import './index.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

// Initialize AOS animations
AOS.init({
  duration: 700,
  easing: 'ease-out-cubic',
  once: true,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
