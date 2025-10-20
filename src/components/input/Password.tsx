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
  onFocus?: (e: FocusEvent<HTMLInputElement, Element>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement, Element>) => void;
};

const Password = ({
  value,
  label = 'Hasło',
  setValue,
  onKeyDown,
  onFocus,
  onBlur,
}: PasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (onBlur) onBlur(e);
  };

  return (
    <FormControl>
      <InputLabel htmlFor={`outlined-adornment-password-${label}`}>
        {label}
      </InputLabel>
      <OutlinedInput
        id={`outlined-adornment-password-${label}`}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyDown={onKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Hasło"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              className="absolute right-1"
              onClick={() => setShowPassword((p) => !p)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default Password;
