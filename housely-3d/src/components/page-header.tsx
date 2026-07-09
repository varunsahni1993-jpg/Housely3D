import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
  actions?: ReactNode;
  eyebrow?: string;
}

export function PageHeader({ title, description, actions, eyebrow }: PageHeaderProps) {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-start', md: 'center' }}
      spacing={2}
      sx={{ mb: 3 }}
    >
      <Box>
        {eyebrow ? (
          <Typography variant="overline" color="text.secondary" letterSpacing={2}>
            {eyebrow}
          </Typography>
        ) : null}
        <Typography variant="h3" gutterBottom sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760 }}>
          {description}
        </Typography>
      </Box>
      {actions ? <Box>{actions}</Box> : null}
    </Stack>
  );
}
