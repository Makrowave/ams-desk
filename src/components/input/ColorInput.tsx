import { useState } from 'react';
import { ChromePicker } from 'react-color';
import { Box, IconButton, Popover, Popper, Typography } from '@mui/material';

type ColorInputProps = {
  title: string;
  value: string;
  setValue: (value: string) => void;
};

export default function ColorInput({
  title,
  value,
  setValue,
}: ColorInputProps) {
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
      <Typography>{title}</Typography>
      <Box>
        <IconButton
          onClick={handleClick}
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            bgcolor: value,
            border: '1px solid #ccc',
          }}
        />
      </Box>
      <Popover
        onClose={() => setAnchorEl(null)}
        open={isOpen}
        anchorEl={anchorEl}
        style={{ zIndex: 1400 }}
        anchorOrigin={{ vertical: 'center', horizontal: 'left' }}
      >
        <Box>
          <ChromePicker
            color={value}
            onChange={(e) => setValue(e.hex)}
            disableAlpha
          />
        </Box>
      </Popover>
    </Box>
  );
}
