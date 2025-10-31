// import ColorPreview from '../components/table/ColorPreview';
import { SoldBike } from '../../../types/stats';
import { usePlacesQuery, useSoldBikesQuery } from '../../../hooks/queryHooks';
import useLocallyStoredTable from '../../../hooks/useLocallyStoredTable';
import { paperTableStyle } from '../../../styles/styles';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_PL } from 'material-react-table/locales/pl';
import { useMemo } from 'react';
import ColorPreview from '../ColorPreview';

const SaleHistoryTable = ({
  since,
  until,
}: {
  since: string | null;
  until: string | null;
}) => {
  const { data, isError, isLoading } = useSoldBikesQuery<SoldBike[]>({
    since: since ?? '',
    until: until ?? '',
  });

  //TODO
  const {
    data: placeData,
    isError: placeIsError,
    isLoading: placeIsLoading,
  } = usePlacesQuery();

  const columns = useMemo<MRT_ColumnDef<SoldBike>[]>(
    () => [
      {
        id: 'color',
        header: 'Kolor',
        accessorKey: 'primaryColor',
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
      },
      {
        accessorKey: 'place',
        header: 'Miejsce',
      },
      {
        accessorKey: 'manufacturer',
        header: 'Producent',
      },
      {
        accessorKey: 'price',
        header: 'Cena',
      },
      {
        accessorKey: 'salePrice',
        header: 'Cena sprzedaży',
      },
      {
        accessorKey: 'discount',
        header: 'Zniżka',
      },
      {
        id: 'discountPercent',
        accessorFn: (row) => `${row.discountPercent}%`,
        header: 'Zniżka %',
      },
      {
        accessorKey: 'saleDate',
        header: 'Data',
      },
    ],
    [],
  );

  const { table } = useLocallyStoredTable('SaleHistory', {
    ...paperTableStyle,
    columns,
    data: data ?? [],
    state: {
      isLoading: isLoading,
      showAlertBanner: isError,
      showProgressBars: isLoading,
    },
    localization: MRT_Localization_PL,
  });

  return <MaterialReactTable table={table} />;
};

export default SaleHistoryTable;
