'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './AuthProvider';
import { SavedDataProvider } from './SavedDataProvider';
import { ThemeProvider } from '@mui/material';
import { theme } from '@/styles/theme';

export default function ProviderWrapper({ children }) {
  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <SavedDataProvider>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ThemeProvider>
      </SavedDataProvider>
    </AuthProvider>
  );
}
