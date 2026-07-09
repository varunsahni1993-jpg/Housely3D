import Button, { type ButtonProps } from '@mui/material/Button';

type AppButtonProps = ButtonProps & {
  to?: string;
};

export function AppButton(props: AppButtonProps) {
  return <Button disableElevation {...props} />;
}
