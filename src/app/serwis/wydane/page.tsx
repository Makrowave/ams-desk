'use client';
import PrivateRoute from '../../../components/routing/PrivateRoute';
import RepairTable from '../../../components/repairs/RepairTable';
import SideBar from '../../../components/navigation/SideBar';
import { repairsRoutes } from '../../../components/routing/routes';
import { collected, createTableSrc } from '../../../util/repairsHelper';
import Navigation from '../../../components/navigation/Navigation';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { drawerWidthCollapsed } from '../../../styles/layout';

function CollectedRepairsPage() {
  return (
    <PrivateRoute>
      <Navigation />
      <Box component={'main'} sx={{ overflowY: 'hidden' }}>
        <SideBar baseUrl={'/serwis'} links={repairsRoutes} />
        <Stack sx={{ mx: `${drawerWidthCollapsed + 30}px`, my: '30px' }}>
          <Paper
            sx={{
              flex: 1,
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <Typography variant="h4">Wydane</Typography>
            <RepairTable src={createTableSrc(collected)} localKey="collected" />
          </Paper>
        </Stack>
      </Box>
    </PrivateRoute>
  );
}

export default CollectedRepairsPage;
