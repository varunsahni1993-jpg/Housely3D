import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { PropsWithChildren, ReactNode } from 'react';

interface SectionCardProps extends PropsWithChildren {
  title?: string;
  description?: string;
  action?: ReactNode;
}

export function SectionCard({ title, description, action, children }: SectionCardProps) {
  return (
    <Card>
      <CardContent>
        {(title || description || action) && (
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: children ? 2 : 0 }}
          >
            <Box>
              {title ? (
                <Typography variant="h6" gutterBottom sx={{ mb: description ? 0.5 : 0 }}>
                  {title}
                </Typography>
              ) : null}
              {description ? (
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              ) : null}
            </Box>
            {action ? <Box>{action}</Box> : null}
          </Stack>
        )}
        {children}
      </CardContent>
    </Card>
  );
}
