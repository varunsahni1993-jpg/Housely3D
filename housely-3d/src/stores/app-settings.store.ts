import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppDensity } from '@/types';

interface AppSettingsState {
  appNameOverride?: string;
  contentDensity: AppDensity;
  defaultLandingPage: string;
  setContentDensity: (density: AppDensity) => void;
  setDefaultLandingPage: (path: string) => void;
  setAppNameOverride: (name?: string) => void;
}

export const useAppSettingsStore = create<AppSettingsState>()(
  persist(
    (set) => ({
      appNameOverride: undefined,
      contentDensity: 'comfortable',
      defaultLandingPage: '/dashboard',
      setContentDensity: (contentDensity) => set({ contentDensity }),
      setDefaultLandingPage: (defaultLandingPage) => set({ defaultLandingPage }),
      setAppNameOverride: (appNameOverride) => set({ appNameOverride }),
    }),
    {
      name: 'housely-3d-app-settings',
    },
  ),
);
