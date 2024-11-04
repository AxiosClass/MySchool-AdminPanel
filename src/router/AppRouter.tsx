import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '@/layout/main-layout';
import { lazy, Suspense } from 'react';

const ClassesPage = lazy(() => import('@/pages/classes'));
const StaffsPage = lazy(() => import('@/pages/staffs'));
const LoginPage = lazy(() => import('@/pages/login'));
const HomePage = lazy(() => import('@/pages/home'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/classes', element: <ClassesPage /> },
      { path: '/staffs', element: <StaffsPage /> },
    ],
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
