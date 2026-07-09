import Button, { type ButtonProps } from '@mui/material/Button';

export function AppButton(props: ButtonProps) {
  return <Button disableElevation {...props} />;
}
