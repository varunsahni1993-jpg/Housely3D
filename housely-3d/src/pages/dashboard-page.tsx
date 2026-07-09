import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import { AppButton, EmptyState, PageHeader, SectionCard } from '@/components';

export default function DashboardPage() {
  return (
    <Stack spacing={3}>
      <PageHeader
        eyebrow="Workspace"
        title="Dashboard"
        description="A high-level workspace surface for future project and model telemetry. This page currently exists as a placeholder shell."
        actions={<AppButton variant="contained">Create project</AppButton>}
      />

      <SectionCard title="Workspace snapshot" description="Reserved for future operational summary cards.">
        <EmptyState
          icon={<InsightsRoundedIcon fontSize="large" />}
          title="Dashboard metrics will appear here"
          description="When product telemetry is introduced, this section will surface the most important workspace indicators and next actions."
        />
      </SectionCard>

      <SectionCard title="Current status">
        <Typography variant="body2" color="text.secondary">
          The shell is ready for future dashboard widgets, project summaries, and model status panels.
        </Typography>
      </SectionCard>
    </Stack>
  );
}
