import {useEffect, useRef, useState} from "react";
import {ChromePicker} from "react-color";
import {Box, IconButton, Popper, Typography} from "@mui/material";

export default function ColorInput({title, value, setValue}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  function handleClickOutside(event) {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target)
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

      <Popper open={isOpen} anchorEl={selectRef.current} placement="bottom-start" style={{zIndex: 1400}}>
        <Box sx={{boxShadow: 3}}>
          <ChromePicker
            color={value}
            onChange={(e) => setValue(e.hex)}
            disableAlpha
          />
        </Box>
      </Popper>
    </Box>
  );
}
