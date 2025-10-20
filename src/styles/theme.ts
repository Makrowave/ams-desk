import { createTheme, ThemeOptions } from '@mui/material';
import { Work_Sans } from 'next/font/google';

const work_sans = Work_Sans({
  subsets: ['latin'],
  weight: '400',
});

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#00B873', // vivid yet balanced green
      light: '#5ED0A5',
      dark: '#008E59',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#006D77', // muted teal, contrasts green nicely
      light: '#83C5BE',
      dark: '#004C4F',
    },
    background: {
      default: '#E8F3ED', // soft desaturated green
      paper: '#FFFFFF',
    },
  },
  typography: work_sans.style,
};

export const theme = createTheme(themeOptions);
