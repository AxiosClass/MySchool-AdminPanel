import { USER_ROLE } from '@/lib/types';
import { PiStudentFill } from 'react-icons/pi';
import { FaHome, FaBook } from 'react-icons/fa';
import { IoNotificationsOff, IoWallet } from 'react-icons/io5';
import { FaBellConcierge, FaUserTie, FaNoteSticky } from 'react-icons/fa6';
import { useAuthStore } from '@/stores/auth';

const adminRoles = [USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN];

export const useSidebarLinks = () => {
  const user = useAuthStore((state) => state.user);

  if (adminRoles.includes(user!.role))
    return [
      { title: 'Dashboard', url: '/', icon: <FaHome /> },
      { title: 'Classes', url: '/classes', icon: <FaBook /> },
      { title: 'Teachers', url: '/teachers', icon: <FaUserTie /> },
      { title: 'Students', url: '/students', icon: <PiStudentFill /> },
      { title: 'Transactions', url: '/transactions/take-payment', icon: <IoWallet /> },
      { title: 'Notice', url: '/notices', icon: <FaBellConcierge /> },
      { title: 'Holidays', url: '/holidays', icon: <IoNotificationsOff /> },
      { title: 'Exams', url: '/exams', icon: <FaNoteSticky /> },
    ];
  else if (user?.role === USER_ROLE.TEACHER)
    return [
      { title: 'Home', url: '/teacher', icon: <FaHome /> },
      { title: 'Notice', url: '/teacher/notices', icon: <FaBellConcierge /> },
    ];
  else if (user?.role === USER_ROLE.STUDENT)
    return [
      { title: 'Home', url: '/student', icon: <FaHome /> },
      { title: 'Payments', url: '/student/payments', icon: <IoWallet /> },
      { title: 'Notice', url: '/student/notices', icon: <FaBellConcierge /> },
    ];
};

export const isActive = (url: string, pathname: string) => {
  if (url === pathname) return true;
  if (url === '/classes') return partialMatch(['/classes', '/class'], pathname);
  if (url === '/transactions') return partialMatch(['/transactions'], pathname);
  if (url === '/teacher') return partialMatch(['/teacher', '/classroom'], pathname) && pathname !== '/teacher/notices';
};

const partialMatch = (urls: string[], pathname: string): boolean => {
  return urls.some((url) => pathname.startsWith(url));
};
