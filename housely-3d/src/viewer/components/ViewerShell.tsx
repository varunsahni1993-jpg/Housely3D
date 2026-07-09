import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

interface ViewerShellProps {
  title: string;
  description: string;
  children?: ReactNode;
  minHeight?: number;
}

export function ViewerShell({ title, description, children, minHeight = 160 }: ViewerShellProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        minHeight,
        borderRadius: 2,
        overflow: 'hidden',
        bgcolor: 'background.paper',
      }}
    >
      <Stack spacing={1.5} sx={{ p: 2, height: '100%' }}>
        <Box>
          <Typography variant="subtitle1">{title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
        {children}
      </Stack>
    </Paper>
  );
}
