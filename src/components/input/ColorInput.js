import {useEffect, useRef, useState} from "react";
import {ChromePicker} from "react-color";
import ReactDOM from "react-dom";
import {Box, IconButton, Paper, Typography} from "@mui/material";

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
    <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
      <Typography>{title}</Typography>
      <Box ref={selectRef}>
        <IconButton
          onClick={() => setIsOpen(!isOpen)}
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            bgcolor: value,
            border: '1px solid #ccc',
          }}
        />
      </Box>

      {isOpen &&
        ReactDOM.createPortal(
          <Paper ref={pickerRef} elevation={4} sx={{position: "absolute", zIndex: 1300, ...pickerStyle}}>
            <ChromePicker
              color={value}
              onChange={(e) => setValue(e.hex)}
              disableAlpha={true}
            />
          </Paper>,
          document.body
        )}
    </Box>
  );
}
