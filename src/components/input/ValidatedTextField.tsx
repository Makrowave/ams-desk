import { TextField, TextFieldProps } from '@mui/material';

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  regex: RegExp;
  otherProps?: Partial<TextFieldProps>;
};

export default function ValidatedTextField({
  label,
  value,
  onChange,
  regex,
  otherProps = {},
}: Props) {
  return (
    <TextField
      label={label}
      {...otherProps}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      error={!regex.test(value)}
    />
  );
}
