import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { navigationItems } from '@/router';
import { useProjectWorkspaceStore } from '@/features/projects/store';
import { toBreadcrumbItems } from '@/utils';

export function useBreadcrumbs() {
  const location = useLocation();
  const projectName = useProjectWorkspaceStore((state) => state.activeProject?.name);

  return useMemo(() => toBreadcrumbItems(location.pathname, navigationItems, projectName), [location.pathname, projectName]);
}
