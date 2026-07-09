import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { navigationItems } from '@/router';
import { appConfig } from '@/services';
import { useSidebarStore } from '@/stores';

interface SidebarProps {
  desktop: boolean;
}

const drawerWidth = 280;
const collapsedWidth = 96;

export function Sidebar({ desktop }: SidebarProps) {
  const location = useLocation();
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);
  const isMobileOpen = useSidebarStore((state) => state.isMobileOpen);
  const closeMobile = useSidebarStore((state) => state.closeMobile);

  const drawerWidthValue = desktop && isCollapsed ? collapsedWidth : drawerWidth;

  const content = (
    <Stack sx={{ height: '100%' }}>
      <Box sx={{ px: 2.5, py: 2.5 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              display: 'grid',
              placeItems: 'center',
              background: 'linear-gradient(135deg, rgba(29, 78, 216, 0.18), rgba(15, 118, 110, 0.18))',
              border: '1px solid',
              borderColor: 'divider',
              color: 'primary.main',
              fontWeight: 700,
              fontFamily: 'Space Grotesk, sans-serif',
            }}
          >
            H3
          </Box>
          {!desktop || !isCollapsed ? (
            <Box>
              <Typography variant="subtitle1" fontWeight={700}>
                {appConfig.appName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Application shell
              </Typography>
            </Box>
          ) : null}
        </Stack>
      </Box>

      <Divider />

      <List sx={{ px: 1.25, py: 1 }}>
        {navigationItems.map((item) => {
          const active = item.path === '/'
            ? location.pathname === '/'
            : location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
          const Icon = item.icon;

          return (
            <ListItemButton
              key={item.path}
              component={RouterLink}
              to={item.path}
              selected={active}
              onClick={() => {
                if (!desktop) {
                  closeMobile();
                }
              }}
              sx={{
                borderRadius: 2,
                mb: 0.75,
                px: desktop && isCollapsed ? 1.5 : 2,
                minHeight: 52,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: desktop && isCollapsed ? 0 : 40,
                  justifyContent: 'center',
                  color: active ? 'primary.main' : 'text.secondary',
                }}
              >
                <Icon fontSize="small" />
              </ListItemIcon>
              {!desktop || !isCollapsed ? (
                <ListItemText
                  primary={item.label}
                  secondary={item.description}
                  primaryTypographyProps={{ fontWeight: 600 }}
                  secondaryTypographyProps={{ noWrap: true }}
                />
              ) : null}
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ mt: 'auto', px: 2.5, pb: 2.5 }}>
        <Divider sx={{ mb: 2 }} />
        {!desktop || !isCollapsed ? (
          <Typography variant="caption" color="text.secondary">
            Designed for structured delivery, traceability, and future scaling.
          </Typography>
        ) : null}
      </Box>
    </Stack>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={isMobileOpen}
        onClose={closeMobile}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {content}
      </Drawer>
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', lg: 'block' },
          width: drawerWidthValue,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidthValue,
            boxSizing: 'border-box',
            overflowX: 'hidden',
          },
        }}
      >
        {content}
      </Drawer>
    </>
  );
}
