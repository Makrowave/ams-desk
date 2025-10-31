import {
  Card,
  Stack,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField,
} from '@mui/material';
import { Repair } from '../../../types/repairTypes';
import { REPAIR_STATUS } from '../../../util/repairStatuses';

type CostsDisplayProps = {
  repair: Repair;
  servicesCostTotal: number;
  partsCostTotal: number;
  changeCosts: (value: string) => void;
  changeDiscount: (value: string) => void;
};

const CostsDisplay = ({
  repair,
  servicesCostTotal,
  partsCostTotal,
  changeCosts,
  changeDiscount,
}: CostsDisplayProps) => {
  return (
    <Card component={Stack} sx={{ p: 2, flex: 1 }}>
      <Typography fontWeight="bold">Całkowite koszty</Typography>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Usługi</TableCell>
            <TableCell sx={{ textAlign: 'end' }}>
              {servicesCostTotal.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Części</TableCell>
            <TableCell sx={{ textAlign: 'end' }}>
              {partsCostTotal.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Dodatkowe koszty</TableCell>
            <TableCell sx={{ textAlign: 'end' }}>
              <TextField
                // type="number"
                variant="standard"
                size="small"
                disabled={
                  repair.statusId === REPAIR_STATUS.Collected ||
                  repair.statusId === REPAIR_STATUS.Cancelled
                }
                sx={{ textAlign: 'end' }}
                value={repair.additionalCosts}
                slotProps={{ htmlInput: { sx: { textAlign: 'end' } } }}
                onChange={(e) => changeCosts(e.target.value)}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Zniżka</TableCell>
            <TableCell>
              <TextField
                // type="number"
                variant="standard"
                size="small"
                disabled={
                  repair.statusId === REPAIR_STATUS.Collected ||
                  repair.statusId === REPAIR_STATUS.Cancelled
                }
                value={`-${repair.discount}`}
                slotProps={{ htmlInput: { sx: { textAlign: 'end' } } }}
                onChange={(e) => changeDiscount(e.target.value)}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Suma</TableCell>
            <TableCell sx={{ textAlign: 'end' }}>
              {(
                servicesCostTotal +
                partsCostTotal +
                Number(repair.additionalCosts) -
                Number(repair.discount)
              ).toFixed(2)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};
export default CostsDisplay;
