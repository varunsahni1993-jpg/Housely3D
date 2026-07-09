import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded';
import Stack from '@mui/material/Stack';
import { AppButton, EmptyState, PageHeader, SectionCard } from '@/components';

export default function ProjectsPage() {
  return (
    <Stack spacing={3}>
      <PageHeader
        eyebrow="Delivery"
        title="Projects"
        description="This surface will eventually host project creation, lifecycle tracking, and build history."
        actions={<AppButton variant="contained">New project</AppButton>}
      />

      <SectionCard title="Project workspace" description="Placeholder structure for future project lists and actions.">
        <EmptyState
          icon={<FolderOpenRoundedIcon fontSize="large" />}
          title="No projects are loaded yet"
          description="Project CRUD, templates, and collaboration flows are intentionally deferred to a later phase."
        />
      </SectionCard>
    </Stack>
  );
}
