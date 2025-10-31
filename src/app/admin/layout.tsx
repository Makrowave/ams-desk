'use client';
import { Stack } from '@mui/material';
import Navigation from '../../components/navigation/Navigation';
import SideBar from '../../components/navigation/SideBar';
import AdminRoute from '../../components/routing/AdminRoute';
import { adminRoutes } from '../../components/routing/routes';
import { drawerWidthCollapsed } from '../../styles/layout';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminRoute>
      <SideBar baseUrl={'/admin'} links={adminRoutes} />
      <Stack sx={{ mx: `${drawerWidthCollapsed + 30}px`, my: '30px' }}>
        {children}
      </Stack>
    </AdminRoute>
  );
};

export default AdminLayout;
