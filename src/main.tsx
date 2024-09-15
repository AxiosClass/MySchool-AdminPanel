import { AppRouter } from './router/app-router';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Toaster } from 'sonner';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster richColors duration={4000} />
    <AppRouter />
  </StrictMode>,
);
