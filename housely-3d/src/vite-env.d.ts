/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME?: string;
  readonly VITE_APP_TAGLINE?: string;
  readonly VITE_APP_VERSION?: string;
  readonly VITE_DEFAULT_THEME?: 'light' | 'dark';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
