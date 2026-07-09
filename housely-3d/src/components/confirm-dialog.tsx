import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import Stack from '@mui/material/Stack';
import type { ReactNode } from 'react';
import { AppButton } from './app-button';
import { AppModal } from './app-modal';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
  children?: ReactNode;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onClose,
  children,
}: ConfirmDialogProps) {
  return (
    <AppModal
      open={open}
      onClose={onClose}
      title={title}
      actions={
        <DialogActions sx={{ px: 0 }}>
          <AppButton variant="outlined" onClick={onClose}>
            {cancelLabel}
          </AppButton>
          <AppButton variant="contained" onClick={onConfirm}>
            {confirmLabel}
          </AppButton>
        </DialogActions>
      }
    >
      <Stack spacing={2}>
        <DialogContentText>{description}</DialogContentText>
        {children}
      </Stack>
    </AppModal>
  );
}
