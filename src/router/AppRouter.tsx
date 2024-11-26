import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '@/layout/main-layout/MainLayout';
import { lazy, Suspense } from 'react';

const LoginPage = lazy(() => import('@/pages/login'));
const HomePage = lazy(() => import('@/pages/home'));
const ClassesPage = lazy(() => import('@/pages/classes'));
const TeachersPage = lazy(() => import('@/pages/teachers'));
const StudentsPage = lazy(() => import('@/pages/students'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/classes', element: <ClassesPage /> },
      { path: '/teachers', element: <TeachersPage /> },
      { path: '/students', element: <StudentsPage /> },
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
