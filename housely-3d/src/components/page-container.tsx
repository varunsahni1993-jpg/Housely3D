import Container, { type ContainerProps } from '@mui/material/Container';
import type { PropsWithChildren } from 'react';

interface PageContainerProps extends PropsWithChildren {
  maxWidth?: ContainerProps['maxWidth'];
}

export function PageContainer({ children, maxWidth = 'xl' }: PageContainerProps) {
  return (
    <Container maxWidth={maxWidth} sx={{ py: { xs: 2, md: 3 } }}>
      {children}
    </Container>
  );
}
