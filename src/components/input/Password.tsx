import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import type {
  Dispatch,
  SetStateAction,
  KeyboardEvent,
  FocusEvent,
} from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

type PasswordProps = {
  value: string;
  label?: string;
  setValue: (v: string) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
};

const Password = ({
  value,
  label = 'Hasło',
  setValue,
  onKeyDown,
}: PasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor={`outlined-adornment-password-${label}`}>
        {label}
      </InputLabel>
      <OutlinedInput
        id={`outlined-adornment-password-${label}`}
        label={label}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyDown={onKeyDown}
        placeholder="Hasło"
        sx={(theme) => ({
          '& input:-webkit-autofill': {
            WebkitBoxShadow: `0 0 0 100px ${theme.palette.background.default} inset`,
            boxShadow: `0 0 0 100px ${theme.palette.background.default} inset`,
            WebkitTextFillColor: theme.palette.text.primary,
          },
        })}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword((p) => !p)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default Password;
