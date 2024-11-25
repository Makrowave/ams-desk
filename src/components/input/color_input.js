import { useEffect, useRef, useState } from "react";
import { ChromePicker } from "react-color";

export default function ColorInput({ title, value, setValue }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  function handleClickOutside(event) {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className={"flex justify-between "}>
      <p className='self-center'>{title}</p>
      <div ref={selectRef}>
        <button className='h-10 w-10' onClick={() => setIsOpen(!isOpen)} style={{ background: value }} />
        {isOpen && (
          <ChromePicker className='absolute' color={value} onChange={(e) => setValue(e.hex)} disableAlpha={true} />
        )}
      </div>
    </div>
  );
}
