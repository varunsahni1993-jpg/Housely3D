import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AppButton } from '@/components';

interface ViewerCanvasErrorStateProps {
  error: Error;
  onRetry: () => void;
}

export function ViewerCanvasErrorState({ error, onRetry }: ViewerCanvasErrorStateProps) {
  return (
    <Alert severity="error" sx={{ alignItems: 'flex-start' }}>
      <Stack spacing={2}>
        <div>
          <Typography variant="h6" gutterBottom>
            Viewer could not initialize
          </Typography>
          <Typography variant="body2" color="text.secondary">
            The 3D canvas failed to load. This usually means WebGL was unavailable or a scene dependency failed during startup.
          </Typography>
        </div>
        <Typography variant="caption" color="text.secondary">
          {error.message}
        </Typography>
        <AppButton color="error" variant="contained" onClick={onRetry}>
          Retry viewer
        </AppButton>
      </Stack>
    </Alert>
  );
}
