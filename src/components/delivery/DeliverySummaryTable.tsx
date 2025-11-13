import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_TableOptions,
} from 'material-react-table';
import { useMemo } from 'react';
import { DeliverySummary } from '../../types/deliveryTypes';
import useLocallyStoredTable from '../../hooks/useLocallyStoredTable';
import { Box, IconButton, Typography } from '@mui/material';
import Link from 'next/link';
import { ChevronRight } from '@mui/icons-material';
import { paperTableStyle } from '../../styles/styles';
import NewDeliveryModal from './modals/NewDeliveryModal';
import { useDeliveriesQuery } from '../../hooks/queryHooks';
import {
  getDeliveryStatusColor,
  getDeliveryStatusText,
} from '../../util/deliveryHelpers';

const DeliverySummaryTable = () => {
  const { data, isLoading, isError } = useDeliveriesQuery<DeliverySummary[]>(
    {},
  );

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
        accessorFn: (row) => (row.invoice ? row.invoice : 'Brak - anulowana'),
      },
      {
        accessorKey: 'statusId',
        header: 'Status',
        Cell: ({ cell }) => (
          <Box
            sx={{
              py: 1,
              px: 2,
              bgcolor: getDeliveryStatusColor(cell.getValue() as number),
              borderRadius: 1,
            }}
          >
            <Typography variant="body1" sx={{ color: 'white' }}>
              {getDeliveryStatusText(cell.getValue() as number)}
            </Typography>
          </Box>
        ),
      },
      {
        accessorKey: 'place',
        header: 'Miejsce',
      },
      {
        id: 'goto',
        header: '',
        Cell: ({ row }) => (
          <IconButton LinkComponent={Link} href={`/dostawy/${row.original.id}`}>
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
      showAlertBanner: isError,
    },
    muiToolbarAlertBannerProps: isError
      ? {
          color: 'error',
          children: 'Nastąpił błąd',
        }
      : undefined,
    renderTopToolbarCustomActions: () => <NewDeliveryModal />,
  };

  const { table } = useLocallyStoredTable<DeliverySummary>(
    'deliverySummary',
    tableDef,
  );

  return <MaterialReactTable table={table} />;
};

export default DeliverySummaryTable;
