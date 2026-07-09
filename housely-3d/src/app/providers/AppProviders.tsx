import type { PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { AppThemeProvider } from '@/theme';
import { GlobalErrorBoundary } from './GlobalErrorBoundary';
import { queryClient } from '@/services';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <BrowserRouter>
          <GlobalErrorBoundary>{children}</GlobalErrorBoundary>
        </BrowserRouter>
      </AppThemeProvider>
    </QueryClientProvider>
  );
}
