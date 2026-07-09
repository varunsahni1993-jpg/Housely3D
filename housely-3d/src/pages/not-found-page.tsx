import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { AppButton, ErrorState, PageHeader, SectionCard } from '@/components';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Stack spacing={3}>
      <PageHeader
        eyebrow="Navigation"
        title="404"
        description="The requested workspace route could not be found."
      />
      <SectionCard>
        <ErrorState
          title="We couldn't find that page"
          message="The requested route is not part of the current shell."
          actionLabel="Go home"
          onRetry={() => navigate('/')}
        />
      </SectionCard>
      <AppButton component={RouterLink} to="/" startIcon={<HomeRoundedIcon />} variant="outlined" sx={{ alignSelf: 'flex-start' }}>
        Return home
      </AppButton>
    </Stack>
  );
}
