import './index.css';

import { Toaster } from 'sonner';
import { Router } from './Router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryProvider } from '@/components/providers';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <Router />
      <Toaster richColors />
    </QueryProvider>
  </StrictMode>,
);
