import './index.css';

import { Toaster } from 'sonner';
import { Router } from './Router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryProvider } from '@/components/providers';
import { TooltipProvider } from './components/ui/tooltip';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <TooltipProvider>
        <Router />
        <Toaster richColors duration={1500} />
      </TooltipProvider>
    </QueryProvider>
  </StrictMode>,
);
