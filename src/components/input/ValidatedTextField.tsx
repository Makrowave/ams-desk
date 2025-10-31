import { TextField, TextFieldProps } from '@mui/material';

type InputType = 'text' | 'number';

type BaseProps<T extends InputType> = {
  label: string;
  value: T extends 'number' ? number | undefined : string | undefined;
  regex: RegExp;
  textFieldProps?: Partial<TextFieldProps>;
  type?: T;
};

type Props<T extends InputType = 'text'> = BaseProps<T> & {
  onChange: T extends 'number'
    ? (value: number | undefined) => void
    : (value: string | undefined) => void;
};

export default function ValidatedTextField<T extends InputType = 'text'>({
  label,
  value,
  onChange,
  regex,
  textFieldProps: otherProps = {},
  type = 'text' as T,
}: Props<T>) {
  const handleChange = (v: string) => {
    if (type === 'number') {
      const parsed = Number(v);
      // TS can't narrow the generic at runtime, so assert the onChange type when calling
      (onChange as (val: number | undefined) => void)(
        isNaN(parsed) ? undefined : parsed,
      );
    } else {
      (onChange as (val: string | undefined) => void)(v);
    }
  };

  return (
    <TextField
      label={label}
      type={type}
      {...otherProps}
      value={value as any}
      onChange={(e) => handleChange(e.target.value)}
      error={!regex.test((value ?? '') as string)}
    />
  );
}
