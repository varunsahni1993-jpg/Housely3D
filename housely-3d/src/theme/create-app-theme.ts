import { responsiveFontSizes, createTheme, alpha } from '@mui/material/styles';
import type { ThemeMode } from '@/types';
import { appColors } from './colors';

export function createAppTheme(mode: ThemeMode) {
  const palette = appColors[mode];

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: palette.primary,
      },
      secondary: {
        main: palette.secondary,
      },
      background: {
        default: palette.pageBackground,
        paper: palette.surface,
      },
      text: {
        primary: palette.text,
        secondary: palette.mutedText,
      },
      success: {
        main: palette.success,
      },
      warning: {
        main: palette.warning,
      },
      error: {
        main: palette.error,
      },
      divider: palette.border,
    },
    shape: {
      borderRadius: 16,
    },
    spacing: 8,
    typography: {
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      h1: {
        fontFamily: '"Space Grotesk", sans-serif',
        fontWeight: 700,
      },
      h2: {
        fontFamily: '"Space Grotesk", sans-serif',
        fontWeight: 700,
      },
      h3: {
        fontFamily: '"Space Grotesk", sans-serif',
        fontWeight: 700,
      },
      h4: {
        fontFamily: '"Space Grotesk", sans-serif',
        fontWeight: 600,
      },
      h5: {
        fontFamily: '"Space Grotesk", sans-serif',
        fontWeight: 600,
      },
      h6: {
        fontFamily: '"Space Grotesk", sans-serif',
        fontWeight: 600,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            color: palette.text,
            backgroundColor: palette.pageBackground,
          },
          a: {
            color: 'inherit',
            textDecoration: 'none',
          },
          '*::selection': {
            backgroundColor: alpha(palette.primary, 0.24),
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRight: `1px solid ${palette.border}`,
          },
        },
      },
    },
  });

  return responsiveFontSizes(theme);
}
