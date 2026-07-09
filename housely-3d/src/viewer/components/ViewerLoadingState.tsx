import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

export function ViewerLoadingState() {
  return (
    <Stack alignItems="center" justifyContent="center" spacing={2} sx={{ width: '100%', height: '100%', minHeight: 320 }}>
      <CircularProgress />
      <Typography variant="body2" color="text.secondary">
        Initializing viewer engine...
      </Typography>
    </Stack>
  );
}
