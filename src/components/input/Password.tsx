import { useState } from 'react';
import type {
  Dispatch,
  SetStateAction,
  KeyboardEvent,
  FocusEvent,
} from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

type PasswordProps = {
  className?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement, Element>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement, Element>) => void;
};

const Password = ({
  className,
  value,
  setValue,
  onKeyDown,
  onFocus,
  onBlur,
}: PasswordProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (onBlur) onBlur(e);
  };

  return (
    <div className="relative h-fit bg-inherit transition-all flex items-center w-full">
      <input
        type={isVisible ? 'text' : 'password'}
        className={className}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyDown={onKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Hasło"
      />
      <button
        className="absolute right-1"
        type="button"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
};

export default Password;
