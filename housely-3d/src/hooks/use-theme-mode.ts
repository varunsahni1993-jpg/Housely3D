import { useThemeStore } from '@/stores';

export function useThemeMode() {
  const mode = useThemeStore((state) => state.mode);
  const toggleMode = useThemeStore((state) => state.toggleMode);
  const setMode = useThemeStore((state) => state.setMode);

  return {
    mode,
    toggleMode,
    setMode,
  };
}
