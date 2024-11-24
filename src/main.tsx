import './index.css';

import { AppRouter } from './router/AppRouter';
import { QueryProvider } from './data-fetching/QueryProvider';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <AppRouter />
      <Toaster richColors />
    </QueryProvider>
  </StrictMode>,
);
