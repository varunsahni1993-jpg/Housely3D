import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { useMemo, type PropsWithChildren } from 'react';
import { createAppTheme } from '@/theme/create-app-theme';
import { useThemeStore } from '@/stores';

export function AppThemeProvider({ children }: PropsWithChildren) {
  const mode = useThemeStore((state) => state.mode);
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <GlobalStyles
        styles={{
          html: {
            height: '100%',
          },
          body: {
            minHeight: '100%',
            backgroundImage:
              mode === 'dark'
                ? 'radial-gradient(circle at top left, rgba(124, 156, 255, 0.18), transparent 40%), linear-gradient(180deg, #0b1220 0%, #10192a 100%)'
                : 'radial-gradient(circle at top left, rgba(29, 78, 216, 0.11), transparent 40%), linear-gradient(180deg, #f4f1ea 0%, #fbfaf7 100%)',
            backgroundAttachment: 'fixed',
          },
          '#root': {
            minHeight: '100%',
          },
        }}
      />
      {children}
    </ThemeProvider>
  );
}
