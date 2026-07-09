import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { navigationItems } from '@/router';
import { toBreadcrumbItems } from '@/utils';

export function useBreadcrumbs() {
  const location = useLocation();

  return useMemo(() => toBreadcrumbItems(location.pathname, navigationItems), [location.pathname]);
}
