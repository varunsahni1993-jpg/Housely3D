import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/layouts';
import { LoadingScreen } from '@/components';

const HomePage = lazy(() => import('@/pages/home-page'));
const DashboardPage = lazy(() => import('@/pages/dashboard-page'));
const ProjectsPage = lazy(() => import('@/pages/projects-page'));
const ProjectWorkspacePage = lazy(() => import('@/pages/project-workspace-page'));
const ViewerPage = lazy(() => import('@/pages/viewer-page'));
const SettingsPage = lazy(() => import('@/pages/settings-page'));
const NotFoundPage = lazy(() => import('@/pages/not-found-page'));

export function AppRouter() {
  return (
    <Suspense fallback={<LoadingScreen fullScreen message="Loading Housely-3D workspace..." />}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:projectId" element={<ProjectWorkspacePage />} />
          <Route path="viewer" element={<ViewerPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="not-found" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
