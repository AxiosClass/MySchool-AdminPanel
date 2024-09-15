import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '@/layout/main-layout';
import { lazy, Suspense } from 'react';

const LoginPage = lazy(() => import('@/pages/login'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

export const AppRouter = () => {
  return (
    <Suspense fallback='Loading'>
      <RouterProvider router={router} />
    </Suspense>
  );
};
