import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface LoadingScreenProps {
  fullScreen?: boolean;
  message?: string;
}

export function LoadingScreen({
  fullScreen = false,
  message = 'Loading workspace...',
}: LoadingScreenProps) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={2}
      sx={{
        minHeight: fullScreen ? '100vh' : 320,
        px: 3,
        py: 4,
      }}
    >
      <Box
        sx={{
          p: 2,
          borderRadius: 999,
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <CircularProgress size={28} />
      </Box>
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Stack>
  );
}
