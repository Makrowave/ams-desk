'use client';
import { Box } from '@mui/material';
import { appBarHeight } from '../../styles/layout';
import Navigation from './Navigation';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        margin: 0,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      component={'body'}
    >
      <Navigation />
      <Box sx={{ mt: `${appBarHeight}px` }}>{children}</Box>
    </Box>
  );
};

export default Layout;
