import './index.css';

import { Toaster } from 'sonner';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryProvider } from './data-fetching/QueryProvider';
import { Router } from './Router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <Router />
      <Toaster richColors />
    </QueryProvider>
  </StrictMode>,
);
