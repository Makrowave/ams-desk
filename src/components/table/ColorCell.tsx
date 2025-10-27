import { Box } from '@mui/material';
import { MRT_Column, MRT_Row, MRT_RowData } from 'material-react-table';

const ColorCell = <TData extends MRT_RowData>({
  row,
  column,
}: {
  row: MRT_Row<TData>;
  column: MRT_Column<TData, unknown>;
}) => (
  <Box
    sx={{
      background: row.original[column.id],
      width: 30,
      height: 30,
      borderRadius: 1,
      border: '1px solid #ccc',
    }}
  />
);

export default ColorCell;
