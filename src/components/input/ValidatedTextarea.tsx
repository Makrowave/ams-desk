import { TextField, TextFieldProps } from '@mui/material';

type ValidatedTextareaProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  regex: RegExp;
  otherProps?: Partial<TextFieldProps>;
};

export default function ValidatedTextarea({
  placeholder,
  value,
  onChange,
  regex,
  otherProps = {},
}: ValidatedTextareaProps) {
  return (
    <TextField
      placeholder={placeholder}
      {...otherProps}
      value={value}
      multiline
      onChange={(e) => onChange(e.target.value)}
      error={!regex.test(value)}
    />
  );
}
