'use client';
import { FaChevronRight, FaPlus } from 'react-icons/fa6';
import NewRepairModal from '../modals/repair/NewRepairModal';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { usePlacesNotStorageQuery } from '@/hooks/queryHooks';
import MaterialModal from '@/components/modals/MaterialModal';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { Box, IconButton } from '@mui/material';
import Link from 'next/link';
import { formatPhone } from '@/util/formatting';
import { MRT_Localization_PL } from 'material-react-table/locales/pl';
import { paperTableStyle } from '@/styles/styles';

export default function RepairTable({ src, addButton, localKey }) {
  const axiosPrivate = useAxiosPrivate();
  const storageKey = `repairTable.${localKey}`;

  const [filters, setFilters] = useState([
    { id: 'placeName', value: localStorage.getItem(storageKey) },
  ]);

  useEffect(() => {
    const place = filters.find((f) => f.id === 'placeName');
    if (place) {
      localStorage.setItem(storageKey, place.value);
    } else {
      if (localStorage.getItem(storageKey) !== '') {
        localStorage.setItem(storageKey, '');
      }
    }
  }, [filters]);

  const [place, setPlace] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem(storageKey);
      return isNaN(Number(storedValue)) ? 0 : Number(storedValue);
    }
    return 0;
  });
  const getSrc = () => `${src}&place=${place}`;

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
  } = usePlacesNotStorageQuery();
  const places = createPlaces(
    !isPlacesLoading && !isPlacesError ? placesData : [],
  );

  const columns = useMemo(
    () => [
      { accessorKey: 'id', header: 'Nr.' },
      {
        accessorKey: 'date',
        header: 'Data',
        Cell: ({ row }) =>
          new Date(row.original.date).toLocaleDateString('pl-PL'),
      },
      {
        accessorKey: 'phoneNumber',
        header: 'Telefon',
        Cell: ({ renderedCellValue }) => formatPhone(renderedCellValue),
      },
      { accessorKey: 'bikeName', header: 'Rower' },
      {
        id: 'status.id', //possibly statusId
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
      { accessorKey: 'placeName', header: 'Miejsce' },
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
    [],
  );

  const table = useMaterialReactTable({
    ...paperTableStyle,
    columns: columns,
    data: data ?? [],
    initialState: {
      showColumnFilters: true,
    },
    onColumnFiltersChange: setFilters,
    state: {
      columnFilters: filters,
    },
    localization: MRT_Localization_PL,
    renderTopToolbarCustomActions: () =>
      addButton && (
        <MaterialModal
          label={'Nowe zgłoszenie'}
          button={
            <IconButton>
              <FaPlus className="w-6 h-6" />
            </IconButton>
          }
        >
          <NewRepairModal />
        </MaterialModal>
      ),
  });

  return <MaterialReactTable table={table} />;
}

const createPlaces = (places) => {
  return [{ placeId: 0, placeName: 'Wszystkie' }, ...places];
};
