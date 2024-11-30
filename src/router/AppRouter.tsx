import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// layouts
const MainLayout = lazy(() => import('@/layout/main-layout'));

// pages
const LoginPage = lazy(() => import('@/pages/login'));
const HomePage = lazy(() => import('@/pages/home'));
const ClassesPage = lazy(() => import('@/pages/classes'));
const TeachersPage = lazy(() => import('@/pages/teachers'));
const StudentsPage = lazy(() => import('@/pages/students'));
const ClassDetailsPage = lazy(() => import('@/pages/class/[classId]'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback='Main Layout is loading'>
        <MainLayout />
      </Suspense>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback='Home Page is loading'>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: '/classes',
        element: (
          <Suspense fallback='Classes Page is loading'>
            <ClassesPage />
          </Suspense>
        ),
      },
      {
        path: '/class/:classId',
        element: (
          <Suspense fallback='Class Details Page is loading'>
            <ClassDetailsPage />
          </Suspense>
        ),
      },
      {
        path: '/teachers',
        element: (
          <Suspense fallback='Teachers Page is loading'>
            <TeachersPage />
          </Suspense>
        ),
      },
      {
        path: '/students',
        element: (
          <Suspense fallback='Students Page is loading'>
            <StudentsPage />
          </Suspense>
        ),
      },
      {
        path: '/transactions',
        element: (
          <Suspense fallback='Students Page is loading'>
            <StudentsPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: (
      <Suspense fallback='Login Page is loading'>
        <LoginPage />
      </Suspense>
    ),
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
