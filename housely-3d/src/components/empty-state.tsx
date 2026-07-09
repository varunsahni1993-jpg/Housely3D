import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 4,
        textAlign: 'center',
        borderStyle: 'dashed',
        backgroundColor: 'background.paper',
      }}
    >
      <Stack spacing={2} alignItems="center">
        {icon ? <Box sx={{ color: 'primary.main' }}>{icon}</Box> : null}
        <Box>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 520, mx: 'auto' }}>
            {description}
          </Typography>
        </Box>
        {action ? <Box>{action}</Box> : null}
      </Stack>
    </Paper>
  );
}
