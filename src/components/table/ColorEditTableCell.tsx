import {
  MRT_Cell,
  MRT_Column,
  MRT_Row,
  MRT_RowData,
} from 'material-react-table';
import ColorInput from '../input/ColorInput';

const ColorEditTableCell = <TData extends MRT_RowData>({
  row,
  column,
  cell,
}: {
  row: MRT_Row<TData>;
  column: MRT_Column<TData, unknown>;
  cell: MRT_Cell<TData>;
}) => {
  const setValue = (value: string) => {
    //TODO: figure out proper type from MRT
    (row._valuesCache as Record<string, any>)[column.id as string] = value;
  };

  return (
    <ColorInput title="" value={cell.getValue<string>()} setValue={setValue} />
  );
};

export default ColorEditTableCell;
