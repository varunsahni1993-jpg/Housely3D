import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import { appConfig } from '@/services';
import { AppButton } from '@/components';
import { useThemeMode } from '@/hooks';

interface TopNavigationBarProps {
  onMenuClick: () => void;
}

export function TopNavigationBar({ onMenuClick }: TopNavigationBarProps) {
  const { mode, toggleMode } = useThemeMode();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{
        backdropFilter: 'blur(18px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
      }}
    >
      <Toolbar sx={{ gap: 2, minHeight: 72 }}>
        <IconButton
          onClick={onMenuClick}
          edge="start"
          sx={{ display: { xs: 'inline-flex', lg: 'none' } }}
          aria-label="open navigation"
        >
          <MenuRoundedIcon />
        </IconButton>

        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ flex: 1 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              display: { xs: 'none', sm: 'grid' },
              placeItems: 'center',
              background: 'linear-gradient(135deg, rgba(29, 78, 216, 0.16), rgba(194, 109, 31, 0.16))',
              border: '1px solid',
              borderColor: 'divider',
              color: 'primary.main',
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 700,
            }}
          >
            H3
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={700} lineHeight={1.1}>
              {appConfig.appName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {appConfig.appTagline}
            </Typography>
          </Box>
        </Stack>

        <AppButton
          variant="outlined"
          startIcon={mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
          onClick={toggleMode}
        >
          {mode === 'light' ? 'Dark mode' : 'Light mode'}
        </AppButton>

        <Avatar
          sx={{
            width: 40,
            height: 40,
            fontSize: '0.875rem',
            fontWeight: 700,
            backgroundColor: 'secondary.main',
          }}
        >
          FA
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}
