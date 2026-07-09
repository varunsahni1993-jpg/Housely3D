import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { EmptyState, PageHeader, SectionCard } from '@/components';

export default function ViewerPage() {
  return (
    <Stack spacing={3}>
      <PageHeader
        eyebrow="Visualization"
        title="Viewer"
        description="The Three.js and React Three Fiber viewer will be added later. This shell reserves the route and layout space now."
      />

      <SectionCard title="Model preview shell" description="Reserved for 3D and geometry-driven experiences.">
        <EmptyState
          icon={<VisibilityRoundedIcon fontSize="large" />}
          title="Viewer implementation is deferred"
          description="The viewer route is ready, but rendering, loading, and interaction logic are intentionally not implemented in this phase."
        />
      </SectionCard>

      <SectionCard title="Design notes">
        <Typography variant="body2" color="text.secondary">
          Future viewer features should remain isolated inside the viewer domain so the shell can evolve without coupling to geometry logic.
        </Typography>
      </SectionCard>
    </Stack>
  );
}
