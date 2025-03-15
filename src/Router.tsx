import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayoutLoader } from '@/layout/main-layout/MainLayoutLoader';
import { TeachersPageLoader } from './pages/teachers/TeachersPageLoader';
import { StudentPageLoader } from './pages/students/StudentPageLoader';
import { TakePaymentLoader } from './pages/transactions/take-payment/TakePaymentLoader';
import { TransactionSubLayoutLoader } from './layout/transaction-sub-layout/TransactionSubLayoutLoader';
import { LogInPageLoader } from './pages/login/LogInPageLoader';
import { TransactionSubLayout } from './layout/transaction-sub-layout';
import { MainLayout } from './layout/main-layout';
import { PageWithCardLoader } from './components/loader/PageWithCardLoader';
import { HolidaysPageLoader } from './pages/holidays/HolidaysPageLoader';
import { PageWithTableLoader } from './components/loader/PageWithTableLoader';

// pages
const LoginPage = lazy(() => import('@/pages/login'));
const HomePage = lazy(() => import('@/pages/home'));
const ClassesPage = lazy(() => import('@/pages/classes'));
const ClassroomPage = lazy(() => import('@/pages/classroom'));
const TeachersPage = lazy(() => import('@/pages/teachers'));
const StudentsPage = lazy(() => import('@/pages/students'));
const ClassDetailsPage = lazy(() => import('@/pages/class/class-details'));
const TakePaymentPage = lazy(() => import('@/pages/transactions/take-payment'));
const PaymentsPage = lazy(() => import('@/pages/transactions/payments'));
const NoticesPage = lazy(() => import('@/pages/notices'));
const HolidaysPage = lazy(() => import('@/pages/holidays'));
const ExamsPage = lazy(() => import('@/pages/exams'));

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
          <Suspense fallback={<PageWithCardLoader />}>
            <ClassesPage />
          </Suspense>
        ),
      },
      {
        path: '/class/:classId',
        element: (
          <Suspense fallback={<PageWithCardLoader />}>
            <ClassDetailsPage />
          </Suspense>
        ),
      },
      {
        path: '/classroom/:classroomId',
        element: (
          <Suspense fallback={<PageWithCardLoader />}>
            <ClassroomPage />
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
      {
        path: '/notices',
        element: (
          <Suspense fallback={<PageWithCardLoader />}>
            <NoticesPage />
          </Suspense>
        ),
      },
      {
        path: '/holidays',
        element: (
          <Suspense fallback={<HolidaysPageLoader />}>
            <HolidaysPage />
          </Suspense>
        ),
      },
      {
        path: '/exams',
        element: (
          <Suspense fallback={<PageWithTableLoader />}>
            <ExamsPage />
          </Suspense>
        ),
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

export const Router = () => {
  return <RouterProvider router={router} />;
};
