import type { BreadcrumbItem, NavigationItem } from '@/types';

export function toBreadcrumbItems(pathname: string, navigationItems: NavigationItem[]): BreadcrumbItem[] {
  const matchedItem = navigationItems.find((item) => item.path === pathname);

  if (matchedItem) {
    return [
      { label: 'Home', path: '/' },
      { label: matchedItem.label },
    ];
  }

  if (pathname === '/' || pathname === '') {
    return [{ label: 'Home' }];
  }

  if (pathname === '/not-found') {
    return [
      { label: 'Home', path: '/' },
      { label: '404' },
    ];
  }

  return [
    { label: 'Home', path: '/' },
    { label: 'Workspace' },
  ];
}
