import { AppRouter } from './router/app-router';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Toaster } from 'sonner';
import './index.css';
import { GraphQLProvider } from './context/GraphQLProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GraphQLProvider>
      <AppRouter />
      <Toaster richColors duration={4000} />
    </GraphQLProvider>
  </StrictMode>,
);
