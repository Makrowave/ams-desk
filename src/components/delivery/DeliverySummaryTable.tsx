import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_TableOptions,
} from 'material-react-table';
import { useMemo } from 'react';
import { DeliverySummary } from '../../types/deliveryTypes';
import useLocallyStoredTable from '../../hooks/useLocallyStoredTable';
import { Button, IconButton, Tooltip } from '@mui/material';
import Link from 'next/link';
import { Add, ChevronRight } from '@mui/icons-material';
import { paperTableStyle } from '../../styles/styles';
import MaterialModal from '../modals/MaterialModal';
import NewDeliveryModal from './modals/NewDeliveryModal';

const DeliverySummaryTable = () => {
  const { data, isLoading, isError } = {
    data: [],
    isLoading: false,
    isError: false,
  };

  const columns = useMemo<MRT_ColumnDef<DeliverySummary>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Nr',
      },
      {
        accessorKey: 'plannedArrival',
        header: 'Zaplanowana data dostawy',
        Cell: ({ cell }) =>
          cell.getValue()
            ? new Date(cell.getValue() as string).toLocaleDateString()
            : '',
      },
      {
        accessorKey: 'startDate',
        header: 'Data rozpoczęcia',
        Cell: ({ cell }) =>
          cell.getValue()
            ? new Date(cell.getValue() as string).toLocaleDateString()
            : '',
      },
      {
        accessorKey: 'finishDate',
        header: 'Data zakończenia',
        Cell: ({ cell }) =>
          cell.getValue()
            ? new Date(cell.getValue() as string).toLocaleDateString()
            : '',
      },
      {
        accessorKey: 'invoice',
        header: 'Faktura',
      },
      {
        accessorKey: 'statusId',
        header: 'Status',
      },
      {
        accessorKey: 'place',
        header: 'Place',
      },
      {
        id: 'goto',
        header: '',
        Cell: ({ row }) => (
          <IconButton
            LinkComponent={Link}
            href={`/delivery/${row.original.id}`}
          >
            <ChevronRight />
          </IconButton>
        ),
      },
    ],
    [],
  );

  const tableDef: MRT_TableOptions<DeliverySummary> = {
    ...paperTableStyle,
    columns,
    data: data || [],
    state: {
      isLoading,
    },
    renderTopToolbarCustomActions: () => <NewDeliveryModal />,
  };

  const { table } = useLocallyStoredTable<DeliverySummary>(
    'deliverySummary',
    tableDef,
  );

  return <MaterialReactTable table={table} />;
};

export default DeliverySummaryTable;
