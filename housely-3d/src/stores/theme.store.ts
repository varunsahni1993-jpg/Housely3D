import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { appConfig } from '@/services';
import type { ThemeMode } from '@/types';

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: appConfig.defaultThemeMode,
      setMode: (mode) => set({ mode }),
      toggleMode: () =>
        set((state) => ({
          mode: state.mode === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: 'housely-3d-theme',
    },
  ),
);
