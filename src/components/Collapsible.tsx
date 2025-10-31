import { Box, Collapse, IconButton, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

type CollapsibleProps = {
  children: React.ReactNode;
  title: string;
  initialOpen?: boolean;
};

const Collapsible = ({
  children,
  title,
  initialOpen = true,
}: CollapsibleProps) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  return (
    <Stack>
      <Box
        sx={{ display: 'flex', justifyItems: 'flex-start', alignSelf: 'start' }}
      >
        <IconButton onClick={() => setIsOpen((p) => !p)} sx={{ pr: 2 }}>
          {isOpen ? <FaChevronDown /> : <FaChevronUp />}
        </IconButton>
        <Typography variant="h6" component={'h2'}>
          {title}
        </Typography>
      </Box>
      <Collapse in={isOpen}>{children}</Collapse>
    </Stack>
  );
};

export default Collapsible;
