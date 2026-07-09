import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Outlet } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import { AppBreadcrumbs, PageContainer } from '@/components';
import { useSidebar } from '@/hooks';
import { Sidebar } from './sidebar';
import { TopNavigationBar } from './top-navigation-bar';

export function AppLayout() {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('lg'));
  const { openMobile } = useSidebar();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex' }}>
      <Sidebar desktop={desktop} />
      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <TopNavigationBar onMenuClick={openMobile} />
        <Box component="main" sx={{ flex: 1 }}>
          <PageContainer maxWidth="xl">
            <Stack spacing={2}>
              <AppBreadcrumbs />
              <Outlet />
            </Stack>
          </PageContainer>
        </Box>
      </Box>
    </Box>
  );
}
