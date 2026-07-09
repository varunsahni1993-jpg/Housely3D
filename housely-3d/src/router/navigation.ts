import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import type { NavigationItem } from '@/types';

export const navigationItems: NavigationItem[] = [
  {
    label: 'Home',
    path: '/',
    description: 'Workspace overview and shell landing page',
    icon: HomeRoundedIcon,
  },
  {
    label: 'Dashboard',
    path: '/dashboard',
    description: 'Operational workspace summary',
    icon: DashboardRoundedIcon,
  },
  {
    label: 'Projects',
    path: '/projects',
    description: 'Project lifecycle workspace',
    icon: MapRoundedIcon,
  },
  {
    label: 'Viewer',
    path: '/viewer',
    description: 'Future 3D viewer and model preview surface',
    icon: VisibilityRoundedIcon,
  },
  {
    label: 'Settings',
    path: '/settings',
    description: 'Preferences and shell configuration',
    icon: SettingsRoundedIcon,
  },
];
