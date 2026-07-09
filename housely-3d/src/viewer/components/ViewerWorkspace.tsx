import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ViewerCanvas } from '@/viewer/engine';
import { useViewer } from '@/viewer/hooks';
import { ViewerShell } from './ViewerShell';

function PlaceholderCopy({ text }: { text: string }) {
  return (
    <Typography variant="body2" color="text.secondary">
      {text}
    </Typography>
  );
}

export function ViewerWorkspace() {
  const { state } = useViewer();

  return (
    <Stack spacing={2}>
      <ViewerShell title="Toolbar" description="Reserved for viewer actions, scene modes, and future tools." minHeight={112}>
        <PlaceholderCopy text="Tool registration and command wiring will live here." />
      </ViewerShell>

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            xs: '1fr',
            xl: '280px minmax(0, 1fr) 320px',
          },
          alignItems: 'stretch',
        }}
      >
        <ViewerShell title="Scene tree" description="Placeholder for hierarchical scene navigation." minHeight={240}>
          <PlaceholderCopy text="Selection context currently reports no active objects." />
        </ViewerShell>

        <Box sx={{ minWidth: 0 }}>
          <ViewerCanvas />
        </Box>

        <ViewerShell title="Inspector" description="Reserved for object metadata and contextual inspection." minHeight={240}>
          <PlaceholderCopy text={`Viewer status: ${state.status}.`} />
        </ViewerShell>
      </Box>

      <ViewerShell title="Properties panel" description="Future property editors can register here without changing the canvas." minHeight={160}>
        <PlaceholderCopy text="No editable properties are available in the foundation phase." />
      </ViewerShell>

      <Box
        sx={{
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          px: 2,
          py: 1.5,
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center" divider={<Divider orientation="vertical" flexItem />}>
          <Typography variant="body2" color="text.secondary">
            Status bar
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Camera preset: {state.activeCameraPresetId}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Selected objects: {state.selection.selectedIds.length}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}
