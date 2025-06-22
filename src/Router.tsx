import {
  CardsLoader,
  PageWithCoverLoader,
  PageWithTableLoader,
  PageWithCardLoader,
  StudentProfileSkeleton,
  TakePaymentCardSkeleton,
} from './components/loader';

import { lazy, LazyExoticComponent, ReactNode, Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import { StudentPaymentPageLoader } from './pages/(student)/payments/StudentPaymentPageLoader';
import { DashboardPageLoader } from './pages/home/DashboardLoader';
import { MainLayout } from './layout/main-layout';
import LoginPage from './pages/login';
import { USER_ROLE } from './lib/types';
import { useAuthStore } from './stores/auth';

export const Router = () => <RouterProvider router={router} />;

const lazyPages = {
  // admin
  home: lazy(() => import('@/pages/home')),
  adminClasses: lazy(() => import('@/pages/classes')),
  adminSection: lazy(() => import('@/pages/section')),
  adminTeachers: lazy(() => import('@/pages/teachers')),
  adminStudents: lazy(() => import('@/pages/students')),
  adminClassDetails: lazy(() => import('@/pages/class-details')),
  takePayment: lazy(() => import('@/pages/take-payment')),
  adminPayments: lazy(() => import('@/pages/payments')),
  adminNotices: lazy(() => import('@/pages/notices')),
  subjects: lazy(() => import('@/pages/subjects')),
  holidays: lazy(() => import('@/pages/holidays')),
  terms: lazy(() => import('@/pages/terms')),
  admins: lazy(() => import('@/pages/admins')),
  dues: lazy(() => import('@/pages/dues')),

  // teacher
  teacherDashboard: lazy(() => import('@/pages/(teacher)/teacher-dashboard')),
  teacherSection: lazy(() => import('@/pages/(teacher)/teacher-section')),
  teacherNotices: lazy(() => import('@/pages/(teacher)/notices')),

  // student
  studentDashboard: lazy(() => import('@/pages/(student)/student-dashboard')),
  studentPayments: lazy(() => import('@/pages/(student)/payments')),
  studentNotices: lazy(() => import('@/pages/(student)/notices')),
  studentResult: lazy(() => import('@/pages/(student)/result')),
  studentSection: lazy(() => import('@/pages/(student)/student-section')),

  // for teacher and admin
  studentProfile: lazy(() => import('@/pages/student-profile')),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withSuspense = (Component: LazyExoticComponent<any>, FallBack: ReactNode) => (
  <Suspense fallback={FallBack}>
    <Component />
  </Suspense>
);

type TAuthGuardProps = { roles: USER_ROLE[] };
const AuthGuard = ({ roles }: TAuthGuardProps) => {
  const userRole = useAuthStore((state) => state.user?.role as USER_ROLE);

  const NAVIGATION_CONFIG: Record<string, string> = {
    admin: '/',
    teacher: '/teacher',
    student: '/student',
    ADMIN: '/',
    TEACHER: '/teacher',
    STUDENT: '/student',
    SUPER_ADMIN: '/',
  };

  if (!userRole) return <Navigate to={'/login'} replace />;
  if (!roles.includes(userRole)) return <Navigate to={NAVIGATION_CONFIG[userRole]} replace />;

  return <Outlet />;
};

const router = createBrowserRouter([
  // auth
  { path: '/login', element: <LoginPage /> },
  // main layout
  {
    path: '/',
    element: <MainLayout />,
    children: [
      // admins
      {
        element: <AuthGuard roles={[USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN]} />,
        children: [
          { index: true, element: withSuspense(lazyPages.home, <DashboardPageLoader />) },
          {
            path: '/classes',
            element: withSuspense(lazyPages.adminClasses, <PageWithCardLoader size={3} />),
          },
          {
            path: '/class/:classId',
            element: withSuspense(lazyPages.adminClassDetails, <PageWithCardLoader />),
          },
          {
            path: '/section/:sectionId',
            element: withSuspense(lazyPages.adminSection, <PageWithTableLoader />),
          },
          { path: '/teachers', element: withSuspense(lazyPages.adminTeachers, <PageWithTableLoader />) },
          { path: '/students', element: withSuspense(lazyPages.adminStudents, <PageWithTableLoader />) },
          { path: '/transactions', element: withSuspense(lazyPages.adminStudents, <PageWithTableLoader />) },
          {
            path: '/transactions/take-payment',
            element: withSuspense(lazyPages.takePayment, <TakePaymentCardSkeleton />),
          },
          {
            path: '/transactions/payments',
            element: withSuspense(lazyPages.adminPayments, <PageWithTableLoader />),
          },
          {
            path: '/transactions/dues',
            element: withSuspense(lazyPages.dues, <CardsLoader />),
          },
          { path: '/subjects', element: withSuspense(lazyPages.subjects, <PageWithTableLoader />) },
          {
            path: '/notices',
            element: withSuspense(lazyPages.adminNotices, <PageWithCardLoader size={3} />),
          },
          { path: '/holidays', element: withSuspense(lazyPages.holidays, <PageWithTableLoader />) },
          { path: '/terms', element: withSuspense(lazyPages.terms, <PageWithTableLoader />) },
          {
            path: '/admins',
            element: <AuthGuard roles={[USER_ROLE.SUPER_ADMIN]} />,
            children: [{ index: true, element: withSuspense(lazyPages.admins, <PageWithTableLoader />) }],
          },
        ],
      },
      {
        // Teacher Panel
        path: '/teacher',
        element: <AuthGuard roles={[USER_ROLE.TEACHER]} />,
        children: [
          { index: true, element: withSuspense(lazyPages.teacherDashboard, <CardsLoader />) },
          {
            path: 'section/:sectionId',
            element: withSuspense(lazyPages.teacherSection, <PageWithCoverLoader />),
          },
          {
            path: 'notices',
            element: withSuspense(lazyPages.teacherNotices, <PageWithCardLoader size={3} />),
          },
        ],
      },
      {
        // Student Panel
        path: '/student',
        element: <AuthGuard roles={[USER_ROLE.STUDENT]} />,
        children: [
          { index: true, element: withSuspense(lazyPages.studentDashboard, <StudentProfileSkeleton />) },
          {
            path: 'payments',
            element: withSuspense(lazyPages.studentPayments, <StudentPaymentPageLoader />),
          },
          { path: 'notices', element: withSuspense(lazyPages.studentNotices, <PageWithCardLoader />) },
          { path: 'results', element: withSuspense(lazyPages.studentResult, <PageWithTableLoader />) },
          { path: 'section', element: withSuspense(lazyPages.studentSection, <PageWithCoverLoader />) },
        ],
      },
      {
        path: '/student/:studentId',
        element: withSuspense(lazyPages.studentProfile, <StudentProfileSkeleton />),
      },
    ],
  },
]);
