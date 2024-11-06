import { ReactNode } from 'react';

import { FaBellConcierge } from 'react-icons/fa6';
import { IoCalendarSharp } from 'react-icons/io5';
import { RiAccountBoxFill } from 'react-icons/ri';
import { FaHome, FaBook } from 'react-icons/fa';
import { HiUsers } from 'react-icons/hi2';

interface ILink {
  title: string;
  url: string;
  icon: ReactNode;
}

export const sidebarLinks: ILink[] = [
  { title: 'Dashboard', url: '/', icon: <FaHome /> },
  { title: 'Classes', url: '/classes', icon: <FaBook /> },
  { title: 'Notice', url: '/notices', icon: <FaBellConcierge /> },
  { title: 'Calender', url: '/calender', icon: <IoCalendarSharp /> },
  { title: 'Account', url: '/account', icon: <RiAccountBoxFill /> },
  { title: 'Staffs', url: '/staffs', icon: <HiUsers /> },
];
