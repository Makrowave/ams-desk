'use client';
import Navigation from '../../components/navigation/Navigation';
import SideBar from '../../components/navigation/SideBar';
import PrivateRoute from '../../components/routing/PrivateRoute';
import { Box } from '@mui/material';
import { statisticsRoutes } from '../../components/routing/routes';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivateRoute>
      <Navigation />
      <SideBar baseUrl={'/statystyki'} links={statisticsRoutes} />
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: '4rem', // ml-16
          height: 'calc(100vh - 60px)',
          overflowY: 'scroll',
          px: 8,
          position: 'relative',
        }}
      >
        {children}
      </Box>
    </PrivateRoute>
  );
};

export default AdminLayout;
