import { useSidebarStore } from '@/stores';

export function useSidebar() {
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);
  const isMobileOpen = useSidebarStore((state) => state.isMobileOpen);
  const toggleCollapsed = useSidebarStore((state) => state.toggleCollapsed);
  const openMobile = useSidebarStore((state) => state.openMobile);
  const closeMobile = useSidebarStore((state) => state.closeMobile);

  return {
    isCollapsed,
    isMobileOpen,
    toggleCollapsed,
    openMobile,
    closeMobile,
  };
}
