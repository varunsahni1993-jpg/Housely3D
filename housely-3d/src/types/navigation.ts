import type { ElementType } from 'react';

export interface NavigationItem {
  label: string;
  path: string;
  description: string;
  icon: ElementType;
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
}
