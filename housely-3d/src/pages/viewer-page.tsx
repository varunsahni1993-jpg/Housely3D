import Stack from '@mui/material/Stack';
import { PageHeader, SectionCard } from '@/components';
import { ViewerProvider, ViewerWorkspace } from '@/viewer';

export default function ViewerPage() {
  return (
    <Stack spacing={3}>
      <PageHeader
        eyebrow="Visualization"
        title="Viewer"
        description="The production viewer foundation is now in place with a modular R3F canvas, reusable camera and control layers, and empty shells for future tools."
      />

      <SectionCard title="Viewer workspace" description="Canvas, scene scaffolding, and overlay shells are initialized here.">
        <ViewerProvider>
          <ViewerWorkspace />
        </ViewerProvider>
      </SectionCard>
    </Stack>
  );
}
