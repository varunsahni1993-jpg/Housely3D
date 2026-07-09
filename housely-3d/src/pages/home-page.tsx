import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { AppButton, PageHeader, SectionCard } from '@/components';

export default function HomePage() {
  return (
    <Stack spacing={3}>
      <PageHeader
        eyebrow="Housely-3D Shell"
        title="Welcome to the production application foundation"
        description="This shell establishes the routing, layout, theme, state, and component architecture that every future Housely-3D feature will extend."
        actions={
          <Stack direction="row" spacing={1.5}>
            <AppButton component={RouterLink} to="/dashboard" variant="contained" startIcon={<DashboardRoundedIcon />}>
              Open dashboard
            </AppButton>
            <AppButton component={RouterLink} to="/projects" variant="outlined" startIcon={<PlayCircleRoundedIcon />}>
              Explore projects
            </AppButton>
          </Stack>
        }
      />

      <SectionCard
        title="What this shell provides"
        description="A clean base for pages, layout, state, and navigation."
      >
        <Stack spacing={1.5}>
          <Typography variant="body2" color="text.secondary">
            • Route-based code splitting for each major workspace surface.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Responsive navigation with a sidebar drawer and top bar.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Centralized theme, preferences, and shared UI primitives.
          </Typography>
        </Stack>
      </SectionCard>

      <SectionCard
        title="How to extend the shell"
        description="Future features should live inside feature folders and reuse the shared layout and components instead of creating one-off UI patterns."
      >
        <Typography variant="body2" color="text.secondary">
          Keep page-level logic thin, push reusable patterns into `components/`, and place domain-specific workflows in `features/`.
        </Typography>
      </SectionCard>
    </Stack>
  );
}
