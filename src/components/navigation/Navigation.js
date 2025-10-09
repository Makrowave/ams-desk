'use client';
import { appBarHeight } from '@/styles/layout';
import NavButton from './NavButton';
import UserDropdown from './UserDropdown';
import { usePathname } from 'next/navigation';
import { Box } from '@mui/material';

const navigation = [
  { name: 'Strona Główna', href: '/', links: [''] },
  { name: 'Rowery', href: '/rowery', links: ['rowery'] },
  { name: 'Serwis', href: '/serwis', links: ['serwis'] },
  { name: 'Zarządzanie', href: '/adminlogin', links: ['adminlogin', 'admin'] },
  { name: 'Statystyki', href: '/statystyki', links: ['statystyki'] },
];

export default function Navigation() {
  const path = usePathname().split('/')[1];
  const navItems = navigation.map((item) => (
    <NavButton
      key={item.name}
      title={item.name}
      href={item.href}
      current={item.links.includes(path)}
    />
  ));

  return (
    <Box sx={{ zIndex: 40, position: 'relative', height: `${appBarHeight}px` }}>
      <div className="m-auto flex items-center bg-white h-full flex-1 shadow-md">
        <div className="flex items-center flex-1 h-full">{navItems}</div>
        <div className="ml-auto h-full">
          <UserDropdown />
        </div>
      </div>
    </Box>
  );
}
