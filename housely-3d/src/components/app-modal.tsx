import Dialog, { type DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import type { ReactNode } from 'react';

interface AppModalProps extends Omit<DialogProps, 'title'> {
  title?: ReactNode;
  actions?: ReactNode;
}

export function AppModal({ title, actions, children, ...props }: AppModalProps) {
  return (
    <Dialog {...props}>
      {title ? <DialogTitle>{title}</DialogTitle> : null}
      <DialogContent>{children}</DialogContent>
      {actions ? <DialogActions>{actions}</DialogActions> : null}
    </Dialog>
  );
}
