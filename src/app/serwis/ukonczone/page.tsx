'use client';
import PrivateRoute from '../../../components/routing/PrivateRoute';
import Navigation from '../../../components/navigation/Navigation';
import RepairTable from '../../../components/repairs/RepairTable';
import SideBar from '../../../components/navigation/SideBar';
import { repairsRoutes } from '../../../components/routing/routes';
import { Box, Paper, Typography } from '@mui/material';
import { createTableSrc, finished } from '../../../util/repairsHelper';

function FinishedRepairsPage() {
  return (
    <PrivateRoute>
      <Navigation />
      <Box component="main" sx={{ overflowY: 'hidden', display: 'flex' }}>
        <SideBar baseUrl={'/serwis'} links={repairsRoutes} />
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            px: 12,
            py: 6,
            height: '100%',
            overflowY: 'auto',
            gap: 10,
          }}
        >
          <Paper
            sx={{ bgcolor: 'background.paper', borderRadius: 3, p: 8 }}
            elevation={3}
          >
            <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
              Ukończone
            </Typography>
            <RepairTable src={createTableSrc(finished)} localKey="finished" />
          </Paper>
        </Box>
      </Box>
    </PrivateRoute>
  );
}
export default FinishedRepairsPage;
