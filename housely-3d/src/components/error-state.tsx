import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { AppButton } from './app-button';

interface ErrorStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  onRetry?: () => void;
  details?: ReactNode;
}

export function ErrorState({ title, message, actionLabel = 'Try again', onRetry, details }: ErrorStateProps) {
  return (
    <Alert
      severity="error"
      sx={{
        alignItems: 'flex-start',
      }}
    >
      <Stack spacing={2}>
        <Box>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {message}
          </Typography>
        </Box>
        {details ? <Box>{details}</Box> : null}
        {onRetry ? (
          <Box>
            <AppButton color="error" variant="contained" onClick={onRetry}>
              {actionLabel}
            </AppButton>
          </Box>
        ) : null}
      </Stack>
    </Alert>
  );
}
