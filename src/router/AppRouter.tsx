import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '@/layout/main-layout';
import { lazy, Suspense } from 'react';
import { TransactionSubLayout } from '@/layout/transaction-sub-layout';

const ClassesPage = lazy(() => import('@/pages/classes'));
const StaffsPage = lazy(() => import('@/pages/staffs'));
const LoginPage = lazy(() => import('@/pages/login'));
const HomePage = lazy(() => import('@/pages/home'));
const ClassDetailsPage = lazy(() => import('@/pages/class/[classId]'));
const TeachersPage = lazy(() => import('@/pages/teachers'));
const StudentsPage = lazy(() => import('@/pages/students'));
const PaymentsPage = lazy(() => import('@/pages/transactions/payments'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/classes', element: <ClassesPage /> },
      { path: '/staffs', element: <StaffsPage /> },
      { path: '/class/:classId', element: <ClassDetailsPage /> },
      { path: '/teachers', element: <TeachersPage /> },
      { path: '/students', element: <StudentsPage /> },
      {
        path: '/transactions',
        element: <TransactionSubLayout />,
        children: [
          {
            index: true,
            path: 'payments',
            element: <PaymentsPage />,
          },
        ],
      },
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
