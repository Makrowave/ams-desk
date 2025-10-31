'use client';
import { appBarHeight } from '../../styles/layout';
import UserDropdown from './UserDropdown';
import { usePathname } from 'next/navigation';
import { AppBar, Tab, Tabs, Toolbar } from '@mui/material';
import Link from 'next/link';
import { baseRoutes } from '../routing/routes';

const Navigation = () => {
  const pathname = usePathname();
  const path = pathname.split('/')[1] ?? pathname.split('/')[0]!;
  const activeTab = baseRoutes.findIndex((item) => item.links?.includes(path));

  // Implement mechanism to check if user has admin rights
  // const { isAdmin } = useAuth();
  // const routes = baseRoutes.filter((route) =>
  //   isAdmin ? true : route.href !== '/adminlogin',
  // );

  if (pathname === '/login') return null;

  return (
    <AppBar
      elevation={6}
      position="fixed"
      sx={{
        height: `${appBarHeight}px`,
      }}
    >
      <Toolbar>
        <Tabs value={activeTab} textColor="inherit" indicatorColor="secondary">
          {baseRoutes.map((tab) => (
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
};

export default Navigation;
