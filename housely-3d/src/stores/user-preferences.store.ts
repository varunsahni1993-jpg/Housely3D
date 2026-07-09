import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserPreferencesState {
  reducedMotion: boolean;
  showTips: boolean;
  preferredLanguage: string;
  setReducedMotion: (value: boolean) => void;
  setShowTips: (value: boolean) => void;
  setPreferredLanguage: (value: string) => void;
}

export const useUserPreferencesStore = create<UserPreferencesState>()(
  persist(
    (set) => ({
      reducedMotion: false,
      showTips: true,
      preferredLanguage: 'en',
      setReducedMotion: (reducedMotion) => set({ reducedMotion }),
      setShowTips: (showTips) => set({ showTips }),
      setPreferredLanguage: (preferredLanguage) => set({ preferredLanguage }),
    }),
    {
      name: 'housely-3d-user-preferences',
    },
  ),
);
