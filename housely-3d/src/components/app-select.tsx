import TextField, { type TextFieldProps } from '@mui/material/TextField';

export function AppSelect(props: TextFieldProps) {
  return <TextField fullWidth select variant="outlined" {...props} />;
}
