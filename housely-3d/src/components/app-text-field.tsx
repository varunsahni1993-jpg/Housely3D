import TextField, { type TextFieldProps } from '@mui/material/TextField';

export function AppTextField(props: TextFieldProps) {
  return <TextField fullWidth variant="outlined" {...props} />;
}
