import { FaArchive } from 'react-icons/fa';
import {
  FaFlagCheckered,
  FaHourglassHalf,
  FaScrewdriverWrench,
} from 'react-icons/fa6';

export type Route = {
  name: string;
  href: string;
  links?: string[];
  icon?: React.ReactNode;
};

export const baseRoutes: Route[] = [
  { name: 'Strona Główna', href: '/', links: [''] },
  { name: 'Rowery', href: '/rowery', links: ['rowery'] },
  { name: 'Serwis', href: '/serwis', links: ['serwis'] },
  { name: 'Zarządzanie', href: '/adminlogin', links: ['adminlogin', 'admin'] },
  { name: 'Statystyki', href: '/statystyki', links: ['statystyki'] },
];

export const repairsRoutes = [
  { name: 'W trakcie', href: '', icon: <FaHourglassHalf /> },
  { name: 'Ukończone', href: '/ukonczone', icon: <FaFlagCheckered /> },
  { name: 'Wydane', href: '/wydane', icon: <FaArchive /> },
  { name: 'Części', href: '/czesci', icon: <FaScrewdriverWrench /> },
];
