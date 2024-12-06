import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayoutLoader } from '@/layout/main-layout/MainLayoutLoader';

// layouts
const MainLayout = lazy(() => import('@/layout/main-layout'));
const TransactionSubLayout = lazy(() => import('@/layout/transaction-sub-layout'));

// pages
const LoginPage = lazy(() => import('@/pages/login'));
const HomePage = lazy(() => import('@/pages/home'));
const ClassesPage = lazy(() => import('@/pages/classes'));
const TeachersPage = lazy(() => import('@/pages/teachers'));
const StudentsPage = lazy(() => import('@/pages/students'));
const ClassDetailsPage = lazy(() => import('@/pages/class/[classId]'));
const TakePaymentPage = lazy(() => import('@/pages/transactions/take-payment'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<MainLayoutLoader />}>
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
            <TransactionSubLayout />
          </Suspense>
        ),
        children: [
          {
            path: 'take-payment',
            element: (
              <Suspense fallback='Take Payment Page is loading'>
                <TakePaymentPage />
              </Suspense>
            ),
          },
          { path: 'payments', element: <Suspense fallback='Payments Page is loading'></Suspense> },
        ],
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
