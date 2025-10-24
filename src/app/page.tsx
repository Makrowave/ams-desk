'use client';

import { Box, Paper, Typography } from '@mui/material';
import PrivateRoute from '../components/routing/PrivateRoute';
import FavoritesTable from '../components/table/favorite/FavoritesTable';

export default function Home() {
  return (
    <PrivateRoute>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 4,
          bgcolor: 'background.paper',
          width: '100%',
          borderRadius: 4,
        }}
        elevation={3}
      >
        <Typography variant="h4" component="h2" fontWeight={700} gutterBottom>
          Niski stan
        </Typography>
        <Box
          sx={{
            maxHeight: 600,
            boxShadow: 6,
            width: 'fit-content',
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            overflowY: 'auto',
          }}
        >
          <FavoritesTable />
        </Box>
      </Paper>
      {/* </Box> */}
    </PrivateRoute>
  );
}
