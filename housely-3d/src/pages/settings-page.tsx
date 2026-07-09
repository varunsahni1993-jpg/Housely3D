import { zodResolver } from '@hookform/resolvers/zod';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { AppButton, AppSelect, AppTextField, ConfirmDialog, PageHeader, SectionCard } from '@/components';
import { appConfig } from '@/services';
import { useAppSettingsStore, useThemeStore, useUserPreferencesStore } from '@/stores';
import type { AppDensity, ThemeMode } from '@/types';

const settingsSchema = z.object({
  workspaceName: z.string().min(2, 'Workspace name must be at least 2 characters.'),
  landingPage: z.enum(['/', '/dashboard', '/projects', '/viewer']),
  density: z.enum(['comfortable', 'compact']),
  themeMode: z.enum(['light', 'dark']),
  showTips: z.boolean(),
  reducedMotion: z.boolean(),
  preferredLanguage: z.string().min(2),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

const landingPageOptions = [
  { label: 'Home', value: '/' },
  { label: 'Dashboard', value: '/dashboard' },
  { label: 'Projects', value: '/projects' },
  { label: 'Viewer', value: '/viewer' },
];

const densityOptions: Array<{ label: string; value: AppDensity }> = [
  { label: 'Comfortable', value: 'comfortable' },
  { label: 'Compact', value: 'compact' },
];

const themeOptions: Array<{ label: string; value: ThemeMode }> = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
];

export default function SettingsPage() {
  const appSettings = useAppSettingsStore();
  const themeStore = useThemeStore();
  const userPreferences = useUserPreferencesStore();
  const [resetOpen, setResetOpen] = useState(false);

  const defaultValues = useMemo<SettingsFormValues>(
    () => ({
      workspaceName: appSettings.appNameOverride ?? appConfig.appName,
      landingPage: appSettings.defaultLandingPage as SettingsFormValues['landingPage'],
      density: appSettings.contentDensity,
      themeMode: themeStore.mode,
      showTips: userPreferences.showTips,
      reducedMotion: userPreferences.reducedMotion,
      preferredLanguage: userPreferences.preferredLanguage,
    }),
    [
      appSettings.appNameOverride,
      appSettings.contentDensity,
      appSettings.defaultLandingPage,
      themeStore.mode,
      userPreferences.preferredLanguage,
      userPreferences.reducedMotion,
      userPreferences.showTips,
    ],
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isSubmitting },
  } = useForm<SettingsFormValues>({
    defaultValues,
    resolver: zodResolver(settingsSchema),
    mode: 'onBlur',
  });

  const onSubmit = handleSubmit((values) => {
    appSettings.setAppNameOverride(values.workspaceName === appConfig.appName ? undefined : values.workspaceName);
    appSettings.setDefaultLandingPage(values.landingPage);
    appSettings.setContentDensity(values.density);
    themeStore.setMode(values.themeMode);
    userPreferences.setShowTips(values.showTips);
    userPreferences.setReducedMotion(values.reducedMotion);
    userPreferences.setPreferredLanguage(values.preferredLanguage);
    reset(values);
  });

  const handleReset = () => {
    const nextValues: SettingsFormValues = {
      workspaceName: appConfig.appName,
      landingPage: '/dashboard',
      density: 'comfortable',
      themeMode: 'light',
      showTips: true,
      reducedMotion: false,
      preferredLanguage: 'en',
    };

    appSettings.setAppNameOverride(undefined);
    appSettings.setDefaultLandingPage(nextValues.landingPage);
    appSettings.setContentDensity(nextValues.density);
    themeStore.setMode(nextValues.themeMode);
    userPreferences.setShowTips(nextValues.showTips);
    userPreferences.setReducedMotion(nextValues.reducedMotion);
    userPreferences.setPreferredLanguage(nextValues.preferredLanguage);
    reset(nextValues);
    setResetOpen(false);
  };

  return (
    <Stack spacing={3}>
      <PageHeader
        eyebrow="Preferences"
        title="Settings"
        description="Local shell preferences are handled here. Future product settings and collaboration preferences can extend this form pattern."
        actions={
          <Stack direction="row" spacing={1.5}>
            <AppButton variant="outlined" onClick={() => setResetOpen(true)}>
              Reset to defaults
            </AppButton>
            <AppButton variant="contained" onClick={onSubmit} disabled={!isDirty || isSubmitting}>
              Save settings
            </AppButton>
          </Stack>
        }
      />

      <SectionCard title="Workspace settings" description="These settings are persisted locally in the shell.">
        <Stack component="form" spacing={3} onSubmit={onSubmit}>
          <Grid container spacing={2.5}>
            <Grid item xs={12} md={6}>
              <Controller
                control={control}
                name="workspaceName"
                render={({ field, fieldState }) => (
                  <AppTextField
                    {...field}
                    label="Workspace name"
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                control={control}
                name="landingPage"
                render={({ field, fieldState }) => (
                  <AppSelect
                    {...field}
                    label="Default landing page"
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                    SelectProps={{ native: true }}
                  >
                    {landingPageOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </AppSelect>
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                control={control}
                name="density"
                render={({ field, fieldState }) => (
                  <AppSelect
                    {...field}
                    label="Content density"
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                    SelectProps={{ native: true }}
                  >
                    {densityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </AppSelect>
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                control={control}
                name="themeMode"
                render={({ field, fieldState }) => (
                  <AppSelect
                    {...field}
                    label="Theme mode"
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                    SelectProps={{ native: true }}
                  >
                    {themeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </AppSelect>
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                control={control}
                name="preferredLanguage"
                render={({ field, fieldState }) => (
                  <AppTextField
                    {...field}
                    label="Preferred language"
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Stack spacing={1}>
            <Controller
              control={control}
              name="showTips"
              render={({ field }) => (
                <FormControlLabel control={<Switch checked={field.value} onChange={(_, checked) => field.onChange(checked)} />} label="Show shell tips" />
              )}
            />
            <Controller
              control={control}
              name="reducedMotion"
              render={({ field }) => (
                <FormControlLabel
                  control={<Switch checked={field.value} onChange={(_, checked) => field.onChange(checked)} />}
                  label="Reduce motion"
                />
              )}
            />
          </Stack>
        </Stack>
      </SectionCard>

      <SectionCard title="Current shell state">
        <Stack spacing={1}>
          <Typography variant="body2" color="text.secondary">
            Application name: {appSettings.appNameOverride ?? appConfig.appName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Default landing page: {appSettings.defaultLandingPage}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Theme mode: {themeStore.mode}
          </Typography>
        </Stack>
      </SectionCard>

      <ConfirmDialog
        open={resetOpen}
        title="Reset shell preferences?"
        description="This will restore the local shell settings to their defaults."
        confirmLabel="Reset"
        onConfirm={handleReset}
        onClose={() => setResetOpen(false)}
      />
    </Stack>
  );
}
