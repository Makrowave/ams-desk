'use client';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './AuthProvider';
import { SavedDataProvider } from './SavedDataProvider';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../styles/theme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function ProviderWrapper({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthProvider>
        <SavedDataProvider>
          <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </ThemeProvider>
        </SavedDataProvider>
      </AuthProvider>
    </LocalizationProvider>
  );
}
