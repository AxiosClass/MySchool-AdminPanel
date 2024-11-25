import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '@/layout/main-layout/MainLayout';
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('@/pages/home'));
const ClassesPage = lazy(() => import('@/pages/classes'));
const TeachersPage = lazy(() => import('@/pages/teachers'));
// const StaffsPage = lazy(() => import('@/pages/staffs'));
// const ClassDetailsPage = lazy(() => import('@/pages/class/[classId]'));
const LoginPage = lazy(() => import('@/pages/login'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/classes', element: <ClassesPage /> },
      { path: '/teachers', element: <TeachersPage /> },
      // { path: '/staffs', element: <StaffsPage /> },
      // { path: '/class/:classId', element: <ClassDetailsPage /> },
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
