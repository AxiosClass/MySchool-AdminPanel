import { ReactNode } from 'react';
import { IoNotificationsOff, IoWallet } from 'react-icons/io5';
import { PiStudentFill } from 'react-icons/pi';
import { FaHome, FaBook } from 'react-icons/fa';
import { FaBellConcierge, FaUserTie, FaNoteSticky } from 'react-icons/fa6';

export const sidebarLinks: TLink[] = [
  { title: 'Dashboard', url: '/', icon: <FaHome /> },
  { title: 'Classes', url: '/classes', icon: <FaBook /> },
  { title: 'Teachers', url: '/teachers', icon: <FaUserTie /> },
  { title: 'Students', url: '/students', icon: <PiStudentFill /> },
  { title: 'Transactions', url: '/transactions/take-payment', icon: <IoWallet /> },
  { title: 'Notice', url: '/notices', icon: <FaBellConcierge /> },
  { title: 'Holidays', url: '/holidays', icon: <IoNotificationsOff /> },
  { title: 'Exams', url: '/exams', icon: <FaNoteSticky /> },
];

export const isActive = (url: string, pathname: string) => {
  if (url === pathname) return true;
  if (url === '/classes' && pathname.startsWith('/class')) return true;
  if (url.startsWith('/transactions') && pathname.startsWith('/transactions')) return true;
};

// types
type TLink = { title: string; url: string; icon: ReactNode };
