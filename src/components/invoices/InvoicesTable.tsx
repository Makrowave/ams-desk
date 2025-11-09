import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_TableOptions,
} from 'material-react-table';
import { useMemo } from 'react';
import { Invoice } from '../../types/deliveryTypes';
import useLocallyStoredTable from '../../hooks/useLocallyStoredTable';
import { IconButton } from '@mui/material';
import Link from 'next/link';
import { CheckBox, ChevronRight, Close } from '@mui/icons-material';
import { paperTableStyle } from '../../styles/styles';
import NewInvoiceModal from './modal/NewInvoiceModal';

const InvoicesTable = () => {
  const { data, isLoading, isError } = {
    data: [],
    isLoading: false,
    isError: false,
  };

  const columns = useMemo<MRT_ColumnDef<Invoice>[]>(
    () => [
      {
        id: 'delivery',
        header: 'Utworzona dostawa',
        Cell: ({ row }) =>
          row.original.deliveryId ? (
            <CheckBox color="success" />
          ) : (
            <Close color="error" />
          ),
      },
      {
        accessorKey: 'invoiceNumber',
        header: 'Numer faktury',
      },
      {
        accessorKey: 'issueDate',
        header: 'Data wystawienia',
        Cell: ({ cell }) =>
          cell.getValue()
            ? new Date(cell.getValue() as string).toLocaleDateString()
            : '',
      },
      {
        accessorKey: 'issuerName',
        header: 'Nazwa wystawcy',
      },
      {
        accessorKey: 'nettoAmount',
        header: 'Kwota netto',
      },
      {
        accessorKey: 'bruttoAmount',
        header: 'Kwota brutto',
      },
      {
        id: 'goto',
        header: '',
        Cell: ({ row }) => (
          <IconButton LinkComponent={Link} href={`/faktury/${row.original.id}`}>
            <ChevronRight />
          </IconButton>
        ),
      },
    ],
    [],
  );

  const tableDef: MRT_TableOptions<Invoice> = {
    ...paperTableStyle,
    columns,
    data: data || [],
    state: {
      isLoading,
    },
    renderTopToolbarCustomActions: () => <NewInvoiceModal />,
  };

  const { table } = useLocallyStoredTable<Invoice>('invoices', tableDef);

  return <MaterialReactTable table={table} />;
};

export default InvoicesTable;
