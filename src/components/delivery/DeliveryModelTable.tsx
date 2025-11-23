import Link from 'next/link';
import { defaultFilters, prepareFilters } from '../table/modelTable/Filters';
import ColorPreview from '../table/ColorPreview';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { ModelRecord } from '../../types/bikeTypes';
import { useModelsQuery } from '../../hooks/queryHooks';
import { useMemo } from 'react';
import { flexTableStyle } from '../../styles/styles';
import useLocallyStoredTable from '../../hooks/useLocallyStoredTable';
import { Button } from '@mui/material';
import Add from '@mui/icons-material/add';

const DeliveryModelTable = ({
  filters,
  handleAddToDelivery,
}: {
  filters: typeof defaultFilters;
  handleAddToDelivery: (id: number) => void;
}) => {
  const { data, isLoading, isError, error } = useModelsQuery<ModelRecord[]>(
    { ...prepareFilters(filters), placeId: 0 },
    {
      refetchInterval: 10000,
    },
  );

  const columns = useMemo<MRT_ColumnDef<ModelRecord>[]>(
    () => [
      {
        id: 'color',
        header: 'Kolor',
        size: 50,
        Cell: ({ row }) => (
          <ColorPreview
            primaryColor={row.original.primaryColor}
            secondaryColor={row.original.secondaryColor}
          />
        ),
      },
      {
        id: 'name',
        accessorKey: 'name',
        header: 'Model',
        size: 300,
        Cell: ({ renderedCellValue, row }) =>
          row.original.link ? (
            <Link href={row.original.link}>{renderedCellValue}</Link>
          ) : (
            renderedCellValue
          ),
      },
      {
        accessorKey: 'frameSize',
        header: 'Rama',
      },
      {
        accessorKey: 'wheelSize',
        header: 'Koła',
      },
      {
        accessorKey: 'price',
        header: 'Cena',
      },
    ],
    [],
  );

  const { table } = useLocallyStoredTable('DeliveryModel', {
    columns,
    data: data ?? [],
    enablePagination: false,
    enableRowVirtualization: true,
    enableFullScreenToggle: false,
    state: { isLoading },
    enableColumnResizing: true,
    enableColumnOrdering: true,
    enableHiding: true,
    enableColumnFilterModes: false,
    enableColumnFilters: false,
    enableColumnActions: false,
    enableStickyHeader: true,
    enableStickyFooter: true,
    ...flexTableStyle,
    muiTablePaperProps: {
      sx: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        bgcolor: 'background.paper',
      },
    },
    enableRowActions: true,
    renderRowActions: ({ row }) => (
      <Button
        variant="contained"
        onClick={() => handleAddToDelivery(row.original.id)}
      >
        <Add />
      </Button>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default DeliveryModelTable;
