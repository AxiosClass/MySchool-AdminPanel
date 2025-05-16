import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayoutLoader } from '@/layout/main-layout/MainLayoutLoader';
import { TakePaymentLoader } from './pages/transactions/take-payment/TakePaymentLoader';
import { TransactionSubLayoutLoader } from './layout/transaction-sub-layout/TransactionSubLayoutLoader';
import { StudentDashboardPageLoader } from './pages/(student)/student-dashboard/StudentDashboardPageLoader';
import { CardsLoader, PageWithTableLoader } from './components/loader';
import { PageWithCardLoader } from './components/loader';
import { TransactionSubLayout } from './layout/transaction-sub-layout';
import { LogInPageLoader } from './pages/login/LogInPageLoader';
import { TableLoader } from './components/loader';
import { MainLayout } from './layout/main-layout';
import { StudentPaymentPageLoader } from './pages/(student)/payments/StudentPaymentPageLoader';
import { DashboardPageLoader } from './pages/home/DashboardLoader';

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
const TeacherDashboardPage = lazy(() => import('@/pages/(teacher)/teacher-dashboard'));
const TeacherClassroom = lazy(() => import('@/pages/(teacher)/teacher-classroom'));
const NoticePageForTeacher = lazy(() => import('@/pages/(teacher)/notices'));
const StudentDashboardPage = lazy(() => import('@/pages/(student)/student-dashboard'));
const StudentPaymentPage = lazy(() => import('@/pages/(student)/payments'));
const NoticePageForStudent = lazy(() => import('@/pages/(student)/notices'));
const AdminsPage = lazy(() => import('@/pages/admins'));

const router = createBrowserRouter([
  {
    // main layout
    path: '/',
    element: (
      <Suspense fallback={<MainLayoutLoader />}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      // admin panel
      {
        path: '/',
        element: (
          <Suspense fallback={<DashboardPageLoader />}>
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
          <Suspense fallback={<PageWithTableLoader />}>
            <TeachersPage />
          </Suspense>
        ),
      },
      {
        path: '/students',
        element: (
          <Suspense fallback={<PageWithTableLoader />}>
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
          <Suspense fallback={<PageWithTableLoader />}>
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
      {
        path: '/admins',
        element: (
          <Suspense fallback={<PageWithTableLoader />}>
            <AdminsPage />
          </Suspense>
        ),
      },
      {
        // teacher panel
        path: '/teacher',
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<CardsLoader />}>
                <TeacherDashboardPage />
              </Suspense>
            ),
          },
          {
            path: 'classroom/:classroomId',
            element: (
              <Suspense fallback={<TableLoader className='my-6' />}>
                <TeacherClassroom />
              </Suspense>
            ),
          },
          {
            path: 'notices',
            element: (
              <Suspense fallback={<PageWithCardLoader />}>
                <NoticePageForTeacher />
              </Suspense>
            ),
          },
        ],
      },
      {
        // student panel
        path: '/student',
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<StudentDashboardPageLoader />}>
                <StudentDashboardPage />
              </Suspense>
            ),
          },
          {
            path: 'payments',
            element: (
              <Suspense fallback={<StudentPaymentPageLoader />}>
                <StudentPaymentPage />
              </Suspense>
            ),
          },
          {
            path: 'notices',
            element: (
              <Suspense fallback={<PageWithCardLoader />}>
                <NoticePageForStudent />
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

export const Router = () => <RouterProvider router={router} />;
