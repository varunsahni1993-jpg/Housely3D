import { zodResolver } from '@hookform/resolvers/zod';
import DialogActions from '@mui/material/DialogActions';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { AppButton, AppModal, AppTextField } from '@/components';

const projectCreateSchema = z.object({
  name: z.string().trim().min(3, 'Project name must be at least 3 characters.'),
  description: z.string().trim().min(10, 'Description must be at least 10 characters.'),
  plotWidth: z
    .union([z.coerce.number().positive('Plot width must be greater than 0.'), z.literal('')])
    .optional()
    .transform((value) => (value === '' ? undefined : value)),
  plotLength: z
    .union([z.coerce.number().positive('Plot length must be greater than 0.'), z.literal('')])
    .optional()
    .transform((value) => (value === '' ? undefined : value)),
});

export type ProjectCreateFormValues = z.input<typeof projectCreateSchema>;

interface ProjectCreateDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: {
    name: string;
    description: string;
    plotWidth?: number;
    plotLength?: number;
  }) => Promise<void>;
}

export function ProjectCreateDialog({ open, onClose, onSubmit }: ProjectCreateDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ProjectCreateFormValues>({
    resolver: zodResolver(projectCreateSchema),
    defaultValues: {
      name: '',
      description: '',
      plotWidth: undefined,
      plotLength: undefined,
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const submit = handleSubmit(async (values) => {
    await onSubmit({
      name: values.name.trim(),
      description: values.description.trim(),
      plotWidth: typeof values.plotWidth === 'number' ? values.plotWidth : undefined,
      plotLength: typeof values.plotLength === 'number' ? values.plotLength : undefined,
    });
    reset();
  });

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title="Create project"
      actions={
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <AppButton variant="outlined" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </AppButton>
          <AppButton variant="contained" onClick={submit} disabled={isSubmitting}>
            Create project
          </AppButton>
        </DialogActions>
      }
    >
      <Stack spacing={3} sx={{ pt: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Create a local project workspace. The project will be stored in the browser and can be reopened later.
        </Typography>

        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <AppTextField {...field} label="Project name" error={Boolean(fieldState.error)} helperText={fieldState.error?.message} />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field, fieldState }) => (
            <AppTextField
              {...field}
              label="Description"
              multiline
              minRows={3}
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Controller
            control={control}
            name="plotWidth"
            render={({ field, fieldState }) => (
              <AppTextField
                {...field}
                value={field.value ?? ''}
                label="Optional plot width (m)"
                type="number"
                inputProps={{ min: 0.1, step: 0.1 }}
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="plotLength"
            render={({ field, fieldState }) => (
              <AppTextField
                {...field}
                value={field.value ?? ''}
                label="Optional plot length (m)"
                type="number"
                inputProps={{ min: 0.1, step: 0.1 }}
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Stack>
      </Stack>
    </AppModal>
  );
}
