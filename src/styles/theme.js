import { createTheme } from '@mui/material';
import { Work_Sans } from 'next/font/google';

const work_sans = Work_Sans({
  subsets: ['latin'],
  weight: '400',
});

const themeOptions = {
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
    typography: work_sans.style,
  },
  // components: {
  //   MuiTableContainer: {
  //     styleOverrides: {
  //       root: {
  //         height: '100%',
  //         minHeight: 0,
  //         overflow: 'auto',
  //       },
  //     },
  //   },
  //   MuiTable: {
  //     styleOverrides: {
  //       root: {
  //         height: '100%',
  //         minHeight: 0,
  //       },
  //     },
  //   },
  //   MuiTableHead: {
  //     styleOverrides: {
  //       root: {
  //         bgcolor: '#ffffff',
  //       },
  //     },
  //   },
  //   MuiTableBody: {
  //     styleOverrides: {
  //       root: {
  //         bgcolor: '#ffffff',
  //       },
  //     },
  //   },
  //   MuiTableFooter: {
  //     styleOverrides: {
  //       root: {
  //         bgcolor: '#ffffff',
  //       },
  //     },
  //   },
  //   MuiToolbar: {
  //     styleOverrides: {
  //       root: {
  //         bgcolor: '#ffffff',
  //       },
  //     },
  //   },
  //   MuiTableCell: {
  //     styleOverrides: {
  //       root: {
  //         bgcolor: '#ffffff',
  //       },
  //       head: {
  //         bgcolor: '#ffffff',
  //       },
  //       body: {
  //         bgcolor: '#ffffff',
  //       },
  //       footer: {
  //         bgcolor: '#ffffff',
  //       },
  //     },
  //   },
  //   MuiPaper: {
  //     styleOverrides: {
  //       root: {
  //         '&.MuiTableContainer-root': {
  //           display: 'flex',
  //           flexDirection: 'column',
  //           height: '100%',
  //           minHeight: 0,
  //         },
  //       },
  //     },
  //   },
  // },
};

export const theme = createTheme(themeOptions);
