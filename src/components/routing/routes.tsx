import { FaArchive } from 'react-icons/fa';
import {
  FaFlagCheckered,
  FaHourglassHalf,
  FaScrewdriverWrench,
  FaBicycle,
  FaBuilding,
  FaCircleInfo,
  FaHouse,
  FaIndustry,
  FaList,
  FaPalette,
  FaRegCircle,
  FaUser,
  FaWrench,
  FaChartSimple,
  FaClock,
  FaMoneyBill,
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

export const repairsRoutes: Route[] = [
  { name: 'W trakcie', href: '', icon: <FaHourglassHalf /> },
  { name: 'Ukończone', href: '/ukonczone', icon: <FaFlagCheckered /> },
  { name: 'Wydane', href: '/wydane', icon: <FaArchive /> },
  { name: 'Części', href: '/czesci', icon: <FaScrewdriverWrench /> },
];

export const adminRoutes: Route[] = [
  { name: 'Strona główna', href: '', icon: <FaHouse /> },
  { name: 'Rowery', href: '/rowery', icon: <FaBicycle /> },
  { name: 'Pracownicy', href: '/pracownicy', icon: <FaUser /> },
  { name: 'Statusy', href: '/statusy', icon: <FaCircleInfo /> },
  { name: 'Kolory', href: '/kolory', icon: <FaPalette /> },
  { name: 'Koła', href: '/kola', icon: <FaRegCircle /> },
  { name: 'Producenci', href: '/producenci', icon: <FaIndustry /> },
  { name: 'Kategorie', href: '/kategorie', icon: <FaList /> },
  { name: 'Miejsca', href: '/miejsca', icon: <FaBuilding /> },
  { name: 'Serwis', href: '/serwis', icon: <FaWrench /> },
];

export const statisticsRoutes: Route[] = [
  { name: 'Strona główna', href: '', icon: <FaHouse /> },
  { name: 'Historia', href: '/historia', icon: <FaClock /> },
  { name: 'Serwis', href: '/serwis', icon: <FaScrewdriverWrench /> },
  { name: 'Sprzedaż', href: '/sprzedaz', icon: <FaMoneyBill /> },
  { name: 'Kategorie', href: '/kategorie', icon: <FaChartSimple /> },
];
