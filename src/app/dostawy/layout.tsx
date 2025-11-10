'use client';
import { Box } from '@mui/material';
import SideBar from '../../components/navigation/SideBar';
import { deliveryRoutes } from '../../components/routing/routes';
import { drawerWidthCollapsed } from '../../styles/layout';

const DeliveryLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SideBar baseUrl={'/dostawy'} links={deliveryRoutes} />
      <Box
        component={'main'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflowY: 'auto',
          mx: `${drawerWidthCollapsed + 10}px`,
          my: '30px',
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default DeliveryLayout;
