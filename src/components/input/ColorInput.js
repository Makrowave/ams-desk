import {useEffect, useRef, useState} from "react";
import {ChromePicker} from "react-color";
import ReactDOM from "react-dom";

export default function ColorInput({title, value, setValue}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const pickerRef = useRef(null);
  const [pickerStyle, setPickerStyle] = useState({});

  function handleClickOutside(event) {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target) &&
      pickerRef.current &&
      !pickerRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && selectRef.current) {
      const rect = selectRef.current.getBoundingClientRect();
      const pickerHeight = 240;
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      const placeAbove = spaceBelow < pickerHeight && spaceAbove > pickerHeight;

      setPickerStyle({
        position: "absolute",
        top: placeAbove
          ? rect.top + window.scrollY - pickerHeight
          : rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        zIndex: 1000
      });
    }
  }, [isOpen]);

  return (
    <div className="flex justify-between">
      <p className="self-center">{title}</p>
      <div ref={selectRef}>
        <button
          className="h-10 w-10"
          onClick={() => setIsOpen(!isOpen)}
          style={{background: value}}
        />
      </div>

      {isOpen &&
        ReactDOM.createPortal(
          <div ref={pickerRef} style={pickerStyle}>
            <ChromePicker
              color={value}
              onChange={(e) => setValue(e.hex)}
              disableAlpha={true}
            />
          </div>,
          document.body
        )}
    </div>
  );
}
