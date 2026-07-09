export interface AppConfig {
  appName: string;
  appTagline: string;
  appVersion: string;
  defaultThemeMode: 'light' | 'dark';
}

function resolveThemeMode(value: string | undefined): 'light' | 'dark' {
  return value === 'dark' ? 'dark' : 'light';
}

export const appConfig: AppConfig = {
  appName: import.meta.env.VITE_APP_NAME ?? 'Housely-3D',
  appTagline: import.meta.env.VITE_APP_TAGLINE ?? 'AI-powered Building Intelligence Platform',
  appVersion: import.meta.env.VITE_APP_VERSION ?? '0.1.0',
  defaultThemeMode: resolveThemeMode(import.meta.env.VITE_DEFAULT_THEME),
};
