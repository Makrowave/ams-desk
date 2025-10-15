import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';
import ColorPreview from '@/components/table/ColorPreview';
import { paperTableStyle } from '@/styles/styles';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { MRT_Localization_PL } from 'material-react-table/locales/pl';
import { useMemo } from 'react';
import useLocallyStoredTable from '@/hooks/useLocallyStoredTable';

export default function ShortSaleHistoryTable() {
  const axiosPrivate = useAxiosPrivate();

  const { data, isError, isLoading } = useQuery({
    queryKey: ['shortSaleHistory'],
    queryFn: async () => {
      const result = await axiosPrivate.get(`SalesData/sold?limit=50`);
      return result.data;
    },
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: 'primaryColor',
        header: '',
        size: 60,
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <ColorPreview
            primaryColor={row.original.primaryColor}
            secondaryColor={row.original.secondaryColor}
          />
        ),
      },
      {
        accessorKey: 'model',
        header: 'Model',
        size: 240,
      },
      {
        accessorKey: 'place',
        header: 'Miejsce',
      },
      {
        accessorKey: 'salePrice',
        header: 'Cena',
      },
      {
        accessorKey: 'saleDate',
        header: 'Data',
      },
    ],
    [],
  );

  const table = useLocallyStoredTable('SaleHistoryShort', {
    ...paperTableStyle,
    columns,
    data: data ?? [],
    state: {
      isLoading: isLoading,
      showAlertBanner: isError,
      showProgressBars: isLoading,
    },
    localization: MRT_Localization_PL,
    initialState: {
      density: 'compact',
      pagination: { pageSize: 10, pageIndex: 0 },
    },
    muiTableBodyRowProps: ({ row }) => ({
      sx: {
        color:
          new Date().toLocaleDateString('sv-SE') === row.original.saleDate
            ? '#2563eb'
            : 'inherit',
      },
    }),
  });

  return <MaterialReactTable table={table} />;
}
