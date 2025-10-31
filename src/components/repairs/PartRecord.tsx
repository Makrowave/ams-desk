import { useState } from 'react';
import { FaRegCircleXmark } from 'react-icons/fa6';
import { PartUsed } from '../../types/repairTypes';
import { TableRow, TableCell, IconButton, TextField, Box } from '@mui/material';

type PartRecordProps = {
  index: number;
  part: PartUsed;
  changeAmount: (partUsedId: number, amount: number) => void;
  deleteFn: (partUsedId: number) => void;
};

const PartRecord = ({
  index,
  part,
  changeAmount,
  deleteFn,
}: PartRecordProps) => {
  const [localPart, setLocalPart] = useState(part);
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      Number(event.target.value) < 0 ? 0 : Number(event.target.value);
    setLocalPart({ ...localPart, amount: value });
    changeAmount(localPart.id, value);
  };
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{localPart.part?.name}</TableCell>
      <TableCell>
        {localPart.price.toFixed(2)} ({localPart.part?.price.toFixed(2)})
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'inline-flex' }}>
          <TextField
            type="number"
            variant="standard"
            size="small"
            value={localPart.amount}
            onChange={handleAmountChange}
            inputProps={{ min: 0, style: { textAlign: 'center', width: 60 } }}
            sx={{ width: 80, mr: 1 }}
          />
          {localPart.part?.unit?.name}
        </Box>
      </TableCell>
      <TableCell>{(localPart.price * localPart.amount).toFixed(2)}</TableCell>
      <TableCell>
        <IconButton
          size="small"
          onClick={() => deleteFn(part.id)}
          sx={{
            p: 1,
            borderRadius: 2,
            '&:hover': { backgroundColor: 'grey.200' },
          }}
        >
          <FaRegCircleXmark style={{ color: '#e53935' }} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default PartRecord;
