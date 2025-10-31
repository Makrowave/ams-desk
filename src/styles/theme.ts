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
  },
  typography: work_sans.style,
};

export const theme = createTheme(themeOptions);
