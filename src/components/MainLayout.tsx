'use client';

import { Box } from '@mui/material';
import { ReactNode } from 'react';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box sx={{ bgcolor: 'background.default' }} component={'body'}>
      {children}
    </Box>
  );
};

export default MainLayout;
