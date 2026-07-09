import { AppProviders } from '@/app/providers';
import { AppRouter } from '@/router';

export function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}
