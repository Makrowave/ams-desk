import { useState } from 'react';
import { ChromePicker } from 'react-color';
import { Box, IconButton, Popover, Popper, Typography } from '@mui/material';

type ColorInputProps = {
  title?: string;
  value: string;
  setValue: (value: string) => void;
};

const ColorInput = ({ title, value, setValue }: ColorInputProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap={2}
    >
      {title && <Typography>{title}</Typography>}
      <Box>
        <IconButton
          onClick={handleClick}
          sx={{
            width: 30,
            height: 30,
            borderRadius: 1,
            bgcolor: value,
            border: '1px solid #ccc',
          }}
        />
      </Box>
      <Popover
        onClose={() => setAnchorEl(null)}
        open={isOpen}
        anchorEl={anchorEl}
        sx={{ zIndex: 1400 }}
        elevation={12}
        anchorOrigin={{ vertical: 'center', horizontal: 'left' }}
      >
        <ChromePicker
          color={value}
          onChange={(e) => setValue(e.hex)}
          disableAlpha
        />
      </Popover>
    </Box>
  );
};

export default ColorInput;
