import { ReactNode } from 'react';

import { FaBellConcierge } from 'react-icons/fa6';
import { IoCalendarSharp } from 'react-icons/io5';
import { RiAccountBoxFill } from 'react-icons/ri';
import { HiUsers } from 'react-icons/hi2';
import { FaHome, FaBook } from 'react-icons/fa';

interface ILink {
  title: string;
  url: string;
  icon: ReactNode;
}

export const links: ILink[] = [
  { title: 'Dashboard', url: '/', icon: <FaHome /> },
  { title: 'Classes', url: '/classes', icon: <FaBook /> },
  { title: 'Notice', url: '/notices', icon: <FaBellConcierge /> },
  { title: 'Calender', url: '/calender', icon: <IoCalendarSharp /> },
  { title: 'Account', url: '/account', icon: <RiAccountBoxFill /> },
  { title: 'Employees', url: '/employees', icon: <HiUsers /> },
];
