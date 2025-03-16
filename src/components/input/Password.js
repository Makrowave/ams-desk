import {useState} from "react";
import {FaEye, FaEyeSlash} from "react-icons/fa6";

export default function Password({className, value, setValue, onKeyDown, onFocus, onBlur}) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className='relative h-fit bg-inherit transition-all flex items-center w-full'>
      <input
        type={isVisible ? "text" : "password"}
        className={className}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyDown={onKeyDown}
        onFocus={(e) => onFocus(e)}
        onBlur={(e) => onBlur(e)}
        placeholder='Hasło'
      />
      <button className='absolute right-1' type='button' onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? <FaEyeSlash/> : <FaEye/>}
      </button>
    </div>
  );
}
