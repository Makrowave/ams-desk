'use client';
import PrivateRoute from '../../../components/routing/PrivateRoute';
import Navigation from '../../../components/navigation/Navigation';
import RepairTable from '../../../components/repairs/RepairTable';
import SideBar from '../../../components/navigation/SideBar';
import { repairsRoutes } from '../../../components/routing/routes';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { createTableSrc, finished } from '../../../util/repairsHelper';
import { drawerWidthCollapsed } from '../../../styles/layout';

function FinishedRepairsPage() {
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
            <Typography variant="h4">Ukończone</Typography>
            <RepairTable src={createTableSrc(finished)} localKey="finished" />
          </Paper>
        </Stack>
      </Box>
    </PrivateRoute>
  );
}
export default FinishedRepairsPage;
