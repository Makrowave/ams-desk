'use client';
import { appBarHeight } from '@/styles/layout';
import UserDropdown from './UserDropdown';
import { usePathname } from 'next/navigation';
import { AppBar, Tab, Tabs, Toolbar } from '@mui/material';
import Link from 'next/link';

const navigation = [
  { name: 'Strona Główna', href: '/', links: [''] },
  { name: 'Rowery', href: '/rowery', links: ['rowery'] },
  { name: 'Serwis', href: '/serwis', links: ['serwis'] },
  { name: 'Zarządzanie', href: '/adminlogin', links: ['adminlogin', 'admin'] },
  { name: 'Statystyki', href: '/statystyki', links: ['statystyki'] },
];

export default function Navigation() {
  const path = usePathname().split('/')[1];
  const activeTab = navigation.findIndex((item) => item.links.includes(path));

  return (
    <AppBar position="static" sx={{ height: `${appBarHeight}px` }}>
      <Toolbar>
        <Tabs value={activeTab} textColor="inherit" indicatorColor="secondary">
          {navigation.map((tab) => (
            <Tab
              key={tab.name}
              label={tab.name}
              href={tab.href}
              LinkComponent={Link}
              sx={{
                height: `${appBarHeight}px`,
                color: 'inherit',
                '&.Mui-selected': {
                  color: 'inherit',
                },
              }}
            />
          ))}
        </Tabs>

        <UserDropdown />
      </Toolbar>
    </AppBar>
  );
}
