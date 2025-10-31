'use client';
import { FaChevronRight, FaPlus } from 'react-icons/fa6';
import NewRepairModal from '../modals/repair/NewRepairModal';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { usePlacesNotStorageQuery } from '../../hooks/queryHooks';
import MaterialModal from '../modals/MaterialModal';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { Box, IconButton, MenuItem, Select } from '@mui/material';
import Link from 'next/link';
import { formatPhone } from '../../util/formatting';
import { MRT_Localization_PL } from 'material-react-table/locales/pl';
import { paperTableStyle } from '../../styles/styles';
import useLocallyStoredTable from '../../hooks/useLocallyStoredTable';
import { getLocalStorageItem } from '../../util/localStorage';
import { Close } from '@mui/icons-material';
import { Place } from '../../types/filterTypes';
import { ShortRepair } from '../../types/repairTypes';

type RepairTableProps = {
  src: string;
  addButton?: boolean;
  localKey: string;
};

const RepairTable = ({ src, addButton, localKey }: RepairTableProps) => {
  const storageKey = `repairTable.${localKey}`;
  const [filters, setFilters] = useState([
    { id: 'placeName', value: getLocalStorageItem(storageKey, undefined) },
  ]);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const place = filters.find((f) => f.id === 'placeName');
    localStorage.setItem(storageKey, JSON.stringify(place?.value));
  }, [filters]);

  const getSrc = () => `${src}`;

  const { data, isPending, isError, error } = useQuery({
    queryKey: [getSrc()],
    queryFn: async () => {
      const response = await axiosPrivate.get(getSrc());
      return response.data;
    },
  });

  const {
    data: placesData,
    isError: isPlacesError,
    isLoading: isPlacesLoading,
  } = usePlacesNotStorageQuery<Place[]>();

  let placesOptions = (placesData ?? []).map((place) => place.name);

  const columns = useMemo<MRT_ColumnDef<ShortRepair>[]>(
    () => [
      { accessorKey: 'id', header: 'Nr.' },
      {
        accessorKey: 'arrivalDate',
        header: 'Data',
        Cell: ({ row }) =>
          new Date(row.original.date).toLocaleDateString('pl-PL'),
      },
      {
        accessorKey: 'phoneNumber',
        header: 'Telefon',
        Cell: ({ renderedCellValue }) =>
          typeof renderedCellValue === 'string'
            ? formatPhone(renderedCellValue)
            : renderedCellValue,
      },
      { accessorKey: 'bikeName', header: 'Rower' },
      {
        id: 'status.id',
        accessorFn: (row) => row.status?.name ?? '',
        header: 'Status',
        Cell: ({ row, renderedCellValue }) => (
          <Box
            sx={{
              p: 1,
              textAlign: 'center',
              borderRadius: 2,
              background: row.original.status?.color,
            }}
          >
            {renderedCellValue}
          </Box>
        ),
      },
      {
        accessorKey: 'placeName',
        header: 'Miejsce',
        Filter: ({ column }) => {
          const {
            data: placesData,
            isError: isPlacesError,
            isLoading: isPlacesLoading,
          } = usePlacesNotStorageQuery<Place[]>();

          let placesOptions = (placesData ?? []).map((place) => place.name);

          const selectedValue =
            filters.find((f) => f.id === 'placeName')?.value ?? '';

          return (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                // width: column,
              }}
            >
              <Select
                variant="standard"
                value={selectedValue || ''}
                displayEmpty
                renderValue={(selected) =>
                  selected.length === 0 ? 'Filtruj wg Miejsce' : selected
                }
                onChange={(e) => {
                  setFilters((prev) => {
                    const others = prev.filter((f) => f.id !== 'placeName');
                    if (e.target.value === '') {
                      return others;
                    }
                    return [
                      ...others,
                      { id: 'placeName', value: e.target.value },
                    ];
                  });
                }}
                sx={{
                  width: '100%',
                  color: column.getFilterValue()
                    ? 'text.primary'
                    : 'text.secondary',
                }}
                inputProps={{ 'aria-label': 'Filtruj wg Miejsce' }}
              >
                <MenuItem value="" disabled>
                  <em>Wybierz miejsce...</em>
                </MenuItem>
                {placesOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              {selectedValue && (
                <IconButton
                  size="small"
                  aria-label="Wyczyść filtr"
                  onClick={() => {
                    setFilters((prev) =>
                      prev.filter((f) => f.id !== 'placeName'),
                    );
                  }}
                >
                  <Close />
                </IconButton>
              )}
            </Box>
          );
        },
      },
      {
        id: 'actions',
        header: '',
        Cell: ({ row }) => (
          <IconButton LinkComponent={Link} href={`/serwis/${row.original.id}`}>
            <FaChevronRight />
          </IconButton>
        ),
      },
    ],
    [placesOptions],
  );

  const { table } = useLocallyStoredTable(`Repair_${localKey}`, {
    ...paperTableStyle,
    columns: columns,
    data: data ?? [],
    initialState: {
      showColumnFilters: true,
    },
    onColumnFiltersChange: setFilters,
    state: {
      columnFilters: filters,
      isLoading: isPending || isPlacesLoading,
    },
    localization: MRT_Localization_PL,
    renderTopToolbarCustomActions: () =>
      addButton && (
        <MaterialModal
          label={'Nowe zgłoszenie'}
          button={
            <IconButton>
              <FaPlus />
            </IconButton>
          }
        >
          <NewRepairModal />
        </MaterialModal>
      ),
  });

  return <MaterialReactTable table={table} />;
};

export default RepairTable;
