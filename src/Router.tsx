import { lazy, LazyExoticComponent, ReactNode, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { TakePaymentLoader } from './pages/transactions/take-payment/TakePaymentLoader';
import { StudentDashboardPageLoader } from './pages/(student)/student-dashboard/StudentDashboardPageLoader';
import { CardsLoader, PageWithCoverLoader, PageWithTableLoader, PageWithCardLoader } from './components/loader';
import { StudentPaymentPageLoader } from './pages/(student)/payments/StudentPaymentPageLoader';
import { TransactionSubLayout } from './layout/transaction-sub-layout';
import { LogInPageLoader } from './pages/login/LogInPageLoader';
import { DashboardPageLoader } from './pages/home/DashboardLoader';
import { MainLayout } from './layout/main-layout';

const lazyPages = {
  // auth
  login: lazy(() => import('@/pages/login')),
  // admin
  home: lazy(() => import('@/pages/home')),
  adminClasses: lazy(() => import('@/pages/classes')),
  adminSection: lazy(() => import('@/pages/section')),
  adminTeachers: lazy(() => import('@/pages/teachers')),
  adminStudents: lazy(() => import('@/pages/students')),
  adminClassDetails: lazy(() => import('@/pages/class-details')),
  takePayment: lazy(() => import('@/pages/transactions/take-payment')),
  adminPayments: lazy(() => import('@/pages/transactions/payments')),
  adminNotices: lazy(() => import('@/pages/notices')),
  subjects: lazy(() => import('@/pages/subjects')),
  holidays: lazy(() => import('@/pages/holidays')),
  terms: lazy(() => import('@/pages/terms')),
  admins: lazy(() => import('@/pages/admins')),
  // teacher
  teacherDashboard: lazy(() => import('@/pages/(teacher)/teacher-dashboard')),
  teacherSection: lazy(() => import('@/pages/(teacher)/teacher-section')),
  teacherNotices: lazy(() => import('@/pages/(teacher)/notices')),
  // student
  studentDashboard: lazy(() => import('@/pages/(student)/student-dashboard')),
  studentPayments: lazy(() => import('@/pages/(student)/payments')),
  studentNotices: lazy(() => import('@/pages/(student)/notices')),
  studentResult: lazy(() => import('@/pages/(student)/result')),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withSuspense = (Component: LazyExoticComponent<any>, FallBack: ReactNode) => (
  <Suspense fallback={FallBack}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  // auth
  { path: '/login', element: withSuspense(lazyPages.login, <LogInPageLoader />) },
  // main layout
  {
    path: '/',
    element: <MainLayout />,
    children: [
      // admins
      { path: '/', element: withSuspense(lazyPages.home, <DashboardPageLoader />) },
      { path: '/classes', element: withSuspense(lazyPages.adminClasses, <PageWithCardLoader />) },
      { path: '/class/:classId', element: withSuspense(lazyPages.adminClassDetails, <PageWithCardLoader />) },
      { path: '/section/:sectionId', element: withSuspense(lazyPages.adminSection, <PageWithTableLoader />) },
      { path: '/teachers', element: withSuspense(lazyPages.adminTeachers, <PageWithTableLoader />) },
      { path: '/students', element: withSuspense(lazyPages.adminStudents, <PageWithTableLoader />) },
      { path: '/transactions', element: withSuspense(lazyPages.adminStudents, <PageWithTableLoader />) },
      {
        path: '/transactions',
        element: <TransactionSubLayout />,
        children: [
          { path: 'take-payment', element: withSuspense(lazyPages.takePayment, <TakePaymentLoader />) },
          { path: 'payments', element: withSuspense(lazyPages.adminPayments, <PageWithTableLoader />) },
        ],
      },
      { path: '/subjects', element: withSuspense(lazyPages.subjects, <PageWithTableLoader />) },
      { path: '/notices', element: withSuspense(lazyPages.adminNotices, <PageWithCardLoader />) },
      { path: '/holidays', element: withSuspense(lazyPages.holidays, <PageWithTableLoader />) },
      { path: '/terms', element: withSuspense(lazyPages.terms, <PageWithTableLoader />) },
      { path: '/admins', element: withSuspense(lazyPages.admins, <PageWithTableLoader />) },
      {
        // Teacher Panel
        path: '/teacher',
        children: [
          { index: true, element: withSuspense(lazyPages.teacherDashboard, <CardsLoader />) },
          { path: 'section/:sectionId', element: withSuspense(lazyPages.teacherSection, <PageWithCoverLoader />) },
          { path: 'notices', element: withSuspense(lazyPages.teacherNotices, <PageWithCardLoader />) },
        ],
      },
      {
        // Student Panel
        path: '/student',
        children: [
          { index: true, element: withSuspense(lazyPages.studentDashboard, <StudentDashboardPageLoader />) },
          { path: 'payments', element: withSuspense(lazyPages.studentPayments, <StudentPaymentPageLoader />) },
          { path: 'notices', element: withSuspense(lazyPages.studentNotices, <PageWithCardLoader />) },
          { path: 'results', element: withSuspense(lazyPages.studentResult, null) },
        ],
      },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
