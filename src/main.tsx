import { GraphQLProvider } from './context/GraphQLProvider';
import { AppRouter } from './router/AppRouter';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Toaster } from 'sonner';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GraphQLProvider>
      <AppRouter />
      <Toaster richColors duration={4000} />
    </GraphQLProvider>
  </StrictMode>,
);
