import { createTheme, ThemeOptions } from '@mui/material';
import { Work_Sans } from 'next/font/google';

const work_sans = Work_Sans({
  subsets: ['latin'],
  weight: '400',
});

export const themeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#00B873',
      light: '#5ED0A5',
      dark: '#008E59',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#006D77',
      light: '#83C5BE',
      dark: '#004C4F',
    },
    background: {
      default: '#E8F3ED',
      paper: '#FFFFFF',
    },
    deliveryStatus: {
      pending: '#FF9800',
      inProgress: '#2196F3',
      completed: '#4CAF50',
      cancelled: '#F44336',
    },
  },
  typography: work_sans.style,
} as const satisfies ThemeOptions;

export const theme = createTheme(themeOptions);
