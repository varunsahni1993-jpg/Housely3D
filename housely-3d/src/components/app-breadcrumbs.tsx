import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { useBreadcrumbs } from '@/hooks';

export function AppBreadcrumbs() {
  const items = useBreadcrumbs();

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      {items.map((item, index) =>
        item.path ? (
          <Link key={`${item.label}-${index}`} component={RouterLink} to={item.path} underline="hover" color="inherit">
            {item.label}
          </Link>
        ) : (
          <Typography key={`${item.label}-${index}`} color="text.primary">
            {item.label}
          </Typography>
        ),
      )}
    </Breadcrumbs>
  );
}
