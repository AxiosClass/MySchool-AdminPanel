import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayoutLoader } from '@/layout/main-layout/MainLayoutLoader';
import { ClassesPageLoader } from '@/pages/classes/ClassesPageLoader';
import { TeachersPageLoader } from './pages/teachers/TeachersPageLoader';
import { ClassDetailsPageLoader } from './pages/class/[classId]/ClassDetailsPageLoader';
import { StudentPageLoader } from './pages/students/add-student/StudentPageLoader';
import { TransactionSubLayoutLoader } from './layout/transaction-sub-layout/TransactionSubLayoutLoader';
import { TakePaymentLoader } from './pages/transactions/take-payment/TakePaymentLoader';
import { LogInPageLoader } from './pages/login/LogInPageLoader';

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
const PaymentsPage = lazy(() => import('@/pages/transactions/payments'));

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
          <Suspense fallback={<ClassesPageLoader />}>
            <ClassesPage />
          </Suspense>
        ),
      },
      {
        path: '/class/:classId',
        element: (
          <Suspense fallback={<ClassDetailsPageLoader />}>
            <ClassDetailsPage />
          </Suspense>
        ),
      },
      {
        path: '/teachers',
        element: (
          <Suspense fallback={<TeachersPageLoader />}>
            <TeachersPage />
          </Suspense>
        ),
      },
      {
        path: '/students',
        element: (
          <Suspense fallback={<StudentPageLoader />}>
            <StudentsPage />
          </Suspense>
        ),
      },
      {
        path: '/transactions',
        element: (
          <Suspense fallback={<TransactionSubLayoutLoader />}>
            <TransactionSubLayout />
          </Suspense>
        ),
        children: [
          {
            path: 'take-payment',
            element: (
              <Suspense fallback={<TakePaymentLoader />}>
                <TakePaymentPage />
              </Suspense>
            ),
          },
          {
            path: 'payments',
            element: (
              <Suspense fallback='Payments Page is loading'>
                <PaymentsPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<LogInPageLoader />}>
        <LoginPage />
      </Suspense>
    ),
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
