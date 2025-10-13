'use client';

import { Box } from '@mui/material';

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ bgcolor: 'background.default' }} component={'body'}>
      {children}
    </Box>
  );
};

export default MainLayout;
