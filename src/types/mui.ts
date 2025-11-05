import { PaletteOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    deliveryStatus: {
      pending: string;
      inProgress: string;
      completed: string;
      cancelled: string;
    };
  }
  interface PaletteOptions {
    deliveryStatus: {
      pending: string;
      inProgress: string;
      completed: string;
      cancelled: string;
    };
  }
}
