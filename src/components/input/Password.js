import { useState } from "react";

export default function Password({ className, value, setValue, onKeyDown }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={className}>
      <input
        type={isVisible ? "text" : "password"}
        className='block text-center bg-primary border-2 border-tertiary rounded-lg'
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyDown={onKeyDown}
      />
      <button onClick={() => setIsVisible(!isVisible)}>
        <span className='text-base underline'>{isVisible ? "Ukryj hasło" : "Pokaż hasło"}</span>
      </button>
    </div>
  );
}
