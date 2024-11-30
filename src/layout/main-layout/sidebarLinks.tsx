import { ReactNode } from 'react';
import { HiUsers } from 'react-icons/hi2';
import { IoWallet } from 'react-icons/io5';
import { PiStudentFill } from 'react-icons/pi';
import { FaHome, FaBook } from 'react-icons/fa';
import { IoCalendarSharp } from 'react-icons/io5';
import { FaBellConcierge, FaUserTie } from 'react-icons/fa6';

interface ILink {
  title: string;
  url: string;
  icon: ReactNode;
}

export const sidebarLinks: ILink[] = [
  { title: 'Dashboard', url: '/', icon: <FaHome /> },
  { title: 'Classes', url: '/classes', icon: <FaBook /> },
  { title: 'Teachers', url: '/teachers', icon: <FaUserTie /> },
  { title: 'Students', url: '/students', icon: <PiStudentFill /> },
  { title: 'Transactions', url: '/transactions/take-payment', icon: <IoWallet /> },
  { title: 'Staffs', url: '/staffs', icon: <HiUsers /> },
  { title: 'Notice', url: '/notices', icon: <FaBellConcierge /> },
  { title: 'Calender', url: '/calender', icon: <IoCalendarSharp /> },
];

export const isActive = (url: string, pathname: string) => {
  if (url === pathname) return true;
  if (url === '/classes' && pathname.startsWith('/class')) return true;
  if (url.startsWith('/transactions') && pathname.startsWith('/transactions')) return true;
};
