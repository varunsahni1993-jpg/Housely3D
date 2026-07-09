import type { ComponentType } from 'react';

export interface NavigationItem {
  label: string;
  path: string;
  description: string;
  icon: ComponentType<{ fontSize?: 'inherit' | 'small' | 'medium' | 'large' }>;
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
}
