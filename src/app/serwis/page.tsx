'use client';
import PrivateRoute from '../../components/routing/PrivateRoute';
import Navigation from '../../components/navigation/Navigation';
import RepairTable from '../../components/repairs/RepairTable';
import SideBar from '../../components/navigation/SideBar';
import { repairsRoutes } from '../../components/routing/routes';
import { createTableSrc, inProgress } from '../../util/repairsHelper';
import { drawerWidthCollapsed } from '../../styles/layout';
import { Box, Stack, Paper, Typography } from '@mui/material';

function RepairsPage() {
  return (
    <PrivateRoute>
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
            <Typography variant="h4">W trakcie</Typography>
            <RepairTable
              src={createTableSrc(inProgress)}
              localKey="inProgress"
              addButton
            />
          </Paper>
        </Stack>
      </Box>
    </PrivateRoute>
  );
}

export default RepairsPage;
